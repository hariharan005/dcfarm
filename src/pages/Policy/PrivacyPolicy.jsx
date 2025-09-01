import React from "react";
import PolicyLayout from "./PolicyLayout";

const PrivacyPolicy = () => {
  return (
    <PolicyLayout title="Privacy Policy">
      <p>We respect your privacy and are committed to protecting your personal information.</p>
      <ul>
        <li>We collect only necessary information for order processing.</li>
        <li>Your data will not be shared with third parties except for order fulfillment.</li>
        <li>We use secure methods to store and process your information.</li>
        <li>You may request deletion of your data by contacting support@dcfarm.com</li>
      </ul>
      <p>Read our full privacy policy for more details.</p>
    </PolicyLayout>
  );
};

export default PrivacyPolicy;
