const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session"); // ✅ session middleware
const sendEmail = require("../backend/utils/SendEmails");
const { ADMIN_USER, ADMIN_PASS } = require("./config");

const app = express();
const PORT = 5000;

app.use(
  cors({
    origin: "http://localhost:3000", // your React app
    credentials: true, // ✅ allow cookies
  })
);
app.use(bodyParser.json());

// ✅ setup session (6h expiry)
app.use(
  session({
    secret: "supersecretkey", // change to env variable in production
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 6 * 60 * 60 * 1000, httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax" }, // 6 hours
  })
);

const ordersFile = path.join(__dirname, "orders.json");

// ensure file exists
if (!fs.existsSync(ordersFile)) {
  fs.writeFileSync(ordersFile, JSON.stringify([]));
}

// ✅ Place order
app.post("/api/orders", async (req, res) => {
  try {
    const { customerName, customerEmail, items, totalAmount, paymentStatus } = req.body;

    if (paymentStatus !== "SUCCESS") {
      return res.status(400).json({ message: "Payment failed!" });
    }

    const order = {
      id: Date.now(),
      customerName,
      customerEmail,
      items,
      totalAmount,
      paymentStatus,
      date: new Date().toLocaleString(),
    };

    const data = JSON.parse(fs.readFileSync(ordersFile));
    data.push(order);
    fs.writeFileSync(ordersFile, JSON.stringify(data, null, 2));

    // send email
    await sendEmail(
      customerEmail,
      "Order Confirmation",
      `Hello ${customerName},\n\nYour order has been placed successfully.\nOrder ID: ${order.id}\nTotal: ₹${totalAmount}\n\nThank you for shopping with us!`
    );

    res.json({ message: "Order placed successfully", order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Admin login
app.post("/api/admin/login", (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    req.session.admin = true; // ✅ store session
    return res.json({ success: true });
  }
  res.status(401).json({ success: false, message: "Invalid credentials" });
});

// ✅ Admin logout
app.post("/api/admin/logout", (req, res) => {
  req.session.destroy();
  res.json({ success: true, message: "Logged out" });
});

// ✅ Check if logged in
app.get("/api/admin/check", (req, res) => {
  if (req.session.admin) {
    res.json({ loggedIn: true });
  } else {
    res.json({ loggedIn: false });
  }
});

// ✅ Get orders (admin, protected)
app.get("/api/admin/orders", (req, res) => {
  if (!req.session.admin) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const data = JSON.parse(fs.readFileSync(ordersFile));
  res.json(data.sort((a, b) => new Date(b.date) - new Date(a.date)));
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
