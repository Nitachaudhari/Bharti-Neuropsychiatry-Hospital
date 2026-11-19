import { getSystemHealth } from '../services/healthService.js';
import { sendSuccess } from '../utils/apiResponse.js';

/**
 * GET /api/health
 * Returns server and database health diagnostics separately
 */
export const checkHealth = (req, res, next) => {
  try {
    const healthData = getSystemHealth();
    return sendSuccess(res, 'System health check completed', healthData, 200);
  } catch (error) {
    next(error);
  }
};
