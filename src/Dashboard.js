import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUserMd, FaTools } from 'react-icons/fa';  

function Dashboard({ navigate }) {
  const [folders, setFolders] = useState([]); // State to hold folder data
  const [userType, setUserType] = useState(null); // State to track selected user type
  const [doctorAction, setDoctorAction] = useState(null); // State to track doctor's selected action

  // Effect to fetch folders when doctor selects 'Review'
  useEffect(() => {
    if (doctorAction === 'Review') {
      const fetchFolders = async () => {
        try {
          const response = await axios.get('http://localhost:4000/folders'); // Fetch folders from the API
          setFolders(response.data); // Set fetched folders to state
        } catch (error) {
          console.error('Error fetching folders:', error); // Log any errors during fetching
        }
      };
      fetchFolders(); // Call fetch function
    }
  }, [doctorAction]); // Dependency array to run effect when doctorAction changes

  // Handle user selection (Technician or Doctor)
  const handleUserSelection = (user) => {
    setUserType(user); // Set user type based on selection
    if (user === 'Technician') {
      // Clear patientDetails when Technician is selected
      navigate('/home', null, null, false, true);  // Navigate and clear patient details
    }
  };

  // Handle doctor's action selection (Capture or Review)
  const handleDoctorAction = (action) => {
    if (action === 'Capture') {
      // Clear patientDetails when Doctor selects Capture
      navigate('/home', null, null, false, true);  // Navigate and clear patient details
    } else if (action === 'Review') {
      setDoctorAction('Review'); // Set doctor action to Review
    }
  };

  // Handle folder selection
  const handleFolderClick = (folder) => {
    // Retain patientDetails when selecting a patient card in Review mode
    navigate('/home', folder.metadata, folder.name); // Navigate to home with folder details
  };

  // Go back to the previous selection
  const goBack = () => {
    if (doctorAction) {
      setDoctorAction(null); // Clear doctor action if currently set
    } else {
      setUserType(null); // Clear user type if currently set
    }
  };

  // If no user type is selected, display user selection options
  if (!userType) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-200 to-purple-400">
        <div className="grid grid-cols-1 gap-10 text-center">
          <div
            onClick={() => handleUserSelection('Technician')} // Handle Technician selection
            className="cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl bg-blue-500 px-28 py-10 rounded-lg shadow-lg flex flex-col justify-center items-center"
          >
            <FaTools className="text-white text-9xl" /> 
            <div className="mt-4 text-white text-xl font-bold">Technician</div> 
          </div>
          <div
            onClick={() => handleUserSelection('Doctor')} // Handle Doctor selection
            className="cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl bg-green-500 px-28 py-10 rounded-lg shadow-lg flex flex-col justify-center items-center"
          >
            <FaUserMd className="text-white text-9xl" /> 
            <div className="mt-4 text-white text-xl font-bold">Doctor</div> 
          </div>
        </div>
      </div>
    );
  }

  // If user type is Doctor and no action is selected
  if (userType === 'Doctor' && !doctorAction) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-purple-200 to-purple-400">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 text-center mb-8">
          <div
            onClick={() => handleDoctorAction('Capture')} // Handle Capture action
            className="cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl bg-blue-500 p-10 rounded-lg shadow-lg flex justify-center items-center"
          >
            <div className="text-white text-6xl font-bold">Capture</div>
          </div>
          <div
            onClick={() => handleDoctorAction('Review')} // Handle Review action
            className="cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl bg-green-500 p-10 rounded-lg shadow-lg flex justify-center items-center"
          >
            <div className="text-white text-6xl font-bold">Review</div>
          </div>
        </div>
        <button
          onClick={goBack} // Go back to previous selection
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-lg shadow-md transform transition-transform duration-300 ease-in-out hover:scale-105"
        >
          Back
        </button>
      </div>
    );
  }

  // If doctor action is 'Review', display the patient folders
  if (doctorAction === 'Review') {
    return (
      <div className="p-4 min-h-screen bg-gradient-to-r from-purple-200 to-purple-400">
        <h1 className="text-4xl font-bold mb-8 text-center text-purple-700">Patient Folders</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {folders.map((folder) => (
            <div
              key={folder.name} // Unique key for each folder
              onClick={() => handleFolderClick(folder)} // Handle folder click
              className={`cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl p-6 rounded-lg shadow-lg text-center text-white font-semibold text-xl ${
                folder.metadata.status === 'complete' ? 'bg-green-500' : 'bg-red-500'
              }`}
            >
              <div className="bg-white text-black p-4 rounded mb-4 shadow">
                <h2 className="font-bold text-2xl">{folder.metadata.patient_name}</h2>
                <p className="text-lg">{folder.metadata.patient_number}</p>
              </div>
              <div className="text-left text-lg">
                <p><span className="font-bold">Case Number:</span> {folder.metadata.case_number}</p>
                <p><span className="font-bold">Doctor:</span> {folder.metadata.doctor_name}</p>
                <p><span className="font-bold">Status:</span> {folder.metadata.status}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <button
            onClick={goBack} // Go back to previous selection
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-lg shadow-md transform transition-transform duration-300 ease-in-out hover:scale-105"
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  return null; // Fallback return value (should not occur)
}

export default Dashboard; // Export the Dashboard component
