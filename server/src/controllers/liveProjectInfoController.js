const createError = require("http-errors");
const { liveProjectInfo } = require("../models/portfolioModel");

const postLiveProjectController = async (req, res, next) => {
  try {
    const newLiveProjects = {
      projectImage: req.body.projectImage,
      projectNo: req.body.projectNo,
      projectTitle: req.body.projectTitle,
      projectParagraph: req.body.projectParagraph,
      projectLiveLink: req.body.projectLiveLink,
      projectGithubLink: req.body.projectGithubLink,
    };
    const liveProjects = await liveProjectInfo.create(newLiveProjects);
    return res.status(200).send(liveProjects);
  } catch (error) {
    next(error);
  }
};

const getLiveProjectController = async (req, res, next) => {
  try {
    const liveProjects = await liveProjectInfo.find({});
    return res.status(200).json({
      count: liveProjects.length,
      data: liveProjects,
    });
  } catch (error) {
    next(error);
  }
};

const getLiveProjectControllerByID = async (req, res, next) => {
  try {
    const id = req.params.id;
    const liveProjects = await liveProjectInfo.findById(id);
    return res.status(200).send(liveProjects);
  } catch (error) {
    next(error);
  }
};

const putLiveProjectControllerByID = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updateLiveProject = await liveProjectInfo.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidator: true,
      }
    );
    if (!updateLiveProject) {
      return next(createError(404, "Project Information not found"));
    }
    return res.status(200).send(updateLiveProject);
  } catch (error) {
    next(error);
  }
};

const deleteLiveProjectControllerByID = async (req, res, next) => {
  try {
    const id = req.params.id;
    const liveProjects = await liveProjectInfo.findByIdAndDelete(id);
    return res.status(200).json({
      message: "Deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postLiveProjectController,
  getLiveProjectController,
  getLiveProjectControllerByID,
  putLiveProjectControllerByID,
  deleteLiveProjectControllerByID,
};
