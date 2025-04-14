import React, { useState, useEffect } from "react";
import axios from "axios";

const ViewBusinessProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("https://krushi-backend-1.onrender.com/api/businessProducts")
      .then(res => setProducts(res.data))
      .catch(err => console.error("Error fetching products:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={styles.container}>
      <h2>👀 Available Business Products</h2>

      {loading ? (
        <p>Loading products...</p>
      ) : products.length === 0 ? (
        <p>No products found!</p>
      ) : (
        <div style={styles.grid}>
          {products.map((product, index) => (
            <div key={index} style={styles.card}>
              <img src={`https://krushi-backend-1.onrender.com${product.image}`} alt={product.name} style={styles.image} />
              <h3>{product.name}</h3>
              <p><b>Price:</b> ₹{product.price} per unit</p>
              <p><b>Location:</b> {product.location}</p>
              <p><b>Contact:</b> {product.businessName} ({product.businessContact})</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Styles
const styles = {
  container: { textAlign: "center", padding: "20px", backgroundColor: "#f4f4f4", borderRadius: "10px", boxShadow: "0px 4px 10px rgba(0,0,0,0.2)", margin: "auto", maxWidth: "800px" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px", marginTop: "20px" },
  card: { backgroundColor: "#fff", padding: "15px", borderRadius: "10px", boxShadow: "0px 4px 10px rgba(0,0,0,0.2)", textAlign: "left" },
  image: { width: "100%", height: "150px", objectFit: "cover", borderRadius: "5px" },
};

export default ViewBusinessProducts;
