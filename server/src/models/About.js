const { model, Schema } = require("mongoose");

const aboutSchema = new Schema(
  {
    aboutImage: {
      type: String,
      required: true,
    },
    aboutDesignation: {
      type: String,
      required: true,
    },
    aboutParagraph: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("aboutInfo", aboutSchema);
