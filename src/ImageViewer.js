import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import ImageWithBoundingBoxes from "./ImageWithBoundingBoxes";
import predictions from "./data/predictions.csv";
// import { Document, Page, Text, View, Image, StyleSheet, pdf } from '@react-pdf/renderer';
// import * as XLSX from 'xlsx';

// // Styles for the PDF document
// const styles = StyleSheet.create({
//   page: {
//     flexDirection: 'column',
//     backgroundColor: '#FFF',
//     padding: 10,
//   },
//   header: {
//     fontSize: 24,
//     textAlign: 'center',
//     margin: 10,
//   },
//   subHeader: {
//     fontSize: 18,
//     textAlign: 'center',
//     margin: 10,
//   },
//   table: {
//     display: 'table',
//     width: 'auto',
//     margin: 10,
//   },
//   tableRow: {
//     flexDirection: 'row',
//   },
//   tableCol: {
//     width: '25%',
//     borderStyle: 'solid',
//     borderColor: '#000',
//     borderWidth: 1,
//     padding: 5,
//   },
//   tableCell: {
//     margin: 5,
//     fontSize: 12,
//   },
//   image: {
//     margin: 10,
//     width: 200,
//     height: 200,
//   },
//   spacer: {
//     margin: 10,
//   }
// });

// const mapping = {
//   "Nuclear Chromatin": {0: "Open", 1: "Coarse"},
//   "Nuclear Shape": {0: "Regular", 1: "Irregular"},
//   "Nucleus": {0: "Inconspicuous", 1: "Prominent"},
//   "Cytoplasm": {0: "Scanty", 1: "Abundant"},
//   "Cytoplasmic Basophilia": {0: "Slight", 1: "Moderate"},
//   "Cytoplasmic Vacuoles": {0: "Absent", 1: "Prominent"}
// };

// const processData = (data) => {
//   // Convert mapping values
//   data.forEach(row => {
//     Object.keys(mapping).forEach(key => {
//       row[key] = mapping[key][row[key]];
//     });
//   });

//   // Create summary data
//   const summary = Object.keys(mapping).map(key => {
//     const counts = data.reduce((acc, row) => {
//       acc[row[key]] = (acc[row[key]] || 0) + 1;
//       return acc;
//     }, {});

//     return {
//       name: key,
//       ...counts,
//     };
//   });

//   return summary;
// };


// const generatePDF = async (data) => {
//   const summaryData = processData(data);
//   console.log("inside generate pdf: ",summaryData)

//   const pdfDoc = (
//     <Document>
//       <Page size="A4" style={styles.page}>
//         <Text style={styles.header}>MEDICAL ARTIFICIAL INTELLIGENCE (MEDAI) GROUP</Text>
//         <Text style={styles.subHeader}>AI-Assisted White Blood Cell Counting & Characteristics: A Comprehensive Report</Text>
//         {/* Add your tables and other content here */}
//         <View style={styles.table}>
//           {summaryData.map((row, rowIndex) => (
//             <View key={rowIndex} style={styles.tableRow}>
//               {Object.keys(row).map((col, colIndex) => (
//                 <View key={colIndex} style={styles.tableCol}>
//                   <Text style={styles.tableCell}>{row[col]}</Text>
//                 </View>
//               ))}
//             </View>
//           ))}
//         </View>
//         {/* Add images */}
//         <Image style={styles.image} src="./logo.jpeg" />
//       </Page>
//     </Document>
//   );

//   const blob = await pdf(pdfDoc).toBlob();
//   const link = document.createElement('a');
//   link.href = URL.createObjectURL(blob);
//   link.download = 'report.pdf';
//   link.click();
// };


const importImages = require.context("./data", false, /\.(png|jpe?g|svg)$/);
let images = importImages.keys().map((item) => ({
  src: importImages(item),
  name: item.replace("./", ""),
}));

console.log("Imported images:", images);

