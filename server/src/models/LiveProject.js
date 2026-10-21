const { model, Schema } = require("mongoose");

const projectSchema = new Schema(
  {
    projectImage: {
      type: String,
      default: "",
    },
    projectNo: {
      type: String,
      default: "",
    },
    projectTitle: {
      type: String,
      default: "",
    },
    projectParagraph: {
      type: String,
      default: "",
    },
    projectLiveLink: {
      type: String,
      default: "",
    },
    projectGithubLink: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = model("liveProjectInfo", projectSchema);
