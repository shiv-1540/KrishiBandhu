const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, enum: ["farmer", "business"], required: true }, // User role
  coins: { type: Number, default: 0 }, // Add coins field
});

module.exports = mongoose.model("User", UserSchema);
