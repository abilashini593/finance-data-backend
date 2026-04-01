function errorHandler(err, req, res, next) {
  console.error('[Error Handler]', err);

  // If we already sent headers, delegate to default express error handler
  if (res.headersSent) {
    return next(err);
  }

  // Determine status code
  let statusCode = 500;
  if (err.status) {
    statusCode = err.status;
  } else if (err.name === 'ValidationError') {
    statusCode = 400;
  }

  res.status(statusCode).json({
    error: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
}

module.exports = errorHandler;
