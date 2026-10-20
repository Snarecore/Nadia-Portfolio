const express = require("express");
const {
  postServiceCardController,
  getServiceCardController,
  getServiceCardControllerByID,
  deleteServiceCardControllerByID,
  putServiceCardControllerByID,
} = require("../controllers/serviceCardController");

const cardRouter = express.Router();

cardRouter.post("/serviceCard", postServiceCardController);
cardRouter.get("/serviceCard", getServiceCardController);
cardRouter.get("/serviceCard/:id", getServiceCardControllerByID);
cardRouter.put("/serviceCard/:id", putServiceCardControllerByID);
cardRouter.delete("/serviceCard/:id", deleteServiceCardControllerByID);

module.exports = cardRouter;
