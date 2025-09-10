const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const path = require("path");
const fs = require("fs");
const Razorpay = require("razorpay");
const { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } = require("./config/config");

// Import routes
const adminRoutes = require("./routes/adminRoutes");
const orderRoutes = require("./routes/orderRoutes");
const productRoutes = require("./routes/productRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS setup
app.use(
  cors({
    origin: FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);

// ✅ Middlewares
app.use(cors({ 
  origin: process.env.FRONTEND_URL || "https://dcfarm.vercel.app/", 
  credentials: true 
}));
app.use(bodyParser.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "supersecretkey",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // ✅ secure cookies only in prod
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 6 * 60 * 60 * 1000, // 6 hours
    },
  })
);

// ✅ Ensure data dir exists
const dataDir = path.join(__dirname, "data");
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);

// ✅ Razorpay instance
if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
  console.error("❌ Razorpay keys missing! Check your .env file.");
  process.exit(1);
}

app.locals.razorpay = new Razorpay({
  key_id: RAZORPAY_KEY_ID,
  key_secret: RAZORPAY_KEY_SECRET,
});

// ✅ Routes
app.use("/api/admin", adminRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes);
app.use("/api/payment", paymentRoutes);

// ✅ Health check
app.get("/health", (_req, res) => res.json({ ok: true }));

// ✅ Start server
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
