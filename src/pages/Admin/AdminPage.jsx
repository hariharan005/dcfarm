import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminSidebar from "../../components/Admin/AdminSidebar";
import "../../css/Admin/AdminPage.css";
import AdminDashboard from "./Dashboard";
import AdminProfile from "./ProfileAndAuth";
import AdminSettings from "./Settings";
import CustomersData from "./Customers";
import Orders from "./Orders";
import ProductPage from "./Products";

axios.defaults.withCredentials = true;

const AdminPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [login, setLogin] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [activeSub, setActiveSub] = useState(""); // ✅ Track submenu click

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/check");
        if (res.data.loggedIn) setIsLoggedIn(true);
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
      if (res.data.success) setIsLoggedIn(true);
      else alert("Invalid credentials");
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

  if (loading) return <p className="loading-text">Checking session...</p>;

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
      <AdminSidebar
        activeSection={activeSection}
        activeSub={activeSub}
        onNavigate={(name, sub = "") => {
          setActiveSection(name);
          setActiveSub(sub);
        }}
        onLogout={handleLogout}
      />

      <div className="admin-main">
        <div className="admin-header">
          {/* ✅ Show section and sub clearly */}
          <h2>
            {activeSection}
            {activeSub ? ` › ${activeSub}` : ""}
          </h2>
        </div>

        {/* ✅ Render pages based on section */}
        {activeSection === "Dashboard" && <AdminDashboard />}
        {activeSection === "Customers" && <CustomersData />}
        {activeSection === "Settings" && <AdminSettings />}
        {activeSection === "Profile" && <AdminProfile />}
        {activeSection === "Orders" && (
          <Orders filter={activeSub || "All Orders"} />
        )}
        {activeSection === "Products" && <ProductPage />}
      </div>
    </div>
  );
};

export default AdminPage;
