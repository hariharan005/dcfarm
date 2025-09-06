// src/pages/Admin/Orders.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../css/Admin/Orders.css";

const Orders = ({ activeSection }) => {
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

  // ✅ Render badge based on status
  const renderStatus = (status) => {
    switch (status?.toLowerCase()) {
      case "success":
      case "paid":
        return <span className="status-badge status-paid">Paid</span>;
      case "pending":
        return <span className="status-badge status-pending">Pending</span>;
      case "packed":
        return <span className="status-badge status-packed">Packed</span>;
      case "shipped":
        return <span className="status-badge status-shipped">Shipped</span>;
      case "delivered":
        return <span className="status-badge status-delivered">Delivered</span>;
      case "cancelled":
        return <span className="status-badge status-cancelled">Cancelled</span>;
      case "failed":
        return <span className="status-badge status-failed">Failed</span>;
      default:
        return <span className="status-badge">{status || "Unknown"}</span>;
    }
  };

  // ✅ Decide filter from sidebar section
  const getFilter = () => {
    if (!activeSection) return "All Orders";

    // Handle submenus (Pending Orders, Cancelled Orders, etc.)
    if (activeSection.includes("Orders")) return activeSection;
    return "All Orders";
  };

  const filter = getFilter();

  // ✅ Filter logic
  const filteredOrders =
    filter === "All Orders"
      ? orders
      : orders.filter(
          (order) =>
            order.paymentStatus?.toLowerCase() ===
              filter.replace(" Orders", "").toLowerCase() ||
            order.status?.toLowerCase() ===
              filter.replace(" Orders", "").toLowerCase()
        );

  return (
    <div className="orders-page">
      <h2 className="orders-title">📦 {filter}</h2>
      <p className="orders-subtitle">Auto-refreshes every 30s</p>

      {filteredOrders.length === 0 ? (
        <p className="no-orders">No {filter.toLowerCase()} found.</p>
      ) : (
        <div className="orders-grid">
          {filteredOrders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <span className="order-id">#{order.id}</span>
                {renderStatus(order.paymentStatus)}
              </div>

              <div className="order-details">
                <p>
                  <b>Name:</b> {order.customerName}
                </p>
                <p>
                  <b>Email:</b> {order.customerEmail}
                </p>
                <p>
                  <b>Phone:</b> {order.customerPhone || "N/A"}
                </p>
                <p>
                  <b>Address:</b> {order.customerAddress || "N/A"}
                </p>
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
