// import React, { useEffect, useRef } from 'react';

// const ImageWithBoundingBoxes = ({ src, boxes, alt }) => {
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const context = canvas.getContext('2d');
//     const image = new Image();
    
//     image.src = src;
//     image.onload = () => {
//       canvas.width = 800;// image.width;
//       canvas.height = 448;// image.height;
//       context.drawImage(image, 0, 0);
//       boxes.forEach(box => {
//         console.log('Drawing box:', box);
//         context.beginPath();
//         context.rect(box.x_min*800/640, box.y_min*448/640, (box.x_max - box.x_min)*800/640, (box.y_max - box.y_min)*448/640);
//         context.lineWidth = 2;
//         context.strokeStyle = 'red';
//         context.stroke();
//         context.font = '12px Arial';
//         context.fillStyle = 'red';
//         context.fillText(box.Prediction, box.x_min*800/640, box.y_min*448/640 - 10);
//       });
//     };
//   }, [src, boxes]);

//   return <canvas ref={canvasRef} alt={alt} />;
// };

// export default ImageWithBoundingBoxes;










// import React, { useEffect, useRef, useState } from 'react';

// const ImageWithBoundingBoxes = ({ src, boxes, alt }) => {
//   const canvasRef = useRef(null);
//   const [selectedBoxIndex, setSelectedBoxIndex] = useState(null);
//   const [labels, setLabels] = useState(boxes.map(box => box.Prediction));

//   const handleBoxClick = (index) => {
//     setSelectedBoxIndex(index);
//   };

//   const handleLabelChange = (event) => {
//     const newLabels = [...labels];
//     newLabels[selectedBoxIndex] = event.target.value;
//     setLabels(newLabels);
//     setSelectedBoxIndex(null); // Hide dropdown after selection
//   };

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const context = canvas.getContext('2d');
//     const image = new Image();
    
//     image.src = src;
//     image.onload = () => {
//       canvas.width = 800; // image.width;
//       canvas.height = 448; // image.height;
//       context.drawImage(image, 0, 0);
//       boxes.forEach((box, index) => {
//         context.beginPath();
//         context.rect(box.x_min * 800 / 640, box.y_min * 448 / 640, (box.x_max - box.x_min) * 800 / 640, (box.y_max - box.y_min) * 448 / 640);
//         context.lineWidth = 2;
//         context.strokeStyle = 'red';
//         context.stroke();
//         context.font = '12px Arial';
//         context.fillStyle = 'red';
//         context.fillText(labels[index], box.x_min * 800 / 640, box.y_min * 448 / 640 - 10);

//         // Add click event listener for each box
//         canvas.addEventListener('click', (event) => {
//           const rect = canvas.getBoundingClientRect();
//           const scaleX = canvas.width / rect.width;
//           const scaleY = canvas.height / rect.height;
//           const x = (event.clientX - rect.left) * scaleX;
//           const y = (event.clientY - rect.top) * scaleY;

//           if (x > box.x_min * 800 / 640 && x < box.x_max * 800 / 640 && y > box.y_min * 448 / 640 && y < box.y_max * 448 / 640) {
//             handleBoxClick(index);
//           }
//         });
//       });
//     };
//   }, [src, boxes, labels]);

//   return (
//     <div>
//       <canvas ref={canvasRef} alt={alt} />
//       {selectedBoxIndex !== null && (
//         <select value={labels[selectedBoxIndex]} onChange={handleLabelChange} style={{ position: 'absolute', top: `${boxes[selectedBoxIndex].y_min * 448 / 640}px`, left: `${boxes[selectedBoxIndex].x_min * 800 / 640}px` }}>
//           <option value="Label1">Label1</option>
//           <option value="Label2">Label2</option>
//           <option value="Label3">Label3</option>
//         </select>
//       )}
//     </div>
//   );
// };

// export default ImageWithBoundingBoxes;


// import React, { useEffect, useRef, useState } from 'react';

// const ImageWithBoundingBoxes = ({ src, boxes, alt }) => {
//   const canvasRef = useRef(null);
//   const [selectedBoxIndex, setSelectedBoxIndex] = useState(null);
//   const [labels, setLabels] = useState(boxes.map(box => box.Prediction));

//   const handleBoxClick = (index) => {
//     setSelectedBoxIndex(index);
//   };

//   const handleLabelChange = (event) => {
//     const newLabels = [...labels];
//     newLabels[selectedBoxIndex] = event.target.value;
//     setLabels(newLabels);
//     setSelectedBoxIndex(null); // Hide dropdown after selection
//   };

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const context = canvas.getContext('2d');
//     const image = new Image();
    
//     image.src = src;
//     image.onload = () => {
//       canvas.width = 800; // image.width;
//       canvas.height = 448; // image.height;
//       context.drawImage(image, 0, 0);
//       boxes.forEach((box, index) => {
//         context.beginPath();
//         context.rect(box.x_min * 800 / 640, box.y_min * 448 / 640, (box.x_max - box.x_min) * 800 / 640, (box.y_max - box.y_min) * 448 / 640);
//         context.lineWidth = 2;
//         context.strokeStyle = 'red';
//         context.stroke();
//         context.font = '12px Arial';
//         context.fillStyle = 'red';
//         context.fillText(labels[index], box.x_min * 800 / 640, box.y_min * 448 / 640 - 10);

//         // Add click event listener for each box
//         canvas.addEventListener('click', (event) => {
//           const rect = canvas.getBoundingClientRect();
//           const scaleX = canvas.width / rect.width;
//           const scaleY = canvas.height / rect.height;
//           const x = (event.clientX - rect.left) * scaleX;
//           const y = (event.clientY - rect.top) * scaleY;

//           if (x > box.x_min * 800 / 640 && x < box.x_max * 800 / 640 && y > box.y_min * 448 / 640 && y < box.y_max * 448 / 640) {
//             handleBoxClick(index);
//           }
//         });
//       });
//     };
//   }, [src, boxes, labels]);

//   return (
//     <div style={{ position: 'relative' }}>
//       <canvas ref={canvasRef} alt={alt} />
//       {selectedBoxIndex !== null && (
//         <select
//         className='rounded'
//           value={labels[selectedBoxIndex]}
//           onChange={handleLabelChange}
//           style={{
//             position: 'absolute',
//             top: `${boxes[selectedBoxIndex].y_min * 448 / 640 - 20}px`,
//             left: `${boxes[selectedBoxIndex].x_min * 800 / 640}px`,
//             fontSize: '12px', // Same font size as label
//           }}
//         >
//           <option value="Label1">Label1</option>
//           <option value="Label2">Label2</option>
//           <option value="Label3">Label3</option>
//         </select>
//       )}
//     </div>
//   );
// };

