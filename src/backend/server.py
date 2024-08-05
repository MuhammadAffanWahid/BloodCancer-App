from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import base64

app = Flask(__name__)
CORS(app)

results_dir = './results'

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

if __name__ == '__main__':
    app.run(port=5000, debug=True)







# from flask import Flask, request, jsonify
# import os
# import json

# app = Flask(__name__)
# RESULTS_DIR = './results'
# os.makedirs(RESULTS_DIR, exist_ok=True)

# @app.route('/api/save-image', methods=['POST'])
# def save_image():
#     if 'image' not in request.files:
#         return jsonify({'error': 'No image file provided'}), 400
    
#     image = request.files['image']
#     image_name = image.filename
    
#     if 'boxes' not in request.form:
#         return jsonify({'error': 'No bounding boxes data provided'}), 400
    
#     boxes = json.loads(request.form['boxes'])
    
#     # Save the image
#     image_path = os.path.join(RESULTS_DIR, image_name)
#     image.save(image_path)
    
#     # Optionally: Save bounding boxes data to a separate file or database
#     boxes_path = os.path.join(RESULTS_DIR, f'{os.path.splitext(image_name)[0]}_boxes.json')
#     with open(boxes_path, 'w') as f:
#         json.dump(boxes, f)
    
#     return jsonify({'message': 'Image and bounding boxes saved successfully'}), 200

# if __name__ == '__main__':
#     app.run(debug=True)
