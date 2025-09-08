import React, { useEffect, useState } from "react";
import axios from "axios";

const Delivery = () => {
  const [deliveryOrders, setDeliveryOrders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/admin/orders")
      .then(res => {
        const deliveryOnly = res.data.filter(
          o => o.status?.toLowerCase() === "delivery" // make sure backend sets this
        );
        setDeliveryOrders(deliveryOnly);
      })
      .catch(err => console.error("Failed to fetch delivery orders", err));
  }, []);

  return (
    <div>
      <h2>🚚 Delivery Orders</h2>
      {deliveryOrders.length === 0 ? (
        <p>No orders assigned for delivery.</p>
      ) : (
        <div className="orders-grid">
          {deliveryOrders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <span className="order-id">#{order.id}</span>
                <span className="status-badge status-delivery">Delivery</span>
              </div>
              <div className="order-details">
                <p><b>Name:</b> {order.customerName}</p>
                <p><b>Email:</b> {order.customerEmail}</p>
                <p><b>Phone:</b> {order.customerPhone || "N/A"}</p>
                <p><b>Address:</b> {order.customerAddress || "N/A"}</p>
                <div className="order-items">
                  <b>Items:</b>
                  <ul>
                    {order.items?.map((item) => (
                      <li key={item.id}>
                        <img src={item.image} alt={item.name} style={{ width: "40px", marginRight: "8px" }} />
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Delivery;
