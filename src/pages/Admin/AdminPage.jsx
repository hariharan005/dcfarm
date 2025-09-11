import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminSidebar from "../../components/Admin/AdminSidebar";
import "../../css/Admin/AdminPage.css";
import AdminDashboard from "./Dashboard/Dashboard";
import AdminProfile from "./ProfileAndAuth";
import AdminSettings from "./Settings";
import CustomersData from "./Customers";
// Products menu and sub menu
import Products from "./Products/Products";
import AddProduct from "./Products/AddProduct";
import Categories from "./Products/Categories";
import StockManagement from "./Products/StockManagement";
// Orders menu and sub menu
import Orders from "./Orders/Orders";
import PendingOrders from "./Orders/PendingOrder";
import PackedOrder from "./Orders/PackedOrder";
import ShippedOrders from "./Orders/ShippedOrder";
import DeliveredOrders from "./Orders/DeliveredOrder";  
import CancelledOrders from "./Orders/CancelledOrder";
// Delivery menu and sub menu
import Delivery from "./Delivery/Delivery";
import DeliveryPartners from "./Delivery/DeliveryPartners";
import AssignedOrder from "./Delivery/AssignedOrder";
import DeliveryTracking from "./Delivery/DeliveryTracking";
// Marketing menu and sub menu
import Marketing from "./Marketing/Marketing";
import Coupons from "./Marketing/Coupons";
import LoyaltyPoint from "./Marketing/LoyaltyPoint";
import Notification from "./Marketing/SendNotification";


const AdminPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [login, setLogin] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [activeSub, setActiveSub] = useState(""); // ✅ Track submenu click

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await axios.get("/api/admin/check");
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
      const res = await axios.post("/api/admin/login", login);
      if (res.data.success) setIsLoggedIn(true);
      else alert("Invalid credentials");
    } catch (err) {
      console.error("Login failed", err);
      alert("Login failed. Try again.");
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("/api/admin/logout");
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

        {/* Product Section with submenu*/}
        {activeSection === "Products" && (
          <>
            {activeSub === "Add Product" && <AddProduct />}
            {activeSub === "Categories" && <Categories />}
            {activeSub === "Stock Management" && <StockManagement />}
            {!activeSub && <Products />} {/* default Products page */}
          </>
        )}

        {/* Order Section with submenu*/}
        {activeSection === "Orders" && (
          <>
            {activeSub === "Pending Orders" && <PendingOrders />}
            {activeSub === "Packed Orders" && <PackedOrder />}
            {activeSub === "Shipped Orders" && <ShippedOrders />}
            {activeSub === "Delivered Orders" && <DeliveredOrders />}
            {activeSub === "Cancelled Orders" && <CancelledOrders />}
            {!activeSub && <Orders />} {/* default Orders page */}
          </>
        )}

        {/* Delivery Section with submenu*/}
        {activeSection === "Delivery" && (
          <>
            {activeSub === "Assign Orders" && <AssignedOrder />}
            {activeSub === "Delivery Partners" && <DeliveryPartners />}
            {activeSub === "Delivery Tracking" && <DeliveryTracking />}
            {!activeSub && <Delivery />} {/* default Orders page */}
          </>
        )}

        {/* Marketing section with submenus */}
        {activeSection === "Marketing" && (
          <>
            {activeSub === "Coupons" && <Coupons />}
            {activeSub === "Send Notifications" && <Notification />}
            {activeSub === "Loyalty Points" && <LoyaltyPoint />}
            {!activeSub && <Marketing />} {/* default Marketing page */}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminPage;