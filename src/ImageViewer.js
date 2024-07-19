import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import ImageWithBoundingBoxes from "./ImageWithBoundingBoxes";
import predictions from "./data/predictions.csv";

const importImages = require.context("./data", false, /\.(png|jpe?g|svg)$/);
let images = importImages.keys().map((item) => ({
  src: importImages(item),
  name: item.replace("./", ""),
}));

console.log("Imported images:", images);

const ImageViewer = ({ patientDetails }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [boundingBoxes, setBoundingBoxes] = useState([]);

  useEffect(() => {
    Papa.parse(predictions, {
      download: true,
      header: true,
      complete: (result) => {
        console.log("Parsed CSV data:", result.data);
        setBoundingBoxes(result.data);
      },
    });
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleDiscard = async () => {
    alert("Image Discarded");
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowRight") {
      handleNext();
    } else if (event.key === "ArrowLeft") {
      handlePrevious();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const currentImage = images[currentIndex];
  const boxesForCurrentImage = boundingBoxes.filter(
    (box) => box["Image Name"] === currentImage.name
  );

  console.log("Current image:", currentImage);
  console.log("Bounding boxes for current image:", boxesForCurrentImage);

  return (
    <div className="flex justify-center rounded-xl">
      <div className="bg-white rounded-xl shadow-2xl border border-gray-200 px-6 pb-0 pt-2">
        <div className="flex justify-around w-full mb-1">
          <div className="flex flex-col items-center">
            <h1 className="text-xl font-bold text-violet-500">Patient Name</h1>
            <h2 className="text-lg">{patientDetails?.patientName}</h2>
          </div>
          <div className="flex flex-col items-center">
            <h1 className="text-xl font-bold text-violet-500">
              Patient Number
            </h1>
            <h2 className="text-lg">{patientDetails?.patientNumber}</h2>
          </div>
          <div className="flex flex-col items-center">
            <h1 className="text-xl font-bold text-violet-500">Case Number</h1>
            <h2 className="text-lg">{patientDetails?.caseNumber}</h2>
          </div>
          <div className="flex flex-col items-center">
            <h1 className="text-xl font-bold text-violet-500">Doctor Name</h1>
            <h2 className="text-lg">{patientDetails?.doctorName}</h2>
          </div>
          <div className="flex flex-col items-center">
            <h1 className="text-xl font-bold text-violet-500">Image Name</h1>
            <h2 className="text-lg">{currentImage.name}</h2>
          </div>
          <div className="flex flex-col items-center">
            <h1 className="text-xl font-bold text-violet-500">Image Name</h1>
            <h2 className="text-lg">{currentImage.name}</h2>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="flex -ml-2 mr-2 w-min items-center mb-10 justify-center">
            <div className="flex flex-col items-start space-y-20">
              <button
                onClick={handleDiscard}
                className="bg-red-500 text-white py-3 px-6 rounded shadow hover:bg-red-800 transition w-full text-2xl font-bold"
              >
                Discard
              </button>
              <button
                // onClick={handlePrevious}/
                className="bg-blue-500 text-white py-3 px-6 rounded shadow hover:bg-blue-800 transition w-full text-2xl font-bold"
              >
                Complete
              </button>
              <button
                // onClick={handleNext}
                className="bg-green-500 text-white py-3 px-6 rounded shadow hover:bg-green-800 transition w-full text-2xl font-bold"
              >
                Forward
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between w-full">
            <div className="w-full">
              <ImageWithBoundingBoxes
                src={currentImage.src}
                alt={currentImage.name}
                boxes={boxesForCurrentImage.map((box) => ({
                  Prediction: box.Prediction || "Unknown", // Ensure a default label
                  x_min: parseInt(box.x_min, 10),
                  y_min: parseInt(box.y_min, 10),
                  x_max: parseInt(box.x_max, 10),
                  y_max: parseInt(box.y_max, 10),
                }))}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageViewer;
