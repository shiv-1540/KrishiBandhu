const express = require("express");
const multer = require("multer");
const Product = require("../models/Product");

const router = express.Router();

// Image Upload Configuration
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Create Product (With Image Upload)
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, price, category, quantity, owner, contact, location } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : "";

    const newProduct = new Product({ name, price, category, quantity, owner, contact, location, image });
    await newProduct.save();

    res.status(201).json({ message: "Product added successfully", product: newProduct });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get All Products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
