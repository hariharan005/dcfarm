const path = require("path");
const crypto = require("crypto");
const { readJSON, writeJSON } = require("../utils/fileHandler");
const sendEmail = require("../utils/sendEmail");

const ordersFile = path.join(__dirname, "../data/orders.json");

exports.createOrder = async (req, res) => {
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
    res.status(500).json({ message: "Failed to create order" });
  }
};

exports.verifyPayment = async (req, res) => {
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

    if (razorpay_signature === expectedSign) {
      const order = {
        id: Date.now(),
        customerName,
        customerEmail,
        customerPhone,
        customerAddress,
        items,
        totalAmount,
        paymentId: razorpay_payment_id,
        paymentStatus: "SUCCESS",
        date: new Date().toLocaleString(),
      };

      const data = readJSON(ordersFile);
      data.push(order);
      writeJSON(ordersFile, data);

      await sendEmail(
        customerEmail,
        "Order Confirmation",
        `Hello ${customerName},\n\nYour order has been placed successfully.\nOrder ID: ${order.id}\nTotal: ₹${totalAmount}`
      );

      return res.json({ success: true, message: "Payment verified & order saved", order });
    } else {
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }
  } catch (err) {
    res.status(500).json({ message: "Payment verification failed" });
  }
};
