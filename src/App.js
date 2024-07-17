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
import React, { useState, useEffect } from "react";
import Home from "./Home";
import ImageViewer from "./ImageViewer";
import './tailwind.css';

function App() {
  const [route, setRoute] = useState(window.location.pathname);
  const [patientDetails, setPatientDetails] = useState(null);

  useEffect(() => {
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
      setPatientDetails(details); // Update the patient details
    }
  };
  return (
    <div className="App">
        {route === "/" && <Home navigate={navigate} />}
        {route === "/annotate" && <ImageViewer patientDetails={patientDetails}/>}
      </div>
  );
}

export default App;