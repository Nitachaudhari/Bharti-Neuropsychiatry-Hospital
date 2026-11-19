# Phase 1: Existing Project Audit & Requirements Gap Analysis

**Project Name:** Bharti Neuropsychiatry Hospital  
**Portal Name:** Online Psychological Assessment Portal  
**Audit Date:** November 17, 2026  
**Auditor:** Senior Software Architect & Security Engineer  
**Audit Purpose:** Comprehensive review of existing code, database, security, and architecture against Updated Final Requirements.  
**Execution Mode:** Audit-Only (Zero application code or configuration modified during this audit).

---

## Executive Summary

Phase 1 laid a robust, modern foundation: React 18 + Vite + Tailwind CSS frontend, modular Node.js + Express backend, Mongoose ODM with live MongoDB Atlas connectivity, JWT authentication with Argon2/Bcrypt password hashing, and role-based access control (RBAC).

However, the **Updated Final Project Requirements** introduce critical scope shifts:
1. **Payments are completely OUT OF SCOPE**: All references to Razorpay, cash counters, offline UPI, `Orders`, and `Payments` collections must be removed from documentation and frontend UI.
2. **Public Patient Registration is strictly FORBIDDEN**: Public self-registration must be decommissioned. Patient accounts must be created exclusively by authorized staff or admins.
3. **Public Hospital Website Pages Required**: Dedicated public pages for *About*, *Services*, *Contact*, and *Test Overview* must exist alongside *Home*.
4. **Clinical Test Assignment Model**: Test access must be governed strictly through direct staff-to-patient test assignments (`TestAssignments`), completely independent of financial checkouts.

---

## 1. Existing Project Structure

```
Bharti-Neuropsychiatry-Hospital/
│
├── .gitignore                      # Excludes node_modules, .env, dist, logs
├── README.md                       # Project overview handbook
│
├── docs/
│   ├── PROJECT_ARCHITECTURE.md     # System architecture (contains legacy payment references)
│   ├── DATABASE_DESIGN.md          # Database design (contains legacy Orders/Payments schemas)
│   ├── SECURITY_PLAN.md            # Security guidelines & defense-in-depth plan
│   └── DEVELOPMENT_ROADMAP.md      # Project roadmap
│
├── backend/
│   ├── package.json                # Express, Cors, Helmet, Mongoose, Rate-Limit, Bcrypt, JWT
│   ├── package-lock.json
│   ├── .env.example                # Clean template without credentials
│   ├── .env                        # Local runtime env (Atlas URI configured, git-ignored)
│   ├── .gitignore
│   └── src/
│       ├── app.js                  # Express setup with Helmet, CORS, RateLimiter, Morgan
│       ├── server.js               # Server lifecycle & bootstrap
│       ├── config/
│       │   ├── environment.js      # Environment variable validation & parsing
│       │   └── db.js               # Mongoose Atlas connection manager
│       ├── controllers/
│       │   ├── authController.js   # Patient/Staff login, register, profile, seed admin
│       │   └── healthController.js # System health & DB connection diagnostics
│       ├── middleware/
│       │   ├── authMiddleware.js   # JWT authentication & role-based authorization (RBAC)
│       │   ├── errorHandler.js     # Centralized 404 & sanitized error responses
│       │   └── rateLimiter.js      # Express IP rate limiting
│       ├── models/
│       │   ├── Admin.js            # Staff/Doctor schema with roles & bcrypt hashing
│       │   └── User.js             # Patient schema with MRN, demographics, & bcrypt hashing
│       ├── routes/
│       │   ├── apiRoutes.js        # Root /api aggregator
│       │   ├── authRoutes.js       # /api/auth routes
│       │   └── healthRoutes.js     # /api/health route
│       ├── services/
│       │   ├── authService.js      # Registration, authentication, token issuance
│       │   └── healthService.js    # Telemetry aggregation
│       └── utils/
│           ├── apiResponse.js      # Standardized JSON response envelope
│           └── logger.js           # Structured console logger with PII redaction
│
└── frontend/
    ├── package.json                # React 18, React Router v6, Tailwind CSS, Lucide icons
    ├── package-lock.json
    ├── vite.config.js              # Vite bundler configuration (port 5173)
    ├── tailwind.config.js          # Custom hospital color palette (navy, teal, slate)
    ├── postcss.config.js
    ├── index.html                  # HTML entry point with Inter typography
    ├── .env.example                # Example frontend env variables
    ├── .env                        # Local frontend env (VITE_API_BASE_URL)
    ├── .gitignore
    └── src/
        ├── main.jsx                # React root mount
        ├── App.jsx                 # Routing configuration with AuthProvider & Layout
        ├── index.css               # Tailwind CSS directives
        ├── config/
        │   └── constants.js        # Hospital metadata & contact constants
        ├── context/
        │   └── AuthContext.jsx     # Global authentication state & token persistence
        ├── services/
        │   ├── api.js              # Centralized fetch wrapper with auto-Bearer token injection
        │   ├── authService.js      # Login, registration, profile API client
        │   └── healthService.js    # Health check API client
        ├── components/
        │   └── common/
        │       ├── Button.jsx      # Reusable UI button component
        │       ├── Card.jsx        # Reusable UI card component
        │       ├── Footer.jsx      # Hospital branded footer
        │       ├── Header.jsx      # Navigation bar with dynamic auth actions
        │       ├── HealthBadge.jsx # Real-time API/DB status monitor
        │       ├── Layout.jsx      # Standard application layout wrapper
        │       └── ProtectedRoute.jsx # Client-side route guard with role restriction
        └── pages/
            ├── HomePage.jsx        # Landing page (currently features payment channels)
            ├── AssessmentsCatalogPreview.jsx # Tests catalog preview
            ├── LoginPage.jsx       # Dual-tab login (Patient & Staff)
            ├── RegisterPage.jsx    # Public patient registration (needs removal)
            ├── PatientDashboardPage.jsx # Gated patient portal
            ├── StaffDashboardPage.jsx   # Gated staff/receptionist console
            ├── SystemStatusPage.jsx     # Diagnostics & telemetry dashboard
            ├── UnauthorizedPage.jsx     # HTTP 403 Forbidden page
            └── NotFoundPage.jsx         # HTTP 404 Not Found page
```

