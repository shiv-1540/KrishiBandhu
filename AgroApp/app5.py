import os
import numpy as np
from fastapi import FastAPI, File, UploadFile
from PIL import Image
import keras
from keras.saving import load_model
import jax.numpy as jnp

# Set Keras backend to JAX
os.environ["KERAS_BACKEND"] = "jax"

# Initialize FastAPI app
app = FastAPI()

# Load the model from Hugging Face Hub
model = load_model("hf://premo625/Plant_disease_detection_cnn_model")

# Image preprocessing function
def preprocess_image(image: Image.Image):
    image = image.resize((224, 224))  # Resize to match model input
    image_array = np.array(image).astype(np.float32) / 255.0  # Normalize
    image_array = jnp.array(image_array)  # Convert to JAX NumPy array
    image_array = image_array.transpose(2, 0, 1)  # Change to (C, H, W) format
    image_array = jnp.expand_dims(image_array, axis=0)  # Add batch dimension
    return image_array

# Prediction endpoint
@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    image = Image.open(file.file)
    input_data = preprocess_image(image)
    
    # Perform inference
    output = model(input_data)
    pred_index = int(jnp.argmax(output))
    
    return {"prediction": pred_index}

# Run FastAPI server
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
