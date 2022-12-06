const express = require('express');

const { adminController } = require('../Controllers');
const { userMiddleware } = require('../Middlewares');

const routers = express.Router();

routers.get('/manage', adminController.findlAllUsers);

routers.post('/manage', userMiddleware.adminCreateUserValidation, adminController.adminCreateUser);

routers.delete('/manage/:id', adminController.adminDeleteUser);

module.exports = routers;
