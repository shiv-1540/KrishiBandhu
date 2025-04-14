import React, { useState } from "react";

const AddCrop = () => {
  const [crop, setCrop] = useState({
    name: "",
    price: "",
    quantity: "",
    farmerContact: "",
  });

  const handleChange = (e) => {
    setCrop({ ...crop, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Crop Added:", crop);
    alert("Crop listed successfully!");
    setCrop({ name: "", price: "", quantity: "", farmerContact: "" });
  };

  return (
    <div style={styles.container}>
      <h2>➕ Sell Your Crop</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="text" name="name" placeholder="Crop Name" value={crop.name} onChange={handleChange} required style={styles.input} />
        <input type="number" name="price" placeholder="Price (₹ per kg)" value={crop.price} onChange={handleChange} required style={styles.input} />
        <input type="number" name="quantity" placeholder="Quantity (kg)" value={crop.quantity} onChange={handleChange} required style={styles.input} />
        <input type="text" name="farmerContact" placeholder="Your Contact" value={crop.farmerContact} onChange={handleChange} required style={styles.input} />
        <button type="submit" style={styles.button}>List Crop</button>
      </form>
    </div>
  );
};

// Styles
const styles = {
  container: { textAlign: "center" },
  form: { display: "flex", flexDirection: "column", gap: "10px", maxWidth: "300px", margin: "auto" },
  input: { padding: "10px", fontSize: "16px", borderRadius: "5px", border: "1px solid #ccc" },
  button: { padding: "10px", backgroundColor: "#2E8B57", color: "white", fontSize: "16px", border: "none", borderRadius: "5px", cursor: "pointer" },
};

export default AddCrop;