// export default ImageWithBoundingBoxes;


















// import React, { useEffect, useRef, useState } from 'react';

// const ImageWithBoundingBoxes = ({ src, boxes, alt }) => {
//   const canvasRef = useRef(null);
//   const [selectedBoxIndex, setSelectedBoxIndex] = useState(null);
//   const [labels, setLabels] = useState(boxes.map(box => box.Prediction));

//   const handleBoxClick = (index) => {
//     setSelectedBoxIndex(index);
//   };

//   const handleLabelChange = (event) => {
//     const newLabels = [...labels];
//     newLabels[selectedBoxIndex] = event.target.value;
//     setLabels(newLabels);
//     setSelectedBoxIndex(null); // Hide dropdown after selection
//   };

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const context = canvas.getContext('2d');
//     const image = new Image();
    
//     image.src = src;
//     image.onload = () => {
//       canvas.width = 800; // image.width;
//       canvas.height = 448; // image.height;
//       context.drawImage(image, 0, 0);
//       boxes.forEach((box, index) => {
//         context.beginPath();
//         context.rect(box.x_min * 800 / 640, box.y_min * 448 / 640, (box.x_max - box.x_min) * 800 / 640, (box.y_max - box.y_min) * 448 / 640);
//         context.lineWidth = 2;
//         context.strokeStyle = 'red';
//         context.stroke();
//         context.font = '12px Arial';
//         context.fillStyle = 'red';
//         context.fillText(labels[index], box.x_min * 800 / 640, box.y_min * 448 / 640 - 10);
//       });
//     };
//   }, [src, boxes, labels]);

//   return (
//     <div style={{ position: 'relative' }}>
//       <canvas ref={canvasRef} alt={alt} />
//       {selectedBoxIndex !== null && (
//         <select
//           value={labels[selectedBoxIndex]}
//           onChange={handleLabelChange}
//           style={{
//             position: 'absolute',
//             top: `${boxes[selectedBoxIndex].y_min * 448 / 640 - 20}px`,
//             left: `${boxes[selectedBoxIndex].x_min * 800 / 640}px`,
//             fontSize: '12px', // Same font size as label
//             borderRadius: '3px',
//             backgroundColor: '#f26161', // Light purple color
//             color: '#000',
//             cursor: 'pointer',
//             boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
//             zIndex: 10, // Ensure dropdown appears above other elements
//           }}
//         >
//           <option value="Lymphocyte">Lymphocyte</option>
//           <option value="Basophil">Basophil</option>
//           <option value="Metamylocyte">Metamylocyte</option>
//           <option value="Promyelocyte">Promyelocyte</option>
//           <option value="Monocyte">Monocyte</option>
//           <option value="Promyelocyte">Promyelocyte</option>
//           <option value="Abnormal">Abnormal</option>
//           <option value="Myelocyte">Myelocyte</option>
//           <option value="Eosinophil">Eosinophil</option>
//           <option value="Promonocyte">Promonocyte</option>
//           <option value="lymphocyte">lymphocyte</option>
//           <option value="Atypical">Atypical</option>
//           <option value="Monoblast">Monoblast</option>
//           <option value="Neutrophil">Neutrophil</option>
//           <option value="Lymphoblast">Lymphoblast</option>
//           <option value="Myeloblast">Myeloblast</option>
//         </select>
//       )}
//     </div>
//   );
// };

// export default ImageWithBoundingBoxes;




// import React, { useEffect, useRef, useState } from 'react';

// const ImageWithBoundingBoxes = ({ src, boxes, alt }) => {
//   const canvasRef = useRef(null);
//   const [selectedBoxIndex, setSelectedBoxIndex] = useState(null);
//   const [labels, setLabels] = useState(boxes.map(box => box.Prediction));

//   const handleBoxClick = (index) => {
//     setSelectedBoxIndex(index);
//   };

//   const handleLabelChange = (event) => {
//     const newLabels = [...labels];
//     newLabels[selectedBoxIndex] = event.target.value;
//     setLabels(newLabels);
//     setSelectedBoxIndex(null); // Hide dropdown after selection
//   };

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const context = canvas.getContext('2d');
//     const image = new Image();
    
//     image.src = src;
//     image.onload = () => {
//       canvas.width = 800; // image.width;
//       canvas.height = 448; // image.height;
//       context.drawImage(image, 0, 0);
//       boxes.forEach((box, index) => {
//         context.beginPath();
//         context.rect(box.x_min * 800 / 640, box.y_min * 448 / 640, (box.x_max - box.x_min) * 800 / 640, (box.y_max - box.y_min) * 448 / 640);
//         context.lineWidth = 2;
//         context.strokeStyle = 'red';
//         context.stroke();
//         context.font = '12px Arial';
//         context.fillStyle = 'red';
//         context.fillText(labels[index], box.x_min * 800 / 640, box.y_min * 448 / 640 - 10);
//       });
//     };
//   }, [src, boxes, labels]);

//   return (
//     <div style={{ position: 'relative' }}>
//       <canvas ref={canvasRef} alt={alt} />
//       {selectedBoxIndex !== null && (
//         <select
//           value={labels[selectedBoxIndex]}
//           onChange={handleLabelChange}
//           style={{
//             position: 'absolute',
//             top: `${boxes[selectedBoxIndex].y_min * 448 / 640 - 20}px`,
//             left: `${boxes[selectedBoxIndex].x_min * 800 / 640}px```,
//             fontSize: '12px', // Same font size as label
//             borderRadius: '3px',
//             backgroundColor: '#f26161', // Light purple color
//             color: '#000',
//             cursor: 'pointer',
//             boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
//             zIndex: 10, // Ensure dropdown appears above other elements
//           }}
//         >
//           <option value="Label1">Lymphocyte</option>
//           <option value="Label2">Basophil</option>
//           <option value="Label3">Metamylocyte</option>
//           <option value="Label3">Promyelocyte</option>
//           <option value="Label3">Monocyte</option>
//           <option value="Label3">Promyelocyte</option>
//           <option value="Label3">Abnormal</option>
//           <option value="Label3">Myelocyte</option>
//           <option value="Label3">Eosinophil</option>
//           <option value="Label3">Promonocyte</option>
//           <option value="Label3">lymphocyte</option>
//           <option value="Label3">Atypical</option>
//           <option value="Label3">Monoblast</option>
//           <option value="Label3">Neutrophil</option>
//           <option value="Label3">Lymphoblast</option>
//           <option value="Label3">Myeloblast</option>
//         </select>
//       )}
//     </div>
//   );
// };

// export default ImageWithBoundingBoxes;











// import React, { useEffect, useRef, useState } from 'react';

