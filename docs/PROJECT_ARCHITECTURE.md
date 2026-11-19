# Project Architecture: Bharti Neuropsychiatry Hospital Portal

## 1. System Mission & Context

Bharti Neuropsychiatry Hospital operates an advanced psychiatric and behavioral healthcare facility. The hospital uses multiple specialized psychological assessment applications (e.g., psychometric profiling, cognitive batteries, neuropsychological questionnaires) that were developed independently and are currently deployed on separate external URLs.

### Core Problem
- Patients have to navigate fragmented links.
- Payment collection across online and offline channels lacks unified reconciliation.
- Receptionists and hospital staff need a standardized method to activate tests for patients paying cash or hospital UPI at the front desk.
- Clinicians and administrators require a centralized dashboard to track test status, issue complimentary evaluations, and review clinical reports.

### Strategic Solution: Centralized Hub Architecture
The **Online Psychological Assessment Portal** does **NOT** recreate or duplicate the existing psychological test engines. Instead, it serves as a secure, unified **Control & Orchestration Gateway**:
1. **Catalog & Identity Hub**: Centralized patient registration, authentication, and test directory.
2. **Omnichannel Order & Payment Engine**: Seamless handling of online payments (Razorpay) alongside physical desk transactions (Cash & Staff UPI with manual staff activation).
3. **Secure Dispatch & Integration Layer**: Generates single-use, time-delimited, cryptographically signed test access tokens (JWT/HMAC) and redirects patients to their assigned external test URLs.
4. **Callback & Results Aggregator**: Listens for completion webhooks/APIs from external test applications to record completion status, scores, and clinical report references.
5. **Role-Based Governance**: Dedicated dashboards for Patients, Receptionists/Staff, and Clinical Administrators.

---

## 2. High-Level System Architecture Diagram

```
+---------------------------------------------------------------------------------------------------------+
|                                    BHARTI NEUROPSYCHIATRY HOSPITAL                                     |
|                                ONLINE PSYCHOLOGICAL ASSESSMENT PORTAL                                   |
+---------------------------------------------------------------------------------------------------------+
                                                     |
       +---------------------------------------------+---------------------------------------------+
       |                                             |                                             |
       v                                             v                                             v
 [ Patient Client ]                         [ Hospital Staff UI ]                         [ Admin Dashboard ]
 (React + Vite + Tailwind)                  (Receptionist Counter)                       (Clinical Management)
       |                                             |                                             |
       +---------------------------------------------+---------------------------------------------+
                                                     |
                                                     | HTTPS / REST APIs
                                                     v
                                +------------------------------------------+
                                |          BACKEND API GATEWAY             |
                                |       (Node.js + Express.js)             |
                                |                                          |
                                | - Helmet & CORS Security Headers        |
                                | - Express Rate Limiting                  |
                                | - JWT & RBAC Authorization Middleware    |
                                | - Centralized Error Handler              |
                                +------------------------------------------+
                                     |                |                |
                +--------------------+                |                +--------------------+
                |                                     |                                     |
                v                                     v                                     v
+-------------------------------+   +-------------------------------+   +-------------------------------+
|     DATA PERSISTENCE LAYER    |   |     PAYMENT ORCHESTRATION     |   |   EXTERNAL TEST INTEGRATION   |
|   (MongoDB Atlas + Mongoose)  |   |                               |   |                               |
|                               |   | - Razorpay Payment Gateway    |   | - Signed Test Access Tokens   |
| - Users & Admins              |   | - Cash Counter Verification   |   | - Launch Redirect Gateway     |
| - Tests & Sessions            |   | - Staff Offline UPI Auditor   |   | - Completion Webhooks         |
| - Orders, Payments & Audits   |   | - Manual Activation Engine    |   | - Result & Report Sync        |
+-------------------------------+   +-------------------------------+   +-------------------------------+
                                                                                        |
                                                                                        v
                                                                        +-------------------------------+
                                                                        |  EXISTING EXTERNAL TEST APPS  |
                                                                        | (Deployed Separately on Web)  |
                                                                        | - Test App A (e.g. Cognitive) |
                                                                        | - Test App B (e.g. Personality|
                                                                        | - Test App C (e.g. Neuro)     |
                                                                        +-------------------------------+
```

---

## 3. Component Architecture

### 3.1 Frontend (`/frontend`)
- **Framework**: React 18+ with Vite for ultra-fast bundling and modern ES modules.
- **Styling**: Tailwind CSS for a professional, accessible healthcare design system (Navy blue, teal, clean white).
- **Routing**: `react-router-dom` with route guards separating Public, Patient, Staff, and Admin layouts.
- **Service Layer**: Centralized API abstraction module (`src/services/`) configured with base URLs, interceptors for JWT tokens, and structured error propagation.

### 3.2 Backend (`/backend`)
- **Runtime**: Node.js LTS (v20+).
- **Framework**: Express.js structured across a 3-tier enterprise pattern:
  - **Controllers**: Handle HTTP request extraction, validation dispatch, and response formatting.
  - **Services**: Contain pure business logic (payment validation, token minting, session lifecycle).
  - **Data Access**: Mongoose models interacting with MongoDB Atlas clusters.
- **Cross-Cutting Concerns**:
  - `middleware/errorHandler.js`: Intercepts operational vs. programmatic errors, sanitizing production outputs.
  - `middleware/rateLimiter.js`: Defends against brute-force and DoS vectors.
  - `config/db.js`: Resilient connection manager with auto-reconnect, exponential backoff, and graceful teardown.

---

## 4. Integration Strategy for Existing External Test Applications

Rather than rebuilding existing tested and validated psychological apps, the portal integrates with them via a **Secure Tokenized Handshake**:

```
[Patient] ---> Portal purchases/activates test ---> Portal issues short-lived single-use Launch Token
   |
   +---> Redirects patient to: https://test-app-x.hospital.com?session_token=<JWT_TOKEN>
            |
            v
   [External Test App] validates token via Portal Public Key / Introspection API:
            POST /api/v1/sessions/verify-token
            |
            v
   Patient completes test on External App
            |
            v
   [External Test App] posts completion result to Portal Webhook:
            POST /api/v1/webhooks/test-completion
            (Payload signed with shared HMAC secret)
            |
            v
   Portal records completion, updates TestSession, and unlocks patient/clinician report.
```

---

## 5. Deployment & Hosting Strategy

- **Frontend Client**: Deployed on Netlify / Hostinger static CDN with custom domain (`portal.bhartihospital.com`).
- **Backend API Gateway**: Deployed on Render containerized web service with SSL termination and health-check monitoring (`api.bhartihospital.com`).
- **Database**: MongoDB Atlas Managed M10+ replica set with automated backups, encryption at rest, and IP access control list.
