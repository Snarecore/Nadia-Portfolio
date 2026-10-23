const express = require("express");

const Router = require("../userRoute");
const projectInfoRouter = require("../projectInfoRoute");
const contactRouter = require("../contactRouter");
const serviceRouter = require("../serviceRouter");
const cardRouter = require("../serviceCardRouter");
const liveProjectRouter = require("../liveProjectInfoRoute");
const aboutRouter = require("../aboutRouter");
const authRouter = require("../authRoute");
const profileRouter = require("../profileRoute");

const v1Router = express.Router();

// Consolidated profile
v1Router.use("/", profileRouter);

// Specific resource routers
v1Router.use("/", Router);
v1Router.use("/", projectInfoRouter);
v1Router.use("/", contactRouter);
v1Router.use("/", serviceRouter);
v1Router.use("/", cardRouter);
v1Router.use("/", liveProjectRouter);
v1Router.use("/", aboutRouter);
v1Router.use("/auth", authRouter);

module.exports = v1Router;
