const { model, Schema } = require("mongoose");

const projectInfoSchema = new Schema(
  {
    noOfExperience: {
      type: Number,
      default: 0,
    },
    noOfProjectCompleted: {
      type: Number,
      default: 0,
    },
    noOfTechnology: {
      type: Number,
      default: 0,
    },
    noOfCodeCommits: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = model("projectInfo", projectInfoSchema);
