import React, { useEffect, useRef } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import "./Report.css"; // Make sure to create this CSS file and import it
import medai from "./med-ai.png"; //
import { ReactComponent as WhatsappSVG } from "./whatsapp.svg";
import { ReactComponent as DownloadSVG } from "./download.svg";
import { ReactComponent as EmailSVG } from "./email.svg";

const Report = () => {
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
  
    const header = 
  `Department of Hematology`;
  
    const patientDetails = 
  `PATIENT NAME: Irha Waqas
  AGE/GENDER: 3 Yrs / Female
  MOBILE: 03216862034
  LOCATION: Lahore: Baghrian Chowk College Road
  
  REGISTRATION DATE: 26-Aug-2019 21:00
  REFERENCE: Standard
  CONSULTANT: -
  PATIENT NUMBER: 44010-19-104822832
  CASE NUMBER: 44010-26-08`;
  
    const reportDetails = 
  `REPORTING TIME: 27 August, 2019 - 10:11 AM
  
  Blood C/E (Complete, CBC)`;
  
    const tableHeader = 
  `${padRight('Test', columnWidths.test)}| ${padRight('Normal Value', columnWidths.normalValue)}| ${padRight('Unit', columnWidths.unit)}| ${padRight('Result', columnWidths.result)}
  ${'-'.repeat(columnWidths.test + columnWidths.normalValue + columnWidths.unit + columnWidths.result + 3)}`;
  
    const tableRows = 
  `${padRight('Hb', columnWidths.test)}| ${padRight('11.5 - 16', columnWidths.normalValue)}| ${padRight('g/dl', columnWidths.unit)}| ${padRight('11.9', columnWidths.result)}
  ${padRight('Total RBC', columnWidths.test)}| ${padRight('4 - 6', columnWidths.normalValue)}| ${padRight('x10^12/l', columnWidths.unit)}| ${padRight('3.9', columnWidths.result)}
  ${padRight('HCT', columnWidths.test)}| ${padRight('36 - 46', columnWidths.normalValue)}| ${padRight('%', columnWidths.unit)}| ${padRight('36', columnWidths.result)}
  ${padRight('MCV', columnWidths.test)}| ${padRight('75 - 95', columnWidths.normalValue)}| ${padRight('fl', columnWidths.unit)}| ${padRight('93', columnWidths.result)}
  ${padRight('MCH', columnWidths.test)}| ${padRight('26 - 32', columnWidths.normalValue)}| ${padRight('PG', columnWidths.unit)}| ${padRight('31', columnWidths.result)}
  ${padRight('MCHC', columnWidths.test)}| ${padRight('30 - 35', columnWidths.normalValue)}| ${padRight('g/dl', columnWidths.unit)}| ${padRight('33', columnWidths.result)}
  ${padRight('Platelet Count', columnWidths.test)}| ${padRight('150 - 400', columnWidths.normalValue)}| ${padRight('x10^9/l', columnWidths.unit)}| ${padRight('125', columnWidths.result)}
  ${padRight('WBC Count (TLC)', columnWidths.test)}| ${padRight('4 - 11', columnWidths.normalValue)}| ${padRight('x10^9/l', columnWidths.unit)}| ${padRight('6.3', columnWidths.result)}
  ${padRight('Neutrophils', columnWidths.test)}| ${padRight('40 - 75', columnWidths.normalValue)}| ${padRight('%', columnWidths.unit)}| ${padRight('49', columnWidths.result)}
  ${padRight('Lymphocytes', columnWidths.test)}| ${padRight('20 - 50', columnWidths.normalValue)}| ${padRight('%', columnWidths.unit)}| ${padRight('43', columnWidths.result)}
  ${padRight('Monocytes', columnWidths.test)}| ${padRight('02 - 10', columnWidths.normalValue)}| ${padRight('%', columnWidths.unit)}| ${padRight('06', columnWidths.result)}
  ${padRight('Eosinophils', columnWidths.test)}| ${padRight('01 - 06', columnWidths.normalValue)}| ${padRight('%', columnWidths.unit)}| ${padRight('02', columnWidths.result)}`;
  
    const note = 
  `NOTE: Platelet count verified on peripheral smear`;
  
    const footer = 
  `03111456789
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
    const whatsappURL = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
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
  
    const header = 
  `DEPARTMENT OF HEMATOLOGY`;
  
    const patientDetails = 
  `PATIENT DETAILS:
  SUMERA AMBREEN
  AGE/GENDER: 35 YRS / FEMALE
  MOBILE: 03216862034
  LOCATION: Lahore: Baghrian Chowk College Road
  
  REGISTRATION DATE: 26-Aug-2019 21:00
  REFERENCE: Standard
  CONSULTANT: -
  PATIENT NUMBER: 44010-19-104822832
  CASE NUMBER: 44010-26-08`;
  
    const reportDetails = 
  `BLOOD C/E (COMPLETE, CBC)
  REPORTING TIME: 27 August, 2019 - 10:11 AM`;
  
    const tableHeader = 
  `${padRight('Test', columnWidths.test)}| ${padRight('Normal Value', columnWidths.normalValue)}| ${padRight('Unit', columnWidths.unit)}| ${padRight('Result', columnWidths.result)}
  ${'-'.repeat(columnWidths.test + columnWidths.normalValue + columnWidths.unit + columnWidths.result + 3)}`;
  
    const tableRows = 
  `${padRight('Hb', columnWidths.test)}| ${padRight('11.5 - 16', columnWidths.normalValue)}| ${padRight('g/dl', columnWidths.unit)}| ${padRight('11.9', columnWidths.result)}
  ${padRight('Total RBC', columnWidths.test)}| ${padRight('4 - 6', columnWidths.normalValue)}| ${padRight('x10^12/l', columnWidths.unit)}| ${padRight('3.9', columnWidths.result)}
  ${padRight('HCT', columnWidths.test)}| ${padRight('36 - 46', columnWidths.normalValue)}| ${padRight('%', columnWidths.unit)}| ${padRight('36', columnWidths.result)}
  ${padRight('MCV', columnWidths.test)}| ${padRight('75 - 95', columnWidths.normalValue)}| ${padRight('fl', columnWidths.unit)}| ${padRight('93', columnWidths.result)}
  ${padRight('MCH', columnWidths.test)}| ${padRight('26 - 32', columnWidths.normalValue)}| ${padRight('PG', columnWidths.unit)}| ${padRight('31', columnWidths.result)}
  ${padRight('MCHC', columnWidths.test)}| ${padRight('30 - 35', columnWidths.normalValue)}| ${padRight('g/dl', columnWidths.unit)}| ${padRight('33', columnWidths.result)}
  ${padRight('Platelet Count', columnWidths.test)}| ${padRight('150 - 400', columnWidths.normalValue)}| ${padRight('x10^9/l', columnWidths.unit)}| ${padRight('125', columnWidths.result)}
  ${padRight('WBC Count (TLC)', columnWidths.test)}| ${padRight('4 - 11', columnWidths.normalValue)}| ${padRight('x10^9/l', columnWidths.unit)}| ${padRight('6.3', columnWidths.result)}
  ${padRight('Neutrophils', columnWidths.test)}| ${padRight('40 - 75', columnWidths.normalValue)}| ${padRight('%', columnWidths.unit)}| ${padRight('49', columnWidths.result)}
  ${padRight('Lymphocytes', columnWidths.test)}| ${padRight('20 - 50', columnWidths.normalValue)}| ${padRight('%', columnWidths.unit)}| ${padRight('43', columnWidths.result)}
  ${padRight('Monocytes', columnWidths.test)}| ${padRight('02 - 10', columnWidths.normalValue)}| ${padRight('%', columnWidths.unit)}| ${padRight('06', columnWidths.result)}
  ${padRight('Eosinophils', columnWidths.test)}| ${padRight('01 - 06', columnWidths.normalValue)}| ${padRight('%', columnWidths.unit)}| ${padRight('02', columnWidths.result)}`;
  
    const note = 
  `NOTE: PLATELET COUNT VERIFIED ON PERIPHERAL SMEAR`;
  
    const footer = 
  `03111456789
  www.chughtailab.com`;
  
    return `
  ${header}
  
  ${patientDetails}
  
  ${reportDetails}
  
  ${tableHeader}
  ${tableRows}
  
  ${note}
  
  ${footer}
    `;
  };
  
  const sendViaEmail = async () => {
    const textReport = generateTextReports();
    const emailSubject = "Patient Blood Report";
    const emailBody = `Here is the report:\n\n${textReport}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
  };
  
  return (
    <>
      <div className="report-container" id="report-content">
        <div className="header flex flex-col items-center">
          <img src={medai} style={{ justifySelf: "center" }} alt="Lab Logo" />
          <h1 className="text-2xl font-bold">Department of Hematology</h1>
        </div>
        <div className="patient-details">
          <div>
            <p>
              <strong>Patient Details:</strong> SUMERA AMBREEN
            </p>
            <p>
              <strong>Age/Gender:</strong> 35 Yrs / Female
            </p>
            <p>
              <strong>Mobile:</strong> 03216862034
            </p>
            <p>
              <strong>Location:</strong> Lahore: Baghrian Chowk College Road
            </p>
          </div>
          <div>
            <p>
              <strong>Registration Date:</strong> 26-Aug-2019 21:00
            </p>
            <p>
              <strong>Reference:</strong> Standard
            </p>
            <p>
              <strong>Consultant:</strong> -
            </p>
            <p>
              <strong>Patient Number:</strong> 44010-19-104822832
            </p>
            <p>
              <strong>Case Number:</strong> 44010-26-08
            </p>
          </div>
        </div>
        <div className="report-details">
          <p>
            <strong>Blood C/E (Complete, CBC)</strong>
          </p>
          <p>Reporting Time: 27 August, 2019 - 10:11 AM</p>
        </div>
        <table className="test-table">
          <thead>
            <tr>
              <th>Test</th>
              <th>Normal Value</th>
              <th>Unit</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Hb</td>
              <td>11.5 - 16</td>
              <td>g/dl</td>
              <td>11.9</td>
            </tr>
            <tr>
              <td>Total RBC</td>
              <td>4 - 6</td>
              <td>x10^12/l</td>
              <td style={{ color: "red" }}>3.9</td>
            </tr>
            <tr>
              <td>HCT</td>
              <td>36 - 46</td>
              <td>%</td>
              <td>36</td>
            </tr>
            <tr>
              <td>MCV</td>
              <td>75 - 95</td>
              <td>fl</td>
              <td>93</td>
            </tr>
            <tr>
              <td>MCH</td>
              <td>26 - 32</td>
              <td>PG</td>
              <td>31</td>
            </tr>
            <tr>
              <td>MCHC</td>
              <td>30 - 35</td>
              <td>g/dl</td>
              <td>33</td>
            </tr>
            <tr>
              <td>Platelet Count</td>
              <td>150 - 400</td>
              <td>x10^9/l</td>
              <td style={{ color: "red" }}>125</td>
            </tr>
            <tr>
              <td>WBC Count (TLC)</td>
              <td>4 - 11</td>
              <td>x10^9/l</td>
              <td>6.3</td>
            </tr>
            <tr>
              <td>Neutrophils</td>
              <td>40 - 75</td>
              <td>%</td>
              <td>49</td>
            </tr>
            <tr>
              <td>Lymphocytes</td>
              <td>20 - 50</td>
              <td>%</td>
              <td>43</td>
            </tr>
            <tr>
              <td>Monocytes</td>
              <td>02 - 10</td>
              <td>%</td>
              <td>06</td>
            </tr>
            <tr>
              <td>Eosinophils</td>
              <td>01 - 06</td>
              <td>%</td>
              <td>02</td>
            </tr>
          </tbody>
        </table>
        <p className="note">
          NOTE: Platelet count verified on peripheral smear
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "10px",
            backgroundColor: "#f1f1f1",
            borderBottomRightRadius: "10px",
            borderBottomLeftRadius: "10px",
            fontWeight: "bold",
            marginTop: "130px",
            marginLeft: "-20px",
            marginRight: "-21px",
          }}
        >
          <p style={{ margin: 0 }}>03111456789</p>
          <p style={{ margin: 0 }}>www.chughtailab.com</p>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <div className="flex space-x-4">
          <div>
            <button
              onClick={sendViaEmail}
              style={{
                color: "white",
                padding: "10px 20px",
                fontSize: "16px",
                cursor: "pointer",
                borderRadius: "5px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "20px auto",
                fontWeight: "bold",
                width: "245px",
                border: "none", // Ensure no border conflicts
                background: "#0f52ba", // Explicitly set background color
              }}
            >
              <EmailSVG style={{ height: "20px", marginRight: "10px" }} />
              Email PDF
            </button>
            <div className="spacing h-2"></div>
          </div>
          <div>
            <button
              onClick={sendViaWhatsApp}
              style={{
                color: "white",
                padding: "10px 20px",
                fontSize: "16px",
                cursor: "pointer",
                borderRadius: "5px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "20px auto",
                fontWeight: "bold",
                width: "245px",
                border: "none", // Ensure no border conflicts
                background: "#128C7E", // Explicitly set background color
              }}
            >
              <WhatsappSVG style={{ height: "20px", marginRight: "10px" }} />
              Whatsapp PDF
            </button>
            <div className="spacing h-2"></div>
          </div>
          <div>
            <button
              ref={downloadButtonRef}
              style={{
                color: "white",
                padding: "10px 20px",
                fontSize: "16px",
                cursor: "pointer",
                borderRadius: "5px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "20px auto",
                fontWeight: "bold",
                width: "245px",
                border: "none", // Ensure no border conflicts
                background: "#0f52ba", // Explicitly set background color
              }}
            >
              <DownloadSVG style={{ height: "20px", marginRight: "10px" }} />
              Download PDF
            </button>
            <div className="spacing h-2"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Report;
