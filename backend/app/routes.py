from flask import Blueprint, request, jsonify
from app.model.cnn import load_cnn_model, image_bytes_to_tensor, predict

model = load_cnn_model()

main = Blueprint('main', __name__)

@main.route("/", methods=["GET"])
def index():
    return "Hello, Flask!"

@main.route("/predict", methods=["POST"])
def classify():
    if "file" not in request.files:
        return jsonify({'error': 'No file provided'}), 400
    
    file = request.files['file']
    image_bytes = file.read()
    image_tensor = image_bytes_to_tensor(image_bytes)
    results = predict(model, image_tensor)

    return jsonify(results), 200
