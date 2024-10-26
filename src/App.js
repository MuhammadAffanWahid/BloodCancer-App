import React from "react"; // Importing React and hooks
import Home from "./Home"; // Home component for displaying patient information
import ImageViewer from "./ImageViewer"; // Component for viewing annotated images
import Capture from "./Capture"; // Component for capturing images
import Report from "./Report"; // Component for generating reports
import Dashboard from "./Dashboard"; // Dashboard component for navigation
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./tailwind.css"; // Tailwind CSS for styling
import NewCase from "./pages/NewCase";
import { Toaster } from "react-hot-toast";
import Cases from "./pages/Cases";

function App() {
  return (
    <div className="App pt-2 w-screen bg-gradient-to-r from-purple-200 to-purple-400">
      <Toaster />
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="/newCase" element={<NewCase />}></Route>
          <Route path="/cases" element={<Cases />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/annotate/:caseNo" element={<ImageViewer />}></Route>
          <Route path="/capture/:caseNo" element={<Capture />}></Route>
          <Route path="/report/:caseNo" element={<Report />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App; // Export the App component for usage in other parts of the application
