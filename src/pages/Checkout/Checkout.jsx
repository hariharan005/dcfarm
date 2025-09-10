import React, { useState, useEffect, useRef } from "react";
import { getAllItems, clearCart } from "../../DB/CartDB";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import "../../css/Checkout.css";
import popSound from "../../sounds/Pop.mp3"; // Ensure this path is correct

const popSoundUrl = popSound; // Ensure this path is correct

const Checkout = () => {
  const [form, setForm] = useState({ name: "", address: "", email: "", phone: "" });
  const [cartItems, setCartItems] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("");
  const navigate = useNavigate();
  const sparkRef = useRef(null);

  // Load cart
  useEffect(() => {
    const loadCart = async () => {
      const items = await getAllItems();
      setCartItems(items);
    };
    loadCart();
  }, []);

  const grandTotal = cartItems.reduce((sum, item) => sum + item.total, 0);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!form.name || !form.address || !form.email) {
      alert("Please fill all details");
      return;
    }

    try {
      const orderRes = await fetch("/api/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ totalAmount: grandTotal }),
      });
      const orderData = await orderRes.json();
      if (!orderData.id) throw new Error("Failed to create Razorpay order");

      if (!window.Razorpay) {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
        await new Promise((resolve) => (script.onload = resolve));
      }

      const options = {
        key: "rzp_test_RD73HneQyWEpFH",
        amount: orderData.amount,
        currency: orderData.currency,
        name: "HA Farm",
        description: "Order Payment",
        order_id: orderData.id,
        prefill: { name: form.name, email: form.email, phone: form.phone, address: form.address },
        handler: async function (response) {
          try {
            const verifyRes = await fetch("/api/orders/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                customerName: form.name,
                customerEmail: form.email,
                customerPhone: form.phone,
                customerAddress: form.address,
                items: cartItems,
                totalAmount: grandTotal,
              }),
            });

            let verifyData;
            try {
              verifyData = await verifyRes.json();
            } catch (e) {
              const text = await verifyRes.text();
              console.error("❌ Backend returned non-JSON:", text);
              alert("Payment verification failed. Please contact support.");
              return;
            }
            if (verifyData.success) {
              //alert("✅ Payment successful!");
              setPaymentStatus("success");
              await clearCart();
              setSubmitted(true);

              const audio = new Audio(popSoundUrl);
              audio.play().catch(() => console.log("Sound play failed"));
            } else {
              alert("❌ Payment failed: " + verifyData.message);
              setPaymentStatus("failed");
              alert("Payment verification failed!");
            }
          } catch (error) {
            console.error("❌ Verification error:", error);
            alert("Payment failed. Please try again.");
            setPaymentStatus("failed");
          }
        },
        theme: { color: "#3399cc" },
      };

      new window.Razorpay(options).open();
    } catch (err) {
      console.error("Payment error:", err);
      alert("Something went wrong. Try again!");
    }
  };

  // Confetti + sparkles effect
  useEffect(() => {
    if (submitted && paymentStatus === "success") {
      const duration = 2 * 1000;
      const end = Date.now() + duration;
      (function frame() {
        confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 }, emojis: ["🎁", "✨", "🎉"] });
        confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 }, emojis: ["🎁", "✨", "🎉"] });
        if (Date.now() < end) requestAnimationFrame(frame);
      })();

      setTimeout(() => {
        for (let i = 0; i < 3; i++) {
          setTimeout(() => {
            confetti({
              particleCount: 80,
              spread: 120,
              origin: { x: 0.5, y: 0.55 },
              emojis: ["🎁", "🎉", "✨", "💝", "💎"],
              scalar: 1.8,
            });
          }, i * 300);
        }
      }, 1500);

      // Sparkle effect
      const interval = setInterval(() => {
        if (sparkRef.current) {
          const sparkle = document.createElement("div");
          sparkle.style.position = "absolute";
          sparkle.style.width = "6px";
          sparkle.style.height = "6px";
          sparkle.style.background = "gold";
          sparkle.style.borderRadius = "50%";
          sparkle.style.top = `${sparkRef.current.offsetTop + 50 + Math.random() * 20}px`;
          sparkle.style.left = `${sparkRef.current.offsetLeft + 50 + Math.random() * 20}px`;
          sparkle.style.opacity = 1;
          sparkle.style.pointerEvents = "none";
          sparkle.style.transition = "all 0.8s ease-out";
          document.body.appendChild(sparkle);

          setTimeout(() => {
            sparkle.style.top = `${sparkRef.current.offsetTop - 50}px`;
            sparkle.style.left = `${sparkRef.current.offsetLeft + Math.random() * 100 - 50}px`;
            sparkle.style.opacity = 0;
          }, 50);

          setTimeout(() => document.body.removeChild(sparkle), 900);
        }
      }, 150);

      setTimeout(() => clearInterval(interval), 3500);
    }
  }, [submitted, paymentStatus]);

  if (submitted) {
    return (
      <div className="thankyou-container">
        <h2>🎉 Thank you for your order!</h2>
        <p>Your payment was successful and your order is placed.</p>

        {/* Gift Box with sparkle reference */}
        <div
          ref={sparkRef}
          style={{ position: "relative", width: "120px", height: "120px", margin: "20px auto" }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1], rotate: [0, 10, -10, 0], boxShadow: ["0 0 0px #fff", "0 0 20px #ffcc00", "0 0 0px #fff"] }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{
              width: "100px",
              height: "70px",
              background: "#FFCC00",
              borderRadius: "6px",
              position: "absolute",
              bottom: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "2.5rem",
            }}
          >
            🎁
          </motion.div>

          <motion.div
            initial={{ rotateX: 0, y: 0 }}
            animate={{ rotateX: [-10, -120, -100], y: [-5, -60, -50] }}
            transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
            style={{
              width: "100px",
              height: "30px",
              background: "#FF9900",
              borderRadius: "6px 6px 0 0",
              position: "absolute",
              top: 0,
              transformOrigin: "top center",
            }}
          />

          <motion.div
            initial={{ y: 0, scale: 0 }}
            animate={{ y: -150, scale: 1 }}
            transition={{ delay: 1.5, duration: 1.5, ease: "easeOut" }}
            style={{ position: "absolute", top: "20px", left: "25px", fontSize: "2.5rem" }}
          >
            🎁
          </motion.div>
        </div>

        <button onClick={() => navigate("/products")} style={{ marginTop: 16 }}>
          Back to Products
        </button>
      </div>
    );
  }

  // Checkout Form
  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul className="cart-list">
            {cartItems.map((item) => (
              <li key={item.id}>{item.name} × {item.qty} = ₹{item.total}</li>
            ))}
          </ul>
          <h3 className="total-amount">Total Amount: ₹{grandTotal}</h3>
          <form className="checkout-form" onSubmit={handlePayment}>
            <label>Name:</label>
            <input name="name" type="text" value={form.name} onChange={handleChange} required />
            <label>Address:</label>
            <input name="address" type="text" value={form.address} onChange={handleChange} required />
            <label>Phone:</label>
            <input
              name="phone"
              type="tel"
              value={form.phone || ""}
              onChange={(e) => {
                let value = e.target.value;
                if (!value.startsWith("+91")) value = "+91 " + value.replace(/[^0-9]/g, "");
                else value = "+91 " + value.replace("+91", "").replace(/\D/g, "").slice(0, 10);
                setForm({ ...form, phone: value });
              }}
              required
              placeholder="+91 9876543210"
            />
            <label>Email:</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} required />
            <button type="submit">Pay ₹{grandTotal}</button>
          </form>
          {paymentStatus === "failed" && <p className="payment-failed">Payment failed. Please try again.</p>}
        </>
      )}
    </div>
  );
};

export default Checkout;
