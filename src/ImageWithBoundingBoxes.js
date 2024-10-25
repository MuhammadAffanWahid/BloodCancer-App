// import React, { useEffect, useRef, useState } from "react";
// import axios from "axios";
// import "./ImageWithBoundingBoxes.css"; // Import CSS file for styles

// const WIDTH = 1200; // Display width
// const HEIGHT = 672; // Display height
// const BALANCER = 640; // Constant for scaling

// const bgColorDictionary = {
//   Lymphocyte: "#FF5733",
//   Basophil: "#FFBF00",
//   Metamylocyte: "#33FF57",
//   Promyelocyte: "#3399FF",
//   Monocyte: "#FF33A8",
//   Abnormal: "#FFD700",
//   Myelocyte: "#FF8C00",
//   Eosinophil: "#9400D3",
//   Promonocyte: "#FF4500",
//   Atypical: "#00FF7F",
//   Monoblast: "#20B2AA",
//   Neutrophil: "#1E90FF",
//   Lymphoblast: "#FF69B4",
//   Myeloblast: "#ADFF2F",
//   None: "#808080",
// };

// const textColorDictionary = {
//   Lymphocyte: "#000",
//   Basophil: "#000",
//   Metamylocyte: "#000",
//   Promyelocyte: "#000",
//   Monocyte: "#000",
//   Abnormal: "#000",
//   Myelocyte: "#000",
//   Eosinophil: "#FFF",
//   Promonocyte: "#000",
//   Atypical: "#000",
//   Monoblast: "#000",
//   Neutrophil: "#000",
//   Lymphoblast: "#000",
//   Myeloblast: "#000",
//   None: "#FFF",
// };

// const ImageWithBoundingBoxes = ({
//   src,
//   boxes,
//   alt,
//   boundingBoxes,
//   setBoundingBoxes,
// }) => {
//   useEffect(() => {
//     console.log("Image src:", src);
//   }, [src]);
//   const canvasRef = useRef(null);
//   const [selectedBoxIndex, setSelectedBoxIndex] = useState(null);
//   const [labels, setLabels] = useState([]);
//   const imageRef = useRef(new Image()); // Image reference to reuse the same image

//   // Load labels from local storage
//   const loadLabels = () => {
//     const savedLabels = JSON.parse(localStorage.getItem(`labels-${src}`));
//     if (savedLabels && savedLabels.length === boxes.length) {
//       setLabels(savedLabels);
//     } else {
//       setLabels(boxes.map((box) => box.Prediction || "Unknown"));
//     }
//   };

//   const updateLabels = (data, newLabels) => {
//     let labelIndex = 0;
//     for (let i = 0; i < data.length; i += 1) {
//       if (data[i]["Image Name"] === alt) {
//         data[i]["Prediction"] = newLabels[labelIndex];
//         labelIndex += 1;
//       }
//     }
//   };

//   // Save labels to local storage
//   const saveLabels = (newLabels) => {
//     localStorage.setItem(`labels-${src}`, JSON.stringify(newLabels));
//     if (boundingBoxes) {
//       const modifiedBoundingBoxes = boundingBoxes.map((box) => {
//         return { ...box };
//       });
//       updateLabels(modifiedBoundingBoxes, newLabels);
//       setBoundingBoxes(modifiedBoundingBoxes);
//     }
//   };

//   const handleLabelChange = (event) => {
//     const newLabels = [...labels];
//     newLabels[selectedBoxIndex] = event.target.value;
//     setLabels(newLabels);
//     saveLabels(newLabels);
//     setSelectedBoxIndex(null);
//   };

//   const handleClick = (event) => {
//     const canvas = canvasRef.current;
//     const rect = canvas.getBoundingClientRect();
//     const scaleX = canvas.width / rect.width;
//     const scaleY = canvas.height / rect.height;

//     // Adjust for device pixel ratio scaling
//     const x = ((event.clientX - rect.left) * scaleX) / window.devicePixelRatio;
//     const y = ((event.clientY - rect.top) * scaleY) / window.devicePixelRatio;

//     boxes.forEach((box, index) => {
//       const boxXMin = (box.x_min * WIDTH) / BALANCER;
//       const boxYMin = (box.y_min * HEIGHT) / BALANCER;
//       const boxXMax = (box.x_max * WIDTH) / BALANCER;
//       const boxYMax = (box.y_max * HEIGHT) / BALANCER;

//       if (x > boxXMin && x < boxXMax && y > boxYMin && y < boxYMax) {
//         setSelectedBoxIndex(index);
//       }
//     });
//   };

