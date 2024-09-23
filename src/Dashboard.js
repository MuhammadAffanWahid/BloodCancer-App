// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { FaUserMd, FaTools } from 'react-icons/fa';  // Icons for Doctor and Technician

// function Dashboard({ navigate }) {
//   const [folders, setFolders] = useState([]);
//   const [userType, setUserType] = useState(null);  // State for user type (Technician/Doctor)
//   const [doctorAction, setDoctorAction] = useState(null);  // State for Doctor's action (Review/Capture)

//   useEffect(() => {
//     if (doctorAction === 'Review') {
//       const fetchFolders = async () => {
//         try {
//           const response = await axios.get('http://localhost:4000/folders');
//           setFolders(response.data);
//         } catch (error) {
//           console.error('Error fetching folders:', error);
//         }
//       };
//       fetchFolders();
//     }
//   }, [doctorAction]);

//   const handleUserSelection = (user) => {
//     setUserType(user);
//   };

//   const handleDoctorAction = (action) => {
//     if (action === 'Capture') {
//       navigate('/home');
//     } else if (action === 'Review') {
//       setDoctorAction('Review');
//     }
//   };

//   const handleFolderClick = (folder) => {
//     navigate('/home', folder.metadata, folder.name);
//   };

//   const goBack = () => {
//     if (doctorAction) {
//       setDoctorAction(null);  // Go back to Doctor action selection
//     } else {
//       setUserType(null);  // Go back to User type selection
//     }
//   };

//   // Show large tiles for Technician/Doctor selection if no userType selected yet
//   if (!userType) {
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-200 to-purple-400">
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 text-center">
//           <div
//             onClick={() => handleUserSelection('Technician')}
//             className="cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl bg-blue-500 p-10 rounded-lg shadow-lg flex justify-center items-center"
//           >
//             <FaTools className="text-white text-9xl" /> {/* Icon for Technician */}
//           </div>
//           <div
//             onClick={() => handleUserSelection('Doctor')}
//             className="cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl bg-green-500 p-10 rounded-lg shadow-lg flex justify-center items-center"
//           >
//             <FaUserMd className="text-white text-9xl" /> {/* Icon for Doctor */}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Show Capture/Review options for Doctor
//   if (userType === 'Doctor' && !doctorAction) {
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-200 to-purple-400">
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 text-center">
//           <div
//             onClick={() => handleDoctorAction('Capture')}
//             className="cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl bg-blue-500 p-10 rounded-lg shadow-lg flex justify-center items-center"
//           >
//             <div className="text-white text-6xl">Capture</div>
//           </div>
//           <div
//             onClick={() => handleDoctorAction('Review')}
//             className="cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl bg-green-500 p-10 rounded-lg shadow-lg flex justify-center items-center"
//           >
//             <div className="text-white text-6xl">Review</div>
//           </div>
//         </div>
//         <button
//           onClick={goBack}
//           className="mt-8 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
//         >
//           Back
//         </button>
//       </div>
//     );
//   }

//   // Show patient folders for Doctor Review action
//   if (doctorAction === 'Review') {
//     return (
//       <div className="p-4 min-h-screen bg-gradient-to-r from-purple-200 to-purple-400">
//         <h1 className="text-4xl font-bold mb-8 text-center text-purple-700">Patient Folders</h1>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
//           {folders.map((folder) => (
//             <div
//               key={folder.name}
//               onClick={() => handleFolderClick(folder)}
//               className={`cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl p-6 rounded-lg shadow-lg text-center text-white font-semibold text-xl ${
//                 folder.metadata.status === 'complete' ? 'bg-green-500' : 'bg-red-500'
//               }`}
//             >
//               <div className="bg-white text-black p-4 rounded mb-4 shadow">
//                 <h2 className="font-bold text-2xl">{folder.metadata.patient_name}</h2>
//                 <p className="text-lg">{folder.metadata.patient_number}</p>
//               </div>
//               <div className="text-left text-lg">
//                 <p><span className="font-bold">Case Number:</span> {folder.metadata.case_number}</p>
//                 <p><span className="font-bold">Doctor:</span> {folder.metadata.doctor_name}</p>
//                 <p><span className="font-bold">Status:</span> {folder.metadata.status}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//         <button
//           onClick={goBack}
//           className="mt-8 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
//         >
//           Back
//         </button>
//       </div>
//     );
//   }

