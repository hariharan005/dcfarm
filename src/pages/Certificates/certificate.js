import React, { useRef, useState } from "react";
import Certificate from "../../components/certificate";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Papa from "papaparse";

export default function AdminCertificates() {
  const certRef = useRef();
  const [csvFile, setCsvFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [log, setLog] = useState([]);
  const [date] = useState(new Date().toLocaleDateString());

  // Generate certificate image
  const generateImage = async (personName) => {
    if (!certRef.current) throw new Error("Certificate ref not found");
    certRef.current.querySelector(".certificate-name").innerText = personName;
    const canvas = await html2canvas(certRef.current, { scale: 2 });
    return canvas.toDataURL("image/png");
  };

  // Generate PDF & prepare WhatsApp links
  const handleCSV = async () => {
    if (!csvFile) return;

    setProgress(0);
    setLog([]);

    Papa.parse(csvFile, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        const validRows = results.data.filter(
          (row) => row.Name && row.WhatsApp
        );
        const total = validRows.length;

        const pdf = new jsPDF("landscape", "mm", "a4");
        let completed = 0;

        for (let i = 0; i < validRows.length; i++) {
          try {
            const imgData = await generateImage(validRows[i].Name);

            // Add to PDF
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            if (i > 0) pdf.addPage();
            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

            // Create WhatsApp Web URL
            const waMessage = `Hi ${validRows[i].Name}, here is your HAFarm Certificate!`;
            const waUrl = `https://wa.me/${validRows[i].WhatsApp.replace(
              /[^0-9]/g,
              ""
            )}?text=${encodeURIComponent(waMessage)}`;

            setLog((prev) => [
              ...prev,
              <span key={i}>
                ✅ {validRows[i].Name} -{" "}
                <a href={waUrl} target="_blank" rel="noreferrer">
                  Send via WhatsApp
                </a>
              </span>,
            ]);
          } catch (err) {
            setLog((prev) => [...prev, `❌ Failed for ${validRows[i].Name}: ${err.message}`]);
          }

          completed++;
          setProgress(Math.round((completed / total) * 100));
        }

        // Save PDF locally
        pdf.save(`HAFarm-Certificates.pdf`);
        alert("All certificates generated! Use the links to send via WhatsApp.");
      },
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>HAFarm Bulk Certificate Generator</h1>

      {/* CSV Upload */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="file"
          accept=".csv"
          onChange={(e) => setCsvFile(e.target.files[0])}
        />
        <button onClick={handleCSV} style={{ marginLeft: "10px" }}>
          Generate PDF & Prepare WhatsApp Links
        </button>
      </div>

      {/* Progress Bar */}
      <div style={{ margin: "10px 0" }}>
        <progress value={progress} max="100"></progress>
        <span> {progress}%</span>
      </div>

      {/* Logs & WhatsApp Links */}
      <div
        style={{
          background: "#f5f5f5",
          padding: "10px",
          borderRadius: "8px",
          marginTop: "10px",
          maxHeight: "300px",
          overflowY: "auto",
        }}
      >
        <h3>Send via WhatsApp</h3>
        {log.map((line, idx) => (
          <p key={idx} style={{ fontSize: "14px" }}>
            {line}
          </p>
        ))}
      </div>

      {/* Hidden certificate template */}
      <div style={{ display: "none" }}>
        <Certificate ref={certRef} name="Sample Name" date={date} />
      </div>
    </div>
  );
}
