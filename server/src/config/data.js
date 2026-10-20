const mongoose = require("mongoose");
const dns = require("dns");
const { mongooseUrl } = require("../secret");

// Fix querySrv ETIMEOUT on Mac/Node by using Google DNS for SRV resolution
try {
  dns.setServers(["8.8.8.8", "8.8.4.4"]);
} catch (e) {}

const connectDB = async (options = {}) => {
  try {
    await mongoose.connect(mongooseUrl, {
      serverSelectionTimeoutMS: 5000,
      ...options,
    });
    console.log("Database is connected successfully");

    mongoose.connection.on("error", (err) => {
      console.error("DB Connection error", err);
    });
  } catch (error) {
    console.log("DB is not connected", error.toString());
  }
};

module.exports = connectDB;
