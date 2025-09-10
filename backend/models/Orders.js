const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customerName: String,
  customerEmail: String,
  customerPhone: String,
  customerAddress: String,
  items: [
    {
      id: Number,
      name: String,
      qty: Number,
      price: Number,
      total: Number,
    }
  ],
  totalAmount: Number,
  paymentId: String,
  paymentStatus: { type: String, default: "PENDING" },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