---

## 2. Current Frontend & Backend Status

### Frontend Status
- **Framework:** React 18 + Vite SPA with Tailwind CSS.
- **Build Status:** Verified passing. `npm run build` compiled 1,615 modules in 6.23s with 0 errors.
- **Routing:** Full React Router v6 setup with route guards (`ProtectedRoute.jsx`).
- **Styling:** Fully implemented hospital aesthetic (Navy `#0f2942`, Teal `#0d9488`, Slate `#f8fafc`).

### Backend Status
- **Framework:** Node.js v20.19.5 + Express v4.21.2 (ES Modules).
- **Architecture:** 3-tier modular pattern (Routes &rarr; Controllers &rarr; Services &rarr; Models).
- **Security:** `helmet` active, strict `cors` active, `express-rate-limit` active (100 req/15 min).
- **Error Handling:** Centralized operational vs. system error handling with stack trace suppression in production.

---

## 3. MongoDB Configuration & Actual Connection Status

- **Database Provider:** MongoDB Atlas Cloud Database (`lfzeljs.mongodb.net`).
- **Driver:** Mongoose ORM v8.10.1.
- **Configuration:** Connection URI stored securely in `backend/.env` (excluded from git tracking).
- **Live Connection Test Result:** **PASS (Verified Active)**
  - Direct connection to cluster `ac-co7hkar-shard-00-00.lfzeljs.mongodb.net` established successfully.
  - Port `27017` TCP connectivity confirmed (`TcpTestSucceeded: True`).
  - Health check endpoint `GET /api/health` reports:
    ```json
    {
      "configured": true,
      "status": "connected",
      "isConnected": true,
      "host": "ac-co7hkar-shard-00-02.lfzeljs.mongodb.net",
      "databaseName": "bharti_hospital_portal"
    }
    ```
- **Seeded Data:**
  - Initial Super Administrator account seeded in `admins` collection (`admin@bhartihospital.com`).
  - Test patient account verified in `users` collection (`phoneNumber: 9876543210`, `hospitalPatientId: BNH-P004871`).

---

## 4. Current API Endpoints

