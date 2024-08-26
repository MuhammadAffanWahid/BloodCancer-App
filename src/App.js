// import './App.css';
// import './tailwind.css';
// import ImageViewer from './ImageViewer';

// function App() {
//   return (
//     <div className="App">
//      <ImageViewer/>
//     </div>
//   );
// }

// export default App;




// import React from "react";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Home from "./Home";
// import './tailwind.css';
// import ImageViewer from './ImageViewer';

// function App() {
//   return (
//     <BrowserRouter>
//       <div>
//         <div>
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/annotate" element={<ImageViewer />} />
//           </Routes>
//         </div>
//       </div>
//     </BrowserRouter>
//   );
// }
// export default App;

// import React, { useState, useEffect } from "react";
// import Home from "./Home";
// import ImageViewer from "./ImageViewer";
// import './tailwind.css';

// function App() {
//   const [route, setRoute] = useState(window.location.pathname);
//   const [patientDetails, setPatientDetails] = useState(null);

//   useEffect(() => {
//     const handlePopState = () => {
//       setRoute(window.location.pathname);
//     };

//     window.addEventListener("popstate", handlePopState);

//     return () => {
//       window.removeEventListener("popstate", handlePopState);
//     };
//   }, []);

//   const navigate = (path, details = null) => {
//     window.history.pushState({}, "", path);
//     setRoute(path);
//     if (details) {
//       setPatientDetails(details); // Update the patient details
//     }
//   };
//   return (
//     <div className="App rounded-3xl">
//         {route === "/" && <Home navigate={navigate} />}
//         {route === "/annotate" && <ImageViewer patientDetails={patientDetails}/>}
//       </div>
//   );
// }

// export default App;


import React, { useState, useEffect } from "react";
import Home from "./Home";
import ImageViewer from "./ImageViewer";
import Report from "./Report";
import Dashboard from "./Dashboard";
import './tailwind.css';

function App() {
  const [route, setRoute] = useState(window.location.pathname);
  const [patientDetails, setPatientDetails] = useState(null);
  const [imageFolder, setImageFolder] = useState(""); // State to store the image folder
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

  const navigate = (path, details = null, folder=null, isForward=false) => {
    window.history.pushState({}, "", path);
    setRoute(path);
    if (details) {
      setPatientDetails(details);
      localStorage.setItem('patientDetails', JSON.stringify(details));
    }

    if (folder) {
      setImageFolder(folder);
      localStorage.setItem('imageFolder', folder);
    }

      // Store isForward in local storage or state
  setIsForward(isForward);
  localStorage.setItem('isForward', isForward);
  };

  return (
    <div className="App pt-2 w-screen bg-gradient-to-r from-purple-200 to-purple-400">
      {route === "/" && <Dashboard navigate={navigate} />}
      {route === "/home" && <Home navigate={navigate} patientDetails={patientDetails} imageFolder={imageFolder} />}
      {route === "/annotate" && <ImageViewer navigate={navigate} patientDetails={patientDetails} imageFolder={imageFolder} />}
      {route === "/report" && <Report patientDetails={patientDetails} isForward={isForward}/>}
    </div>
  );
}

export default App;
