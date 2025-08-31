import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
};

const ProductPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("Vegetables");
  const [cart, setCart] = useState([]);
  const [quantities, setQuantities] = useState({});

  // Load cart & quantities from localStorage on mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCart(storedCart);

    const initialQuantities = {};
    storedCart.forEach(item => {
      initialQuantities[item.id] = item.qty;
    });
    setQuantities(initialQuantities);
  }, []);

  // Update localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cart));
  }, [cart]);

  const handleIncrease = (product) => {
    const newQty = (quantities[product.id] || 0) + 1;
    setQuantities({ ...quantities, [product.id]: newQty });

    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, qty: newQty, total: newQty * item.price } : item
      ));
    } else {
      setCart([...cart, { ...product, qty: 1, total: product.price }]);
    }
  };

  const handleDecrease = (product) => {
    const currentQty = quantities[product.id] || 0;
    if (currentQty <= 0) return;

    const newQty = currentQty - 1;
    setQuantities({ ...quantities, [product.id]: newQty });

    if (newQty === 0) {
      setCart(cart.filter(item => item.id !== product.id));
    } else {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, qty: newQty, total: newQty * item.price } : item
      ));
    }
  };

  const handleViewCart = () => navigate("/cart");

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
            const qty = quantities[product.id] || 0;
            return (
              <div key={product.id} className="product-card">
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <p>₹{product.price}/{product.unit}</p>
                <div className="quantity-controls">
                  <button onClick={() => handleDecrease(product)}>-</button>
                  <span>{qty}</span>
                  <button onClick={() => handleIncrease(product)}>+</button>
                </div>
                {qty > 0 && <p className="total">Total: ₹{qty * product.price}</p>}
              </div>
            );
          })}
        </div>

        <button
          className="checkout-btn"
          onClick={handleViewCart}
          disabled={cart.length === 0}
        >
          View Cart ({cart.length})
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