// const ImageWithBoundingBoxes = ({ src, boxes, alt }) => {
//   const canvasRef = useRef(null);
//   const [selectedBoxIndex, setSelectedBoxIndex] = useState(null);
//   const [labels, setLabels] = useState(boxes.map(box => box.Prediction));

//   const handleLabelChange = (event) => {
//     const newLabels = [...labels];
//     newLabels[selectedBoxIndex] = event.target.value;
//     setLabels(newLabels);
//     setSelectedBoxIndex(null); // Hide dropdown after selection
//   };

//   const handleClick = (event) => {
//     const canvas = canvasRef.current;
//     const rect = canvas.getBoundingClientRect();
//     const scaleX = canvas.width / rect.width;
//     const scaleY = canvas.height / rect.height;
//     const x = (event.clientX - rect.left) * scaleX;
//     const y = (event.clientY - rect.top) * scaleY;

//     boxes.forEach((box, index) => {
//       if (
//         x > box.x_min * 800 / 640 &&
//         x < box.x_max * 800 / 640 &&
//         y > box.y_min * 448 / 640 &&
//         y < box.y_max * 448 / 640
//       ) {
//         setSelectedBoxIndex(index);
//       }
//     });
//   };

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const context = canvas.getContext('2d');
//     const image = new Image();
    
//     image.src = src;
//     image.onload = () => {
//       canvas.width = 800; // image.width;
//       canvas.height = 448; // image.height;
//       context.drawImage(image, 0, 0);
//       boxes.forEach((box, index) => {
//         context.beginPath();
//         context.rect(box.x_min * 800 / 640, box.y_min * 448 / 640, (box.x_max - box.x_min) * 800 / 640, (box.y_max - box.y_min) * 448 / 640);
//         context.lineWidth = 2;
//         context.strokeStyle = 'red';
//         context.stroke();
//         context.font = '12px Arial';
//         context.fillStyle = 'red';
//         context.fillText(labels[index], box.x_min * 800 / 640, box.y_min * 448 / 640 - 10);
//       });
//     };

//     // Set up the click event listener for the canvas
//     canvas.addEventListener('click', handleClick);

//     return () => {
//       canvas.removeEventListener('click', handleClick);
//     };
//   }, [src, boxes, labels]);

//   return (
//     <div style={{ position: 'relative' }}>
//       <canvas ref={canvasRef} alt={alt} />
//       {selectedBoxIndex !== null && (
//         <select
//           value={labels[selectedBoxIndex]}
//           onChange={handleLabelChange}
//           style={{
//             position: 'absolute',
//             top: `${boxes[selectedBoxIndex].y_min * 448 / 640 - 20}px`,
//             left: `${boxes[selectedBoxIndex].x_min * 800 / 640}px`,
//             fontSize: '12px', // Same font size as label
//             borderRadius: '3px',
//             backgroundColor: '#f26161', // Light purple color
//             color: '#000',
//             cursor: 'pointer',
//             boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
//             zIndex: 10, // Ensure dropdown appears above other elements
//           }}
//         >
//            <option value="Label1">Lymphocyte</option>
//            <option value="Label2">Basophil</option>
//            <option value="Label3">Metamylocyte</option>
//            <option value="Label3">Promyelocyte</option>
//            <option value="Label3">Monocyte</option>
//            <option value="Label3">Promyelocyte</option>
//            <option value="Label3">Abnormal</option>
//            <option value="Label3">Myelocyte</option>
//            <option value="Label3">Eosinophil</option>
//            <option value="Label3">Promonocyte</option>
//            <option value="Label3">lymphocyte</option>
//            <option value="Label3">Atypical</option>
//            <option value="Label3">Monoblast</option>
//            <option value="Label3">Neutrophil</option>
//            <option value="Label3">Lymphoblast</option>
//            <option value="Label3">Myeloblast</option>
//         </select>
//       )}
//     </div>
//   );
// };

// export default ImageWithBoundingBoxes;



// import React, { useEffect, useRef, useState } from 'react';

// const colorDictionary = {
//   Lymphocyte: '#FF5733',  // Bright Red
//   Basophil: '#FFBF00',     // Bright Yellow
//   Metamylocyte: '#33FF57',  // Bright Green
//   Promyelocyte: '#3399FF',  // Bright Blue
//   Monocyte: '#FF33A8',      // Bright Pink
//   Abnormal: '#FFD700',      // Gold
//   Myelocyte: '#FF8C00',     // Dark Orange
//   Eosinophil: '#9400D3',    // Dark Violet
//   Promonocyte: '#FF4500',   // Orange Red
//   Atypical: '#00FF7F',       // Spring Green
//   Monoblast: '#20B2AA',      // Light Sea Green
//   Neutrophil: '#1E90FF',     // Dodger Blue
//   Lymphoblast: '#FF69B4',    // Hot Pink
//   Myeloblast: '#ADFF2F',      // Green Yellow
// };


// const ImageWithBoundingBoxes = ({ src, boxes, alt }) => {
//   const canvasRef = useRef(null);
//   const [selectedBoxIndex, setSelectedBoxIndex] = useState(null);
//   const [labels, setLabels] = useState(boxes.map(box => box.Prediction));

//   const handleLabelChange = (event) => {
//     const newLabels = [...labels];
//     newLabels[selectedBoxIndex] = event.target.value;
//     setLabels(newLabels);
//     setSelectedBoxIndex(null); // Hide dropdown after selection
//   };

//   const handleClick = (event) => {
//     const canvas = canvasRef.current;
//     const rect = canvas.getBoundingClientRect();
//     const scaleX = canvas.width / rect.width;
//     const scaleY = canvas.height / rect.height;
//     const x = (event.clientX - rect.left) * scaleX;
//     const y = (event.clientY - rect.top) * scaleY;

//     boxes.forEach((box, index) => {
//       if (
//         x > box.x_min * 800 / 640 &&
//         x < box.x_max * 800 / 640 &&
//         y > box.y_min * 448 / 640 &&
//         y < box.y_max * 448 / 640
//       ) {
//         setSelectedBoxIndex(index);
//       }
//     });
//   };

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const context = canvas.getContext('2d');
//     const image = new Image();
    
//     image.src = src;
//     image.onload = () => {
//       canvas.width = 800; // image.width;
//       canvas.height = 448; // image.height;
//       context.drawImage(image, 0, 0);
//       boxes.forEach((box, index) => {
//         context.beginPath();
//         context.rect(box.x_min * 800 / 640, box.y_min * 448 / 640, (box.x_max - box.x_min) * 800 / 640, (box.y_max - box.y_min) * 448 / 640);
//         context.lineWidth = 2;
//         context.strokeStyle = colorDictionary[labels[index]] || 'red'; // Get color from dictionary
//         context.stroke();        
//         context.font = '12px Arial';
//         context.fillStyle = colorDictionary[labels[index]] || 'red'; // Get color from dictionary
//         context.fillText(labels[index], box.x_min * 800 / 640, box.y_min * 448 / 640 - 5);
//       });
//     };

