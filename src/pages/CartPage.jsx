import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/CartPage.css";

const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedCart);
  }, []);

  const grandTotal = cartItems.reduce((sum, item) => sum + item.total, 0);

  const handleCheckout = () => {
    alert("Proceeding to checkout...");
    localStorage.removeItem("cartItems"); // clear after checkout
    setCartItems([]); // reset state
    navigate("/products");
  };

  return (
    <div className="cart-page">
      <h2>🛒 Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                <span>{item.name}</span>
                <span>
                  {item.qty} × ₹{item.price} = ₹{item.total}
                </span>
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
