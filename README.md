# BloodCancer-App

This is a React and Flask-based web application for collecting the blood cells dataset with the assistance of AI.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher): [Download Node.js](https://nodejs.org/)
- **Python** (v3.8 or higher): [Download Python](https://www.python.org/)
- **Git**: [Download Git](https://git-scm.com/)
- **VSCode**: [Download VSCode](https://code.visualstudio.com/download)

## Installation

Follow the steps below to download and set up the project.

### 1. Clone the Repository

Open vscode in your desired folder and then open the termianl with `Ctrl+J` and type the folling command:

```bash
git clone https://github.com/MuhammadAffanWahid/BloodCancer-App.git
```

### 2. Frontend Setup

Navigate to the `BloodCancer-App` directory and install the dependencies:

```bash
cd BloodCancer-App
npm install
```

This will install all the Node.js packages listed in the `package.json` file.

### 3. Backend Setup

Navigate to the `backend` directory and set up a virtual environment for Python:

```bash
cd src/backend
python -m venv venv
```

Activate the virtual environment:

- On **Windows**:
  ```bash
  venv\Scripts\activate
  ```
- On **macOS/Linux**:
  ```bash
  source venv/bin/activate
  ```

Install the Python dependencies:

```bash
pip install -r requirements.txt
```

### 4. Google API Setup

This project interacts with Google APIs. You'll need to set up credentials for the Google Cloud APIs and add them to your backend environment.

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a project, enable the required APIs (e.g., Google Drive API), and generate OAuth 2.0 credentials.
3. Download the `credentials.json` file and place it in the backend directory.

### 5. Configure Environment Variables

In the backend directory, create a `.env` file with the following structure:

```env
GOOGLE_CLIENT_ID=<Your-Google-Client-ID>
GOOGLE_CLIENT_SECRET=<Your-Google-Client-Secret>
FLASK_APP=app.py
FLASK_ENV=development
```

Replace `<Your-Google-Client-ID>` and `<Your-Google-Client-Secret>` with your actual credentials.

## Running the Application

### 1. Running the Frontend

In a new terminal window, navigate to the `BloodCancer-App` directory and run:

```bash
npm start
```

This will start the React development server. The frontend will be available on `http://localhost:3000/`.


### 2. Running the Backend

From the `backend` directory, ensure your virtual environment is activated, then start the Flask server:

```bash
python3 server.py
```

By default, the backend will run on `http://127.0.0.1:5000/`.


### 3. Access the Application

Open your browser and go to `http://localhost:3000/` to view the app.

## Technologies Used

- **Frontend**: React, html2canvas, jsPDF
- **Backend**: Flask, pandas, Google APIs
- **Other**: Axios for API requests, Tailwind CSS for styling, Webpack for bundling

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes.
4. Submit a pull request.

## License

This project is licensed under the MIT License.