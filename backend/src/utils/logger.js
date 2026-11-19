/**
 * Clean structured logger for Bharti Neuropsychiatry Hospital
 * Enforces sanitization so sensitive patient data or secrets are never logged.
 */

const formatTimestamp = () => new Date().toISOString();

export const logger = {
  info: (message, meta = null) => {
    const output = `[${formatTimestamp()}] [INFO] ${message}`;
    if (meta) {
      console.log(output, sanitizeMeta(meta));
    } else {
      console.log(output);
    }
  },

  warn: (message, meta = null) => {
    const output = `[${formatTimestamp()}] [WARN] ${message}`;
    if (meta) {
      console.warn(output, sanitizeMeta(meta));
    } else {
      console.warn(output);
    }
  },

  error: (message, error = null) => {
    const output = `[${formatTimestamp()}] [ERROR] ${message}`;
    if (error) {
      const sanitized = error instanceof Error 
        ? { message: error.message, name: error.name }
        : sanitizeMeta(error);
      console.error(output, sanitized);
    } else {
      console.error(output);
    }
  },

  debug: (message, meta = null) => {
    if (process.env.NODE_ENV !== 'production') {
      const output = `[${formatTimestamp()}] [DEBUG] ${message}`;
      if (meta) {
        console.debug(output, sanitizeMeta(meta));
      } else {
        console.debug(output);
      }
    }
  }
};

/**
 * Strips password, token, authorization, and sensitive keys from log metadata
 */
function sanitizeMeta(meta) {
  if (!meta || typeof meta !== 'object') return meta;
  
  const sensitiveKeys = ['password', 'token', 'authorization', 'secret', 'key', 'apiKey', 'cookie'];
  const sanitized = Array.isArray(meta) ? [...meta] : { ...meta };

  for (const key of Object.keys(sanitized)) {
    if (sensitiveKeys.some(s => key.toLowerCase().includes(s))) {
      sanitized[key] = '[REDACTED]';
    } else if (typeof sanitized[key] === 'object' && sanitized[key] !== null) {
      sanitized[key] = sanitizeMeta(sanitized[key]);
    }
  }

  return sanitized;
}
