import React, { useState, useEffect } from 'react';
import { getAllItems, clearCart } from '../DB/CartDB';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const [form, setForm] = useState({
    name: '',
    address: '',
    email: '',
    payment: '',
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend for order processing
    await clearCart(); // clear cart after order
    setSubmitted(true);
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
              <label>Payment Method:</label>
              <select
                name="payment"
                value={form.payment}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: 6 }}
              >
                <option value="">Select</option>
                <option value="card">Credit Card</option>
                <option value="paypal">PayPal</option>
              </select>
            </div>
            <button type="submit" style={{ marginTop: 16 }}>Place Order</button>
          </form>
        </>
      )}
    </div>
  );
};

export default Checkout;
