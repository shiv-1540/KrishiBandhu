import React, { useState } from "react";
import axios from "axios";

const CropRecom = () => {
  const [formData, setFormData] = useState({
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    temperature: "",
    humidity: "",
    ph: "",
    rainfall: "",
  });

  const [prediction, setPrediction] = useState(null);
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setPrediction(null);
    setDescription("");
    setImageUrl("");

    try {
      const response = await axios.post(
        "https://croprecomendation-tuly.onrender.com/predict",
        {
          nitrogen: parseFloat(formData.nitrogen),
          phosphorus: parseFloat(formData.phosphorus),
          potassium: parseFloat(formData.potassium),
          temperature: parseFloat(formData.temperature),
          humidity: parseFloat(formData.humidity),
          ph: parseFloat(formData.ph),
          rainfall: parseFloat(formData.rainfall),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      setPrediction(response.data.recommended_crop);
      setDescription(response.data.description); // Assuming the API returns a description
      setImageUrl(response.data.image_url); // Assuming the API returns an image URL
    } catch (err) {
      console.error("API Error:", err);
      setError("Failed to get a recommendation. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Crop Recommendation</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {["nitrogen", "phosphorus", "potassium", "temperature", "humidity", "ph", "rainfall"].map((field) => (
            <div key={field}>
              <label className="block font-medium capitalize">{field}</label>
              <input
                type="number"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-400"
                required
              />
            </div>
          ))}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
            disabled={loading}
          >
            {loading ? "Predicting..." : "Get Recommendation"}
          </button>
        </form>

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        {prediction && (
          <div className="mt-4 p-4 bg-green-100 text-green-800 text-center rounded-md">
            <h3 className="text-lg font-bold">Recommended Crop: {prediction}</h3>
            {description && <p className="mt-2">{description}</p>}
            {imageUrl && <img src={imageUrl} alt={prediction} className="mt-4 w-full rounded-md" />}
          </div>
        )}
      </div>
    </div>
  );
};

export default CropRecom;
