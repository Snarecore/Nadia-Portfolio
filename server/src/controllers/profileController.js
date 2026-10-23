const {
  userIntro,
  aboutInfo,
  contactInfo,
  projectInfo,
  serviceInfo,
  serviceCardInfo,
  liveProjectInfo,
} = require("../models/portfolioModel");

/**
 * Consolidated Portfolio Profile Controller
 * Delivers complete public profile in a single optimized database query
 * Senior Architecture Pattern: Eliminates N+1 HTTP calls and network waterfall
 */
const getCompleteProfileController = async (req, res, next) => {
  try {
    const [
      intro,
      about,
      contact,
      stats,
      service,
      serviceCards,
      projects,
    ] = await Promise.all([
      userIntro.findOne({}).lean(),
      aboutInfo.findOne({}).lean(),
      contactInfo.findOne({}).lean(),
      projectInfo.findOne({}).lean(),
      serviceInfo.findOne({}).lean(),
      serviceCardInfo.find({}).sort({ createdAt: 1 }).lean(),
      liveProjectInfo.find({}).sort({ projectNo: 1, createdAt: 1 }).lean(),
    ]);

    return res.status(200).json({
      success: true,
      data: {
        intro: intro || null,
        about: about || null,
        contact: contact || null,
        stats: stats || null,
        service: service || null,
        serviceCards: serviceCards || [],
        projects: projects || [],
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getCompleteProfileController };
