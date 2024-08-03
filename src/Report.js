// import React, { useEffect, useRef } from "react";
// import html2canvas from "html2canvas";
// import { jsPDF } from "jspdf";
// import "./Report.css"; // Make sure to create this CSS file and import it
// import medai from "./med-ai.png"; //
// import { ReactComponent as WhatsappSVG } from "./whatsapp.svg";
// import { ReactComponent as DownloadSVG } from "./download.svg";
// import { ReactComponent as EmailSVG } from "./email.svg";

// const Report = () => {
//   const downloadButtonRef = useRef(null);
//   useEffect(() => {
//     const downloadPDF = () => {
//       const reportContent = document.getElementById("report-content");
//       html2canvas(reportContent).then((canvas) => {
//         const pdf = new jsPDF("p", "pt", "a4");
//         const imgData = canvas.toDataURL("image/png");
//         const imgWidth = 595.28;
//         const pageHeight = 841.89;
//         const imgHeight = (canvas.height * imgWidth) / canvas.width;
//         let heightLeft = imgHeight;
//         let position = 0;

//         pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);

//         if (heightLeft > pageHeight) {
//           heightLeft -= pageHeight;

//           while (heightLeft > 0) {
//             position = heightLeft - imgHeight;
//             pdf.addPage();
//             pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
//             heightLeft -= pageHeight;
//           }
//         }

//         pdf.save("report.pdf");
//       });
//     };

//     const button = downloadButtonRef.current;
//     button.addEventListener("click", downloadPDF);
//     return () => {
//       if (button) {
//         button.removeEventListener("click", downloadPDF);
//       }
//     };
//   }, []);

//   const generateTextReport = () => {
//     // Function to pad strings to a fixed width
//     const padRight = (str, length) => str.padEnd(length);

//     // Define fixed column widths
//     const columnWidths = {
//       test: 24,
//       normalValue: 20,
//       unit: 12,
//       result: 10,
//     };

//     const header =
//   `Department of Hematology`;

//     const patientDetails =
//   `PATIENT NAME: Irha Waqas
//   AGE/GENDER: 3 Yrs / Female
//   MOBILE: 03216862034
//   LOCATION: Lahore: Baghrian Chowk College Road

//   REGISTRATION DATE: 26-Aug-2019 21:00
//   REFERENCE: Standard
//   CONSULTANT: -
//   PATIENT NUMBER: 44010-19-104822832
//   CASE NUMBER: 44010-26-08`;

//     const reportDetails =
//   `REPORTING TIME: 27 August, 2019 - 10:11 AM

//   Blood C/E (Complete, CBC)`;

//     const tableHeader =
//   `${padRight('Test', columnWidths.test)}| ${padRight('Normal Value', columnWidths.normalValue)}| ${padRight('Unit', columnWidths.unit)}| ${padRight('Result', columnWidths.result)}
//   ${'-'.repeat(columnWidths.test + columnWidths.normalValue + columnWidths.unit + columnWidths.result + 3)}`;

//     const tableRows =
//   `${padRight('Hb', columnWidths.test)}| ${padRight('11.5 - 16', columnWidths.normalValue)}| ${padRight('g/dl', columnWidths.unit)}| ${padRight('11.9', columnWidths.result)}
//   ${padRight('Total RBC', columnWidths.test)}| ${padRight('4 - 6', columnWidths.normalValue)}| ${padRight('x10^12/l', columnWidths.unit)}| ${padRight('3.9', columnWidths.result)}
//   ${padRight('HCT', columnWidths.test)}| ${padRight('36 - 46', columnWidths.normalValue)}| ${padRight('%', columnWidths.unit)}| ${padRight('36', columnWidths.result)}
//   ${padRight('MCV', columnWidths.test)}| ${padRight('75 - 95', columnWidths.normalValue)}| ${padRight('fl', columnWidths.unit)}| ${padRight('93', columnWidths.result)}
//   ${padRight('MCH', columnWidths.test)}| ${padRight('26 - 32', columnWidths.normalValue)}| ${padRight('PG', columnWidths.unit)}| ${padRight('31', columnWidths.result)}
//   ${padRight('MCHC', columnWidths.test)}| ${padRight('30 - 35', columnWidths.normalValue)}| ${padRight('g/dl', columnWidths.unit)}| ${padRight('33', columnWidths.result)}
//   ${padRight('Platelet Count', columnWidths.test)}| ${padRight('150 - 400', columnWidths.normalValue)}| ${padRight('x10^9/l', columnWidths.unit)}| ${padRight('125', columnWidths.result)}
//   ${padRight('WBC Count (TLC)', columnWidths.test)}| ${padRight('4 - 11', columnWidths.normalValue)}| ${padRight('x10^9/l', columnWidths.unit)}| ${padRight('6.3', columnWidths.result)}
//   ${padRight('Neutrophils', columnWidths.test)}| ${padRight('40 - 75', columnWidths.normalValue)}| ${padRight('%', columnWidths.unit)}| ${padRight('49', columnWidths.result)}
//   ${padRight('Lymphocytes', columnWidths.test)}| ${padRight('20 - 50', columnWidths.normalValue)}| ${padRight('%', columnWidths.unit)}| ${padRight('43', columnWidths.result)}
//   ${padRight('Monocytes', columnWidths.test)}| ${padRight('02 - 10', columnWidths.normalValue)}| ${padRight('%', columnWidths.unit)}| ${padRight('06', columnWidths.result)}
//   ${padRight('Eosinophils', columnWidths.test)}| ${padRight('01 - 06', columnWidths.normalValue)}| ${padRight('%', columnWidths.unit)}| ${padRight('02', columnWidths.result)}`;

//     const note =
//   `NOTE: Platelet count verified on peripheral smear`;

//     const footer =
//   `03111456789
//   www.chughtailab.com`;

