import streamlit as st
import google.generativeai as genai
from PIL import Image
from io import BytesIO

# Set up your API key and model
genai.configure(api_key="AIzaSyAaj7V1UIbiLpOPQ2_A7oK6sKFHSdt81Lg")
generation_config = {
    "temperature": 0.4,
    "top_p": 1,
    "top_k": 32,
    "max_output_tokens": 4096,
}
safety_settings = [
    {"category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
    {"category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
    {"category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
    {"category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
]
model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    generation_config=generation_config,
    safety_settings=safety_settings,
)

def process_image(image_bytes):
    image_parts = [
        {"mime_type": "image/png", "data": image_bytes}
    ]
    prompt_parts = [
  "\nYou are a professional Plant disease detector.  \nI'll provide an image of a leaf of a plant. Identify any disease in the plant and provide a structured response in the following format:\nPredicted Plant Disease: [Include name of disease, details about symptoms, affected parts etc.]\nPrecautions: [In bullet points, List 2-3 precautionary measures to prevent this disease from occurring or spreading further]\nRemedies: [In bullet points, Provide 2-3 treatment methods, natural remedies or solutions that can help cure or manage this plant disease]\nPlease ensure your response has these 3 clear sections with relevant details in each. Do not include any additional descriptive text outside the requested structure.\n\n",
  image_parts[0],
  "\n",
]

    response = model.generate_content(prompt_parts)
    return response.text

# Streamlit app
st.title("Plant Disease Detection using Vision techniques")
st.write("Discover plant care made easy with Vision techniques! Our project uses new age technology to spot plant diseases through pictures.  It's like having a plant doctor with large data in your pocket! Early detection, simple solutions. Keep your plants healthy!")
uploaded_file = st.file_uploader("Choose an image...", type=["png", "jpeg", "jpg"])

if uploaded_file is not None:
    st.image(uploaded_file, caption="Uploaded Image.", use_column_width=True)
    st.write("")
    st.write("Analyzing...")

    # Process the image and display the response
    image_bytes = uploaded_file.read()
    response_text = process_image(image_bytes)
    st.write(response_text)