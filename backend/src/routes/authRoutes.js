import { Router } from 'express';
import { 
  register, 
  login, 
  staffLogin, 
  getMe, 
  seedInitialAdmin 
} from '../controllers/authController.js';
import { authenticateJWT, authorizeRoles } from '../middleware/authMiddleware.js';
import { sendSuccess } from '../utils/apiResponse.js';

const router = Router();

// Public Authentication Endpoints
router.post('/register', register);
router.post('/login', login);
router.post('/staff-login', staffLogin);
router.post('/seed-admin', seedInitialAdmin);

// Protected Authentication Endpoints
router.get('/me', authenticateJWT, getMe);

// Clinical RBAC Verification Endpoints
router.get('/patient-only', authenticateJWT, authorizeRoles('patient'), (req, res) => {
  return sendSuccess(res, 'Access granted to Patient Protected Assessment Portal', {
    user: req.user
  });
});

router.get(
  '/staff-only',
  authenticateJWT,
  authorizeRoles('receptionist', 'hospital_admin', 'super_admin', 'psychologist'),
  (req, res) => {
    return sendSuccess(res, 'Access granted to Hospital Front-Desk Staff Console', {
      user: req.user
    });
  }
);

router.get(
  '/doctor-only',
  authenticateJWT,
  authorizeRoles('psychologist', 'super_admin'),
  (req, res) => {
    return sendSuccess(res, 'Access granted to Clinical Psychological Evaluation Hub', {
      user: req.user
    });
  }
);

export default router;