//     return `\`\`\`
//   ${header}

//   ${patientDetails}

//   ${reportDetails}

//   ${tableHeader}
//   ${tableRows}

//   ${note}

//   ${footer}
//   \`\`\``;
//   };

//   const sendViaWhatsApp = async () => {
//     const textReport = generateTextReport();
//     const message = `Here is the report:\n\n${textReport}`;
//     const whatsappURL = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
//     window.open(whatsappURL, '_blank');
//   };
//   const generateTextReports = () => {
//     // Function to pad strings to a fixed width
//     const padRight = (str, length) => str.padEnd(length);
//     const padLeft = (str, length) => str.padStart(length);

//     // Define fixed column widths
//     const columnWidths = {
//       test: 30,
//       normalValue: 20,
//       unit: 12,
//       result: 10,
//     };

//     const header =
//   `DEPARTMENT OF HEMATOLOGY`;

//     const patientDetails =
//   `PATIENT DETAILS:
//   SUMERA AMBREEN
//   AGE/GENDER: 35 YRS / FEMALE
//   MOBILE: 03216862034
//   LOCATION: Lahore: Baghrian Chowk College Road

//   REGISTRATION DATE: 26-Aug-2019 21:00
//   REFERENCE: Standard
//   CONSULTANT: -
//   PATIENT NUMBER: 44010-19-104822832
//   CASE NUMBER: 44010-26-08`;

//     const reportDetails =
//   `BLOOD C/E (COMPLETE, CBC)
//   REPORTING TIME: 27 August, 2019 - 10:11 AM`;

//     const tableHeader =
//   `${padRight('Test', columnWidths.test)}| ${padRight('Normal Value', columnWidths.normalValue)}| ${padRight('Unit', columnWidths.unit)}| ${padRight('Result', columnWidths.result)}
//   ${'-'.repeat(columnWidths.test + columnWidths.normalValue + columnWidths.unit + columnWidths.result + 3)}`;

//     const tableRows =
//   `${padRight('Hb', columnWidths.test)}| ${padRight('11.5 - 16', columnWidths.normalValue)}| ${padRight('g/dl', columnWidths.unit)}| ${padRight('11.9', columnWidths.result)}
//   ${padRight('Total RBC', columnWidths.test)}| ${padRight('4 - 6', columnWidths.normalValue)}| ${padRight('x10^12/l', columnWidths.unit)}| ${padRight('3.9', columnWidths.result)}
//   ${padRight('HCT', columnWidths.test)}| ${padRight('36 - 46', columnWidths.normalValue)}| ${padRight('%', columnWidths.unit)}| ${padRight('36', columnWidths.result)}
//   ${padRight('MCV', columnWidths.test)}| ${padRight('75 - 95', columnWidths.normalValue)}| ${padRight('fl', columnWidths.unit)}| ${padRight('93', columnWidths.result)}
//   ${padRight('MCH', columnWidths.test)}| ${padRight('26 - 32', columnWidths.normalValue)}| ${padRight('PG', columnWidths.unit)}| ${padRight('31', columnWidths.result)}
//   ${padRight('MCHC', columnWidths.test)}| ${padRight('30 - 35', columnWidths.normalValue)}| ${padRight('g/dl', columnWidths.unit)}| ${padRight('33', columnWidths.result)}
//   ${padRight('Platelet Count', columnWidths.test)}| ${padRight('150 - 400', columnWidths.normalValue)}| ${padRight('x10^9/l', columnWidths.unit)}| ${padRight('125', columnWidths.result)}
//   ${padRight('WBC Count (TLC)', columnWidths.test)}| ${padRight('4 - 11', columnWidths.normalValue)}| ${padRight('x10^9/l', columnWidths.unit)}| ${padRight('6.3', columnWidths.result)}
//   ${padRight('Neutrophils', columnWidths.test)}| ${padRight('40 - 75', columnWidths.normalValue)}| ${padRight('%', columnWidths.unit)}| ${padRight('49', columnWidths.result)}
//   ${padRight('Lymphocytes', columnWidths.test)}| ${padRight('20 - 50', columnWidths.normalValue)}| ${padRight('%', columnWidths.unit)}| ${padRight('43', columnWidths.result)}
//   ${padRight('Monocytes', columnWidths.test)}| ${padRight('02 - 10', columnWidths.normalValue)}| ${padRight('%', columnWidths.unit)}| ${padRight('06', columnWidths.result)}
//   ${padRight('Eosinophils', columnWidths.test)}| ${padRight('01 - 06', columnWidths.normalValue)}| ${padRight('%', columnWidths.unit)}| ${padRight('02', columnWidths.result)}`;

//     const note =
//   `NOTE: PLATELET COUNT VERIFIED ON PERIPHERAL SMEAR`;

//     const footer =
//   `03111456789
//   www.chughtailab.com`;

//     return `
//   ${header}

//   ${patientDetails}

//   ${reportDetails}

//   ${tableHeader}
//   ${tableRows}

//   ${note}

//   ${footer}
//     `;
//   };

//   const sendViaEmail = async () => {
//     const textReport = generateTextReports();
//     const emailSubject = "Patient Blood Report";
//     const emailBody = `Here is the report:\n\n${textReport}`;
//     window.location.href = `mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
//   };

