const express = require('express');
const cors = require('cors');
const errorMiddleware = require('./Middlewares/errorMiddleware');

const {
  loginRoute,
  userRoute,
  customerRoute,
  sellerRoute,
} = require('./Routes');

const app = express();
app.use(cors());

app.use(express.json());

app.get('/coffee', (_req, res) => res.status(418).end());

app.use(express.static(`${__dirname}/../../public/`));
app.use('/login', loginRoute);
app.use('/register', userRoute);
app.use('/customer', customerRoute);
app.use('/seller', sellerRoute);

app.use(errorMiddleware);

module.exports = app;
