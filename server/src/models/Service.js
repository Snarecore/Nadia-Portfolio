const { model, Schema } = require("mongoose");

const serviceSchema = new Schema(
  {
    serviceParagraph: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("serviceInfo", serviceSchema);
