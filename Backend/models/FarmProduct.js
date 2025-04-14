const mongoose = require("mongoose");

const farmProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: String, required: true },
  farmerName: { type: String, required: true },
  contact: { type: String, required: true },
  location: { type: String, required: true },
  image: { type: String }, // Store image filename instead of Base64
});

const FarmProduct = mongoose.model("FarmProduct", farmProductSchema);
module.exports = FarmProduct;
