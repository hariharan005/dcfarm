import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/CartPage.css";
import { getAllItems, clearCart, removeItem } from "../DB/CartDB";

const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  const loadCart = async () => {
    const items = await getAllItems();
    setCartItems(items);
  };

  useEffect(() => {
    loadCart();

    const handleCartChange = () => loadCart();
    window.addEventListener("cartChanged", handleCartChange);

    return () => window.removeEventListener("cartChanged", handleCartChange);
  }, []);

  const grandTotal = cartItems.reduce((sum, item) => sum + item.total, 0);

  const handleCheckout = async () => {
    await clearCart(); // clear cart from IndexedDB
    alert("Checkout successful!");
    navigate("/products"); // back to products
  };

  const handleRemoveItem = async (id) => {
    await removeItem(id); // remove single item
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
