const express = require("express");
const Tool = require("../models/Tools"); // Mongoose Model
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const router = express.Router();

// Ensure the uploads directory exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// 🔹 Multer Storage to Save Images to Disk
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
  },
});

const upload = multer({ storage });

// 📌 Add New Tool (Save Image as File)
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    const { name, price, availability, ownerName, ownerContact, location } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null; // Store file path

    const newTool = new Tool({ name, price, availability, ownerName, ownerContact, location, image: imagePath });
    await newTool.save();

    res.status(201).json({ message: "Tool added successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📌 Get All Tools (Return Image URL)
router.get("/list", async (req, res) => {
  try {
    const tools = await Tool.find();
    res.json(tools);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📌 Serve Images from Uploads Folder
router.use("/uploads", express.static(path.join(__dirname, "../uploads")));

module.exports = router;
