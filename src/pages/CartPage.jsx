import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/CartPage.css";

const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedCart);
  }, []);

  const handleRemoveItem = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));

    // Trigger storage event for real-time sync
    window.dispatchEvent(new Event("storage"));
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;

    alert("Checkout successful!");
    localStorage.removeItem("cartItems");
    setCartItems([]);

    // Trigger storage event for real-time sync
    window.dispatchEvent(new Event("storage"));

    navigate("/products");
  };

  const grandTotal = cartItems.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="cart-page">
      <h2>🛒 Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul>
            {cartItems.map(item => (
              <li key={item.id}>
                <span>{item.name}</span>
                <span>{item.qty} × ₹{item.price} = ₹{item.total}</span>
                <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
              </li>
            ))}
          </ul>

          <h3>Grand Total: ₹{grandTotal}</h3>
          <button onClick={handleCheckout}>Checkout</button>
        </>
      )}
    </div>
  );
};

export default CartPage;
