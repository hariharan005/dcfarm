const path = require("path");
const { readJSON, writeJSON } = require("../utils/fileHandler");

const productsFile = path.join(__dirname, "../data/products.json");

exports.getProducts = (req, res) => {
  res.json(readJSON(productsFile));
};

exports.addProduct = (req, res) => {
  const products = readJSON(productsFile);
  const newProduct = {
    id: Date.now(),
    name: req.body.name,
    price: Number(req.body.price),
    unit: req.body.unit || "unit",
    image: req.body.image || "https://via.placeholder.com/150",
    category: req.body.category || "General",
    stock: Number(req.body.stock) || 0,
    createdAt: new Date().toISOString(),
  };
  products.push(newProduct);
  writeJSON(productsFile, products);
  res.json(newProduct);
};

exports.updateProduct = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const products = readJSON(productsFile);
  const idx = products.findIndex((p) => p.id === id);
  if (idx === -1) return res.status(404).json({ error: "Not found" });
  const updated = { ...products[idx], ...req.body };
  products[idx] = updated;
  writeJSON(productsFile, products);
  res.json(updated);
};

exports.deleteProduct = (req, res) => {
  const id = parseInt(req.params.id, 10);
  let products = readJSON(productsFile);
  products = products.filter((p) => p.id !== id);
  writeJSON(productsFile, products);
  res.json({ success: true });
};
