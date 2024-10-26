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
  caseNo,
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
        console.log("SELECTED: ", index);
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
    context.quadraticCurveTo(
      x + width,
      y + height,
      x + width - radius,
      y + height
    );
    context.lineTo(x + radius, y + height);
    context.quadraticCurveTo(x, y + height, x, y + height - radius);
    context.lineTo(x, y + radius);
    context.quadraticCurveTo(x, y, x + radius, y);
    context.closePath(); // Close the path
    context.fill(); // Fill the shape with the current fill color
  };

  // Save the drawn image to the server
  const saveImageToServer = async (canvas, imageName) => {
    const imageData = canvas.toDataURL("image/png"); // Get the image data as a PNG
    try {
      await axios.post("http://localhost:4000/save-image", {
        image: imageData,
        case_number: caseNo,
        name: imageName,
      });
      console.log("Image saved successfully"); // Log success message
    } catch (error) {
      console.error("Error saving image:", error); // Log any errors encountered
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current; // Get the canvas reference
    const context = canvas.getContext("2d"); // Get the 2D drawing context
    const image = imageRef.current; // Get the image reference
    image.crossOrigin = "anonymous";

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
        onClick={handleClick}
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
