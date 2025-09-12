const path = require("path");
const dotenv = require("dotenv");
// Pick env file based on NODE_ENV (default = development)
const envFile = `.env.${process.env.NODE_ENV || "development"}`;
dotenv.config({ path: path.resolve(__dirname, envFile) });

console.log(`[dotenv] Loaded ${envFile}`);
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS exists?", !!process.env.EMAIL_PASS);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const Razorpay = require("razorpay");
const MongoStore = require("connect-mongo");


// Import routes
const adminRoutes = require("./routes/adminRoutes");
const orderRoutes = require("./routes/orderRoutes");
const productRoutes = require("./routes/productRoutes");
const paymentRoutes = require("./routes/paymentRoutes");


const app = express();
const PORT = process.env.PORT || 5000;


// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// ✅ Dynamic CORS config


app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);

app.use(bodyParser.json());
app.set("trust proxy", 1); // Trust first proxy if behind a proxy (e.g., Heroku, Vercel)

// ✅ Secure session storage with MongoDB
app.use(
  session({
    secret: process.env.SESSION_SECRET || "supersecretkey",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions",
    }),
    cookie: {
      httpOnly: true,
      secure: false, // Set to true if using HTTPS
      sameSite: "lax", // Adjust based on your frontend/backend setup
      maxAge: 6 * 60 * 60 * 1000, // 6 hours
    },
  })
);

// ✅ Razorpay instance
if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  console.error("❌ Razorpay keys missing! Check your .env file.");
  process.exit(1);
}

app.locals.razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
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
  console.log(`🚀 Server running on port ${PORT} in ${process.env.NODE_ENV} mode`)
);
