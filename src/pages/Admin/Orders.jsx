// src/pages/Admin/Orders.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../css/Admin/Orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/orders");
      setOrders(res.data);
    } catch (err) {
      console.error("Failed to fetch orders", err);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="orders-page">
      <h2 className="orders-title">📦 Orders List</h2>
      <p className="orders-subtitle">Auto-refreshes every 30s</p>

      {orders.length === 0 ? (
        <p className="no-orders">No orders found.</p>
      ) : (
        <div className="orders-grid">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <span className="order-id">#{order.id}</span>
                <span
                  className={`status-badge ${
                    order.paymentStatus === "Paid"
                      ? "status-paid"
                      : "status-pending"
                  }`}
                >
                  {order.paymentStatus || "Pending"}
                </span>
              </div>

              <div className="order-details">
                <p><b>Name:</b> {order.customerName}</p>
                <p><b>Email:</b> {order.customerEmail}</p>
                <p><b>Phone:</b> {order.customerPhone || "N/A"}</p>
                <p><b>Address:</b> {order.customerAddress || "N/A"}</p>
              </div>

              <div className="order-footer">
                <span className="order-total">₹{order.totalAmount}</span>
                <span className="order-date">{order.date}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
