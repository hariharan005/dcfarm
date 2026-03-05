const Order = require("../models/Orders");
const Admin = require("../models/Admin");

// Seeds the admin doc from env vars if it doesn't exist yet
async function getOrSeedAdmin() {
  let admin = await Admin.findOne({ username: process.env.ADMIN_USER });
  if (!admin) {
    admin = await Admin.create({
      username: process.env.ADMIN_USER,
      password: process.env.ADMIN_PASS,
      name: "Admin",
      role: "Admin",
    });
  }
  return admin;
}

// Auth: login
exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await getOrSeedAdmin();
    if (username === admin.username && password === admin.password) {
      req.session.admin = true;
      admin.lastLogin = new Date();
      await admin.save();
      return res.json({ success: true });
    }
    res.status(401).json({ success: false, message: "Invalid credentials" });
  } catch (err) {
    console.error("login error:", err);
    res.status(500).json({ success: false, message: "Login failed" });
  }
};

// Auth: logout
exports.logout = (req, res) => {
  req.session.destroy();
  res.json({ success: true, message: "Logged out" });
};

// Auth: check session
exports.check = (req, res) => {
  res.json({ loggedIn: !!req.session.admin });
};

// Get all orders from MongoDB
exports.getOrders = async (req, res) => {
  if (!req.session.admin)
    return res.status(401).json({ success: false, message: "Unauthorized" });
  try {
    const orders = await Order.find().sort({ date: -1 });
    res.json(orders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ success: false, message: "Failed to fetch orders" });
  }
};

// Get customers (unique) derived from orders
exports.getCustomers = async (req, res) => {
  if (!req.session.admin)
    return res.status(401).json({ success: false, message: "Unauthorized" });
  try {
    const orders = await Order.find({}, "customerName customerEmail customerPhone customerAddress");
    const seen = {};
    const customers = [];
    orders.forEach((order) => {
      if (!seen[order.customerEmail]) {
        seen[order.customerEmail] = true;
        customers.push({
          name: order.customerName,
          email: order.customerEmail,
          phone: order.customerPhone,
          address: order.customerAddress,
        });
      }
    });
    res.json(customers);
  } catch (err) {
    console.error("Error fetching customers:", err);
    res.status(500).json({ success: false, message: "Failed to load customers" });
  }
};

// Get admin profile
exports.getProfile = async (req, res) => {
  if (!req.session.admin)
    return res.status(401).json({ success: false, message: "Unauthorized" });
  try {
    const admin = await getOrSeedAdmin();
    const { password, __v, ...safe } = admin.toObject();
    res.json(safe);
  } catch (err) {
    console.error("getProfile error:", err);
    res.status(500).json({ error: "Failed to read admin data" });
  }
};

// Update admin profile
exports.updateProfile = async (req, res) => {
  if (!req.session.admin)
    return res.status(401).json({ success: false, message: "Unauthorized" });
  try {
    const allowed = ["name", "email", "phone", "address", "profilePic", "role"];
    const updates = {};
    allowed.forEach((k) => {
      if (k in req.body) updates[k] = req.body[k];
    });
    const admin = await Admin.findOneAndUpdate(
      { username: process.env.ADMIN_USER },
      { $set: updates },
      { new: true }
    );
    const { password, __v, ...safe } = admin.toObject();
    res.json({ success: true, admin: safe });
  } catch (err) {
    console.error("updateProfile error:", err);
    res.status(500).json({ error: "Failed to update admin data" });
  }
};

// Update admin password
exports.updatePassword = async (req, res) => {
  if (!req.session.admin)
    return res.status(401).json({ success: false, message: "Unauthorized" });
  try {
    const { current, newPass } = req.body || {};
    if (!current || !newPass)
      return res.status(400).json({ error: "current and newPass required" });
    const admin = await getOrSeedAdmin();
    if (admin.password !== current)
      return res.status(400).json({ error: "Current password incorrect" });
    admin.password = newPass;
    await admin.save();
    res.json({ success: true, message: "Password updated" });
  } catch (err) {
    console.error("updatePassword error:", err);
    res.status(500).json({ error: "Failed to update password" });
  }
};

// Assign delivery
exports.assignDelivery = async (req, res) => {
  if (!req.session.admin)
    return res.status(401).json({ success: false, message: "Unauthorized" });
  try {
    const { orderId } = req.body;
    if (!orderId) return res.status(400).json({ success: false, message: "orderId required" });
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });
    order.paymentStatus = "shipped";
    await order.save();
    return res.json({ success: true, message: `Order #${orderId} assigned to delivery`, order });
  } catch (err) {
    console.error("assignDelivery error:", err);
    return res.status(500).json({ success: false, message: "Failed to assign delivery" });
  }
};
