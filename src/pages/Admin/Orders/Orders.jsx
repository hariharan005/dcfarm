// src/pages/Admin/Orders.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../css/Admin/Orders.css";

// ✅ Configure axios
axios.defaults.baseURL = "https://dcfarm.onrender.com/api/admin";
axios.defaults.withCredentials = true;

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🔹 Fetch all orders
  const fetchOrders = async () => {
    try {
      const res = await axios.get("/orders");
      setOrders(res.data);
      setError("");
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      setError(
        err?.response?.data?.message || "Failed to fetch orders. Try logging in."
      );
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 30000); // auto-refresh every 30s
    return () => clearInterval(interval);
  }, []);

  // 🔹 Render payment/order status
  const renderStatus = (status) => {
    const s = (status || "").toLowerCase();
    switch (s) {
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

  // 🔹 Assign delivery
  const handleAssignDelivery = async (orderId) => {
    try {
      await axios.post("/orders/assign-delivery", { orderId });
      alert(`🚚 Delivery successfully assigned for order #${orderId}`);
      fetchOrders();
    } catch (err) {
      const msg = err?.response?.data?.message || "Failed to assign delivery";
      alert(`❌ ${msg}`);
    }
  };

  // 🔹 Group orders by date (YYYY-MM-DD)
  const groupedOrders = orders.reduce((groups, order) => {
    const dateKey = new Date(order.date).toISOString().split("T")[0];
    if (!groups[dateKey]) groups[dateKey] = [];
    groups[dateKey].push(order);
    return groups;
  }, {});

  // 🔹 Grand total
  const grandTotal = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  if (loading) return <p className="loading-text">Loading orders...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="orders-page">
      <h2 className="orders-title">📦 All Orders</h2>
      <p className="orders-subtitle">Auto-refreshes every 30s</p>

      {/* Grand total */}
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
            const totalRevenue = ordersForDate.reduce(
              (sum, o) => sum + (o.totalAmount || 0),
              0
            );

            return (
              <div key={dateKey} className="orders-by-date">
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
