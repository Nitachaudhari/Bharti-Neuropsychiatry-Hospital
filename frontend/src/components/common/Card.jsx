import React from 'react';

export const Card = ({ children, className = '', title = null, icon: Icon = null, subtitle = null }) => {
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden ${className}`}>
      {(title || Icon) && (
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {Icon && (
              <div className="w-8 h-8 rounded-lg bg-hospital-teal-50 text-hospital-teal-600 flex items-center justify-center">
                <Icon className="w-4 h-4" />
              </div>
            )}
            <div>
              <h3 className="font-bold text-hospital-navy-900 text-sm tracking-tight">{title}</h3>
              {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
            </div>
          </div>
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};
