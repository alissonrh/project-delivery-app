const express = require('express');
const {
  productController,
  customerController,
  saleController,
} = require('../Controllers');
const { salesMiddleware } = require('../Middlewares');

const routers = express.Router();

routers.get('/products', productController.allProducts);

routers.get('/checkout', customerController.allSellers);

routers.post(
  '/checkout',
  salesMiddleware.createSalesValidation,
  saleController.createSale,
);

routers.get('/orders/:id', saleController.findSale);

routers.put(
  '/orders/:id',
  salesMiddleware.updateSaleValidation,
  saleController.updateSale,
);

routers.get(
  '/orders',
  salesMiddleware.getUserSalesValidation,
  saleController.findAllUserSales,
);

module.exports = routers;
