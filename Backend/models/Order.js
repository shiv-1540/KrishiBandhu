const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  productId: String,
  buyer: String,
  contact: String,
  status: { type: String, enum: ["Pending", "Completed"], default: "Pending" },
});

module.exports = mongoose.model("Order", OrderSchema);
