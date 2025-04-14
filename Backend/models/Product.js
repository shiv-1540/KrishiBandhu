const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  quantity: String,
  owner: String,
  contact: String,
  location: String,
  image: String, // Stores image URL
});

module.exports = mongoose.model("Product", ProductSchema);
