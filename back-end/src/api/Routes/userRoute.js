const express = require('express');
const { userController } = require('../Controllers');
const { userMiddleware } = require('../Middlewares');

const routers = express.Router();

routers.post('/', userMiddleware.createUserValidation, userController.createUser);

module.exports = routers;
