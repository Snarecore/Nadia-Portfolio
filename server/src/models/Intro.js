const { model, Schema } = require("mongoose");

const introSchema = new Schema(
  {
    profileImage: {
      type: String,
      default: "",
    },
    cv: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      trim: true,
      default: "",
    },
    paragraph: {
      type: String,
      default: "",
    },
    githubLink: {
      type: String,
      default: "",
    },
    linkedInLink: {
      type: String,
      default: "",
    },
    facebookLink: {
      type: String,
      default: "",
    },
    twitterLink: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = model("userIntro", introSchema);
