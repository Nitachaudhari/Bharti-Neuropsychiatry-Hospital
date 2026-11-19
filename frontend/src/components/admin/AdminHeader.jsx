import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu,
  Bell,
  Search,
  User,
  ShieldCheck,
  Stethoscope,
  ExternalLink,
  Sparkles,
  Info
} from 'lucide-react';
import { APP_CONFIG } from '../../config/constants';
import { useAuth } from '../../context/AuthContext';

export const AdminHeader = ({ onOpenMobileMenu, currentTitle }) => {
  const { user } = useAuth();
  const location = useLocation();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Determine current page title if not explicitly provided
  const getPageTitle = () => {
    if (currentTitle) return currentTitle;
    const path = location.pathname;
    if (path.includes('/admin/patients')) return 'Patient Management';
    if (path.includes('/admin/tests')) return 'Test Management';
    if (path.includes('/admin/assignments')) return 'Test Assignments';
    if (path.includes('/admin/staff')) return 'Staff Management';
    if (path.includes('/admin/reports')) return 'Results & Clinical Reports';
    if (path.includes('/admin/audit-logs')) return 'Security Audit Logs';
    if (path.includes('/admin/settings')) return 'Hospital & System Settings';
    return 'Dashboard Overview';
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-20 transition-all shadow-2xs">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 gap-4">
          
          {/* Left: Mobile hamburger & Page Title */}
          <div className="flex items-center gap-3 min-w-0">
            {/* Mobile Drawer Toggle */}
            <button
              onClick={onOpenMobileMenu}
              className="lg:hidden p-2 rounded-xl text-[#153C47] hover:text-[#00BFA6] hover:bg-[#F7FBF8] border border-slate-200 focus:outline-none"
              aria-label="Open Admin Menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Title & Hospital Breadcrumb */}
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="hidden sm:inline-block text-[11px] font-bold text-[#008e7b] uppercase tracking-wider">
                  {APP_CONFIG.HOSPITAL_NAME}
                </span>
                <span className="hidden sm:inline text-slate-300">&bull;</span>
                <span className="text-[11px] font-medium text-[#52717A] hidden md:inline">
                  Admin Portal
                </span>
              </div>
              <h1 className="text-base sm:text-lg font-extrabold text-[#153C47] truncate tracking-tight">
                {getPageTitle()}
              </h1>
            </div>
          </div>

          {/* Center: Search Area (Desktop / Tablet) */}
          <div className="hidden md:flex items-center flex-1 max-w-xs lg:max-w-md mx-2">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-[#52717A] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search patients, tests, staff..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#F7FBF8] border border-slate-200 text-xs text-[#153C47] focus:outline-none focus:ring-2 focus:ring-[#00BFA6] focus:bg-white transition"
              />
            </div>
          </div>

          {/* Right: Actions, Notifications & User Profile */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* Phase 3 UI Development Mode Badge */}
            <span className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-[#E5F8F4] text-[#008e7b] border border-[#00BFA6]/30">
              <Sparkles className="w-3 h-3 text-[#FFD43B]" />
              <span>Phase 3 UI Mode</span>
            </span>

            {/* Notification Bell (UI Placeholder) */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2 text-[#52717A] hover:text-[#153C47] hover:bg-[#F7FBF8] rounded-xl border border-slate-200/80 transition relative"
                aria-label="Admin Notifications"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
              </button>

              {/* Notification Popover Dropdown */}
              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 text-xs z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-extrabold text-[#153C47]">Notifications</span>
                    <span className="text-[10px] font-bold text-[#52717A] bg-slate-100 px-2 py-0.5 rounded-full">
                      0 Unread
                    </span>
                  </div>
                  <div className="py-4 text-center space-y-1.5">
                    <p className="font-bold text-[#153C47]">No New Notifications</p>
                    <p className="text-[11px] text-[#52717A] leading-relaxed">
                      Real-time assessment alerts and patient activity notifications will appear here once connected to the Phase 4 backend.
                    </p>
                  </div>
                  <button
                    onClick={() => setNotificationsOpen(false)}
                    className="w-full text-center py-1.5 rounded-lg bg-slate-100 text-[#52717A] hover:bg-slate-200 font-bold text-[11px] transition"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>

            {/* User Profile Area (Visual Placeholder) */}
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <div className="w-9 h-9 rounded-xl bg-[#00BFA6] text-white flex items-center justify-center font-bold text-xs shadow-sm shrink-0">
                <Stethoscope className="w-4 h-4" />
              </div>
              <div className="hidden sm:block text-left">
                <span className="block text-xs font-bold text-[#153C47] leading-tight truncate max-w-[130px]">
                  {user?.fullName || user?.name || APP_CONFIG.DOCTOR_NAME}
                </span>
                <span className="block text-[10px] font-semibold text-[#008e7b] leading-tight">
                  Main Administrator
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};
