import React, { useState } from 'react';
import {
  FileText,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Eye,
  Calendar,
  User,
  ShieldCheck,
  AlertCircle,
  FileCheck,
  Printer,
  Download,
  Stethoscope,
  Sparkles,
  Info,
  Edit3
} from 'lucide-react';
import { AdminModal } from '../../components/admin/AdminModal';
import { AdminEmptyState } from '../../components/admin/AdminEmptyState';
import { AdminStatusBadge } from '../../components/admin/AdminStatusBadge';

export const AdminReportsPage = () => {
  // Empty initial reports list - no fabricated test scores or fake clinical approvals (Phase 3 Requirements 2 & 5)
  const [reports, setReports] = useState([]);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [reviewFilter, setReviewFilter] = useState('ALL');
  const [categoryFilter, setCategoryFilter] = useState('ALL');

  // Modals state
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  // Doctor review form
  const [doctorNotes, setDoctorNotes] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Filtered reports
  const filteredReports = reports.filter((rep) => {
    const matchesSearch =
      rep.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rep.patientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rep.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rep.testName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesReview = reviewFilter === 'ALL' || rep.reviewStatus === reviewFilter;
    const matchesCategory = categoryFilter === 'ALL' || rep.category === categoryFilter;

    return matchesSearch && matchesReview && matchesCategory;
  });

  // Handle Save Doctor Review
  const handleSaveReview = (e) => {
    e.preventDefault();
    if (!selectedReport) return;

    setReports((prev) =>
      prev.map((rep) =>
        rep.id === selectedReport.id
          ? {
              ...rep,
              reviewStatus: 'Reviewed & Approved',
              reviewedBy: 'Dr. Parag Keshav Mahajan',
              reviewedAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
              clinicalImpression: doctorNotes.trim() || 'Reviewed in clinical consultation.'
            }
          : rep
      )
    );

    setIsReviewModalOpen(false);
    showToast(`Report ${selectedReport.id} successfully reviewed and marked approved by Dr. Parag Mahajan.`);
  };

  // Counts
  const totalReports = reports.length;
  const pendingCount = reports.filter((r) => r.reviewStatus === 'Pending Review').length;
  const approvedCount = reports.filter((r) => r.reviewStatus === 'Reviewed & Approved').length;

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
              Results & Clinical Reports
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#E5F8F4] text-[#00BFA6] border border-[#00BFA6]/30">
              Doctor Review Desk
            </span>
          </div>
          <p className="text-sm text-[#52717A] mt-1">
            Access completed psychological assessments, verify patient responses, and record Dr. Parag Mahajan's clinical impressions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-[#153C47] bg-white border border-gray-200 hover:bg-[#F7FBF8] shadow-xs transition cursor-pointer"
          >
            <Printer className="w-4 h-4 text-[#52717A]" />
            <span>Print Report Roster</span>
          </button>
        </div>
      </div>

      {/* Clinical Integrity Notice */}
      <div className="p-4 rounded-2xl bg-white border border-[#42B9E8]/30 shadow-xs flex items-start gap-3.5">
        <div className="w-10 h-10 rounded-xl bg-[#42B9E8]/10 text-[#42B9E8] flex items-center justify-center shrink-0">
          <Stethoscope className="w-5 h-5" />
        </div>
        <div className="flex-1 text-sm">
          <h2 className="font-bold text-[#153C47] flex items-center gap-2">
            <span>Clinical Verification Standard</span>
            <span className="text-xs px-2 py-0.5 rounded-md bg-[#E5F8F4] text-[#00BFA6] font-semibold">
              Medical Governance
            </span>
          </h2>
          <p className="text-[#52717A] text-xs sm:text-sm mt-0.5 leading-relaxed">
            All psychometric scores are screening indicators and do not constitute a standalone medical diagnosis. Final diagnostic decisions and medical prescriptions must be corroborated in person by <strong>Dr. Parag Keshav Mahajan (मानसोपचार तज्ज्ञ)</strong>.
          </p>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-100 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#52717A] uppercase tracking-wider">Total Reports</span>
            <div className="w-8 h-8 rounded-lg bg-[#E5F8F4] text-[#00BFA6] flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-[#153C47] mt-2">{totalReports > 0 ? totalReports : '--'}</p>
          <p className="text-xs text-[#52717A] mt-1">{totalReports > 0 ? 'Submitted assessments' : 'Awaiting patient submissions'}</p>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-100 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#52717A] uppercase tracking-wider">Pending Doctor Review</span>
            <div className="w-8 h-8 rounded-lg bg-[#FFD43B]/20 text-[#a37200] flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-[#153C47] mt-2">{pendingCount > 0 ? pendingCount : '--'}</p>
          <p className="text-xs text-[#52717A] mt-1">{pendingCount > 0 ? 'Awaiting clinical review' : 'No pending reviews'}</p>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-100 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#52717A] uppercase tracking-wider">Reviewed & Approved</span>
            <div className="w-8 h-8 rounded-lg bg-[#75C94B]/10 text-[#75C94B] flex items-center justify-center">
              <FileCheck className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-[#153C47] mt-2">{approvedCount > 0 ? approvedCount : '--'}</p>
          <p className="text-xs text-[#52717A] mt-1">{approvedCount > 0 ? 'Signed off by psychiatrist' : 'No signed reports'}</p>
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
            placeholder="Search by patient name, ID, report ID, or test title..."
            className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-gray-200 bg-[#F7FBF8] text-[#153C47] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00BFA6]/30 focus:border-[#00BFA6] transition"
          />
        </div>

        <div className="flex items-center gap-2.5 overflow-x-auto pb-1 md:pb-0">
          <div className="flex items-center gap-1.5 shrink-0">
            <Filter className="w-3.5 h-3.5 text-[#52717A]" />
            <span className="text-xs font-medium text-[#52717A]">Review Status:</span>
            <select
              value={reviewFilter}
              onChange={(e) => setReviewFilter(e.target.value)}
              className="text-xs py-1.5 px-2.5 rounded-lg border border-gray-200 bg-[#F7FBF8] text-[#153C47] font-medium focus:outline-none focus:border-[#00BFA6]"
            >
              <option value="ALL">All Statuses</option>
              <option value="Pending Review">Pending Review</option>
              <option value="Reviewed & Approved">Reviewed & Approved</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-xs font-medium text-[#52717A]">Category:</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="text-xs py-1.5 px-2.5 rounded-lg border border-gray-200 bg-[#F7FBF8] text-[#153C47] font-medium focus:outline-none focus:border-[#00BFA6]"
            >
              <option value="ALL">All Categories</option>
              <option value="Depression & Mood">Depression & Mood</option>
              <option value="Anxiety Spectrum">Anxiety Spectrum</option>
              <option value="Sleep & Circadian Rhythm">Sleep & Circadian Rhythm</option>
            </select>
          </div>

          {(searchQuery || reviewFilter !== 'ALL' || categoryFilter !== 'ALL') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setReviewFilter('ALL');
                setCategoryFilter('ALL');
              }}
              className="text-xs text-[#FF684A] hover:underline font-semibold px-2 py-1"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
        {filteredReports.length === 0 ? (
          <AdminEmptyState
            title={reports.length === 0 ? "No Assessment Reports Available" : "No Reports Matching Filter"}
            description={
              reports.length === 0
                ? "To ensure absolute clinical safety and data integrity, no simulated or fabricated test scores are displayed. Reports and scoring breakdowns will appear here after patients complete actual assigned assessments via the Phase 4 backend."
                : "No assessment reports match your search query or filters. Clear filters to see complete roster."
            }
            actionText={reports.length > 0 ? "Clear Filters" : undefined}
            onAction={() => {
              setSearchQuery('');
              setReviewFilter('ALL');
              setCategoryFilter('ALL');
            }}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-[#153C47]">
              <thead className="bg-[#F7FBF8] border-b border-gray-100 text-xs font-bold text-[#52717A] uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Report Reference</th>
                  <th className="py-3.5 px-4">Patient Details</th>
                  <th className="py-3.5 px-4">Assessment Test</th>
                  <th className="py-3.5 px-4">Submitted Date</th>
                  <th className="py-3.5 px-4">Doctor Review Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredReports.map((rep) => {
                  const isApproved = rep.reviewStatus === 'Reviewed & Approved';

                  return (
                    <tr key={rep.id} className="hover:bg-[#F7FBF8]/60 transition-colors">
                      <td className="py-3.5 px-4 font-mono text-xs font-bold text-[#00BFA6]">
                        {rep.id}
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-bold text-[#153C47]">{rep.patientName}</div>
                        <div className="text-xs text-[#52717A] flex items-center gap-1.5 mt-0.5">
                          <span className="font-mono">{rep.patientId}</span>
                          <span>•</span>
                          <span>{rep.patientAge}y, {rep.patientGender}</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-[#153C47] text-xs sm:text-sm">{rep.testName}</div>
                        <span className="inline-block mt-0.5 px-2 py-0.5 rounded text-[11px] font-medium bg-[#E5F8F4] text-[#00BFA6]">
                          {rep.category}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-xs text-[#52717A]">
                        <div className="flex items-center gap-1 text-[#153C47] font-medium">
                          <Calendar className="w-3.5 h-3.5 text-[#00BFA6]" />
                          <span>{rep.submissionDate}</span>
                        </div>
                        <span className="text-[11px] text-[#52717A]">Completed in {rep.completionDuration}</span>
                      </td>

                      <td className="py-3.5 px-4">
                        {isApproved ? (
                          <div className="flex flex-col gap-0.5">
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#75C94B]/10 text-[#4d8b2d] border border-[#75C94B]/30 w-fit">
                              <CheckCircle2 className="w-3 h-3 text-[#75C94B]" />
                              <span>Approved</span>
                            </span>
                            <span className="text-[10px] text-[#52717A]">Dr. Parag Mahajan</span>
                          </div>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#FFD43B]/20 text-[#855900] border border-[#FFD43B]/30">
                            <Clock className="w-3 h-3 text-[#855900]" />
                            <span>Pending Review</span>
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* View Clinical Summary */}
                          <button
                            onClick={() => {
                              setSelectedReport(rep);
                              setIsViewModalOpen(true);
                            }}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold text-[#00BFA6] hover:bg-[#E5F8F4] transition cursor-pointer"
                            title="View Clinical Report"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Report</span>
                          </button>

                          {/* Add / Edit Review */}
                          <button
                            onClick={() => {
                              setSelectedReport(rep);
                              setDoctorNotes(rep.clinicalImpression || '');
                              setIsReviewModalOpen(true);
                            }}
                            className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                              isApproved
                                ? 'text-[#52717A] hover:bg-gray-100'
                                : 'text-white bg-[#00BFA6] hover:bg-[#009b86] shadow-xs'
                            }`}
                            title={isApproved ? 'Edit Clinical Impression' : 'Review & Sign Off'}
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>{isApproved ? 'Notes' : 'Review'}</span>
                          </button>
                        </div>
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
      {/* MODAL 1: CLINICAL REPORT PREVIEW */}
      {/* ================================================================= */}
      <AdminModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Psychometric Assessment Clinical Summary"
      >
        {selectedReport && (
          <div className="space-y-4">
            
            {/* Header info */}
            <div className="p-4 rounded-xl bg-[#F7FBF8] border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-mono font-bold text-[#00BFA6] uppercase tracking-wider">
                  Report ID: {selectedReport.id}
                </span>
                <h3 className="text-base font-bold text-[#153C47] mt-0.5">
                  {selectedReport.testName}
                </h3>
                <p className="text-xs text-[#52717A]">
                  Category: <span className="font-semibold text-[#153C47]">{selectedReport.category}</span>
                </p>
              </div>

              <div className="text-left sm:text-right shrink-0">
                <span className="text-xs text-[#52717A]">Submitted At:</span>
                <p className="text-xs font-bold text-[#153C47]">{selectedReport.submissionDate}</p>
                <p className="text-[11px] text-[#52717A]">Duration: {selectedReport.completionDuration}</p>
              </div>
            </div>

            {/* Patient details */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3.5 rounded-xl border border-gray-100 bg-white text-xs">
              <div>
                <span className="text-[#52717A] text-[11px]">Patient Name</span>
                <p className="font-bold text-[#153C47] mt-0.5">{selectedReport.patientName}</p>
              </div>
              <div>
                <span className="text-[#52717A] text-[11px]">Hospital ID</span>
                <p className="font-mono font-bold text-[#153C47] mt-0.5">{selectedReport.patientId}</p>
              </div>
              <div>
                <span className="text-[#52717A] text-[11px]">Age / Gender</span>
                <p className="font-bold text-[#153C47] mt-0.5">{selectedReport.patientAge} Years, {selectedReport.patientGender}</p>
              </div>
              <div>
                <span className="text-[#52717A] text-[11px]">Contact</span>
                <p className="font-bold text-[#153C47] mt-0.5">+91 {selectedReport.patientPhone}</p>
              </div>
            </div>

            {/* Assessment Response Overview */}
            <div className="p-4 rounded-xl border border-[#00BFA6]/20 bg-[#E5F8F4]/30">
              <h4 className="text-xs font-bold text-[#153C47] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#00BFA6]" />
                <span>Screening Response Summary</span>
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs mb-3">
                <div className="bg-white p-2.5 rounded-lg border border-gray-100">
                  <span className="text-[11px] text-[#52717A]">Questions Answered</span>
                  <p className="font-bold text-[#153C47] mt-0.5">{selectedReport.questionsAnswered} of {selectedReport.totalQuestions} (100%)</p>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-gray-100">
                  <span className="text-[11px] text-[#52717A]">Assessment Status</span>
                  <p className="font-bold text-[#75C94B] mt-0.5">Valid Submission</p>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-gray-100 col-span-2 sm:col-span-1">
                  <span className="text-[11px] text-[#52717A]">Review State</span>
                  <p className="font-bold text-[#00BFA6] mt-0.5">{selectedReport.reviewStatus}</p>
                </div>
              </div>
              <p className="text-xs text-[#153C47] font-medium leading-relaxed bg-white p-3 rounded-lg border border-gray-100">
                <strong className="text-[#008e7b]">Standard Psychometric Index:</strong> {selectedReport.severityBand}
              </p>
            </div>

            {/* Doctor's Review / Clinical Impression */}
            <div className="p-4 rounded-xl border border-gray-100 bg-[#F7FBF8]">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-bold text-[#153C47] uppercase tracking-wider flex items-center gap-1.5">
                  <Stethoscope className="w-3.5 h-3.5 text-[#00BFA6]" />
                  <span>Psychiatrist Review & Notes</span>
                </h4>
                {selectedReport.reviewedBy && (
                  <span className="text-[11px] font-bold text-[#75C94B] bg-[#75C94B]/10 px-2 py-0.5 rounded">
                    Verified
                  </span>
                )}
              </div>

              {selectedReport.clinicalImpression ? (
                <div className="space-y-2">
                  <p className="text-xs text-[#153C47] bg-white p-3 rounded-lg border border-gray-100 leading-relaxed italic">
                    "{selectedReport.clinicalImpression}"
                  </p>
                  <div className="text-[11px] text-[#52717A] flex items-center justify-between">
                    <span>Reviewed by: <strong>{selectedReport.reviewedBy}</strong></span>
                    <span>Reviewed date: {selectedReport.reviewedAt}</span>
                  </div>
                </div>
              ) : (
                <div className="text-xs text-[#52717A] bg-white p-3 rounded-lg border border-gray-100 flex items-center justify-between">
                  <span>No clinical impressions entered yet. Awaiting Dr. Parag Mahajan's review.</span>
                  <button
                    onClick={() => {
                      setIsViewModalOpen(false);
                      setDoctorNotes('');
                      setIsReviewModalOpen(true);
                    }}
                    className="text-xs font-bold text-[#00BFA6] hover:underline"
                  >
                    Add Review Now
                  </button>
                </div>
              )}
            </div>

            {/* Clinic Details Footer */}
            <div className="text-[11px] text-[#52717A] pt-2 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span>Bharti Neuropsychiatry Hospital • The Mind Solutions Center & Hospital, Bhusawal</span>
              <span>Reg. No. 2008/10/3670</span>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-[#153C47] bg-gray-100 hover:bg-gray-200 transition cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Report</span>
              </button>
              <button
                type="button"
                onClick={() => setIsViewModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#153C47] hover:bg-[#0f2c34] transition cursor-pointer"
              >
                Close View
              </button>
            </div>
          </div>
        )}
      </AdminModal>

      {/* ================================================================= */}
      {/* MODAL 2: ADD / EDIT DOCTOR REVIEW */}
      {/* ================================================================= */}
      <AdminModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        title="Doctor Clinical Review & Impression"
      >
        {selectedReport && (
          <form onSubmit={handleSaveReview} className="space-y-4">
            <div className="p-3 bg-[#E5F8F4] rounded-xl border border-[#00BFA6]/20 text-xs text-[#153C47]">
              <p className="font-bold">Reviewing Assessment: {selectedReport.testName}</p>
              <p className="text-[11px] text-[#52717A] mt-0.5">
                Patient: {selectedReport.patientName} ({selectedReport.patientId}) • Submitted: {selectedReport.submissionDate}
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#153C47] mb-1">
                Clinical Impression & Consultation Notes
              </label>
              <textarea
                rows={4}
                value={doctorNotes}
                onChange={(e) => setDoctorNotes(e.target.value)}
                placeholder="Enter clinical observations, diagnostic correlation with OPD interview, or counseling recommendations..."
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 bg-[#F7FBF8] text-[#153C47] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00BFA6]/30 focus:border-[#00BFA6]"
              />
              <p className="text-[11px] text-[#52717A] mt-1">
                Recorded under Dr. Parag Keshav Mahajan (MBBS, DNB, DPM, MA).
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setIsReviewModalOpen(false)}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-[#52717A] hover:bg-gray-100 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl text-sm font-bold text-white bg-[#00BFA6] hover:bg-[#009b86] shadow-sm transition cursor-pointer"
              >
                Sign Off & Approve Report
              </button>
            </div>
          </form>
        )}
      </AdminModal>

    </div>
  );
};
