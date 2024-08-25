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

const ImageViewer = ({ navigate, patientDetails, imageFolder }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [boundingBoxes, setBoundingBoxes] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleGenerateReport = () => {
    console.log("handleGenerateReport");
    navigate("/report", patientDetails);
  };

  const handleUpdateBoundingBox = (updatedBoundingBoxes) => {
    setBoundingBoxes(updatedBoundingBoxes);
    localStorage.setItem("csvData", JSON.stringify(updatedBoundingBoxes));
    console.log("csv data: \n", updatedBoundingBoxes);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("imageFolder: ", imageFolder);
    
        // Fetch images and CSV data from the backend
        const normalizedImageFolder = imageFolder.replace(/^\/|\/$/g, '');  // This will remove leading and trailing slashes
        const imageResponse = await fetch(`http://localhost:4000/images?folder=${encodeURIComponent(normalizedImageFolder)}`);
        const imageData = await imageResponse.json();
        console.log("Fetched images:", imageData.images);  // Check the fetched images
        setImages(imageData.images);
    
        const csvResponse = await fetch(`http://localhost:4000/csv?folder=${encodeURIComponent(normalizedImageFolder)}`);
        const csvData = await csvResponse.text();
        Papa.parse(csvData, {
          header: true,
          complete: (result) => {
            console.log("Parsed CSV data:", result.data);
            setBoundingBoxes(result.data);
            localStorage.setItem("csvData", JSON.stringify(result.data));
          },
        });
    
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [imageFolder]);

  useEffect(() => {
    if (images.length > 0) {
      console.log("Loading image:", images[currentIndex]);
    }
  }, [currentIndex, images]);

  useEffect(() => {
      console.log("affan images:", images);
  }, [images]);

  // const handleNext = () => {
  //   setCurrentIndex((prevIndex) => {
  //     const newIndex = (prevIndex + 1) % images.length;
  //     console.log("Next image index:", newIndex);
  //     return newIndex;
  //   });
  // };

  // const handlePrevious = () => {
  //   setCurrentIndex((prevIndex) => {
  //     const newIndex = prevIndex === 0 ? images.length - 1 : prevIndex - 1;
  //     console.log("Previous image index:", newIndex);
  //     return newIndex;
  //   });
  // };

  const handleNext = () => {
    if (images.length > 0) {
      console.log("Next image index:", images.length);
      setCurrentIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % images.length;
        console.log("Next image index:", newIndex);
        return newIndex;
      });
    } else {
      console.error("No images to navigate to.");
    }
  };
  
  const handlePrevious = () => {
    if (images.length > 0) {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
    } else {
      console.error("No images to navigate to.");
    }
  };

  const handleDiscard = async () => {
    alert("Image Discarded");
  };


  useEffect(() => {
    window.focus();
    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight") {
        console.log("Right arrow key pressed");
        handleNext();
      } else if (event.key === "ArrowLeft") {
        handlePrevious();
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleNext,handlePrevious]);

  const currentImage = images[currentIndex];
  const boxesForCurrentImage = boundingBoxes.filter(
    (box) => box["Image Name"] === currentImage?.name
  );


  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex justify-center rounded-xl pt-2 pb-1">
      <div className="bg-white rounded-xl shadow-2xl border border-gray-200 px-6 pb-0 pt-2">
        <div className="flex justify-around w-full mb-1">
          {/* Patient Details and Current Image Information */}
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
              <button
                onClick={handleDiscard}
                className="bg-red-500 text-white py-8 px-6 rounded shadow hover:bg-red-800 transition w-full text-2xl font-bold"
              >
                Discard
              </button>
              <button
                // onClick={handlePrevious}/
                className="bg-yellow-500 text-white py-8 px-6 rounded shadow hover:bg-yellow-800 transition w-full text-2xl font-bold"
              >
                Complete
              </button>
              <button
                // onClick={handleNext}
                className="bg-green-500 text-white py-8 px-6 rounded shadow hover:bg-green-800 transition w-full text-2xl font-bold"
              >
                Forward
              </button>
              <button
                onClick={handleGenerateReport}
                className="bg-blue-500 text-white py-4 px-6 rounded shadow hover:bg-blue-800 transition w-full text-2xl font-bold"
              >
                PDF Report
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between w-full">
            <div className="w-full">
              {currentImage && (
                <ImageWithBoundingBoxes
                  src={`http://localhost:4000${currentImage.src}`}  // Use the backend URL for the image
                  alt={currentImage.name}
                  boxes={boxesForCurrentImage.map((box) => ({
                    Prediction: box.Prediction || "Unknown", // Ensure a default label
                    x_min: parseInt(box.x_min, 10),
                    y_min: parseInt(box.y_min, 10),
                    x_max: parseInt(box.x_max, 10),
                    y_max: parseInt(box.y_max, 10),
                  }))}
                  boundingBoxes={boundingBoxes}
                  setBoundingBoxes={handleUpdateBoundingBox}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageViewer;