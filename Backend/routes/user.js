const express = require("express");
const crypto = require("crypto");
const Razorpay = require("razorpay");
const User = require("../models/User"); // Import User model
const router = express.Router();

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID, // Ensure this is set in your .env file
  key_secret: process.env.RAZORPAY_SECRET,
});

// Fetch user's coin balance
router.get("/coins", async (req, res) => {
  const userId = req.userId; // Ensure this is extracted correctly
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    res.status(200).json({ success: true, coins: user.coins });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get all users
router.get("/all-users", async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 }); // Exclude passwords for security
    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch users", error: error.message });
  }
});

module.exports = router;