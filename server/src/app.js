const express = require("express");
const morgan = require("morgan");
const createError = require("http-errors");
const xssClean = require("xss-clean");
const rateLimit = require("express-rate-limit");
const cors = require("cors");

const Router = require("./routes/userRoute");
const projectInfoRouter = require("./routes/projectInfoRoute");
const contactRouter = require("./routes/contactRouter");
const serviceRouter = require("./routes/serviceRouter");
const cardRouter = require("./routes/serviceCardRouter");
const liveProjectRouter = require("./routes/liveProjectInfoRoute");
const aboutRouter = require("./routes/aboutRouter");
const authRouter = require("./routes/authRoute");

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
});

app.use(cors());
app.use(morgan("dev"));
app.use(xssClean());
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", Router);
app.use("/", Router);
app.use("/api", projectInfoRouter);
app.use("/", projectInfoRouter);
app.use("/api", contactRouter);
app.use("/", contactRouter);
app.use("/api", serviceRouter);
app.use("/", serviceRouter);
app.use("/api", cardRouter);
app.use("/", cardRouter);
app.use("/api", liveProjectRouter);
app.use("/", liveProjectRouter);
app.use("/api", aboutRouter);
app.use("/", aboutRouter);
app.use("/api/auth", authRouter);
app.use("/auth", authRouter);
app.use("/api", authRouter);

app.get("/test", (req, res) => {
  res.status(200).send("Congratulations on you first server");
});

app.use((req, res, next) => {
  next(createError(404, "Route is not found"));
});
app.use((err, req, res, next) => {
  return res.status(err.status || 500).json({
    success: false,
    message: err.message,
  });
});

module.exports = app;
