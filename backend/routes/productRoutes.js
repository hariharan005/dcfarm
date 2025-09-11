const express = require("express");
const { isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

module.exports = router;