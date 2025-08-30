import React, { useState } from "react";
import "../css/ProductPage.css";

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
  "Dairy Products": [
    { id: 10, name: "Milk", price: 50, unit: "litre", image: "https://via.placeholder.com/150" },
    { id: 11, name: "Curd", price: 60, unit: "kg", image: "https://via.placeholder.com/150" },
  ],
  Oils: [
    { id: 12, name: "Coconut Oil", price: 250, unit: "litre", image: "https://via.placeholder.com/150" },
    { id: 13, name: "Groundnut Oil", price: 230, unit: "litre", image: "https://via.placeholder.com/150" },
  ],
};

const ProductPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("Vegetables");
  const [quantities, setQuantities] = useState({});

  const handleIncrease = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleDecrease = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] > 0 ? prev[id] - 1 : 0,
    }));
  };

  // Build cart items
  const cartItems = [];
  for (let category in productsData) {
    for (let product of productsData[category]) {
      const qty = quantities[product.id] || 0;
      if (qty > 0) {
        cartItems.push({
          ...product,
          qty,
          total: qty * product.price,
        });
      }
    }
  }
  const grandTotal = cartItems.reduce((sum, item) => sum + item.total, 0);

  const handleCheckout = () => {
    alert("Proceeding to checkout... (this can be connected to payment/order API)");
  };

  return (
    <div className="product-page">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Categories</h2>
        <ul>
          {Object.keys(productsData).map((category) => (
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

      {/* Products */}
      <div className="products">
        <h2>{selectedCategory}</h2>
        <div className="product-grid">
          {productsData[selectedCategory].map((product) => {
            const qty = quantities[product.id] || 0;
            const totalPrice = qty * product.price;

            return (
              <div key={product.id} className="product-card">
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <p>₹{product.price}/{product.unit}</p>

                <div className="quantity-controls">
                  <button onClick={() => handleDecrease(product.id)}>-</button>
                  <span>{qty}</span>
                  <button onClick={() => handleIncrease(product.id)}>+</button>
                </div>

                {qty > 0 && <p className="total">Total: ₹{totalPrice}</p>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Cart */}
      <div className="cart">
        <h2>🛒 Cart</h2>
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
            <h3 className="grand-total">Grand Total: ₹{grandTotal}</h3>
            <button
              className="checkout-btn"
              onClick={handleCheckout}
              disabled={cartItems.length === 0}
            >
              Checkout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
