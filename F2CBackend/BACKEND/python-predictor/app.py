from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
import cv2
import numpy as np
import os

app = Flask(__name__)
CORS(app)

# Load your trained model once when the app starts
MODEL_PATH = 'model/fruit_veg_classifier_model.h5'
model = load_model(MODEL_PATH)

class_names = [
    "apple", "banana", "beetroot", "bell pepper", "cabbage", "capsicum", "carrot", "cauliflower",
    "chilli pepper", "corn", "cucumber", "eggplant", "garlic", "ginger", "grapes", "jalepeno",
    "kiwi", "lemon", "lettuce", "mango", "onion", "orange", "paprika", "pear", "peas",
    "pineapple", "pomegranate", "potato", "raddish", "soy beans", "spinach", "sweetcorn",
    "sweetpotato", "tomato", "turnip", "watermelon"
]

@app.route('/predict-image', methods=['POST'])
def predict_image():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400

    image_file = request.files['image']
    img_bytes = image_file.read()
    np_arr = np.frombuffer(img_bytes, np.uint8)
    img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

    if img is None:
        return jsonify({'error': 'Invalid image format'}), 400

    img_resized = cv2.resize(img, (256, 256))
    img_rgb = cv2.cvtColor(img_resized, cv2.COLOR_BGR2RGB)
    img_normalized = img_rgb.astype('float32') / 255.0
    img_input = np.expand_dims(img_normalized, axis=0)

    prediction = model.predict(img_input)
    predicted_index = np.argmax(prediction)
    predicted_class = class_names[predicted_index]

    return jsonify({'predicted_name': predicted_class})

if __name__ == '__main__':
    app.run(debug=True)
