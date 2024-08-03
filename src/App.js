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
import './tailwind.css';

function App() {
  const [route, setRoute] = useState(window.location.pathname);
  const [patientDetails, setPatientDetails] = useState(null);

  useEffect(() => {
    const savedDetails = localStorage.getItem('patientDetails');
    if (savedDetails) {
      setPatientDetails(JSON.parse(savedDetails));
    }

    const handlePopState = () => {
      setRoute(window.location.pathname);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const navigate = (path, details = null) => {
    window.history.pushState({}, "", path);
    setRoute(path);
    if (details) {
      setPatientDetails(details);
      localStorage.setItem('patientDetails', JSON.stringify(details));
    }
  };

  return (
    <div className="App pt-2 w-screen bg-gradient-to-r from-purple-200 to-purple-400">
      {route === "/" && <Home navigate={navigate} />}
      {route === "/annotate" && <ImageViewer navigate={navigate} patientDetails={patientDetails} />}
      {route === "/report" && <Report patientDetails={patientDetails}/>}
    </div>
  );
}

export default App;
