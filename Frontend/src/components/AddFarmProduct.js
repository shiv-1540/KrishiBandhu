import React, { useState } from "react";

const AddFarmProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    quantity: "",
    farmerName: "",
    contact: "",
    location: "",
    image: null,
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProduct({ ...product, image: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("quantity", product.quantity);
    formData.append("farmerName", product.farmerName);
    formData.append("contact", product.contact);
    formData.append("location", product.location);
    if (product.image) {
      formData.append("image", product.image); // Append image file
    }

    try {
      const response = await fetch("https://krushi-backend-1.onrender.com/api/farmProducts/add", {
        method: "POST",
        body: formData, // ✅ Send FormData (not JSON)
      });

      if (response.ok) {
        alert("Product added successfully!");
        setProduct({ name: "", price: "", quantity: "", farmerName: "", contact: "", location: "", image: null });
      } else {
        alert("Error adding product");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h2>➕ Sell Your Product</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="text" name="name" placeholder="Product Name" value={product.name} onChange={handleChange} required style={styles.input} />
        <input type="number" name="price" placeholder="Price (₹)" value={product.price} onChange={handleChange} required style={styles.input} />
        <input type="text" name="quantity" placeholder="Quantity" value={product.quantity} onChange={handleChange} required style={styles.input} />
        <input type="text" name="farmerName" placeholder="Your Name" value={product.farmerName} onChange={handleChange} required style={styles.input} />
        <input type="text" name="contact" placeholder="Your Contact" value={product.contact} onChange={handleChange} required style={styles.input} />
        <input type="text" name="location" placeholder="Location" value={product.location} onChange={handleChange} required style={styles.input} />

        <label>Upload Product Image:</label>
        <input type="file" accept="image/*" onChange={handleImageChange} required style={styles.input} />

        <button type="submit" style={styles.button}>Add Product</button>
      </form>
    </div>
  );
};

const styles = {
  container: { textAlign: "center" },
  form: { display: "flex", flexDirection: "column", gap: "10px", maxWidth: "350px", margin: "auto" },
  input: { padding: "10px", fontSize: "16px", borderRadius: "5px", border: "1px solid #ccc" },
  button: { padding: "10px", backgroundColor: "#2E8B57", color: "white", fontSize: "16px", border: "none", borderRadius: "5px", cursor: "pointer" },
  imagePreview: { width: "100px", height: "100px", marginTop: "10px", borderRadius: "5px" },
};


export default AddFarmProduct;
