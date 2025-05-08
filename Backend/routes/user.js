const express = require("express");
const crypto = require("crypto");
const Razorpay = require("razorpay");
const User = require("../models/User"); // Import User model
const router = express.Router();

const authmidleware = require('../middleware/authmiddleware');

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


router.get('/get-user', authmidleware, async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    // Log to check the user information attached by the auth middleware
    console.log("Requested for get-user");
    console.log("User from JWT:", req.user);

    // Now, fetch the full user data from the database
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      success: true,
      user: {
        id:user._id,
        name:user.name,
        email: user.email,
        image: user.image,
      },
    });
  }
  catch(error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error" });
  }
});


router.post('/logout', logoutUser = (req, res) => {
  console.log("Logging out!");
  res.clearCookie('authToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });

  res.status(200).json({ message: 'Logout successful' });
});


module.exports = router;