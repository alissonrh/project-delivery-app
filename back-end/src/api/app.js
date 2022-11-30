const express = require('express');
const errorMiddleware = require('./Middlewares/errorMiddleware');
const routesLogin = require('./Routes/loginRoute');
const cors = require('cors');

const app = express();
app.use(cors())

app.use(express.json());

app.get('/coffee', (_req, res) => res.status(418).end());

app.use('/login', routesLogin);

app.use(errorMiddleware);

module.exports = app;
