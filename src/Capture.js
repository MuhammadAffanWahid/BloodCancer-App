import React, { useState, useEffect, useRef } from 'react';

const Capture = ({ patientDetails, navigate }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [capturedImages, setCapturedImages] = useState([]);
  const [isReviewing, setIsReviewing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const imgRef = useRef(null);

  // Start the camera feed by setting the image src to the video URL
  const startCameraFeed = () => {
    if (imageUrl && imgRef.current) {
      imgRef.current.src = imageUrl;
    }
  };

  // Capture an image from the live feed
  const captureImage = () => {
    const canvas = document.createElement('canvas');
    const imgElement = imgRef.current;

    if (imgElement) {
      const imgWidth = imgElement.width;
      const imgHeight = imgElement.height;
      canvas.width = imgWidth;
      canvas.height = imgHeight;

      const context = canvas.getContext('2d');
      context.drawImage(imgElement, 0, 0, imgWidth, imgHeight);

      const newImage = canvas.toDataURL('image/png');
      setCapturedImages((prevImages) => [...prevImages, newImage]);
      // alert('Image Captured Successfully!');
    }
  };

  // Handle reviewing images by navigating between them
  const handleNextImage = () => {
    if (currentIndex < capturedImages.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePreviousImage = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Discard the current image during review
  const handleDiscardImage = () => {
    const newImages = capturedImages.filter((_, index) => index !== currentIndex);
    setCapturedImages(newImages);

    if (newImages.length === 0) {
      // If no images remain, go back to capture mode
      setIsReviewing(false);
      setCurrentIndex(0);
    } else if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // End the session and navigate to the home page
// Update the handleFinishSession function
const handleFinishSession = async () => {
  // const caseId = patientDetails.caseId; // Make sure this exists
  // console.log("Captured images:", capturedImages); // Log captured images
  // console.log("Case ID:", caseId); // Log caseId

  // if (!caseId || !capturedImages.length) {
  //   alert("Missing case ID or no images captured.");
  //   return;
  // }

  // try {
  //   const response = await fetch('http://localhost:4000/save-session', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       caseId,
  //       images: capturedImages,
  //     }),
  //   });

  //   const data = await response.json();
  //   if (response.ok) {
  //     alert("Session finished successfully!");
  //     navigate('/');
  //   } else {
  //     alert(`Error: ${data.error}`);
  //   }
  // } catch (error) {
  //   console.error("Error finishing session:", error);
  //   alert("Failed to finish session. Please try again.");
  // }
  alert('Session Finished!');
  navigate('/');
};


  // Go back to capture mode
  const goBackToCapture = () => {
    setIsReviewing(false);
    setCurrentIndex(0); // Reset to the first image when going back to capture mode
  };

  // Handle keyboard navigation for image review (arrow keys)
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowRight') {
        handleNextImage();
      } else if (event.key === 'ArrowLeft') {
        handlePreviousImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [capturedImages, currentIndex]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-200 to-purple-400">
      {!isReviewing && (
        <>
          <h2 className="text-2xl font-bold mb-6 text-center text-purple-700">Capture Images</h2>
          <p className="text-lg text-center mb-4">Patient: {patientDetails.patientName}</p>

          {/* IP Camera URL Input */}
          <div className="flex justify-center mb-4 w-full max-w-lg">
            <input
              type="text"
              placeholder="Enter IP camera URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md w-full"
            />
            <button
              onClick={startCameraFeed}
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md ml-2 hover:bg-blue-700"
            >
              Start Camera
            </button>
          </div>

          {/* Live Camera Feed */}
          <div className="mb-4">
            <img
              ref={imgRef}
              crossOrigin="anonymous"
              width="920"
              height="690"
              className="border-2 border-gray-300 rounded-md"
              alt="Live Camera Feed"

            />
          </div>

          {/* Capture Button */}
          <button
            onClick={captureImage}
            className="bg-purple-500 text-white font-bold py-2 px-4 rounded-md hover:bg-purple-700"
          >
            Capture Image
          </button>

          {/* Review Button */}
          {capturedImages.length > 0 && (
            <button
              onClick={() => setIsReviewing(true)}
              className="bg-green-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-green-700"
            >
              Review Captured Images
            </button>
          )}
        </>
      )}

      {isReviewing && capturedImages.length > 0 && (
        <>
          <h2 className="text-2xl font-bold mb-6 text-center text-purple-700">Review Captured Images</h2>

          {/* Display Current Image */}
          <div className="mb-4 flex flex-col items-center">
            <img
              src={capturedImages[currentIndex]}
              alt={`Captured ${currentIndex}`}
              className="h-96 border-2 border-gray-300 rounded-md"
            />
          </div>

          {/* Image Navigation Buttons */}
          <div className="flex justify-between w-64">
            <button
              onClick={handlePreviousImage}
              disabled={currentIndex === 0}
              className={`${
                currentIndex === 0 ? 'bg-gray-400 hover:bg-gray-400' : 'bg-blue-500 hover:bg-blue-700'
              } text-white font-bold py-2 px-4 rounded-md`}
            >
              Previous
            </button>
            <button
              onClick={handleNextImage}
              disabled={currentIndex === capturedImages.length - 1}
              className={`${
                currentIndex === capturedImages.length - 1 ? 'bg-gray-400 hover:bg-gray-400' : 'bg-blue-500 hover:bg-blue-700'
              } text-white font-bold py-2 px-4 rounded-md`}
            >
              Next
            </button>
          </div>

          {/* Discard, Finish, and Back to Capture Buttons */}
          <div className="flex justify-between w-full max-w-lg mt-6 space-x-4">
            <button
              onClick={handleDiscardImage}
              className="bg-red-500 text-white font-bold py-2 px-4 rounded-md hover:bg-red-700 w-full"
            >
              Discard
            </button>
            <button
              onClick={goBackToCapture}
              className="bg-yellow-500 text-white font-bold py-2 px-4 rounded-md hover:bg-yellow-700 w-full"
            >
              Back to Capture
            </button>
            <button
              onClick={handleFinishSession}
              className="bg-green-500 text-white font-bold py-2 px-4 rounded-md hover:bg-green-700 w-full"
            >
              Finish Session
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Capture;















































// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

// const Capture = ({ patientDetails }) => {
//   const [imageUrl, setImageUrl] = useState('');
//   const [capturedImages, setCapturedImages] = useState([]);
//   const [isReviewing, setIsReviewing] = useState(false);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const imgRef = useRef(null);
//   const navigate = useNavigate();  // useNavigate replaces useHistory in React Router v6

//   // Start the camera feed by setting the image src to the video URL
//   const startCameraFeed = () => {
//     if (imageUrl && imgRef.current) {
//       imgRef.current.src = imageUrl;
//     }
//   };

//   // Capture an image from the live feed
//   const captureImage = () => {
//     const canvas = document.createElement('canvas');
//     const imgElement = imgRef.current;

//     if (imgElement) {
//       const imgWidth = imgElement.width;
//       const imgHeight = imgElement.height;
//       canvas.width = imgWidth;
//       canvas.height = imgHeight;

//       const context = canvas.getContext('2d');
//       context.drawImage(imgElement, 0, 0, imgWidth, imgHeight);

//       const newImage = canvas.toDataURL('image/png');
//       setCapturedImages((prevImages) => [...prevImages, newImage]);
//       alert('Image Captured Successfully!');
//     }
//   };

//   // Handle reviewing images by navigating between them
//   const handleNextImage = () => {
//     if (currentIndex < capturedImages.length - 1) {
//       setCurrentIndex(currentIndex + 1);
//     }
//   };

//   const handlePreviousImage = () => {
//     if (currentIndex > 0) {
//       setCurrentIndex(currentIndex - 1);
//     }
//   };

//   // Discard the current image during review
//   const handleDiscardImage = () => {
//     const newImages = capturedImages.filter((_, index) => index !== currentIndex);
//     setCapturedImages(newImages);

//     if (newImages.length === 0) {
//       // If no images remain, go back to capture mode
//       setIsReviewing(false);
//       setCurrentIndex(0);
//     } else if (currentIndex > 0) {
//       setCurrentIndex(currentIndex - 1);
//     }
//   };

//   const handleFinishSession = () => {
//     alert('Session Finished!');
//     navigate('/');  // Programmatically navigate to the root route
//   };

//   // Go back to capture mode
//   const goBackToCapture = () => {
//     setIsReviewing(false);
//     setCurrentIndex(0); // Reset to the first image when going back to capture mode
//   };

//   // Handle keyboard navigation for image review (arrow keys)
//   useEffect(() => {
//     const handleKeyDown = (event) => {
//       if (event.key === 'ArrowRight') {
//         handleNextImage();
//       } else if (event.key === 'ArrowLeft') {
//         handlePreviousImage();
//       }
//     };

//     window.addEventListener('keydown', handleKeyDown);
//     return () => {
//       window.removeEventListener('keydown', handleKeyDown);
//     };
//   }, [capturedImages, currentIndex]);

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-200 to-purple-400">
//       {!isReviewing && (
//         <>
//           <h2 className="text-2xl font-bold mb-6 text-center text-purple-700">Capture Images</h2>
//           <p className="text-lg text-center mb-4">Patient: {patientDetails.patientName}</p>

//           {/* IP Camera URL Input */}
//           <div className="flex justify-center mb-4 w-full max-w-lg">
//             <input
//               type="text"
//               placeholder="Enter IP camera URL"
//               value={imageUrl}
//               onChange={(e) => setImageUrl(e.target.value)}
//               className="px-4 py-2 border border-gray-300 rounded-md w-full"
//             />
//             <button
//               onClick={startCameraFeed}
//               className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md ml-2 hover:bg-blue-700"
//             >
//               Start Camera
//             </button>
//           </div>

//           {/* Live Camera Feed */}
//           <div className="mb-4">
//             <img
//               ref={imgRef}
//               width="640"
//               height="480"
//               className="border-2 border-gray-300 rounded-md"
//               alt="Live Camera Feed"
//             />
//           </div>

//           {/* Capture Button */}
//           <button
//             onClick={captureImage}
//             className="bg-purple-500 text-white font-bold py-2 px-4 rounded-md hover:bg-purple-700"
//           >
//             Capture Image
//           </button>

//           {/* Review Button */}
//           {capturedImages.length > 0 && (
//             <button
//               onClick={() => setIsReviewing(true)}
//               className="bg-green-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-green-700"
//             >
//               Review Captured Images
//             </button>
//           )}
//         </>
//       )}

//       {isReviewing && capturedImages.length > 0 && (
//         <>
//           <h2 className="text-2xl font-bold mb-6 text-center text-purple-700">Review Captured Images</h2>

//           {/* Display Current Image */}
//           <div className="mb-4 flex flex-col items-center">
//             <img
//               src={capturedImages[currentIndex]}
//               alt={`Captured ${currentIndex}`}
//               className="w-96 h-96 border-2 border-gray-300 rounded-md"
//             />
//           </div>

//           {/* Image Navigation Buttons */}
//           <div className="flex justify-between w-64">
//             <button
//               onClick={handlePreviousImage}
//               disabled={currentIndex === 0}
//               className={`${
//                 currentIndex === 0 ? 'bg-gray-400 hover:bg-gray-400' : 'bg-blue-500 hover:bg-blue-700'
//               } text-white font-bold py-2 px-4 rounded-md`}
//             >
//               Previous
//             </button>
//             <button
//               onClick={handleNextImage}
//               disabled={currentIndex === capturedImages.length - 1}
//               className={`${
//                 currentIndex === capturedImages.length - 1 ? 'bg-gray-400 hover:bg-gray-400' : 'bg-blue-500 hover:bg-blue-700'
//               } text-white font-bold py-2 px-4 rounded-md`}
//             >
//               Next
//             </button>
//           </div>

//           {/* Discard, Finish, and Back to Capture Buttons */}
//           <div className="flex justify-between w-full max-w-lg mt-6 space-x-4">
//             <button
//               onClick={handleDiscardImage}
//               className="bg-red-500 text-white font-bold py-2 px-4 rounded-md hover:bg-red-700 w-full"
//             >
//               Discard
//             </button>
//             <button
//               onClick={goBackToCapture}
//               className="bg-yellow-500 text-white font-bold py-2 px-4 rounded-md hover:bg-yellow-700 w-full"
//             >
//               Back to Capture
//             </button>
//             <button
//               onClick={handleFinishSession}
//               className="bg-green-500 text-white font-bold py-2 px-4 rounded-md hover:bg-green-700 w-full"
//             >
//               Finish Session
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Capture;