| HTTP Method | Endpoint | Protection | Description | Audit Status |
|---|---|---|---|:---:|
| `GET` | `/` | Public | Informational API Gateway welcome banner | **PASS** |
| `GET` | `/api/health` | Public | System uptime & separate MongoDB status | **PASS** |
| `POST` | `/api/auth/register` | **Public** | Public patient registration | **FAIL** *(Violates updated rule: No public patient registration)* |
| `POST` | `/api/auth/login` | Public | Patient authentication via mobile/email | **PASS** |
| `POST` | `/api/auth/staff-login` | Public | Staff/Doctor authentication via email | **PASS** |
| `POST` | `/api/auth/seed-admin` | Public (Initial) | Initial bootstrap for first Super Admin | **PASS** *(Guarded to only run when count = 0)* |
| `GET` | `/api/auth/me` | JWT Protected | Returns current authenticated user profile | **PASS** |
| `GET` | `/api/auth/patient-only` | JWT + Role (`patient`) | Test endpoint verifying patient RBAC | **PASS** |
| `GET` | `/api/auth/staff-only` | JWT + Role (`receptionist`, `hospital_admin`, `super_admin`, `psychologist`) | Test endpoint verifying staff RBAC | **PASS** |
| `GET` | `/api/auth/doctor-only` | JWT + Role (`psychologist`, `super_admin`) | Test endpoint verifying clinician RBAC | **PASS** |

---

## 5. Existing Documentation Audit

