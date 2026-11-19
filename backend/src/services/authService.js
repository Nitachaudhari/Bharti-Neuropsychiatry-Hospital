import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { Admin } from '../models/Admin.js';
import { env } from '../config/environment.js';

/**
 * Mint signed JWT session token
 */
export const generateToken = (payload) => {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN
  });
};

/**
 * Register a new patient
 */
export const registerPatient = async (data) => {
  const { fullName, phoneNumber, email, password, gender, dateOfBirth } = data;

  if (!fullName || !phoneNumber || !password) {
    const error = new Error('Full name, phone number, and password are required.');
    error.statusCode = 400;
    throw error;
  }

  // Check phone duplication
  const existingPhone = await User.findOne({ phoneNumber });
  if (existingPhone) {
    const error = new Error('A patient account is already registered with this phone number.');
    error.statusCode = 409;
    throw error;
  }

  // Check email duplication if provided
  if (email) {
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      const error = new Error('A patient account is already registered with this email address.');
      error.statusCode = 409;
      throw error;
    }
  }

  // Generate patient hospital MRN
  const timestamp = Date.now().toString().slice(-6);
  const hospitalPatientId = `BNH-P${timestamp}`;

  const newUser = new User({
    fullName,
    phoneNumber,
    email: email || undefined,
    passwordHash: password, // will be hashed by pre-save hook
    gender: gender || undefined,
    dateOfBirth: dateOfBirth || undefined,
    hospitalPatientId
  });

  await newUser.save();

  const tokenPayload = {
    id: newUser._id.toString(),
    role: 'patient',
    name: newUser.fullName,
    phoneNumber: newUser.phoneNumber,
    hospitalPatientId: newUser.hospitalPatientId
  };

  const token = generateToken(tokenPayload);

  return {
    user: newUser.toJSON(),
    token
  };
};

/**
 * Authenticate patient via phone or email
 */
export const loginPatient = async ({ identifier, password }) => {
  if (!identifier || !password) {
    const error = new Error('Phone number (or email) and password are required.');
    error.statusCode = 400;
    throw error;
  }

  // Find user by phoneNumber or email
  const user = await User.findOne({
    $or: [
      { phoneNumber: identifier },
      { email: identifier.toLowerCase() }
    ]
  });

  if (!user) {
    const error = new Error('Invalid credentials. Patient record not found.');
    error.statusCode = 401;
    throw error;
  }

  if (!user.isActive) {
    const error = new Error('This patient account has been deactivated. Please contact hospital reception.');
    error.statusCode = 403;
    throw error;
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    const error = new Error('Invalid credentials. Password does not match.');
    error.statusCode = 401;
    throw error;
  }

  const tokenPayload = {
    id: user._id.toString(),
    role: 'patient',
    name: user.fullName,
    phoneNumber: user.phoneNumber,
    hospitalPatientId: user.hospitalPatientId
  };

  const token = generateToken(tokenPayload);

  return {
    user: user.toJSON(),
    token
  };
};

/**
 * Authenticate hospital staff / clinician / admin
 */
export const loginStaff = async ({ email, password }) => {
  if (!email || !password) {
    const error = new Error('Staff email and password are required.');
    error.statusCode = 400;
    throw error;
  }

  const admin = await Admin.findOne({ email: email.toLowerCase() });

  if (!admin) {
    const error = new Error('Staff credentials not recognized.');
    error.statusCode = 401;
    throw error;
  }

  if (!admin.isActive) {
    const error = new Error('Staff access revoked. Please contact hospital administrator.');
    error.statusCode = 403;
    throw error;
  }

  const isMatch = await admin.comparePassword(password);
  if (!isMatch) {
    const error = new Error('Staff credentials not recognized.');
    error.statusCode = 401;
    throw error;
  }

  admin.lastLogin = new Date();
  await admin.save();

  const tokenPayload = {
    id: admin._id.toString(),
    role: admin.role,
    name: admin.name,
    email: admin.email,
    staffCode: admin.staffCode,
    department: admin.department
  };

  const token = generateToken(tokenPayload);

  return {
    user: admin.toJSON(),
    token
  };
};

/**
 * Fetch profile of currently authenticated user
 */
export const getProfileByIdAndRole = async (id, role) => {
  if (role === 'patient') {
    const user = await User.findById(id);
    if (!user) throw new Error('Patient profile not found.');
    return user.toJSON();
  } else {
    const admin = await Admin.findById(id);
    if (!admin) throw new Error('Staff profile not found.');
    return admin.toJSON();
  }
};