//     // Set up the click event listener for the canvas
//     canvas.addEventListener('click', handleClick);

//     return () => {
//       canvas.removeEventListener('click', handleClick);
//     };
//   }, [src, boxes, labels]);

//   return (
//     <div style={{ position: 'relative' }}>
//       <canvas ref={canvasRef} alt={alt} />
//       {selectedBoxIndex !== null && (
//         <select
//           value={labels[selectedBoxIndex]}
//           onChange={handleLabelChange}
//           style={{
//             position: 'absolute',
//             top: `${boxes[selectedBoxIndex].y_min * 448 / 640 - 17.5}px`,
//             left: `${boxes[selectedBoxIndex].x_min * 800 / 640-2}px`,
//             fontSize: '12px', // Same font size as label
//             borderRadius: '3px',
//             backgroundColor: colorDictionary[labels[selectedBoxIndex]] || '#f26161', // Use color from dictionary
//             color: '#000',
//             cursor: 'pointer',
//             boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
//             zIndex: 10, // Ensure dropdown appears above other elements
//           }}
//         >
//           {Object.keys(colorDictionary).map(label => (
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



















// import React, { useEffect, useRef, useState } from 'react';

// const colorDictionary = {
//   Lymphocyte: '#FF5733',  // Bright Red
//   Basophil: '#FFBF00',     // Bright Yellow
//   Metamylocyte: '#33FF57',  // Bright Green
//   Promyelocyte: '#3399FF',  // Bright Blue
//   Monocyte: '#FF33A8',      // Bright Pink
//   Abnormal: '#FFD700',      // Gold
//   Myelocyte: '#FF8C00',     // Dark Orange
//   Eosinophil: '#9400D3',    // Dark Violet
//   Promonocyte: '#FF4500',   // Orange Red
//   Atypical: '#00FF7F',       // Spring Green
//   Monoblast: '#20B2AA',      // Light Sea Green
//   Neutrophil: '#1E90FF',     // Dodger Blue
//   Lymphoblast: '#FF69B4',    // Hot Pink
//   Myeloblast: '#ADFF2F',      // Green Yellow
// };

// const ImageWithBoundingBoxes = ({ src, boxes, alt }) => {
//   const canvasRef = useRef(null);
//   const [selectedBoxIndex, setSelectedBoxIndex] = useState(null);
//   const [labels, setLabels] = useState(boxes.map(box => box.Prediction));

//   const handleLabelChange = (event) => {
//     const newLabels = [...labels];
//     newLabels[selectedBoxIndex] = event.target.value;
//     setLabels(newLabels);
//     setSelectedBoxIndex(null); // Hide dropdown after selection
//   };

//   const handleClick = (event) => {
//     const canvas = canvasRef.current;
//     const rect = canvas.getBoundingClientRect();
//     const scaleX = canvas.width / rect.width;
//     const scaleY = canvas.height / rect.height;
//     const x = (event.clientX - rect.left) * scaleX;
//     const y = (event.clientY - rect.top) * scaleY;

//     boxes.forEach((box, index) => {
//       if (
//         x > box.x_min * 800 / 640 &&
//         x < box.x_max * 800 / 640 &&
//         y > box.y_min * 448 / 640 &&
//         y < box.y_max * 448 / 640
//       ) {
//         setSelectedBoxIndex(index);
//       }
//     });
//   };

//   const drawRoundedRect = (context, x, y, width, height, radius) => {
//     context.beginPath();
//     context.moveTo(x + radius, y);
//     context.lineTo(x + width - radius, y);
//     context.quadraticCurveTo(x + width, y, x + width, y + radius);
//     context.lineTo(x + width, y + height - radius);
//     context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
//     context.lineTo(x + radius, y + height);
//     context.quadraticCurveTo(x, y + height, x, y + height - radius);
//     context.lineTo(x, y + radius);
//     context.quadraticCurveTo(x, y, x + radius, y);
//     context.closePath();
//     context.fill();
//   };

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const context = canvas.getContext('2d');
//     const image = new Image();
    
//     image.src = src;
//     image.onload = () => {
//       canvas.width = 800; // image.width;
//       canvas.height = 448; // image.height;
//       context.drawImage(image, 0, 0);
//       boxes.forEach((box, index) => {
//         const color = colorDictionary[labels[index]] || 'red'; // Get color from dictionary

//         // Draw bounding box
//         context.beginPath();
//         context.rect(box.x_min * 800 / 640, box.y_min * 448 / 640, (box.x_max - box.x_min) * 800 / 640, (box.y_max - box.y_min) * 448 / 640);
//         context.lineWidth = 2;
//         context.strokeStyle = color;
//         context.stroke();

//         // Draw background for label
//         context.fillStyle = color; // Use bounding box color
//         const labelWidth = context.measureText(labels[index]).width;
//         const labelHeight = 18; // Height for the label background
//         const padding = 4; // Padding around the label
//         const xPos = box.x_min * 800 / 640 - 2; // Adjust x position for padding
//         const yPos = box.y_min * 448 / 640 - 17.5; // Adjust y position for padding

//         drawRoundedRect(context, xPos, yPos, labelWidth + padding * 4, labelHeight, 5); // Draw rounded rectangle

//         // Draw label
//         context.font = '12px Arial';
//         context.fillStyle = '#000'; // White text color
//         context.fillText(labels[index], xPos + padding, yPos + labelHeight - 4); // Draw label text
//       });
//     };

//     // Set up the click event listener for the canvas
//     canvas.addEventListener('click', handleClick);

//     return () => {
//       canvas.removeEventListener('click', handleClick);
//     };
//   }, [src, boxes, labels]);

//   return (
//     <div style={{ position: 'relative' }}>
//       <canvas ref={canvasRef} alt={alt}/>
//       {selectedBoxIndex !== null && (
//         <select
//           value={labels[selectedBoxIndex]}
//           onChange={handleLabelChange}
//           style={{
//             position: 'absolute',
//             top: `${boxes[selectedBoxIndex].y_min * 448 / 640 - 17.5}px`,
//             left: `${boxes[selectedBoxIndex].x_min * 800 / 640 - 2}px`,
//             fontSize: '12px', // Same font size as label
//             borderRadius: '3px',
//             backgroundColor: colorDictionary[labels[selectedBoxIndex]] || '#f26161', // Use color from dictionary
//             color: '#000',
//             cursor: 'pointer',
//             boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
//             zIndex: 10, // Ensure dropdown appears above other elements
//           }}
//         >
//           {Object.keys(colorDictionary).map(label => (
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


