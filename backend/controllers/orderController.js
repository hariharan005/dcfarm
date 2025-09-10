const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const Order = require("../models/Orders");

// Create Razorpay order
const createOrder = async (req, res) => {
  try {
    const { totalAmount } = req.body;
    const options = {
      amount: totalAmount * 100,
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };
    const order = await req.app.locals.razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create order" });
  }
};

// Verify payment + save order to MongoDB
const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      customerName,
      customerEmail,
      customerPhone,
      customerAddress,
      items,
      totalAmount,
    } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", req.app.locals.razorpay.key_secret)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature !== expectedSign) {
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }

    const order = new Order({
      customerName,
      customerEmail,
      customerPhone,
      customerAddress,
      items,
      totalAmount,
      paymentId: razorpay_payment_id,
      paymentStatus: "SUCCESS",
    });

    await order.save();

    await sendEmail(
      customerEmail,
      "Order Confirmation",
      `Hello ${customerName},\n\nYour order has been placed successfully.\nOrder ID: ${order._id}\nTotal: ₹${totalAmount}`
    );

    return res.json({ success: true, message: "Payment verified & order saved", order });
  } catch (err) {
    console.error("❌ verifyPayment error:", err);
    res.status(500).json({ message: "Payment verification failed" });
  }
};


// Admin Get all orders from MongoDB
const getAllOrders = async (req, res) => {
  try {
    if (!req.session.admin) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (err) {
    console.error("❌ getAllOrders error:", err);
    res.status(500).json({ success: false, message: "Failed to fetch orders" });
  }
};

module.exports = { createOrder, verifyPayment, getAllOrders };