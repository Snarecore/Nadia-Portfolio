const express = require("express");
const {
  postContactController,
  getContactController,
  getContactControllerByID,
  updateContactControllerByID,
  deleteContactControllerByID,
} = require("../controllers/contactController");

const contactRouter = express();

contactRouter.post("/contact", postContactController);
contactRouter.get("/contact", getContactController);
contactRouter.get("/contact/:id", getContactControllerByID);
contactRouter.put("/contact/:id", updateContactControllerByID);
contactRouter.delete("/contact/:id", deleteContactControllerByID);

module.exports = contactRouter;
