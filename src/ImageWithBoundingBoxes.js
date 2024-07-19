import React, { useEffect, useRef, useState } from 'react';
import './ImageWithBoundingBoxes.css'; // Import CSS file for styles

const WIDTH = 1200; // Display width
const HEIGHT = 672; // Display height
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
  Lymphocyte: '#000',
  Basophil: '#000',
  Metamylocyte: '#000',
  Promyelocyte: '#000',
  Monocyte: '#000',
  Abnormal: '#000',
  Myelocyte: '#000',
  Eosinophil: '#FFF',
  Promonocyte: '#000',
  Atypical: '#000',
  Monoblast: '#000',
  Neutrophil: '#000',
  Lymphoblast: '#000',
  Myeloblast: '#000',
  None:'#FFF',
};

const ImageWithBoundingBoxes = ({ src, boxes, alt }) => {
  const canvasRef = useRef(null);
  const [selectedBoxIndex, setSelectedBoxIndex] = useState(null);
  const [labels, setLabels] = useState([]);
  const imageRef = useRef(new Image()); // Image reference to reuse the same image

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
  
    // Adjust for device pixel ratio scaling
    const x = (event.clientX - rect.left) * scaleX / window.devicePixelRatio;
    const y = (event.clientY - rect.top) * scaleY / window.devicePixelRatio;
  
    boxes.forEach((box, index) => {
      const boxXMin = (box.x_min * WIDTH) / BALANCER;
      const boxYMin = (box.y_min * HEIGHT) / BALANCER;
      const boxXMax = (box.x_max * WIDTH) / BALANCER;
      const boxYMax = (box.y_max * HEIGHT) / BALANCER;
  
      if (
        x > boxXMin &&
        x < boxXMax &&
        y > boxYMin &&
        y < boxYMax
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
    const image = imageRef.current;

    // Clear the canvas and draw the image and boxes
    const drawImageAndBoxes = () => {
      // context.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

      // Draw image with correct dimensions
      context.drawImage(image, 0, 0, WIDTH, HEIGHT);

      boxes.forEach((box, index) => {
        const color = bgColorDictionary[labels[index]] || 'red';
        const boxWidth = ((box.x_max - box.x_min) * WIDTH) / BALANCER;
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
        const yPos = (box.y_min * HEIGHT) / BALANCER < 20 ? 
          (box.y_max * HEIGHT) / BALANCER : 
          (box.y_min * HEIGHT) / BALANCER - 16;

        drawRoundedRect(context, xPos, yPos, Math.max(labelWidth + padding * 4, boxWidth+10), labelHeight, 5, color);

        // Draw label
        context.font = '12px Arial';
        context.fillStyle = textColorDictionary[labels[index]];
        context.fillText(labels[index], xPos + padding, yPos + labelHeight - 4);
      });
    };

    image.src = src;
    image.onload = () => {
      canvas.width = WIDTH * window.devicePixelRatio;
      canvas.height = HEIGHT * window.devicePixelRatio;
      canvas.style.width = `${WIDTH}px`;
      canvas.style.height = `${HEIGHT}px`;
      context.scale(window.devicePixelRatio, window.devicePixelRatio);
      drawImageAndBoxes();
    };

    canvas.addEventListener('click', handleClick);

    return () => {
      canvas.removeEventListener('click', handleClick);
    };
  }, [src, boxes, labels]);

  return (
    <div className="image-container">
      <canvas ref={canvasRef} alt={alt} className="rounded-xl mb-5 bounding-box-canvas" />
      {selectedBoxIndex !== null && (
        <select
          value={labels[selectedBoxIndex]}
          onChange={handleLabelChange}
          className="label-dropdown rounded no-focus-outline"
          style={{
            top: `${(boxes[selectedBoxIndex].y_min * HEIGHT) / BALANCER < 20 ? 
              (boxes[selectedBoxIndex].y_max * HEIGHT) / BALANCER : 
              (boxes[selectedBoxIndex].y_min * HEIGHT) / BALANCER - 16}px`,
            left: `${(boxes[selectedBoxIndex].x_min * WIDTH) / BALANCER - 6}px`,
            position: 'absolute',
            fontSize: '12px',
            borderRadius: '3px',
            backgroundColor: bgColorDictionary[labels[selectedBoxIndex]] || '#f26161',
            color: textColorDictionary[labels[selectedBoxIndex]],
            cursor: 'pointer',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
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