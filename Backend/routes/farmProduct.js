const express = require("express");
const multer = require("multer");
const path = require("path");
const FarmProduct = require("../models/FarmProduct");

const router = express.Router();

// 🖼 Configure Multer for Image Upload (Save to "uploads" folder)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save images in 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});
const upload = multer({ storage });

// 📌 Add a New Farm Product (Upload Image)
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    const { name, price, quantity, farmerName, contact, location } = req.body;
    if (!name || !price || !quantity || !farmerName || !contact || !location) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // ✅ Save only the image filename in MongoDB
    const image = req.file ? req.file.filename : null;

    const newProduct = new FarmProduct({ name, price, quantity, farmerName, contact, location, image });
    await newProduct.save();

    res.status(201).json({ message: "Product added successfully!", product: newProduct });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ error: "Internal server error. Please try again later." });
  }
});

// 📌 Fetch All Farm Products (Return Image URLs)
router.get("/all", async (req, res) => {
  try {
    const products = await FarmProduct.find();

    // ✅ Append full image URL before sending response
    const updatedProducts = products.map((product) => ({
      ...product._doc,
      image: product.image ? `http://localhost:5000/uploads/${product.image}` : null,
    }));

    res.json(updatedProducts);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal server error. Please try again later." });
  }
});

// ✅ Serve Uploaded Images as Static Files
router.use("/uploads", express.static("uploads"));

module.exports = router;
