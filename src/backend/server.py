from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google.auth.transport.requests import Request
from google_auth_oauthlib.flow import InstalledAppFlow
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload
from google_auth_oauthlib.flow import InstalledAppFlow





from flask import Flask, request, jsonify, send_file, send_from_directory, g
from flask_cors import CORS
import os
import base64



import sqlite3
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

results_dir = './results'
data_dir = './data'

DATABASE = 'patients.db'

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    return db

def init_db():
    with app.app_context():
        db = get_db()
        db.execute('''
            CREATE TABLE IF NOT EXISTS patient (
                case_number INTEGER PRIMARY KEY,
                patient_number TEXT,
                patient_name TEXT,
                doctor_name TEXT,
                image_status TEXT,
                review_status TEXT
            )
        ''')
        db.commit()

def get_patient_by_case_number(case_number):
    db = get_db()
    cursor = db.execute('''
        SELECT case_number, patient_number, patient_name, doctor_name, image_status
        FROM patient
        WHERE case_number = ?
    ''', (case_number,))
    row = cursor.fetchone()

    if row:
        # Create a dictionary from the row data
        return {
            "case_number": row[0],
            "patient_number": row[1],
            "patient_name": row[2],
            "doctor_name": row[3],
            "image_status": row[4]
        }
    else:
        return None
    
def update_patient(patient_data):
    db = get_db()
    db.execute('''
        UPDATE patient
        SET patient_number = ?, patient_name = ?, doctor_name = ?
        WHERE case_number = ?
    ''', (
        patient_data["patient_number"],
        patient_data["patient_name"],
        patient_data["doctor_name"],
        patient_data["case_number"]
    ))
    db.commit()

def create_patient(case_number, patient_number, patient_name, doctor_name, image_status="processing",review_status="incomplete"):
    db = get_db()
    db.execute('''
        INSERT INTO patient (case_number, patient_number, patient_name, doctor_name, image_status, review_status)
        VALUES (?, ?, ?, ?, ?, ?)
    ''', (case_number, patient_number, patient_name, doctor_name, image_status, review_status))
    db.commit()

SCOPES = ['https://www.googleapis.com/auth/drive.file']
creds = None
redirect_uri = 'http://localhost:5000/'

def save_credentials(credentials, filename='cred.json'):
    with open(filename, 'w') as token:
        token.write(credentials.to_json())

def update_image_status(case_number, new_image_status="completed"):
    db = get_db()
    db.execute('''
        UPDATE patient
        SET image_status = ?
        WHERE case_number = ?
    ''', (new_image_status, case_number))
    db.commit()

def update_review_status(case_number, new_review_status="processed"):
    db = get_db()
    db.execute('''
        UPDATE patient
        SET review_status = ?
        WHERE case_number = ?
    ''', (new_review_status, case_number))
    db.commit()

def get_all_patients():
    with app.app_context():
        db = get_db()
        # Query to select all patients from the database
        cursor = db.execute('SELECT * FROM patient')
        rows = cursor.fetchall()
        
        # Convert each row to a dictionary
        patients = []
        for row in rows:
            print(row)
            patient = {
                'case_number': row[0],
                'patient_number': row[1],
                'patient_name': row[2],
                'doctor_name': row[3],
                'image_status': row[4],
                'review_status': row[5]
            }
            patients.append(patient)

        return patients

def clear_patient_table():
    with app.app_context():
        db = get_db()
        db.execute('DELETE FROM patient')  # Clear all records from the patient table
        db.commit()


{# def authorize_and_save_credentials():
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
}

# Takes in the image, case number and index of image and save it to corresponding dir
# @app.route('/save-image', methods=['POST'])
# def save_image():
#     data = request.json
#     image_data = data['image']
#     case_no = data['case_no']
#     index=data['image_index']

#     # Decode the base64 image data
#     image_data = base64.b64decode(image_data.split(',')[1])
#     image_path = os.path.join(results_dir, image_name)

#     with open(image_path, 'wb') as f:
#         f.write(image_data)

#     return jsonify({'message': 'Image saved successfully'}), 200

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
    
# @app.route('/update-status', methods=['POST'])
# def update_status():
#     data = request.json
#     folder = data.get('folder')
#     new_status = data.get('status', 'complete')

