import React from 'react';
import { Sparkles, Plus } from 'lucide-react';

export const AdminEmptyState = ({
  icon: Icon = Sparkles,
  title = 'No Records Found',
  description = 'There are no active records in this section yet.',
  actionText,
  onAction,
  secondaryText,
  onSecondary
}) => {
  return (
    <div className="bg-white rounded-3xl p-10 sm:p-14 border border-dashed border-slate-300 text-center space-y-4 max-w-xl mx-auto my-6">
      <div className="w-14 h-14 rounded-2xl bg-[#E5F8F4] text-[#008e7b] border border-[#00BFA6]/20 mx-auto flex items-center justify-center shadow-xs">
        <Icon className="w-7 h-7 text-[#00BFA6]" />
      </div>

      <div className="space-y-1">
        <h3 className="text-base sm:text-lg font-extrabold text-[#153C47]">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-[#52717A] max-w-sm mx-auto leading-relaxed">
          {description}
        </p>
      </div>

      {(actionText || secondaryText) && (
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          {actionText && (
            <button
              onClick={onAction}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold text-white bg-[#00BFA6] hover:bg-[#00a892] transition shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>{actionText}</span>
            </button>
          )}

          {secondaryText && (
            <button
              onClick={onSecondary}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold text-[#153C47] bg-slate-100 hover:bg-slate-200 transition"
            >
              <span>{secondaryText}</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};
