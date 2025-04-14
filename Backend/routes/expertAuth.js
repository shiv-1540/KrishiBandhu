const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const Expert = require("../models/Expert");

const router = express.Router();

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
  },
});

const upload = multer({ storage });

// Expert Signup with Profile Photo
router.post("/signup", upload.single("profilePhoto"), async (req, res) => {
  try {
    const { name, email, password, specialization, experience, roomId } = req.body; // Added experience and roomId
    const profilePhoto = req.file ? `/uploads/${req.file.filename}` : null;

    const hashedPassword = await bcrypt.hash(password, 10);
    const newExpert = new Expert({
      name,
      email,
      password: hashedPassword,
      specialization,
      experience, // Save experience
      roomId, // Save room ID
      profilePhoto,
    });

    await newExpert.save();
    res.status(201).json({ message: "Expert registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Expert Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const expert = await Expert.findOne({ email });

    if (!expert || !(await bcrypt.compare(password, expert.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ expertId: expert._id }, "expertSecretKey", { expiresIn: "1h" });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch All Experts
router.get("/all", async (req, res) => {
  try {
    const experts = await Expert.find().select("-password"); // more readable
    res.status(200).json(experts);
  } catch (error) {
    console.error("Error fetching experts:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

const authenticateExpert = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, "expertSecretKey");
    req.expertId = decoded.expertId;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

// Fetch Expert Profile
router.get("/profile", authenticateExpert, async (req, res) => {
  try {
    const expert = await Expert.findById(req.expertId).select("-password");
    if (!expert) {
      return res.status(404).json({ error: "Expert not found" });
    }
    res.status(200).json(expert);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update Active Status
router.patch("/active-status", authenticateExpert, async (req, res) => {
  try {
    const { isActive } = req.body;
    const expert = await Expert.findByIdAndUpdate(
      req.expertId,
      { isActive },
      { new: true }
    );
    res.status(200).json(expert);
  } catch (error) {
    res.status(500).json({ error: "Failed to update active status" });
  }
});

// Update Profile
router.patch("/update-profile", authenticateExpert, async (req, res) => {
  try {
    const updates = req.body;
    const expert = await Expert.findByIdAndUpdate(req.expertId, updates, { new: true });
    res.status(200).json(expert);
  } catch (error) {
    res.status(500).json({ error: "Failed to update profile" });
  }
});

module.exports = router;