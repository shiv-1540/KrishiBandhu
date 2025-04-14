import React, { useState, useEffect } from "react";

const ViewCrops = () => {
  const [crops, setCrops] = useState([]);

  useEffect(() => {
    // Dummy data - In real case, fetch from backend
    setCrops([
      { name: "Wheat", price: "20", quantity: "1000", farmerContact: "9876543210" },
      { name: "Tomatoes", price: "30", quantity: "500", farmerContact: "9988776655" },
      { name: "Rice", price: "25", quantity: "1200", farmerContact: "9090909090" },
    ]);
  }, []);

  return (
    <div style={styles.container}>
      <h2>👀 Available Crops for Sale</h2>
      <div style={styles.cropList}>
        {crops.map((crop, index) => (
          <div key={index} style={styles.card}>
            <h3>{crop.name}</h3>
            <p><b>💰 Price:</b> ₹{crop.price} per kg</p>
            <p><b>📦 Quantity:</b> {crop.quantity} kg</p>
            <p><b>📞 Contact:</b> {crop.farmerContact}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: { textAlign: "center" },
  cropList: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", justifyContent: "center", padding: "20px" },
  card: { background: "#fff", padding: "15px", borderRadius: "10px", boxShadow: "0px 2px 8px rgba(0,0,0,0.1)", textAlign: "center" },
};

export default ViewCrops;
