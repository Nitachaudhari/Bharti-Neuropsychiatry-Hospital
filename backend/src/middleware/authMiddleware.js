import jwt from 'jsonwebtoken';
import { env } from '../config/environment.js';
import { sendError } from '../utils/apiResponse.js';

/**
 * Middleware: Verifies JWT token from Authorization header (Bearer <token>)
 */
export const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return sendError(res, 'Authentication token is required to access this resource.', 401, 'AUTH_REQUIRED');
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    req.user = decoded; // { id, role, name, email, phoneNumber }
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return sendError(res, 'Your session has expired. Please log in again.', 401, 'TOKEN_EXPIRED');
    }
    return sendError(res, 'Invalid or corrupted session token.', 401, 'INVALID_TOKEN');
  }
};

/**
 * Middleware: Enforces Role-Based Access Control (RBAC)
 * @param  {...string} allowedRoles - Array of roles permitted (e.g. 'patient', 'receptionist', 'psychologist', 'super_admin')
 */
export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return sendError(res, 'Authentication required before checking clinical permissions.', 401, 'AUTH_REQUIRED');
    }

    if (!allowedRoles.includes(req.user.role)) {
      return sendError(
        res,
        `Access denied: Your current role [${req.user.role}] does not have clinical authorization for this operation.`,
        403,
        'INSUFFICIENT_PERMISSIONS',
        { requiredRoles: allowedRoles, currentRole: req.user.role }
      );
    }

    next();
  };
};

