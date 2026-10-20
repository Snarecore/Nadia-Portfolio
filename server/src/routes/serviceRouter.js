const express = require("express");
const {
  postServiceController,
  putServiceControllerByID,
  getServiceController,
  getServiceControllerByID,
  deleteServiceControllerByID,
} = require("../controllers/serviceController");

const serviceRouter = express.Router();

serviceRouter.post("/service", postServiceController);
serviceRouter.get("/service", getServiceController);
serviceRouter.get("/service/:id", getServiceControllerByID);
serviceRouter.put("/service/:id", putServiceControllerByID);
serviceRouter.delete("/service/:id", deleteServiceControllerByID);

module.exports = serviceRouter;
