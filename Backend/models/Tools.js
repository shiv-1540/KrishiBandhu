const mongoose = require("mongoose");

const toolSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  availability: { type: String, enum: ["Rent", "Sale"], required: true },
  ownerName: { type: String, required: true },
  ownerContact: { type: String, required: true },
  location: { type: String, required: true },
  image: { type: String }, // Store Image File Path Instead of Base64
});

const Tool = mongoose.model("Tool", toolSchema);
module.exports = Tool;
