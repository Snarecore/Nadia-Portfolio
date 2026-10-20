const express = require("express");
const {
  introController,
  getIntroController,
  deleteIntroController,
  getIntroControllerByID,
  updateIntroControllerByID,
} = require("../controllers/userController");

const Router = express.Router();

Router.post("/intro", introController);
Router.get("/intro", getIntroController);
Router.get("/intro/:id", getIntroControllerByID);
Router.put("/intro/:id", updateIntroControllerByID);
Router.delete("/intro/:id", deleteIntroController);

module.exports = Router;
