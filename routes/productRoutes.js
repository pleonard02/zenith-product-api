const express = require("express");
const router = express.Router();
const productController = require('../controller/productController.js');

router.get("/", productController.fetchAllProducts);

router.delete("/:id", productController.deleteProduct);

router.put("/:id", productController.updateProduct);

router.post("/", productController.createProduct);

router.get("/:id", productController.fetchOneProduct);

module.exports = router;