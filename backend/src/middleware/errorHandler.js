import { logger } from '../utils/logger.js';
import { sendError } from '../utils/apiResponse.js';
import { env } from '../config/environment.js';

/**
 * 404 Not Found Middleware
 */
export const notFoundHandler = (req, res, next) => {
  return sendError(
    res,
    `Resource not found: ${req.method} ${req.originalUrl}`,
    404,
    'RESOURCE_NOT_FOUND'
  );
};

/**
 * Centralized Global Error Handler
 * Sanitizes errors in production to avoid leaking server internals or stack traces
 */
export const errorHandler = (err, req, res, next) => {
  logger.error(`Unhandled Error [${req.method} ${req.originalUrl}]:`, err);

  const statusCode = err.statusCode || (err.name === 'ValidationError' ? 400 : 500);
  const errorCode = err.code || (err.name === 'ValidationError' ? 'VALIDATION_ERROR' : 'INTERNAL_SERVER_ERROR');
  
  // Safe user-facing message
  let message = err.message || 'An unexpected internal error occurred.';
  if (env.isProduction && statusCode === 500) {
    message = 'An internal hospital portal error occurred. Please contact hospital support.';
  }

  const details = env.isDevelopment ? (err.stack || err) : null;

  return sendError(res, message, statusCode, errorCode, details);
};
