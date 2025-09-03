import React, { useState, useEffect } from "react";
import { getAllItems, clearCart } from "../../DB/CartDB";
import { useNavigate } from "react-router-dom";
import "../../css/Checkout.css"; // ✅ import CSS

const Checkout = () => {
  const [form, setForm] = useState({
    name: "",
    address: "",
    email: "",
  });
  const [cartItems, setCartItems] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(""); // track payment
  const navigate = useNavigate();

  // Load cart items on mount
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

  // ✅ Trigger UPI Payment
  const handleUPIPayment = async () => {
    const orderId = `ORDER_${Date.now()}`;
    const upiId = "harichella005-1@okhdfcbank"; // Replace with your UPI ID
    const payeeName = "Hariharan C"; // Replace with your store name

    const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(
      payeeName
    )}&mc=0000&tid=${orderId}&tr=${orderId}&am=${grandTotal}&cu=INR`;

    // Open UPI app
    window.location.href = upiUrl;

    // 🚨 Manual Confirmation
    const userConfirmed = window.confirm(
      "Did your UPI payment go through successfully?"
    );

    if (userConfirmed) {
      setPaymentStatus("success");

      // ✅ Send order to backend
      try {
        const response = await fetch("http://localhost:5000/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderId,
            customerName: form.name,
            customerAddress: form.address,
            customerEmail: form.email,
            items: cartItems,
            amount: grandTotal,
            status: "paid",
          }),
        });

        if (!response.ok) throw new Error("Failed to save order");

        await clearCart();
        setSubmitted(true);
      } catch (error) {
        console.error("Order save error:", error);
        alert("Something went wrong while saving your order.");
      }
    } else {
      setPaymentStatus("failed");
      alert("Payment failed or cancelled. Order not placed.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleUPIPayment();
  };

  if (submitted) {
    return (
      <div className="thankyou-container">
        <h2>Thank you for your order!</h2>
        <p>Your payment was successful and your order is placed.</p>
        <button onClick={() => navigate("/products")}>
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul className="cart-list">
            {cartItems.map((item) => (
              <li key={item.id}>
                <span>{item.name} × {item.qty}</span>
                <span>₹{item.total}</span>
              </li>
            ))}
          </ul>
          <h3 className="total-amount">Total Amount: ₹{grandTotal}</h3>
          <form className="checkout-form" onSubmit={handleSubmit}>
            <label>Name:</label>
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              required
            />

            <label>Address:</label>
            <input
              name="address"
              type="text"
              value={form.address}
              onChange={handleChange}
              required
            />

            <label>Email:</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
            />

            <label>UPI Payment (via GPay, PhonePe, Paytm)</label>
            <p className="payment-info">
              You will be redirected to your UPI app to complete the payment.
            </p>

            <button type="submit">Pay ₹{grandTotal}</button>
          </form>
          {paymentStatus === "failed" && (
            <p className="payment-failed">
              Payment failed. Please try again.
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default Checkout;
