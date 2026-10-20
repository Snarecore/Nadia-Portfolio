const createError = require("http-errors");
const { aboutInfo } = require("../models/portfolioModel");

const postAboutController = async (req, res, next) => {
  try {
    const newAbout = {
      aboutImage: req.body.aboutImage,
      aboutDesignation: req.body.aboutDesignation,
      aboutParagraph: req.body.aboutParagraph,
    };
    const aboutData = await aboutInfo.create(newAbout);
    return res.status(200).send(aboutData);
  } catch (error) {
    next(error);
  }
};

const getAboutController = async (req, res, next) => {
  try {
    const aboutData = await aboutInfo.find({});
    return res.status(200).json({
      count: aboutData.length,
      data: aboutData,
    });
  } catch (error) {
    next(error);
  }
};

const getAboutControllerByID = async (req, res, next) => {
  try {
    const id = req.params.id;
    const aboutData = await aboutInfo.findById(id);
    return res.status(200).send(aboutData);
  } catch (error) {
    next(error);
  }
};

const putAboutControllerByID = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updateAbout = await aboutInfo.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidator: true,
    });
    if (!updateAbout) {
      return next(createError(404, "Project Information not found"));
    }
    return res.status(200).send(updateAbout);
  } catch (error) {
    next(error);
  }
};

const deleteAboutControllerByID = async (req, res, next) => {
  try {
    const id = req.params.id;
    const aboutData = await aboutInfo.findByIdAndDelete(id);
    return res.status(200).json({
      message: "Deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postAboutController,
  getAboutController,
  getAboutControllerByID,
  putAboutControllerByID,
  deleteAboutControllerByID,
};