#     metadata_path = os.path.join(data_dir, folder, 'metadata.csv')

#     if not os.path.exists(metadata_path):
#         return jsonify({'error': f'metadata.csv not found in folder {folder}'}), 404

#     try:
#         # Load the metadata.csv file
#         metadata_df = pd.read_csv(metadata_path)

#         # Update the status column
#         metadata_df['status'] = new_status

#         # Save the updated CSV
#         metadata_df.to_csv(metadata_path, index=False)

#         return jsonify({'message': f'Status updated to {new_status} in folder {folder}'}), 200
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500

# @app.route('/update-metadata', methods=['POST'])
# def update_metadata():
#     data = request.json
#     folder = data.get('folder')
#     updated_details = data.get('details')

#     metadata_path = os.path.join(data_dir, folder, 'metadata.csv')

#     if not os.path.exists(metadata_path):
#         return jsonify({'error': f'metadata.csv not found in folder {folder}'}), 404

#     try:
#         # Load the metadata.csv file
#         metadata_df = pd.read_csv(metadata_path)

#         # Update the specific fields with the new details
#         if 'patient_number' in updated_details:
#             metadata_df['patient_number'] = updated_details['patient_number']
#         if 'case_number' in updated_details:
#             metadata_df['case_number'] = updated_details['case_number']
#         if 'patient_name' in updated_details:
#             metadata_df['patient_name'] = updated_details['patient_name']
#         if 'doctor_name' in updated_details:
#             metadata_df['doctor_name'] = updated_details['doctor_name']

#         # Save the updated CSV
#         metadata_df.to_csv(metadata_path, index=False)

#         return jsonify({'message': 'Metadata updated successfully'}), 200
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500

# @app.route('/save-session', methods=['POST'])
# def save_session():
#     data = request.json
        
#     print("Request Data:", data)  # Debugging: print the incoming data

#     if 'caseId' not in data:
#         return jsonify({'error': 'caseId is missing from the request'}), 400


#     case_id = data['caseId']
#     images = data['images']  # This will be a list of base64 encoded images

#     # Create a directory with the case_id inside 'unprocessed' folder
#     folder_path = os.path.join('unprocessed', case_id)
#     if not os.path.exists(folder_path):
#         os.makedirs(folder_path)

#     # Loop through the images and save them as image_0.png, image_1.png, etc.
#     for index, image_data in enumerate(images):
#         image_data = base64.b64decode(image_data.split(',')[1])  # Decode base64 image
#         image_name = f'image_{index}.png'  # Name the images sequentially
#         image_path = os.path.join(folder_path, image_name)

#         with open(image_path, 'wb') as img_file:
#             img_file.write(image_data)

#     return jsonify({'message': 'Session saved successfully!'}), 200






@app.route('/create-case', methods=['POST'])
def create_case():
    data = request.json
    details = data.get('details')

    # Extract details from the incoming request
    case_number = details.get('case_number')
    patient_number = details.get('patient_number')
    patient_name = details.get('patient_name')
    doctor_name = details.get('doctor_name')

    # Check if the case number already exists
    existing_patient = get_patient_by_case_number(case_number)
    
    if existing_patient:
        return jsonify({"error": "Case number already exists."}), 400

    # Create the new patient record
    create_patient(case_number, patient_number, patient_name, doctor_name)
    os.makedirs(f'images/{case_number}', exist_ok=True)

    return jsonify({"message": "New case created successfully."}), 201

@app.route('/update-case', methods=['PUT'])
def update_case():
    data = request.json
    details = data.get('details')

    case_number = details.get('case_number')
    
    # Check if the case number exists
    existing_patient = get_patient_by_case_number(case_number)
    
    if not existing_patient:
        return jsonify({"error": "Case number does not exist."}), 404

    # Update the patient record
    patient_data = {
        "case_number": case_number,
        "patient_number": details.get('patient_number'),
        "patient_name": details.get('patient_name'),
        "doctor_name": details.get('doctor_name')
    }

    update_patient(patient_data)

    return jsonify({"message": "Case updated successfully."}), 200

