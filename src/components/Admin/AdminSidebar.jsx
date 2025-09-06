import React, { useState } from "react";
import {
  Home,
  Package,
  ShoppingCart,
  Users,
  Truck,
  BarChart3,
  Megaphone,
  Settings,
  User,
  LogOut,
} from "lucide-react";
import "../../css/Admin/AdminSidebar.css"; // ✅ Make sure this path is correct

const AdminSidebar = ({ onNavigate, onLogout }) => {
  const [active, setActive] = useState("Dashboard");

  const menuItems = [
    { name: "Dashboard", icon: <Home size={18} /> },
    {
      name: "Products",
      icon: <Package size={18} />,
      children: ["All Products", "Add Product", "Categories", "Stock Management"],
    },
    {
      name: "Orders",
      icon: <ShoppingCart size={18} />,
      children: [
        "All Orders",
        "Pending Orders",
        "Packed Orders",
        "Shipped Orders",
        "Delivered Orders",
        "Cancelled Orders",
      ],
    },
    { name: "Customers", icon: <Users size={18} /> },
    {
      name: "Delivery",
      icon: <Truck size={18} />,
      children: ["Delivery Partners", "Assign Orders", "Delivery Tracking"],
    },
    {
      name: "Reports",
      icon: <BarChart3 size={18} />,
      children: ["Sales Report", "Revenue Report", "Top Products", "Payments"],
    },
    {
      name: "Marketing",
      icon: <Megaphone size={18} />,
      children: ["Coupons", "Send Notifications", "Loyalty Points"],
    },
    { name: "Settings", icon: <Settings size={18} /> },
    { name: "Profile", icon: <User size={18} /> },
    { name: "Logout", icon: <LogOut size={18} /> },
  ];

  return (
    <div className="admin-sidebar">
      <div className="admin-sidebar-header">Organic Admin</div>

      <nav>
        {menuItems.map((item, index) => (
          <div key={index}>
            <button
              className={active === item.name ? "active" : ""}
              onClick={() => {
                if (item.name === "Logout") {
                  if (onLogout) onLogout(); // 🔑 call handleLogout
                } else {
                  setActive(item.name);
                  if (onNavigate) onNavigate(item.name);
                }
              }}
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </button>

            {item.children && active === item.name && (
              <div className="submenu">
                {item.children.map((sub, i) => (
                  <button key={i} onClick={() => onNavigate(item.name, sub)}>
                    {sub}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default AdminSidebar;
