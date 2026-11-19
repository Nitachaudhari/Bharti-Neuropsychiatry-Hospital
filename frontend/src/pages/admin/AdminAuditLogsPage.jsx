import React, { useState } from 'react';
import {
  ShieldAlert,
  Search,
  Filter,
  Clock,
  User,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  FileText,
  Download,
  Terminal,
  Activity,
  Calendar,
  Eye,
  Info,
  Server,
  Lock
} from 'lucide-react';
import { AdminModal } from '../../components/admin/AdminModal';
import { AdminEmptyState } from '../../components/admin/AdminEmptyState';
import { AdminStatusBadge } from '../../components/admin/AdminStatusBadge';

export const AdminAuditLogsPage = () => {
  // Genuine system initialization event - no fabricated clinical activity logs (Phase 3 Requirement 2)
  const [logs, setLogs] = useState([
    {
      id: 'SYS-INIT-001',
      timestamp: '2026-11-19 10:00:00',
      actor: 'System Core',
      actorRole: 'Daemon',
      action: 'Admin UI Mode Initialized',
      module: 'System',
      recordRef: 'BUILD-PHASE-3',
      details: 'Bharti Neuropsychiatry Hospital administrative interface loaded in evaluation mode.',
      ipAddress: '127.0.0.1 (Local Console)',
      status: 'Success'
    }
  ]);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [moduleFilter, setModuleFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Modals state
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedLog, setSelectedLog] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Filtered logs
  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.actor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.recordRef.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.ipAddress.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesModule = moduleFilter === 'ALL' || log.module === moduleFilter;
    const matchesStatus = statusFilter === 'ALL' || log.status === statusFilter;

    return matchesSearch && matchesModule && matchesStatus;
  });

  // Handle Export CSV
  const handleExportCSV = () => {
    const headers = ['Log ID', 'Timestamp', 'Actor', 'Role', 'Action', 'Module', 'Record Ref', 'IP Address', 'Status'];
    const rows = filteredLogs.map((l) => [
      l.id,
      l.timestamp,
      `"${l.actor}"`,
      `"${l.actorRole}"`,
      `"${l.action}"`,
      `"${l.module}"`,
      l.recordRef,
      `"${l.ipAddress}"`,
      l.status
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `bharti_audit_logs_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Audit logs exported to CSV file successfully.');
  };

  return (
    <div className="space-y-6">

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border border-[#75C94B]/40 bg-[#F7FBF8] text-[#153C47] text-sm font-medium animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-[#00BFA6] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#153C47] tracking-tight">
              System Audit Logs
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#E5F8F4] text-[#00BFA6] border border-[#00BFA6]/30">
              Tamper-Evident Trail
            </span>
          </div>
          <p className="text-sm text-[#52717A] mt-1">
            Complete audit trail of user logins, patient records, test assignments, and medical report reviews.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-[#153C47] bg-white border border-gray-200 hover:bg-[#F7FBF8] shadow-xs transition cursor-pointer"
          >
            <Download className="w-4 h-4 text-[#00BFA6]" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Audit Compliance Notice */}
      <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-xs flex items-start gap-3.5">
        <div className="w-10 h-10 rounded-xl bg-[#E5F8F4] text-[#00BFA6] flex items-center justify-center shrink-0">
          <ShieldAlert className="w-5 h-5" />
        </div>
        <div className="flex-1 text-sm">
          <h2 className="font-bold text-[#153C47] flex items-center gap-2">
            <span>Healthcare Compliance & Privacy Policy</span>
            <span className="text-xs px-2 py-0.5 rounded-md bg-[#75C94B]/10 text-[#4d8b2d] font-semibold">
              Read-Only Immutable
            </span>
          </h2>
          <p className="text-[#52717A] text-xs sm:text-sm mt-0.5 leading-relaxed">
            Audit logs are recorded automatically with IP origin and user IDs to comply with clinical data protection guidelines. Log records cannot be edited or erased by ordinary staff.
          </p>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-100 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#52717A] uppercase tracking-wider">Total Events</span>
            <div className="w-8 h-8 rounded-lg bg-[#E5F8F4] text-[#00BFA6] flex items-center justify-center">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-[#153C47] mt-2">{logs.length}</p>
          <p className="text-xs text-[#52717A] mt-1">Logged actions</p>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-100 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#52717A] uppercase tracking-wider">Patient Events</span>
            <div className="w-8 h-8 rounded-lg bg-[#42B9E8]/10 text-[#42B9E8] flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-[#153C47] mt-2">--</p>
          <p className="text-xs text-[#52717A] mt-1">Pending Phase 4 stream</p>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-100 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#52717A] uppercase tracking-wider">Test Activity</span>
            <div className="w-8 h-8 rounded-lg bg-[#FFD43B]/20 text-[#a37200] flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-[#153C47] mt-2">--</p>
          <p className="text-xs text-[#52717A] mt-1">Pending Phase 4 stream</p>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-100 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#52717A] uppercase tracking-wider">Security Events</span>
            <div className="w-8 h-8 rounded-lg bg-[#75C94B]/10 text-[#75C94B] flex items-center justify-center">
              <Lock className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-[#153C47] mt-2">--</p>
          <p className="text-xs text-[#52717A] mt-1">Pending Phase 4 stream</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#52717A] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by actor, action, record ID, or IP..."
            className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-gray-200 bg-[#F7FBF8] text-[#153C47] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00BFA6]/30 focus:border-[#00BFA6] transition"
          />
        </div>

        <div className="flex items-center gap-2.5 overflow-x-auto pb-1 md:pb-0">
          <div className="flex items-center gap-1.5 shrink-0">
            <Filter className="w-3.5 h-3.5 text-[#52717A]" />
            <span className="text-xs font-medium text-[#52717A]">Module:</span>
            <select
              value={moduleFilter}
              onChange={(e) => setModuleFilter(e.target.value)}
              className="text-xs py-1.5 px-2.5 rounded-lg border border-gray-200 bg-[#F7FBF8] text-[#153C47] font-medium focus:outline-none focus:border-[#00BFA6]"
            >
              <option value="ALL">All Modules</option>
              <option value="Patient Records">Patient Records</option>
              <option value="Test Assignments">Test Assignments</option>
              <option value="Assessments">Assessments</option>
              <option value="Clinical Reports">Clinical Reports</option>
              <option value="Test Catalog">Test Catalog</option>
              <option value="Security & Auth">Security & Auth</option>
              <option value="System">System</option>
            </select>
          </div>

          {(searchQuery || moduleFilter !== 'ALL' || statusFilter !== 'ALL') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setModuleFilter('ALL');
                setStatusFilter('ALL');
              }}
              className="text-xs text-[#FF684A] hover:underline font-semibold px-2 py-1"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
        {filteredLogs.length === 0 ? (
          <AdminEmptyState
            title="No Audit Logs Found"
            description="No log events match your search query or module filters. Clear filters to see complete trail."
            actionText="Reset Filters"
            onAction={() => {
              setSearchQuery('');
              setModuleFilter('ALL');
              setStatusFilter('ALL');
            }}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-[#153C47]">
              <thead className="bg-[#F7FBF8] border-b border-gray-100 text-xs font-bold text-[#52717A] uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Date & Time</th>
                  <th className="py-3.5 px-4">Actor</th>
                  <th className="py-3.5 px-4">Action</th>
                  <th className="py-3.5 px-4">Module</th>
                  <th className="py-3.5 px-4">Record Ref</th>
                  <th className="py-3.5 px-4">IP Origin</th>
                  <th className="py-3.5 px-4 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredLogs.map((log) => {
                  return (
                    <tr key={log.id} className="hover:bg-[#F7FBF8]/60 transition-colors">
                      <td className="py-3.5 px-4 text-xs font-mono text-[#52717A] whitespace-nowrap">
                        <div className="font-semibold text-[#153C47]">{log.timestamp.split(' ')[0]}</div>
                        <div className="text-[11px] text-[#52717A]">{log.timestamp.split(' ')[1]}</div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-bold text-[#153C47] text-xs sm:text-sm">{log.actor}</div>
                        <span className="text-[11px] text-[#52717A]">{log.actorRole}</span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-[#153C47] text-xs sm:text-sm block">
                          {log.action}
                        </span>
                        <span className="text-[11px] text-[#52717A] line-clamp-1">
                          {log.details}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="inline-block px-2.5 py-0.5 rounded-md text-xs font-bold bg-[#E5F8F4] text-[#00BFA6] border border-[#00BFA6]/20">
                          {log.module}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 font-mono text-xs font-bold text-[#153C47] whitespace-nowrap">
                        {log.recordRef}
                      </td>

                      <td className="py-3.5 px-4 text-xs font-mono text-[#52717A] whitespace-nowrap">
                        {log.ipAddress}
                      </td>

                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <button
                          onClick={() => {
                            setSelectedLog(log);
                            setIsDetailModalOpen(true);
                          }}
                          className="p-1.5 rounded-lg text-[#00BFA6] hover:bg-[#E5F8F4] transition cursor-pointer"
                          title="View Log Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ================================================================= */}
      {/* MODAL: AUDIT EVENT DETAIL */}
      {/* ================================================================= */}
      <AdminModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        title="Audit Log Entry Details"
      >
        {selectedLog && (
          <div className="space-y-4">
            <div className="p-3.5 rounded-xl bg-[#F7FBF8] border border-gray-100 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono font-bold text-[#00BFA6] uppercase tracking-wider">
                  Event Reference
                </span>
                <p className="font-mono font-bold text-[#153C47] text-sm mt-0.5">{selectedLog.id}</p>
              </div>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-[#75C94B]/10 text-[#4d8b2d] border border-[#75C94B]/30">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#75C94B]" />
                <span>{selectedLog.status}</span>
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-white rounded-xl border border-gray-100">
                <span className="text-[#52717A]">Event Timestamp</span>
                <p className="font-bold text-[#153C47] mt-0.5">{selectedLog.timestamp}</p>
              </div>
              <div className="p-3 bg-white rounded-xl border border-gray-100">
                <span className="text-[#52717A]">Subsystem Module</span>
                <p className="font-bold text-[#00BFA6] mt-0.5">{selectedLog.module}</p>
              </div>
              <div className="p-3 bg-white rounded-xl border border-gray-100">
                <span className="text-[#52717A]">Actor Name & Role</span>
                <p className="font-bold text-[#153C47] mt-0.5">{selectedLog.actor} ({selectedLog.actorRole})</p>
              </div>
              <div className="p-3 bg-white rounded-xl border border-gray-100">
                <span className="text-[#52717A]">Target Record Reference</span>
                <p className="font-mono font-bold text-[#153C47] mt-0.5">{selectedLog.recordRef}</p>
              </div>
            </div>

            <div className="p-3 bg-white rounded-xl border border-gray-100 text-xs">
              <span className="text-[#52717A]">Network Origin / IP Address</span>
              <p className="font-mono font-semibold text-[#153C47] mt-0.5">{selectedLog.ipAddress}</p>
            </div>

            <div className="p-3.5 bg-[#E5F8F4] rounded-xl border border-[#00BFA6]/20 text-xs">
              <span className="font-bold text-[#153C47] block mb-1">Activity Payload Summary</span>
              <p className="text-[#153C47] leading-relaxed">{selectedLog.details}</p>
            </div>

            <div className="flex justify-end pt-2 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setIsDetailModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#153C47] hover:bg-[#0f2c34] transition cursor-pointer"
              >
                Close View
              </button>
            </div>
          </div>
        )}
      </AdminModal>

    </div>
  );
};
