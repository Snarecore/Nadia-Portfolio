const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
const app = require("./src/app");
const connectDB = require("./src/config/data");
const { serverPort } = require("./src/secret");

const startServer = async () => {
  try {
    await connectDB();
  } catch (error) {
    console.error("Warning: Initial DB connection could not be established immediately:", error.message || error);
  }

  const listen = (port) => {
    const server = app.listen(port, () => {
      console.log(`server is running at http://localhost:${port}`);
    });

    server.on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        console.warn(`Port ${port} is in use, dynamically switching to port ${port + 1}...`);
        listen(port + 1);
      } else {
        console.error("Server error:", err);
      }
    });

    const handleShutdown = async (signal) => {
      console.log(`Received ${signal}. Gracefully shutting down server...`);
      server.close(() => {
        console.log("HTTP server closed.");
        process.exit(0);
      });
    };

    process.on("SIGTERM", () => handleShutdown("SIGTERM"));
    process.on("SIGINT", () => handleShutdown("SIGINT"));
  };

  listen(serverPort);
};

startServer();

module.exports = app;
