const express = require('express');
const { productController, customerController, saleController } = require('../Controllers');

const routers = express.Router();

routers.get('/products', productController.allProducts);

routers.get('/checkout', customerController.allSellers);

routers.post('/checkout', saleController.createSale);

routers.get('/orders/?id');

module.exports = routers;