//   return null;
// }

// export default Dashboard;













import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUserMd, FaTools } from 'react-icons/fa';  // Icons for Doctor and Technician

function Dashboard({ navigate }) {
  const [folders, setFolders] = useState([]);
  const [userType, setUserType] = useState(null);  // State for user type (Technician/Doctor)
  const [doctorAction, setDoctorAction] = useState(null);  // State for Doctor's action (Review/Capture)

  useEffect(() => {
    if (doctorAction === 'Review') {
      const fetchFolders = async () => {
        try {
          const response = await axios.get('http://localhost:4000/folders');
          setFolders(response.data);
        } catch (error) {
          console.error('Error fetching folders:', error);
        }
      };
      fetchFolders();
    }
  }, [doctorAction]);

  const handleUserSelection = (user) => {
    setUserType(user);
    if(user=='Technician')
    {
      navigate('/home');
    }
  };

  const handleDoctorAction = (action) => {
    if (action === 'Capture') {
      navigate('/home');
    } else if (action === 'Review') {
      setDoctorAction('Review');
    }
  };

  const handleFolderClick = (folder) => {
    navigate('/home', folder.metadata, folder.name);
  };

  const goBack = () => {
    if (doctorAction) {
      setDoctorAction(null);  // Go back to Doctor action selection
    } else {
      setUserType(null);  // Go back to User type selection
    }
  };

  // Show rectangular tiles for Technician/Doctor selection if no userType selected yet
  if (!userType) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-200 to-purple-400">
        <div className="grid grid-cols-1 gap-10 text-center">
          <div
            onClick={() => handleUserSelection('Technician')}
            className="cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl bg-blue-500 px-28 py-10 rounded-lg shadow-lg flex flex-col justify-center items-center"
          >
            <FaTools className="text-white text-9xl" /> {/* Icon for Technician */}
            <div className="mt-4 text-white text-xl font-bold">Technician</div> {/* Label for Technician */}
          </div>
          <div
            onClick={() => handleUserSelection('Doctor')}
            className="cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl bg-green-500 px-28 py-10 rounded-lg shadow-lg flex flex-col justify-center items-center"
          >
            <FaUserMd className="text-white text-9xl" /> {/* Icon for Doctor */}
            <div className="mt-4 text-white text-xl font-bold">Doctor</div> {/* Label for Doctor */}
          </div>
        </div>
      </div>
    );
  }

  // Show Capture/Review options for Doctor
  if (userType === 'Doctor' && !doctorAction) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-purple-200 to-purple-400">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 text-center mb-8">
          <div
            onClick={() => handleDoctorAction('Capture')}
            className="cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl bg-blue-500 p-10 rounded-lg shadow-lg flex justify-center items-center"
          >
            <div className="text-white text-6xl font-bold">Capture</div>
          </div>
          <div
            onClick={() => handleDoctorAction('Review')}
            className="cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl bg-green-500 p-10 rounded-lg shadow-lg flex justify-center items-center"
          >
            <div className="text-white text-6xl font-bold">Review</div>
          </div>
        </div>
        {/* Back button */}
        <button
          onClick={goBack}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-lg shadow-md transform transition-transform duration-300 ease-in-out hover:scale-105"
        >
          Back
        </button>
      </div>
    );
  }

  // Show patient folders for Doctor Review action
  if (doctorAction === 'Review') {
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
        {/* Back button centered */}
        <div className="flex justify-center mt-8">
          <button
            onClick={goBack}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-lg shadow-md transform transition-transform duration-300 ease-in-out hover:scale-105"
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  return null;
}

export default Dashboard;