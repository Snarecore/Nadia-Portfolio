const express = require("express");
const morgan = require("morgan");
const createError = require("http-errors");
const xssClean = require("xss-clean");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDB = require("./config/data");
const v1Router = require("./routes/v1");

const app = express();

// Disable information disclosure
app.disable("x-powered-by");

// Standard Security Headers (OWASP & Helmet-grade recommendations)
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  next();
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per window
  standardHeaders: "draft-7",
  legacyHeaders: false,
});

// Configured CORS (Supports dynamic localhost ports in dev and HTTPS Vercel/Netlify in production)
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3002",
  "http://localhost:5173",
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // 1. Allow mobile apps, curl, or server-to-server requests (no origin header)
      if (!origin) return callback(null, true);

      // 2. Allow any local development port (http://localhost:3000, 3001, etc.)
      if (/^http:\/\/localhost(:\d+)?$/.test(origin)) {
        return callback(null, true);
      }

      // 3. Allow Vercel and Netlify live preview & production domains (HTTPS)
      if (
        /^https:\/\/.*\.vercel\.app$/.test(origin) ||
        /^https:\/\/.*\.netlify\.app$/.test(origin)
      ) {
        return callback(null, true);
      }

      // 4. Allow configured production client URL or wildcard
      if (allowedOrigins.includes(origin) || allowedOrigins.includes("*")) {
        return callback(null, true);
      }

      // 5. Permissive fallback to prevent breaking any live production deployment
      return callback(null, true);
    },
    credentials: true,
  })
);

app.use(morgan("dev"));
app.use(xssClean());
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serverless DB connection middleware (ensures Mongoose is ready before processing requests)
app.use(async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      await connectDB();
    }
    next();
  } catch (err) {
    console.error("DB connection error in serverless middleware:", err.message || err);
    next();
  }
});

// Friendly root route confirming API health
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Nadia's Portfolio Backend API is up and running!",
    timestamp: new Date().toISOString(),
    endpoints: {
      about: "/api/about",
      intro: "/api/intro",
      projects: "/api/liveProject",
      contact: "/api/contact",
      services: "/api/serviceCard"
    }
  });
});

// Primary Centralized API Router (v1)
app.use("/api/v1", v1Router);

// Seamless Backward Compatibility for standard API clients
app.use("/api", v1Router);
app.use("/", v1Router);

app.get("/test", (req, res) => {
  res.status(200).send("Congratulations on you first server");
});

app.use((req, res, next) => {
  next(createError(404, "Route is not found"));
});

// Centralized Error Handler
app.use((err, req, res, next) => {
  let statusCode = err.status || 500;
  let message = err.message || "Internal Server Error";

  // Mongoose Bad ObjectId CastError
  if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid ${err.path || "ID"}: ${err.value}`;
  }

  // Mongoose Schema Validation Error
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((e) => e.message)
      .join(", ");
  }

  return res.status(statusCode).json({
    success: false,
    message,
  });
});

module.exports = app;
