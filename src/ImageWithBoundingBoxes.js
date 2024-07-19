import React, { useEffect, useRef, useState } from 'react';
import './ImageWithBoundingBoxes.css'; // Import CSS file for styles

const WIDTH = 1200; // New width
const HEIGHT = 672; // New height
const BALANCER = 640; // Constant for scaling

const bgColorDictionary = {
  Lymphocyte: '#FF5733',
  Basophil: '#FFBF00',
  Metamylocyte: '#33FF57',
  Promyelocyte: '#3399FF',
  Monocyte: '#FF33A8',
  Abnormal: '#FFD700',
  Myelocyte: '#FF8C00',
  Eosinophil: '#9400D3',
  Promonocyte: '#FF4500',
  Atypical: '#00FF7F',
  Monoblast: '#20B2AA',
  Neutrophil: '#1E90FF',
  Lymphoblast: '#FF69B4',
  Myeloblast: '#ADFF2F',
  None:'#808080',
};

const textColorDictionary = {
  Lymphocyte: '#000', // Background: #FF5733 (dark)
  Basophil: '#000', // Background: #FFBF00 (dark)
  Metamylocyte: '#000', // Background: #33FF57 (dark)
  Promyelocyte: '#000', // Background: #3399FF (dark)
  Monocyte: '#000', // Background: #FF33A8 (light)
  Abnormal: '#000', // Background: #FFD700 (dark)
  Myelocyte: '#000', // Background: #FF8C00 (light)
  Eosinophil: '#FFF', // Background: #9400D3 (light)
  Promonocyte: '#000', // Background: #FF4500 (light)
  Atypical: '#000', // Background: #00FF7F (dark)
  Monoblast: '#000', // Background: #20B2AA (dark)
  Neutrophil: '#000', // Background: #1E90FF (light)
  Lymphoblast: '#000', // Background: #FF69B4 (dark)
  Myeloblast: '#000', // Background: #ADFF2F (dark)
  None:'#FFF', // Background: #808080 (dark)
};


const ImageWithBoundingBoxes = ({ src, boxes, alt }) => {
  const canvasRef = useRef(null);
  const [selectedBoxIndex, setSelectedBoxIndex] = useState(null);
  const [labels, setLabels] = useState([]);

  // Load labels from local storage
  const loadLabels = () => {
    const savedLabels = JSON.parse(localStorage.getItem(`labels-${src}`));
    if (savedLabels && savedLabels.length === boxes.length) {
      setLabels(savedLabels);
    } else {
      setLabels(boxes.map((box) => box.Prediction || 'Unknown'));
    }
  };

  // Save labels to local storage
  const saveLabels = (newLabels) => {
    localStorage.setItem(`labels-${src}`, JSON.stringify(newLabels));
  };

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
    const x = (event.clientX - rect.left) * scaleX;
    const y = (event.clientY - rect.top) * scaleY;

    boxes.forEach((box, index) => {
      if (
        x > (box.x_min * WIDTH) / BALANCER &&
        x < (box.x_max * WIDTH) / BALANCER &&
        y > (box.y_min * HEIGHT) / BALANCER &&
        y < (box.y_max * HEIGHT) / BALANCER
      ) {
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
    context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    context.lineTo(x + radius, y + height);
    context.quadraticCurveTo(x, y + height, x, y + height - radius);
    context.lineTo(x, y + radius);
    context.quadraticCurveTo(x, y, x + radius, y);
    context.closePath();
    context.fill();
  };

  useEffect(() => {
    loadLabels(); // Load labels from local storage

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const image = new Image();

    image.src = src;
    image.onload = () => {
      canvas.width = WIDTH; // Set new width
      canvas.height = HEIGHT; // Set new height
      context.drawImage(image, 0, 0, WIDTH, HEIGHT); // Draw image with new dimensions
      boxes.forEach((box, index) => {
        const color = bgColorDictionary[labels[index]] || 'red';

        // Draw bounding box
        context.strokeStyle = color;
        context.lineWidth = 1;
        context.strokeRect(
          (box.x_min * WIDTH) / BALANCER,
          (box.y_min * HEIGHT) / BALANCER,
          ((box.x_max - box.x_min) * WIDTH) / BALANCER,
          ((box.y_max - box.y_min) * HEIGHT) / BALANCER
        );

        // Draw background for label
        const labelWidth = context.measureText(labels[index]).width;
        const labelHeight = 16;
        const padding = 5;
        const xPos = (box.x_min * WIDTH) / BALANCER - 4;
        const yPos = (box.y_min * HEIGHT) / BALANCER < 20 ? // Check if box is at the top
          (box.y_max * HEIGHT) / BALANCER : // Place below the box
          (box.y_min * HEIGHT) / BALANCER - 16; // Place above the box

        drawRoundedRect(context, xPos, yPos,Math.max(labelWidth + padding * 4,80) , labelHeight, 5, color);

        // Draw label
        context.font = '12px Arial';
        context.fillStyle = textColorDictionary[labels[index]] // White text color
        context.fillText(labels[index], xPos + padding, yPos + labelHeight - 4);
      });
    };

    canvas.addEventListener('click', handleClick);

    return () => {
      canvas.removeEventListener('click', handleClick);
    };
  }, [src, boxes, labels]);

  return (
    <div className="image-container no-focus-outline">
      <canvas ref={canvasRef} alt={alt} className="rounded-xl mb-5 bounding-box-canvas" />
      {selectedBoxIndex !== null && (
        <select
          value={labels[selectedBoxIndex]}
          onChange={handleLabelChange}
          className="label-dropdown rounded no-focus-outline"
          style={{
            top: `${(boxes[selectedBoxIndex].y_min * HEIGHT) / BALANCER < 20 ? // Check if box is at the top
              (boxes[selectedBoxIndex].y_max * HEIGHT) / BALANCER : // Place below the box
              (boxes[selectedBoxIndex].y_min * HEIGHT) / BALANCER - 16}px`, // Place above the box
            left: `${(boxes[selectedBoxIndex].x_min * WIDTH) / BALANCER - 6}px`,
            position: 'absolute',
            fontSize: '12px',
            borderRadius: '3px',
            backgroundColor: bgColorDictionary[labels[selectedBoxIndex]] || '#f26161',
            color: textColorDictionary[labels[selectedBoxIndex]],
            cursor: 'pointer',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
            zIndex: 10,
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