const express = require('express');

const { sellerController } = require('../Controllers');
const { salesMiddleware } = require('../Middlewares');

const routers = express.Router();

routers.get('/orders/:id', sellerController.findSale);

routers.get(
  '/orders',
  salesMiddleware.getSellerSalesValidation,
  sellerController.findAllSellerSales,
);

module.exports = routers;
