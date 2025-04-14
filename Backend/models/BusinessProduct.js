const mongoose = require("mongoose");

const BusinessProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  businessName: { type: String, required: true },
  businessContact: { type: String, required: true },
  location: { type: String, required: true },
  image: { type: String, required: true }, // Image file path
}, { timestamps: true });

module.exports = mongoose.model("BusinessProduct", BusinessProductSchema);
