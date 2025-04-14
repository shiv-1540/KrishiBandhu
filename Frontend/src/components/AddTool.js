import React, { useState } from "react";
import axios from "axios";

const AddTool = () => {
  const [tool, setTool] = useState({
    name: "",
    price: "",
    availability: "Rent",
    ownerName: "",
    ownerContact: "",
    location: "",
    image: null,
  });

  const handleChange = (e) => {
    setTool({ ...tool, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setTool({ ...tool, image: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    for (const key in tool) {
      formData.append(key, tool[key]);
    }

    try {
      await axios.post("https://krushi-backend-1.onrender.com/api/tools/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Tool listed successfully!");
      setTool({ name: "", price: "", availability: "Rent", ownerName: "", ownerContact: "", location: "", image: null });
    } catch (error) {
      alert("Error adding tool: " + error.response.data.error);
    }
  };

  return (
    <div style={styles.container}>
      <h2>➕ List Your Tool</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="text" name="name" placeholder="Tool Name" value={tool.name} onChange={handleChange} required style={styles.input} />
        <input type="number" name="price" placeholder="Price (₹ per day)" value={tool.price} onChange={handleChange} required style={styles.input} />
        <select name="availability" value={tool.availability} onChange={handleChange} style={styles.input}>
          <option value="Rent">Rent</option>
          <option value="Sale">Sale</option>
        </select>
        <input type="text" name="ownerName" placeholder="Your Name" value={tool.ownerName} onChange={handleChange} required style={styles.input} />
        <input type="text" name="ownerContact" placeholder="Your Contact" value={tool.ownerContact} onChange={handleChange} required style={styles.input} />
        <input type="text" name="location" placeholder="Location" value={tool.location} onChange={handleChange} required style={styles.input} />
        
        <label>Upload Tool Image:</label>
        <input type="file" accept="image/*" onChange={handleImageChange} required style={styles.input} />
        
        <button type="submit" style={styles.button}>Add Tool</button>
      </form>
    </div>
  );
};


// Styles
const styles = {
  container: { textAlign: "center", padding: "20px" },
  form: { display: "flex", flexDirection: "column", gap: "10px", maxWidth: "350px", margin: "auto" },
  input: { padding: "10px", fontSize: "16px", borderRadius: "5px", border: "1px solid #ccc" },
  button: { padding: "10px", backgroundColor: "#2E8B57", color: "white", fontSize: "16px", border: "none", borderRadius: "5px", cursor: "pointer" },
  imagePreview: { width: "100px", height: "100px", marginTop: "10px", borderRadius: "5px" },
};

// Styles remain unchanged
export default AddTool;
