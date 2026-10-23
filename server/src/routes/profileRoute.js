const express = require("express");
const { getCompleteProfileController } = require("../controllers/profileController");

const profileRouter = express.Router();

// Single consolidated profile endpoint (Senior Standard)
profileRouter.get("/profile", getCompleteProfileController);

module.exports = profileRouter;
