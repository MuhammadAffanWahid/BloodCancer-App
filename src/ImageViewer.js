// import React, { useState, useEffect } from "react";
// import Papa from "papaparse";
// import ImageWithBoundingBoxes from "./ImageWithBoundingBoxes";

// const ImageViewer = ({ navigate, patientDetails, imageFolder }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [boundingBoxes, setBoundingBoxes] = useState([]);
//   const [images, setImages] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const handleGenerateReport = () => {
//     console.log("handleGenerateReport");
//     navigate("/report", patientDetails);
//   };

//   const handleUpdateBoundingBox = (updatedBoundingBoxes) => {
//     setBoundingBoxes(updatedBoundingBoxes);
//     localStorage.setItem("csvData", JSON.stringify(updatedBoundingBoxes));
//     console.log("csv data: \n", updatedBoundingBoxes);
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         console.log("imageFolder: ", imageFolder)

//         // Fetch images and CSV data from the backend
//         const normalizedImageFolder = imageFolder.replace(/^\/|\/$/g, '');  // This will remove leading and trailing slashes
//         const imageResponse = await fetch(`http://localhost:4000/images?folder=${encodeURIComponent(normalizedImageFolder)}`);
//         // const imageResponse = await fetch(`http://localhost:4000/images?folder=${encodeURIComponent(imageFolder)}`);
//         const imageData = await imageResponse.json();
//         setImages(imageData.images);

//         const csvResponse = await fetch(`http://localhost:4000/csv?folder=${encodeURIComponent(normalizedImageFolder)}`);
//         const csvData = await csvResponse.text();
//         Papa.parse(csvData, {
//           header: true,
//           complete: (result) => {
//             console.log("Parsed CSV data:", result.data);
//             setBoundingBoxes(result.data);
//             localStorage.setItem("csvData", JSON.stringify(result.data));
//           },
//         });

//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [imageFolder]);

//   const handleNext = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
//   };

//   const handlePrevious = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === 0 ? images.length - 1 : prevIndex - 1
//     );
//   };

//   const handleDiscard = async () => {
//     alert("Image Discarded");
//   };

//   const handleKeyDown = (event) => {
//     if (event.key === "ArrowRight") {
//       handleNext();
//     } else if (event.key === "ArrowLeft") {
//       handlePrevious();
//     }
//   };

//   useEffect(() => {
//     window.addEventListener("keydown", handleKeyDown);
//     return () => {
//       window.removeEventListener("keydown", handleKeyDown);
//     };
//   }, []);

//   const currentImage = images[currentIndex];
//   const boxesForCurrentImage = boundingBoxes.filter(
//     (box) => box["Image Name"] === currentImage?.name
//   );

//   if (loading) return <div>Loading...</div>;

//   return (
//     <div className="flex justify-center rounded-xl pt-2 pb-1">
//       <div className="bg-white rounded-xl shadow-2xl border border-gray-200 px-6 pb-0 pt-2">
//         <div className="flex justify-around w-full mb-1">
//           {/* Patient Details and Current Image Information */}
//           <div className="flex flex-col items-center">
//             <h1 className="text-xl font-bold text-violet-500">Patient Name</h1>
//             <h2 className="text-md font-bold">{patientDetails?.patientName}</h2>
//           </div>
//           <div className="flex flex-col items-center">
//             <h1 className="text-xl font-bold text-violet-500">
//               Patient Number
//             </h1>
//             <h2 className="text-md font-bold">
//               {patientDetails?.patientNumber}
//             </h2>
//           </div>
//           <div className="flex flex-col items-center">
//             <h1 className="text-xl font-bold text-violet-500">Case Number</h1>
//             <h2 className="text-md font-bold">{patientDetails?.caseNumber}</h2>
//           </div>
//           <div className="flex flex-col items-center">
//             <h1 className="text-xl font-bold text-violet-500">Doctor Name</h1>
//             <h2 className="text-md font-bold">{patientDetails?.doctorName}</h2>
//           </div>
//           <div className="flex flex-col items-center">
//             <h1 className="text-xl font-bold text-violet-500">Image Name</h1>
//             <h2 className="text-md font-bold">{currentImage?.name}</h2>
//           </div>
//         </div>
//         <div className="flex justify-center">
//         <div className="flex -ml-2 mr-2 w-min items-center -mt-4  justify-center">
//             <div className="flex flex-col items-start space-y-20">
//               <button
//                 onClick={handleDiscard}
//                 className="bg-red-500 text-white py-8 px-6 rounded shadow hover:bg-red-800 transition w-full text-2xl font-bold"
//               >
//                 Discard
//               </button>
//               <button
//                 // onClick={handlePrevious}/
//                 className="bg-yellow-500 text-white py-8 px-6 rounded shadow hover:bg-yellow-800 transition w-full text-2xl font-bold"
//               >
//                 Complete
//               </button>
//               <button
//                 // onClick={handleNext}
//                 className="bg-green-500 text-white py-8 px-6 rounded shadow hover:bg-green-800 transition w-full text-2xl font-bold"
//               >
//                 Forward
//               </button>
//               <button
//                 onClick={handleGenerateReport}
//                 className="bg-blue-500 text-white py-4 px-6 rounded shadow hover:bg-blue-800 transition w-full text-2xl font-bold"
//               >
//                 PDF Report
//               </button>
//             </div>
//           </div>
//           <div className="flex items-center justify-between w-full">
//             <div className="w-full">
//               {currentImage && (
//                 <ImageWithBoundingBoxes
//                   src={currentImage.src}
//                   alt={currentImage.name}
//                   boxes={boxesForCurrentImage.map((box) => ({
//                     Prediction: box.Prediction || "Unknown", // Ensure a default label
//                     x_min: parseInt(box.x_min, 10),
//                     y_min: parseInt(box.y_min, 10),
//                     x_max: parseInt(box.x_max, 10),
//                     y_max: parseInt(box.y_max, 10),
//                   }))}
//                   boundingBoxes={boundingBoxes}
//                   setBoundingBoxes={handleUpdateBoundingBox}
//                 />
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ImageViewer;

