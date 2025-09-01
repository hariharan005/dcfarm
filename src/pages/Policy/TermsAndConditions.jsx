import React from "react";
import PolicyLayout from "./PolicyLayout";

const TermsAndConditions = () => {
  return (
    <PolicyLayout title="Terms and Conditions">
      <p>By using our website and services, you agree to the following terms:</p>
      <ul>
        <li>All products are subject to availability.</li>
        <li>Prices and offers are subject to change without notice.</li>
        <li>Users must provide accurate information during registration and checkout.</li>
        <li>We reserve the right to refuse service for violations of our terms.</li>
      </ul>
      <p>For full terms, contact support@dcfarm.com</p>
    </PolicyLayout>
  );
};

export default TermsAndConditions;
