// routes/paymentRoutes.js
const express = require("express");
const crypto = require("crypto");
const path = require("path");
const sendEmail = require("../utils/sendEmail");

const router = express.Router();

// ✅ Verify payment
router.post("/verify", async (req, res) => {
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

    // Log incoming payload for debugging
    console.log("➡️ Verify Payload:", req.body);

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      // ✅ Payment verified
      const order = {
        id: Date.now(),
        customerName: customerName || "Unknown",
        customerEmail: customerEmail || "N/A",
        customerPhone: customerPhone || "N/A",
        customerAddress: customerAddress || "N/A",
        items: items || [],
        totalAmount: totalAmount || 0,
        paymentId: razorpay_payment_id,
        paymentStatus: "SUCCESS",
        date: new Date().toLocaleString(),
      };

      const data = readJSON(ordersFile);
      data.push(order);
      writeJSON(ordersFile, data);

      // Try sending email
      try {
        await sendEmail(
          customerEmail,
          "Order Confirmation",
          `Hello ${customerName},\n\nYour order has been placed successfully.\nOrder ID: ${order.id}\nTotal: ₹${totalAmount}\n\nThank you for shopping with us!`
        );
      } catch (e) {
        console.error("❌ Email send failed:", e);
      }

      return res.json({
        success: true,
        message: "Payment verified & order saved",
        order,
      });
    } else {
      console.warn("❌ Invalid signature", { razorpay_signature, expectedSign });
      return res.status(400).json({
        success: false,
        message: "Invalid signature",
      });
    }
  } catch (err) {
    console.error("❌ Error verifying payment:", err);
    return res.status(500).json({
      success: false,
      message: "Payment verification failed",
      error: err.message,
    });
  }
});


module.exports = router;