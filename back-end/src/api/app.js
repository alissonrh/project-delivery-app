const express = require('express');
const errorMiddleware = require('./Middlewares/errorMiddleware.js');
const routesLogin = require('./Routes/loginRoute.js')

const app = express();

app.use(express.json());

app.get('/coffee', (_req, res) => res.status(418).end());

app.use('/login', routesLogin);

app.use(errorMiddleware);

module.exports = app;
