import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  User,
  Stethoscope,
  Lock,
  Phone,
  Mail,
  AlertCircle,
  ArrowRight,
  Sparkles,
  Info,
  ChevronLeft,
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/authService';
import { APP_CONFIG } from '../config/constants';

export const LoginPage = () => {
  const [selectedRole, setSelectedRole] = useState(null); // null, 'patient', or 'staff'
  const [patientIdentifier, setPatientIdentifier] = useState('');
  const [patientPassword, setPatientPassword] = useState('');
  const [staffEmail, setStaffEmail] = useState('');
  const [staffPassword, setStaffPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath = location.state?.from?.pathname;

  const handlePatientSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await authService.login({
        identifier: patientIdentifier.trim(),
        password: patientPassword
      });

      login(response.data.token, response.data.user);
      navigate(redirectPath || '/patient/dashboard');
    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Patient authentication requires active backend server connection (scheduled for Phase 4 integration). Accounts are provisioned in-person at hospital reception.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleStaffSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await authService.staffLogin({
        email: staffEmail.trim(),
        password: staffPassword
      });

      login(response.data.token, response.data.user);

      if (response.data.user?.role === 'super_admin' || response.data.user?.role === 'hospital_admin') {
        navigate(redirectPath || '/admin/dashboard');
      } else {
        navigate(redirectPath || '/staff/dashboard');
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Staff authentication requires active backend server connection (scheduled for Phase 4 integration). To inspect the Phase 3 Admin Dashboard UI directly, use the /admin link below.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] py-16 sm:py-20 px-4 sm:px-6 lg:px-8 flex flex-col justify-center bg-[#F7FBF8] text-[#153C47]">

      {/* Brand Header */}
      <div className="text-center max-w-xl mx-auto space-y-3 mb-10">
        <div className="inline-block p-2 bg-white rounded-2xl shadow-sm border border-slate-200/80 mb-2">
          <img
            src="/logo.png"
            alt="The Mind Solutions Center & Hospital"
            className="h-16 w-auto object-contain rounded-xl"
          />
        </div>
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E5F8F4] border border-[#00BFA6]/30 text-[#008e7b] text-xs font-bold">
          <Sparkles className="w-4 h-4 text-[#FFD43B]" />
          <span>{APP_CONFIG.HOSPITAL_NAME}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#153C47] tracking-tight">
          Secure Portal Sign-In
        </h1>
        <p className="text-[#52717A] text-sm font-medium">
          Please select your authorized portal role to continue.
        </p>
      </div>

      {/* Mode 1: Dual Choice Cards (Landing State) */}
      {!selectedRole && (
        <div className="max-w-4xl mx-auto w-full space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Card 1: Patient Login (Coral Accents) */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 border-t-4 border-t-[#FF684A] shadow-sm hover:shadow-lg transition-all flex flex-col justify-between space-y-6 group">
              <div className="space-y-5">
                <div className="w-14 h-14 rounded-2xl bg-[#fff1ee] border border-[#FF684A]/30 text-[#FF684A] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                  <User className="w-7 h-7" />
                </div>

                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#FF684A]">
                    Prescribed Testing
                  </span>
                  <h2 className="text-2xl font-extrabold text-[#153C47] mt-1">
                    Patient Login
                  </h2>
                </div>

                <p className="text-xs sm:text-sm text-[#52717A] leading-relaxed font-medium">
                  For patients with credentials provided by hospital staff during in-person clinical intake.
                </p>

                <ul className="space-y-2.5 text-xs text-[#153C47] pt-2 font-medium">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#00BFA6] shrink-0" />
                    <span>Access doctor-assigned psychological assessments</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#00BFA6] shrink-0 mt-0.5" />
                    <span>Credentials given in person by hospital staff</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#00BFA6] shrink-0" />
                    <span>Secure medical records confidentiality</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => { setSelectedRole('patient'); setError(null); }}
                  className="w-full py-4 px-6 rounded-full bg-[#FF684A] hover:bg-[#e85538] text-white text-sm font-extrabold transition shadow-md flex items-center justify-center gap-2 hover:scale-105 transform active:scale-95"
                >
                  <span>Continue to Patient Login</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Card 2: Staff / Admin Login (Teal Accents) */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 border-t-4 border-t-[#00BFA6] shadow-sm hover:shadow-lg transition-all flex flex-col justify-between space-y-6 group">
              <div className="space-y-5">
                <div className="w-14 h-14 rounded-2xl bg-[#E5F8F4] border border-[#00BFA6]/30 text-[#00BFA6] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                  <Stethoscope className="w-7 h-7" />
                </div>

                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#008e7b]">
                    Hospital Administration
                  </span>
                  <h2 className="text-2xl font-extrabold text-[#153C47] mt-1">
                    Staff / Admin Login
                  </h2>
                </div>

                <p className="text-xs sm:text-sm text-[#52717A] leading-relaxed font-medium">
                  For authorized hospital staff, doctors, receptionists, and system administrators.
                </p>

                <ul className="space-y-2.5 text-xs text-[#153C47] pt-2 font-medium">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#42B9E8] shrink-0" />
                    <span>Register and manage patient profiles</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#42B9E8] shrink-0" />
                    <span>Prescribe and assign psychological tests</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#42B9E8] shrink-0" />
                    <span>Review completion records and hospital reports</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => { setSelectedRole('staff'); setError(null); }}
                  className="w-full py-4 px-6 rounded-full bg-[#00BFA6] hover:bg-[#00a892] text-white text-sm font-extrabold transition shadow-md flex items-center justify-center gap-2 hover:scale-105 transform active:scale-95"
                >
                  <span>Staff Login</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          {/* Clinical Policy Callout */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center text-xs text-[#52717A] max-w-2xl mx-auto flex items-center justify-center gap-2 shadow-sm">
            <Info className="w-4 h-4 text-[#00BFA6] shrink-0" />
            <span className="font-medium">Patients cannot self-register online. Accounts are provisioned exclusively by hospital staff during consultation.</span>
          </div>
        </div>
      )}

      {/* Mode 2: Specific Patient Login Form */}
      {selectedRole === 'patient' && (
        <div className="max-w-md mx-auto w-full bg-white rounded-3xl shadow-lg border-2 border-[#FF684A]/30 p-8 space-y-6">
          <button
            type="button"
            onClick={() => { setSelectedRole(null); setError(null); }}
            className="inline-flex items-center gap-1.5 text-xs text-[#52717A] hover:text-[#FF684A] transition font-bold"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Portal Selection</span>
          </button>

          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#fff1ee] text-[#FF684A] text-[10px] font-bold border border-[#FF684A]/30">
              <User className="w-3 h-3" />
              <span>Patient Assessment Portal</span>
            </div>
            <h2 className="text-2xl font-extrabold text-[#153C47]">
              Patient Sign-In
            </h2>
            <p className="text-xs text-[#52717A] font-medium">
              Enter the credentials provided during your hospital consultation.
            </p>
          </div>

          {error && (
            <div className="p-3.5 rounded-2xl bg-[#fff1ee] border border-[#FF684A]/40 flex items-start gap-2.5 text-xs text-[#d6472b]">
              <AlertCircle className="w-4 h-4 text-[#FF684A] shrink-0 mt-0.5" />
              <span className="leading-relaxed font-medium">{error}</span>
            </div>
          )}

          <form onSubmit={handlePatientSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#153C47] mb-1.5">
                Registered Mobile Phone or Email
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-[#52717A] absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  type="text"
                  required
                  placeholder="e.g. 9143430505 or patient@email.com"
                  value={patientIdentifier}
                  onChange={(e) => setPatientIdentifier(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-3 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#FF684A]/50 bg-[#F7FBF8] text-[#153C47] transition font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#153C47] mb-1.5">
                Confidential Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#52717A] absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  type="password"
                  required
                  placeholder="Enter your confidential password"
                  value={patientPassword}
                  onChange={(e) => setPatientPassword(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-3 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#FF684A]/50 bg-[#F7FBF8] text-[#153C47] transition font-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-4 rounded-full bg-[#FF684A] hover:bg-[#e85538] text-white text-xs font-extrabold transition shadow-md flex items-center justify-center gap-2 disabled:opacity-50 mt-2 hover:scale-105 transform active:scale-95 cursor-pointer"
            >
              <span>{loading ? 'Authenticating Patient...' : 'Sign In as Patient'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-4 border-t border-slate-100 text-center space-y-2">
            <p className="text-[11px] text-[#52717A] leading-relaxed">
              Don't have credentials yet? Patient accounts are issued directly by clinic staff during your consultation with Dr. Parag Mahajan.
            </p>
            <Link to="/patient" className="text-xs font-bold text-[#FF684A] hover:underline inline-block">
              Learn about the patient intake process &rarr;
            </Link>
          </div>
        </div>
      )}

      {/* Mode 3: Specific Staff / Admin Login Form */}
      {selectedRole === 'staff' && (
        <div className="max-w-md mx-auto w-full bg-white rounded-3xl shadow-lg border-2 border-[#00BFA6]/30 p-8 space-y-6">
          <button
            type="button"
            onClick={() => { setSelectedRole(null); setError(null); }}
            className="inline-flex items-center gap-1.5 text-xs text-[#52717A] hover:text-[#00BFA6] transition font-bold"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Portal Selection</span>
          </button>

          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E5F8F4] text-[#008e7b] text-[10px] font-bold border border-[#00BFA6]/30">
              <Stethoscope className="w-3 h-3 text-[#00BFA6]" />
              <span>Hospital Staff & Clinician Console</span>
            </div>
            <h2 className="text-2xl font-extrabold text-[#153C47]">
              Staff Console Sign-In
            </h2>
            <p className="text-xs text-[#52717A] font-medium">
              For authorized hospital receptionists, psychologists, and administrators.
            </p>
          </div>

          {error && (
            <div className="p-3.5 rounded-2xl bg-[#fff1ee] border border-[#FF684A]/40 flex items-start gap-2.5 text-xs text-[#d6472b]">
              <AlertCircle className="w-4 h-4 text-[#FF684A] shrink-0 mt-0.5" />
              <span className="leading-relaxed font-medium">{error}</span>
            </div>
          )}

          <form onSubmit={handleStaffSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#153C47] mb-1.5">
                Official Hospital Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#52717A] absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  type="email"
                  required
                  placeholder="staff@bhartihospital.com"
                  value={staffEmail}
                  onChange={(e) => setStaffEmail(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-3 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#00BFA6]/50 bg-[#F7FBF8] text-[#153C47] transition font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#153C47] mb-1.5">
                Staff Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#52717A] absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={staffPassword}
                  onChange={(e) => setStaffPassword(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-3 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#00BFA6]/50 bg-[#F7FBF8] text-[#153C47] transition font-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-4 rounded-full bg-[#00BFA6] hover:bg-[#00a892] text-white text-xs font-extrabold transition shadow-md flex items-center justify-center gap-2 disabled:opacity-50 mt-2 hover:scale-105 transform active:scale-95"
            >
              <span>{loading ? 'Verifying Staff Access...' : 'Sign In to Staff Console'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-4 border-t border-slate-100 text-center space-y-2">
            <span className="text-[11px] text-[#52717A] font-medium block">
              Internal access restricted to registered hospital personnel.
            </span>
            <span className="text-[11px] text-[#52717A] font-medium block">
              Phase 3 Admin UI Evaluation: <Link to="/admin" className="text-[#00BFA6] font-bold hover:underline">Open Admin Console (/admin)</Link>
            </span>
          </div>
        </div>
      )}

    </div>
  );
};
