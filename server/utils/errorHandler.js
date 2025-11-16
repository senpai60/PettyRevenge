// utils/errorHandler.js
import logger from './logger.js';

export function errorHandler(err, req, res, next) {
  logger.error(err.stack || err.message);

  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  return res.status(status).json({
    success: false,
    error: message,
  });
}
