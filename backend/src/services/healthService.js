import os from 'os';
import { getDatabaseStatus } from '../config/db.js';
import { env } from '../config/environment.js';

/**
 * Service to aggregate server and database diagnostic status
 */
export const getSystemHealth = () => {
  const dbStatus = getDatabaseStatus();

  return {
    server: {
      status: 'operational',
      hospital: 'Bharti Neuropsychiatry Hospital',
      portal: 'Online Psychological Assessment Portal',
      environment: env.NODE_ENV,
      version: '1.0.0-phase1',
      uptimeSeconds: Math.floor(process.uptime()),
      timestamp: new Date().toISOString(),
      nodeVersion: process.version,
      memory: {
        freeBytes: os.freemem(),
        totalBytes: os.totalmem(),
        processRssBytes: process.memoryUsage().rss
      }
    },
    database: {
      configured: dbStatus.configured,
      status: dbStatus.status,
      isConnected: dbStatus.isConnected,
      host: dbStatus.host,
      databaseName: dbStatus.databaseName,
      message: dbStatus.isConnected
        ? 'Active connection to MongoDB Atlas'
        : (dbStatus.configured 
            ? 'MongoDB Atlas connection attempted or pending' 
            : 'MongoDB Atlas URI not yet configured in .env (expected for Phase 1 clean template)')
    }
  };
};
