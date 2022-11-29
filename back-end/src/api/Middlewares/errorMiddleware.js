const errorMiddleware = (err, _req, res, _next) => {
  const { statusCode, message } = err;
  res.status(statusCode || 500).json({ message });
};

module.exports = errorMiddleware;
