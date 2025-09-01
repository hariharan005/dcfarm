import React from "react";
import PolicyLayout from "./PolicyLayout";

const CancellationPolicy = () => {
  return (
    <PolicyLayout title="Cancellation & Refunds">
      <p>
        We understand that sometimes you may need to cancel an order. Please note:
      </p>
      <ul>
        <li>Orders can be cancelled within 24 hours of placement.</li>
        <li>Refunds will be processed to the original payment method within 5–7 business days.</li>
        <li>Some products may not be eligible for cancellation once processed for shipping.</li>
      </ul>
      <p>For any cancellation queries, contact us at support@dcfarm.com</p>
    </PolicyLayout>
  );
};

export default CancellationPolicy;
