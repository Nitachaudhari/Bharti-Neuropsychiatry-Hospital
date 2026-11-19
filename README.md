# Bharti Neuropsychiatry Hospital — Online Psychological Assessment Portal

A centralized, secure, and scalable clinical assessment portal for **Bharti Neuropsychiatry Hospital**.

This system serves as an enterprise gateway connecting patients, receptionists, clinicians, and hospital administrators to specialized, standalone psychological assessment modules with role-based access, multi-channel payment reconciliation (Razorpay, hospital cash counters, staff UPI), and clinical test session tracking.

---

## 🏛️ Project Architecture Overview

```
Bharti-Neuropsychiatry-Hospital/
│
├── frontend/             # React + Vite + Tailwind CSS Single Page Application
│   ├── src/
│   │   ├── assets/       # Static branding assets and icons
│   │   ├── components/   # Reusable UI & healthcare layout components
│   │   ├── config/       # Environment & runtime constants
│   │   ├── pages/        # Route page views (Home, About, Assessment Catalog)
│   │   ├── services/     # Centralized Axios/fetch API layer
│   │   ├── App.jsx       # Root router & application shell
│   │   └── main.jsx      # Vite React entry point
│   ├── .env.example      # Example frontend environment variables
│   └── package.json
│
├── backend/              # Node.js + Express REST API Gateway
│   ├── src/
│   │   ├── config/       # Database & environment configurations
│   │   ├── controllers/  # API endpoint controllers
│   │   ├── middleware/   # Rate limiting, security headers, error handling
│   │   ├── routes/       # API route definitions
│   │   ├── services/     # Business logic & external system services
│   │   ├── utils/        # Structured logging & response formatters
│   │   ├── app.js        # Express application configuration
│   │   └── server.js     # Server lifecycle & bootstrap
│   ├── .env.example      # Example backend environment variables
│   └── package.json
│
├── docs/                 # Architectural & Engineering Documentation
│   ├── PROJECT_ARCHITECTURE.md
│   ├── DATABASE_DESIGN.md
│   ├── SECURITY_PLAN.md
│   └── DEVELOPMENT_ROADMAP.md
│
├── .gitignore            # Git exclusion rules preventing credential leaks
└── README.md             # Project handbook
```

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- **Node.js**: `v20.x` or later
- **npm**: `v10.x` or later
- **MongoDB Atlas** or local MongoDB instance (optional for Phase 1 health check)

---

### 1. Backend Setup

```bash
cd backend

# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env
# Edit .env if you wish to connect to a real MongoDB Atlas cluster

# 3. Start development server
npm run dev
# Server runs at http://localhost:5000
# Health check available at http://localhost:5000/api/health
```

---

### 2. Frontend Setup

```bash
cd frontend

# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env

# 3. Start development server
npm run dev
# Frontend runs at http://localhost:5173
```

---

## 🔒 Security Principles

- **Zero Secret Exposure**: All keys, connection strings, and webhook secrets reside in environment variables excluded from Git tracking.
- **Defense in Depth**: HTTP security headers via `Helmet`, strict CORS origin matching, IP rate limiting via `express-rate-limit`, and centralized sanitization.
- **HIPAA / Healthcare Compliance Ready**: Segregated clinical report access, cryptographically signed test access tokens, and comprehensive audit trails.

---

## 📋 Phase 1 Status

- ✅ Modular project directory structure created.
- ✅ Backend Express foundation with `/api/health` status reporting.
- ✅ MongoDB Atlas Mongoose connection architecture with graceful error handling.
- ✅ Frontend React + Vite + Tailwind CSS shell with branded hospital UI.
- ✅ Live communication between frontend and backend verified.
- ✅ Architecture, database, security, and roadmap documentation complete.

For details on future phases and database schemas, please review the files in the [`docs/`](file:///c:/Users/91703/Desktop/Freelance%20project/Bharti-Neuropsychiatry-Hospital/docs) directory.
