from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import base64

app = Flask(__name__)
CORS(app)

results_dir = './results'
data_dir = './data'

if not os.path.exists(results_dir):
    os.makedirs(results_dir)

@app.route('/save-image', methods=['POST'])
def save_image():
    data = request.json
    image_data = data['image']
    image_name = data['name']

    # Decode the base64 image data
    image_data = base64.b64decode(image_data.split(',')[1])
    image_path = os.path.join(results_dir, image_name)

    with open(image_path, 'wb') as f:
        f.write(image_data)

    return jsonify({'message': 'Image saved successfully'}), 200



@app.route('/folders', methods=['GET'])
def get_folders():
    try:
        folders = [f for f in os.listdir(data_dir) if os.path.isdir(os.path.join(data_dir, f))]
        return jsonify(folders), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
    
if __name__ == '__main__':
    app.run(port=5000, debug=True)