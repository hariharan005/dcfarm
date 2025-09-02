import React, { useState, useEffect } from 'react';
import { getAllItems, clearCart } from '../../DB/CartDB';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const [form, setForm] = useState({
    name: '',
    address: '',
    email: '',
  });
  const [cartItems, setCartItems] = useState([]);
  const [submitted, setSubmitted] = useState(false);
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

  // ✅ Trigger GPay / UPI Payment
  const handleUPIPayment = async () => {
    const orderId = `ORDER_${Date.now()}`;
    const upiId = "your-vpa@upi"; // Replace with your UPI ID
    const payeeName = "MyStore"; // Replace with your store name

    // Construct UPI URL (works with GPay, PhonePe, Paytm, etc.)
    const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&mc=0000&tid=${orderId}&tr=${orderId}&am=${grandTotal}&cu=INR`;

    // Open in new tab (on mobile will try to open UPI apps)
    window.location.href = upiUrl;

    // NOTE: Since you’re not using a payment gateway,
    // you cannot auto-verify payment.
    // For testing, we simulate payment success:
    setTimeout(async () => {
      await clearCart();
      setSubmitted(true);

      // In real system: send order data to backend
      console.log("Order Placed:", {
        ...form,
        items: cartItems,
        amount: grandTotal,
        orderId,
      });
    }, 5000); // simulate delay
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleUPIPayment();
  };

  if (submitted) {
    return (
      <div style={{ maxWidth: 400, margin: '40px auto', textAlign: 'center' }}>
        <h2>Thank you for your order!</h2>
        <p>Your checkout is complete.</p>
        <button onClick={() => navigate('/products')} style={{ marginTop: 16 }}>
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 400, margin: '40px auto' }}>
      <h2>Checkout</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul style={{ marginBottom: 20 }}>
            {cartItems.map(item => (
              <li key={item.id} style={{ marginBottom: 8 }}>
                {item.name} × {item.qty} = ₹{item.total}
              </li>
            ))}
          </ul>
          <h3>Total Amount: ₹{grandTotal}</h3>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 12 }}>
              <label>Name:</label>
              <input
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: 6 }}
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
                style={{ width: '100%', padding: 6 }}
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
                style={{ width: '100%', padding: 6 }}
              />
            </div>
            <div style={{ marginBottom: 12 }}>
              <label>UPI Payment (via GPay, PhonePe, Paytm)</label>
              <p style={{ fontSize: 12, color: 'gray' }}>
                You will be redirected to your UPI app to complete the payment.
              </p>
            </div>
            <button type="submit" style={{ marginTop: 16 }}>Pay ₹{grandTotal}</button>
          </form>
        </>
      )}
    </div>
  );
};

export default Checkout;