// import React, { useEffect, useRef, useState } from 'react';

// const WIDTH = 1200;
// const HEIGHT = 672;

// const colorDictionary = {
//   Lymphocyte: '#FF5733',  // Bright Red
//   Basophil: '#FFBF00',     // Bright Yellow
//   Metamylocyte: '#33FF57',  // Bright Green
//   Promyelocyte: '#3399FF',  // Bright Blue
//   Monocyte: '#FF33A8',      // Bright Pink
//   Abnormal: '#FFD700',      // Gold
//   Myelocyte: '#FF8C00',     // Dark Orange
//   Eosinophil: '#9400D3',    // Dark Violet
//   Promonocyte: '#FF4500',   // Orange Red
//   Atypical: '#00FF7F',       // Spring Green
//   Monoblast: '#20B2AA',      // Light Sea Green
//   Neutrophil: '#1E90FF',     // Dodger Blue
//   Lymphoblast: '#FF69B4',    // Hot Pink
//   Myeloblast: '#ADFF2F',      // Green Yellow
// };

// const ImageWithBoundingBoxes = ({ src, boxes, alt }) => {
//   const canvasRef = useRef(null);
//   const [selectedBoxIndex, setSelectedBoxIndex] = useState(null);
//   const [labels, setLabels] = useState(boxes.map(box => box.Prediction));

//   const handleLabelChange = (event) => {
//     const newLabels = [...labels];
//     newLabels[selectedBoxIndex] = event.target.value;
//     setLabels(newLabels);
//     setSelectedBoxIndex(null); // Hide dropdown after selection
//   };

//   const handleClick = (event) => {
//     const canvas = canvasRef.current;
//     const rect = canvas.getBoundingClientRect();
//     const scaleX = canvas.width / rect.width;
//     const scaleY = canvas.height / rect.height;
//     const x = (event.clientX - rect.left) * scaleX;
//     const y = (event.clientY - rect.top) * scaleY;

//     boxes.forEach((box, index) => {
//       if (
//         x > box.x_min * WIDTH / 640 &&
//         x < box.x_max * WIDTH / 640 &&
//         y > box.y_min * HEIGHT / 672 &&
//         y < box.y_max * HEIGHT / 672
//       ) {
//         setSelectedBoxIndex(index);
//       }
//     });
//   };

//   const drawRoundedRect = (context, x, y, width, height, radius) => {
//     context.beginPath();
//     context.moveTo(x + radius, y);
//     context.lineTo(x + width - radius, y);
//     context.quadraticCurveTo(x + width, y, x + width, y + radius);
//     context.lineTo(x + width, y + height - radius);
//     context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
//     context.lineTo(x + radius, y + height);
//     context.quadraticCurveTo(x, y + height, x, y + height - radius);
//     context.lineTo(x, y + radius);
//     context.quadraticCurveTo(x, y, x + radius, y);
//     context.closePath();
//     context.fill();
//   };

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const context = canvas.getContext('2d');
//     const image = new Image();
    
//     image.src = src;
//     image.onload = () => {
//       canvas.width = WIDTH;
//       canvas.height = HEIGHT;
//       context.drawImage(image, 0, 0, WIDTH, HEIGHT); // Resize the image to fill canvas
//       boxes.forEach((box, index) => {
//         const color = colorDictionary[labels[index]] || 'red'; // Get color from dictionary

//         // Draw bounding box
//         context.beginPath();
//         context.rect(box.x_min * WIDTH / 640, box.y_min * HEIGHT / 640, 
//                      (box.x_max - box.x_min) * WIDTH / 640, 
//                      (box.y_max - box.y_min) * HEIGHT / 672);
//         context.lineWidth = 2;
//         context.strokeStyle = color;
//         context.stroke();

//         // Draw background for label
//         context.fillStyle = color; // Use bounding box color
//         const labelWidth = context.measureText(labels[index]).width;
//         const labelHeight = 18; // Height for the label background
//         const padding = 4; // Padding around the label
//         const xPos = box.x_min * WIDTH / 640 - 2; // Adjust x position for padding
//         const yPos = box.y_min * HEIGHT / 672 - 17.5; // Adjust y position for padding

//         drawRoundedRect(context, xPos, yPos, labelWidth + padding * 4, labelHeight, 5); // Draw rounded rectangle

//         // Draw label
//         context.font = '12px Arial';
//         context.fillStyle = '#fff'; // White text color
//         context.fillText(labels[index], xPos + padding, yPos + labelHeight - 4); // Draw label text
//       });
//     };

//     // Set up the click event listener for the canvas
//     canvas.addEventListener('click', handleClick);

//     return () => {
//       canvas.removeEventListener('click', handleClick);
//     };
//   }, [src, boxes, labels]);

//   return (
//     <div style={{ position: 'relative' }}>
//       <canvas ref={canvasRef} alt={alt} />
//       {selectedBoxIndex !== null && (
//         <select
//           value={labels[selectedBoxIndex]}
//           onChange={handleLabelChange}
//           style={{
//             position: 'absolute',
//             top: `${boxes[selectedBoxIndex].y_min * HEIGHT / 672}px`,
//             left: `${boxes[selectedBoxIndex].x_min * WIDTH / 640}px`,
//             fontSize: '12px', // Same font size as label
//             borderRadius: '3px',
//             backgroundColor: colorDictionary[labels[selectedBoxIndex]] || '#f26161', // Use color from dictionary
//             color: '#000',
//             cursor: 'pointer',
//             boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
//             zIndex: 10, // Ensure dropdown appears above other elements
//           }}
//         >
//           {Object.keys(colorDictionary).map(label => (
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

// import React, { useEffect, useRef, useState } from 'react';
// import './ImageWithBoundingBoxes.css'; // Import CSS file for styles

// const WIDTH = 1200; // New width
// const HEIGHT = 672; // New height
// const BALANCER = 640; // Constant for scaling

// const colorDictionary = {
//   Lymphocyte: '#FF5733',
//   Basophil: '#FFBF00',
//   Metamylocyte: '#33FF57',
//   Promyelocyte: '#3399FF',
//   Monocyte: '#FF33A8',
//   Abnormal: '#FFD700',
//   Myelocyte: '#FF8C00',
//   Eosinophil: '#9400D3',
//   Promonocyte: '#FF4500',
//   Atypical: '#00FF7F',
//   Monoblast: '#20B2AA',
//   Neutrophil: '#1E90FF',
//   Lymphoblast: '#FF69B4',
//   Myeloblast: '#ADFF2F',
//   None:'blue',
// };

// const ImageWithBoundingBoxes = ({ src, boxes, alt }) => {
//   const canvasRef = useRef(null);
//   const [selectedBoxIndex, setSelectedBoxIndex] = useState(null);
//   const [labels, setLabels] = useState(boxes.map((box) => box.Prediction));

