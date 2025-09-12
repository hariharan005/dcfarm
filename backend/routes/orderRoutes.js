const express = require("express");
const {createOrder, verifyPayment, getAllOrders} = require("../controllers/orderController");


const router = express.Router();
router.post("/create", createOrder);
router.post("/verify", verifyPayment);

// Admin route to get all orders
router.get("/admin/orders", getAllOrders);

module.exports = router;