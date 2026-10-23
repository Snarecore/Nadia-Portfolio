const mongoose = require("mongoose");
const dns = require("dns");
const { mongooseUrl } = require("../secret");

// Fix querySrv ETIMEOUT on Mac/Node by using Google DNS for SRV resolution
try {
  dns.setServers(["8.8.8.8", "8.8.4.4"]);
} catch (e) {}

let cachedConnection = null;

const connectDB = async (options = {}) => {
  // If already connected, reuse existing connection
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (cachedConnection) {
    return cachedConnection;
  }

  if (!mongooseUrl) {
    console.error("CRITICAL: MONGOOSE_ATLAS_URL is not defined in environment variables!");
    throw new Error("MONGOOSE_ATLAS_URL is missing in environment variables");
  }

  try {
    cachedConnection = mongoose.connect(mongooseUrl, {
      serverSelectionTimeoutMS: 5000,
      ...options,
    });

    await cachedConnection;
    console.log("Database is connected successfully");

    mongoose.connection.on("error", (err) => {
      console.error("DB connection error:", err.message || err);
    });

    return mongoose.connection;
  } catch (error) {
    cachedConnection = null;
    console.error("DB connection error:", error.toString());
    throw error;
  }
};

module.exports = connectDB;
