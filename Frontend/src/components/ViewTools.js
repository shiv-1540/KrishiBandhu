import React, { useState, useEffect } from "react";
import axios from "axios";

const ViewTools = () => {
  const [tools, setTools] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const response = await axios.get("https://krushi-backend-1.onrender.com/api/tools/list");
        setTools(response.data);
      } catch (error) {
        console.error("Error fetching tools:", error);
      }
    };

    fetchTools();
  }, []);

  return (
    <div style={styles.container}>
      <h2>👀 Available Tools</h2>
      <div style={styles.toolList}>
        {tools.length === 0 ? (
          <p style={styles.noTools}>No tools available.</p>
        ) : (
          tools.map((tool, index) => (
            <div
              key={index}
              style={{
                ...styles.card,
                ...(isHovered ? styles.cardHover : {}),
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <img
                src={tool.image ? `https://krushi-backend-1.onrender.com${tool.image}` : "https://via.placeholder.com/100"}
                alt="Tool"
                style={styles.image}
              />
              <h3 style={styles.toolName}>{tool.name}</h3>
              <p style={styles.price}><b>💰 Price:</b> ₹{tool.price} {tool.availability === "Rent" ? "per day" : ""}</p>
              <p style={styles.toolDetails}><b>📍 Location:</b> {tool.location}</p>
              <p style={styles.toolDetails}><b>📞 Contact:</b> {tool.ownerName} ({tool.ownerContact})</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f4f4f4",
    minHeight: "100vh",
  },
  toolList: {
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
    display: "block", // Makes the image a block element
    margin: "0 auto", // Centers the image horizontally
    width: "120px",
    height: "120px",
    borderRadius: "10px",
    marginBottom: "10px",
    objectFit: "cover",
  },
  toolName: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#2E8B57",
    marginBottom: "10px",
  },
  toolDetails: {
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
  noTools: {
    fontSize: "18px",
    color: "#888",
    marginTop: "20px",
  },
};

export default ViewTools;
