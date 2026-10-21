const { model, Schema } = require("mongoose");

const serviceCardSchema = new Schema(
  {
    cardImage: {
      type: String,
      default: "",
    },
    cardHeader: {
      type: String,
      default: "",
    },
    cardParagraph: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = model("serviceCardInfo", serviceCardSchema);
