const express = require('express');
const { productController } = require('../Controllers');

const routers = express.Router();

routers.get('/products', productController.allProducts);

module.exports = routers;