//   const drawRoundedRect = (context, x, y, width, height, radius, color) => {
//     context.fillStyle = color;
//     context.beginPath();
//     context.moveTo(x + radius, y);
//     context.lineTo(x + width - radius, y);
//     context.quadraticCurveTo(x + width, y, x + width, y + radius);
//     context.lineTo(x + width, y + height - radius);
//     context.quadraticCurveTo(
//       x + width,
//       y + height,
//       x + width - radius,
//       y + height
//     );
//     context.lineTo(x + radius, y + height);
//     context.quadraticCurveTo(x, y + height, x, y + height - radius);
//     context.lineTo(x, y + radius);
//     context.quadraticCurveTo(x, y, x + radius, y);
//     context.closePath();
//     context.fill();
//   };

//   const saveImageToServer = async (canvas, imageName) => {
//     const imageData = canvas.toDataURL('image/png');
//     try {
//       await axios.post('http://localhost:4000/save-image', {
//         image: imageData,
//         name: imageName,
//       });
//       console.log('Image saved successfully');
//     } catch (error) {
//       console.error('Error saving image:', error);
//     }
//   };

//   useEffect(() => {
//     loadLabels(); // Load labels from local storage

//     const canvas = canvasRef.current;
//     const context = canvas.getContext("2d");
//     const image = imageRef.current;

//     // Clear the canvas and draw the image and boxes
//     const drawImageAndBoxes = () => {
//       context.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

//       // Draw image with correct dimensions
//       context.drawImage(image, 0, 0, WIDTH, HEIGHT);

//       boxes.forEach((box, index) => {
//         const color = bgColorDictionary[labels[index]] || "red";
//         const boxWidth = ((box.x_max - box.x_min) * WIDTH) / BALANCER;
//         // Draw bounding box
//         context.strokeStyle = color;
//         context.lineWidth = 1;
//         context.strokeRect(
//           (box.x_min * WIDTH) / BALANCER,
//           (box.y_min * HEIGHT) / BALANCER,
//           ((box.x_max - box.x_min) * WIDTH) / BALANCER,
//           ((box.y_max - box.y_min) * HEIGHT) / BALANCER
//         );

//         // Draw background for label
//         const labelWidth = context.measureText(labels[index]).width;
//         const labelHeight = 16;
//         const padding = 5;
//         const xPos = (box.x_min * WIDTH) / BALANCER - 4;
//         const yPos =
//           (box.y_min * HEIGHT) / BALANCER < 20
//             ? (box.y_max * HEIGHT) / BALANCER
//             : (box.y_min * HEIGHT) / BALANCER - 16;

//         drawRoundedRect(
//           context,
//           xPos,
//           yPos,
//           Math.max(1.36 * labelWidth, boxWidth + 12),
//           labelHeight,
//           5,
//           color
//         );

//         // Draw label
//         context.font = "12px Arial";
//         context.fillStyle = textColorDictionary[labels[index]];
//         context.fillText(labels[index], xPos + padding, yPos + labelHeight - 4);
//       });

//       // Save the image to the server
//       const imageName = `${alt}`; // Use a unique name for each image
//       saveImageToServer(canvas, imageName);
//     };
//     console.log('Image source:', src);
//     image.src = src;
//     image.crossOrigin = "anonymous";
//     image.onload = () => {
//       canvas.width = WIDTH * window.devicePixelRatio;
//       canvas.height = HEIGHT * window.devicePixelRatio;
//       canvas.style.width = `${WIDTH}px`;
//       canvas.style.height = `${HEIGHT}px`;
//       context.scale(window.devicePixelRatio, window.devicePixelRatio);
//       drawImageAndBoxes();
//     };

//     canvas.addEventListener("click", handleClick);

//     return () => {
//       canvas.removeEventListener("click", handleClick);
//     };
//   }, [src, labels, boxes]);

//   return (
//     <div className="image-container">
//       <canvas
//         ref={canvasRef}
//         alt={alt}
//         className="rounded-xl mb-5 bounding-box-canvas"
//       />
//       {selectedBoxIndex !== null && (
//         <select
//           value={labels[selectedBoxIndex]}
//           onChange={handleLabelChange}
//           className="label-dropdown rounded no-focus-outline"
//           style={{
//             top: `${
//               (boxes[selectedBoxIndex].y_min * HEIGHT) / BALANCER < 20
//                 ? (boxes[selectedBoxIndex].y_max * HEIGHT) / BALANCER
//                 : (boxes[selectedBoxIndex].y_min * HEIGHT) / BALANCER - 16
//             }px`,
//             left: `${(boxes[selectedBoxIndex].x_min * WIDTH) / BALANCER - 6}px`,
//             position: "absolute",
//             fontSize: "12px",
//             borderRadius: "3px",
//             backgroundColor:
//               bgColorDictionary[labels[selectedBoxIndex]] || "#f26161",
//             color: textColorDictionary[labels[selectedBoxIndex]],
//             cursor: "pointer",
//             boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
//             zIndex: 100,
//           }}
//         >
//           {Object.keys(bgColorDictionary).map((label) => (
//             <option key={label} value={label}>
//               {label}
//             </option>
//           ))}
//         </select>
//       )}
//     </div>
//   );
// };

