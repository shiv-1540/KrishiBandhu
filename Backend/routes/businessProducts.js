const express = require("express");
const multer = require("multer");
const BusinessProduct = require("../models/BusinessProduct");

const router = express.Router();

// 🖼 Multer Storage Config for Image Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// ➕ **POST: Add a Business Product**
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const newProduct = new BusinessProduct({
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
      quantity: req.body.quantity,
      businessName: req.body.businessName,
      businessContact: req.body.businessContact,
      location: req.body.location,
      image: "/uploads/" + req.file.filename, // Save image path
    });

    await newProduct.save();
    res.status(201).json({ message: "Product added successfully!", product: newProduct });
  } catch (error) {
    res.status(500).json({ error: "Failed to add product", details: error.message });
  }
});

// 👀 **GET: Fetch All Business Products**
router.get("/", async (req, res) => {
  try {
    const products = await BusinessProduct.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products", details: error.message });
  }
});

module.exports = router;
