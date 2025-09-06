// server.js (merged)
const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const crypto = require("crypto");
const Razorpay = require("razorpay");
const sendEmail = require("./utils/SendEmails");
const {
  ADMIN_USER,
  ADMIN_PASS,
  RAZORPAY_KEY_ID,
  RAZORPAY_KEY_SECRET,
} = require("./config");

const app = express();
const PORT = 5000;

app.use(
  cors({
    origin: "http://localhost:3000", // your React app
    credentials: true,
  })
);
app.use(bodyParser.json({ limit: "10mb" })); // allow base64 images

// ✅ session setup
app.use(
  session({
    secret: "supersecretkey",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 6 * 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    },
  })
);

// --- orders storage file ---
const ordersFile = path.join(__dirname, "orders.json");
if (!fs.existsSync(ordersFile)) {
  fs.writeFileSync(ordersFile, JSON.stringify([]));
}

// --- admin JSON file (profile) ---
const adminFile = path.join(__dirname, "admin.json");
if (!fs.existsSync(adminFile)) {
  // create from template if missing
  const initial = {
    id: 1,
    name: "Hariharan",
    username: "admin",
    email: "admin@example.com",
    role: "Super Admin",
    phone: "+91 9876543210",
    address: "Chennai, India",
    lastLogin: new Date().toLocaleString(),
    createdAt: new Date().toISOString().slice(0, 10),
    profilePic: "https://via.placeholder.com/120",
    password: "admin@123"
  };
  fs.writeFileSync(adminFile, JSON.stringify(initial, null, 2));
}

// small helpers to safely read/write admin.json
function readAdmin() {
  const raw = fs.readFileSync(adminFile, "utf8");
  return JSON.parse(raw);
}
function writeAdmin(data) {
  const tmp = adminFile + ".tmp";
  fs.writeFileSync(tmp, JSON.stringify(data, null, 2), "utf8");
  fs.renameSync(tmp, adminFile);
}

// ✅ Razorpay instance (if keys set)
const razorpay = new Razorpay({
  key_id: RAZORPAY_KEY_ID,
  key_secret: RAZORPAY_KEY_SECRET,
});

// ================= existing endpoints ================= //

// Create Razorpay Order
app.post("/api/orders/create", async (req, res) => {
  try {
    const { totalAmount } = req.body;
    const options = {
      amount: totalAmount * 100, // paise
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    console.error("Error creating Razorpay order:", err);
    res.status(500).json({ message: "Failed to create order" });
  }
});



// Verify Payment & Save Order
app.post("/api/payment/verify", async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      customerName,
      customerEmail,
      items,
      totalAmount,
    } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      const order = {
        id: Date.now(),
        customerName,
        customerEmail,
        items,
        totalAmount,
        paymentId: razorpay_payment_id,
        paymentStatus: "SUCCESS",
        date: new Date().toLocaleString(),
      };

      const data = JSON.parse(fs.readFileSync(ordersFile));
      data.push(order);
      fs.writeFileSync(ordersFile, JSON.stringify(data, null, 2));

      // send email
      try {
        await sendEmail(
          customerEmail,
          "Order Confirmation",
          `Hello ${customerName},\n\nYour order has been placed successfully.\nOrder ID: ${order.id}\nTotal: ₹${totalAmount}\n\nThank you for shopping with us!`
        );
      } catch (e) {
        console.error("Email send failed:", e);
      }

      return res.json({ success: true, message: "Payment verified & order saved", order });
    } else {
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }
  } catch (err) {
    console.error("Error verifying payment:", err);
    res.status(500).json({ message: "Payment verification failed" });
  }
});

// Admin login/logout/check
app.post("/api/admin/login", (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    req.session.admin = true;
    return res.json({ success: true });
  }
  res.status(401).json({ success: false, message: "Invalid credentials" });
});

app.post("/api/admin/logout", (req, res) => {
  req.session.destroy();
  res.json({ success: true, message: "Logged out" });
});

app.get("/api/admin/check", (req, res) => {
  res.json({ loggedIn: !!req.session.admin });
});

// Get orders (admin only)
app.get("/api/admin/orders", (req, res) => {
  if (!req.session.admin) return res.status(401).json({ success: false, message: "Unauthorized" });
  const data = JSON.parse(fs.readFileSync(ordersFile));
  res.json(data.sort((a, b) => new Date(b.date) - new Date(a.date)));
});

// Get customer list directly from orders.json
app.get("/api/admin/customers", (req, res) => {
  if (!req.session.admin) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  try {
    const orders = JSON.parse(fs.readFileSync(ordersFile, "utf8"));

    // map only name + email from orders
    const customers = orders.map(order => ({
      name: order.customerName,
      email: order.customerEmail
    }));

    res.json(customers);
  } catch (err) {
    console.error("Error reading customers:", err);
    res.status(500).json({ success: false, message: "Failed to load customers" });
  }
});



// ================= new admin profile endpoints ================= //

// GET profile (admin only) - hides password
app.get("/api/admin/profile", (req, res) => {
  if (!req.session.admin) return res.status(401).json({ success: false, message: "Unauthorized" });
  try {
    const admin = readAdmin();
    const { password, ...safe } = admin;
    res.json(safe);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to read admin data" });
  }
});

// PUT profile (admin only) - update allowed fields
app.put("/api/admin/profile", (req, res) => {
  if (!req.session.admin) return res.status(401).json({ success: false, message: "Unauthorized" });
  try {
    const incoming = req.body || {};
    const admin = readAdmin();
    const allowed = ["name", "email", "phone", "address", "profilePic", "role"];
    allowed.forEach((k) => { if (k in incoming) admin[k] = incoming[k]; });
    // update lastLogin when profile changes? (optional)
    writeAdmin(admin);
    const { password, ...safe } = admin;
    res.json({ success: true, admin: safe });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to update admin data" });
  }
});

// PUT password (admin only)
app.put("/api/admin/password", (req, res) => {
  if (!req.session.admin) return res.status(401).json({ success: false, message: "Unauthorized" });
  try {
    const { current, newPass } = req.body || {};
    if (!current || !newPass) return res.status(400).json({ error: "current and newPass required" });
    const admin = readAdmin();
    if (admin.password !== current) return res.status(400).json({ error: "Current password incorrect" });
    admin.password = newPass;
    writeAdmin(admin);
    res.json({ success: true, message: "Password updated" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to update password" });
  }
});

// health
app.get("/health", (_req, res) => res.json({ ok: true }));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
