const { model, Schema } = require("mongoose");

const introSchema = new Schema(
  {
    profileImage: {
      type: String,
      required: true,
    },
    cv: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      trim: true,
      required: true,
    },
    paragraph: {
      type: String,
      required: true,
    },
    githubLink: {
      type: String,
      required: true,
    },
    linkedInLink: {
      type: String,
      required: true,
    },
    facebookLink: {
      type: String,
      required: true,
    },
    twitterLink: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("userIntro", introSchema);
