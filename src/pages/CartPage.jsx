import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/CartPage.css";
import { getAllItems, removeItem, addOrUpdateItem } from "../DB/CartDB";

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
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    //alert("Checkout successful!");
    console.log("Proceeding to checkout with items:", cartItems);
    navigate("/checkout", { state: { cartItems, grandTotal } });
  };

  const handleRemoveItem = async (id) => {
    await removeItem(id);
    loadCart();
  };

  const handleIncrease = async (id) => {
    const item = cartItems.find((i) => i.id === id);
    if (item) {
      await addOrUpdateItem({ ...item, qty: item.qty + 1, total: (item.qty + 1) * item.price });
      loadCart();
    }
  };

  const handleDecrease = async (id) => {
    const item = cartItems.find((i) => i.id === id);
    if (item && item.qty > 1) {
      await addOrUpdateItem({ ...item, qty: item.qty - 1, total: (item.qty - 1) * item.price });
    } else {
      await removeItem(id);
    }
    loadCart();
  };

  return (
    <div className="cart-page">
      <h2>🛒 Your Cart1</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is emptythis page only1</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                <span>{item.name}</span>
                <span>
                  <button onClick={() => handleDecrease(item.id)}>-</button>
                  <span style={{ margin: "0 6px" }}>{item.qty}</span>
                  <button onClick={() => handleIncrease(item.id)}>+</button>
                  × ₹{item.price} = ₹{item.total}
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