//   return (
//     <>
//       <div className="report-container" id="report-content">
//         <div className="header flex flex-col items-center">
//           <img src={medai} style={{ justifySelf: "center" }} alt="Lab Logo" />
//           <h1 className="text-2xl font-bold">Department of Hematology</h1>
//         </div>
//         <div className="patient-details">
//           <div>
//             <p>
//               <strong>Patient Details:</strong> SUMERA AMBREEN
//             </p>
//             <p>
//               <strong>Age/Gender:</strong> 35 Yrs / Female
//             </p>
//             <p>
//               <strong>Mobile:</strong> 03216862034
//             </p>
//             <p>
//               <strong>Location:</strong> Lahore: Baghrian Chowk College Road
//             </p>
//           </div>
//           <div>
//             <p>
//               <strong>Registration Date:</strong> 26-Aug-2019 21:00
//             </p>
//             <p>
//               <strong>Reference:</strong> Standard
//             </p>
//             <p>
//               <strong>Consultant:</strong> -
//             </p>
//             <p>
//               <strong>Patient Number:</strong> 44010-19-104822832
//             </p>
//             <p>
//               <strong>Case Number:</strong> 44010-26-08
//             </p>
//           </div>
//         </div>
//         <div className="report-details">
//           <p>
//             <strong>Blood C/E (Complete, CBC)</strong>
//           </p>
//           <p>Reporting Time: 27 August, 2019 - 10:11 AM</p>
//         </div>
//         <table className="test-table">
//           <thead>
//             <tr>
//               <th>Test</th>
//               <th>Normal Value</th>
//               <th>Unit</th>
//               <th>Result</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>Hb</td>
//               <td>11.5 - 16</td>
//               <td>g/dl</td>
//               <td>11.9</td>
//             </tr>
//             <tr>
//               <td>Total RBC</td>
//               <td>4 - 6</td>
//               <td>x10^12/l</td>
//               <td style={{ color: "red" }}>3.9</td>
//             </tr>
//             <tr>
//               <td>HCT</td>
//               <td>36 - 46</td>
//               <td>%</td>
//               <td>36</td>
//             </tr>
//             <tr>
//               <td>MCV</td>
//               <td>75 - 95</td>
//               <td>fl</td>
//               <td>93</td>
//             </tr>
//             <tr>
//               <td>MCH</td>
//               <td>26 - 32</td>
//               <td>PG</td>
//               <td>31</td>
//             </tr>
//             <tr>
//               <td>MCHC</td>
//               <td>30 - 35</td>
//               <td>g/dl</td>
//               <td>33</td>
//             </tr>
//             <tr>
//               <td>Platelet Count</td>
//               <td>150 - 400</td>
//               <td>x10^9/l</td>
//               <td style={{ color: "red" }}>125</td>
//             </tr>
//             <tr>
//               <td>WBC Count (TLC)</td>
//               <td>4 - 11</td>
//               <td>x10^9/l</td>
//               <td>6.3</td>
//             </tr>
//             <tr>
//               <td>Neutrophils</td>
//               <td>40 - 75</td>
//               <td>%</td>
//               <td>49</td>
//             </tr>
//             <tr>
//               <td>Lymphocytes</td>
//               <td>20 - 50</td>
//               <td>%</td>
//               <td>43</td>
//             </tr>
//             <tr>
//               <td>Monocytes</td>
//               <td>02 - 10</td>
//               <td>%</td>
//               <td>06</td>
//             </tr>
//             <tr>
//               <td>Eosinophils</td>
//               <td>01 - 06</td>
//               <td>%</td>
//               <td>02</td>
//             </tr>
//           </tbody>
//         </table>
//         <p className="note">
//           NOTE: Platelet count verified on peripheral smear
//         </p>
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             padding: "10px",
//             backgroundColor: "#f1f1f1",
//             borderBottomRightRadius: "10px",
//             borderBottomLeftRadius: "10px",
//             fontWeight: "bold",
//             marginTop: "130px",
//             marginLeft: "-20px",
//             marginRight: "-21px",
//           }}
//         >
//           <p style={{ margin: 0 }}>03111456789</p>
//           <p style={{ margin: 0 }}>www.chughtailab.com</p>
//         </div>
//       </div>
//       <div className="flex justify-center mt-4">
//         <div className="flex space-x-4">
//           <div>
//             <button
//               onClick={sendViaEmail}
//               style={{
//                 color: "white",
//                 padding: "10px 20px",
//                 fontSize: "16px",
//                 cursor: "pointer",
//                 borderRadius: "5px",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 margin: "20px auto",
//                 fontWeight: "bold",
//                 width: "245px",
//                 border: "none", // Ensure no border conflicts
//                 background: "#0f52ba", // Explicitly set background color
//               }}
//             >
//               <EmailSVG style={{ height: "20px", marginRight: "10px" }} />
//               Email PDF
//             </button>
//             <div className="spacing h-2"></div>
//           </div>
//           <div>
//             <button
//               onClick={sendViaWhatsApp}
//               style={{
//                 color: "white",
//                 padding: "10px 20px",
//                 fontSize: "16px",
//                 cursor: "pointer",
//                 borderRadius: "5px",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 margin: "20px auto",
//                 fontWeight: "bold",
//                 width: "245px",
//                 border: "none", // Ensure no border conflicts
//                 background: "#128C7E", // Explicitly set background color
//               }}
//             >
//               <WhatsappSVG style={{ height: "20px", marginRight: "10px" }} />
//               Whatsapp PDF
//             </button>
//             <div className="spacing h-2"></div>
//           </div>
//           <div>
//             <button
//               ref={downloadButtonRef}
//               style={{
//                 color: "white",
//                 padding: "10px 20px",
//                 fontSize: "16px",
//                 cursor: "pointer",
//                 borderRadius: "5px",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 margin: "20px auto",
//                 fontWeight: "bold",
//                 width: "245px",
//                 border: "none", // Ensure no border conflicts
//                 background: "#0f52ba", // Explicitly set background color
//               }}
//             >
//               <DownloadSVG style={{ height: "20px", marginRight: "10px" }} />
//               Download PDF
//             </button>
//             <div className="spacing h-2"></div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Report;

// import React, { useRef, useEffect } from "react";
// import { jsPDF } from "jspdf";

// const Report = () => {
//   const downloadButtonRef = useRef(null);