const ImageViewer = ({ navigate, patientDetails }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [boundingBoxes, setBoundingBoxes] = useState([]);

//                                       // const handleGenerateReport = async () => {
//                                       //   const file = './data/predictions.csv'
//                                       //   const data = await file.arrayBuffer();
//                                       //   const workbook = XLSX.read(data);
//                                       //   const worksheet = workbook.Sheets[workbook.SheetNames[0]];
//                                       //   const jsonData = XLSX.utils.sheet_to_json(worksheet);

//                                       //   generatePDF(jsonData);
//                                       // };

//                                       // const handleGenerateReport = async () => {
//                                       //   console.log("start")
//                                       //   const fileUrl = './data/predictions.csv';

//                                       //   try {
//                                       //     // Fetch the file as array buffer
//                                       //     const response = await fetch(fileUrl);
//                                       //     const data = await response.arrayBuffer();

//                                       //     // Parse the array buffer using XLSX
//                                       //     const workbook = XLSX.read(new Uint8Array(data));
//                                       //     const worksheet = workbook.Sheets[workbook.SheetNames[0]];
//                                       //     const jsonData = XLSX.utils.sheet_to_json(worksheet);

//                                       //     // Now you can use jsonData to generate PDF
//                                       //     generatePDF(jsonData);
//                                       //   } catch (error) {
//                                       //     console.error('Error reading file:', error);
//                                       //   }
//                                       // };

//                                       // const handleGenerateReport = async () => {
//                                       //   console.log("start")
//                                       //   const fileUrl = './data/predictions.csv';
                                      
//                                       //   try {
//                                       //     // Fetch the CSV file
//                                       //     const response = await fetch(fileUrl);
//                                       //     // console.log("response: ",response)
//                                       //     const csvData = await response.text(); // Read response as text
//                                       //     // console.log("csvData: ",csvData);
//                                       //     // Parse the CSV data using XLSX
//                                       //     const workbook = XLSX.utils.book_new();
//                                       //     const worksheet = XLSX.utils.aoa_to_sheet(XLSX.utils.sheet_to_json(csvData, { header: 1 }));
//                                       //     // console.log("workbook: ", workbook);
//                                       //     // Now you can use worksheet to generate PDF
//                                       //     const jsonData = XLSX.utils.sheet_to_json(worksheet);
//                                       //     console.log("Affan: ",jsonData)
//                                       //     generatePDF(jsonData);
//                                       //   } catch (error) {
//                                       //     console.error('Error reading file:', error);
//                                       //   }
//                                       // };


//                                       // const handleGenerateReport = async () => {
//                                       //   console.log("start");
//                                       //   const fileUrl = './data/predictions.csv';
                                      
//                                       //   try {
//                                       //     // Fetch the CSV file
//                                       //     const response = await fetch(fileUrl);
//                                       //     const csvData = await response.text(); // Read response as text
                                      
//                                       //     // Parse the CSV data using PapaParse
//                                       //     Papa.parse(csvData, {
//                                       //       header: false,
//                                       //       skipEmptyLines: true,
//                                       //       complete: (results) => {
//                                       //         const jsonData = results.data; // Get data as JSON
//                                       //         console.log("Affan: ", jsonData);
                                              
//                                       //         // Generate PDF from jsonData
//                                       //         generatePDF(jsonData);
//                                       //       },
//                                       //       error: (error) => {
//                                       //         console.error('Error parsing CSV:', error);
//                                       //       }
//                                       //     });
//                                       //   } catch (error) {
//                                       //     console.error('Error reading file:', error);
//                                       //   }
//                                       // };
  
//   const handleGenerateReport = async () => {
//     console.log("start");
//     const fileUrl = './data/predictions.csv';
  
//     try {
//       // Fetch the CSV file
//       const response = await fetch(fileUrl);
//       const csvData = await response.text(); // Read response as text
                        
//                             // // Parse the CSV data using PapaParse
//                             // Papa.parse(csvData, {
//                             //   header: true, // Set header to true to parse first row as header
//                             //   skipEmptyLines: true,
//                             //   complete: (results) => {
//                             //     const jsonData = results.data.map(row => {
//                             //       // Log each row to inspect it
//                             //       console.log("Row: ", row);
                        
//                             //       return {
//                             //         "Nuclear Chromatin": parseInt(row["Nuclear Chromatin"], 10) || 0,
//                             //         "Nuclear Shape": parseInt(row["Nuclear Shape"], 10) || 0,
//                             //         "Nucleus": parseInt(row["Nucleus"], 10) || 0,
//                             //         "Cytoplasm": parseInt(row["Cytoplasm"], 10) || 0,
//                             //         "Cytoplasmic Basophilia": parseInt(row["Cytoplasmic Basophilia"], 10) || 0,
//                             //         "Cytoplasmic Vacuoles": parseInt(row["Cytoplasmic Vacuoles"], 10) || 0,
//                             //         // Add other fields as needed
//                             //       };
//                             //     });
//                             //     console.log("Affan: ", jsonData);
                        
//                             //     // Generate PDF from jsonData
//                             //     generatePDF(jsonData);
//                             //   },
//                             //   error: (error) => {
//                             //     console.error('Error parsing CSV:', error);
//                             //   }
//                             // });

//       const filePath = './data/predictions.csv';
//       const columns = ['Nuclear Chromatin', 'Nuclear Shape','Nucleus','Cytoplasm','Cytoplasmic Basophilia','Cytoplasmic Vacuoles'];
//       const jsonData = await new Promise((resolve, reject) => {
//         Papa.parse(filePath, {
//             header: true, // Treat the first row as headers
//             download: true, // Download the file
//             complete: (results) => {
//                 // Extract columns into a dictionary for each row
//                 const extractedData = results.data.map(row => {
//                   console.log("Row: ", row);
//                   const result = {};
//                     columns.forEach(column => {
//                         if (row[column] !== undefined) {
//                             result[column] = row[column];
//                         }
//                     });
//                     return result;
//                 });
//                 resolve(extractedData);
//             },
//             error: (error) => {
//                 reject(error);
//             }
//         });
//     });
//     console.log("jsonData: ", jsonData);
//     generatePDF(jsonData);



//     } catch (error) {
//       console.error('Error reading file:', error);
//     }
//   };
  
  
const handleGenerateReport = () =>
{
  console.log("handleGenerateReport");
  navigate("/report");
}
  
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
    <div className="flex justify-center rounded-xl pt-2 pb-1">
      <div className="bg-white rounded-xl shadow-2xl border border-gray-200 px-6 pb-0 pt-2">
        <div className="flex justify-around w-full mb-1">
          <div className="flex flex-col items-center">
            <h1 className="text-xl font-bold text-violet-500">Patient Name</h1>
            <h2 className="text-md font-bold">{patientDetails?.patientName}</h2>
          </div>
          <div className="flex flex-col items-center">
            <h1 className="text-xl font-bold text-violet-500">
              Patient Number
            </h1>
            <h2 className="text-md font-bold">{patientDetails?.patientNumber}</h2>
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
            <h2 className="text-md font-bold">{currentImage.name}</h2>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="flex -ml-2 mr-2 w-min items-center mb-10 justify-center">
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
