import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Brain,
  ClipboardList,
  ShieldCheck,
  FileBarChart2,
  ScrollText,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Sparkles,
  Stethoscope,
  X
} from 'lucide-react';
import { APP_CONFIG } from '../../config/constants';
import { useAuth } from '../../context/AuthContext';

export const AdminSidebar = ({
  collapsed = false,
  onToggleCollapse,
  isMobile = false,
  onCloseMobile
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    if (onCloseMobile) onCloseMobile();
    navigate('/login');
  };

  const navItems = [
    {
      name: 'Dashboard Overview',
      path: '/admin/dashboard',
      alternatePath: '/admin',
      icon: LayoutDashboard
    },
    {
      name: 'Patients',
      path: '/admin/patients',
      icon: Users
    },
    {
      name: 'Test Management',
      path: '/admin/tests',
      icon: Brain
    },
    {
      name: 'Test Assignments',
      path: '/admin/assignments',
      icon: ClipboardList
    },
    {
      name: 'Staff Management',
      path: '/admin/staff',
      icon: ShieldCheck
    },
    {
      name: 'Results & Reports',
      path: '/admin/reports',
      icon: FileBarChart2
    },
    {
      name: 'Audit Logs',
      path: '/admin/audit-logs',
      icon: ScrollText
    },
    {
      name: 'Settings',
      path: '/admin/settings',
      icon: Settings
    }
  ];

  const isItemActive = (item) => {
    if (item.path === '/admin/dashboard') {
      return (
        location.pathname === '/admin/dashboard' ||
        location.pathname === '/admin' ||
        location.pathname === '/admin/'
      );
    }
    return location.pathname.startsWith(item.path);
  };

  return (
    <aside
      className={`h-full flex flex-col justify-between bg-white border-r border-slate-200 transition-all duration-200 z-30 ${
        isMobile
          ? 'w-72'
          : collapsed
          ? 'w-20'
          : 'w-64'
      }`}
    >
      {/* Top Branding Section */}
      <div className="p-4 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <Link
            to="/admin/dashboard"
            onClick={onCloseMobile}
            className="flex items-center gap-3 overflow-hidden group"
          >
            <div className="h-10 w-10 p-1 bg-[#E5F8F4] rounded-xl border border-[#00BFA6]/30 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <img
                src="/logo.png"
                alt="The Mind Solutions Logo"
                className="h-8 w-auto object-contain"
              />
            </div>

            {(!collapsed || isMobile) && (
              <div className="min-w-0 flex-1">
                <span className="block text-xs font-extrabold text-[#153C47] tracking-tight truncate leading-tight">
                  {APP_CONFIG.HOSPITAL_NAME}
                </span>
                <span className="block text-[10px] font-bold text-[#008e7b] tracking-wider uppercase truncate">
                  Admin Console
                </span>
              </div>
            )}
          </Link>

          {/* Mobile close button */}
          {isMobile ? (
            <button
              onClick={onCloseMobile}
              className="p-1.5 text-slate-400 hover:text-[#153C47] rounded-lg hover:bg-slate-100 transition"
              aria-label="Close Sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          ) : (
            /* Desktop collapse button */
            <button
              onClick={onToggleCollapse}
              className="hidden lg:flex items-center justify-center p-1.5 text-[#52717A] hover:text-[#153C47] hover:bg-[#F7FBF8] rounded-lg transition border border-slate-200/80"
              title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
              aria-label={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            >
              {collapsed ? (
                <ChevronRight className="w-4 h-4 text-[#00BFA6]" />
              ) : (
                <ChevronLeft className="w-4 h-4 text-[#52717A]" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5 custom-scrollbar">
        {navItems.map((item) => {
          const active = isItemActive(item);
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              to={item.path}
              onClick={onCloseMobile}
              title={collapsed && !isMobile ? item.name : undefined}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 group ${
                active
                  ? 'bg-[#00BFA6] text-white shadow-sm font-bold'
                  : 'text-[#153C47] hover:bg-[#E5F8F4] hover:text-[#008e7b]'
              } ${collapsed && !isMobile ? 'justify-center px-2' : ''}`}
            >
              <Icon
                className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                  active ? 'text-white' : 'text-[#52717A] group-hover:text-[#008e7b]'
                }`}
              />

              {(!collapsed || isMobile) && (
                <span className="truncate">{item.name}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Profile & Actions */}
      <div className="p-3 border-t border-slate-100 bg-[#F7FBF8]/80 space-y-2">
        {/* User Card */}
        {(!collapsed || isMobile) ? (
          <div className="p-2.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#E5F8F4] border border-[#00BFA6]/30 text-[#008e7b] flex items-center justify-center font-bold text-xs shrink-0">
              <Stethoscope className="w-4 h-4 text-[#00BFA6]" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-[#153C47] truncate leading-tight">
                {user?.fullName || user?.name || APP_CONFIG.DOCTOR_NAME}
              </p>
              <p className="text-[10px] font-semibold text-[#52717A] truncate">
                Main Administrator
              </p>
            </div>
          </div>
        ) : (
          <div
            className="flex justify-center py-1"
            title={`${user?.fullName || APP_CONFIG.DOCTOR_NAME} (Main Admin)`}
          >
            <div className="w-9 h-9 rounded-xl bg-[#E5F8F4] border border-[#00BFA6]/30 text-[#008e7b] flex items-center justify-center font-bold text-xs">
              <Stethoscope className="w-4 h-4 text-[#00BFA6]" />
            </div>
          </div>
        )}

        {/* Action Buttons: Public Site & Logout */}
        <div className={`flex items-center gap-1.5 ${collapsed && !isMobile ? 'flex-col' : ''}`}>
          <Link
            to="/"
            onClick={onCloseMobile}
            title="View Public Hospital Website"
            className={`flex items-center justify-center gap-1.5 p-2 rounded-xl text-xs font-bold text-[#52717A] hover:text-[#00BFA6] hover:bg-white border border-transparent hover:border-slate-200 transition ${
              collapsed && !isMobile ? 'w-full' : 'flex-1'
            }`}
          >
            <ExternalLink className="w-3.5 h-3.5" />
            {(!collapsed || isMobile) && <span>Public Site</span>}
          </Link>

          <button
            onClick={handleLogout}
            title="Sign Out of Admin Console"
            className={`flex items-center justify-center gap-1.5 p-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition ${
              collapsed && !isMobile ? 'w-full' : 'flex-1'
            }`}
          >
            <LogOut className="w-3.5 h-3.5" />
            {(!collapsed || isMobile) && <span>Logout</span>}
          </button>
        </div>
      </div>
    </aside>
  );
};
