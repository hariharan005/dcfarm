import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/ProductPage.css";
import { addOrUpdateItem, removeItem, getAllItems } from "../DB/CartDB";

const productsData = {
  Vegetables: [
    { id: 1, name: "Tomato", price: 40, unit: "kg", image: "https://via.placeholder.com/150" }, 
    { id: 2, name: "Onion", price: 35, unit: "kg", image: "https://via.placeholder.com/150" }, 
    { id: 3, name: "Carrot", price: 60, unit: "kg", image: "https://via.placeholder.com/150" },
  ], 
  Fruits: [
    { id: 4, name: "Apple", price: 180, unit: "kg", image: "https://via.placeholder.com/150" }, 
    { id: 5, name: "Banana", price: 60, unit: "dozen", image: "https://via.placeholder.com/150" },
  ], 
  Rices: [
    { id: 6, name: "Basmati Rice", price: 90, unit: "kg", image: "https://via.placeholder.com/150" }, 
    { id: 7, name: "Brown Rice", price: 120, unit: "kg", image: "https://via.placeholder.com/150" },
  ], 
  Millets: [
    { id: 8, name: "Ragi", price: 70, unit: "kg", image: "https://via.placeholder.com/150" }, 
    { id: 9, name: "Foxtail Millet", price: 85, unit: "kg", image: "https://via.placeholder.com/150" },
  ], 
  DairyProducts: [
    { id: 10, name: "Milk", price: 50, unit: "litre", image: "https://via.placeholder.com/150" }, 
    { id: 11, name: "Curd", price: 60, unit: "kg", image: "https://via.placeholder.com/150" },
  ], 
  Oils: [
    { id: 12, name: "Coconut Oil", price: 250, unit: "litre", image: "https://via.placeholder.com/150" }, 
    { id: 13, name: "Groundnut Oil", price: 230, unit: "litre", image: "https://via.placeholder.com/150" },
  ],
};

const ProductPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("Vegetables");
  const [cart, setCart] = useState([]);

  // Load cart from IndexedDB
  const loadCart = async () => {
    const items = await getAllItems();
    setCart(items);
  };

  useEffect(() => {
    loadCart();
    const handleCartChange = () => loadCart();
    window.addEventListener("cartChanged", handleCartChange);

    return () => {
      window.removeEventListener("cartChanged", handleCartChange);
    };
  }, []);

  const getQty = (id) => {
    const item = cart.find(i => i.id === id);
    return item ? item.qty : 0;
  };

  const handleIncrease = async (product) => {
    const existingItem = cart.find(i => i.id === product.id);
    if (existingItem) {
      const updatedItem = { ...existingItem, qty: existingItem.qty + 1, total: (existingItem.qty + 1) * product.price };
      await addOrUpdateItem(updatedItem);
    } else {
      const newItem = { ...product, qty: 1, total: product.price };
      await addOrUpdateItem(newItem);
    }
  };

  const handleDecrease = async (product) => {
    const existingItem = cart.find(i => i.id === product.id);
    if (!existingItem) return;

    if (existingItem.qty === 1) {
      await removeItem(product.id);
    } else {
      const updatedItem = { ...existingItem, qty: existingItem.qty - 1, total: (existingItem.qty - 1) * product.price };
      await addOrUpdateItem(updatedItem);
    }
  };

  const handleViewCart = () => navigate("/cart");

  // Mini cart summary
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="product-page">
      <div className="sidebar">
        <h2>Categories</h2>
        <ul>
          {Object.keys(productsData).map(category => (
            <li
              key={category}
              className={selectedCategory === category ? "active" : ""}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>

      <div className="products">
        <h2>{selectedCategory}</h2>
        <div className="product-grid">
          {productsData[selectedCategory].map(product => {
            const qty = getQty(product.id);
            return (
              <div key={product.id} className="product-card">
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <p>₹{product.price}/{product.unit}</p>
                <div className="quantity-controls">
                  <button onClick={() => handleDecrease(product)} disabled={qty === 0}>-</button>
                  <span>{qty}</span>
                  <button onClick={() => handleIncrease(product)}>+</button>
                </div>
                {qty > 0 && <p className="total">Total: ₹{qty * product.price}</p>}
              </div>
            );
          })}
        </div>

        {/* Mini cart summary */}
        <div className="mini-cart-summary">
          <p>Total Items: {totalItems}</p>
          <p>Total Price: ₹{totalPrice}</p>
        </div>

        <button
          className="checkout-btn"
          onClick={handleViewCart}
          disabled={cart.length === 0}
        >
          View Cart ({totalItems})
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
