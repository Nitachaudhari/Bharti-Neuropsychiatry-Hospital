import React from 'react';
import { Link } from 'react-router-dom';
import { 
  User, 
  Brain, 
  Clock, 
  FileText, 
  ShieldCheck, 
  ExternalLink,
  Activity,
  PhoneCall,
  CheckCircle2,
  Calendar,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Card } from '../components/common/Card';
import { APP_CONFIG } from '../config/constants';

export const PatientDashboardPage = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Patient Header Banner */}
      <div className="bg-gradient-to-r from-hospital-navy-950 via-hospital-purple-950 to-hospital-navy-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="bg-hospital-teal-500/20 text-hospital-teal-300 text-[10px] font-bold uppercase px-3 py-1 rounded-full tracking-wider border border-hospital-teal-500/30">
                Patient Portal
              </span>
              <span className="text-xs text-slate-300">
                Hospital MRN: <strong className="text-hospital-teal-300 font-mono">{user?.hospitalPatientId || 'Pending Assignment'}</strong>
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome, {user?.fullName || user?.name || 'Patient'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Manage your assigned neuropsychiatric evaluations and view clinician-approved assessment sessions.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/assessments"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-hospital-teal-500 to-hospital-purple-600 hover:from-hospital-teal-400 hover:to-hospital-purple-500 text-white text-xs font-bold shadow-md transition flex items-center gap-2"
            >
              <Brain className="w-4 h-4" />
              <span>Assessment Directory</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Grid: Active Sessions & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Active Psychological Sessions */}
        <div className="lg:col-span-8 space-y-6">
          <Card
            title="My Assigned Assessments"
            subtitle="Secure tokenized access to your psychological batteries"
            icon={Brain}
          >
            <div className="py-10 text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-hospital-purple-50 text-hospital-purple-600 flex items-center justify-center mx-auto border border-hospital-purple-200">
                <Brain className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-hospital-navy-950 text-base">
                No Active Test Sessions Assigned Yet
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                When your attending psychiatrist or hospital clinical psychologist assigns an assessment to your clinical record, your single-use launch token will appear here.
              </p>
              <div className="pt-2">
                <Link
                  to="/assessments"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-hospital-navy-950 text-white text-xs font-semibold hover:bg-hospital-navy-800 transition"
                >
                  <span>Explore Assessment Overview</span>
                  <ExternalLink className="w-3.5 h-3.5 text-hospital-teal-400" />
                </Link>
              </div>
            </div>
          </Card>

          {/* Clinical Workflow Explanation */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 text-xs text-slate-700 space-y-2.5 shadow-sm">
            <h4 className="font-bold text-hospital-navy-950 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-hospital-teal-600" />
              <span>Important Patient Guidance</span>
            </h4>
            <p className="leading-relaxed text-slate-600">
              Assessments are assigned in-person or during clinical consultations based on your medical evaluation. If you are expecting an assessment that is not yet visible, please contact the hospital reception desk with your phone number: <strong className="font-mono text-hospital-navy-950">{user?.phoneNumber}</strong>.
            </p>
          </div>
        </div>

        {/* Right Column: Patient Profile & Reception Helpline */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Profile Card */}
          <Card
            title="Patient Profile"
            subtitle="Confidential hospital records"
            icon={User}
          >
            <div className="text-xs space-y-3">
              <div className="flex justify-between pb-2 border-b border-slate-100">
                <span className="text-slate-500">Full Name</span>
                <span className="font-semibold text-hospital-navy-900">{user?.fullName || user?.name}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-100">
                <span className="text-slate-500">Phone Number</span>
                <span className="font-semibold text-hospital-navy-900 font-mono">{user?.phoneNumber || '—'}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-100">
                <span className="text-slate-500">Email Address</span>
                <span className="font-semibold text-hospital-navy-900">{user?.email || 'Not provided'}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-100">
                <span className="text-slate-500">Portal Role</span>
                <span className="font-semibold text-hospital-teal-700 uppercase">{user?.role}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Status</span>
                <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 text-[11px]">
                  <CheckCircle2 className="w-3 h-3" /> Active Record
                </span>
              </div>
            </div>
          </Card>

          {/* Help Desk Contact */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-hospital-navy-950 to-hospital-purple-950 text-white space-y-3 border border-white/10 shadow-md">
            <div className="flex items-center gap-2 text-hospital-teal-300 font-semibold text-xs">
              <PhoneCall className="w-4 h-4" />
              <span>Questions About Your Assessments?</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Our clinical psychologists and front-desk team are available during hospital outpatient hours.
            </p>
            <div className="text-xs font-mono font-bold text-hospital-teal-300 pt-1">
              {APP_CONFIG.PHONE}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
