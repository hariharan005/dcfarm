import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminSidebar from "../../components/Admin/AdminSidebar";
import "../../css/Admin/AdminPage.css";
import AdminDashboard from "./Dashboard";
import AdminProfile from "./ProfileAndAuth"; // ✅ Import the Profile component
import AdminSettings from "./Settings"; // ✅ Import the Settings component
import CustomersData from "./Customers"; // ✅ Import the Customers component

// Configure axios to send cookies with requests
axios.defaults.withCredentials = true;

const AdminPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [login, setLogin] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [activeSection, setActiveSection] = useState("Dashboard");

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/check");
        if (res.data.loggedIn) {
          setIsLoggedIn(true);
        }
      } catch (err) {
        console.log("Session check failed", err);
      } finally {
        setLoading(false);
      }
    };
    checkSession();
  }, []);

  const handleLogin = async () => {
    if (!login.username || !login.password) {
      alert("Please enter username and password");
      return;
    }
    try {
      const res = await axios.post("http://localhost:5000/api/admin/login", login);
      if (res.data.success) {
        setIsLoggedIn(true);
      } else {
        alert("Invalid credentials");
      }
    } catch (err) {
      console.error("Login failed", err);
      alert("Login failed. Try again.");
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/admin/logout");
      setIsLoggedIn(false);
      setLogin({ username: "", password: "" });
    } catch (err) {
      console.error("Logout failed", err);
      alert("Logout failed. Try again.");
    }
  };

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

  // ✅ Auto-fetch orders every 30s when "Orders" section is active
  useEffect(() => {
    let interval;
    if (activeSection === "Orders") {
      fetchOrders(); // fetch immediately
      interval = setInterval(fetchOrders, 30000); // fetch every 30s
    }
    return () => {
      if (interval) clearInterval(interval); // cleanup when leaving Orders
    };
  }, [activeSection]);

  if (loading) {
    return <p className="loading-text">Checking session...</p>;
  }

  if (!isLoggedIn) {
    return (
      <div className="login-container">
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
        <button type="submit" onClick={handleLogin}>Login</button>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <AdminSidebar onNavigate={(section) => setActiveSection(section)} onLogout={handleLogout} />

      {/* Main Content */}
      <div className="admin-main">
        <div className="admin-header">
          <h2>{activeSection}</h2>
        </div>

        {/* ✅ Render content based on active section */}
        {activeSection === "Dashboard" && <AdminDashboard />}

        {activeSection === "Customers" && <CustomersData />}

        {activeSection === "Settings" && <AdminSettings />}
        {/* ✅ Render content based on active section */}
        {activeSection === "Profile" && <AdminProfile />}

        {activeSection === "Orders" && (
          <div>
            <h3>Orders List (auto-refresh every 30s)</h3>
            {orders.length === 0 ? (
              <p>No orders found.</p>
            ) : (
              orders.map((order) => (
                <div key={order.id} className="order-card">
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
        )}
      </div>
    </div>
  );
};

export default AdminPage;