// export default ImageWithBoundingBoxes;



import React, { useEffect, useRef, useState, useCallback } from "react";
import axios from "axios";
import "./ImageWithBoundingBoxes.css";

// Constants for canvas dimensions and a balancing factor
const WIDTH = 1200;
const HEIGHT = 672;
const BALANCER = 640;

// Color mapping for background based on labels
const bgColorDictionary = {
  Lymphocyte: "#FF5733",
  Basophil: "#FFBF00",
  Metamylocyte: "#33FF57",
  Promyelocyte: "#3399FF",
  Monocyte: "#FF33A8",
  Abnormal: "#FFD700",
  Myelocyte: "#FF8C00",
  Eosinophil: "#9400D3",
  Promonocyte: "#FF4500",
  Atypical: "#00FF7F",
  Monoblast: "#20B2AA",
  Neutrophil: "#1E90FF",
  Lymphoblast: "#FF69B4",
  Myeloblast: "#ADFF2F",
  None: "#808080",
};

// Color mapping for text based on labels
const textColorDictionary = {
  Lymphocyte: "#000",
  Basophil: "#000",
  Metamylocyte: "#000",
  Promyelocyte: "#000",
  Monocyte: "#000",
  Abnormal: "#000",
  Myelocyte: "#000",
  Eosinophil: "#FFF",
  Promonocyte: "#000",
  Atypical: "#000",
  Monoblast: "#000",
  Neutrophil: "#000",
  Lymphoblast: "#000",
  Myeloblast: "#000",
  None: "#FFF",
};

