import React, { useState } from "react";

const ExpertLogin = ({ onLogin, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://krushi-backend-1.onrender.com/api/expert/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("expertToken", data.token);
        localStorage.setItem("isExpertAuthenticated", "true");
        onLogin();
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("Login failed. Try again.");
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2 style={styles.title}>🔑 Expert Login</h2>
        {message && <p style={styles.message}>{message}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
          <button style={styles.button}>Login</button>
          <button onClick={onClose} style={styles.closeButton}>Close</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.6)", // Darker overlay for better focus
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modal: {
    background: "white",
    padding: "40px",
    borderRadius: "12px",
    textAlign: "center",
    boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.3)", // Enhanced shadow for depth
    width: "90%",
    maxWidth: "400px",
    animation: "fadeIn 0.3s ease-in-out", // Smooth fade-in animation
  },
  title: {
    fontSize: "26px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#2E8B57",
  },
  input: {
    width: "100%",
    padding: "12px",
    margin: "12px 0",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "16px",
    transition: "border-color 0.3s ease",
  },
  button: {
    background: "#2E8B57",
    color: "white",
    padding: "12px 20px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    margin: "10px",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "background 0.3s ease",
  },
  buttonHover: {
    background: "#1B5E20",
  },
  closeButton: {
    background: "red",
    color: "white",
    padding: "12px 20px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "background 0.3s ease",
  },
  closeButtonHover: {
    background: "#B22222",
  },
  message: {
    fontSize: "14px",
    color: "red",
    marginBottom: "10px",
  },
};

export default ExpertLogin;