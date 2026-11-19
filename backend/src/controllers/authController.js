import * as authService from '../services/authService.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';
import { Admin, ADMIN_ROLES } from '../models/Admin.js';
import { logger } from '../utils/logger.js';

/**
 * Register a new patient
 * POST /api/auth/register
 */
export const register = async (req, res, next) => {
  try {
    const result = await authService.registerPatient(req.body);
    return sendSuccess(res, 'Patient registered successfully', result, 201);
  } catch (error) {
    next(error);
  }
};

/**
 * Patient Login
 * POST /api/auth/login
 */
export const login = async (req, res, next) => {
  try {
    const { identifier, phoneNumber, email, password } = req.body;
    const resolvedIdentifier = identifier || phoneNumber || email;

    const result = await authService.loginPatient({
      identifier: resolvedIdentifier,
      password
    });

    return sendSuccess(res, 'Patient login successful', result, 200);
  } catch (error) {
    next(error);
  }
};

/**
 * Staff / Doctor / Admin Login
 * POST /api/auth/staff-login
 */
export const staffLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await authService.loginStaff({ email, password });
    return sendSuccess(res, 'Staff authenticated successfully', result, 200);
  } catch (error) {
    next(error);
  }
};

/**
 * Get current profile (Requires authenticateJWT)
 * GET /api/auth/me
 */
export const getMe = async (req, res, next) => {
  try {
    const profile = await authService.getProfileByIdAndRole(req.user.id, req.user.role);
    return sendSuccess(res, 'Authenticated profile retrieved', profile, 200);
  } catch (error) {
    next(error);
  }
};

/**
 * Initial Administrator Seeding Helper (Only creates if 0 admins exist)
 * POST /api/auth/seed-admin
 */
export const seedInitialAdmin = async (req, res, next) => {
  try {
    const existingCount = await Admin.countDocuments();
    if (existingCount > 0) {
      return sendError(res, 'Admins already exist in the database. Seeding is disabled.', 400, 'ADMINS_EXIST');
    }

    const { name, email, password, role, staffCode } = req.body;
    const defaultRole = role || ADMIN_ROLES.SUPER_ADMIN;

    const newAdmin = new Admin({
      name: name || 'Chief Clinical Administrator',
      email: (email || 'admin@bhartihospital.com').toLowerCase(),
      passwordHash: password || 'HospitalAdmin@2026',
      role: defaultRole,
      staffCode: staffCode || 'STF-001',
      department: 'Hospital Executive & Clinical Psychology'
    });

    await newAdmin.save();
    logger.info(`Initial administrator account created: ${newAdmin.email}`);

    return sendSuccess(res, 'Initial administrative account created successfully', {
      id: newAdmin._id,
      name: newAdmin.name,
      email: newAdmin.email,
      role: newAdmin.role,
      staffCode: newAdmin.staffCode
    }, 201);
  } catch (error) {
    next(error);
  }
};

