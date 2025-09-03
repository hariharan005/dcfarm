const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const sendEmail = require("../backend/utils/SendEmails");
const { ADMIN_USER, ADMIN_PASS, RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } = require("./config");

const app = express();
const PORT = 5000;

app.use(
  cors({
    origin: "http://localhost:3000", // frontend
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(
  session({
    secret: "supersecretkey",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 6 * 60 * 60 * 1000, httpOnly: true, secure: false, sameSite: "lax" },
  })
);

const ordersFile = path.join(__dirname, "orders.json");

// ✅ Razorpay instance
const razorpay = new Razorpay({
  key_id: RAZORPAY_KEY_ID,
  key_secret: RAZORPAY_KEY_SECRET,
});

// ✅ Create Razorpay order
app.post("/api/payment/order", async (req, res) => {
  try {
    const { amount } = req.body;
    const options = {
      amount: amount * 100, // paise
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Payment order creation failed" });
  }
});

// ✅ Verify Razorpay signature
app.post("/api/payment/verify", async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, customerName, customerEmail, items, totalAmount } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto.createHmac("sha256", RAZORPAY_KEY_SECRET).update(sign).digest("hex");

    if (razorpay_signature !== expectedSign) {
      return res.status(400).json({ message: "Invalid signature" });
    }

    // ✅ Save order only if signature is valid
    const order = {
      id: razorpay_payment_id,
      customerName,
      customerEmail,
      items,
      totalAmount,
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

    res.json({ message: "Payment verified and order placed", order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Payment verification failed" });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
