import mongoose from 'mongoose';
import { env } from './environment.js';
import { logger } from '../utils/logger.js';

const connectionStates = {
  0: 'disconnected',
  1: 'connected',
  2: 'connecting',
  3: 'disconnecting'
};

/**
 * Connect to MongoDB Atlas
 * Safe initialization: logs status honestly without false positive claims
 */
export const connectDB = async () => {
  if (!env.MONGODB_URI || env.MONGODB_URI.includes('<password>')) {
    logger.warn('MongoDB Atlas URI is not configured or contains placeholder credentials. Database connection deferred.');
    return {
      connected: false,
      status: 'unconfigured',
      message: 'MongoDB URI pending configuration in .env'
    };
  }

  try {
    const conn = await mongoose.connect(env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      autoIndex: env.isDevelopment
    });

    logger.info(`MongoDB Atlas Connected: ${conn.connection.host}`);

    mongoose.connection.on('error', (err) => {
      logger.error('MongoDB runtime connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB connection lost. Reconnecting...');
    });

    return {
      connected: true,
      status: 'connected',
      host: conn.connection.host
    };
  } catch (error) {
    logger.error('Failed to establish MongoDB Atlas connection:', error);
    return {
      connected: false,
      status: 'connection_failed',
      error: error.message
    };
  }
};

/**
 * Returns the live database connection status
 */
export const getDatabaseStatus = () => {
  const readyState = mongoose.connection.readyState;
  const statusName = connectionStates[readyState] || 'unknown';

  return {
    configured: Boolean(env.MONGODB_URI && !env.MONGODB_URI.includes('<password>')),
    readyState,
    status: statusName,
    isConnected: readyState === 1,
    host: mongoose.connection.host || null,
    databaseName: mongoose.connection.name || null
  };
};

/**
 * Graceful database disconnection for process termination
 */
export const closeDB = async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.close();
    logger.info('MongoDB connection closed gracefully.');
  }
};
