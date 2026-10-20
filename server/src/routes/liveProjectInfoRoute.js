const express = require("express");
const {
  postLiveProjectController,
  getLiveProjectController,
  getLiveProjectControllerByID,
  putLiveProjectControllerByID,
  deleteLiveProjectControllerByID,
} = require("../controllers/liveProjectInfoController");

const liveProjectRouter = express.Router();

liveProjectRouter.post("/liveProject", postLiveProjectController);
liveProjectRouter.get("/liveProject", getLiveProjectController);
liveProjectRouter.get("/liveProject/:id", getLiveProjectControllerByID);
liveProjectRouter.put("/liveProject/:id", putLiveProjectControllerByID);
liveProjectRouter.delete("/liveProject/:id", deleteLiveProjectControllerByID);

module.exports = liveProjectRouter;
