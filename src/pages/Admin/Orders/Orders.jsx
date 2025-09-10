// src/pages/Admin/Orders.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../css/Admin/Orders.css";

// Configure axios to send cookies with requests
axios.defaults.baseURL = process.env.REACT_APP_API_URL || "https://dcfarm.onrender.com"; // Update if backend is hosted elsewhere
axios.defaults.withCredentials = true;

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("/api/orders/admin/orders");
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
      case "delivery":
        return <span className="status-badge status-delivered">Delivered</span>;
      case "cancelled":
        return <span className="status-badge status-cancelled">Cancelled</span>;
      case "failed":
        return <span className="status-badge status-failed">Failed</span>;
      default:
        return <span className="status-badge">{status || "Unknown"}</span>;
    }
  };

  const handleAssignDelivery = (orderId) => {
    axios
      .post(
        "/api/admin/orders/assign-delivery",
        { orderId },
      )
      .then(() => {
        alert(`🚚 Delivery successfully assigned for order #${orderId}`);
        fetchOrders();
      })
      .catch((error) => {
        const msg = error?.response?.data?.message || "Failed to assign delivery";
        alert(`❌ ${msg}`);
      });
  };

  // 🔹 Group orders by date only (normalize to YYYY-MM-DD)
  const groupedOrders = orders.reduce((groups, order) => {
    const dateKey = new Date(order.date).toISOString().split("T")[0];
    if (!groups[dateKey]) groups[dateKey] = [];
    groups[dateKey].push(order);
    return groups;
  }, {});

  // 🔹 Grand total across all dates
  const grandTotal = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  return (
    <div className="orders-page">
      <h2 className="orders-title">📦 All Orders</h2>
      <p className="orders-subtitle">Auto-refreshes every 30s</p>

      {/* 🔹 Grand Total Summary */}
      <div className="grand-total-box">
        <h3>
          🏆 Grand Total: ₹{grandTotal} ({orders.length}{" "}
          {orders.length === 1 ? "order" : "orders"})
        </h3>
      </div>

      {orders.length === 0 ? (
        <p className="no-orders">No orders found.</p>
      ) : (
        Object.entries(groupedOrders)
          .sort(([a], [b]) => new Date(b) - new Date(a)) // latest first
          .map(([dateKey, ordersForDate]) => {
            // Calculate total revenue for this date
            const totalRevenue = ordersForDate.reduce(
              (sum, o) => sum + (o.totalAmount || 0),
              0
            );

            return (
              <div key={dateKey} className="orders-by-date">
                {/* Heading with date, count, and total revenue */}
                <h3 className="order-date-heading">
                  📅{" "}
                  {new Date(dateKey).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}{" "}
                  ({ordersForDate.length}{" "}
                  {ordersForDate.length > 1 ? "orders" : "order"}) | 💰 Total:
                  ₹{totalRevenue}
                </h3>

                <div className="orders-grid">
                  {ordersForDate.map((order) => (
                    <div key={order._id} className="order-card">
                      <div className="order-header">
                        <span className="order-id">#{order._id.slice(-6)}</span>
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

                        <div className="order-items">
                          <b>Items:</b>
                          <ul>
                            {order.items?.map((item) => (
                              <li key={item.id}>
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  style={{ width: "40px", marginRight: "8px" }}
                                />
                                {item.name} ({item.unit}) × {item.qty} = ₹
                                {item.total}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="order-footer">
                        <span className="order-total">₹{order.totalAmount}</span>
                        <span className="order-time">
                          {new Date(order.date).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>

                      <div className="order-actions">
                        <button
                          className="assign-btn"
                          onClick={() => handleAssignDelivery(order._id)}
                        >
                          🚚 Assign Delivery
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })
      )}
    </div>
  );
};

export default Orders;