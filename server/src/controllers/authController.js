const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });
const { Admin } = require("../models/portfolioModel");
const {
  hashPassword,
  comparePassword,
  generateToken,
} = require("../utils/authHelper");

const loginAdmin = async (req, res, next) => {
  try {
    const username = (req.body.username || "").trim();
    const password = (req.body.password || "").trim();

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required",
      });
    }

    const envUser = (process.env.ADMIN_USERNAME || "admin").trim();
    const envPass = (process.env.ADMIN_PASSWORD || "admin1234").trim();

    const isMasterEnv = username === envUser && password === envPass;

    let admin = null;
    try {
      admin = await Admin.findOne({ username });
    } catch (dbErr) {
      if (isMasterEnv) {
        const token = generateToken({
          id: "master_admin",
          username,
          role: "admin",
        });
        return res.status(200).json({
          success: true,
          message: "Login successful",
          token,
          user: { id: "master_admin", username, role: "admin" },
        });
      }
      return next(dbErr);
    }

    if (isMasterEnv) {
      if (!admin) {
        try {
          admin = await Admin.create({
            username,
            password: hashPassword(password),
            role: "admin",
          });
        } catch (e) {
          // Fallback if create fails
        }
      } else {
        const isMatch = comparePassword(password, admin.password);
        if (!isMatch) {
          try {
            admin.password = hashPassword(password);
            await admin.save();
          } catch (e) {}
        }
      }

      const token = generateToken({
        id: admin?._id || "master_admin",
        username,
        role: "admin",
      });

      return res.status(200).json({
        success: true,
        message: "Login successful",
        token,
        user: {
          id: admin?._id || "master_admin",
          username,
          role: "admin",
        },
      });
    }

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatch = comparePassword(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = generateToken({
      id: admin._id,
      username: admin.username,
      role: admin.role,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: admin._id,
        username: admin.username,
        role: admin.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

const verifyAdminToken = async (req, res) => {
  return res.status(200).json({
    success: true,
    user: req.user,
  });
};

module.exports = {
  loginAdmin,
  verifyAdminToken,
};
