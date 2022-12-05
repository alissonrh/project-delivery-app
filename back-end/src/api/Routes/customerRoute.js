const express = require('express');
const { productController, customerController, saleController } = require('../Controllers');
const { salesMiddleware } = require('../Middlewares');

const routers = express.Router();

routers.get('/products', productController.allProducts);

routers.get('/checkout', customerController.allSellers);

routers.post('/checkout', salesMiddleware, saleController.createSale);

routers.get('/orders/:id', saleController.findSale);

module.exports = routers;
