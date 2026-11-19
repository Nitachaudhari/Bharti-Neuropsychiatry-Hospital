import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export const AdminMetricCard = ({
  title,
  value = '--',
  subtitle,
  icon: Icon,
  accentBorder = 'border-t-4 border-t-[#00BFA6]',
  iconBg = 'bg-[#E5F8F4] text-[#008e7b]',
  badge,
  badgeBg = 'bg-[#E5F8F4] text-[#008e7b]',
  onClick
}) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 ${accentBorder} ${
        onClick ? 'cursor-pointer' : ''
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-[#52717A] uppercase tracking-wider">
          {title}
        </span>
        {Icon && (
          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-xs ${iconBg}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl sm:text-4xl font-extrabold text-[#153C47] tracking-tight">
            {value}
          </span>
          {badge && (
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${badgeBg}`}>
              {badge}
            </span>
          )}
        </div>
        {subtitle && (
          <p className="text-xs text-[#52717A] mt-1.5 font-medium leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};
