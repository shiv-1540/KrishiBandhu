const mongoose = require("mongoose");

const ExpertSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  specialization: String,
  experience: Number, // Field for experience in years
  roomId: String, // Field for room ID
  profilePhoto: String,
  isActive: { type: Boolean, default: false }, // Active status
});

module.exports = mongoose.model("Expert", ExpertSchema);