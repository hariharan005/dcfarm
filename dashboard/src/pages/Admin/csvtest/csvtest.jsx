import React, { useState } from "react";

const CsvTest = () => {
    const [csvData, setCsvData] = useState([]);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const text = e.target.result;
                const rows = text.split("\n").map((row) => row.split(","));
                setCsvData(rows);
            };
            reader.readAsText(file);
        }
    };

    return (
        <div>
            <h1>CSV File Upload</h1>
            <input type="file" accept=".csv" onChange={handleFileUpload} />
            <table border="1">
                <thead>
                    <tr>
                        {csvData[0] && csvData[0].map((header, index) => <th key={index}>{header}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {csvData.slice(1).map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                                <td key={cellIndex}>{cell}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CsvTest;