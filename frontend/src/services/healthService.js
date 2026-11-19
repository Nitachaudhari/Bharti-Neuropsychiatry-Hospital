import { api } from './api.js';

/**
 * Health check API service
 */
export const healthService = {
  /**
   * Fetches the current health status of the backend API and database
   */
  async getHealth() {
    return api.get('/health');
  }
};
