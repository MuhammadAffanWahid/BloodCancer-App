# from flask import Flask, request, jsonify, send_from_directory
# from flask_cors import CORS
# import os
# import base64
# import pandas as pd

# app = Flask(__name__)
# CORS(app)

# results_dir = './results'
# data_dir = './data'

# if not os.path.exists(results_dir):
#     os.makedirs(results_dir)

# @app.route('/save-image', methods=['POST'])
# def save_image():
#     data = request.json
#     image_data = data['image']
#     image_name = data['name']

#     # Decode the base64 image data
#     image_data = base64.b64decode(image_data.split(',')[1])
#     image_path = os.path.join(results_dir, image_name)

#     with open(image_path, 'wb') as f:
#         f.write(image_data)

#     return jsonify({'message': 'Image saved successfully'}), 200

# @app.route('/images', methods=['GET'])
# def get_images():
#     folder = request.args.get('folder') or 'P1'
#     print("folder: ",folder)
    
#     folder_path = os.path.join(data_dir, folder)
#     print("folder_path: ",folder_path)
#     try:
#         images = [
#             {'src': os.path.join(folder_path, file), 'name': file}
#             for file in os.listdir(folder_path)
#             if file.endswith(('.png', '.jpg', '.jpeg', '.svg'))
#         ]
#         print("images: ",images)
#         return jsonify({'images': images}), 200
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500

# @app.route('/csv', methods=['GET'])
# def get_csv():
#     # folder = request.args.get('folder')   # uncommnet this for original working   ?????
#     folder = 'P1' # commnet this for original working
#     csv_path = os.path.join(data_dir, folder, 'predictions.csv')
#     print("csv path", csv_path)
#     try:
#         with open(csv_path, 'r') as file:
#             csv_data = file.read()
#         return csv_data, 200
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500

# @app.route('/folders', methods=['GET'])
# def get_folders():
#     try:
#         folders = [f for f in os.listdir(data_dir) if os.path.isdir(os.path.join(data_dir, f))]
#         return jsonify(folders), 200
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500

# if __name__ == '__main__':
#     app.run(port=5000, debug=True)


# from flask import Flask, request, jsonify, send_file, send_from_directory
# from flask_cors import CORS
# import os
# import base64
# import pandas as pd

# app = Flask(__name__)
# CORS(app, resources={r"/*": {"origins": "*"}})

# results_dir = './results'
# data_dir = './data'

# if not os.path.exists(results_dir):
#     os.makedirs(results_dir)

# @app.route('/save-image', methods=['POST'])
# def save_image():
#     data = request.json
#     image_data = data['image']
#     image_name = data['name']

#     # Decode the base64 image data
#     image_data = base64.b64decode(image_data.split(',')[1])
#     image_path = os.path.join(results_dir, image_name)

#     with open(image_path, 'wb') as f:
#         f.write(image_data)

#     return jsonify({'message': 'Image saved successfully'}), 200

# @app.route('/images', methods=['GET'])
# def get_images():
#     folder = request.args.get('folder') or 'P1'
#     print("folder: ", folder)
    
#     folder_path = os.path.join(data_dir, folder)
#     print("folder_path: ", folder_path)
#     try:
#         images = [
#             {'src': f'/image/{folder}/{file}', 'name': file}
#             for file in os.listdir(folder_path)
#             if file.endswith(('.png', '.jpg', '.jpeg', '.svg'))
#         ]
#         print("images: ", images)
#         return jsonify({'images': images}), 200
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500

# @app.route('/image/<folder>/<filename>', methods=['GET'])
# def get_image(folder, filename):
#     folder_path = os.path.join(data_dir, folder)
#     image_path = os.path.join(folder_path, filename)
#     print("Sending image:", image_path)
#     try:
#         return send_file(image_path, mimetype='image/png')
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500

# @app.route('/csv', methods=['GET'])
# def get_csv():
#     folder = request.args.get('folder') or 'P1'
#     csv_path = os.path.join(data_dir, folder, 'predictions.csv')
#     print("csv path", csv_path)
#     try:
#         with open(csv_path, 'r') as file:
#             csv_data = file.read()
#         return csv_data, 200
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500

# @app.route('/folders', methods=['GET'])
# def get_folders():
#     try:
#         folders = []
#         for folder in os.listdir(data_dir):
#             folder_path = os.path.join(data_dir, folder)
#             if os.path.isdir(folder_path):
#                 metadata_path = os.path.join(folder_path, 'metadata.csv')
#                 if os.path.exists(metadata_path):
#                     metadata_df = pd.read_csv(metadata_path)
#                     status = metadata_df['status'].iloc[0]  # Assuming status is the first row
#                     folders.append({
#                         'name': folder,
#                         'status': status,
#                         'metadata': metadata_df.to_dict(orient='records')[0]  # Passing entire metadata
#                     })
#         return jsonify(folders), 200
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500

