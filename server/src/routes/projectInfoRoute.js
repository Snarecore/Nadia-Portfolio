const express = require("express");
const {
  getProjectInfoController,
  createProjectInfoController,
  getProjectInfoControllerByID,
  putProjectInfoControllerByID,
  deleteProjectInfoControllerByID,
} = require("../controllers/projectInfoController");

const projectInfoRouter = express.Router();

projectInfoRouter.post("/projectInfo", createProjectInfoController);
projectInfoRouter.get("/projectInfo", getProjectInfoController);
projectInfoRouter.get("/projectInfo/:id", getProjectInfoControllerByID);
projectInfoRouter.put("/projectInfo/:id", putProjectInfoControllerByID);
projectInfoRouter.delete("/projectInfo/:id", deleteProjectInfoControllerByID);

module.exports = projectInfoRouter;
