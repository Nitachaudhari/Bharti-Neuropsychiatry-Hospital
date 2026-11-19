import app from './app.js';
import { env } from './config/environment.js';
import { connectDB, closeDB } from './config/db.js';
import { logger } from './utils/logger.js';

const startServer = async () => {
  try {
    // Attempt database connection (honest status logging, won't crash if unconfigured in Phase 1)
    await connectDB();

    // Start listening
    const server = app.listen(env.PORT, () => {
      logger.info(`=======================================================`);
      logger.info(` Bharti Neuropsychiatry Hospital API Gateway Started`);
      logger.info(` Environment : ${env.NODE_ENV}`);
      logger.info(` Port        : ${env.PORT}`);
      logger.info(` Health API  : http://localhost:${env.PORT}${env.API_PREFIX}/health`);
      logger.info(` Allowed CORS: ${env.CORS_ORIGIN}`);
      logger.info(`=======================================================`);
    });

    // Graceful Termination Handlers
    const shutdown = async (signal) => {
      logger.info(`${signal} signal received: closing HTTP server and database connections...`);
      server.close(async () => {
        logger.info('HTTP server closed.');
        await closeDB();
        process.exit(0);
      });

      // Force close if clean shutdown hangs
      setTimeout(() => {
        logger.error('Forced shutdown due to timeout.');
        process.exit(1);
      }, 10000);
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));

    process.on('unhandledRejection', (reason, promise) => {
      logger.error('Unhandled Promise Rejection at:', promise);
      logger.error('Reason:', reason);
    });

    process.on('uncaughtException', (error) => {
      logger.error('Uncaught Exception thrown:', error);
      process.exit(1);
    });

    return server;
  } catch (error) {
    logger.error('Fatal error during server startup:', error);
    process.exit(1);
  }
};

startServer();
