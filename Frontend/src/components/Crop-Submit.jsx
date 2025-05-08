import React, { useState } from 'react';
import axios from 'axios';
// import './Crop-Submit.css'; // Import the CSS file for styling

const Submit = () => {
    const [file, setFile] = useState(null);
    const [result, setResult] = useState(null);
    const [preview, setPreview] = useState(null); // For displaying the uploaded image preview
    const [error,setError]=useState("");

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
        formData.append('file', file);

        try {
            const response = await axios.post('http://127.0.0.1:8000/predict', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if(response.data==100){
                setError("Please upload img with leaves only[Background Without Leaves]")
            }
              else{
                setResult(response.data);
              }
         
            console.log(response.data);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div className="mx-auto bg-white shadow-lg rounded-2xl p-6 mt-2">
        <h2 className="text-2xl font-bold text-center text-green-700 mb-4">Submit a Leaf Image</h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
          <input
            type="file"
            onChange={handleFileChange}
            className="file-input file-input-bordered file-input-success w-full max-w-xs"
          />
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-md transition"
          >
            Submit
          </button>
        </form>
      
        {preview && (
          <div className="mt-4 text-center">
            <p className="font-semibold mb-2">Preview:</p>
            <img src={preview} alt="Preview" className="w-48 mx-auto rounded shadow-md" />
          </div>
        )}
      { error && (
            <div>
                <h2>{error}</h2>
            </div>
        )
      }
        {result && (
          <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-green-700">{result.prediction}</h3>
            <p className="text-gray-700 mt-2">{result.description}</p>
            <p className="mt-2"><strong className="text-green-600">Prevention:</strong> {result.prevent}</p>
      
            <img src={result.image_url} alt={result.title} className="w-full mt-4 rounded-md" />
      
            <h4 className="mt-4 text-lg font-bold text-green-600">Recommended Supplement</h4>
            <p>{result.supplement_name}</p>
            <div>
               <img src={result.supplement_image_url} alt={result.supplement_name} className="w-full mt-2 rounded" />
            </div>
      
      
            <a
              href={result.buy_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
            >
              Buy Here
            </a>
          </div>
        )}
      </div>
      
    );
};

export default Submit;