@app.route('/get-case',methods=["GET"])
def get_case():
    case_number = request.args.get('case_number')
    
    if not case_number:
        return jsonify({"error": "case_number is required"}), 400
    
    data = get_patient_by_case_number(case_number)

    if not data:
        return jsonify({"error": "Case not found"}), 404

    return jsonify(data), 200

@app.route('/save-image', methods=['POST'])
def save_image():
    data = request.json
    image_data = data['image']
    case_no = data['case_no']
    index = data['image_index']

    # Create the directory for the specific case number if it doesn't exist
    case_dir = os.path.join("images", case_no)
    os.makedirs(case_dir, exist_ok=True)

    # Decode the base64 image data
    image_data = base64.b64decode(image_data.split(',')[1])
    
    # Save the image with the index as the filename
    image_path = os.path.join(case_dir, f"{index}.png")

    with open(image_path, 'wb') as f:
        f.write(image_data)

    return jsonify({'message': 'Image saved successfully'}), 200

@app.route('/images', methods=['GET'])
def get_images():
    case_number = request.args.get('case_number')

    if not case_number:
        return jsonify({"error": "case_number is required"}), 400

    # Construct the directory path for the specified case number
    case_dir = os.path.join("images", case_number)

    # Check if the directory exists
    if not os.path.exists(case_dir):
        return jsonify({"error": "Case not found"}), 404

    # List all image files in the case directory
    images = []
    for filename in os.listdir(case_dir):
        if filename.endswith(('.png', '.jpg', '.jpeg')):  # Check for image file types
            images.append(filename)

    # Return the list of image file names
    return jsonify({"case_number": case_number, "images": images}), 200

@app.route('/image/<case>/<filename>', methods=['GET'])
def get_image(case, filename):
    folder_path = os.path.join("images", case)
    image_path = os.path.join(folder_path, filename)
    print("Sending image:", image_path)
    try:
        return send_file(image_path, mimetype='image/png')
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/csv', methods=['GET'])
def get_csv():
    case_number = request.args.get('case_number')

    if not case_number:
        return jsonify({"error": "case_number is required"}), 400
    
    if get_patient_by_case_number(case_number).get("image_status") != "processed":
        return jsonify({"error": "case is under processing!"}), 400

    csv_path = os.path.join("images", case_number, 'predictions.csv')
    try:
        with open(csv_path, 'r') as file:
            csv_data = file.read()
        return csv_data, 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/update-status', methods=['POST'])
def update_status():
    data = request.json
    case_number = data.get('case_number')
    new_status = data.get('status', 'complete')  # Default status is 'complete'

    if not case_number:
        return jsonify({"error": "case_number is required"}), 400
    
    if not get_patient_by_case_number(case_number):
        return jsonify({"error": "case not found!"}), 400

    update_review_status(case_number, new_status)

    return jsonify({"message": "Review status updated successfully."}), 200

@app.route('/get-all-cases', methods=['GET'])
def get_all_cases():
    patients = get_all_patients()
    return jsonify(patients), 200

@app.route('/save-session', methods=['POST'])
def save_session():
    data = request.json

    print("Request Data:", data)  # Debugging: print the incoming data

    if 'case_number' not in data:
        return jsonify({'error': 'case_number is missing from the request'}), 400

    case_number = data['case_number']
    images = data['images']  # This will be a list of base64 encoded images

    # Define the folder path for the case number
    folder_path = os.path.join('images', case_number)

    # Step 1: Delete existing images in the folder
    if os.path.exists(folder_path):
        for filename in os.listdir(folder_path):
            file_path = os.path.join(folder_path, filename)
            if os.path.isfile(file_path):
                os.remove(file_path)

    # Step 2: Create directory if it doesn't exist
    os.makedirs(folder_path, exist_ok=True)

    # Step 3: Loop through the images and save them as 1.png, 2.png, etc.
    for index, image_data in enumerate(images):
        # Decode base64 image
        image_data = base64.b64decode(image_data.split(',')[1])  
        image_name = f'{index + 1}.png'  # Name the images sequentially starting from 1
        image_path = os.path.join(folder_path, image_name)

        with open(image_path, 'wb') as img_file:
            img_file.write(image_data)

    return jsonify({'message': 'Session saved successfully!'}), 200

if __name__ == '__main__':
    init_db()
    app.run(port=4000, debug=True)