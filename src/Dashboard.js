import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard({ navigate }) {
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/folders');
        setFolders(response.data);
      } catch (error) {
        console.error('Error fetching folders:', error);
      }
    };

    fetchFolders();
  }, []);

  const handleFolderClick = (folder) => {
    navigate('/home', folder.metadata, folder.name);
  };

  return (
    <div className="p-4 min-h-screen bg-gradient-to-r from-purple-200 to-purple-400">
      <h1 className="text-4xl font-bold mb-8 text-center text-purple-700">Patient Folders</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {folders.map((folder) => (
          <div
            key={folder.name}
            onClick={() => handleFolderClick(folder)}
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
    </div>
  );
}

export default Dashboard;