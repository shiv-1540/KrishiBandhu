require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require('multer');
const fs = require("fs");
const path = require("path");

const YieldSell = require("./models/yieldsell.js");
const RentProduct = require("./models/rent.js");
const User = require("./models/User"); // Add this line to import the User model

const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");
const toolRoutes = require("./routes/tools");
const farmProductRoutes = require("./routes/farmProduct");
const businessProductRoutes = require("./routes/businessProducts");
const expertAuthRoutes = require("./routes/expertAuth");
const paymentRoutes = require("./routes/payment");
const userRoutes = require("./routes/user");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// MongoDB Connection
mongoose.connect("mongodb+srv://progamerz9764:asdfghjkl@cluster0.uvflmno.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.error("❌ DB Connection Error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/tools", toolRoutes);
app.use("/api/farmProducts", farmProductRoutes);
app.use("/api/businessProducts", businessProductRoutes);
app.use("/api/expert/auth", expertAuthRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/user", userRoutes);
app.use('/api/users', require('./routes/user'));

// ✅ Yield Sell Routes
app.post('/api/farmer/yieldadd', async (req, res) => {
    const { farmer_id, crop_name, description, price_per_kg, quantity, location, images } = req.body;

    if (!farmer_id || !crop_name || !price_per_kg || !quantity || !location) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const newYieldSell = new YieldSell({
            farmer_id,
            crop_name,
            description,
            price_per_kg,
            quantity,
            location,
            images
        });

        const savedYield = await newYieldSell.save();
        res.status(201).json({ message: 'Yield added successfully', yield: savedYield });

    } catch (error) {
        console.error('Error adding yield:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

app.get('/api/farmer/getallyield', async (req, res) => {
    const { state, city } = req.query;

    try {
        let query = {};
        if (state) query['location.state'] = state;
        if (city) query['location.city'] = city;

        const yields = await YieldSell.find(query);

        if (yields.length === 0) {
            return res.status(404).json({ message: "No yield products found for the specified location" });
        }

        res.status(200).json({ yields });

    } catch (error) {
        console.error('Error fetching yields:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

app.put('/api/farmer/updateyield/:id', async (req, res) => {
    try {
        const updatedYield = await YieldSell.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        if (!updatedYield) {
            return res.status(404).json({ message: 'Yield not found' });
        }

        res.status(200).json({ message: 'Yield updated successfully', yield: updatedYield });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

// ✅ Dealers, Loans, and Cold Storage APIs
const dealersFilePath = path.join(__dirname, "dealers.json");
const loansFilePath = path.join(__dirname, "loans.json");
const coldStoresFilePath = path.join(__dirname, "ColdStore.json");

// Helper function to load JSON data
const loadJSONData = (filePath) => {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
};

app.get("/api/dealers", (req, res) => {
    try {
        let data = loadJSONData(dealersFilePath);
        data.sort((a, b) =>
            (a.State || "").localeCompare(b.State || "") ||
            (a.City || "").localeCompare(b.City || "") ||
            (a["Dealer Name"] || "").localeCompare(b["Dealer Name"] || "")
        );

        const uniqueStates = [...new Set(data.map((item) => item.State).filter(Boolean))];
        res.json({ dealers: data, uniqueStates });

    } catch (error) {
        res.status(500).json({ error: "Failed to load dealer data" });
        console.error(error);
    }
});

app.get("/api/dealers/:state", (req, res) => {
    try {
        const state = req.params.state.toLowerCase();
        let data = loadJSONData(dealersFilePath);

        const filteredData = data.filter(item => (item.State || "").toLowerCase() === state);
        filteredData.sort((a, b) =>
            (a.City || "").localeCompare(b.City || "") ||
            (a["Dealer Name"] || "").localeCompare(b["Dealer Name"] || "")
        );

        const uniqueCities = [...new Set(filteredData.map((item) => item.City).filter(Boolean))];
        res.json({ dealers: filteredData, uniqueCities });

    } catch (error) {
        res.status(500).json({ error: "Failed to load dealer data" });
        console.error(error);
    }
});

app.get("/api/dealers/:state/:city", (req, res) => {
    try {
        const { state, city } = req.params;
        let data = loadJSONData(dealersFilePath);

        const filteredData = data.filter(
            (item) =>
                (item.State || "").toLowerCase() === state.toLowerCase() &&
                (item.City || "").toLowerCase() === city.toLowerCase()
        );

        filteredData.sort((a, b) =>
            (a["Dealer Name"] || "").localeCompare(b["Dealer Name"] || "")
        );

        res.json({ dealers: filteredData });

    } catch (error) {
        res.status(500).json({ error: "Failed to load dealer data" });
        console.error(error);
    }
});

app.get("/api/loans", (req, res) => {
    try {
        const data = loadJSONData(loansFilePath);
        res.json({ loans: data });

    } catch (error) {
        res.status(500).json({ error: "Failed to load loan data" });
        console.error(error);
    }
});

app.get("/api/cold-stores", (req, res) => {
    try {
        const data = loadJSONData(coldStoresFilePath);
        res.json(data);

    } catch (error) {
        res.status(500).json({ error: "Failed to load cold storage data" });
        console.error(error);
    }
});

// Example backend route
app.post("/api/user/coins", async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({ success: false, message: "User ID is required" });
  }

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  res.json({ success: true, coins: user.coins });
});

// ✅ Start Server
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
