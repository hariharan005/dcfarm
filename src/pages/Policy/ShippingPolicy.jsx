import React from "react";
import PolicyLayout from "./PolicyLayout";

const ShippingPolicy = () => {
  return (
    <PolicyLayout title="Shipping Policy">
      <p>We strive to deliver your products as quickly as possible:</p>
      <ul>
        <li>Orders are shipped within 1–3 business days.</li>
        <li>Delivery times may vary depending on location.</li>
        <li>Tracking details will be provided once the order is shipped.</li>
        <li>We are not responsible for delays caused by courier services.</li>
      </ul>
      <p>For shipping queries, contact support@dcfarm.com</p>
    </PolicyLayout>
  );
};

export default ShippingPolicy;
