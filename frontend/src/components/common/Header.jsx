import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Activity, 
  Menu, 
  X, 
  User, 
  LogOut, 
  Lock, 
  Stethoscope, 
  Phone,
  Clock,
  MapPin,
  ChevronRight
} from 'lucide-react';
import { APP_CONFIG } from '../../config/constants';
import { useAuth } from '../../context/AuthContext';

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Exactly 6 primary navigation items
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Assessments', path: '/assessments' },
    { name: 'Patient', path: '/patient' },
    { name: 'Login', path: '/login' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 transition-all shadow-sm">
      
      {/* Top Notification & OPD Bar in Tropical Teal (#00BFA6) */}
      <div className="bg-[#00BFA6] px-4 py-2 text-xs text-white">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FFD43B] animate-pulse"></span>
            <span className="font-bold text-xs tracking-wide">
              {APP_CONFIG.SUB_BRAND} &bull; <em className="not-italic text-[#FFD43B]">"{APP_CONFIG.TAGLINE}"</em>
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs text-white">
            <span className="hidden md:flex items-center gap-1.5 font-medium">
              <Clock className="w-3.5 h-3.5 text-[#FFD43B]" />
              <span>OPD: 10 AM – 1 PM (Sat & Tue Closed)</span>
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <Phone className="w-3.5 h-3.5 text-[#FFD43B]" />
              <a href={`tel:${APP_CONFIG.PHONE}`} className="hover:underline font-bold text-white">
                {APP_CONFIG.PHONE_DISPLAY}
              </a>
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Hospital Logo & Brand Identity */}
          <Link to="/" className="flex items-center gap-3.5 group">
            <div className="h-14 w-auto flex items-center justify-center p-1 bg-white rounded-2xl border border-slate-200/80 shadow-sm group-hover:scale-105 transition-transform duration-200 shrink-0">
              <img
                src="/logo.png"
                alt="The Mind Solutions Center & Hospital"
                className="h-12 w-auto object-contain rounded-xl"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-xl font-extrabold tracking-tight text-[#153C47] group-hover:text-[#00BFA6] transition-colors">
                  {APP_CONFIG.HOSPITAL_NAME}
                </span>
              </div>
              <p className="text-[11px] font-semibold text-[#52717A] tracking-wide flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#75C94B]"></span>
                <span>{APP_CONFIG.DOCTOR_NAME} ({APP_CONFIG.DOCTOR_QUALIFICATIONS}) &bull; Bhusawal</span>
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-2 bg-[#F7FBF8] p-1.5 rounded-full border border-slate-200">
            {navLinks.map((link) => {
              const isLogin = link.name === 'Login';
              const active = isActive(link.path);

              if (isLogin) {
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="ml-1 inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-bold text-white bg-[#FF684A] hover:bg-[#e85538] transition-all shadow-sm"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Login</span>
                  </Link>
                );
              }

              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-150 ${
                    active
                      ? 'bg-[#00BFA6] text-white shadow-sm'
                      : 'text-[#153C47] hover:text-[#00BFA6] hover:bg-white'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* User state indicator when logged in */}
          {isAuthenticated && (
            <div className="hidden lg:flex items-center gap-3">
              <Link
                to={user?.role === 'patient' ? '/patient/dashboard' : '/staff/dashboard'}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#E5F8F4] border border-[#00BFA6]/30 text-xs text-[#153C47] font-bold"
              >
                {user?.role === 'patient' ? (
                  <User className="w-3.5 h-3.5 text-[#00BFA6]" />
                ) : (
                  <Stethoscope className="w-3.5 h-3.5 text-[#FF684A]" />
                )}
                <span>{user?.fullName || user?.name || 'Dashboard'}</span>
              </Link>
              <button
                onClick={handleLogout}
                title="Sign Out"
                className="p-2 rounded-xl bg-slate-100 hover:bg-rose-50 text-[#52717A] hover:text-[#FF684A] transition border border-slate-200"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Mobile menu toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[#153C47] hover:text-[#00BFA6] p-2 rounded-xl bg-[#F7FBF8] border border-slate-200 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-5 pt-4 pb-6 space-y-3 shadow-lg">
          <div className="pb-3 border-b border-slate-100 text-xs space-y-1">
            <p className="font-bold text-[#153C47]">{APP_CONFIG.DOCTOR_NAME_MARATHI} ({APP_CONFIG.DOCTOR_QUALIFICATIONS})</p>
            <p className="text-[11px] text-[#52717A]">OPD: 10 AM – 1 PM (Sat/Tue Closed) &bull; Bhusawal</p>
            <a href={`tel:${APP_CONFIG.PHONE}`} className="inline-flex items-center gap-1.5 text-[#FF684A] font-bold text-xs mt-1">
              <Phone className="w-3.5 h-3.5" />
              <span>Call: {APP_CONFIG.PHONE}</span>
            </a>
          </div>

          <nav className="space-y-1.5">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              const isLogin = link.name === 'Login';

              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition ${
                    active
                      ? isLogin
                        ? 'bg-[#FF684A] text-white'
                        : 'bg-[#00BFA6] text-white'
                      : isLogin
                        ? 'bg-[#fff1ee] text-[#FF684A] border border-[#FF684A]/30'
                        : 'text-[#153C47] hover:bg-[#F7FBF8]'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {isLogin && <Lock className="w-3.5 h-3.5" />}
                    <span>{link.name}</span>
                  </span>
                  <ChevronRight className="w-4 h-4 opacity-70" />
                </Link>
              );
            })}
          </nav>

          {isAuthenticated && (
            <div className="pt-3 border-t border-slate-200 space-y-2">
              <Link
                to={user?.role === 'patient' ? '/patient/dashboard' : '/staff/dashboard'}
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center py-2.5 rounded-xl text-xs font-bold bg-[#E5F8F4] text-[#153C47] border border-slate-200"
              >
                Go to {user?.role === 'patient' ? 'Patient Dashboard' : 'Staff Console'}
              </Link>
              <button
                onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                className="block w-full text-center py-2.5 rounded-xl text-xs font-bold bg-[#fff1ee] text-[#FF684A] border border-[#FF684A]/30"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
