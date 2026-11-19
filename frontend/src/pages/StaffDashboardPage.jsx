import React from 'react';
import { 
  ShieldCheck, 
  UserPlus, 
  Brain, 
  FileCheck2, 
  Activity, 
  Search, 
  CheckCircle2, 
  Users,
  Clock,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Card } from '../components/common/Card';
import { APP_CONFIG } from '../config/constants';

export const StaffDashboardPage = () => {
  const { user } = useAuth();

  const getRoleDisplayName = (role) => {
    switch (role) {
      case 'super_admin': return 'Super Administrator';
      case 'hospital_admin': return 'Hospital Administrator';
      case 'psychologist': return 'Clinical Psychologist';
      case 'receptionist': return 'Front-Desk Receptionist';
      default: return role;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Staff Header */}
      <div className="bg-gradient-to-r from-hospital-navy-950 via-hospital-purple-950 to-hospital-navy-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="bg-hospital-purple-500/20 text-hospital-purple-300 text-[10px] font-bold uppercase px-3 py-1 rounded-full tracking-wider border border-hospital-purple-500/30">
                Staff Console
              </span>
              <span className="text-xs text-slate-300">
                Staff Badge ID: <strong className="text-hospital-teal-300 font-mono">{user?.staffCode || 'STF-AUTH'}</strong>
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {user?.name || 'Staff Member'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Assigned Role: <span className="font-semibold text-hospital-teal-300">{getRoleDisplayName(user?.role)}</span> &bull; {user?.department || 'Bharti Neuropsychiatry Hospital'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 border border-white/15 text-hospital-teal-300 text-xs font-semibold backdrop-blur-md">
              <ShieldCheck className="w-4 h-4 text-hospital-teal-400" />
              <span>Privileged Clinical Session</span>
            </span>
          </div>
        </div>
      </div>

      {/* Clinical Operations Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Module 1: Patient Registration by Staff */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 hover:shadow-card-hover transition-all space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-hospital-teal-500/10 text-hospital-teal-600 flex items-center justify-center border border-hospital-teal-500/20">
              <UserPlus className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-hospital-teal-700 bg-hospital-teal-50 px-2.5 py-0.5 rounded-full border border-hospital-teal-200">
              Staff In-Person
            </span>
          </div>
          <h3 className="font-bold text-hospital-navy-950 text-sm">Patient Account Onboarding</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Create confidential patient records, assign unique hospital MRNs, and configure patient portal credentials.
          </p>
          <div className="pt-2 text-[11px] text-slate-400 font-medium">
            Authorized: Receptionists & Administrators
          </div>
        </div>

        {/* Module 2: Test Assignment */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 hover:shadow-card-hover transition-all space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-hospital-purple-500/10 text-hospital-purple-600 flex items-center justify-center border border-hospital-purple-500/20">
              <Brain className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-hospital-purple-700 bg-hospital-purple-50 px-2.5 py-0.5 rounded-full border border-hospital-purple-200">
              Clinical Referral
            </span>
          </div>
          <h3 className="font-bold text-hospital-navy-950 text-sm">Assessment Assignment Engine</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Assign designated psychological batteries to specific patients with single-use, time-delimited launch tokens.
          </p>
          <div className="pt-2 text-[11px] text-slate-400 font-medium">
            Authorized: Psychologists & Staff
          </div>
        </div>

        {/* Module 3: Clinical Reviews */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 hover:shadow-card-hover transition-all space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-hospital-blue-500/10 text-hospital-blue-600 flex items-center justify-center border border-hospital-blue-500/20">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-hospital-blue-700 bg-hospital-blue-50 px-2.5 py-0.5 rounded-full border border-hospital-blue-200">
              Doctor Sign-Off
            </span>
          </div>
          <h3 className="font-bold text-hospital-navy-950 text-sm">Evaluation & Reports Review</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Review completed psychometric responses, verify diagnostic tier scoring, and authorize formal clinical reports.
          </p>
          <div className="pt-2 text-[11px] text-slate-400 font-medium">
            Authorized: Clinical Psychologists
          </div>
        </div>

      </div>

      {/* Role-Based Permissions Summary */}
      <Card
        title="Active Clinical Role Permissions"
        subtitle="Enforced by authenticateJWT and authorizeRoles middleware"
        icon={ShieldCheck}
      >
        <div className="space-y-4 text-xs text-slate-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="font-bold text-hospital-navy-950">Your Account Authorization</h4>
              <ul className="space-y-1.5 text-slate-600">
                <li>Authenticated Email: <strong className="text-hospital-navy-900">{user?.email}</strong></li>
                <li>System Role: <span className="font-mono font-bold text-hospital-purple-700">{user?.role}</span></li>
                <li>Employee Code: <span className="font-mono text-hospital-navy-900">{user?.staffCode}</span></li>
                <li>Department: <span className="text-hospital-navy-900">{user?.department || 'Neuropsychiatry'}</span></li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="font-bold text-hospital-navy-950">Security & Clinical Governance</h4>
              <p className="text-slate-600 leading-relaxed">
                All staff operations (patient onboarding, test session assignment, and evaluation approvals) are cryptographically logged with your staff badge code, IP address, and timestamp in the hospital audit trail.
              </p>
            </div>
          </div>
        </div>
      </Card>

    </div>
  );
};