# if __name__ == '__main__':
#     app.run(port=5000, debug=True)

from flask import Flask, request, jsonify, send_file, send_from_directory
from flask_cors import CORS
import os
import base64
import pandas as pd
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload
from google_auth_oauthlib.flow import InstalledAppFlow
import json
from google.auth.transport.requests import Request

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

results_dir = './results'
data_dir = './data'

if not os.path.exists(results_dir):
    os.makedirs(results_dir)

# Setup Google Drive API
import os
import json
from google.oauth2.credentials import Credentials
from google.auth.transport.requests import Request
from google_auth_oauthlib.flow import InstalledAppFlow

SCOPES = ['https://www.googleapis.com/auth/drive.file']
creds = None
redirect_uri = 'http://localhost:5000/'

def save_credentials(credentials, filename='cred.json'):
    with open(filename, 'w') as token:
        token.write(credentials.to_json())

def authorize_and_save_credentials():
    flow = InstalledAppFlow.from_client_secrets_file(
        'client_secret.json', SCOPES,redirect_uri=redirect_uri)  # Ensure you have client_secret.json for initial authorization
    creds = flow.run_local_server(port=5000)  # This will open a browser for user authorization
    save_credentials(creds)

def refresh_and_save_credentials():
    if creds and creds.expired and creds.refresh_token:
        creds.refresh(Request())
        save_credentials(creds)
        print("Credentials have been refreshed and saved.")
    else:
        print("Credentials are valid.")

if os.path.exists('cred.json'):
    try:
        with open('cred.json', 'r') as token:
            creds_data = json.load(token)
            creds = Credentials.from_authorized_user_info(creds_data, SCOPES)
        # Refresh credentials if needed
        refresh_and_save_credentials()
    except Exception as e:
        print(f"Error loading credentials: {e}")
        # If error, it might be due to missing refresh token, authorize again
        authorize_and_save_credentials()
else:
    print("No credentials file found. Initiating authorization.")
    authorize_and_save_credentials()


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

@app.route('/upload-pdf', methods=['POST'])
def upload_pdf():
    print("inside upload pdf")
    pdf_data = request.json
    pdf_path = os.path.join(results_dir, pdf_data['filename'])

    with open(pdf_path, 'wb') as f:
        f.write(base64.b64decode(pdf_data['content']))

    # Upload to Google Drive
    file_metadata = {'name': pdf_data['filename']}
    media = MediaFileUpload(pdf_path, mimetype='application/pdf')

    if creds is None:
        return jsonify({'error': 'Google Drive credentials not available'}), 500

    try:
        service = build('drive', 'v3', credentials=creds)
        file = service.files().create(body=file_metadata, media_body=media, fields='id').execute()
        file_id = file.get('id')
        drive_link = f"https://drive.google.com/file/d/{file_id}/view?usp=sharing"
        return jsonify({'message': 'PDF uploaded successfully', 'link': drive_link}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/images', methods=['GET'])
def get_images():
    folder = request.args.get('folder') or 'P1'
    print("folder: ", folder)
    
    folder_path = os.path.join(data_dir, folder)
    print("folder_path: ", folder_path)
    try:
        images = [
            {'src': f'/image/{folder}/{file}', 'name': file}
            for file in os.listdir(folder_path)
            if file.endswith(('.png', '.jpg', '.jpeg', '.svg'))
        ]
        print("images: ", images)
        return jsonify({'images': images}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/image/<folder>/<filename>', methods=['GET'])
def get_image(folder, filename):
    folder_path = os.path.join(data_dir, folder)
    image_path = os.path.join(folder_path, filename)
    print("Sending image:", image_path)
    try:
        return send_file(image_path, mimetype='image/png')
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/csv', methods=['GET'])
def get_csv():
    folder = request.args.get('folder') or 'P1'
    csv_path = os.path.join(data_dir, folder, 'predictions.csv')
    print("csv path", csv_path)
    try:
        with open(csv_path, 'r') as file:
            csv_data = file.read()
        return csv_data, 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/folders', methods=['GET'])
def get_folders():
    try:
        folders = []
        for folder in os.listdir(data_dir):
            folder_path = os.path.join(data_dir, folder)
            if os.path.isdir(folder_path):
                metadata_path = os.path.join(folder_path, 'metadata.csv')
                if os.path.exists(metadata_path):
                    metadata_df = pd.read_csv(metadata_path)
                    status = metadata_df['status'].iloc[0]  # Assuming status is the first row
                    folders.append({
                        'name': folder,
                        'status': status,
                        'metadata': metadata_df.to_dict(orient='records')[0]  # Passing entire metadata
                    })
        return jsonify(folders), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=4000, debug=True)