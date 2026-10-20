const createError = require("http-errors");
const { projectInfo } = require("../models/portfolioModel");

const createProjectInfoController = async (req, res, next) => {
  try {
    const createProjectInfo = {
      noOfExperience: req.body.noOfExperience,
      noOfProjectCompleted: req.body.noOfProjectCompleted,
      noOfTechnology: req.body.noOfTechnology,
      noOfCodeCommits: req.body.noOfCodeCommits,
    };
    const projectInfoData = await projectInfo.create(createProjectInfo);
    return res.status(200).send(projectInfoData);
  } catch (error) {
    next(error);
  }
};

const getProjectInfoController = async (req, res, next) => {
  try {
    const projectInfoData = await projectInfo.find({});
    return res.status(200).json({
      count: projectInfoData.length,
      data: projectInfoData,
    });
  } catch (error) {
    next(error);
  }
};

const getProjectInfoControllerByID = async (req, res, next) => {
  try {
    const id = req.params.id;
    const projectInfoData = await projectInfo.findById(id);
    return res.status(200).send(projectInfoData);
  } catch (error) {
    next(error);
  }
};

const putProjectInfoControllerByID = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updateProjectInfo = await projectInfo.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidator: true,
      }
    );
    if (!updateProjectInfo) {
      return next(createError(404, "Project Information not found"));
    }
    return res.status(200).send(updateProjectInfo);
  } catch (error) {
    next(error);
  }
};

const deleteProjectInfoControllerByID = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updateProjectInfo = await projectInfo.findByIdAndDelete(id);
    return res.status(200).json({
      message: "Deleted Successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProjectInfoController,
  getProjectInfoController,
  getProjectInfoControllerByID,
  putProjectInfoControllerByID,
  deleteProjectInfoControllerByID,
};
