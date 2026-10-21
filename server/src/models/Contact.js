const { model, Schema } = require("mongoose");

const contactSchema = new Schema(
  {
    contactDescription: {
      type: String,
      default: "",
    },
    gmail: {
      type: String,
      default: "",
    },
    phoneNo: {
      type: String,
      default: "",
    },
    currentLocation: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = model("contactInformation", contactSchema);
