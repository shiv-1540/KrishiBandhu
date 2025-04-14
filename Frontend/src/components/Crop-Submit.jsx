import React, { useState } from 'react';
import axios from 'axios';
import './Crop-Submit.css'; // Import the CSS file for styling

const Submit = () => {
    const [file, setFile] = useState(null);
    const [result, setResult] = useState(null);
    const [preview, setPreview] = useState(null); // For displaying the uploaded image preview

    const handleFileChange = (e) => {
        const uploadedFile = e.target.files[0];
        setFile(uploadedFile);
        setPreview(URL.createObjectURL(uploadedFile)); // Generate a preview URL for the uploaded image
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            alert('Please upload a file!');
            return;
        }

        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await axios.post('http://127.0.0.1:5000/submit', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setResult(response.data);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div className="submit-container">
            <h2 className="submit-title">Submit a Leaf Image</h2>
            <form onSubmit={handleSubmit} className="submit-form">
                <input type="file" onChange={handleFileChange} className="file-input " />
                <button type="submit" className="btn-custom">Submit</button>
            </form>

            {preview && (
                <div className="preview-box">
                    <h3>Uploaded Image Preview:</h3>
                    <img src={preview} alt="Uploaded Preview" className="preview-image" />
                </div>
            )}

            {result && (
                <div className="result-box">
                    <h3 className="result-title">{result.title}</h3>
                    <p>{result.description}</p>
                    <p><strong>Prevention Steps:</strong> {result.prevent}</p>
                    <img src={result.image_url} alt={result.title} className="result-image" />
                    <h4>Recommended Supplement</h4>
                    <p>{result.supplement_name}</p>
                    <img src={result.supplement_image_url} alt={result.supplement_name} className="result-image" />
                    <a href={result.buy_link} target="_blank" rel="noopener noreferrer" className="buy-link">Buy Here</a>
                </div>
            )}
        </div>
    );
};

export default Submit;