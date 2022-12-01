const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const CustomError = require('../Errors/CustomError');

const TOKEN_SECRET = fs.readFileSync(path
  .join(__dirname, '..', '..', '..', 'jwt.evaluation.key'), 'utf-8');

const createToken = (user) => jwt.sign(user, TOKEN_SECRET);

const validateToken = (req, _res, next) => {
  const { authorization } = req.headers;

  if (!authorization) throw new CustomError('Token not found', 401);

  try {
    const payload = jwt.verify(authorization, TOKEN_SECRET);
    req.payload = payload;
    return next();
  } catch (_err) {
    throw new CustomError('Invalid token', 401);
  }
};

module.exports = { createToken, validateToken };
