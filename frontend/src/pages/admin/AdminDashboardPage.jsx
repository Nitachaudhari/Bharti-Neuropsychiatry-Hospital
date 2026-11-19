import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Users,
  Brain,
  ClipboardList,
  FileCheck2,
  Plus,
  UserPlus,
  ArrowRight,
  Clock,
  CheckCircle2,
  ShieldCheck,
  AlertCircle,
  FileBarChart2,
  Calendar,
  Sparkles,
  Info
} from 'lucide-react';
import { AdminMetricCard } from '../../components/admin/AdminMetricCard';
import { AdminEmptyState } from '../../components/admin/AdminEmptyState';
import { AdminStatusBadge } from '../../components/admin/AdminStatusBadge';
import { APP_CONFIG } from '../../config/constants';
import { api } from '../../services/api';

export const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const [testsCount, setTestsCount] = useState('--');
  const [loadingTests, setLoadingTests] = useState(false);

  // Check if existing tests API provides live data
  useEffect(() => {
    let isMounted = true;
    const checkTests = async () => {
      try {
        setLoadingTests(true);
        const res = await api.get('/tests');
        if (isMounted && res?.data && Array.isArray(res.data)) {
          setTestsCount(res.data.length.toString());
        }
      } catch (err) {
        // Keep honest placeholder as instructed
        if (isMounted) setTestsCount('--');
      } finally {
        if (isMounted) setLoadingTests(false);
      }
    };

    checkTests();
    return () => { isMounted = false; };
  }, []);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Welcome Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5F8F4] text-[#008e7b] text-xs font-bold border border-[#00BFA6]/30">
            <Sparkles className="w-3.5 h-3.5 text-[#FFD43B]" />
            <span>Hospital Administration Console</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#153C47] tracking-tight">
            Welcome, Dr. Parag Mahajan
          </h2>
          <p className="text-xs sm:text-sm text-[#52717A] max-w-2xl leading-relaxed">
            Centralized administration for patient intake, test catalog management, clinical assignments, and confidential report review at <strong>{APP_CONFIG.HOSPITAL_NAME}</strong>.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 relative z-10 w-full sm:w-auto">
          <button
            onClick={() => navigate('/admin/patients')}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-xs font-bold text-white bg-[#FF684A] hover:bg-[#e85538] transition shadow-xs hover:scale-105 transform active:scale-95"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add Patient</span>
          </button>

          <button
            onClick={() => navigate('/admin/assignments')}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-xs font-bold text-[#153C47] bg-[#E5F8F4] hover:bg-[#d6f4ee] border border-[#00BFA6]/40 transition hover:scale-105 transform active:scale-95"
          >
            <ClipboardList className="w-4 h-4 text-[#00BFA6]" />
            <span>Assign Test</span>
          </button>
        </div>
      </div>

      {/* 4 Metric Cards (Clean, honest placeholders - no fake database stats) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <AdminMetricCard
          title="Total Patients"
          value="--"
          subtitle="Registered in-person by staff"
          icon={Users}
          accentBorder="border-t-4 border-t-[#00BFA6]"
          iconBg="bg-[#E5F8F4] text-[#008e7b]"
          badge="In-Person Only"
          badgeBg="bg-[#E5F8F4] text-[#008e7b]"
          onClick={() => navigate('/admin/patients')}
        />

        <AdminMetricCard
          title="Available Tests"
          value={loadingTests ? '...' : testsCount}
          subtitle="Deployed psychometric batteries"
          icon={Brain}
          accentBorder="border-t-4 border-t-[#42B9E8]"
          iconBg="bg-[#edf7fc] text-[#31a6d4]"
          badge="Verified Batteries"
          badgeBg="bg-[#edf7fc] text-[#31a6d4]"
          onClick={() => navigate('/admin/tests')}
        />

        <AdminMetricCard
          title="Active Assignments"
          value="--"
          subtitle="Currently assigned to patients"
          icon={ClipboardList}
          accentBorder="border-t-4 border-t-[#FFD43B]"
          iconBg="bg-[#fffbf0] text-[#153C47]"
          badge="Doctor Prescribed"
          badgeBg="bg-[#fffbf0] text-[#153C47]"
          onClick={() => navigate('/admin/assignments')}
        />

        <AdminMetricCard
          title="Completed Assessments"
          value="--"
          subtitle="Awaiting doctor review & reports"
          icon={FileCheck2}
          accentBorder="border-t-4 border-t-[#75C94B]"
          iconBg="bg-[#f2faed] text-[#66b43e]"
          badge="Clinical Reports"
          badgeBg="bg-[#f2faed] text-[#66b43e]"
          onClick={() => navigate('/admin/reports')}
        />
      </div>

      {/* Quick Actions Bar */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-extrabold text-[#153C47] uppercase tracking-wider">
            Quick Actions
          </h3>
          <span className="text-[11px] text-[#52717A]">
            Phase 3 UI Entry Points
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <button
            onClick={() => navigate('/admin/patients')}
            className="p-4 rounded-2xl bg-[#F7FBF8] hover:bg-[#E5F8F4] border border-slate-200 hover:border-[#00BFA6]/40 transition text-left group flex flex-col justify-between space-y-3"
          >
            <div className="w-10 h-10 rounded-xl bg-white text-[#FF684A] flex items-center justify-center shadow-2xs group-hover:scale-110 transition-transform">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <p className="font-extrabold text-[#153C47] text-xs group-hover:text-[#008e7b] transition-colors">
                Add Patient
              </p>
              <p className="text-[11px] text-[#52717A] mt-0.5">
                Staff intake form
              </p>
            </div>
          </button>

          <button
            onClick={() => navigate('/admin/tests')}
            className="p-4 rounded-2xl bg-[#F7FBF8] hover:bg-[#E5F8F4] border border-slate-200 hover:border-[#00BFA6]/40 transition text-left group flex flex-col justify-between space-y-3"
          >
            <div className="w-10 h-10 rounded-xl bg-white text-[#42B9E8] flex items-center justify-center shadow-2xs group-hover:scale-110 transition-transform">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <p className="font-extrabold text-[#153C47] text-xs group-hover:text-[#008e7b] transition-colors">
                Add New Test
              </p>
              <p className="text-[11px] text-[#52717A] mt-0.5">
                Register deployed app
              </p>
            </div>
          </button>

          <button
            onClick={() => navigate('/admin/assignments')}
            className="p-4 rounded-2xl bg-[#F7FBF8] hover:bg-[#E5F8F4] border border-slate-200 hover:border-[#00BFA6]/40 transition text-left group flex flex-col justify-between space-y-3"
          >
            <div className="w-10 h-10 rounded-xl bg-white text-[#00BFA6] flex items-center justify-center shadow-2xs group-hover:scale-110 transition-transform">
              <ClipboardList className="w-5 h-5" />
            </div>
            <div>
              <p className="font-extrabold text-[#153C47] text-xs group-hover:text-[#008e7b] transition-colors">
                Assign Test
              </p>
              <p className="text-[11px] text-[#52717A] mt-0.5">
                Prescribe to patient
              </p>
            </div>
          </button>

          <button
            onClick={() => navigate('/admin/reports')}
            className="p-4 rounded-2xl bg-[#F7FBF8] hover:bg-[#E5F8F4] border border-slate-200 hover:border-[#00BFA6]/40 transition text-left group flex flex-col justify-between space-y-3"
          >
            <div className="w-10 h-10 rounded-xl bg-white text-[#75C94B] flex items-center justify-center shadow-2xs group-hover:scale-110 transition-transform">
              <FileBarChart2 className="w-5 h-5" />
            </div>
            <div>
              <p className="font-extrabold text-[#153C47] text-xs group-hover:text-[#008e7b] transition-colors">
                View Reports
              </p>
              <p className="text-[11px] text-[#52717A] mt-0.5">
                Review clinical scores
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* Two Column Layout: Recent Patient Activity & Recent Assignments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Recent Patient Activity */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-extrabold text-[#153C47] text-sm">
                Recent Patient Activity
              </h3>
              <p className="text-[11px] text-[#52717A]">
                In-person patient registrations and intake status
              </p>
            </div>
            <Link
              to="/admin/patients"
              className="text-xs font-bold text-[#00BFA6] hover:underline inline-flex items-center gap-1"
            >
              <span>View all</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Honest Empty State */}
          <AdminEmptyState
            icon={Users}
            title="No Patient Activity Logged"
            description="Patient records will appear here as in-person registrations occur at hospital reception."
            actionText="Open Patient Intake Form"
            onAction={() => navigate('/admin/patients')}
          />
        </div>

        {/* Recent Test Assignments */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-extrabold text-[#153C47] text-sm">
                Recent Test Assignments
              </h3>
              <p className="text-[11px] text-[#52717A]">
                Prescribed psychological assessments and progress
              </p>
            </div>
            <Link
              to="/admin/assignments"
              className="text-xs font-bold text-[#00BFA6] hover:underline inline-flex items-center gap-1"
            >
              <span>View all</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Honest Empty State */}
          <AdminEmptyState
            icon={ClipboardList}
            title="No Active Assignments"
            description="Tests prescribed by clinical staff to specific patients will appear here with live launch statuses."
            actionText="Create New Assignment"
            onAction={() => navigate('/admin/assignments')}
          />
        </div>

      </div>

      {/* Assessment Completion Overview Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-extrabold text-[#153C47]">
              Assessment Completion Overview
            </h3>
            <p className="text-xs text-[#52717A]">
              Live status breakdown of doctor-prescribed patient evaluations
            </p>
          </div>
          <span className="text-[11px] font-bold text-[#008e7b] bg-[#E5F8F4] px-3 py-1 rounded-full border border-[#00BFA6]/30 self-start sm:self-auto">
            Clinical Governance Active
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-[#F7FBF8] border border-slate-200 space-y-1">
            <span className="text-[11px] font-bold text-[#52717A] uppercase">Assigned / In Progress</span>
            <p className="text-2xl font-extrabold text-[#153C47]">--</p>
            <p className="text-[11px] text-[#52717A]">Pending patient question submission</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#F7FBF8] border border-slate-200 space-y-1">
            <span className="text-[11px] font-bold text-[#52717A] uppercase">Completed &bull; Awaiting Review</span>
            <p className="text-2xl font-extrabold text-[#153C47]">--</p>
            <p className="text-[11px] text-[#52717A]">Ready for Dr. Parag Mahajan's review</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#F7FBF8] border border-slate-200 space-y-1">
            <span className="text-[11px] font-bold text-[#52717A] uppercase">Final Clinical Reports</span>
            <p className="text-2xl font-extrabold text-[#153C47]">--</p>
            <p className="text-[11px] text-[#52717A]">Archived medical assessments</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#E5F8F4] border border-[#00BFA6]/30 flex items-start gap-3 text-xs text-[#153C47]">
          <Info className="w-4 h-4 text-[#00BFA6] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Clinical Integrity Protocol:</strong> Patients can access and start only assessments authorized and prescribed to them by hospital staff. Test data is protected under medical confidentiality and results are never automatically scored without qualified physician oversight.
          </p>
        </div>
      </div>

    </div>
  );
};
