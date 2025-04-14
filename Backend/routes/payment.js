const express = require("express");
const Razorpay = require("razorpay");
const User = require("../models/User"); // Import User model
const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID, // Ensure this is set in your .env file
  key_secret: process.env.RAZORPAY_SECRET,
});

// Create Razorpay Order
router.post("/create-order", async (req, res) => {
  const { amount } = req.body; // Amount in INR
  if (!amount) {
    return res.status(400).json({ success: false, message: "Amount is required" });
  }

  try {
    const order = await razorpay.orders.create({
      amount: amount * 100, // Convert to paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });
    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error("Error creating Razorpay order:", error.message);
    res.status(500).json({ success: false, message: "Failed to create Razorpay order", error: error.message });
  }
});

// Verify Payment and Add Coins
router.post("/verify-payment", async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, userId, coins } = req.body;

  try {
    // Verify the payment signature
    const crypto = require("crypto");
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Invalid payment signature" });
    }

    // Update user's coin balance
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    user.coins = (user.coins || 0) + coins; // Add coins to user's balance
    await user.save();

    res.status(200).json({ success: true, message: "Payment verified and coins added", coins: user.coins });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get Razorpay Key
router.get("/get-key", (req, res) => {
  res.status(200).json({ key: process.env.RAZORPAY_KEY_ID });
});

module.exports = router;