const express = require('express');

const { sellerController, saleController } = require('../Controllers');
const { salesMiddleware } = require('../Middlewares');

const routers = express.Router();

routers.get('/orders/:id', sellerController.findSale);

routers.put(
  '/orders/:id',
  salesMiddleware.updateSaleValidation,
  saleController.updateSale,
);

routers.get(
  '/orders',
  salesMiddleware.getSellerSalesValidation,
  sellerController.findAllSellerSales,
);

module.exports = routers;