//   useEffect(() => {
//     const downloadPDF = () => {
//       const pdf = new jsPDF("p", "pt", "a4");
//       pdf.setFontSize(22);
//       pdf.text("Department of Hematology", 40, 100);
//       pdf.save("report.pdf");
//     };

//     const button = downloadButtonRef.current;
//     button.addEventListener("click", downloadPDF);

//     return () => {
//       if (button) {
//         button.removeEventListener("click", downloadPDF);
//       }
//     };
//   }, []);

//   return (
//     <div className="flex justify-center mt-4">
//       <button
//         ref={downloadButtonRef}
//         style={{
//           color: "white",
//           padding: "10px 20px",
//           fontSize: "16px",
//           cursor: "pointer",
//           borderRadius: "5px",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           margin: "20px auto",
//           fontWeight: "bold",
//           width: "245px",
//           border: "none",
//           background: "#0f52ba",
//         }}
//       >
//         Download PDF
//       </button>
//     </div>
//   );
// };

// export default Report;

// import React, { useEffect, useRef } from "react";
// import html2canvas from "html2canvas";
// import { jsPDF } from "jspdf";
// import "./Report.css"; // Make sure to create this CSS file and import it
// import medai from "./med-ai.png"; // Import the logo

// const Report = () => {
//   const downloadButtonRef = useRef(null);

//   useEffect(() => {
//     const downloadPDF = () => {
//       const reportContent = document.getElementById("report-content");
//       html2canvas(reportContent).then((canvas) => {
//         const pdf = new jsPDF("p", "pt", "a4");
//         const imgData = canvas.toDataURL("image/png");
//         const imgWidth = 595.28; // A4 width in points
//         const pageHeight = 841.89; // A4 height in points
//         const imgHeight = (canvas.height * imgWidth) / canvas.width;
//         let heightLeft = imgHeight;
//         let position = 0;

//         pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);

//         // Add new pages if necessary
//         if (heightLeft > pageHeight) {
//           heightLeft -= pageHeight;

//           while (heightLeft > 0) {
//             position = heightLeft - imgHeight;
//             pdf.addPage();
//             pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
//             heightLeft -= pageHeight;
//           }
//         }

//         pdf.save("report.pdf");
//       });
//     };

//     const button = downloadButtonRef.current;
//     button.addEventListener("click", downloadPDF);
//     return () => {
//       if (button) {
//         button.removeEventListener("click", downloadPDF);
//       }
//     };
//   }, []);

//   return (
//     <>
//       <div className="report-container" id="report-content">
//         <div className="header flex flex-col items-center">
//           <img src={medai} alt="Lab Logo" style={{ width: "100px", height: "auto" }} /> {/* Adjust the width here */}
//           <h1 className="text-2xl font-bold">Department of Hematology</h1>
//         </div>
//       </div>
//       <div className="flex justify-center mt-4">
//         <button
//           ref={downloadButtonRef}
//           style={{
//             color: "white",
//             padding: "10px 20px",
//             fontSize: "16px",
//             cursor: "pointer",
//             borderRadius: "5px",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             margin: "20px auto",
//             fontWeight: "bold",
//             width: "245px",
//             border: "none", // Ensure no border conflicts
//             background: "#0f52ba", // Explicitly set background color
//           }}
//         >
//           <span style={{ height: "20px", marginRight: "10px" }}>&#x1F4BE;</span> {/* Placeholder for download icon */}
//           Download PDF
//         </button>
//       </div>
//     </>
//   );
// };

// export default Report;

// import React, { useRef, useEffect } from 'react';
// import { jsPDF } from 'jspdf';
// import 'jspdf-autotable';
// import medaiLogo from './med-ai.png'; // Path to your logo image

// const Report = () => {
//   const downloadButtonRef = useRef(null);

//   useEffect(() => {
//     const downloadPDF = () => {
//       const pdf = new jsPDF('p', 'pt', 'a4');

//       // Add the logo and header
//       pdf.addImage(medaiLogo, 'PNG', 20, 15, 50, 50);
//       pdf.setFontSize(12);
//       pdf.text('Medical Artificial Intelligence (MEDAI) Group', 80, 50);
//       pdf.text('AI-Assisted White Blood Cell Counting & Characteristics: A Comprehensive Report', 20, 80);

//       // Add patient ID and report time
//       pdf.setFontSize(10);
//       pdf.text(`patient_id=123123  Report Time: 2024-07-14 19:10:37`, 20, 70);

//       // White Blood Cell Types Table
//       pdf.autoTable({
//         startY: 90,
//         theme: 'grid',
//         headStyles: { fillColor: [221, 221, 221] }, // Light gray
//         styles: { fontSize: 9 },
//         head: [['WBC Type', 'Lymphoblast', 'Neutrophil', 'Myeloblast', 'Metamyelocyte']],
//         body: [
//           ['Count', '66', '4', '2', '1'],
//           ['Percentage', '90.4', '5.5', '2.7', '1.4'],
//         ],
//       });

//       // White Blood Cell Characteristics Table
//       pdf.autoTable({
//         theme: 'grid',
//         headStyles: { fillColor: [221, 221, 221] }, // Light gray
//         styles: { fontSize: 9 },
//         head: [['Nuclear Chromatin', 'count', '%', 'Nuclear Shape', 'count', '%', 'Nucleus', 'count', '%']],
//         body: [
//           ['Open', '86.0', '100.0', 'Irregular', '73', '84.9', 'Inconspicuous', '51', '59.3'],
//           ['-', '-', '-', 'Regular', '13', '15.1', 'Prominent', '35', '40.7'],
//           ['Cytoplasm', 'count', '%', 'Cytoplasmic Basophilia', 'count', '%', 'Cytoplasmic Vacuoles', 'count', '%'],
//           ['Scanty', '64', '74.4', 'Slight', '55', '64.0', 'Absent', '86.0', '100.0'],
//           ['Abundant', '22', '25.6', 'Moderate', '31', '36.0', '-', '-', '-'],
//         ],
//       });

