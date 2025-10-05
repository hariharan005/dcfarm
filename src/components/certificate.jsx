import React, { forwardRef } from "react";
import "../css/Certificates.css"; // Import CSS

const Certificate = forwardRef(({ name, date }, ref) => {
  return (
    <div ref={ref} className="certificate">
      {/* Logo */}
      <img src="/hafarm-logo.png" alt="HAFarm Logo" className="certificate-logo" />

      <h1 className="certificate-title">HAFarm</h1>
      <h2 className="certificate-subtitle">Certificate of Participation</h2>

      <p className="certificate-text">This certificate is proudly presented to</p>
      <h2 className="certificate-name">{name}</h2>
      <p className="certificate-text">
        For successfully participating in the HAFarm Workshop
      </p>

      <p className="certificate-date">Date: {date}</p>

      {/* Signature */}
      <div className="certificate-signature">
        <img src="/signature.png" alt="Signature" className="signature-img" />
        <p>Founder, HAFarm</p>
      </div>
    </div>
  );
});

export default Certificate;
