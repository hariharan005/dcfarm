import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CartPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cartItems = location.state?.cartItems || [];

  const grandTotal = cartItems.reduce((sum, item) => sum + item.total, 0);

  const handleCheckout = () => {
    alert("Proceeding to checkout...");
    navigate("/products"); // back to products after checkout
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
