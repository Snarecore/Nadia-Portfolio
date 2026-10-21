const { model, Schema } = require("mongoose");

const aboutSchema = new Schema(
  {
    aboutImage: {
      type: String,
      default: "",
    },
    aboutDesignation: {
      type: String,
      default: "",
    },
    aboutParagraph: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = model("aboutInfo", aboutSchema);
