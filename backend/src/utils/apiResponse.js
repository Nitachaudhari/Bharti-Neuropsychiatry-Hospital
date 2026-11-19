/**
 * Standardized API Response Utilities
 */

export const sendSuccess = (res, message = 'Success', data = null, statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    timestamp: new Date().toISOString()
  });
};

export const sendError = (res, message = 'Internal Server Error', statusCode = 500, errorCode = 'SERVER_ERROR', details = null) => {
  const payload = {
    success: false,
    error: {
      code: errorCode,
      message
    },
    timestamp: new Date().toISOString()
  };

  if (details && process.env.NODE_ENV !== 'production') {
    payload.error.details = details;
  }

  return res.status(statusCode).json(payload);
};
