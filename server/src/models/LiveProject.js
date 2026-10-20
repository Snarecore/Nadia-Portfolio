const { model, Schema } = require("mongoose");

const projectSchema = new Schema(
  {
    projectImage: {
      type: String,
      required: true,
    },
    projectNo: {
      type: String,
      required: true,
    },
    projectTitle: {
      type: String,
      required: true,
    },
    projectParagraph: {
      type: String,
      required: true,
    },
    projectLiveLink: {
      type: String,
      required: true,
    },
    projectGithubLink: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("liveProjectInfo", projectSchema);
