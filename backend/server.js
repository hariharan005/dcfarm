const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const path = require("path");
const fs = require("fs");
const Razorpay = require("razorpay");
const { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET, FRONTEND_URL, SESSION_SECRET } = require("./config/config");

// Routes
const adminRoutes = require("./routes/adminRoutes");
const orderRoutes = require("./routes/orderRoutes");
const productRoutes = require("./routes/productRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

const app = express();
const PORT = process.env.PORT || 5000; // ✅ use environment variable

// ✅ Middlewares
app.use(cors({ 
  origin: FRONTEND_URL || "http://localhost:3000", 
  credentials: true 
}));
app.use(bodyParser.json());
app.use(
  session({
    secret: SESSION_SECRET || "supersecretkey",
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, maxAge: 6 * 60 * 60 * 1000 },
  })
);

// ✅ Ensure data directory exists
const dataDir = path.join(__dirname, "data");
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);

// ✅ Razorpay instance
app.locals.razorpay = new Razorpay({
  key_id: RAZORPAY_KEY_ID,
  key_secret: RAZORPAY_KEY_SECRET,
});

// ✅ Routes
app.use("/api/admin", adminRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes);
app.use("/api/payment", paymentRoutes);

// ✅ Health check endpoint
app.get("/health", (_req, res) => res.json({ ok: true }));

// ✅ Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
