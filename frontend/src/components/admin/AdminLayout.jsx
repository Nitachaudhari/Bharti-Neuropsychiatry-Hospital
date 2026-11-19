import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AdminSidebar } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';
import { AlertCircle, Sparkles, X } from 'lucide-react';

export const AdminLayout = ({ children, currentTitle }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [devNoticeDismissed, setDevNoticeDismissed] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-[#F7FBF8] text-[#153C47] font-sans antialiased selection:bg-[#00BFA6] selection:text-white">
      
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex shrink-0">
        <AdminSidebar
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </div>

      {/* Mobile Drawer (Backdrop + Animated Drawer) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-[#153C47]/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer */}
          <div className="fixed inset-y-0 left-0 max-w-full flex">
            <AdminSidebar
              isMobile={true}
              onCloseMobile={() => setMobileMenuOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        
        {/* Admin Top Header */}
        <AdminHeader
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
          currentTitle={currentTitle}
        />

        {/* Development Mode Notice Banner (Phase 3 Requirement) */}
        {!devNoticeDismissed && (
          <div className="bg-[#E5F8F4] border-b border-[#00BFA6]/20 px-4 py-2 text-xs text-[#153C47] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00BFA6] animate-pulse"></span>
              <p className="font-medium text-[11px] sm:text-xs">
                <strong className="text-[#008e7b] font-bold">Phase 3 Admin UI Mode:</strong> Complete interface and forms ready for evaluation. Full authentication and server-side RBAC will be connected in Phase 4.
              </p>
            </div>
            <button
              onClick={() => setDevNoticeDismissed(true)}
              className="p-1 text-[#52717A] hover:text-[#153C47] rounded-md transition"
              title="Dismiss Notice"
              aria-label="Dismiss Notice"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Scrollable Main Content Canvas */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 custom-scrollbar">
          {children || <Outlet />}
        </main>

      </div>

    </div>
  );
};
