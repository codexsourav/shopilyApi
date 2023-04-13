const express = require('express');
const rating = require('../controller/products/rating');
const product = require('../controller/products/product');
const middleware = require('../middleware/chack-auth');
const router = express.Router();


router.get('/api/products', product.showProducts);
router.get('/api/products/show/:skip', product.showProductsLimit);
router.post('/api/products/search/:query', product.searchProducts);
router.get('/api/product/:id', product.product);
// rateing Routes
router.get('/api/rating/show/:pid', rating.show);
router.post('/api/rating/new/:pid', middleware, rating.add);

module.exports = router;
