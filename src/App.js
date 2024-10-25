import React, { useState, useEffect } from "react"; // Importing React and hooks
import Home from "./Home"; // Home component for displaying patient information
import ImageViewer from "./ImageViewer"; // Component for viewing annotated images
import Capture from "./Capture"; // Component for capturing images
import Report from "./Report"; // Component for generating reports
import Dashboard from "./Dashboard"; // Dashboard component for navigation
import './tailwind.css'; // Tailwind CSS for styling

function App() {
  // State variables to manage application state
  const [route, setRoute] = useState(window.location.pathname); // Current route in the application
  const [patientDetails, setPatientDetails] = useState(null); // Store details of the selected patient
  const [imageFolder, setImageFolder] = useState(""); // Store the path of the image folder
  const [isForward, setIsForward] = useState(false); // Flag to track navigation direction

  // Effect hook to handle side effects and retrieve data from localStorage
  useEffect(() => {
    // Retrieve and parse patient details from localStorage
    const savedDetails = localStorage.getItem('patientDetails');
    if (savedDetails) {
      setPatientDetails(JSON.parse(savedDetails)); // Update state with patient details
    }

    // Retrieve image folder path from localStorage
    const savedImageFolder = localStorage.getItem('imageFolder');
    if (savedImageFolder) {
      setImageFolder(savedImageFolder); // Update state with image folder path
    }

    // Retrieve navigation direction from localStorage
    const savedIsForward = localStorage.getItem('isForward');
    if (savedIsForward) {
      setIsForward(JSON.parse(savedIsForward)); // Update state with navigation direction
    }

    // Function to handle browser navigation events (back/forward)
    const handlePopState = () => {
      setRoute(window.location.pathname); // Update route state when navigation occurs
    };

    // Add event listener for popstate events to handle back/forward navigation
    window.addEventListener("popstate", handlePopState);

    // Cleanup function to remove the event listener on component unmount
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []); // Run effect once on component mount

  // Function to navigate to different application routes
  const navigate = (path, details = null, folder = null, isForward = false, clearPatientDetails = false) => {
    window.history.pushState({}, "", path); // Update the browser's history stack
    setRoute(path); // Update the current route state

    // If details are provided, update patient details and store them in localStorage
    if (details) {
      setPatientDetails(details);
      localStorage.setItem('patientDetails', JSON.stringify(details)); // Persist patient details
    } else if (clearPatientDetails) {
      // Clear patient details if specified (for Technician or Capture flow)
      setPatientDetails(null);
      localStorage.removeItem('patientDetails'); // Remove patient details from localStorage
    }

    // If an image folder is provided, update state and localStorage
    if (folder) {
      setImageFolder(folder);
      localStorage.setItem('imageFolder', folder); // Persist image folder path
    }

    setIsForward(isForward); // Update navigation direction state
    localStorage.setItem('isForward', isForward); // Persist navigation direction
  };

  // Render the appropriate component based on the current route
  return (
    <div className="App pt-2 w-screen bg-gradient-to-r from-purple-200 to-purple-400">
      {route === "/" && <Dashboard navigate={navigate} />} {/* Render Dashboard on root route */}
      {route === "/home" && <Home navigate={navigate} patientDetails={patientDetails} imageFolder={imageFolder} />} {/* Render Home component */}
      {route === "/annotate" && <ImageViewer navigate={navigate} patientDetails={patientDetails} imageFolder={imageFolder} />} {/* Render ImageViewer component */}
      {route === "/capture" && <Capture patientDetails={patientDetails} navigate={navigate} />} {/* Render Capture component */}
      {route === "/report" && <Report patientDetails={patientDetails} isForward={isForward} />} {/* Render Report component */}
    </div>
  );
}

export default App; // Export the App component for usage in other parts of the application
