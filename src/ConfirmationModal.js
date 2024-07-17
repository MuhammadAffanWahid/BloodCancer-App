import React, { useState, useEffect } from 'react';

// Dynamically import images from the specified folder
const importImages = (require.context('./data', false, /\.(png|jpe?g|svg)$/));
const images = importImages.keys().map((item) => ({
  src: importImages(item),
  name: item.replace('./', ''),
}));

const ImageViewer = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleDiscard = () => {
    alert('Image discarded!');
  };

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowRight') {
      handleNext();
    } else if (event.key === 'ArrowLeft') {
      handlePrevious();
    }
  };

  useEffect(() => {
    // Add event listener for keydown events
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const currentImage = images[currentIndex];

  return (
    <div className="flex justify-center p-4">
      <div className="flex flex-col items-center w-11/12">
        <h2 className="text-lg font-bold mb-4 ml-72">{currentImage.name}</h2>
        <div className="flex flex-row items-center justify-between w-full">
          <div className="flex flex-col items-start space-y-20">
            <button
              onClick={handlePrevious}
              className="bg-blue-500 text-white py-6 px-20 rounded shadow hover:bg-blue-800 transition w-full text-2xl font-bold"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              className="bg-green-500 text-white py-6 px-20 rounded shadow hover:bg-green-800 transition w-full text-2xl font-bold"
            >
              Next
            </button>
            <button
              onClick={handleDiscard}
              className="bg-red-500 text-white py-6 px-20 rounded shadow hover:bg-red-800 transition w-full text-2xl font-bold"
            >
              Discard
            </button>
          </div>
          <div className="ml-16 w-full">
            <img
              src={currentImage.src}
              alt={currentImage.name}
              className="w-full h-auto object-contain rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageViewer;
