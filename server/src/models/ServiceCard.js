const { model, Schema } = require("mongoose");

const serviceCardSchema = new Schema(
  {
    cardImage: {
      type: String,
      required: true,
    },
    cardHeader: {
      type: String,
      required: true,
    },
    cardParagraph: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("serviceCardInfo", serviceCardSchema);
