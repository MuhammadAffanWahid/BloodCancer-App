// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function Dashboard() {
//   const [folders, setFolders] = useState([]);

//   useEffect(() => {
//     const fetchFolders = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/folders');
//         setFolders(response.data);
//       } catch (error) {
//         console.error('Error fetching folders:', error);
//       }
//     };

//     fetchFolders();
//   }, []);

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Folders in Data Directory</h1>
//       <ul>
//         {folders.map((folder, index) => (
//           <li
//             key={folder}
//             className={`p-4 mb-2 ${index % 2 === 0 ? 'bg-red-100' : 'bg-green-100'}`}
//           >
//             {folder}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Dashboard;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
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

  return (
    <div className="p-4 h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center">Patient Folders</h1>
      <div className="grid grid-cols-5 gap-4">
        {folders.map((folder, index) => (
          <div
            key={folder}
            className={`py-20 rounded-lg shadow-lg text-center text-black font-semibold text-3xl  ${
              index % 2 === 0 ? 'bg-red-400' : 'bg-green-400'
            }`}
          >
            {folder}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
