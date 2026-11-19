import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Layout } from './components/common/Layout';
import { ProtectedRoute } from './components/common/ProtectedRoute';

// Public Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { AssessmentsCatalogPreview } from './pages/AssessmentsCatalogPreview';
import { PatientInfoPage } from './pages/PatientInfoPage';
import { ContactPage } from './pages/ContactPage';
import { LoginPage } from './pages/LoginPage';
import { UnauthorizedPage } from './pages/UnauthorizedPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Protected Phase 1/2 Portal Pages
import { PatientDashboardPage } from './pages/PatientDashboardPage';
import { StaffDashboardPage } from './pages/StaffDashboardPage';
import { SystemStatusPage } from './pages/SystemStatusPage';

// Admin Dashboard Components & Pages (Phase 3)
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminPatientsPage } from './pages/admin/AdminPatientsPage';
import { AdminTestsPage } from './pages/admin/AdminTestsPage';
import { AdminAssignmentsPage } from './pages/admin/AdminAssignmentsPage';
import { AdminStaffPage } from './pages/admin/AdminStaffPage';
import { AdminReportsPage } from './pages/admin/AdminReportsPage';
import { AdminAuditLogsPage } from './pages/admin/AdminAuditLogsPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* ======================================================== */}
          {/* PUBLIC WEBSITE ROUTES (Wrapped in Public Layout)         */}
          {/* ======================================================== */}
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/assessments" element={<AssessmentsCatalogPreview />} />
            <Route path="/patient" element={<PatientInfoPage />} />
            <Route path="/patient-info" element={<PatientInfoPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/unauthorized" element={<UnauthorizedPage />} />

            {/* Protected Patient Portal */}
            <Route
              path="/patient/dashboard"
              element={
                <ProtectedRoute allowedRoles={['patient']}>
                  <PatientDashboardPage />
                </ProtectedRoute>
              }
            />

            {/* Protected Staff & Clinical Console */}
            <Route
              path="/staff/dashboard"
              element={
                <ProtectedRoute
                  allowedRoles={['receptionist', 'psychologist', 'hospital_admin', 'super_admin']}
                >
                  <StaffDashboardPage />
                </ProtectedRoute>
              }
            />

            {/* Diagnostics */}
            <Route
              path="/admin/diagnostics"
              element={
                <ProtectedRoute allowedRoles={['super_admin', 'hospital_admin']}>
                  <SystemStatusPage />
                </ProtectedRoute>
              }
            />

            {/* Catch-All 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          {/* ======================================================== */}
          {/* PHASE 3 ADMIN DASHBOARD (Dedicated Hospital Admin Layout)*/}
          {/* Completely isolated from public header/footer             */}
          {/* ======================================================== */}
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
            <Route path="/admin/patients" element={<AdminPatientsPage />} />
            <Route path="/admin/tests" element={<AdminTestsPage />} />
            <Route path="/admin/assignments" element={<AdminAssignmentsPage />} />
            <Route path="/admin/staff" element={<AdminStaffPage />} />
            <Route path="/admin/reports" element={<AdminReportsPage />} />
            <Route path="/admin/audit-logs" element={<AdminAuditLogsPage />} />
            <Route path="/admin/settings" element={<AdminSettingsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
