# Database Design Specification: Bharti Neuropsychiatry Hospital

## 1. Overview
The persistence layer utilizes **MongoDB Atlas** managed clusters accessed via **Mongoose ORM**. The schema is engineered to guarantee strict referential integrity, financial auditability, tamper-evident payment tracking, and healthcare data confidentiality.

---

## 2. Entity Relationship Overview

```
 [Users (Patients)] 1 ───< N [Orders] 1 ───< N [Payments]
         │                          │
         │                          └───< N [TestSessions] 1 ─── 1 [TestResults]
         │                                       │
         └───────────────────────────────────────┘
                                                 │
                                                 v
                                          [Tests (Catalog)]

 [Admins / Staff] 1 ───< N [AuditLogs] (Captures manual activation, overrides, refunds)
```

---

## 3. Detailed Proposed Collection Schemas

### 3.1 `Users` Collection (Patients)
Stores patient demographics, credentials, and contact details.

| Field | Type | Attributes | Description |
|---|---|---|---|
| `_id` | ObjectId | Primary Key | Unique user identifier |
| `hospitalPatientId` | String | Unique, Indexed | Optional hospital MRN (Medical Record Number) |
| `fullName` | String | Required, Trim | Patient's legal full name |
| `email` | String | Unique, Sparse, Lowercase | Patient's email for notices and receipts |
| `phoneNumber` | String | Required, Indexed | 10-digit mobile number for OTP/login |
| `passwordHash` | String | Required | Argon2id / Bcrypt hashed password |
| `dateOfBirth` | Date | Optional | Required for age-normed psychological scoring |
| `gender` | String | Enum: `male`, `female`, `other` | Clinical demographic profiling |
| `role` | String | Default: `'patient'` | Fixed to patient role |
| `isVerified` | Boolean | Default: `false` | Mobile/Email verification flag |
| `createdAt` / `updatedAt` | Date | Timestamps | Automatic Mongoose timestamps |

---

### 3.2 `Admins` Collection (Staff & Clinicians)
Stores hospital staff, receptionists, clinical psychologists, and super-administrators.

| Field | Type | Attributes | Description |
|---|---|---|---|
| `_id` | ObjectId | Primary Key | Unique staff ID |
| `name` | String | Required | Staff member full name |
| `email` | String | Unique, Required | Official hospital email |
| `passwordHash` | String | Required | High-entropy salted hash |
| `role` | String | Enum | `'super_admin'`, `'hospital_admin'`, `'receptionist'`, `'psychologist'` |
| `staffCode` | String | Unique | Front-desk badge/employee ID |
| `isActive` | Boolean | Default: `true` | Revocation status |
| `lastLogin` | Date | Optional | Last recorded access timestamp |

---

### 3.3 `Tests` Collection (Psychological Assessment Catalog)
Defines each psychological assessment available, its clinical purpose, fee, and external integration configuration.

| Field | Type | Attributes | Description |
|---|---|---|---|
| `_id` | ObjectId | Primary Key | Unique test ID |
| `testCode` | String | Unique, Uppercase | e.g. `'BDI-II'`, `'MMPI'`, `'ADHD-ADULT'` |
| `title` | String | Required | Clinical title of the assessment |
| `shortDescription`| String | Required | Brief summary for patient portal |
| `instructions` | String | Optional | Patient preparatory guidelines |
| `category` | String | Enum | `'personality'`, `'depression_anxiety'`, `'neuropsychology'`, `'cognitive'`, `'pediatric'` |
| `priceInINR` | Number | Required, Min: 0 | Fee in Indian Rupees (0 for free/complimentary) |
| `estimatedDurationMinutes` | Number | Required | Expected time to complete |
| `externalAppUrl` | String | Required | Base URL where external test application is hosted |
| `integrationKeyId` | String | Required | Secret identifier for HMAC webhook handshake |
| `isActive` | Boolean | Default: `true` | Whether test is publicly purchasable |
| `requiresDoctorReferral` | Boolean | Default: `false` | Gate requiring clinical recommendation |

