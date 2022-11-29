const express = require('express');
const loginController = require('../Controllers/loginController');
const { loginMiddleware } = require('../Middlewares');

const routers = express.Router();

routers.post('/', loginMiddleware, loginController)

module.exports = routers;