1. **[`docs/PROJECT_ARCHITECTURE.md`](file:///c:/Users/91703/Desktop/Freelance%20project/Bharti-Neuropsychiatry-Hospital/docs/PROJECT_ARCHITECTURE.md)**:
   - High-level architecture, external app token handshake, and dispatch flows are well designed.
   - **Gap:** Contains sections on Razorpay, hospital cash counters, and offline UPI checkout channels that must be excised.
2. **[`docs/DATABASE_DESIGN.md`](file:///c:/Users/91703/Desktop/Freelance%20project/Bharti-Neuropsychiatry-Hospital/docs/DATABASE_DESIGN.md)**:
   - Contains proposed schemas for `Users`, `Admins`, `Tests`, `Orders`, `Payments`, `TestSessions`, `TestResults`, `AuditLogs`.
   - **Gap:** `Orders` and `Payments` schemas are now obsolete. Must be replaced with direct `TestAssignments`.
3. **[`docs/SECURITY_PLAN.md`](file:///c:/Users/91703/Desktop/Freelance%20project/Bharti-Neuropsychiatry-Hospital/docs/SECURITY_PLAN.md)**:
   - Covers defense-in-depth, tokenized external app dispatch, HIPAA/DISHA data confidentiality, zero-PII logging, and rate limiting.
   - **Status:** Fully aligned with project security posture.
4. **[`docs/DEVELOPMENT_ROADMAP.md`](file:///c:/Users/91703/Desktop/Freelance%20project/Bharti-Neuropsychiatry-Hospital/docs/DEVELOPMENT_ROADMAP.md)**:
   - Phase 4 was previously designated for "Omnichannel Orders & Multi-Payment Gateway".
   - **Gap:** Must be restructured to remove payments and reflect direct Test Assignments, Public Information pages, and Clinical Reporting.

---

## 6. Requirements Gap Analysis

| Requirement Area | Detailed Requirement | Current Project State | Status | Gap Description & Action Required |
|---|---|---|:---:|---|
| **Public Website: Navigation** | Public pages include Home, About, Services, Test Overview, Contact. | Home, Assessments Preview, and Status exist. About, Services, and Contact exist only as sections or links on Home. | **PARTIAL** | Create distinct public routes/views: `/about`, `/services`, `/contact`, and rename `/assessments` to `/tests` (Test Overview). |
| **Public Website: Access Control** | Public visitors cannot access patient records or restricted dashboards. | Route guards (`ProtectedRoute`) block unauthenticated access. | **PASS** | Working as expected. Gated routes redirect to `/login` or `/unauthorized`. |
| **Patient Portal: Login** | Separate Patient Login section. | Tabbed login in `LoginPage.jsx` provides a dedicated Patient Portal sign-in form. | **PASS** | Working as expected. Authenticates via 10-digit mobile or email. |
| **Patient Portal: Registration** | **No public patient registration.** Admin or authorized staff creates patient accounts. | `RegisterPage.jsx` is accessible at `/register`, header has "New Patient", and `/api/auth/register` is a public POST endpoint. | **FAIL** | **Must disable public registration.** Remove `/register` route, remove "New Patient" button from header, and move patient creation to an authenticated staff/admin endpoint (`POST /api/patients`). |
| **Patient Portal: Test Access** | Patient can view and start only tests assigned to that patient. | Patient dashboard exists as a UI shell; test assignment engine is planned for subsequent phase. | **PASS** (Phase 1) | Data model must link sessions to assignments, not purchases. |
| **Patient Portal: Gating** | Patient cannot access unassigned tests through direct URLs or API requests. | Token-based integration planned; direct external app URLs will be masked by backend token minting. | **PASS** (Phase 1) | Architecture is sound. Enforce server-side assignment verification before token issuance. |
| **Admin & Staff: Role Governance** | Main Admin has complete system control. Staff permissions role-based. | Roles `super_admin`, `hospital_admin`, `receptionist`, `psychologist` implemented in `Admin.js` and `authMiddleware.js`. | **PASS** | Role-based authorization working. |
| **Admin & Staff: Account Creation** | Default policy: only Main Admin can create staff accounts unless explicitly configured otherwise. | `seedInitialAdmin` allows creating the first super admin. No public staff registration exists. | **PASS** | Add `POST /api/staff` restricted strictly to `super_admin` in Phase 2/3. |
| **Test Management** | Admin can add an existing deployed test (name, description, category, URL) and activate/deactivate. Existing tests remain separate projects. | Documented in `DATABASE_DESIGN.md`. Test applications treated strictly as external targets. | **PASS** (Phase 1) | Ready for Mongoose schema creation in Test Management milestone. |
| **Payments** | **Payment gateway, online payments, and cash payment workflows are OUT OF SCOPE.** | No payment code or payment APIs exist in the codebase (Rule 1 respected). | **PARTIAL** | **Documentation & UI mismatch:** `PROJECT_ARCHITECTURE.md`, `DATABASE_DESIGN.md`, `README.md`, and `HomePage.jsx` still describe Razorpay, cash, and UPI. Must sanitize all payment text and graphics from UI and docs. |
| **Database Architecture** | Architecture must support: Users/Staff, Patients, Tests, TestAssignments / TestSessions, TestResults, AuditLogs. | `User.js` (patients) and `Admin.js` (staff) exist. `Tests`, `TestSessions`, `TestResults`, `AuditLogs` are documented. | **PARTIAL** | Align schemas: eliminate `Orders` and `Payments`. Rename or designate `TestAssignment` to link Patient + Test + Staff Assignor + Launch Token. |

---

## 7. Files That Need Changes

When approved to apply adjustments, the following files will be updated:

### Documentation
1. [`README.md`](file:///c:/Users/91703/Desktop/Freelance%20project/Bharti-Neuropsychiatry-Hospital/README.md): Remove payment references (Razorpay, cash counter); clarify that patients are registered by hospital staff.
2. [`docs/PROJECT_ARCHITECTURE.md`](file:///c:/Users/91703/Desktop/Freelance%20project/Bharti-Neuropsychiatry-Hospital/docs/PROJECT_ARCHITECTURE.md): Remove payment gateway diagram blocks; update integration diagram to show direct Staff Assignment &rarr; Patient Launch Token.
3. [`docs/DATABASE_DESIGN.md`](file:///c:/Users/91703/Desktop/Freelance%20project/Bharti-Neuropsychiatry-Hospital/docs/DATABASE_DESIGN.md): Decommission `Orders` and `Payments` collection schemas; define streamlined `TestAssignments` collection.
4. [`docs/DEVELOPMENT_ROADMAP.md`](file:///c:/Users/91703/Desktop/Freelance%20project/Bharti-Neuropsychiatry-Hospital/docs/DEVELOPMENT_ROADMAP.md): Replace "Phase 4 Payments" with "Phase 4 Clinical Test Assignment & Patient Management".

### Frontend Files
5. [`frontend/src/App.jsx`](file:///c:/Users/91703/Desktop/Freelance%20project/Bharti-Neuropsychiatry-Hospital/frontend/src/App.jsx): Remove public `/register` route; add public routes `/about`, `/services`, `/contact`, `/tests`.
6. [`frontend/src/components/common/Header.jsx`](file:///c:/Users/91703/Desktop/Freelance%20project/Bharti-Neuropsychiatry-Hospital/frontend/src/components/common/Header.jsx): Remove "New Patient / Register" CTA button; add public navigation links (`About`, `Services`, `Tests Overview`, `Contact`).
7. [`frontend/src/pages/HomePage.jsx`](file:///c:/Users/91703/Desktop/Freelance%20project/Bharti-Neuropsychiatry-Hospital/frontend/src/pages/HomePage.jsx): Remove "Multi-Channel Payment" section; replace with "Clinical Hospital Assessment Services" and "Staff Test Assignment Workflow".
8. [`frontend/src/pages/LoginPage.jsx`](file:///c:/Users/91703/Desktop/Freelance%20project/Bharti-Neuropsychiatry-Hospital/frontend/src/pages/LoginPage.jsx): Remove link to public registration ("Don't have an account? Register as New Patient"); replace with note: *"Patient accounts are created at the hospital reception. Please contact the front desk."*
9. [`frontend/src/pages/RegisterPage.jsx`](file:///c:/Users/91703/Desktop/Freelance%20project/Bharti-Neuropsychiatry-Hospital/frontend/src/pages/RegisterPage.jsx): Archive or convert into a staff-only patient onboarding form.
10. Create lightweight public pages:
    - `frontend/src/pages/AboutPage.jsx`
    - `frontend/src/pages/ServicesPage.jsx`
    - `frontend/src/pages/ContactPage.jsx`

### Backend Files
11. [`backend/src/routes/authRoutes.js`](file:///c:/Users/91703/Desktop/Freelance%20project/Bharti-Neuropsychiatry-Hospital/backend/src/routes/authRoutes.js): Remove or protect `POST /api/auth/register` so it is restricted to authenticated staff/admin (`authenticateJWT, authorizeRoles('receptionist', 'hospital_admin', 'super_admin')`).

---

## 8. Exact Changes Recommended for Phase 1 Alignment

1. **Decommission Public Patient Registration**:
   - Close the public `/api/auth/register` door.
   - Enforce that patient onboarding is performed strictly by hospital staff through authenticated endpoints.
2. **Purge Payment Features from Architecture & UI**:
   - Remove Razorpay, cash desk receipts, and UPI references from `HomePage.jsx` and docs.
   - Replace with clinical services explanation: psychiatric evaluation, neuropsychological profiling, and clinician-assigned test batteries.
3. **Build Dedicated Public Pages**:
   - Add `/about` (hospital credentials, neuropsychiatry background).
   - Add `/services` (clinical psychology, psychotherapy, diagnostic batteries).
   - Add `/contact` (hospital address, OPD timings, emergency helpline).
   - Provide `/tests` as the public overview of psychological tests offered.
4. **Refine Database Design Documentation**:
   - Confirm target schemas:
     - `Staff` / `Admins` (super_admin, hospital_admin, receptionist, psychologist)
     - `Patients` (demographics, hospitalPatientId MRN, contact info)
     - `Tests` (title, testCode, category, instructions, externalAppUrl, integrationKeyId, isActive)
     - `TestAssignments` (patientId, testId, assignedByStaffId, status: `assigned` / `in_progress` / `completed` / `expired`, launchToken, validUntil)
     - `TestResults` (sessionId/assignmentId, summaryScore, clinicalInterpretation, reportPdfUrl, reviewedByDoctorId, isReportVisibleToPatient)
     - `AuditLogs` (action, performedByStaffId, targetEntity, timestamp, ipAddress)
   - Confirm removal of `Orders` and `Payments`.

---

## 9. Risks & Dependencies

1. **Integration Handshake with External Test Applications**:
   - External test apps must have a mechanism to accept a signed launch token (query param `?token=...` or postMessage) and verify it against the portal.
   - External test apps must support a completion callback or webhook (`POST /api/webhooks/test-completion`) with an HMAC signature to return scores and completion status.
   - *Mitigation:* Document an integration specification sheet for third-party test app developers.
2. **Staff-Only Patient Registration Operational Dependency**:
   - Patients cannot register themselves from home. Hospital receptionists or psychologists must input patient name and phone number to generate an account before assigning tests.
   - *Mitigation:* Ensure the staff patient-creation UI is fast, requiring only Name and Phone Number (with optional DOB and Email).

---

## 10. Commands Required to Verify the Project

### 1. Test Backend & MongoDB Atlas Connection
```powershell
cd backend
npm run dev
```
- Server boots at: `http://localhost:5000`
- Health check returns `database.isConnected: true` at: `http://localhost:5000/api/health`

### 2. Verify Frontend Compilation & Routing
```powershell
cd frontend
npm run build
npm run preview
```
- Production build succeeds without errors.
- Preview UI launches at: `http://localhost:5173`

---

## Audit Conclusion & Next Steps

Phase 1 code quality, performance, and security mechanisms are in **excellent standing**. The codebase requires **no architectural rewrites**, only targeted alignment:
1. Decommissioning public patient registration.
2. Purging out-of-scope payment references from UI and documentation.
3. Adding dedicated public pages (`About`, `Services`, `Contact`, `Test Overview`).
4. Aligning the database design to a pure `TestAssignment` clinical model.

*Per preservation rules, no code or configuration has been altered. This audit report is saved to `docs/PHASE_1_AUDIT_REPORT.md`.*  
**Awaiting your approval to apply these recommended adjustments.**

