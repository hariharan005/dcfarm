const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const crypto = require("crypto");
const Razorpay = require("razorpay");
const sendEmail = require("../backend/utils/SendEmails");
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
app.use(bodyParser.json());

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

const ordersFile = path.join(__dirname, "orders.json");
if (!fs.existsSync(ordersFile)) {
  fs.writeFileSync(ordersFile, JSON.stringify([]));
}

// ✅ Razorpay instance
const razorpay = new Razorpay({
  key_id: RAZORPAY_KEY_ID,
  key_secret: RAZORPAY_KEY_SECRET,
});

// ✅ Create Razorpay Order (frontend will call this before checkout)
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

// ✅ Verify Payment & Save Order
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
      // ✅ store order
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
      await sendEmail(
        customerEmail,
        "Order Confirmation",
        `Hello ${customerName},\n\nYour order has been placed successfully.\nOrder ID: ${order.id}\nTotal: ₹${totalAmount}\n\nThank you for shopping with us!`
      );

      return res.json({ success: true, message: "Payment verified & order saved", order });
    } else {
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }
  } catch (err) {
    console.error("Error verifying payment:", err);
    res.status(500).json({ message: "Payment verification failed" });
  }
});

// ✅ Admin login
app.post("/api/admin/login", (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    req.session.admin = true;
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

// ✅ Get orders (admin only)
app.get("/api/admin/orders", (req, res) => {
  if (!req.session.admin) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const data = JSON.parse(fs.readFileSync(ordersFile));
  res.json(data.sort((a, b) => new Date(b.date) - new Date(a.date)));
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
