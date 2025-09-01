import React from "react";
import { Link } from "react-router-dom";

const PolicyLayout = ({ title, children }) => {
  return (
    <div style={{ maxWidth: 900, margin: "40px auto", padding: 20 }}>
      <h1 style={{ textAlign: "center", marginBottom: 20 }}>{title}</h1>
      <div style={{ fontSize: 16, lineHeight: 1.6, color: "#333" }}>
        {children}
      </div>
      <div style={{ marginTop: 30, textAlign: "center" }}>
        <Link to="/" style={{ color: "#2f855a", textDecoration: "underline" }}>
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default PolicyLayout;
