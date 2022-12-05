const errorMiddleware = require('./errorMiddleware');
const loginMiddleware = require('./loginMiddleware');
const userMiddleware = require('./userMiddleware');
const salesMiddleware = require('./salesMiddleware');

module.exports = {
  errorMiddleware,
  loginMiddleware,
  userMiddleware,
  salesMiddleware,
};