//       // Report Summary
//       pdf.setFontSize(11);
//       pdf.text('Report Summary', 20, pdf.lastAutoTable.finalY + 10);
//       pdf.setFontSize(10);
//       pdf.text('Cells that are seen are Lymphoblast cells series. These WBC\'s are medium-to-large in size, open chromatin, and irregular shaped nuclei. The nucleoli are inconspicuous, and the cytoplasm is scanty with slight basophilia. Cytoplasmic vacuoles are absent.', 20, pdf.lastAutoTable.finalY + 25);

//       pdf.save('report.pdf');
//     };

//     const button = downloadButtonRef.current;
//     button.addEventListener('click', downloadPDF);

//     return () => {
//       if (button) {
//         button.removeEventListener('click', downloadPDF);
//       }
//     };
//   }, []);

//   return (
//     <div className="flex justify-center mt-4">
//       <button
//         ref={downloadButtonRef}
//         style={{
//           color: 'white',
//           padding: '10px 20px',
//           fontSize: '16px',
//           cursor: 'pointer',
//           borderRadius: '5px',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           margin: '20px auto',
//           fontWeight: 'bold',
//           width: '245px',
//           border: 'none',
//           background: '#0f52ba',
//         }}
//       >
//         Download PDF
//       </button>
//     </div>
//   );
// };

// export default Report;

// import React, { useRef, useEffect } from 'react';
// import html2canvas from 'html2canvas';
// import { jsPDF } from 'jspdf';
// import 'jspdf-autotable';
// import medaiLogo from './med-ai.png'; // Path to your logo image

// const Report = () => {
//   const downloadButtonRef = useRef(null);

//   useEffect(() => {
//     const downloadPDF = () => {
//       const reportContent = document.getElementById('report-content');
//       html2canvas(reportContent).then((canvas) => {
//         const pdf = new jsPDF('p', 'pt', 'a4');
//         const imgData = canvas.toDataURL('image/png');
//         const imgWidth = 595.28;
//         const pageHeight = 841.89;
//         const imgHeight = (canvas.height * imgWidth) / canvas.width;
//         let heightLeft = imgHeight;
//         let position = 0;

//         pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);

//         if (heightLeft > pageHeight) {
//           heightLeft -= pageHeight;
//           while (heightLeft > 0) {
//             position = heightLeft - imgHeight;
//             pdf.addPage();
//             pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
//             heightLeft -= pageHeight;
//           }
//         }

//         pdf.save('report.pdf');
//       });
//     };

//     const button = downloadButtonRef.current;
//     button.addEventListener('click', downloadPDF);

//     return () => {
//       if (button) {
//         button.removeEventListener('click', downloadPDF);
//       }
//     };
//   }, []);

//   return (
//     <>
//       <div className="report-container" id="report-content">
//         <div className="header flex flex-col items-center">
//           <img src={medaiLogo} alt="MEDAI Logo" style={{ width: 50, height: 50 }} />
//           <h2>Medical Artificial Intelligence (MEDAI) Group</h2>
//           <h3>AI-Assisted White Blood Cell Counting & Characteristics: A Comprehensive Report</h3>
//           <p>patient_id=123123  Report Time: 2024-07-14 19:10:37</p>
//         </div>
//         <table className="test-table">
//           <thead>
//             <tr>
//               <th>WBC Type</th>
//               <th>Lymphoblast</th>
//               <th>Neutrophil</th>
//               <th>Myeloblast</th>
//               <th>Metamyelocyte</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>Count</td>
//               <td>66</td>
//               <td>4</td>
//               <td>2</td>
//               <td>1</td>
//             </tr>
//             <tr>
//               <td>Percentage</td>
//               <td>90.4</td>
//               <td>5.5</td>
//               <td>2.7</td>
//               <td>1.4</td>
//             </tr>
//           </tbody>
//         </table>
//         <table className="test-table">
//           <thead>
//             <tr>
//               <th>Nuclear Chromatin</th>
//               <th>count</th>
//               <th>%</th>
//               <th>Nuclear Shape</th>
//               <th>count</th>
//               <th>%</th>
//               <th>Nucleus</th>
//               <th>count</th>
//               <th>%</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>Open</td>
//               <td>86.0</td>
//               <td>100.0</td>
//               <td>Irregular</td>
//               <td>73</td>
//               <td>84.9</td>
//               <td>Inconspicuous</td>
//               <td>51</td>
//               <td>59.3</td>
//             </tr>
//             <tr>
//               <td>-</td>
//               <td>-</td>
//               <td>-</td>
//               <td>Regular</td>
//               <td>13</td>
//               <td>15.1</td>
//               <td>Prominent</td>
//               <td>35</td>
//               <td>40.7</td>
//             </tr>
//             <tr>
//               <td>Cytoplasm</td>
//               <td>count</td>
//               <td>%</td>
//               <td>Cytoplasmic Basophilia</td>
//               <td>count</td>
//               <td>%</td>
//               <td>Cytoplasmic Vacuoles</td>
//               <td>count</td>
//               <td>%</td>
//             </tr>
//             <tr>
//               <td>Scanty</td>
//               <td>64</td>
//               <td>74.4</td>
//               <td>Slight</td>
//               <td>55</td>
//               <td>64.0</td>
//               <td>Absent</td>
//               <td>86.0</td>
//               <td>100.0</td>
//             </tr>
//             <tr>
//               <td>Abundant</td>
//               <td>22</td>
//               <td>25.6</td>
//               <td>Moderate</td>
//               <td>31</td>
//               <td>36.0</td>
//               <td>-</td>
//               <td>-</td>
//               <td>-</td>
//             </tr>
//           </tbody>
//         </table>
//         <div className="report-summary">
//           <h4>Report Summary</h4>
//           <p>Cells that are seen are Lymphoblast cells series. These WBC's are medium-to-large in size, open chromatin, and irregular shaped nuclei. The nucleoli are inconspicuous, and the cytoplasm is scanty with slight basophilia. Cytoplasmic vacuoles are absent.</p>
//         </div>
//       </div>
//       <div className="flex justify-center mt-4">
//         <button
//           ref={downloadButtonRef}
//           style={{
//             color: 'white',
//             padding: '10px 20px',
//             fontSize: '16px',
//             cursor: 'pointer',
//             borderRadius: '5px',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             margin: '20px auto',
//             fontWeight: 'bold',
//             width: '245px',
//             border: 'none',
//             background: '#0f52ba',
//           }}
//         >
//           Download PDF
//         </button>
//       </div>
//     </>
//   );
// };

