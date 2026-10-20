const createError = require("http-errors");
const { contactInfo } = require("../models/portfolioModel");

const postContactController = async (req, res, next) => {
  try {
    const contactData = {
      contactDescription: req.body.contactDescription,
      gmail: req.body.gmail,
      phoneNo: req.body.phoneNo,
      currentLocation: req.body.currentLocation,
    };
    const newContactData = await contactInfo.create(contactData);
    return res.status(200).send(newContactData);
  } catch (error) {
    next(error);
  }
};

const getContactController = async (req, res, next) => {
  try {
    const newContactData = await contactInfo.find({});
    return res.status(200).json({
      count: newContactData.length,
      data: newContactData,
    });
  } catch (error) {
    next(error);
  }
};

const getContactControllerByID = async (req, res, next) => {
  try {
    const id = req.params.id;
    const newContactData = await contactInfo.findById(id);
    return res.status(200).send(newContactData);
  } catch (error) {
    next(error);
  }
};

const updateContactControllerByID = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updateContact = await contactInfo.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidator: true,
    });
    if (!updateContact) {
      return next(createError(404, "Project Information not found"));
    }
    return res.status(200).send(updateContact);
  } catch (error) {
    next(error);
  }
};

const deleteContactControllerByID = async (req, res, next) => {
  try {
    const id = req.params.id;
    const newContactData = await contactInfo.findByIdAndDelete(id);
    return res.status(200).json({
      message: "Deleted Successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postContactController,
  getContactController,
  getContactControllerByID,
  updateContactControllerByID,
  deleteContactControllerByID,
};
