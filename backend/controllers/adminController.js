const Order = require("../models/Orders");
const { ADMIN_USER, ADMIN_PASS } = require("../config/config");

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
  req.session.destroy( err => {
    if (err) 
      console.error("Session destruction error:", err);
      return res.status(500).json({ success: false, message: "Logout failed" });
    });
  
};

// 🟢 Auth: check session
exports.check = (req, res) => {
  res.json({ loggedIn: !!req.session.admin });
};

// 🟢 Get all orders from MongoDB
exports.getOrders = async (req, res) => {
  if (!req.session.admin)
    return res.status(401).json({ success: false, message: "Unauthorized" });

  try {
    const orders = await Order.find().sort({ date: -1 }); // latest first
    res.json(orders);
  } catch (err) {
    console.error("Error fetching orders from MongoDB:", err);
    res.status(500).json({ success: false, message: "Failed to fetch orders" });
  }
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


// 🟢 Assign delivery
exports.assignDelivery = async (req, res) => {
  if (!req.session.admin)
    return res.status(401).json({ success: false, message: "Unauthorized" });

  try {
    const { orderId } = req.body;
    if (!orderId) return res.status(400).json({ success: false, message: "orderId required" });

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });

    // Update status
    order.paymentStatus = "shipped"; // or "delivery" as per your workflow
    await order.save();

    return res.json({ success: true, message: `Order #${orderId} assigned to delivery`, order });
  } catch (err) {
    console.error("assignDelivery error:", err);
    return res.status(500).json({ success: false, message: "Failed to assign delivery" });
  }
};