// export default Report;

import React, { useEffect, useRef } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import "./Report.css";
import medaiLogo from "./med-ai.png";
import { ReactComponent as WhatsappSVG } from "./whatsapp.svg";
import { ReactComponent as DownloadSVG } from "./download.svg";
import { ReactComponent as EmailSVG } from "./email.svg";

const Report = ({patientDetails}) => {
  const downloadButtonRef = useRef(null);

  useEffect(() => {
    const downloadPDF = () => {
      const reportContent = document.getElementById("report-content");
      html2canvas(reportContent).then((canvas) => {
        const pdf = new jsPDF("p", "pt", "a4");
        const imgData = canvas.toDataURL("image/png");
        const imgWidth = 595.28;
        const pageHeight = 841.89;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);

        if (heightLeft > pageHeight) {
          heightLeft -= pageHeight;

          while (heightLeft > 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
          }
        }

        pdf.save("report.pdf");
      });
    };

    const button = downloadButtonRef.current;
    button.addEventListener("click", downloadPDF);
    return () => {
      if (button) {
        button.removeEventListener("click", downloadPDF);
      }
    };
  }, []);

  const getCurrentTime = () => {
    var currentdate = new Date();
    var datetime =
      currentdate.getDay() +
      "/" +
      currentdate.getMonth() +
      "/" +
      currentdate.getFullYear() +
      "  " +
      currentdate.getHours() +
      ":" +
      currentdate.getMinutes() +
      ":" +
      currentdate.getSeconds();
    return datetime;
  };

  const generateTextReport = () => {
    // Function to pad strings to a fixed width
    const padRight = (str, length) => str.padEnd(length);

    // Define fixed column widths
    const columnWidths = {
      test: 24,
      normalValue: 20,
      unit: 12,
      result: 10,
    };

    const header = "Department of Hematology";

    const patientDetails = `
    PATIENT NAME: Irha Waqas
    AGE/GENDER: 3 Yrs / Female
    MOBILE: 03216862034
    LOCATION: Lahore: Baghrian Chowk College Road

    REGISTRATION DATE: 26-Aug-2019 21:00
    REFERENCE: Standard
    CONSULTANT: -
    PATIENT NUMBER: 44010-19-104822832
    CASE NUMBER: 44010-26-08`;

    const reportDetails = `
    REPORTING TIME: 27 August, 2019 - 10:11 AM

    Blood C/E (Complete, CBC)`;

    const tableHeader = `
    ${padRight("Test", columnWidths.test)}| ${padRight(
      "Normal Value",
      columnWidths.normalValue
    )}| ${padRight("Unit", columnWidths.unit)}| ${padRight(
      "Result",
      columnWidths.result
    )}
    ${"-".repeat(
      columnWidths.test +
        columnWidths.normalValue +
        columnWidths.unit +
        columnWidths.result +
        3
    )}`;

    const tableRows = `
    ${padRight("Hb", columnWidths.test)}| ${padRight(
      "11.5 - 16",
      columnWidths.normalValue
    )}| ${padRight("g/dl", columnWidths.unit)}| ${padRight(
      "11.9",
      columnWidths.result
    )}
    ${padRight("Total RBC", columnWidths.test)}| ${padRight(
      "4 - 6",
      columnWidths.normalValue
    )}| ${padRight("x10^12/l", columnWidths.unit)}| ${padRight(
      "3.9",
      columnWidths.result
    )}
    ${padRight("HCT", columnWidths.test)}| ${padRight(
      "36 - 46",
      columnWidths.normalValue
    )}| ${padRight("%", columnWidths.unit)}| ${padRight(
      "36",
      columnWidths.result
    )}
    ${padRight("MCV", columnWidths.test)}| ${padRight(
      "75 - 95",
      columnWidths.normalValue
    )}| ${padRight("fl", columnWidths.unit)}| ${padRight(
      "93",
      columnWidths.result
    )}
    ${padRight("MCH", columnWidths.test)}| ${padRight(
      "26 - 32",
      columnWidths.normalValue
    )}| ${padRight("PG", columnWidths.unit)}| ${padRight(
      "31",
      columnWidths.result
    )}
    ${padRight("MCHC", columnWidths.test)}| ${padRight(
      "30 - 35",
      columnWidths.normalValue
    )}| ${padRight("g/dl", columnWidths.unit)}| ${padRight(
      "33",
      columnWidths.result
    )}
    ${padRight("Platelet Count", columnWidths.test)}| ${padRight(
      "150 - 400",
      columnWidths.normalValue
    )}| ${padRight("x10^9/l", columnWidths.unit)}| ${padRight(
      "125",
      columnWidths.result
    )}
    ${padRight("WBC Count (TLC)", columnWidths.test)}| ${padRight(
      "4 - 11",
      columnWidths.normalValue
    )}| ${padRight("x10^9/l", columnWidths.unit)}| ${padRight(
      "6.3",
      columnWidths.result
    )}
    ${padRight("Neutrophils", columnWidths.test)}| ${padRight(
      "40 - 75",
      columnWidths.normalValue
    )}| ${padRight("%", columnWidths.unit)}| ${padRight(
      "49",
      columnWidths.result
    )}
    ${padRight("Lymphocytes", columnWidths.test)}| ${padRight(
      "20 - 50",
      columnWidths.normalValue
    )}| ${padRight("%", columnWidths.unit)}| ${padRight(
      "43",
      columnWidths.result
    )}
    ${padRight("Monocytes", columnWidths.test)}| ${padRight(
      "02 - 10",
      columnWidths.normalValue
    )}| ${padRight("%", columnWidths.unit)}| ${padRight(
      "06",
      columnWidths.result
    )}
    ${padRight("Eosinophils", columnWidths.test)}| ${padRight(
      "01 - 06",
      columnWidths.normalValue
    )}| ${padRight("%", columnWidths.unit)}| ${padRight(
      "02",
      columnWidths.result
    )}`;

    const note = "NOTE: Platelet count verified on peripheral smear";

    const footer = `
    03111456789
    www.chughtailab.com`;

    return `\`\`\`
    ${header}

    ${patientDetails}

    ${reportDetails}

    ${tableHeader}
    ${tableRows}

    ${note}

    ${footer}
    \`\`\``;
  };

  const sendViaWhatsApp = async () => {
    const textReport = generateTextReport();
    const message = `Here is the report:\n\n${textReport}`;
    const whatsappURL = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappURL, "_blank");
  };

  const generateTextReports = () => {
    // Function to pad strings to a fixed width
    const padRight = (str, length) => str.padEnd(length);
    const padLeft = (str, length) => str.padStart(length);

    // Define fixed column widths
    const columnWidths = {
      test: 30,
      normalValue: 20,
      unit: 12,
      result: 10,
    };

    const header = "DEPARTMENT OF HEMATOLOGY";

    const patientDetails = `
    PATIENT DETAILS:
    SUMERA AMBREEN
    AGE/GENDER: 35 YRS / FEMALE
    MOBILE: 03216862034
    LOCATION: Lahore: Baghrian Chowk College Road

    REGISTRATION DATE: 26-Aug-2019 21:00
    REFERENCE: Standard
    CONSULTANT: -
    PATIENT NUMBER: 44010-19-104822832
    CASE NUMBER: 44010-26-08`;

    const reportDetails = `
    BLOOD C/E (COMPLETE, CBC)
    REPORTING TIME: 27 August, 2019 - 10:11 AM`;

    const tableHeader = `
    ${padRight("Test", columnWidths.test)}| ${padRight(
      "Normal Value",
      columnWidths.normalValue
    )}| ${padRight("Unit", columnWidths.unit)}| ${padRight(
      "Result",
      columnWidths.result
    )}
    ${"-".repeat(
      columnWidths.test +
        columnWidths.normalValue +
        columnWidths.unit +
        columnWidths.result +
        3
    )}`;

    const tableRows = `
    ${padRight("Hb", columnWidths.test)}| ${padRight(
      "11.5 - 16",
      columnWidths.normalValue
    )}| ${padRight("g/dl", columnWidths.unit)}| ${padRight(
      "11.9",
      columnWidths.result
    )}
    ${padRight("Total RBC", columnWidths.test)}| ${padRight(
      "4 - 6",
      columnWidths.normalValue
    )}| ${padRight("x10^12/l", columnWidths.unit)}| ${padRight(
      "3.9",
      columnWidths.result
    )}
    ${padRight("HCT", columnWidths.test)}| ${padRight(
      "36 - 46",
      columnWidths.normalValue
    )}| ${padRight("%", columnWidths.unit)}| ${padRight(
      "36",
      columnWidths.result
    )}
    ${padRight("MCV", columnWidths.test)}| ${padRight(
      "75 - 95",
      columnWidths.normalValue
    )}| ${padRight("fl", columnWidths.unit)}| ${padRight(
      "93",
      columnWidths.result
    )}
    ${padRight("MCH", columnWidths.test)}| ${padRight(
      "26 - 32",
      columnWidths.normalValue
    )}| ${padRight("PG", columnWidths.unit)}| ${padRight(
      "31",
      columnWidths.result
    )}
    ${padRight("MCHC", columnWidths.test)}| ${padRight(
      "30 - 35",
      columnWidths.normalValue
    )}| ${padRight("g/dl", columnWidths.unit)}| ${padRight(
      "33",
      columnWidths.result
    )}
    ${padRight("Platelet Count", columnWidths.test)}| ${padRight(
      "150 - 400",
      columnWidths.normalValue
    )}| ${padRight("x10^9/l", columnWidths.unit)}| ${padRight(
      "125",
      columnWidths.result
    )}
    ${padRight("WBC Count (TLC)", columnWidths.test)}| ${padRight(
      "4 - 11",
      columnWidths.normalValue
    )}| ${padRight("x10^9/l", columnWidths.unit)}| ${padRight(
      "6.3",
      columnWidths.result
    )}
    ${padRight("Neutrophils", columnWidths.test)}| ${padRight(
      "40 - 75",
      columnWidths.normalValue
    )}| ${padRight("%", columnWidths.unit)}| ${padRight(
      "49",
      columnWidths.result
    )}
    ${padRight("Lymphocytes", columnWidths.test)}| ${padRight(
      "20 - 50",
      columnWidths.normalValue
    )}| ${padRight("%", columnWidths.unit)}| ${padRight(
      "43",
      columnWidths.result
    )}
    ${padRight("Monocytes", columnWidths.test)}| ${padRight(
      "02 - 10",
      columnWidths.normalValue
    )}| ${padRight("%", columnWidths.unit)}| ${padRight(
      "06",
      columnWidths.result
    )}
    ${padRight("Eosinophils", columnWidths.test)}| ${padRight(
      "01 - 06",
      columnWidths.normalValue
    )}| ${padRight("%", columnWidths.unit)}| ${padRight(
      "02",
      columnWidths.result
    )}`;

    const note = "NOTE: Platelet count verified on peripheral smear";

    const footer = `
    03111456789
    www.chughtailab.com`;

    return `\`\`\`
    ${header}

    ${patientDetails}

    ${reportDetails}

    ${tableHeader}
    ${tableRows}

    ${note}

    ${footer}
    \`\`\``;
  };

  const sendViaEmails = async () => {
    const textReport = generateTextReports();
    const subject = "Report";
    const body = `Here is the report:\n\n${textReport}`;
    const mailtoLink = `mailto:?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink, "_blank");
  };

  return (
    <>
      <div className="report-container rounded-md" id="report-content">
        <div className="header flex flex-col items-center">
          <img
            src={medaiLogo}
            alt="MEDAI Logo"
            style={{ width: 100, height: 100 }}
          />
          <div className="header flex flex-col items-center">
            <h1 className="text-2xl font-bold">
              Medical Artificial Intelligence (MEDAI) Group
            </h1>
            <h1 className="text-sm mt-2 font-bold">
              AI-Assisted White Blood Cell Counting & Characteristics: A
              Comprehensive Report
            </h1>
          </div>
        </div>
        <div className="patient-details">
          <div>
            <p>
              <strong>Patient Details:</strong> {patientDetails.patientName}
            </p>
            <p>
              <strong>Age:</strong> XX Yrs
            </p>
            <p>
              <strong>Gender:</strong> XXXXXX
            </p>
            <p>
              <strong>Mobile:</strong> 03XXXXXXXXX
            </p>
            <p>
              <strong>Location:</strong> Lahore
            </p>
          </div>
          <div>
            <p>
              <strong>Registration Date:</strong> {getCurrentTime()}
            </p>
            <p>
              <strong>Reference:</strong> Standard
            </p>
            <p>
              <strong>Doctor:</strong> {patientDetails.doctorName}
            </p>
            <p>
              <strong>Patient Number:</strong> {patientDetails.patientNumber}
            </p>
            <p>
              <strong>Case Number:</strong> {patientDetails.caseNumber}
            </p>
          </div>
        </div>
        <table className="test-table">
          <thead>
            <tr>
              <th>WBC Type</th>
              <th>Lymphoblast</th>
              <th>Neutrophil</th>
              <th>Myeloblast</th>
              <th>Metamyelocyte</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Count</td>
              <td>66</td>
              <td>4</td>
              <td>2</td>
              <td>1</td>
            </tr>
            <tr>
              <td>Percentage</td>
              <td>90.4</td>
              <td>5.5</td>
              <td>2.7</td>
              <td>1.4</td>
            </tr>
          </tbody>
        </table>
        <table className="test-table">
          <thead>
            <tr>
              <th>Nuclear Chromatin</th>
              <th>count</th>
              <th>%</th>
              <th>Nuclear Shape</th>
              <th>count</th>
              <th>%</th>
              <th>Nucleus</th>
              <th>count</th>
              <th>%</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Open</td>
              <td>86.0</td>
              <td>100.0</td>
              <td>Irregular</td>
              <td>73</td>
              <td>84.9</td>
              <td>Inconspicuous</td>
              <td>51</td>
              <td>59.3</td>
            </tr>
            <tr>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>Regular</td>
              <td>13</td>
              <td>15.1</td>
              <td>Prominent</td>
              <td>35</td>
              <td>40.7</td>
            </tr>

            <tr>
              <td>Cytoplasm</td>
              <td>count</td>
              <td>%</td>
              <td>Cytoplasmic Basophilia</td>
              <td>count</td>
              <td>%</td>
              <td>Cytoplasmic Vacuoles</td>
              <td>count</td>
              <td>%</td>
            </tr>
            <tr>
              <td>Scanty</td>
              <td>64</td>
              <td>74.4</td>
              <td>Slight</td>
              <td>55</td>
              <td>64.0</td>
              <td>Absent</td>
              <td>86.0</td>
              <td>100.0</td>
            </tr>
            <tr>
              <td>Abundant</td>
              <td>22</td>
              <td>25.6</td>
              <td>Moderate</td>
              <td>31</td>
              <td>36.0</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
        <div className="report-summary">
          <h4>Report Summary</h4>
          <p>
            Cells that are seen are <strong>Lymphoblast</strong> cells series.
            These WBC's are medium-to-large in size, <strong>open</strong>{" "}
            chromatin, and <strong>irregular</strong> shaped nuclei. The
            nucleoli are <strong>inconspicuous</strong>, and the cytoplasm is{" "}
            <strong>scanty </strong>
            with <strong>slight</strong> basophilia. Cytoplasmic vacuoles are{" "}
            <strong>absent</strong>.
          </p>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <button
          ref={downloadButtonRef}
          style={{
            color: "white",
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            borderRadius: "5px",
            display: "inline-block",
            marginRight: "5px",
            backgroundColor: "rgb(66,133,244)",
          }}
        >
          <DownloadSVG width={24} height={24} />
        </button>
        <button
          onClick={sendViaEmails}
          style={{
            color: "white",
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            borderRadius: "5px",
            display: "inline-block",
            marginRight: "5px",
            backgroundColor: "rgb(233,30,99)",
          }}
        >
          <EmailSVG width={24} height={24} />
        </button>
        <button
          onClick={sendViaWhatsApp}
          style={{
            color: "white",
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            borderRadius: "5px",
            display: "inline-block",
            marginRight: "5px",
            backgroundColor: "rgb(37,211,102)",
          }}
        >
          <WhatsappSVG width={24} height={24} />
        </button>
      </div>
    </>
  );
};

export default Report;