//   const handleLabelChange = (event) => {
//     const newLabels = [...labels];
//     newLabels[selectedBoxIndex] = event.target.value;
//     setLabels(newLabels);
//     setSelectedBoxIndex(null);
//   };

//   const handleClick = (event) => {
//     const canvas = canvasRef.current;
//     const rect = canvas.getBoundingClientRect();
//     const scaleX = canvas.width / rect.width;
//     const scaleY = canvas.height / rect.height;
//     const x = (event.clientX - rect.left) * scaleX;
//     const y = (event.clientY - rect.top) * scaleY;

//     boxes.forEach((box, index) => {
//       if (
//         x > (box.x_min * WIDTH) / BALANCER &&
//         x < (box.x_max * WIDTH) / BALANCER &&
//         y > (box.y_min * HEIGHT) / BALANCER &&
//         y < (box.y_max * HEIGHT) / BALANCER 
//       ) {
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
//     context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
//     context.lineTo(x + radius, y + height);
//     context.quadraticCurveTo(x, y + height, x, y + height - radius);
//     context.lineTo(x, y + radius);
//     context.quadraticCurveTo(x, y, x + radius, y);
//     context.closePath();
//     context.fill();
//   };

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const context = canvas.getContext('2d');
//     const image = new Image();

//     image.src = src;
//     image.onload = () => {
//       canvas.width = WIDTH; // Set new width
//       canvas.height = HEIGHT; // Set new height
//       context.drawImage(image, 0, 0, WIDTH, HEIGHT); // Draw image with new dimensions
//       boxes.forEach((box, index) => {
//         const color = colorDictionary[labels[index]] || 'red';

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
//         const yPos = (box.y_min * HEIGHT) / BALANCER < 20 ? // Check if box is at the top
//           (box.y_max * HEIGHT) / BALANCER : // Place below the box
//           (box.y_min * HEIGHT) / BALANCER - 16; // Place above the box

//         drawRoundedRect(context, xPos, yPos, labelWidth + padding * 4, labelHeight, 5, color);

//         // Draw label
//         context.font = '12px Arial';
//         context.fillStyle = 'black'; // White text color
//         context.fillText(labels[index], xPos + padding, yPos + labelHeight - 4);
//       });
//     };

//     canvas.addEventListener('click', handleClick);

//     return () => {
//       canvas.removeEventListener('click', handleClick);
//     };
//   }, [src, boxes, labels]);

//   return (
//     <div className="image-container">
//       <canvas ref={canvasRef} alt={alt} className="rounded-xl mb-5 bounding-box-canvas" />
//       {selectedBoxIndex !== null && (
//         <select
//           value={labels[selectedBoxIndex]}
//           onChange={handleLabelChange}
//           className="label-dropdown rounded no-focus-outline"
//           style={{
//             top: `${(boxes[selectedBoxIndex].y_min * HEIGHT) / BALANCER < 20 ? // Check if box is at the top
//               (boxes[selectedBoxIndex].y_max * HEIGHT) / BALANCER : // Place below the box
//               (boxes[selectedBoxIndex].y_min * HEIGHT) / BALANCER - 16}px`, // Place above the box
//             left: `${(boxes[selectedBoxIndex].x_min * WIDTH) / BALANCER - 6}px`,
//             position: 'absolute',
//             fontSize: '12px',
//             borderRadius: '3px',
//             backgroundColor: colorDictionary[labels[selectedBoxIndex]] || '#f26161',
//             color: 'black',
//             cursor: 'pointer',
//             boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
//             zIndex: 10,
//           }}
//         >
//           {Object.keys(colorDictionary).map((label) => (
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




// import React, { useEffect, useRef, useState } from 'react';
// import './ImageWithBoundingBoxes.css'; // Import CSS file for styles

// const WIDTH = 1200; // New width
// const HEIGHT = 672; // New height
// const BALANCER = 640; // Constant for scaling

// const colorDictionary = {
//   Lymphocyte: '#FF5733',
//   Basophil: '#FFBF00',
//   Metamylocyte: '#33FF57',
//   Promyelocyte: '#3399FF',
//   Monocyte: '#FF33A8',
//   Abnormal: '#FFD700',
//   Myelocyte: '#FF8C00',
//   Eosinophil: '#9400D3',
//   Promonocyte: '#FF4500',
//   Atypical: '#00FF7F',
//   Monoblast: '#20B2AA',
//   Neutrophil: '#1E90FF',
//   Lymphoblast: '#FF69B4',
//   Myeloblast: '#ADFF2F',
// };

// const ImageWithBoundingBoxes = ({ src, boxes, alt }) => {
//   const canvasRef = useRef(null);
//   const [selectedBoxIndex, setSelectedBoxIndex] = useState(null);
//   const [labels, setLabels] = useState(boxes.map((box) => box.Prediction));

//   const handleLabelChange = (event) => {
//     const newLabels = [...labels];
//     newLabels[selectedBoxIndex] = event.target.value;
//     setLabels(newLabels);
//     setSelectedBoxIndex(null);
//     // Save labels to local storage
//     localStorage.setItem('labels', JSON.stringify(newLabels));
//   };

//   const handleClick = (event) => {
//     const canvas = canvasRef.current;
//     const rect = canvas.getBoundingClientRect();
//     const scaleX = canvas.width / rect.width;
//     const scaleY = canvas.height / rect.height;
//     const x = (event.clientX - rect.left) * scaleX;
//     const y = (event.clientY - rect.top) * scaleY;

//     boxes.forEach((box, index) => {
//       if (
//         x > (box.x_min * WIDTH) / BALANCER &&
//         x < (box.x_max * WIDTH) / BALANCER &&
//         y > (box.y_min * HEIGHT) / BALANCER &&
//         y < (box.y_max * HEIGHT) / BALANCER 
//       ) {
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
//     context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
//     context.lineTo(x + radius, y + height);
//     context.quadraticCurveTo(x, y + height, x, y + height - radius);
//     context.lineTo(x, y + radius);
//     context.quadraticCurveTo(x, y, x + radius, y);
//     context.closePath();
//     context.fill();
//   };

//   useEffect(() => {
//     // Load labels from local storage
//     const savedLabels = JSON.parse(localStorage.getItem('labels'));
//     if (savedLabels) {
//       setLabels(savedLabels);
//     }

//     const canvas = canvasRef.current;
//     const context = canvas.getContext('2d');
//     const image = new Image();

