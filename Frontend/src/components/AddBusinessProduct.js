import React, { useState } from "react";
import axios from "axios";

const AddBusinessProduct = () => {
  const [product, setProduct] = useState({
    name: "", price: "", category: "", quantity: "", businessName: "", businessContact: "", location: "", image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setProduct({ ...product, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProduct({ ...product, image: file });
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!product.image) return alert("Please upload an image!");

    setLoading(true);
    const formData = new FormData();
    Object.keys(product).forEach((key) => formData.append(key, product[key]));

    try {
      await axios.post("https://krushi-backend-1.onrender.com/api/businessProducts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("✅ Product Added Successfully!");
      setProduct({ name: "", price: "", category: "", quantity: "", businessName: "", businessContact: "", location: "", image: null });
      setImagePreview(null);
    } catch (error) {
      console.error("Error:", error);
      alert("❌ Error adding product. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>➕ Add a Business Product</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data" style={styles.form}>
        <input type="text" name="name" placeholder="Product Name" value={product.name} onChange={handleChange} required style={styles.input} />
        <input type="number" name="price" placeholder="Price" value={product.price} onChange={handleChange} required style={styles.input} />
        <input type="number" name="quantity" placeholder="Available Quantity" value={product.quantity} onChange={handleChange} required style={styles.input} />
        <input type="text" name="businessName" placeholder="Business Name" value={product.businessName} onChange={handleChange} required style={styles.input} />
        <input type="text" name="businessContact" placeholder="Contact" value={product.businessContact} onChange={handleChange} required style={styles.input} />
        <input type="text" name="location" placeholder="Location" value={product.location} onChange={handleChange} required style={styles.input} />

        <input type="file" accept="image/*" onChange={handleImageChange} required style={styles.fileInput} />
        {imagePreview && <img src={imagePreview} alt="Preview" style={styles.imagePreview} />}

        <button type="submit" disabled={loading} style={styles.button}>{loading ? "Adding..." : "List Product"}</button>
      </form>
    </div>
  );
};

// Styles
const styles = {
  container: { textAlign: "center", padding: "20px", backgroundColor: "#f4f4f4", borderRadius: "10px", boxShadow: "0px 4px 10px rgba(0,0,0,0.2)", maxWidth: "500px", margin: "auto" },
  form: { display: "flex", flexDirection: "column", gap: "10px" },
  input: { padding: "10px", fontSize: "16px", borderRadius: "5px", border: "1px solid #ccc" },
  fileInput: { border: "none", padding: "10px", fontSize: "16px" },
  imagePreview: { width: "100px", marginTop: "10px", borderRadius: "5px" },
  button: { padding: "12px", fontSize: "16px", fontWeight: "bold", borderRadius: "5px", border: "none", cursor: "pointer", backgroundColor: "#2E8B57", color: "white", transition: "0.3s" },
};

export default AddBusinessProduct;
