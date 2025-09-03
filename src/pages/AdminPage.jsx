import React, { useState, useEffect } from "react";
import axios from "axios";

axios.defaults.withCredentials = true; // ✅ allow cookies for sessions

const AdminPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [orders, setOrders] = useState([]);
  const [login, setLogin] = useState({ username: "", password: "" });

  // ✅ Check session on page load
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/check");
        if (res.data.loggedIn) {
          setIsLoggedIn(true);
          fetchOrders();
        }
      } catch (err) {
        console.log("Session check failed", err);
      }
    };
    checkSession();
  }, []);

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/admin/login", login);
      if (res.data.success) {
        setIsLoggedIn(true);
        fetchOrders();
      }
    } catch {
      alert("Invalid credentials");
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/orders");
      setOrders(res.data);
    } catch {
      alert("Unauthorized. Please log in again.");
      setIsLoggedIn(false);
      setOrders([]);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/admin/logout");
      setIsLoggedIn(false);
      setOrders([]);
      window.location.reload(); // force reload to clear any cached data
    } catch {
      alert("Logout failed");
    }
  };

  if (!isLoggedIn) {
    return (
      <div style={{ maxWidth: 400, margin: "40px auto", textAlign: "center" }}>
        <h2>Admin Login</h2>
        <input
          placeholder="Username"
          value={login.username}
          onChange={(e) => setLogin({ ...login, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={login.password}
          onChange={(e) => setLogin({ ...login, password: e.target.value })}
        />
        <button onClick={handleLogin} style={{ marginTop: 10 }}>
          Login
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 600, margin: "20px auto" }}>
      <h2>Orders</h2>
      <button onClick={handleLogout} style={{ marginBottom: 20 }}>
        Logout
      </button>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}
          >
            <p>
              <b>Order ID:</b> {order.id}
            </p>
            <p>
              <b>Name:</b> {order.customerName}
            </p>
            <p>
              <b>Email:</b> {order.customerEmail}
            </p>
            <p>
              <b>Total:</b> ₹{order.totalAmount}
            </p>
            <p>
              <b>Date:</b> {order.date}
            </p>
            <p>
              <b>Status:</b> {order.paymentStatus}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminPage;
