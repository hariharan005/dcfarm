import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import "../../css/Checkout.css";

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { name, items, total } = location.state || {};

  // Confetti effect
  useEffect(() => {
    const duration = 2 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 } });
      confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 } });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  }, []);

  if (!items) {
    return <p>No order found. Go back to products.</p>;
  }

  return (
    <div className="thankyou-container">
      <h2>🎉 Thank you, {name}!</h2>
      <p>Your order has been placed successfully.</p>

      <h3>🛍️ Order Summary:</h3>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} × {item.qty} = ₹{item.total}
          </li>
        ))}
      </ul>
      <h3>Total Paid: ₹{total}</h3>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 1], rotate: [0, 10, -10, 0] }}
        transition={{ duration: 1.2 }}
        style={{
          width: "100px",
          height: "70px",
          background: "#FFCC00",
          borderRadius: "6px",
          margin: "20px auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "2.5rem",
        }}
      >
        🎁
      </motion.div>

      <button onClick={() => navigate("/products")} style={{ marginTop: 16 }}>
        Back to Products
      </button>
    </div>
  );
};

export default OrderSuccess;
