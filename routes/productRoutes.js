const express = require("express");
const router = express.Router();
const productController = require('../controller/productController.js');

router.get("/", productController.fetchAllProducts);

router.delete("/:id", productController.deleteProduct);

router.put("/:id", productController.deleteProduct);

router.post("/", productController.updateProduct);

router.get("/:id", productController.fetchOneProduct);

module.exports = router;