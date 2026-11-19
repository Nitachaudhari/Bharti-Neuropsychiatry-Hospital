import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-6">
      <div className="w-16 h-16 rounded-2xl bg-brand-coral-50 text-brand-coral flex items-center justify-center mx-auto border border-brand-coral/30 shadow-fresh">
        <ShieldAlert className="w-8 h-8" />
      </div>
      <h1 className="text-3xl font-extrabold text-brand-dark tracking-tight">
        404 — Page Not Found
      </h1>
      <p className="text-sm text-brand-dark-muted leading-relaxed">
        The requested portal page or clinical assessment route does not exist. Please return to the portal homepage.
      </p>
      <div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-brand-teal text-white text-xs font-bold hover:bg-brand-teal-hover transition-all shadow-teal-glow hover:scale-105 transform"
        >
          <ArrowLeft className="w-4 h-4 text-brand-yellow" />
          <span>Return to Homepage</span>
        </Link>
      </div>
    </div>
  );
};
