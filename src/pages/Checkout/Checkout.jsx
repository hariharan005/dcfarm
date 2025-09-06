import React, { useState, useEffect } from "react";
import { getAllItems, clearCart } from "../../DB/CartDB";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [form, setForm] = useState({ name: "", address: "", email: "" });
  const [cartItems, setCartItems] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("");
  const navigate = useNavigate();

  // Load cart
  useEffect(() => {
    const loadCart = async () => {
      const items = await getAllItems();
      setCartItems(items);
    };
    loadCart();
  }, []);

  const grandTotal = cartItems.reduce((sum, item) => sum + item.total, 0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Handle Razorpay Payment
  const handlePayment = async (e) => {
    e.preventDefault();

    if (!form.name || !form.address || !form.email) {
      alert("Please fill all details");
      return;
    }

    try {
      // 1. Create order in backend
      const orderRes = await fetch("http://localhost:5000/api/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ totalAmount: grandTotal }),
      });

      const orderData = await orderRes.json();
      if (!orderData.id) {
        throw new Error("Failed to create Razorpay order");
      }

      // 2. Load Razorpay script if not already loaded
      if (!window.Razorpay) {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
        await new Promise((resolve) => {
          script.onload = resolve;
        });
      }

      // 3. Razorpay options
      const options = {
        key: "rzp_test_RD73HneQyWEpFH", // replace with your Razorpay key_id
        amount: orderData.amount,
        currency: orderData.currency,
        name: "MyStore",
        description: "Order Payment",
        order_id: orderData.id,
        prefill: {
          name: form.name,
          email: form.email,
          phone: form.phone, // optional
          address: form.address, // optional
        },
        handler: async function (response) {
          // 4. Verify payment with backend
          try {
            const verifyRes = await fetch("http://localhost:5000/api/payment/verify", {
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

            const verifyData = await verifyRes.json();

            if (verifyData.success) {
              setPaymentStatus("success");
              await clearCart();
              setSubmitted(true);
            } else {
              setPaymentStatus("failed");
              alert("Payment verification failed!");
            }
          } catch (err) {
            console.error("Verification error:", err);
            setPaymentStatus("failed");
          }
        },
        theme: {
          color: "#3399cc",
        },
      };

      // 5. Open Razorpay checkout
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment error:", err);
      alert("Something went wrong. Try again!");
    }
  };

  // ✅ Order confirmation page
  if (submitted) {
    return (
      <div style={{ maxWidth: 400, margin: "40px auto", textAlign: "center" }}>
        <h2>🎉 Thank you for your order!</h2>
        <p>Your payment was successful and your order is placed.</p>
        <button onClick={() => navigate("/products")} style={{ marginTop: 16 }}>
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 400, margin: "40px auto" }}>
      <h2>Checkout</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul style={{ marginBottom: 20 }}>
            {cartItems.map((item) => (
              <li key={item.id} style={{ marginBottom: 8 }}>
                {item.name} × {item.qty} = ₹{item.total}
              </li>
            ))}
          </ul>
          <h3>Total Amount: ₹{grandTotal}</h3>
          <form onSubmit={handlePayment}>
            <div style={{ marginBottom: 12 }}>
              <label>Name:</label>
              <input
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: 6 }}
              />
            </div>
            <div style={{ marginBottom: 12 }}>
              <label>Address:</label>
              <input
                name="address"
                type="text"
                value={form.address}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: 6 }}
              />
            </div>
            <div style={{ marginBottom: 12 }}>
              <label>Phone:</label>
              <input
                name="phone"
                type="tel"
                value={form.phone}
                onChange={(e) => {
                  let value = e.target.value;

                  // Always start with +91
                  if (!value.startsWith("+91")) {
                    value = "+91 " + value.replace(/[^0-9]/g, "");
                  } else {
                    // Remove non-numeric chars after +91
                    const digits = value.replace("+91", "").replace(/\D/g, "");
                    value = "+91 " + digits.slice(0, 10); // limit 10 digits
                  }

                  setForm({ ...form, phone: value });
                }}
                required
                placeholder="+91 9876543210"
                style={{ width: "100%", padding: 6 }}
              />
            </div>


            <div style={{ marginBottom: 12 }}>
              <label>Email:</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: 6 }}
              />
            </div>
            <button type="submit" style={{ marginTop: 16 }}>
              Pay ₹{grandTotal}
            </button>
          </form>
          {paymentStatus === "failed" && (
            <p style={{ color: "red", marginTop: 10 }}>
              Payment failed. Please try again.
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default Checkout;
