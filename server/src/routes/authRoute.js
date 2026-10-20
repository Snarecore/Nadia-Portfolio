const express = require("express");
const {
  loginAdmin,
  verifyAdminToken,
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/login", loginAdmin);
router.get("/verify", protect, verifyAdminToken);

module.exports = router;
