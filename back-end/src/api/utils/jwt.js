const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');

const TOKEN_SECRET = fs.readFileSync(path.join(__dirname, '..', '..', '..', 'jwt.evaluation.key'), 'utf-8').trim();

const createToken = (user) => jwt.sign(user, TOKEN_SECRET); 

const validateToken = (req, _res, next) => {
  const { authorization } = req.headers;

  if (!authorization) throw new CustomError('Token not found', 401)

  try {
    const user = jwt.verify(authorization, TOKEN_SECRET)
    return user;
  } catch (err) {
    console.log(err)
    throw new CustomError('Invalid token', 401)
  }

  next();
}

module.exports = { createToken, validateToken }
