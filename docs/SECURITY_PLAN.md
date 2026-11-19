# Security Architecture & Compliance Plan: Bharti Neuropsychiatry Hospital

## 1. Security Philosophy: Defense in Depth

Because Bharti Neuropsychiatry Hospital handles sensitive psychological evaluations, psychiatric diagnoses, and financial transactions, this platform enforces strict healthcare-grade security policies across every tier.

---

## 2. Environment Variables & Secret Hygiene

### Principles
- **No Hardcoded Secrets**: Absolute zero tolerance for committing database URIs, API keys, JWT secrets, or encryption keys in source control.
- **Example Templates Only**: Only `.env.example` files containing documentation and placeholder syntax are committed to Git.
- **Runtime Injection**: In production (Render / Netlify), secrets are injected through managed dashboard environment vaults.
- **Validation on Startup**: The backend boots through an environment validator (`src/config/environment.js`) that immediately halts the process if critical keys are missing or malformed.

### Git Ignore Protections
The root and local `.gitignore` files explicitly exclude:
```gitignore
.env
.env.*
!.env.example
*.pem
*.key
*.cert
```

---

## 3. Network & Transport Layer Security

- **Strict HTTPS / TLS 1.3**: All traffic in transit must use HTTPS with modern cipher suites. In production, unencrypted HTTP requests are automatically upgraded.
- **HTTP Security Headers (`Helmet`)**:
  - `Content-Security-Policy` (CSP): Restricts script, style, and frame sources.
  - `Strict-Transport-Security` (HSTS): Enforces browser-level SSL caching for 365 days.
  - `X-Frame-Options`: Set to `DENY` to prevent clickjacking.
  - `X-Content-Type-Options`: Set to `nosniff` to avoid MIME-type sniffing.
  - `Referrer-Policy`: Set to `strict-origin-when-cross-origin`.
- **CORS (Cross-Origin Resource Sharing)**:
  - Whitelist-only policy restricting access strictly to verified frontend origins (`portal.bhartihospital.com` in production; `http://localhost:5173` in local development).
  - Credentials flag enabled only for authorized origins with strict pre-flight checks.

---

## 4. Rate Limiting & DoS Mitigation

- **Global Gateway Limiter**: Caps requests to `100 requests per 15 minutes` per IP address for standard browsing.
- **Authentication Endpoint Limiter** (Future Phase): Hard-capped to `5 attempts per 15 minutes` per IP/account to defeat brute-force dictionary attacks.
- **Payment & Webhook Limiter** (Future Phase): Separate quotas to prevent spamming checkout or external callback vectors.

---

## 5. Request Validation & Input Sanitization

- **No Raw Input Pass-Through**: All route handlers validate parameters, queries, and JSON bodies.
- **Type Checking & Whitelisting**: Unexpected fields in request bodies are stripped before reaching service controllers.
- **NoSQL Injection Defense**: Object parameterization and Mongoose strict schema casting block `$where` or regex injection payloads.

---

## 6. Centralized Error Handling & Information Leakage Prevention

- **Error Masking in Production**:
  - In `development`, detailed error messages and stack traces are logged to assist debugging.
  - In `production`, internal stack traces, database schema details, and driver errors are suppressed; the API returns a generic, user-safe response with an error tracking ID.
- **Standardized API Envelope**:
  ```json
  {
    "success": false,
    "error": {
      "code": "BAD_REQUEST",
      "message": "Human readable explanation"
    },
    "timestamp": "2026-11-14T16:00:00.000Z"
  }
  ```

---

## 7. Secure Logging & PHI (Protected Health Information) Redaction

- **Zero PHI / PII in Logs**:
  - Passwords, credit card/UPI details, tokens, and patient psychiatric responses are strictly prohibited from log streams.
- **Audit Logging**:
  - High-risk administrative actions (manual test unlocking, price overrides, refunds) are written to a dedicated, append-only `AuditLogs` collection containing operator ID, timestamp, IP address, and justification.

---

## 8. External Psychological Test Integration Security

To securely dispatch patients to third-party hosted test applications without exposing personal health records:
1. **Single-Use Launch Tokens**: The portal generates a short-lived, digitally signed JWT containing only `sessionId`, `testCode`, and an expiration time (e.g. 15 minutes). No patient name or medical history is sent.
2. **HMAC Webhook Verification**: When external test applications notify the portal of completion, payloads must be signed using SHA-256 HMAC with an integration secret. Unsigned or invalidly signed webhooks are rejected with `401 Unauthorized`.
3. **Report Visibility Gating**: Test results are flagged as `isReportVisibleToPatient: false` until a licensed hospital psychologist reviews and approves the report.
