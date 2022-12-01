const express = require('express');
const cors = require('cors');
const errorMiddleware = require('./Middlewares/errorMiddleware');

const {
  loginRoute,
  userRoute,
  customerRoute,
} = require('./Routes');

const app = express();
app.use(cors());

app.use(express.json());

app.get('/coffee', (_req, res) => res.status(418).end());

app.use(express.static('./back-end/public'));
app.use('/login', loginRoute);
app.use('/register', userRoute);
app.use('/customer', customerRoute);

app.use(errorMiddleware);

module.exports = app;
