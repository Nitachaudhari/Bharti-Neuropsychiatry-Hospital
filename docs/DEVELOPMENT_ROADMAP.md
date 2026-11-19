# Development Roadmap: Bharti Neuropsychiatry Hospital

## Overview
This roadmap lays out the phased evolution of the centralized online psychological testing portal from inception to clinical go-live.

---

## 📍 Phase 1: Foundation & Architecture (Current Phase)
- [x] Workspace inspection and root project structure creation.
- [x] Modular backend architecture with Node.js and Express.
- [x] Mongoose connection manager with resilient status reporting.
- [x] Health check endpoint (`GET /api/health`).
- [x] Security baseline: Helmet, CORS, Rate-Limiting, centralized error handling.
- [x] Frontend initialization with React, Vite, and Tailwind CSS.
- [x] Branded hospital shell (Navy Blue, Teal, White) with live backend health monitor.
- [x] Complete architecture, database, security, and roadmap documentation.

---

## 📍 Phase 2: Authentication & Role-Based Authorization
- [ ] User and Admin Mongoose schemas with password hashing (Argon2 / Bcrypt).
- [ ] Patient registration and login flows with email/phone verification.
- [ ] Staff and Admin role-based access control (Super Admin, Hospital Admin, Receptionist, Psychologist).
- [ ] JWT / Secure HTTP-Only Cookie session management.
- [ ] Password reset and account recovery.
- [ ] Frontend authentication context and protected route guards.

---

## 📍 Phase 3: Psychological Assessment Catalog Management
- [ ] Tests schema implementation with pricing, descriptions, and duration.
- [ ] Admin CRUD interfaces to manage assessment catalog and external URLs.
- [ ] Public assessment catalog page with filtering by category (Cognitive, Personality, Mood).
- [ ] Test detail view with instructions, clinical prerequisites, and fees.

---

## 📍 Phase 4: Omnichannel Orders & Multi-Payment Gateway
- [ ] Orders and Payments schema implementation.
- [ ] Razorpay online checkout integration (Order creation, webhook signature verification).
- [ ] Reception desk offline payments:
  - Cash counter collection with receipt number generation.
  - Offline hospital UPI reference reconciliation (UTR verification).
- [ ] Complimentary / doctor-authorized test exemptions with mandatory clinical remarks.
- [ ] Financial audit logging for every payment status transition.

---

## 📍 Phase 5: External Test Dispatch & Completion Tracking
- [ ] Cryptographically signed single-use test launch token generator.
- [ ] Secure redirect gateway to external test applications.
- [ ] External application introspection API (`/api/v1/sessions/verify-token`).
- [ ] Secure inbound webhook for test completion notification (`/api/v1/webhooks/test-completion`).
- [ ] Session status lifecycle management (`active` -> `in_progress` -> `completed` -> `expired`).

---

## 📍 Phase 6: Patient Test History & Clinical Reports Hub
- [ ] Patient portal "My Tests" view with progress indicators and launch buttons.
- [ ] Clinician dashboard for reviewing raw assessment scores.
- [ ] Clinical report publishing workflow (Doctor approval gate before patient can view PDF).
- [ ] Secure PDF report download with pre-signed access URLs.

---

## 📍 Phase 7: Administrative Reporting & Operational Analytics
- [ ] Executive dashboard: Daily, weekly, and monthly payment collections (Online vs Cash vs UPI).
- [ ] Test completion rate metrics and average assessment duration.
- [ ] Audit log inspection interface for hospital compliance officers.
- [ ] Receptionist desk shift handoff reports.

---

## 📍 Phase 8: Hardening, End-to-End Testing & Production Deployment
- [ ] Automated integration test suite (Supertest, Jest/Vitest).
- [ ] Load and stress testing for peak test launch sessions.
- [ ] Production deployment to Render (Backend) and Netlify/Hostinger (Frontend).
- [ ] Custom domain mapping and SSL certificate verification.
- [ ] Staff training and operational handover.
