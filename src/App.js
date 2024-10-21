import React, { useState, useEffect } from "react";
import Home from "./Home";
import ImageViewer from "./ImageViewer";
import Capture from "./Capture"; 
import Report from "./Report";
import Dashboard from "./Dashboard";
import './tailwind.css';

function App() {
  const [route, setRoute] = useState(window.location.pathname);
  const [patientDetails, setPatientDetails] = useState(null);
  const [imageFolder, setImageFolder] = useState("");
  const [isForward, setIsForward] = useState(false);

  useEffect(() => {
    const savedDetails = localStorage.getItem('patientDetails');
    if (savedDetails) {
      setPatientDetails(JSON.parse(savedDetails));
    }

    const savedImageFolder = localStorage.getItem('imageFolder');
    if (savedImageFolder) {
      setImageFolder(savedImageFolder);
    }

    const savedIsForward = localStorage.getItem('isForward');
    if (savedIsForward) {
      setIsForward(JSON.parse(savedIsForward));
    }

    const handlePopState = () => {
      setRoute(window.location.pathname);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const navigate = (path, details = null, folder = null, isForward = false, clearPatientDetails = false) => {
    window.history.pushState({}, "", path);
    setRoute(path);

    // If details are provided, update patientDetails and store them
    if (details) {
      setPatientDetails(details);
      localStorage.setItem('patientDetails', JSON.stringify(details));
    } else if (clearPatientDetails) {
      // Clear patientDetails for Technician or Capture flow
      setPatientDetails(null);
      localStorage.removeItem('patientDetails');
    }

    // Store image folder if provided
    if (folder) {
      setImageFolder(folder);
      localStorage.setItem('imageFolder', folder);
    }

    setIsForward(isForward);
    localStorage.setItem('isForward', isForward);
  };

  return (
    <div className="App pt-2 w-screen bg-gradient-to-r from-purple-200 to-purple-400">
      {route === "/" && <Dashboard navigate={navigate} />}
      {route === "/home" && <Home navigate={navigate} patientDetails={patientDetails} imageFolder={imageFolder} />}
      {route === "/annotate" && <ImageViewer navigate={navigate} patientDetails={patientDetails} imageFolder={imageFolder} />}
      {route === "/capture" && <Capture patientDetails={patientDetails}  navigate={navigate}  />}
      {route === "/report" && <Report patientDetails={patientDetails} isForward={isForward} />}
    </div>
  );
}

export default App;