import React, { useEffect, useState, useRef } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import "./Report.css";
import medaiLogo from "./med-ai.png";
import { ReactComponent as WhatsappSVG } from "./whatsapp.svg";
import { ReactComponent as DownloadSVG } from "./download.svg";
import { ReactComponent as EmailSVG } from "./email.svg";
import image_0 from './backend/results/image_0.png'
import image_1 from './backend/results/image_1.png'
import image_2 from './backend/results/image_2.png'
import image_3 from './backend/results/image_3.png'
import image_4 from './backend/results/image_4.png'
import axios from "axios";

const images_diff = [ image_0, image_1, image_2, image_3, image_4
];

const generateReportData = (data) => {
  const mapping = {
    "Nuclear Chromatin": { 0: "Open", 1: "Coarse" },
    "Nuclear Shape": { 0: "Regular", 1: "Irregular" },
    Nucleus: { 0: "Inconspicuous", 1: "Prominent" },
    Cytoplasm: { 0: "Scanty", 1: "Abundant" },
    "Cytoplasmic Basophilia": { 0: "Slight", 1: "Moderate" },
    "Cytoplasmic Vacuoles": { 0: "Absent", 1: "Prominent" },
  };

  // Filter data
  data = data.filter((row) => row.Prediction !== "None");

  // Apply mappings
  const mappedData = data.map((row) => {
    let mappedRow = { ...row };
    for (let key of Object.keys(mapping)) {
      if (row[key] in mapping[key]) {
        mappedRow[key] = mapping[key][row[key]];
      }
    }
    return mappedRow;
  });

  // Calculate counts and percentages
  const counts = {};
  for (let key of Object.keys(mapping)) {
    counts[key] = mappedData.reduce((acc, row) => {
      acc[row[key]] = (acc[row[key]] || 0) + 1;
      return acc;
    }, {});
  }
  const predictionCounts = mappedData.reduce((acc, row) => {
    acc[row.Prediction] = (acc[row.Prediction] || 0) + 1;
    return acc;
  }, {});

  const totalSamples = mappedData.length;
  const predictionPercentages = Object.keys(predictionCounts).map((key) => ({
    type: key,
    count: predictionCounts[key],
    percentage: ((predictionCounts[key] / totalSamples) * 100).toFixed(1),
  }));
  console.log(
    "mappedData: ",
    mappedData,
    "\ncounts: ",
    counts,
    "\npredictionPercentages: ",
    predictionPercentages,
    "\ntotalSamples",
    totalSamples
  );

  return { mappedData, counts, predictionPercentages, totalSamples };
};

const downloadPDF = async () => {
  const pdf = await generatePDF();
  pdf.save("report.pdf");
};

const generatePDF = async () => {
  const reportContent = document.getElementById("report-content");
  const canvas = await html2canvas(reportContent);
  const pdf = new jsPDF("p", "pt", "a4");
  const imgData = canvas.toDataURL("image/png");
  const imgWidth = 595.28; // width of A4 in points
  const pageHeight = 841.89; // height of A4 in points
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  let heightLeft = imgHeight;
  let position = 0;

  pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);

  pdf.addPage();

  const imagesPerPage = 8;
  const padding = 1;
  const gridColumns = 2;
  const gridRows = 4;
  const totalHorizontalPadding = padding * (gridColumns + 1);
  const totalVerticalPadding = padding * (gridRows + 1);
  const cellWidth = (imgWidth - totalHorizontalPadding) / gridColumns;
  const cellHeight = (pageHeight - totalVerticalPadding) / gridRows;

  let imageCount = 0;

  const loadImage = (src) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(img);
    });
  };

  for (let i = 0; i < images_diff.length; i++) {
    if (imageCount === imagesPerPage) {
      pdf.addPage();
      imageCount = 0;
    }

    const img = await loadImage(images_diff[i]);
    const aspectRatio = img.width / img.height;
    let imgWidth, imgHeight;

    if (aspectRatio > 1) {
      imgWidth = cellWidth;
      imgHeight = cellWidth / aspectRatio;
    } else {
      imgHeight = cellHeight;
      imgWidth = cellHeight * aspectRatio;
    }

    const x = padding + (imageCount % gridColumns) * (cellWidth + padding) + (cellWidth - imgWidth) / 2;
    const y = padding + Math.floor(imageCount / gridColumns) * (cellHeight + padding) + (cellHeight - imgHeight) / 2;

    pdf.addImage(img, "PNG", x+5, y, imgWidth-10, imgHeight);
    imageCount++;
  }

  return pdf;
};

const uploadPDF = async (filename) => {
  const pdf = await generatePDF();
  const pdfData = pdf.output('datauristring').split(',')[1]; // Get base64 PDF content

  const response = await axios.post('http://localhost:4000/upload-pdf', {
    filename: `${filename}.pdf`,
    content: pdfData
  });

  return response.data.link;
};