---

### 3.4 `Orders` Collection
Represents a cart or request by a patient or front-desk staff to acquire one or more tests.

| Field | Type | Attributes | Description |
|---|---|---|---|
| `_id` | ObjectId | Primary Key | Unique Order ID |
| `orderNumber` | String | Unique, Indexed | Human-readable identifier (e.g. `'BORD-202611-0001'`) |
| `patientId` | ObjectId | Ref: `'Users'`, Indexed | Patient who owns the order |
| `items` | Array | Required | Array of `{ testId, testTitle, priceInINR }` |
| `totalAmount` | Number | Required | Sum of line items in INR |
| `discountAmount` | Number | Default: 0 | Applied concession/discount |
| `netPayable` | Number | Required | `totalAmount - discountAmount` |
| `status` | String | Enum | `'created'`, `'pending_payment'`, `'paid'`, `'cancelled'`, `'refunded'` |
| `orderChannel` | String | Enum | `'online_patient'`, `'hospital_counter'`, `'doctor_prescription'` |
| `createdStaffId` | ObjectId | Ref: `'Admins'`, Optional | Staff member if created at reception counter |
| `notes` | String | Optional | Counter/prescription annotations |

---

### 3.5 `Payments` Collection
Records every financial transaction across all payment methods.

| Field | Type | Attributes | Description |
|---|---|---|---|
| `_id` | ObjectId | Primary Key | Unique Payment ID |
| `orderId` | ObjectId | Ref: `'Orders'`, Indexed | Linked order |
| `patientId` | ObjectId | Ref: `'Users'`, Indexed | Payer |
| `amount` | Number | Required | Transaction amount in INR |
| `currency` | String | Default: `'INR'` | Currency code |
| `paymentMethod` | String | Enum | `'razorpay'`, `'cash'`, `'offline_upi'`, `'complimentary'`, `'manual_admin_waiver'` |
| `paymentStatus` | String | Enum | `'initiated'`, `'captured'`, `'failed'`, `'refunded'`, `'verified_by_staff'` |
| **Razorpay Specifics** | Object | Optional | Sub-document for online payments: |
| ├ `razorpayOrderId` | String | Sparse Index | Razorpay Order ID (`order_xxx`) |
| ├ `razorpayPaymentId`| String | Sparse Index | Razorpay Payment ID (`pay_xxx`) |
| └ `razorpaySignature`| String | Optional | Cryptographic verification signature |
| **Offline Counter Specifics**| Object | Optional | Sub-document for counter collections: |
| ├ `receiptNumber` | String | Sparse Index | Physical paper receipt number |
| ├ `collectedByStaffId` | ObjectId | Ref: `'Admins'` | Receptionist who accepted cash/verified UPI |
| ├ `upiReferenceNumber` | String | Optional | Bank UTR / UPI reference from customer phone |
| └ `verificationNote` | String | Optional | e.g. "Verified in hospital HDFC UPI account" |
| **Complimentary / Manual Waiver** | Object | Optional | Sub-document for authorized exemptions: |
| ├ `approvedByDoctorId` | ObjectId | Ref: `'Admins'` | Senior doctor approving free access |
| └ `clinicalReason` | String | Optional | e.g. "Inpatient psychiatric evaluation protocol" |
| `refundDetails` | Object | Optional | `{ refundId, refundAmount, refundedAt, reason }` |
| `paidAt` | Date | Optional | Timestamp of confirmed settlement |

---

### 3.6 `TestSessions` Collection
Controls the lifecycle of a patient's access to an individual assessment.

