// routers/products.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Fetch Products
router.get('/', productController.getProducts);

// Create Product
router.post('/', productController.createProduct);

// Update Product
//
router.put('/:id', productController.updateProduct);


module.exports = router;
