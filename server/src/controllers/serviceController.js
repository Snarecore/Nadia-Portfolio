const createError = require("http-errors");
const { serviceInfo } = require("../models/portfolioModel");

const postServiceController = async (req, res, next) => {
  try {
    const serviceData = {
      serviceParagraph: req.body.serviceParagraph,
    };
    const newServiceData = await serviceInfo.create(serviceData);
    return res.status(200).send(newServiceData);
  } catch (error) {
    next(error);
  }
};

const getServiceController = async (req, res, next) => {
  try {
    const newServiceData = await serviceInfo.find({});
    return res.status(200).json({
      count: newServiceData.length,
      data: newServiceData,
    });
  } catch (error) {
    next(error);
  }
};

const getServiceControllerByID = async (req, res, next) => {
  try {
    const id = req.params.id;
    const newServiceData = await serviceInfo.findById(id);
    return res.status(200).send(newServiceData);
  } catch (error) {
    next(error);
  }
};

const putServiceControllerByID = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedService = await serviceInfo.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedService) {
      return next(createError(404, "Intro not found"));
    }
    return res.status(200).send(updatedService);
  } catch (error) {
    next(error);
  }
};

const deleteServiceControllerByID = async (req, res, next) => {
  try {
    const id = req.params.id;
    const newServiceData = await serviceInfo.findByIdAndDelete(id);
    return res.status(200).json({
      message: "Deleted Successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postServiceController,
  getServiceController,
  getServiceControllerByID,
  putServiceControllerByID,
  deleteServiceControllerByID,
};
