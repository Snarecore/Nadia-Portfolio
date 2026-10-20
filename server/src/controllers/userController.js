const createError = require("http-errors");
const { userIntro } = require("../models/portfolioModel");

const introController = async (req, res, next) => {
  try {
    const newIntro = {
      profileImage: req.body.profileImage,
      cv: req.body.cv,
      name: req.body.name,
      paragraph: req.body.paragraph,
      githubLink: req.body.githubLink,
      linkedInLink: req.body.linkedInLink,
      facebookLink: req.body.facebookLink,
      twitterLink: req.body.twitterLink,
    };
    const introData = await userIntro.create(newIntro);
    return res.status(200).send(introData);
  } catch (error) {
    next(error);
  }
};

const getIntroController = async (req, res, next) => {
  try {
    const intro = await userIntro.find({});
    return res.status(200).json({
      count: intro.length,
      data: intro,
    });
  } catch (error) {
    next(error);
  }
};

const getIntroControllerByID = async (req, res, next) => {
  try {
    const id = req.params.id;
    const intro = await userIntro.findById(id);
    return res.status(200).send(intro);
  } catch (error) {
    next(error);
  }
};

const updateIntroControllerByID = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedIntro = await userIntro.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedIntro) {
      return next(createError(404, "Intro not found"));
    }
    return res.status(200).send(updatedIntro);
  } catch (error) {
    next(error);
  }
};

const deleteIntroController = async (req, res, next) => {
  try {
    const id = req.params.id;
    const intro = await userIntro.findByIdAndDelete(id);
    return res.send(201).json({
      message: "Deleted Successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  introController,
  getIntroController,
  getIntroControllerByID,
  updateIntroControllerByID,
  deleteIntroController,
};
