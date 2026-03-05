const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, default: "" },
  email: { type: String, default: "" },
  phone: { type: String, default: "" },
  address: { type: String, default: "" },
  profilePic: { type: String, default: "" },
  role: { type: String, default: "Admin" },
  lastLogin: { type: Date, default: null },
}, { timestamps: true });

module.exports = mongoose.model("Admin", adminSchema);