// Main component for rendering image with bounding boxes
const ImageWithBoundingBoxes = ({
  src, // Source of the image
  boxes, // Bounding boxes data
  alt, // Alternative text for the image
  boundingBoxes, // Current bounding boxes to manage
  setBoundingBoxes, // Function to update bounding boxes
}) => {
  const canvasRef = useRef(null); // Reference to the canvas element
  const [selectedBoxIndex, setSelectedBoxIndex] = useState(null); // Index of the currently selected bounding box
  const [labels, setLabels] = useState([]); // State to hold labels for bounding boxes
  const imageRef = useRef(new Image()); // Reference to the image being drawn

  // Load labels from local storage, or initialize with default values
  const loadLabels = useCallback(() => {
    const savedLabels = JSON.parse(localStorage.getItem(`labels-${src}`));
    if (savedLabels && savedLabels.length === boxes.length) {
      setLabels(savedLabels); // Load saved labels if they match the number of boxes
    } else {
      setLabels(boxes.map((box) => box.Prediction || "Unknown")); // Default to "Unknown" if not present
    }
  }, [src, boxes]);

  useEffect(() => {
    loadLabels(); // Load labels when the component mounts or dependencies change
  }, [loadLabels]);

  // Update labels in data based on changes made
  const updateLabels = useCallback(
    (data, newLabels) => {
      let labelIndex = 0; // To keep track of the label being updated
      for (let i = 0; i < data.length; i += 1) {
        if (data[i]["Image Name"] === alt) {
          data[i]["Prediction"] = newLabels[labelIndex]; // Update the label for the corresponding image
          labelIndex += 1; // Move to the next label
        }
      }
    },
    [alt]
  );

  // Save new labels to local storage and update bounding boxes if necessary
  const saveLabels = useCallback(
    (newLabels) => {
      localStorage.setItem(`labels-${src}`, JSON.stringify(newLabels)); // Save labels to local storage
      if (boundingBoxes) {
        const modifiedBoundingBoxes = boundingBoxes.map((box) => {
          return { ...box }; // Create a copy of bounding boxes
        });
        updateLabels(modifiedBoundingBoxes, newLabels); // Update labels in bounding boxes
        setBoundingBoxes(modifiedBoundingBoxes); // Update state with modified bounding boxes
      }
    },
    [src, boundingBoxes, updateLabels, setBoundingBoxes]
  );

  // Handle label change from dropdown
  const handleLabelChange = (event) => {
    const newLabels = [...labels]; // Create a copy of current labels
    newLabels[selectedBoxIndex] = event.target.value; // Update the selected label
    setLabels(newLabels); // Set the new labels state
    saveLabels(newLabels); // Save new labels to local storage
    setSelectedBoxIndex(null); // Deselect the box after changing label
  };

  // Handle click event to select bounding boxes
  const handleClick = (event) => {
    const canvas = canvasRef.current; // Get the canvas reference
    const rect = canvas.getBoundingClientRect(); // Get the canvas's bounding rectangle
    const scaleX = canvas.width / rect.width; // Calculate scaling factor for x-axis
    const scaleY = canvas.height / rect.height; // Calculate scaling factor for y-axis

    // Calculate mouse click position on canvas
    const x = ((event.clientX - rect.left) * scaleX) / window.devicePixelRatio;
    const y = ((event.clientY - rect.top) * scaleY) / window.devicePixelRatio;

    // Check if click is within any bounding box
    boxes.forEach((box, index) => {
      const boxXMin = (box.x_min * WIDTH) / BALANCER; // Calculate box's min x-coordinate
      const boxYMin = (box.y_min * HEIGHT) / BALANCER; // Calculate box's min y-coordinate
      const boxXMax = (box.x_max * WIDTH) / BALANCER; // Calculate box's max x-coordinate
      const boxYMax = (box.y_max * HEIGHT) / BALANCER; // Calculate box's max y-coordinate

      // Check if click is inside the bounding box
      if (x > boxXMin && x < boxXMax && y > boxYMin && y < boxYMax) {
        setSelectedBoxIndex(index); // Set the selected box index
      }
    });
  };

  // Draw a rounded rectangle on the canvas
  const drawRoundedRect = (context, x, y, width, height, radius, color) => {
    context.fillStyle = color; // Set the fill color
    context.beginPath(); // Start a new path
    // Create rounded corners
    context.moveTo(x + radius, y);
    context.lineTo(x + width - radius, y);
    context.quadraticCurveTo(x + width, y, x + width, y + radius);
    context.lineTo(x + width, y + height - radius);
    context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    context.lineTo(x + radius, y + height);
    context.quadraticCurveTo(x, y + height, x, y + height - radius);
    context.lineTo(x, y + radius);
    context.quadraticCurveTo(x, y, x + radius, y);
    context.closePath(); // Close the path
    context.fill(); // Fill the shape with the current fill color
  };

  // Save the drawn image to the server
  const saveImageToServer = async (canvas, imageName) => {
    const imageData = canvas.toDataURL('image/png'); // Get the image data as a PNG
    try {
      await axios.post('http://localhost:4000/save-image', {
        image: imageData,
        name: imageName,
      });
      console.log('Image saved successfully'); // Log success message
    } catch (error) {
      console.error('Error saving image:', error); // Log any errors encountered
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current; // Get the canvas reference
    const context = canvas.getContext("2d"); // Get the 2D drawing context
    const image = imageRef.current; // Get the image reference

    // Function to draw the image and bounding boxes
    const drawImageAndBoxes = () => {
      context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

      context.drawImage(image, 0, 0, WIDTH, HEIGHT); // Draw the image on the canvas

      // Loop through each bounding box to draw it
      boxes.forEach((box, index) => {
        const color = bgColorDictionary[labels[index]] || "red"; // Get the background color for the label
        const boxWidth = ((box.x_max - box.x_min) * WIDTH) / BALANCER; // Calculate box width

        context.strokeStyle = color; // Set the stroke color
        context.lineWidth = 1; // Set the line width
        context.strokeRect(
          (box.x_min * WIDTH) / BALANCER,
          (box.y_min * HEIGHT) / BALANCER,
          ((box.x_max - box.x_min) * WIDTH) / BALANCER,
          ((box.y_max - box.y_min) * HEIGHT) / BALANCER
        ); // Draw the bounding box

        const labelWidth = context.measureText(labels[index]).width; // Measure label width
        const labelHeight = 20; // Set label height
        const x = (box.x_min * WIDTH) / BALANCER; // Calculate x position for label
        const y = (box.y_min * HEIGHT) / BALANCER; // Calculate y position for label

        drawRoundedRect(
          context,
          x,
          y - labelHeight - 2,
          labelWidth + 10,
          labelHeight,
          5,
          color // Draw a rounded rectangle for the label
        );

        context.fillStyle = textColorDictionary[labels[index]]; // Set the text color
        context.fillText(labels[index], x + 5, y - 2); // Draw the label text
      });

      saveImageToServer(canvas, alt); // Save the drawn image to the server
    };

    image.onload = drawImageAndBoxes; // Draw when the image loads
    image.src = src; // Set the source of the image
  }, [src, boxes, labels, alt]); // Dependencies for the effect

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={WIDTH}
        height={HEIGHT}
        onClick={handleClick} // Handle canvas click
      />
      {selectedBoxIndex !== null && ( // If a box is selected, show dropdown for label selection
        <select onChange={handleLabelChange} value={labels[selectedBoxIndex]}>
          {Object.keys(bgColorDictionary).map((label) => (
            <option key={label} value={label}>
              {label}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default ImageWithBoundingBoxes; // Export the component for use in other parts of the application
