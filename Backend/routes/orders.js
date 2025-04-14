const express = require("express");
const Order = require("../models/Order");

const router = express.Router();

// Place Order
router.post("/", async (req, res) => {
  try {
    const { productId, buyer, contact } = req.body;

    const newOrder = new Order({ productId, buyer, contact });
    await newOrder.save();

    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
