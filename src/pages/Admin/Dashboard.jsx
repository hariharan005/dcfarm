import React from "react";  
import "../../css/Admin/AdminDashboard.css";
import {
  ShoppingCart,
  Package,
  Users,
  Truck,
  DollarSign,
} from "lucide-react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AdminDashboard = () => {
  const stats = [
    { label: "Total Products", value: 120, icon: <Package size={24} />, color: "stat-green" },
    { label: "New Orders Today", value: 35, icon: <ShoppingCart size={24} />, color: "stat-blue" },
    { label: "Revenue (This Month)", value: "₹85,000", icon: <DollarSign size={24} />, color: "stat-orange" },
    { label: "Active Deliveries", value: 18, icon: <Truck size={24} />, color: "stat-purple" },
    { label: "New Customers", value: 12, icon: <Users size={24} />, color: "stat-pink" },
  ];

  const recentOrders = [
    { id: "ORD123", customer: "Ravi Kumar", total: "₹1200", status: "Pending" },
    { id: "ORD124", customer: "Anjali Sharma", total: "₹650", status: "Shipped" },
    { id: "ORD125", customer: "Manoj Singh", total: "₹2200", status: "Delivered" },
  ];

  const lowStock = [
    { product: "Organic Tomatoes", stock: 5 },
    { product: "Fresh Carrots", stock: 2 },
    { product: "Green Spinach", stock: 0 },
  ];

  // 📊 Dummy chart data
  const salesData = [
    { month: "Jan", sales: 4000 },
    { month: "Feb", sales: 3000 },
    { month: "Mar", sales: 5000 },
    { month: "Apr", sales: 4500 },
    { month: "May", sales: 6000 },
    { month: "Jun", sales: 7000 },
    { month: "Jul", sales: 6500 },
  ];

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <h1>Welcome back, Hariharan 🌿</h1>
        <p>{new Date().toLocaleDateString()}</p>
      </header>

      {/* Stats Cards */}
      <section className="stats">
        {stats.map((s, i) => (
          <div key={i} className={`stat-card ${s.color}`}>
            <div className="stat-icon">{s.icon}</div>
            <div>
              <h3>{s.value}</h3>
              <p>{s.label}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Sales Chart */}
      <div className="card chart-card">
        <h2>Monthly Sales</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={salesData}>
            <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="sales" stroke="#16a34a" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Main Content */}
      <div className="dashboard-main">
        {/* Recent Orders */}
        <div className="card">
          <h2>Recent Orders</h2>
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((o, i) => (
                <tr key={i}>
                  <td>{o.id}</td>
                  <td>{o.customer}</td>
                  <td>{o.total}</td>
                  <td>
                    <span className={`status ${o.status.toLowerCase()}`}>{o.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Low Stock Alerts */}
        <div className="card">
          <h2>Low Stock Alerts</h2>
          <ul className="stock-list">
            {lowStock.map((p, i) => (
              <li key={i} className={p.stock === 0 ? "out" : "low"}>
                {p.product} — {p.stock} left
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
