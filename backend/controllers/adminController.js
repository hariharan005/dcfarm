const path = require("path");
const { readJSON, writeJSON } = require("../utils/fileUtils");
const { ADMIN_USER, ADMIN_PASS } = require("../config/config");

const adminFile = path.join(__dirname, "../data/admin.json");
const ordersFile = path.join(__dirname, "../data/orders.json");

// 🟢 Auth: login
exports.login = (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    req.session.admin = true;
    return res.json({ success: true });
  }
  res.status(401).json({ success: false, message: "Invalid credentials" });
};

// 🟢 Auth: logout
exports.logout = (req, res) => {
  req.session.destroy();
  res.json({ success: true, message: "Logged out" });
};

// 🟢 Auth: check session
exports.check = (req, res) => {
  res.json({ loggedIn: !!req.session.admin });
};

// 🟢 Get all orders
exports.getOrders = (req, res) => {
  if (!req.session.admin)
    return res.status(401).json({ success: false, message: "Unauthorized" });
  const data = readJSON(ordersFile);
  res.json(data.sort((a, b) => new Date(b.date) - new Date(a.date)));
};

// 🟢 Get customers
exports.getCustomers = (req, res) => {
  if (!req.session.admin)
    return res.status(401).json({ success: false, message: "Unauthorized" });
  try {
    const orders = readJSON(ordersFile);
    const customers = orders.map(order => ({
      name: order.customerName,
      email: order.customerEmail,
      phone: order.customerPhone,
      address: order.customerAddress,
    }));
    res.json(customers);
  } catch (err) {
    console.error("❌ Error reading customers:", err);
    res.status(500).json({ success: false, message: "Failed to load customers" });
  }
};

// 🟢 Get profile
exports.getProfile = (req, res) => {
  if (!req.session.admin)
    return res.status(401).json({ success: false, message: "Unauthorized" });
  try {
    const admin = readJSON(adminFile);
    const { password, ...safe } = admin;
    res.json(safe);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to read admin data" });
  }
};

// 🟢 Update profile
exports.updateProfile = (req, res) => {
  if (!req.session.admin)
    return res.status(401).json({ success: false, message: "Unauthorized" });
  try {
    const incoming = req.body || {};
    const admin = readJSON(adminFile);
    const allowed = ["name", "email", "phone", "address", "profilePic", "role"];
    allowed.forEach(k => {
      if (k in incoming) admin[k] = incoming[k];
    });
    writeJSON(adminFile, admin);
    const { password, ...safe } = admin;
    res.json({ success: true, admin: safe });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to update admin data" });
  }
};

// 🟢 Update password
exports.updatePassword = (req, res) => {
  if (!req.session.admin)
    return res.status(401).json({ success: false, message: "Unauthorized" });
  try {
    const { current, newPass } = req.body || {};
    if (!current || !newPass)
      return res.status(400).json({ error: "current and newPass required" });
    const admin = readJSON(adminFile);
    if (admin.password !== current)
      return res.status(400).json({ error: "Current password incorrect" });
    admin.password = newPass;
    writeJSON(adminFile, admin);
    res.json({ success: true, message: "Password updated" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to update password" });
  }
};


// controllers/adminController.js
// --- add below other exports in this file ---
exports.assignDelivery = (req, res) => {
  if (!req.session.admin)
    return res.status(401).json({ success: false, message: "Unauthorized" });

  try {
    const { orderId } = req.body;
    if (!orderId) return res.status(400).json({ success: false, message: "orderId required" });

    const data = readJSON(ordersFile);
    if (!Array.isArray(data)) {
      console.error("ordersFile does not contain an array:", data);
      return res.status(500).json({ success: false, message: "Orders storage invalid" });
    }

    const idx = data.findIndex((o) => o.id == orderId);
    if (idx === -1) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    // update status to 'delivery'
    data[idx].status = "delivery";
    writeJSON(ordersFile, data);

    console.log(`Assigned order ${orderId} to delivery (admin: ${!!req.session.admin})`);
    return res.json({ success: true, message: `Order #${orderId} assigned to delivery`, order: data[idx] });
  } catch (err) {
    console.error("assignDelivery error:", err);
    return res.status(500).json({ success: false, message: "Failed to assign delivery" });
  }
};