| Field | Type | Attributes | Description |
|---|---|---|---|
| `_id` | ObjectId | Primary Key | Unique session ID |
| `sessionToken` | String | Unique, Indexed | Cryptographically random or JWT token for launch |
| `orderId` | ObjectId | Ref: `'Orders'` | Originating order |
| `paymentId` | ObjectId | Ref: `'Payments'` | Associated verified payment |
| `patientId` | ObjectId | Ref: `'Users'`, Indexed | Patient taking the test |
| `testId` | ObjectId | Ref: `'Tests'`, Indexed | Targeted assessment |
| `status` | String | Enum | `'active'`, `'in_progress'`, `'completed'`, `'expired'`, `'revoked'` |
| `maxAttempts` | Number | Default: 1 | Test retake limits |
| `attemptsUsed` | Number | Default: 0 | Recorded attempt counter |
| `expiresAt` | Date | Required, Indexed | Validity window (e.g. 7 days from purchase) |
| `firstAccessedAt`| Date | Optional | When patient first clicked through to external app |
| `completedAt` | Date | Optional | Webhook timestamp indicating test completion |
| `activationSource`| String | Enum | `'razorpay_instant'`, `'cash_counter'`, `'staff_upi'`, `'admin_override'` |

---

### 3.7 `TestResults` Collection
Stores normalized clinical outputs sent back from external test applications.

| Field | Type | Attributes | Description |
|---|---|---|---|
| `_id` | ObjectId | Primary Key | Unique Result ID |
| `sessionId` | ObjectId | Ref: `'TestSessions'`, Unique | Linked session |
| `patientId` | ObjectId | Ref: `'Users'`, Indexed | Patient |
| `testId` | ObjectId | Ref: `'Tests'` | Assessment type |
| `summaryScore` | Number | Optional | Primary numeric score/index |
| `clinicalInterpretation`| String | Optional | Automated diagnostic tier (e.g. "Severe Depression") |
| `rawResponsesSecureUrl`| String | Optional | Encrypted cloud link to item-level responses |
| `reportPdfUrl` | String | Optional | Secure pre-signed URL to clinical PDF report |
| `isReportVisibleToPatient` | Boolean | Default: `false` | Gated: Requires doctor review before patient view |
| `reviewedByDoctorId`| ObjectId | Ref: `'Admins'`, Optional | Attending clinical psychologist |
| `doctorRemarks` | String | Optional | Clinical notes added by doctor |
| `completedAt` | Date | Required | Completion date |

---

### 3.8 `AuditLogs` Collection
Tamper-evident trail of administrative, financial, and clinical overrides.

| Field | Type | Attributes | Description |
|---|---|---|---|
| `_id` | ObjectId | Primary Key | Unique log entry ID |
| `action` | String | Required, Indexed | e.g. `'MANUAL_TEST_ACTIVATION'`, `'PAYMENT_REFUND'`, `'PRICE_CHANGE'` |
| `performedByStaffId` | ObjectId | Ref: `'Admins'`, Indexed | Staff identity |
| `targetEntity` | String | Required | e.g. `'Payment'`, `'TestSession'`, `'User'` |
| `targetId` | ObjectId | Required | ID of affected entity |
| `changes` | Object | Optional | Diff of previous vs updated state |
| `justification` | String | Required | Mandatory reason input for manual actions |
| `ipAddress` | String | Required | Client IP address of operator |
| `userAgent` | String | Optional | Client browser/device fingerprint |
| `timestamp` | Date | Default: `Date.now`, Indexed | Exact UTC time |

---

## 4. Indexing & Optimization Strategy

1. **Compound Index**: `{ patientId: 1, status: 1 }` on `TestSessions` for instant patient dashboard loading.
2. **Compound Index**: `{ orderId: 1, paymentStatus: 1 }` on `Payments` for rapid checkout reconciliation.
3. **TTL Index (Time to Live)**: `expiresAt` on `TestSessions` to automatically flag expired access tokens.
4. **Unique Index**: `sessionToken` on `TestSessions` to prevent replay attacks and duplicate entries.
5. **Auditing Index**: `{ timestamp: -1, action: 1 }` on `AuditLogs` for compliance queries.
