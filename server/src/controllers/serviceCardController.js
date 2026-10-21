const createError = require("http-errors");
const { serviceCardInfo } = require("../models/portfolioModel");

const postServiceCardController = async (req, res, next) => {
  try {
    const newServiceCard = {
      cardImage: req.body.cardImage,
      cardHeader: req.body.cardHeader,
      cardParagraph: req.body.cardParagraph,
    };
    const serviceCardData = await serviceCardInfo.create(newServiceCard);
    return res.status(200).send(serviceCardData);
  } catch (error) {
    next(error);
  }
};

const getServiceCardController = async (req, res, next) => {
  try {
    const newServiceCard = await serviceCardInfo.find({});
    return res.status(200).json({
      count: newServiceCard.length,
      data: newServiceCard,
    });
  } catch (error) {
    next(error);
  }
};

const getServiceCardControllerByID = async (req, res, next) => {
  try {
    const id = req.params.id;
    const newServiceCard = await serviceCardInfo.findById(id);
    if (!newServiceCard) {
      return next(createError(404, "Service Card not found"));
    }
    return res.status(200).json({
      success: true,
      data: newServiceCard,
    });
  } catch (error) {
    next(error);
  }
};

const putServiceCardControllerByID = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updateServiceCard = await serviceCardInfo.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updateServiceCard) {
      return next(createError(404, "Service Card not found"));
    }
    return res.status(200).json({
      success: true,
      data: updateServiceCard,
    });
  } catch (error) {
    next(error);
  }
};

const deleteServiceCardControllerByID = async (req, res, next) => {
  try {
    const id = req.params.id;
    const newServiceCard = await serviceCardInfo.findByIdAndDelete(id);
    if (!newServiceCard) {
      return next(createError(404, "Service Card not found"));
    }
    return res.status(200).json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postServiceCardController,
  getServiceCardController,
  getServiceCardControllerByID,
  putServiceCardControllerByID,
  deleteServiceCardControllerByID,
};
