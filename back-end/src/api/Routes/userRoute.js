const express = require('express');
const { userController } = require('../Controllers');
const { userMiddleware } = require('../Middlewares');

const routers = express.Router();

routers.post('/', userMiddleware, userController.createUser);

module.exports = routers;
