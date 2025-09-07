const express = require("express");
const {
  login,
  logout,
  check,
  getOrders,
  getCustomers,
  getProfile,
  updateProfile,
  updatePassword,
} = require("../controllers/adminController");

const router = express.Router();

// Auth
router.post("/login", login);
router.post("/logout", logout);
router.get("/check", check);

// Orders & Customers
router.get("/orders", getOrders);
router.get("/customers", getCustomers);

// Profile
router.get("/profile", getProfile);
router.put("/profile", updateProfile);
router.put("/password", updatePassword);

module.exports = router;
