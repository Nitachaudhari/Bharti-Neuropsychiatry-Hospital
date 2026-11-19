import React from 'react';

export const AdminStatusBadge = ({ status }) => {
  const normalized = (status || '').toLowerCase().trim();

  let styles = 'bg-slate-100 text-slate-700 border-slate-200';
  let label = status || 'Unknown';

  switch (normalized) {
    case 'active':
    case 'completed':
    case 'success':
      styles = 'bg-[#f2faed] text-[#559b31] border-[#75C94B]/30';
      break;
    case 'in progress':
    case 'in_progress':
    case 'assigned':
      styles = 'bg-[#E5F8F4] text-[#008e7b] border-[#00BFA6]/30';
      break;
    case 'pending':
    case 'pending intake':
    case 'scheduled':
      styles = 'bg-[#fffbf0] text-[#a06d09] border-[#FFD43B]/40';
      break;
    case 'inactive':
    case 'suspended':
    case 'failed':
    case 'revoked':
      styles = 'bg-[#fff1ee] text-[#FF684A] border-[#FF684A]/30';
      break;
    case 'expired':
      styles = 'bg-slate-100 text-slate-600 border-slate-300';
      break;
    default:
      styles = 'bg-[#edf7fc] text-[#2582a7] border-[#42B9E8]/30';
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border capitalize leading-none ${styles}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
      <span>{label}</span>
    </span>
  );
};
