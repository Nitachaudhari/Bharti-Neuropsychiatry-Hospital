import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from './config/environment.js';
import { globalRateLimiter } from './middleware/rateLimiter.js';
import { notFoundHandler, errorHandler } from './middleware/errorHandler.js';
import apiRoutes from './routes/apiRoutes.js';

const app = express();

// 1. Security Headers via Helmet
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// 2. CORS Configuration
const allowedOrigins = [env.CORS_ORIGIN, 'http://localhost:5173', 'http://127.0.0.1:5173'];
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, or server-to-server)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || env.isDevelopment) {
      return callback(null, true);
    }
    return callback(new Error('CORS policy: This origin is not authorized to access the API.'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// 3. Request Logging (sanitized format)
if (env.isDevelopment) {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// 4. Rate Limiting
app.use(globalRateLimiter);

// 5. Body Parsers
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// 6. Base Root Route
app.get('/', (req, res) => {
  res.json({
    hospital: 'Bharti Neuropsychiatry Hospital',
    portal: 'Online Psychological Assessment Portal API',
    status: 'online',
    version: '1.0.0-phase1',
    healthCheck: `${env.API_PREFIX}/health`
  });
});

// 7. Mount Versioned / Modular API Routes
app.use(env.API_PREFIX, apiRoutes);

// 8. 404 Fallback
app.use(notFoundHandler);

// 9. Centralized Error Handler
app.use(errorHandler);

export default app;
