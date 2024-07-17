from flask import Flask, request, jsonify
import os

app = Flask(__name__)

@app.route('/api/delete-image', methods=['DELETE'])
def delete_image():
    data = request.get_json()
    image_name = data.get('imageName')
    file_path = os.path.join('./data', image_name)

    try:
        if os.path.exists(file_path):
            os.remove(file_path)
            return jsonify({'message': 'Image deleted successfully.'}), 200
        else:
            return jsonify({'message': 'Image not found.'}), 404
    except Exception as e:
        return jsonify({'message': 'Error deleting image: ' + str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
