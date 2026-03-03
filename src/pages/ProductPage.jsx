import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/ProductPage.css";
import { addOrUpdateItem, removeItem, getAllItems } from "../DB/CartDB";
import tomato from "../assets/images/Blog/tomato.jpg"
import onion from "../assets/images/Blog/onion.jpg"
import brinjal from "../assets/images/Blog/brinjal.jpg"
import ladiesfinger from "../assets/images/Blog/ladiesfinger.jpg"
import greenchilli from "../assets/images/Blog/greenchilli.jpg"
import potato from "../assets/images/Blog/potato.jpg"
import coriander from "../assets/images/Blog/coriander.jpg"
import radish from "../assets/images/Blog/radish.jpg"
import pumpkin from "../assets/images/Blog/pumpkin.jpg"
import cucumber from "../assets/images/Blog/cucumber.jpg"
import bittergourd from "../assets/images/Blog/bittergourd.jpg"

// Fallback image URL
import fallbackImage from "../assets/images/Blog/comingsoon.png";


const productsData = {
  Vegetables: [
    { id: 'Veg_1', name: "Tomato", price: 40, unit: "Kg", image: tomato },
    { id: 'Veg_2', name: "Onion", price: 60, unit: "Kg", image: onion },
    { id: 'Veg_3', name: "Brinjal Blue", price: 45, unit: "Kg", image: brinjal },
    { id: 'Veg_4', name: "Brinjal Green", price: 70, unit: "Kg", image: brinjal },
    { id: 'Veg_5', name: "Brinjal offwhite Blue", price: 60, unit: "Kg", image: brinjal },
    { id: 'Veg_6', name: "Ladies Finger", price: 35, unit: "Kg", image: ladiesfinger },
    { id: 'Veg_7', name: "Green Chilli", price: 10, unit: "200G", image: greenchilli },
    { id: 'Veg_8', name: "Bitter Gourd", price: 30, unit: "Kg", image: bittergourd },
    { id: 'Veg_9', name: "Ridge Gourd", price: 50, unit: "Kg", image:  "https://via.placeholder.com/150" },
    { id: 'Veg_10', name: "Snake Gourd", price: 30, unit: "Kg", image: "https://via.placeholder.com/150" },
    { id: 'Veg_11', name: "Bottle Gourd", price: 25, unit: "Kg", image: "https://via.placeholder.com/150" },
    { id: 'Veg_12', name: "Ash Gourd", price: 20, unit: "Kg", image: "https://via.placeholder.com/150" },
    { id: 'Veg_13', name: "Potatoes", price: 30, unit: "Kg", image: potato },
    { id: 'Veg_14', name: "Beans", price: 35, unit: "Kg", image: "https://via.placeholder.com/150" },
    { id: 'Veg_15', name: "Peas", price: 80, unit: "Kg", image: "https://via.placeholder.com/150" },
    { id: 'Veg_16', name: "Drumstick", price: 70, unit: "Kg", image: "https://via.placeholder.com/150" },
    { id: 'Veg_17', name: "Curry Leaves", price: 20, unit: "Bunch", image: "https://via.placeholder.com/150" },
    { id: 'Veg_18', name: "Coriander", price: 20, unit: "Bunch", image: coriander},
    { id: 'Veg_19', name: "Mint", price: 20, unit: "Bunch", image: "https://via.placeholder.com/150" },
    { id: 'Veg_20', name: "Banana Raw", price: 30, unit: "Kg", image: "https://via.placeholder.com/150" },
    { id: 'Veg_21', name: "Banana Flower", price: 15, unit: "Piece", image: "https://via.placeholder.com/150" },
    { id: 'Veg_22', name: "Banana Stem", price: 15, unit: "Piece", image: "https://via.placeholder.com/150" },
    { id: 'Veg_23', name: "Banana Leaf", price: 2, unit: "Piece", image: "https://via.placeholder.com/150" },
    { id: 'Veg_24', name: "Radish", price: 20, unit: "Kg", image: radish },
    { id: 'Veg_25', name: "Tapioca", price: 40, unit: "Kg", image: "https://via.placeholder.com/150" },
    { id: 'Veg_26', name: "Spinach Greens", price: 25, unit: "Bunch", image: "https://via.placeholder.com/150" },
    { id: 'Veg_27', name: "Pumpkin", price: 40, unit: "Kg", image: pumpkin },
    { id: 'Veg_28', name: "Karunai Kizhangu", price: 50, unit: "Kg", image: "https://via.placeholder.com/150" },
    { id: 'Veg_29', name: "Senai Kizhangu", price: 40, unit: "Kg", image: "https://via.placeholder.com/150" },
    { id: 'Veg_30', name: "Seppan Kizhangu", price: 45, unit: "Kg", image: "https://via.placeholder.com/150" },
    { id: 'Veg_31', name: "Cucumber", price: 15, unit: "Kg", image: cucumber},
    { id: 'Veg_32', name: "Sundaikai", price: 5, unit: "250G", image: "https://via.placeholder.com/150" },
  ],

  Eggs: [
    { id: 'Egg_1', name: "Naatu Kozhi", price: 15, unit: "Piece", image: "https://via.placeholder.com/150" },
    { id: 'Egg_2', name: "Duck", price: 10, unit: "Piece", image: "https://via.placeholder.com/150" },
    { id: 'Egg_3', name: "Kaadai", price: 5, unit: "Piece", image: "https://via.placeholder.com/150" },
    { id: 'Egg_4', name: "Turkey", price: 20, unit: "Piece", image: "https://via.placeholder.com/150" },
  ],

  Millets: [
    { id: 'Mil_1', name: "Kelvaragu", price: 69, unit: "Kg", image: "https://via.placeholder.com/150" },
    { id: 'Mil_2', name: "Kambu", price: 69, unit: "Kg", image: "https://via.placeholder.com/150" },
    { id: 'Mil_3', name: "Thinai", price: 69, unit: "Kg", image: "https://via.placeholder.com/150" },
    { id: 'Mil_4', name: "Saamai", price: 69, unit: "Kg", image: "https://via.placeholder.com/150" },
    { id: 'Mil_5', name: "Varagu", price: 69, unit: "Kg", image: "https://via.placeholder.com/150" },
    { id: 'Mil_6', name: "Kuthiravali", price: 69, unit: "Kg", image: "https://via.placeholder.com/150" },
  ],

  Cereals: [
    { id: 'Cer_1', name: "Ellu White", price: 249, unit: "Kg", image: "https://via.placeholder.com/150" },
    { id: 'Cer_2', name: "Ellu Black", price: 299, unit: "Kg", image: "https://via.placeholder.com/150" },
  ],

  Pulses: [
    { id: 'Puls_1', name: "Corn", price: 20, unit: "Piece", image: "https://via.placeholder.com/150" },
    { id: 'Puls_2', name: "Groundnuts", price: 299, unit: "Kg", image: "https://via.placeholder.com/150" },
    { id: 'Puls_3', name: "Pachai Payiru", price: 150, unit: "Kg", image: "https://via.placeholder.com/150" },
    { id: 'Puls_4', name: "Ulundhu Black", price: 100, unit: "Kg", image: "https://via.placeholder.com/150" },
    { id: 'Puls_5', name: "Ulundhu White", price: 150, unit: "Kg", image: "https://via.placeholder.com/150" },
  ],

  Spices: [
    { id: 'Spi_1', name: "Dry Chilli Long", price: 249, unit: "Kg", image: "https://via.placeholder.com/150" },
    { id: 'Spi_2', name: "Dry Chilli Gundu", price: 399, unit: "Kg", image: "https://via.placeholder.com/150" },
  ],

  Oils: [
    { id: 'Oil_1', name: "Groundnut Oil", price: 300, unit: "Ltr", image: "https://via.placeholder.com/150" },
    { id: 'Oil_2', name: "Sunflower Oil", price: 200, unit: "Ltr", image: "https://via.placeholder.com/150" },
    { id: 'Oil_3', name: "Gingelly Oil", price: 400, unit: "Ltr", image: "https://via.placeholder.com/150" },
  ],

  Fruits: [
    { id: 'Fru_1', name: "Papaya", price: 29, unit: "Kg", image: "https://via.placeholder.com/150" },
    { id: 'Fru_2', name: "Banana", price: 89, unit: "Kg", image: "https://via.placeholder.com/150" },
    { id: 'Fru_3', name: "Mango", price: 199, unit: "Kg", image: "https://via.placeholder.com/150" },
    { id: 'Fru_4', name: "Guava", price: 79, unit: "Kg", image: "https://via.placeholder.com/150" },
    { id: 'Fru_5', name: "Sapota", price: 99, unit: "Kg", image: "https://via.placeholder.com/150" },
    { id: 'Fru_6', name: "Muskmelon", price: 39, unit: "Kg", image: "https://via.placeholder.com/150" },
    { id: 'Fru_7', name: "Watermelon", price: 29, unit: "Kg", image: "https://via.placeholder.com/150" },
    { id: 'Fru_8', name: "Dragon Fruit", price: 49, unit: "Kg", image: "https://via.placeholder.com/150" },
    { id: 'Fru_9', name: "JackFruit", price: 49, unit: "Kg", image: "https://via.placeholder.com/150" },
  ],

  Dairy: [
    { id: 'Dairy_1', name: "Milk", price: 50, unit: "Ltr", image: "https://via.placeholder.com/150" },
    { id: 'Dairy_2', name: "Curd", price: 19.75, unit: "250G", image: "https://via.placeholder.com/150" },
    { id: 'Dairy_3', name: "ButterMilk", price: 20, unit: "200G", image: "https://via.placeholder.com/150" },
    { id: 'Dairy_4', name: "Butter", price: 125, unit: "500G", image: "https://via.placeholder.com/150" },
    { id: 'Dairy_5', name: "Ghee", price: 200, unit: "500G", image: "https://via.placeholder.com/150" },
  ],

  ValueAdded: [
    { id: 'ValAd_1', name: "Sundaikai Vathal", price: 48, unit: "500G", image: "https://via.placeholder.com/150" },
    { id: 'ValAd_2', name: "Kothavarangai Vathal", price: 48, unit: "500G", image: "https://via.placeholder.com/150" },
    { id: 'ValAd_3', name: "Vendai Vathal", price: 48, unit: "500G", image: "https://via.placeholder.com/150" },
    { id: 'ValAd_4', name: "Pakar Vathal", price: 48, unit: "500G", image: "https://via.placeholder.com/150" },
    { id: 'ValAd_5', name: "Milagai Vathal", price: 48, unit: "500G", image: "https://via.placeholder.com/150" },
    { id: 'ValAd_6', name: "Mango Pickle", price: 55, unit: "250G", image: "https://via.placeholder.com/150" },
    { id: 'ValAd_7', name: "Lemon Pickle", price: 45, unit: "250G", image: "https://via.placeholder.com/150" },
    { id: 'ValAd_8', name: "Mixed Pickle", price: 60, unit: "250G", image: "https://via.placeholder.com/150" },
  ],

  PongalProducts: [
    { id: 'PongProd_1', name: "Manjal Kizhangu", price: 20, unit: "2 Plant", image: "https://via.placeholder.com/150" },
    { id: 'PongProd_2', name: "Sugarcane", price: 79, unit: "2 Full Size", image: "https://via.placeholder.com/150" },
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


  // Image handler to use fallback image on error
  const handleImageError = (e) => {
    e.target.src = fallbackImage;
  };

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
        <h2 className="Selcat">{selectedCategory}</h2>
        <div className="product-grid">
          {productsData[selectedCategory].map(product => {
            const qty = getQty(product.id);
            return (
              <div key={product.id} className="product-card">
                <img src={product.image || fallbackImage} alt={product.name} onError={handleImageError} loading="lazy"/>
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
