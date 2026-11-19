import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const UnauthorizedPage = () => {
  const { user } = useAuth();

  const getFallbackDashboard = () => {
    if (user?.role === 'patient') return '/patient/dashboard';
    if (user?.role) return '/staff/dashboard';
    return '/login';
  };

  return (
    <div className="max-w-md mx-auto px-4 py-20 text-center space-y-6">
      <div className="w-16 h-16 rounded-2xl bg-brand-coral-50 text-brand-coral flex items-center justify-center mx-auto border border-brand-coral/30 shadow-fresh">
        <ShieldAlert className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-coral bg-brand-coral-50 px-3 py-1 rounded-full border border-brand-coral/30">
          HTTP 403 Forbidden
        </span>
        <h1 className="text-2xl font-extrabold text-brand-dark tracking-tight">
          Clinical Access Restricted
        </h1>
        <p className="text-xs text-brand-dark-muted leading-relaxed max-w-sm mx-auto">
          Your current account role <strong className="font-mono text-brand-teal font-bold">[{user?.role || 'Guest'}]</strong> does not possess the permissions required to view this hospital portal section.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <Link
          to={getFallbackDashboard()}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-brand-teal text-white text-xs font-bold hover:bg-brand-teal-hover transition shadow-teal-glow hover:scale-105 transform"
        >
          <ArrowLeft className="w-4 h-4 text-brand-yellow" />
          <span>Return to Your Dashboard</span>
        </Link>
        <Link
          to="/"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white border border-slate-200 text-brand-dark text-xs font-bold hover:bg-brand-fresh transition shadow-fresh"
        >
          <span>Portal Home</span>
        </Link>
      </div>
    </div>
  );
};
