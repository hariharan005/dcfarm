// src/pages/Admin/Orders.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../css/Admin/Orders.css";

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

  const handleAssignDelivery = (orderId) => {
    axios
      .post(
        "http://localhost:5000/api/admin/orders/assign-delivery",
        { orderId },
        { withCredentials: true }
      )
      .then((response) => {
        console.log("assign-delivery response:", response.data);
        alert(`🚚 Delivery successfully assigned for order #${orderId}`);
        fetchOrders();
      })
      .catch((error) => {
        console.error("Failed to assign delivery", error.response || error);
        const msg = error?.response?.data?.message || "Failed to assign delivery";
        alert(`❌ ${msg}`);
      });
  };

  return (
    <div className="orders-page">
      <h2 className="orders-title">📦 All Orders</h2>
      <p className="orders-subtitle">Auto-refreshes every 30s</p>

      {orders.length === 0 ? (
        <p className="no-orders">No orders found.</p>
      ) : (
        <div className="orders-grid">
          {orders.map((order) => (
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
                        {item.name} ({item.unit}) × {item.qty} = ₹{item.total}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="order-footer">
                <span className="order-total">₹{order.totalAmount}</span>
                <span className="order-date">{order.date}</span>
              </div>

              <div className="order-actions">
                <button
                  className="assign-btn"
                  onClick={() => handleAssignDelivery(order.id)}
                >
                  🚚 Assign Delivery
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