//     image.src = src;
//     image.onload = () => {
//       canvas.width = WIDTH; // Set new width
//       canvas.height = HEIGHT; // Set new height
//       context.drawImage(image, 0, 0, WIDTH, HEIGHT); // Draw image with new dimensions
//       boxes.forEach((box, index) => {
//         const color = colorDictionary[labels[index]] || 'red';

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
//         const yPos = (box.y_min * HEIGHT) / BALANCER < 20 ? // Check if box is at the top
//           (box.y_max * HEIGHT) / BALANCER : // Place below the box
//           (box.y_min * HEIGHT) / BALANCER - 16; // Place above the box

//         drawRoundedRect(context, xPos, yPos, labelWidth + padding * 4, labelHeight, 5, color);

//         // Draw label
//         context.font = '12px Arial';
//         context.fillStyle = 'black'; // White text color
//         context.fillText(labels[index], xPos + padding, yPos + labelHeight - 4);
//       });
//     };

//     canvas.addEventListener('click', handleClick);

//     return () => {
//       canvas.removeEventListener('click', handleClick);
//     };
//   }, [src, boxes, labels]);

//   return (
//     <div className="image-container">
//       <canvas ref={canvasRef} alt={alt} className="rounded-xl mb-5 bounding-box-canvas" />
//       {selectedBoxIndex !== null && (
//         <select
//           value={labels[selectedBoxIndex]}
//           onChange={handleLabelChange}
//           className="label-dropdown rounded no-focus-outline"
//           style={{
//             top: `${(boxes[selectedBoxIndex].y_min * HEIGHT) / BALANCER < 20 ? // Check if box is at the top
//               (boxes[selectedBoxIndex].y_max * HEIGHT) / BALANCER : // Place below the box
//               (boxes[selectedBoxIndex].y_min * HEIGHT) / BALANCER - 16}px`, // Place above the box
//             left: `${(boxes[selectedBoxIndex].x_min * WIDTH) / BALANCER - 6}px`,
//             position: 'absolute',
//             fontSize: '12px',
//             borderRadius: '3px',
//             backgroundColor: colorDictionary[labels[selectedBoxIndex]] || '#f26161',
//             color: 'black',
//             cursor: 'pointer',
//             boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
//             zIndex: 10,
//           }}
//         >
//           {Object.keys(colorDictionary).map((label) => (
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








// import React, { useEffect, useRef, useState } from 'react';
// import './ImageWithBoundingBoxes.css'; // Import CSS file for styles

// const WIDTH = 1200; // New width
// const HEIGHT = 672; // New height
// const BALANCER = 640; // Constant for scaling

// const colorDictionary = {
//   Lymphocyte: '#FF5733',
//   Basophil: '#FFBF00',
//   Metamylocyte: '#33FF57',
//   Promyelocyte: '#3399FF',
//   Monocyte: '#FF33A8',
//   Abnormal: '#FFD700',
//   Myelocyte: '#FF8C00',
//   Eosinophil: '#9400D3',
//   Promonocyte: '#FF4500',
//   Atypical: '#00FF7F',
//   Monoblast: '#20B2AA',
//   Neutrophil: '#1E90FF',
//   Lymphoblast: '#FF69B4',
//   Myeloblast: '#ADFF2F',
//   None:'blue'
// };

// const ImageWithBoundingBoxes = ({ src, boxes, alt }) => {
//   const canvasRef = useRef(null);
//   const [selectedBoxIndex, setSelectedBoxIndex] = useState(null);
//   const [labels, setLabels] = useState(boxes.map((box) => box.Prediction));

//   const handleLabelChange = (event) => {
//     const newLabels = [...labels];
//     newLabels[selectedBoxIndex] = event.target.value;
//     setLabels(newLabels);
//     setSelectedBoxIndex(null);
//     // Save labels to local storage
//     localStorage.setItem('labels', JSON.stringify(newLabels));
//   };

//   const handleClick = (event) => {
//     const canvas = canvasRef.current;
//     const rect = canvas.getBoundingClientRect();
//     const scaleX = canvas.width / rect.width;
//     const scaleY = canvas.height / rect.height;
//     const x = (event.clientX - rect.left) * scaleX;
//     const y = (event.clientY - rect.top) * scaleY;

//     boxes.forEach((box, index) => {
//       if (
//         x > (box.x_min * WIDTH) / BALANCER &&
//         x < (box.x_max * WIDTH) / BALANCER &&
//         y > (box.y_min * HEIGHT) / BALANCER &&
//         y < (box.y_max * HEIGHT) / BALANCER 
//       ) {
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
//     context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
//     context.lineTo(x + radius, y + height);
//     context.quadraticCurveTo(x, y + height, x, y + height - radius);
//     context.lineTo(x, y + radius);
//     context.quadraticCurveTo(x, y, x + radius, y);
//     context.closePath();
//     context.fill();
//   };

//   useEffect(() => {
//     // Load labels from local storage
//     const savedLabels = JSON.parse(localStorage.getItem('labels'));
//     if (savedLabels) {
//       setLabels(savedLabels);
//     }

//     const canvas = canvasRef.current;
//     const context = canvas.getContext('2d');
//     const image = new Image();

//     image.src = src;
//     image.onload = () => {
//       canvas.width = WIDTH; // Set new width
//       canvas.height = HEIGHT; // Set new height
//       context.drawImage(image, 0, 0, WIDTH, HEIGHT); // Draw image with new dimensions
//       boxes.forEach((box, index) => {
//         const color = colorDictionary[labels[index]] || 'red';

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
//         const yPos = (box.y_min * HEIGHT) / BALANCER < 20 ? // Check if box is at the top
//           (box.y_max * HEIGHT) / BALANCER : // Place below the box
//           (box.y_min * HEIGHT) / BALANCER - 16; // Place above the box

//         // drawRoundedRect(context, xPos, yPos, 65, labelHeight, 5, color);
//         drawRoundedRect(context, xPos, yPos, Math.max(labelWidth + padding * 4,75) , labelHeight, 5, color);

//         // Draw label
//         context.font = '12px Arial';
//         context.fillStyle = 'black'; // White text color
//         context.fillText(labels[index], xPos + padding, yPos + labelHeight - 4);
//       });
//     };

//     canvas.addEventListener('click', handleClick);

//     return () => {
//       canvas.removeEventListener('click', handleClick);
//     };
//   }, [src, boxes, labels]);

