const { model, Schema } = require("mongoose");

const contactSchema = new Schema(
  {
    contactDescription: {
      type: String,
      required: true,
    },
    gmail: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: String,
      required: true,
    },
    currentLocation: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("contactInformation", contactSchema);
