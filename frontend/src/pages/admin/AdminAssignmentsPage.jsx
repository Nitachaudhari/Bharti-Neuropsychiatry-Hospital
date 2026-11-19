import React, { useState } from 'react';
import {
  ClipboardList,
  Plus,
  Search,
  Filter,
  Eye,
  CheckCircle2,
  Clock,
  User,
  Brain,
  ShieldCheck,
  AlertCircle,
  Key,
  ExternalLink,
  Calendar,
  X
} from 'lucide-react';
import { AdminModal } from '../../components/admin/AdminModal';
import { AdminEmptyState } from '../../components/admin/AdminEmptyState';
import { AdminStatusBadge } from '../../components/admin/AdminStatusBadge';
import { APP_CONFIG } from '../../config/constants';

export const AdminAssignmentsPage = () => {
  // Empty initial assignments - no unverified fake referrals (Phase 3 Requirement 2)
  const [assignments, setAssignments] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Modals
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    patientId: '',
    testId: '',
    assignedBy: 'Dr. Parag Keshav Mahajan',
    expiryDays: '14',
    clinicalNotes: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [validationSuccessMsg, setValidationSuccessMsg] = useState(null);

  // Patient Options (Loaded dynamically from Patient Registry / Backend)
  const patientOptions = [];

  // Verified Clinical Test Batteries for Assignment
  const testOptions = [
    { id: 'CAT-COG-01', name: 'Cognitive & Memory Battery (CAT-COG)' },
    { id: 'BDI-II-02', name: 'Beck Depression Inventory (BDI-II)' },
    { id: 'BAI-ANX-03', name: 'Beck Anxiety Inventory (BAI)' },
    { id: 'ADHD-ASRS-04', name: 'Adult ADHD Self-Report Scale (ASRS v1.1)' }
  ];

  // Filter
  const filteredAssignments = assignments.filter((asg) => {
    const matchesSearch =
      asg.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asg.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asg.testName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asg.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'All' || asg.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  // Open New Assignment Modal
  const handleOpenNew = () => {
    setFormData({
      patientId: patientOptions[0]?.id || '',
      testId: testOptions[0]?.id || '',
      assignedBy: 'Dr. Parag Keshav Mahajan',
      expiryDays: '14',
      clinicalNotes: ''
    });
    setFormErrors({});
    setValidationSuccessMsg(null);
    setIsNewModalOpen(true);
  };

  // Open Details Modal
  const handleOpenDetails = (assignment) => {
    setSelectedAssignment(assignment);
    setIsDetailsModalOpen(true);
  };

  // Validate Form
  const validateForm = () => {
    const errors = {};
    if (!formData.patientId) errors.patientId = 'Please select a patient';
    if (!formData.testId) errors.testId = 'Please select a test';
    if (!formData.assignedBy.trim()) errors.assignedBy = 'Assigning clinician name is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle Submit (Phase 3 UI Simulation)
  const handleNewSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const patient = patientOptions.find((p) => p.id === formData.patientId);
    const test = testOptions.find((t) => t.id === formData.testId);

    const today = new Date();
    const expiry = new Date();
    expiry.setDate(today.getDate() + parseInt(formData.expiryDays || '14', 10));

    const newAssignment = {
      id: `ASG-2026-${(assignments.length + 1).toString().padStart(3, '0')}`,
      patientId: formData.patientId,
      patientName: patient?.name || 'Selected Patient',
      testId: formData.testId,
      testName: test?.name || 'Selected Test',
      assignedBy: formData.assignedBy.trim(),
      assignedDate: today.toISOString().split('T')[0],
      expiryDate: expiry.toISOString().split('T')[0],
      status: 'Assigned',
      launchToken: 'PENDING_BACKEND_GENERATION',
      clinicalNotes: formData.clinicalNotes.trim()
    };

    setAssignments([newAssignment, ...assignments]);
    setValidationSuccessMsg('Assignment validated in client state. Launch token provisioned for Phase 3 UI.');
    setTimeout(() => {
      setIsNewModalOpen(false);
      setValidationSuccessMsg(null);
    }, 1200);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#153C47] tracking-tight">
            Test Assignments
          </h2>
          <p className="text-xs text-[#52717A] mt-0.5">
            Prescribe assessments to specific patients and manage launch authorization windows
          </p>
        </div>

        <button
          onClick={handleOpenNew}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-[#00BFA6] hover:bg-[#00a892] transition shadow-xs hover:scale-105 transform active:scale-95 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Test Assignment</span>
        </button>
      </div>

      {/* Clinical Access Governance Callout */}
      <div className="p-4 rounded-3xl bg-[#E5F8F4] border border-[#00BFA6]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#153C47]">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-5 h-5 text-[#00BFA6] shrink-0" />
          <p className="leading-relaxed">
            <strong>Access Rule:</strong> Patients can access and start <em>only</em> tests explicitly prescribed and assigned to them by treating medical staff. Direct assessment URLs cannot be started without doctor authorization.
          </p>
        </div>
        <span className="text-[10px] font-bold text-[#008e7b] bg-white px-3 py-1 rounded-full border border-[#00BFA6]/30 shrink-0 self-start sm:self-auto">
          Single-Use Tokens
        </span>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-[#52717A] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search assignment ID, patient, or test..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#F7FBF8] border border-slate-200 text-xs text-[#153C47] focus:outline-none focus:ring-2 focus:ring-[#00BFA6]"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <span className="text-xs font-bold text-[#52717A] mr-1 hidden sm:inline">Status:</span>
          {['All', 'Assigned', 'In Progress', 'Completed', 'Expired'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition shrink-0 ${
                statusFilter === status
                  ? 'bg-[#153C47] text-white shadow-xs'
                  : 'bg-[#F7FBF8] text-[#52717A] hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Assignments Table */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs overflow-hidden">
        {filteredAssignments.length === 0 ? (
          <div className="p-8">
            <AdminEmptyState
              icon={ClipboardList}
              title={assignments.length === 0 ? "No Active Test Assignments" : "No Assignments Matching Filter"}
              description={
                assignments.length === 0
                  ? "No psychological assessments have been prescribed to patients yet. Click 'New Test Assignment' to configure a prescription order, or active assignments will stream from the Phase 4 backend."
                  : "No active assignments match your query. Try clearing the filter."
              }
              actionText="New Test Assignment"
              onAction={handleOpenNew}
              secondaryText={assignments.length > 0 && (searchTerm || statusFilter !== 'All') ? 'Clear Filters' : undefined}
              onSecondary={() => { setSearchTerm(''); setStatusFilter('All'); }}
            />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#F7FBF8] border-b border-slate-200 text-[#52717A] uppercase text-[10px] tracking-wider font-extrabold">
                  <th className="py-3.5 px-4 sm:px-6">Assignment ID</th>
                  <th className="py-3.5 px-4">Patient Details</th>
                  <th className="py-3.5 px-4">Prescribed Assessment</th>
                  <th className="py-3.5 px-4">Assigned By</th>
                  <th className="py-3.5 px-4">Dates</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredAssignments.map((asg) => (
                  <tr
                    key={asg.id}
                    className="hover:bg-[#E5F8F4]/30 transition group"
                  >
                    <td className="py-4 px-4 sm:px-6 font-mono font-bold text-[#008e7b]">
                      {asg.id}
                    </td>

                    <td className="py-4 px-4">
                      <div className="font-extrabold text-[#153C47]">
                        {asg.patientName}
                      </div>
                      <span className="font-mono text-[11px] text-[#52717A]">
                        {asg.patientId}
                      </span>
                    </td>

                    <td className="py-4 px-4">
                      <div className="font-bold text-[#153C47]">
                        {asg.testName}
                      </div>
                      <span className="text-[11px] font-mono text-[#008e7b]">
                        {asg.testId}
                      </span>
                    </td>

                    <td className="py-4 px-4 text-[#52717A]">
                      <span className="font-semibold text-[#153C47]">{asg.assignedBy}</span>
                    </td>

                    <td className="py-4 px-4 text-[11px] text-[#52717A]">
                      <div>Assigned: <strong className="text-[#153C47]">{asg.assignedDate}</strong></div>
                      <div>Expires: <span>{asg.expiryDate}</span></div>
                    </td>

                    <td className="py-4 px-4">
                      <AdminStatusBadge status={asg.status} />
                    </td>

                    <td className="py-4 px-4 sm:px-6 text-right">
                      <button
                        onClick={() => handleOpenDetails(asg)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#E5F8F4] text-[#008e7b] hover:bg-[#d5f4ed] font-bold text-xs transition"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Details</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="p-4 bg-[#F7FBF8] border-t border-slate-100 flex items-center justify-between text-xs text-[#52717A]">
          <span>Showing {filteredAssignments.length} of {assignments.length} assignments</span>
          <span className="text-[11px] font-semibold text-[#008e7b]">
            Single-Use Time-Delimited Access
          </span>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* MODAL: New Assignment Form                                            */}
      {/* ===================================================================== */}
      <AdminModal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        title="Assign Assessment to Patient"
        subtitle="Doctor-supervised assignment of psychological test battery"
      >
        {validationSuccessMsg ? (
          <div className="p-6 rounded-2xl bg-[#f2faed] border border-[#75C94B] text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-[#66b43e] mx-auto" />
            <h4 className="font-extrabold text-[#153C47] text-sm">Assignment Created</h4>
            <p className="text-xs text-[#52717A]">{validationSuccessMsg}</p>
          </div>
        ) : (
          <form onSubmit={handleNewSubmit} className="space-y-4 text-xs">
            {/* Patient Selector */}
            <div>
              <label className="block font-bold text-[#153C47] mb-1">
                Select Patient <span className="text-[#FF684A]">*</span>
              </label>
              <select
                value={formData.patientId}
                onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-[#F7FBF8] text-[#153C47] focus:outline-none focus:ring-2 focus:ring-[#00BFA6]"
              >
                {patientOptions.length === 0 ? (
                  <option value="">No patients registered — Register at /admin/patients first</option>
                ) : (
                  <>
                    <option value="">-- Select Patient --</option>
                    {patientOptions.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} ({p.id})
                      </option>
                    ))}
                  </>
                )}
              </select>
            </div>

            {/* Assessment Selector */}
            <div>
              <label className="block font-bold text-[#153C47] mb-1">
                Select Assessment Battery <span className="text-[#FF684A]">*</span>
              </label>
              <select
                value={formData.testId}
                onChange={(e) => setFormData({ ...formData, testId: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-[#F7FBF8] text-[#153C47] focus:outline-none focus:ring-2 focus:ring-[#00BFA6]"
              >
                {testOptions.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Assigned By & Expiry */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-[#153C47] mb-1">
                  Assigned By (Clinician) <span className="text-[#FF684A]">*</span>
                </label>
                <input
                  type="text"
                  value={formData.assignedBy}
                  onChange={(e) => setFormData({ ...formData, assignedBy: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-[#F7FBF8] text-[#153C47] focus:outline-none focus:ring-2 focus:ring-[#00BFA6]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#153C47] mb-1">
                  Access Validity (Days)
                </label>
                <select
                  value={formData.expiryDays}
                  onChange={(e) => setFormData({ ...formData, expiryDays: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-[#F7FBF8] text-[#153C47] focus:outline-none focus:ring-2 focus:ring-[#00BFA6]"
                >
                  <option value="7">7 Days</option>
                  <option value="14">14 Days (Standard)</option>
                  <option value="30">30 Days</option>
                </select>
              </div>
            </div>

            {/* Clinical Instructions / Notes */}
            <div>
              <label className="block font-bold text-[#153C47] mb-1">
                Clinical Referral Notes
              </label>
              <textarea
                rows={2}
                placeholder="Specific instructions for patient or reason for evaluation..."
                value={formData.clinicalNotes}
                onChange={(e) => setFormData({ ...formData, clinicalNotes: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-[#F7FBF8] text-[#153C47] focus:outline-none focus:ring-2 focus:ring-[#00BFA6] resize-none"
              />
            </div>

            {/* Phase 3 Security Boundary Notice */}
            <div className="p-3.5 rounded-2xl bg-[#E5F8F4] border border-[#00BFA6]/30 text-[11px] text-[#153C47] space-y-1">
              <strong className="block text-[#008e7b]">Phase 3 UI Security Boundary:</strong>
              <p className="leading-relaxed">
                Single-use cryptographic access tokens and secure test launch URLs are generated exclusively by the Phase 4 backend assignment engine upon clinical authorization. No live test links or patient launch tokens are issued from this client interface.
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsNewModalOpen(false)}
                className="px-5 py-2.5 rounded-full text-xs font-bold text-[#52717A] hover:bg-slate-100 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full text-xs font-bold text-white bg-[#00BFA6] hover:bg-[#00a892] transition shadow-xs"
              >
                Assign Assessment
              </button>
            </div>
          </form>
        )}
      </AdminModal>

      {/* ===================================================================== */}
      {/* MODAL: Assignment Details View                                        */}
      {/* ===================================================================== */}
      <AdminModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        title="Assignment Details"
        subtitle={`Reference: ${selectedAssignment?.id}`}
      >
        {selectedAssignment && (
          <div className="space-y-5 text-xs">
            <div className="p-4 rounded-2xl bg-[#F7FBF8] border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#008e7b] block">Patient</span>
                <h4 className="text-sm font-extrabold text-[#153C47]">{selectedAssignment.patientName}</h4>
                <p className="text-[11px] text-[#52717A] font-mono">{selectedAssignment.patientId}</p>
              </div>
              <AdminStatusBadge status={selectedAssignment.status} />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] font-bold text-[#52717A] uppercase block">Prescribed Assessment</span>
                <span className="font-bold text-[#153C47] text-xs">{selectedAssignment.testName}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] font-bold text-[#52717A] uppercase block">Assigned By</span>
                <span className="font-bold text-[#153C47] text-xs">{selectedAssignment.assignedBy}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] font-bold text-[#52717A] uppercase block">Date Assigned</span>
                <span className="font-bold text-[#153C47] text-xs">{selectedAssignment.assignedDate}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] font-bold text-[#52717A] uppercase block">Expiry Date</span>
                <span className="font-bold text-[#153C47] text-xs">{selectedAssignment.expiryDate}</span>
              </div>
            </div>

            {/* Launch Token Security Boundary */}
            <div className="p-4 rounded-2xl bg-[#E5F8F4] border border-[#00BFA6]/30 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-[#008e7b]">
                <Key className="w-4 h-4" />
                <span>Single-Use Launch Token:</span>
              </div>
              <p className="font-mono text-xs font-bold text-[#153C47] pl-5">
                [DEFERRED TO PHASE 4 BACKEND INTEGRATION]
              </p>
              <p className="text-[11px] text-[#52717A] pl-5">
                Cryptographic single-use token will be issued dynamically upon authorized patient login in Phase 4. Assessment launch links cannot be accessed from this client interface.
              </p>
            </div>

            {/* Notes */}
            <div className="p-3 rounded-xl bg-[#F7FBF8] border border-slate-200">
              <span className="text-[10px] font-bold text-[#52717A] uppercase block mb-1">Clinical Referral Notes</span>
              <p className="text-[#153C47] text-xs leading-relaxed">
                {selectedAssignment.clinicalNotes || 'No specific clinical referral notes recorded.'}
              </p>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setIsDetailsModalOpen(false)}
                className="px-6 py-2 rounded-full text-xs font-bold text-white bg-[#153C47] hover:bg-[#0d2830] transition"
              >
                Close Details
              </button>
            </div>
          </div>
        )}
      </AdminModal>

    </div>
  );
};
