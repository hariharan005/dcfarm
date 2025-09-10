const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const Razorpay = require("razorpay");
const MongoStore = require("connect-mongo"); // Optional: For session storage in MongoDB
const { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET, MONGO_URI } = require("./config/config");

// Import routes
const adminRoutes = require("./routes/adminRoutes");
const orderRoutes = require("./routes/orderRoutes");
const productRoutes = require("./routes/productRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// ✅ Middlewares
app.use(cors({ 
  origin: [
    process.env.FRONTEND_URL || "https://dcfarm.vercel.app", // production frontend
    '/\.vercel\.app$/', // vercel preview deployments
    "http://localhost:3000", // local frontend
    ],
  credentials: true , 
}));
app.use(bodyParser.json());

// Secure session storage with MongoDB
app.use(
  session({
    secret: process.env.SESSION_SECRET || "supersecretkey",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: MONGO_URI, collectionName: 'sessions' }),
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // true in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 6 * 60 * 60 * 1000, // 6 hours
    },
  })
);

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