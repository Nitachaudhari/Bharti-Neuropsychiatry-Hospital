import rateLimit from 'express-rate-limit';
import { env } from '../config/environment.js';

/**
 * Global API rate limiter to protect portal from abuse, DoS, and brute-force scans.
 */
export const globalRateLimiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MINUTES * 60 * 1000,
  max: env.RATE_LIMIT_MAX_REQUESTS,
  standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
  legacyHeaders: false, // Disable `X-RateLimit-*` headers
  message: {
    success: false,
    error: {
      code: 'RATE_LIMIT_EXCEEDED',
      message: `Too many requests from this IP address. Please try again after ${env.RATE_LIMIT_WINDOW_MINUTES} minutes.`
    },
    timestamp: new Date().toISOString()
  }
});
