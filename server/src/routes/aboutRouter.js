const express = require("express");

const aboutRouter = express.Router();

const {
  postAboutController,
  getAboutController,
  getAboutControllerByID,
  putAboutControllerByID,
  deleteAboutControllerByID,
} = require("../controllers/aboutController");

aboutRouter.post("/about", postAboutController);
aboutRouter.get("/about", getAboutController);
aboutRouter.get("/about/:id", getAboutControllerByID);
aboutRouter.put("/about/:id", putAboutControllerByID);
aboutRouter.delete("/about/:id", deleteAboutControllerByID);

module.exports = aboutRouter;