import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import ImageWithBoundingBoxes from "./ImageWithBoundingBoxes";
import { useNavigate } from "react-router";

const ImageViewer = () => {
  // State to manage the current image index, bounding boxes, images, and loading status
  const [currentIndex, setCurrentIndex] = useState(0);
  const [boundingBoxes, setBoundingBoxes] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  //TODO: FIX IT
  const patientDetails = {};

  // Function to handle generating a report and navigating to the report page
  const handleGenerateReport = () => {
    console.log("handleGenerateReport");
    navigate("/report");
  };

  // Function to update bounding boxes and save them in local storage
  const handleUpdateBoundingBox = (updatedBoundingBoxes) => {
    setBoundingBoxes(updatedBoundingBoxes); // Update state with new bounding boxes
    localStorage.setItem("csvData", JSON.stringify(updatedBoundingBoxes)); // Save to local storage
    console.log("csv data: \n", updatedBoundingBoxes);
  };

  // useEffect to fetch images and CSV data when the component mounts or imageFolder changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        // TODO: ADD IMAGE FOLDER
        const normalizedImageFolder = "";
        // Fetch images from the backend
        const imageResponse = await fetch(
          `http://localhost:4000/images?folder=${encodeURIComponent(
            normalizedImageFolder
          )}`
        );
        const imageData = await imageResponse.json(); // Parse the JSON response
        console.log("Fetched images:", imageData.images); // Log fetched images
        setImages(imageData.images); // Update images state

        // Fetch CSV data from the backend
        const csvResponse = await fetch(
          `http://localhost:4000/csv?folder=${encodeURIComponent(
            normalizedImageFolder
          )}`
        );
        const csvData = await csvResponse.text(); // Get CSV data as text
        Papa.parse(csvData, {
          header: true, // Treat the first row as header
          complete: (result) => {
            console.log("Parsed CSV data:", result.data); // Log parsed CSV data
            setBoundingBoxes(result.data); // Update bounding boxes state
            localStorage.setItem("csvData", JSON.stringify(result.data)); // Save CSV data to local storage
          },
        });

        setLoading(false); // Set loading to false after fetching data
      } catch (error) {
        console.error("Error fetching data:", error); // Log any errors
        setLoading(false); // Set loading to false on error
      }
    };
    fetchData(); // Call fetchData to execute the API calls
  }, []); // Re-run effect if imageFolder changes

  // Effect to log the currently loaded image when currentIndex or images change
  useEffect(() => {
    if (images.length > 0) {
      console.log("Loading image:", images[currentIndex]);
    }
  }, [currentIndex, images]);

  // Effect to log all images when images state changes
  useEffect(() => {
    console.log("affan images:", images);
  }, [images]);

  // Function to mark the current task as complete and update the status in the backend
  const handleComplete = async () => {
    try {
      const response = await fetch("http://localhost:4000/update-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        //TODO: Mark complete by case ID
        body: JSON.stringify({
          status: "complete", // Set the status as 'complete'
        }),
      });

      if (response.ok) {
        const result = await response.json(); // Parse the response
        console.log(result.message); // Log success message
        alert("Status updated to complete"); // Notify user of success
      } else {
        const errorResult = await response.json(); // Parse error response
        console.error("Error updating status:", errorResult.error); // Log error
        alert("Failed to update status"); // Notify user of failure
      }
    } catch (error) {
      console.error("Error during API call:", error); // Log network errors
      alert("Failed to update status due to a network error"); // Notify user
    }
  };

  // Function to navigate to the report page with forward status
  const handleForward = () => {
    navigate("/report");
  };

  // Function to go to the next image in the gallery
  const handleNext = () => {
    if (images.length > 0) {
      console.log("Next image index:", images.length);
      setCurrentIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % images.length; // Wrap around if at the end
        console.log("Next image index:", newIndex); // Log the new index
        return newIndex; // Update the current index
      });
    } else {
      console.error("No images to navigate to."); // Log if there are no images
    }
  };

  // Function to go to the previous image in the gallery
  const handlePrevious = () => {
    if (images.length > 0) {
      setCurrentIndex(
        (prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1) // Wrap around if at the beginning
      );
    } else {
      console.error("No images to navigate to."); // Log if there are no images
    }
  };

  // Function to handle image discarding action
  const handleDiscard = async () => {
    alert("Image Discarded"); // Notify user of discard action
  };

  // Effect to handle keyboard navigation with arrow keys
  useEffect(() => {
    window.focus(); // Ensure the window is focused
    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight") {
        console.log("Right arrow key pressed"); // Log right arrow press
        handleNext(); // Call handleNext to navigate to the next image
      } else if (event.key === "ArrowLeft") {
        handlePrevious(); // Call handlePrevious to navigate to the previous image
      }
    };

    window.addEventListener("keydown", handleKeyDown); // Attach event listener for keydown
    return () => {
      window.removeEventListener("keydown", handleKeyDown); // Cleanup listener on unmount
    };
  }, [handleNext, handlePrevious]); // Re-run effect if handleNext or handlePrevious changes

  // Get the current image based on the current index
  const currentImage = images[currentIndex];
  // Filter bounding boxes for the current image
  const boxesForCurrentImage = boundingBoxes.filter(
    (box) => box["Image Name"] === currentImage?.name
  );

  // Display loading state if data is still being fetched
  if (loading) return <div>Loading...</div>;

  // Render the image viewer component
  return (
    <div className="flex justify-center rounded-xl pt-2 pb-1">
      <div className="bg-white rounded-xl shadow-2xl border border-gray-200 px-6 pb-0 pt-2">
        <div className="flex justify-around w-full mb-1">
          {/* Display patient details and current image information */}
          <div className="flex flex-col items-center">
            <h1 className="text-xl font-bold text-violet-500">Patient Name</h1>
            <h2 className="text-md font-bold">{patientDetails?.patientName}</h2>
          </div>
          <div className="flex flex-col items-center">
            <h1 className="text-xl font-bold text-violet-500">
              Patient Number
            </h1>
            <h2 className="text-md font-bold">
              {patientDetails?.patientNumber}
            </h2>
          </div>
          <div className="flex flex-col items-center">
            <h1 className="text-xl font-bold text-violet-500">Case Number</h1>
            <h2 className="text-md font-bold">{patientDetails?.caseNumber}</h2>
          </div>
          <div className="flex flex-col items-center">
            <h1 className="text-xl font-bold text-violet-500">Doctor Name</h1>
            <h2 className="text-md font-bold">{patientDetails?.doctorName}</h2>
          </div>
          <div className="flex flex-col items-center">
            <h1 className="text-xl font-bold text-violet-500">Image Name</h1>
            <h2 className="text-md font-bold">{currentImage?.name}</h2>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="flex -ml-2 mr-2 w-min items-center -mt-4  justify-center">
            <div className="flex flex-col items-start space-y-20">
              {/* Action buttons for Discard, Forward, Complete, and Generate Report */}
              <button
                onClick={handleDiscard}
                className="bg-red-500 text-white py-8 px-6 rounded-xl shadow hover:bg-red-800 transition w-full"
              >
                Discard
              </button>
              <button
                onClick={handleForward}
                className="bg-green-500 text-white py-8 px-6 rounded-xl shadow hover:bg-green-800 transition w-full"
              >
                Forward
              </button>
              <button
                onClick={handleComplete}
                className="bg-blue-500 text-white py-8 px-6 rounded-xl shadow hover:bg-blue-800 transition w-full"
              >
                Complete
              </button>
              <button
                onClick={handleGenerateReport}
                className="bg-yellow-500 text-white py-8 px-6 rounded-xl shadow hover:bg-yellow-800 transition w-full"
              >
                Generate Report
              </button>
            </div>
          </div>

          {/* Render ImageWithBoundingBoxes component for displaying images with bounding boxes */}
          <ImageWithBoundingBoxes
            imageSrc={currentImage?.src}
            boundingBoxes={boxesForCurrentImage}
            onUpdateBoundingBox={handleUpdateBoundingBox}
          />
        </div>

        {/* Navigation buttons for Previous and Next images */}
        <div className="flex justify-center mt-5">
          <button
            onClick={handlePrevious}
            className="bg-gray-300 text-black py-2 px-4 rounded-l-lg hover:bg-gray-400"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className="bg-gray-300 text-black py-2 px-4 rounded-r-lg hover:bg-gray-400"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageViewer;
