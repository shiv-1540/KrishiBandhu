import React, { useState } from "react";

const ExpertSignup = ({ onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [experience, setExperience] = useState(""); // New state for experience
  const [roomId, setRoomId] = useState(""); // New state for room ID
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [message, setMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("specialization", specialization);
      formData.append("experience", experience); // Append experience
      formData.append("roomId", roomId); // Append room ID
      if (profilePhoto) {
        formData.append("profilePhoto", profilePhoto);
      }

      const response = await fetch("https://krushi-backend-1.onrender.com/api/expert/auth/signup", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Signup successful! You can now login.");
      } else {
        setMessage(data.error);
      }
    } catch (error) {
      setMessage("Signup failed. Try again.");
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2 style={styles.title}>📝 Expert Signup</h2>
        {message && <p style={styles.message}>{message}</p>}
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Specialization"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="number"
            placeholder="Experience in Years"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            required
            style={styles.input}
          />
          <label style={styles.label}>Upload Profile Photo:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProfilePhoto(e.target.files[0])}
            style={styles.fileInput}
          />
          <button style={styles.button}>Signup</button>
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
    backgroundColor: "rgba(0, 0, 0, 0.6)", // Dark overlay for focus
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
  fileInput: {
    margin: "12px 0",
    fontSize: "16px",
  },
  label: {
    display: "block",
    marginTop: "10px",
    fontSize: "14px",
    color: "#333",
    textAlign: "left",
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
  message: {
    fontSize: "14px",
    color: "green",
    marginBottom: "10px",
  },
};

export default ExpertSignup;