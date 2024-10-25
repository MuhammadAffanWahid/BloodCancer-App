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

# def authorize_and_save_credentials():
#     flow = InstalledAppFlow.from_client_secrets_file(
#         'client_secret.json', SCOPES,redirect_uri=redirect_uri)  # Ensure you have client_secret.json for initial authorization
#     creds = flow.run_local_server(port=5000)  # This will open a browser for user authorization
#     save_credentials(creds)

# def refresh_and_save_credentials():
#     if creds and creds.expired and creds.refresh_token:
#         creds.refresh(Request())
#         save_credentials(creds)
#         print("Credentials have been refreshed and saved.")
#     else:
#         print("Credentials are valid.")

# if os.path.exists('cred.json'):
#     try:
#         with open('cred.json', 'r') as token:
#             creds_data = json.load(token)
#             creds = Credentials.from_authorized_user_info(creds_data, SCOPES)
#         # Refresh credentials if needed
#         refresh_and_save_credentials()
#     except Exception as e:
#         print(f"Error loading credentials: {e}")
#         # If error, it might be due to missing refresh token, authorize again
#         authorize_and_save_credentials()
# else:
#     print("No credentials file found. Initiating authorization.")
#     authorize_and_save_credentials()


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
    
@app.route('/update-status', methods=['POST'])
def update_status():
    data = request.json
    folder = data.get('folder')
    new_status = data.get('status', 'complete')

    metadata_path = os.path.join(data_dir, folder, 'metadata.csv')

    if not os.path.exists(metadata_path):
        return jsonify({'error': f'metadata.csv not found in folder {folder}'}), 404

    try:
        # Load the metadata.csv file
        metadata_df = pd.read_csv(metadata_path)

        # Update the status column
        metadata_df['status'] = new_status

        # Save the updated CSV
        metadata_df.to_csv(metadata_path, index=False)

        return jsonify({'message': f'Status updated to {new_status} in folder {folder}'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/update-metadata', methods=['POST'])
def update_metadata():
    return jsonify({'message': 'Metadata updated successfully'}), 200
    # data = request.json
    # folder = data.get('folder')
    # updated_details = data.get('details')

    # metadata_path = os.path.join(data_dir, folder, 'metadata.csv')

    # if not os.path.exists(metadata_path):
    #     return jsonify({'error': f'metadata.csv not found in folder {folder}'}), 404

    # try:
    #     # Load the metadata.csv file
    #     metadata_df = pd.read_csv(metadata_path)

    #     # Update the specific fields with the new details
    #     if 'patient_number' in updated_details:
    #         metadata_df['patient_number'] = updated_details['patient_number']
    #     if 'case_number' in updated_details:
    #         metadata_df['case_number'] = updated_details['case_number']
    #     if 'patient_name' in updated_details:
    #         metadata_df['patient_name'] = updated_details['patient_name']
    #     if 'doctor_name' in updated_details:
    #         metadata_df['doctor_name'] = updated_details['doctor_name']

    #     # Save the updated CSV
    #     metadata_df.to_csv(metadata_path, index=False)

    #     return jsonify({'message': 'Metadata updated successfully'}), 200
    # except Exception as e:
    #     return jsonify({'error': str(e)}), 500
    
    
@app.route('/save-session', methods=['POST'])
def save_session():
    data = request.json
        
    print("Request Data:", data)  # Debugging: print the incoming data

    if 'caseId' not in data:
        return jsonify({'error': 'caseId is missing from the request'}), 400


    case_id = data['caseId']
    images = data['images']  # This will be a list of base64 encoded images

    # Create a directory with the case_id inside 'unprocessed' folder
    folder_path = os.path.join('unprocessed', case_id)
    if not os.path.exists(folder_path):
        os.makedirs(folder_path)

    # Loop through the images and save them as image_0.png, image_1.png, etc.
    for index, image_data in enumerate(images):
        image_data = base64.b64decode(image_data.split(',')[1])  # Decode base64 image
        image_name = f'image_{index}.png'  # Name the images sequentially
        image_path = os.path.join(folder_path, image_name)

        with open(image_path, 'wb') as img_file:
            img_file.write(image_data)

    return jsonify({'message': 'Session saved successfully!'}), 200

if __name__ == '__main__':
    app.run(port=4000, debug=True)