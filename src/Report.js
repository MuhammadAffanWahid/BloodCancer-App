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

  // const getPDFBlob = () => {
  //   const reportContent = document.getElementById("report-content");
  //   html2canvas(reportContent).then((canvas) => {
  //     const pdf = new jsPDF("p", "pt", "a4");
  //     const imgData = canvas.toDataURL("image/png");
  //     const imgWidth = 595.28;
  //     const pageHeight = 841.89;
  //     const imgHeight = (canvas.height * imgWidth) / canvas.width;
  //     let heightLeft = imgHeight;
  //     let position = 0;

  //     pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);

  //     if (heightLeft > pageHeight) {
  //       heightLeft -= pageHeight;

  //       while (heightLeft > 0) {
  //         position = heightLeft - imgHeight;
  //         pdf.addPage();
  //         pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
  //         heightLeft -= pageHeight;
  //       }
  //     }

  //     const pdfBlob = pdf.output('blob');
  //     return pdfBlob;
  //   });
  // };

  // const sendViaWhatsApp = () => {
  //   const pdfBlob = getPDFBlob();
  //   const pdfURL = URL.createObjectURL(pdfBlob);
  //   const message = `Check out this PDF: ${pdfURL}`;
  //   window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`);
  // };

  // const sendViaEmail = () => {
  //   const pdfBlob = getPDFBlob();
  //   const pdfURL = URL.createObjectURL(pdfBlob);
  //   const emailSubject = "Here's your PDF";
  //   const emailBody = `Please find the PDF attached: ${pdfURL}`;
  //   window.location.href = `mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
  // };


  const getPDFBlob = async () => {
    const reportContent = document.getElementById("report-content");
    const canvas = await html2canvas(reportContent);
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

    const pdfBlob = pdf.output('blob');
    return pdfBlob;
  };

  const sendViaWhatsApp = async () => {
    const pdfBlob = await getPDFBlob();
    const pdfURL = URL.createObjectURL(pdfBlob);
    const message = `Check out this PDF: ${pdfURL}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`);
  };

  const sendViaEmail = async () => {
    const pdfBlob = await getPDFBlob();
    const pdfURL = URL.createObjectURL(pdfBlob);
    const emailSubject = "Here's your PDF";
    const emailBody = `Please find the PDF attached: ${pdfURL}`;
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
