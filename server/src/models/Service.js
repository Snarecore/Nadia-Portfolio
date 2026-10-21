const { model, Schema } = require("mongoose");

const serviceSchema = new Schema(
  {
    serviceParagraph: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = model("serviceInfo", serviceSchema);
