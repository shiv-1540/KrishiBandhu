import React, { useState, useEffect } from "react";

const ViewFarmProducts = () => {
  const [products, setProducts] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://krushi-backend-1.onrender.com/api/farmProducts/all");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div style={styles.container}>
      <h2>👀 Available Farm Products</h2>
      <div style={styles.productList}>
        {products.length === 0 ? (
          <p style={styles.noProducts}>No products available</p>
        ) : (
          products.map((product, index) => (
            <div
              key={index}
              style={{
                ...styles.card,
                ...(isHovered ? styles.cardHover : {}),
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {product.image && <img src={product.image} alt="Product" style={styles.image} />}
              <h3 style={styles.productName}>{product.name}</h3>
              <p style={styles.price}><b>💰 Price:</b> ₹{product.price}</p>
              <p style={styles.productDetails}><b>📦 Quantity:</b> {product.quantity}</p>
              <p style={styles.productDetails}><b>📍 Location:</b> {product.location}</p>
              <p style={styles.productDetails}><b>📞 Contact:</b> {product.farmerName} ({product.contact})</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f4f4f4",
    minHeight: "100vh",
  },
  productList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    justifyContent: "center",
    padding: "20px",
  },
  card: {
    background: "#ffffff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    transition: "transform 0.3s, box-shadow 0.3s",
  },
  cardHover: {
    transform: "scale(1.05)",
    boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.2)",
  },
  image: {
    display: "block",
    margin: "0 auto",
    width: "120px",
    height: "120px",
    borderRadius: "10px",
    marginBottom: "10px",
    objectFit: "cover",
  },
  productName: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#2E8B57",
    marginBottom: "10px",
  },
  productDetails: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "5px",
  },
  price: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#ff5722",
    marginBottom: "10px",
  },
  noProducts: {
    fontSize: "18px",
    color: "#888",
    marginTop: "20px",
  },
};

export default ViewFarmProducts;
