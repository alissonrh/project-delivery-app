const errorMiddleware = require('./errorMiddleware');
const loginMiddleware = require('./loginMiddleware');
const userMiddleware = require('./userMiddleware');

module.exports = {
  errorMiddleware,
  loginMiddleware,
  userMiddleware,
};
