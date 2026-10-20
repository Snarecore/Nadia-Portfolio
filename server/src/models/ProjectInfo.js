const { model, Schema } = require("mongoose");

const projectInfoSchema = new Schema(
  {
    noOfExperience: {
      type: Number,
      required: true,
    },
    noOfProjectCompleted: {
      type: Number,
      required: true,
    },
    noOfTechnology: {
      type: Number,
      required: true,
    },
    noOfCodeCommits: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("projectInfo", projectInfoSchema);
