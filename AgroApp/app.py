import os
from flask import Flask, redirect, render_template, request
from PIL import Image
# import torchvision.transforms.functional as TF
import CNN
import numpy as np
import torch
import pandas as pd


disease_info = pd.read_csv('disease_info.csv' , encoding='cp1252')
supplement_info = pd.read_csv('supplement_info.csv',encoding='cp1252')

model = CNN.CNN(39)    
model.load_state_dict(torch.load("plant_disease_model_1_latest.pt"))
model.eval()

def prediction(image_path):
    # Open the image using Pillow (PIL)
    image = Image.open(image_path)
    
    # Resize the image to (224, 224)
    image = image.resize((224, 224))
    
    # Convert the image to a numpy array (for later conversion to tensor)
    image_np = np.array(image).astype(np.float32)
    
    # Normalize the image (if needed) to [0, 1] by dividing by 255
    image_np /= 255.0
    
    # Convert the numpy array to a PyTorch tensor
    input_data = torch.tensor(image_np).permute(2, 0, 1)  # Reorder to (C, H, W) format
    
    # Add batch dimension
    input_data = input_data.unsqueeze(0)
    
    # Perform inference using the model
    output = model(input_data)
    
    # Convert the output to a numpy array and get the index of the maximum value
    output = output.detach().numpy()
    index = np.argmax(output)
    
    return index

app = Flask(__name__)

@app.route('/')
def home_page():
    return render_template('home.html')

@app.route('/contact')
def contact():
    return render_template('contact-us.html')

@app.route('/index')
def ai_engine_page():
    return render_template('index.html')

@app.route('/mobile-device')
def mobile_device_detected_page():
    return render_template('mobile-device.html')

@app.route('/submit', methods=['GET', 'POST'])
def submit():
    if request.method == 'POST':
        image = request.files['image']
        filename = image.filename
        file_path = os.path.join('static/uploads', filename)
        image.save(file_path)
        print(file_path)
        pred = prediction(file_path)
        title = disease_info['disease_name'][pred]
        description =disease_info['description'][pred]
        prevent = disease_info['Possible Steps'][pred]
        image_url = disease_info['image_url'][pred]
        supplement_name = supplement_info['supplement name'][pred]
        supplement_image_url = supplement_info['supplement image'][pred]
        supplement_buy_link = supplement_info['buy link'][pred]
        return render_template('submit.html' , title = title , desc = description , prevent = prevent , 
                               image_url = image_url , pred = pred ,sname = supplement_name , simage = supplement_image_url , buy_link = supplement_buy_link)

@app.route('/market', methods=['GET', 'POST'])
def market():
    return render_template('market.html', supplement_image = list(supplement_info['supplement image']),
                           supplement_name = list(supplement_info['supplement name']), disease = list(disease_info['disease_name']), buy = list(supplement_info['buy link']))

if __name__ == '__main__':
    app.run(debug=True)