const Report = ({ patientDetails, imageFolder, isForward }) => {
  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem("csvData"); // Assume data is stored as a JSON string
    if (storedData) {
      const data = JSON.parse(storedData);
      const generatedReportData = generateReportData(data);
      setReportData(generatedReportData);
    }
  }, []);

  const handleSendWhatsApp = async () => {
    const link = await uploadPDF(`report_${patientDetails.case_number}`);
    console.log("link: ", link)
    const message = `Here is your report: ${link}`;
    console.log("opening whatsapp")
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`);
    console.log("opened whatsapp")
  };

  const handleSendEmail = async () => {
    const link = await uploadPDF(`report_${Date.now()}`);
    const subject = "Your Report";
    const body = `Here is your report: ${link}`;
    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };
  useEffect(() => {
    // const isForward = JSON.parse(localStorage.getItem('isForward'));
    
    if (isForward) {
      const scrollToButtons = () => {
        const buttonsElement = document.getElementById("share-buttons");
        if (buttonsElement) {
          buttonsElement.scrollIntoView({ behavior: "smooth" });
        }
      };

      // Delay the scroll to ensure the content is rendered
      setTimeout(scrollToButtons, 300);
    }
  }, []);

  console.log("reportData: ", reportData);

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

  if (!reportData) {
    return <div>Loading...</div>;
  }

  const { totalSamples } = reportData;

  return !reportData ? (
    <div>Loading...</div>
  ) : (
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
              <th>{reportData.predictionPercentages[0].type}</th>
              <th>{reportData.predictionPercentages[1].type}</th>
              <th>{reportData.predictionPercentages[2].type}</th>
              <th>{reportData.predictionPercentages[3].type}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Count</td>
              <td>{reportData.predictionPercentages[0].count}</td>
              <td>{reportData.predictionPercentages[1].count}</td>
              <td>{reportData.predictionPercentages[2].count}</td>
              <td>{reportData.predictionPercentages[3].count}</td>
            </tr>
            <tr>
              <td>Percentage</td>
              <td>{reportData.predictionPercentages[0].percentage}</td>
              <td>{reportData.predictionPercentages[1].percentage}</td>
              <td>{reportData.predictionPercentages[2].percentage}</td>
              <td>{reportData.predictionPercentages[3].percentage}</td>
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
              <td>{reportData.counts["Nuclear Chromatin"]?.Open || "-"}</td>
              <td>
                {(
                  ((reportData.counts["Nuclear Chromatin"]?.Open || 0) /
                    totalSamples) *
                  100
                ).toFixed(1)}
              </td>
              <td>Irregular</td>
              <td>{reportData.counts["Nuclear Shape"]?.Irregular || "-"}</td>
              <td>
                {(
                  ((reportData.counts["Nuclear Shape"]?.Irregular || 0) /
                    totalSamples) *
                  100
                ).toFixed(1)}
              </td>
              <td>Inconspicuous</td>
              <td>{reportData.counts["Nucleus"]?.Inconspicuous || "-"}</td>
              <td>
                {(
                  ((reportData.counts["Nucleus"]?.Inconspicuous || 0) /
                    totalSamples) *
                  100
                ).toFixed(1)}
              </td>
            </tr>
            <tr>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>Regular</td>
              <td>{reportData.counts["Nuclear Shape"]?.Regular || "-"}</td>
              <td>
                {(
                  ((reportData.counts["Nuclear Shape"]?.Regular || 0) /
                    totalSamples) *
                  100
                ).toFixed(1)}
              </td>
              <td>Prominent</td>
              <td>{reportData.counts["Nucleus"]?.Prominent || "-"}</td>
              <td>
                {(
                  ((reportData.counts["Nucleus"]?.Prominent || 0) /
                    totalSamples) *
                  100
                ).toFixed(1)}
              </td>
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
              <td>{reportData.counts["Cytoplasm"]?.Scanty || "-"}</td>
              <td>
                {(
                  ((reportData.counts["Cytoplasm"]?.Scanty || 0) /
                    totalSamples) *
                  100
                ).toFixed(1)}
              </td>
              <td>Slight</td>
              <td>
                {reportData.counts["Cytoplasmic Basophilia"]?.Slight || "-"}
              </td>
              <td>
                {(
                  ((reportData.counts["Cytoplasmic Basophilia"]?.Slight || 0) /
                    totalSamples) *
                  100
                ).toFixed(1)}
              </td>
              <td>Absent</td>
              <td>
                {reportData.counts["Cytoplasmic Vacuoles"]?.Absent || "-"}
              </td>
              <td>
                {(
                  ((reportData.counts["Cytoplasmic Vacuoles"]?.Absent || 0) /
                    totalSamples) *
                  100
                ).toFixed(1)}
              </td>
            </tr>
            <tr>
              <td>Abundant</td>
              <td>{reportData.counts["Cytoplasm"]?.Abundant || "-"}</td>
              <td>
                {(
                  ((reportData.counts["Cytoplasm"]?.Abundant || 0) /
                    totalSamples) *
                  100
                ).toFixed(1)}
              </td>
              <td>Moderate</td>
              <td>
                {reportData.counts["Cytoplasmic Basophilia"]?.Moderate || "-"}
              </td>
              <td>
                {(
                  ((reportData.counts["Cytoplasmic Basophilia"]?.Moderate ||
                    0) /
                    totalSamples) *
                  100
                ).toFixed(1)}
              </td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
            </tr>
          </tbody>
        </table>

        <div className="report-summary">
          <h4>Report Summary</h4>
          <div>
            <p>
              The majority of samples exhibit{" "}
              <strong>
                {Object.keys(reportData.counts["Nuclear Chromatin"]).reduce(
                  (acc, key) => {
                    if (
                      reportData.counts["Nuclear Chromatin"][key] >
                      (reportData.counts["Nuclear Chromatin"][acc] || 0)
                    ) {
                      return key;
                    }
                    return acc;
                  }
                )}
              </strong>{" "}
              nuclear chromatin. Most cells have{" "}
              <strong>
                {Object.keys(reportData.counts["Nuclear Shape"]).reduce(
                  (acc, key) => {
                    if (
                      reportData.counts["Nuclear Shape"][key] >
                      (reportData.counts["Nuclear Shape"][acc] || 0)
                    ) {
                      return key;
                    }
                    return acc;
                  }
                )}
              </strong>{" "}
              nuclear shape. The nucleus is predominantly{" "}
              <strong>
                {Object.keys(reportData.counts["Nucleus"]).reduce(
                  (acc, key) => {
                    if (
                      reportData.counts["Nucleus"][key] >
                      (reportData.counts["Nucleus"][acc] || 0)
                    ) {
                      return key;
                    }
                    return acc;
                  }
                )}
              </strong>{" "}
              in appearance. Cytoplasm is mostly{" "}
              <strong>
                {Object.keys(reportData.counts["Cytoplasm"]).reduce(
                  (acc, key) => {
                    if (
                      reportData.counts["Cytoplasm"][key] >
                      (reportData.counts["Cytoplasm"][acc] || 0)
                    ) {
                      return key;
                    }
                    return acc;
                  }
                )}
              </strong>{" "}
              in nature. Cytoplasmic basophilia is{" "}
              <strong>
                {Object.keys(
                  reportData.counts["Cytoplasmic Basophilia"]
                ).reduce((acc, key) => {
                  if (
                    reportData.counts["Cytoplasmic Basophilia"][key] >
                    (reportData.counts["Cytoplasmic Basophilia"][acc] || 0)
                  ) {
                    return key;
                  }
                  return acc;
                })}
              </strong>
              . Cytoplasmic vacuoles are{" "}
              <strong>
                {Object.keys(reportData.counts["Cytoplasmic Vacuoles"]).reduce(
                  (acc, key) => {
                    if (
                      reportData.counts["Cytoplasmic Vacuoles"][key] >
                      (reportData.counts["Cytoplasmic Vacuoles"][acc] || 0)
                    ) {
                      return key;
                    }
                    return acc;
                  }
                )}
              </strong>
              .
            </p>
          </div>
        </div>
        {/* <div className="image-gallery">
          {images_diff.map((img, index) => (
            <img key={index} src={img} alt={`Result ${index}`} />
          ))}
        </div> */}
      </div>
      <div className="flex justify-center mt-4 pb-20" id="share-buttons">
        <button onClick={downloadPDF} style={buttonStyle}>
          <DownloadSVG width={24} height={24} />
        </button>
        <button onClick={handleSendEmail} style={emailButtonStyle}>
          <EmailSVG width={24} height={24} />
        </button>
        <button onClick={handleSendWhatsApp} style={whatsappButtonStyle}>
          <WhatsappSVG width={24} height={24} />
        </button>
      </div>
    </>
  );
};

const buttonStyle = {
  color: "white",
  padding: "10px 110px",
  fontSize: "16px",
  cursor: "pointer",
  borderRadius: "5px",
  display: "inline-block",
  marginRight: "5px",
  backgroundColor: "rgb(66,133,244)",
};

const emailButtonStyle = {
  ...buttonStyle,
  backgroundColor: "rgb(233,30,99)",
};

const whatsappButtonStyle = {
  ...buttonStyle,
  backgroundColor: "rgb(37,211,102)",
};


export default Report;
