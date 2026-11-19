import { api } from './api.js';

export const authService = {
  /**
   * Register a new patient
   */
  async register(data) {
    return api.post('/auth/register', data);
  },

  /**
   * Patient login
   */
  async login(credentials) {
    return api.post('/auth/login', credentials);
  },

  /**
   * Staff login (receptionist, doctor, admin)
   */
  async staffLogin(credentials) {
    return api.post('/auth/staff-login', credentials);
  },

  /**
   * Fetch current authenticated profile
   */
  async getProfile() {
    return api.get('/auth/me');
  },

  /**
   * Initial administrator seeding helper
   */
  async seedAdmin(adminData) {
    return api.post('/auth/seed-admin', adminData);
  }
};

