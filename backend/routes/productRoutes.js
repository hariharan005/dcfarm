const express = require("express");
const { getProducts, addProduct, updateProduct, deleteProduct } = require("../controllers/productController");
const { isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getProducts);
router.post("/", isAdmin, addProduct);
router.put("/:id", isAdmin, updateProduct);
router.delete("/:id", isAdmin, deleteProduct);

module.exports = router;