// Централизованный обработчик ошибок
const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Внутренняя ошибка сервера';

  res.status(status).json({
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

module.exports = errorHandler;
