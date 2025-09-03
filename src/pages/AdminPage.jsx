import React, { useState, useEffect } from "react";
import axios from "axios";

axios.defaults.withCredentials = true; // ✅ Allow cookies for sessions

const AdminPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [orders, setOrders] = useState([]);
  const [login, setLogin] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(true);

  // ✅ Check session when component mounts
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
      } finally {
        setLoading(false);
      }
    };
    checkSession();
  }, []);

  // ✅ Handle login
  const handleLogin = async () => {
    if (!login.username || !login.password) {
      alert("Please enter username and password");
      return;
    }
    try {
      const res = await axios.post("http://localhost:5000/api/admin/login", login);
      if (res.data.success) {
        setIsLoggedIn(true);
        fetchOrders();
      } else {
        alert("Invalid credentials");
      }
    } catch (err) {
      console.error("Login failed", err);
      alert("Login failed. Try again.");
    }
  };

  // ✅ Fetch orders
  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/orders");
      setOrders(res.data);
    } catch (err) {
      console.error("Failed to fetch orders", err);
      alert("Unauthorized. Please log in again.");
      setIsLoggedIn(false);
      setOrders([]);
    }
  };

  // ✅ Handle logout
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/admin/logout");
      setIsLoggedIn(false);
      setOrders([]);
      setLogin({ username: "", password: "" });
    } catch (err) {
      console.error("Logout failed", err);
      alert("Logout failed. Try again.");
    }
  };

  // ✅ Loading state
  if (loading) {
    return <p style={{ textAlign: "center", marginTop: 50 }}>Checking session...</p>;
  }

  // ✅ Login form
  if (!isLoggedIn) {
    return (
      <div style={{ maxWidth: 400, margin: "60px auto", textAlign: "center" }}>
        <h2>Admin Login</h2>
        <input
          placeholder="Username"
          value={login.username}
          onChange={(e) => setLogin({ ...login, username: e.target.value })}
          style={{ display: "block", margin: "10px auto", padding: "8px", width: "100%" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={login.password}
          onChange={(e) => setLogin({ ...login, password: e.target.value })}
          style={{ display: "block", margin: "10px auto", padding: "8px", width: "100%" }}
        />
        <button onClick={handleLogin} style={{ marginTop: 15, padding: "10px 20px" }}>
          Login
        </button>
      </div>
    );
  }

  // ✅ Orders dashboard
  return (
    <div style={{ maxWidth: 800, margin: "20px auto" }}>
      <h2>Admin Dashboard</h2>
      <button
        onClick={handleLogout}
        style={{ marginBottom: 20, padding: "8px 16px", cursor: "pointer" }}
      >
        Logout
      </button>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            style={{
              border: "1px solid #ccc",
              margin: "10px 0",
              padding: "10px",
              borderRadius: "5px",
              background: "#fafafa",
            }}
          >
            <p><b>Order ID:</b> {order.id}</p>
            <p><b>Name:</b> {order.customerName}</p>
            <p><b>Email:</b> {order.customerEmail}</p>
            <p><b>Total:</b> ₹{order.totalAmount}</p>
            <p><b>Date:</b> {order.date}</p>
            <p><b>Status:</b> {order.paymentStatus}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminPage;