//   return (
//     <div className="image-container">
//       <canvas ref={canvasRef} alt={alt} className="rounded-xl mb-5 bounding-box-canvas" />
//       {selectedBoxIndex !== null && (
//         <select
//           value={labels[selectedBoxIndex]}
//           onChange={handleLabelChange}
//           className="label-dropdown rounded no-focus-outline"
//           style={{
//             top: `${(boxes[selectedBoxIndex].y_min * HEIGHT) / BALANCER < 20 ? // Check if box is at the top
//               (boxes[selectedBoxIndex].y_max * HEIGHT) / BALANCER : // Place below the box
//               (boxes[selectedBoxIndex].y_min * HEIGHT) / BALANCER - 16}px`, // Place above the box
//             left: `${(boxes[selectedBoxIndex].x_min * WIDTH) / BALANCER - 6}px`,
//             position: 'absolute',
//             fontSize: '12px',
//             borderRadius: '3px',
//             backgroundColor: colorDictionary[labels[selectedBoxIndex]] || '#f26161',
//             color: 'black',
//             cursor: 'pointer',
//             boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
//             zIndex: 10,
//           }}
//         >
//           {Object.keys(colorDictionary).map((label) => (
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







import React, { useEffect, useRef, useState } from 'react';
import './ImageWithBoundingBoxes.css'; // Import CSS file for styles

const WIDTH = 1200; // New width
const HEIGHT = 672; // New height
const BALANCER = 640; // Constant for scaling

const colorDictionary = {
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
  None: '#808080',
};

const ImageWithBoundingBoxes = ({ src, boxes, alt }) => {
  const canvasRef = useRef(null);
  const [selectedBoxIndex, setSelectedBoxIndex] = useState(null);
  const [labels, setLabels] = useState(() =>
    boxes.map((box) => box.Prediction)
  );

  const handleLabelChange = (event) => {
    const newLabels = [...labels];
    newLabels[selectedBoxIndex] = event.target.value;
    setLabels(newLabels);
    setSelectedBoxIndex(null);
    // Save labels to local storage
    localStorage.setItem(`${src}-labels`, JSON.stringify(newLabels));
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
    // Load labels from local storage
    const savedLabels = JSON.parse(localStorage.getItem(`${src}-labels`));
    if (savedLabels) {
      setLabels(savedLabels);
    }

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const image = new Image();

    image.src = src;
    image.onload = () => {
      canvas.width = WIDTH; // Set new width
      canvas.height = HEIGHT; // Set new height
      context.drawImage(image, 0, 0, WIDTH, HEIGHT); // Draw image with new dimensions
      boxes.forEach((box, index) => {
        const color = colorDictionary[labels[index]] || 'red';

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

        drawRoundedRect(context, xPos, yPos, labelWidth + padding * 4, labelHeight, 5, color);

        // Draw label
        context.font = '12px Arial';
        context.fillStyle = 'black'; // White text color
        context.fillText(labels[index], xPos + padding, yPos + labelHeight - 4);
      });
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
            top: `${(boxes[selectedBoxIndex].y_min * HEIGHT) / BALANCER < 20 ? // Check if box is at the top
              (boxes[selectedBoxIndex].y_max * HEIGHT) / BALANCER : // Place below the box
              (boxes[selectedBoxIndex].y_min * HEIGHT) / BALANCER - 16}px`, // Place above the box
            left: `${(boxes[selectedBoxIndex].x_min * WIDTH) / BALANCER - 6}px`,
            position: 'absolute',
            fontSize: '12px',
            borderRadius: '3px',
            backgroundColor: colorDictionary[labels[selectedBoxIndex]] || '#f26161',
            color: 'black',
            cursor: 'pointer',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
            zIndex: 10,
          }}
        >
          {Object.keys(colorDictionary).map((label) => (
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








































































































































// import React, { useEffect, useRef, useState } from 'react';

// const ImageWithBoundingBoxes = ({ src, boxes, alt }) => {
//   const canvasRef = useRef(null);
//   const [selectedBoxIndex, setSelectedBoxIndex] = useState(null);
//   const [labels, setLabels] = useState(() => {
//     const savedLabels = JSON.parse(localStorage.getItem('labels'));
//     return savedLabels && savedLabels.length === boxes.length
//       ? savedLabels
//       : boxes.map(box => box.Prediction || ""); // Default to empty string if Prediction is undefined
//   });

//   const handleBoxClick = (index) => {
//     setSelectedBoxIndex(index);
//   };

//   const handleLabelChange = (event) => {
//     const newLabels = [...labels];
//     newLabels[selectedBoxIndex] = event.target.value;
//     setLabels(newLabels);
//     setSelectedBoxIndex(null);
//     localStorage.setItem('labels', JSON.stringify(newLabels)); // Save updated labels to local storage
//   };

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const context = canvas.getContext('2d');
//     const image = new Image();

//     image.src = src;
//     image.onload = () => {
//       canvas.width = 800; // Set canvas width
//       canvas.height = 448; // Set canvas height
//       context.drawImage(image, 0, 0);

//       boxes.forEach((box, index) => {
//         // Draw bounding box
//         context.beginPath();
//         context.rect(
//           (box.x_min * canvas.width) / 640,
//           (box.y_min * canvas.height) / 448,
//           ((box.x_max - box.x_min) * canvas.width) / 640,
//           ((box.y_max - box.y_min) * canvas.height) / 448
//         );
//         context.lineWidth = 2;
//         context.strokeStyle = 'red';
//         context.stroke();

//         // Draw label
//         context.font = '12px Arial';
//         context.fillStyle = 'red';
//         context.fillText(
//           labels[index] || "", 
//           (box.x_min * canvas.width) / 640, 
//           (box.y_min * canvas.height) / 448 - 10
//         );

//         // Add click listener to the canvas for selecting boxes
//         canvas.addEventListener('click', (event) => {
//           const rect = canvas.getBoundingClientRect();
//           const scaleX = canvas.width / rect.width;
//           const scaleY = canvas.height / rect.height;
//           const x = (event.clientX - rect.left) * scaleX;
//           const y = (event.clientY - rect.top) * scaleY;

//           // Check if click is inside the bounding box
//           if (
//             x > (box.x_min * canvas.width) / 640 &&
//             x < (box.x_max * canvas.width) / 640 &&
//             y > (box.y_min * canvas.height) / 448 &&
//             y < (box.y_max * canvas.height) / 448
//           ) {
//             handleBoxClick(index);
//           }
//         });
//       });
//     };
//   }, [src, boxes, labels]);

//   return (
//     <div>
//       <canvas ref={canvasRef} alt={alt} />
//       {selectedBoxIndex !== null && (
//         <select
//           value={labels[selectedBoxIndex]}
//           onChange={handleLabelChange}
//           style={{
//             position: 'absolute',
//             top: `${(boxes[selectedBoxIndex].y_min * 448) / 640}px`,
//             left: `${(boxes[selectedBoxIndex].x_min * 800) / 640}px`,
//           }}
//         >
//           <option value="Label1">Label1</option>
//           <option value="Label2">Label2</option>
//           <option value="Label3">Label3</option>
//         </select>
//       )}
//     </div>
//   );
// };

// export default ImageWithBoundingBoxes;








