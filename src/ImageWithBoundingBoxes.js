import React, { useEffect, useRef, useState, useCallback } from "react";
import axios from "axios";
import "./ImageWithBoundingBoxes.css";

const WIDTH = 1200;
const HEIGHT = 672;
const BALANCER = 640;

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

const ImageWithBoundingBoxes = ({
  src, // Source of the image
  boxes, // Bounding boxes data
  alt, // Alternative text for the image
  boundingBoxes, // Current bounding boxes to manage
  setBoundingBoxes, // Function to update bounding boxes
  caseNo,
}) => {
  const canvasRef = useRef(null);
  const [selectedBoxIndex, setSelectedBoxIndex] = useState(null);
  const [labels, setLabels] = useState([]);
  const imageRef = useRef(new Image());

  // Load labels from local storage
  const loadLabels = useCallback(() => {
    const savedLabels = JSON.parse(localStorage.getItem(`labels-${src}`));
    if (savedLabels && savedLabels.length === boxes.length) {
      setLabels(savedLabels);
    } else {
      setLabels(boxes.map((box) => box.Prediction || "Unknown"));
    }
  }, [src, boxes]);

  useEffect(() => {
    loadLabels();
  }, [loadLabels]);

  const updateLabels = useCallback(
    (data, newLabels) => {
      let labelIndex = 0;
      for (let i = 0; i < data.length; i += 1) {
        if (data[i]["Image Name"] === alt) {
          data[i]["Prediction"] = newLabels[labelIndex];
          labelIndex += 1;
        }
      }
    },
    [alt]
  );

  const saveLabels = useCallback(
    (newLabels) => {
      localStorage.setItem(`labels-${src}`, JSON.stringify(newLabels));
      if (boundingBoxes) {
        const modifiedBoundingBoxes = boundingBoxes.map((box) => {
          return { ...box };
        });
        updateLabels(modifiedBoundingBoxes, newLabels);
        setBoundingBoxes(modifiedBoundingBoxes);
      }
    },
    [src, boundingBoxes, updateLabels, setBoundingBoxes]
  );

  const handleLabelChange = (event) => {
    const newLabels = [...labels];
    newLabels[selectedBoxIndex] = event.target.value;
    setLabels(newLabels);
    saveLabels(newLabels);
    setSelectedBoxIndex(null);
  };

  const handleClick = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = ((event.clientX - rect.left) * scaleX) / window.devicePixelRatio;
    const y = ((event.clientY - rect.top) * scaleY) / window.devicePixelRatio;

    boxes.forEach((box, index) => {
      const boxXMin = (box.x_min * WIDTH) / BALANCER;
      const boxYMin = (box.y_min * HEIGHT) / BALANCER;
      const boxXMax = (box.x_max * WIDTH) / BALANCER;
      const boxYMax = (box.y_max * HEIGHT) / BALANCER;

      if (x > boxXMin && x < boxXMax && y > boxYMin && y < boxYMax) {
        setSelectedBoxIndex(index);
      }
    });
  };

  const drawRoundedRect = (context, x, y, width, height, radius, color) => {
    context.fillStyle = color;
    context.beginPath();
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
    context.closePath();
    context.fill();
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
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const image = imageRef.current;
    image.crossOrigin = "anonymous";

    const drawImageAndBoxes = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      context.drawImage(image, 0, 0, WIDTH, HEIGHT);

      boxes.forEach((box, index) => {
        const color = bgColorDictionary[labels[index]] || "red";
        const boxWidth = ((box.x_max - box.x_min) * WIDTH) / BALANCER;

        context.strokeStyle = color;
        context.lineWidth = 1;
        context.strokeRect(
          (box.x_min * WIDTH) / BALANCER,
          (box.y_min * HEIGHT) / BALANCER,
          ((box.x_max - box.x_min) * WIDTH) / BALANCER,
          ((box.y_max - box.y_min) * HEIGHT) / BALANCER
        );

        const labelWidth = context.measureText(labels[index]).width;
        const labelHeight = 16;
        const padding = 5;
        const xPos = (box.x_min * WIDTH) / BALANCER - 4;
        const yPos =
          (box.y_min * HEIGHT) / BALANCER < 20
            ? (box.y_max * HEIGHT) / BALANCER
            : (box.y_min * HEIGHT) / BALANCER - 16;

        drawRoundedRect(
          context,
          xPos,
          yPos,
          Math.max(1.36 * labelWidth, boxWidth + 12),
          labelHeight,
          5,
          color
        );

        context.font = "12px Arial";
        context.fillStyle = textColorDictionary[labels[index]];
        context.fillText(labels[index], xPos + padding, yPos + labelHeight - 4);
      });

      const imageName = `${alt}`;
      saveImageToServer(canvas, imageName);
    };
    image.src = src;
    image.crossOrigin = "anonymous";
    image.onload = () => {
      canvas.width = WIDTH * window.devicePixelRatio;
      canvas.height = HEIGHT * window.devicePixelRatio;
      canvas.style.width = `${WIDTH}px`;
      canvas.style.height = `${HEIGHT}px`;
      context.scale(window.devicePixelRatio, window.devicePixelRatio);
      drawImageAndBoxes();
    };

    canvas.addEventListener("click", handleClick);
    return () => {
      canvas.removeEventListener("click", handleClick);
    };
  }, [src, labels, boxes]);

  return (
    <div className="image-container">
      <canvas
        ref={canvasRef}
        alt={alt}
        className="rounded-xl mb-5 bounding-box-canvas"
      />
      {selectedBoxIndex !== null && (
        <select
          value={labels[selectedBoxIndex]}
          onChange={handleLabelChange}
          className="label-dropdown rounded no-focus-outline"
          style={{
            top: `${
              (boxes[selectedBoxIndex].y_min * HEIGHT) / BALANCER < 20
                ? (boxes[selectedBoxIndex].y_max * HEIGHT) / BALANCER
                : (boxes[selectedBoxIndex].y_min * HEIGHT) / BALANCER - 16
            }px`,
            left: `${(boxes[selectedBoxIndex].x_min * WIDTH) / BALANCER - 6}px`,
            position: "absolute",
            fontSize: "12px",
            borderRadius: "3px",
            backgroundColor:
              bgColorDictionary[labels[selectedBoxIndex]] || "#f26161",
            color: textColorDictionary[labels[selectedBoxIndex]],
            cursor: "pointer",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
            zIndex: 100,
          }}
        >
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

export default ImageWithBoundingBoxes;
