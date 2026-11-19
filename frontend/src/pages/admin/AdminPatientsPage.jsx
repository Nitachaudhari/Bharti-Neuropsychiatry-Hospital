import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  Plus,
  Eye,
  Edit2,
  Phone,
  Mail,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  X,
  FileText,
  UserCheck,
  Clock,
  Sparkles
} from 'lucide-react';
import { AdminModal } from '../../components/admin/AdminModal';
import { AdminEmptyState } from '../../components/admin/AdminEmptyState';
import { AdminStatusBadge } from '../../components/admin/AdminStatusBadge';

export const AdminPatientsPage = () => {
  // Empty initial registry - no unverified or fake patient records (Phase 3 Requirement 2)
  const [patients, setPatients] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  // Form State - Minimized Administrative Fields Only (Phase 3 Requirement 3)
  const [formData, setFormData] = useState({
    fullName: '',
    patientId: '',
    dob: '',
    gender: 'Male',
    phone: '',
    email: '',
    status: 'Active'
  });

  const [formErrors, setFormErrors] = useState({});
  const [validationSuccessMsg, setValidationSuccessMsg] = useState(null);

  // Filter patients
  const filteredPatients = patients.filter((pat) => {
    const matchesSearch =
      pat.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pat.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pat.phone.includes(searchTerm);

    const matchesStatus =
      statusFilter === 'All' || pat.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  // Open Add Patient Form
  const handleOpenAdd = () => {
    const nextNum = (patients.length + 1).toString().padStart(3, '0');
    setFormData({
      fullName: '',
      patientId: `BNH-PAT-2026-${nextNum}`,
      dob: '',
      gender: 'Male',
      phone: '',
      email: '',
      status: 'Active'
    });
    setFormErrors({});
    setValidationSuccessMsg(null);
    setIsAddModalOpen(true);
  };

  // Open Edit Patient Form
  const handleOpenEdit = (patient) => {
    setSelectedPatient(patient);
    setFormData({
      fullName: patient.fullName,
      patientId: patient.id,
      dob: patient.dob || '',
      gender: patient.gender || 'Male',
      phone: patient.phone || '',
      email: patient.email || '',
      status: patient.status || 'Active'
    });
    setFormErrors({});
    setValidationSuccessMsg(null);
    setIsEditModalOpen(true);
  };

  // Open Profile View
  const handleOpenProfile = (patient) => {
    setSelectedPatient(patient);
    setIsProfileModalOpen(true);
  };

  // Validate form fields (Strictly Minimal Administrative Data)
  const validateForm = () => {
    const errors = {};
    if (!formData.fullName.trim()) {
      errors.fullName = 'Full patient name is required';
    }
    if (!formData.patientId.trim()) {
      errors.patientId = 'Patient ID is required';
    }
    if (!formData.phone.trim()) {
      errors.phone = '10-digit mobile contact is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.trim())) {
      errors.phone = 'Please enter a valid 10-digit mobile number';
    }
    if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      errors.email = 'Please provide a valid email address or leave blank';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle Add Submit (Phase 3 UI Client Memory Only - No LocalStorage)
  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newPatient = {
      id: formData.patientId.trim(),
      fullName: formData.fullName.trim(),
      dob: formData.dob,
      gender: formData.gender,
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      status: formData.status,
      registeredDate: new Date().toISOString().split('T')[0],
      registeredBy: 'Hospital Reception (In-Person)'
    };

    setPatients([newPatient, ...patients]);
    setValidationSuccessMsg('Patient profile validated and created in client state (Phase 3 UI).');
    setTimeout(() => {
      setIsAddModalOpen(false);
      setValidationSuccessMsg(null);
    }, 1200);
  };

  // Handle Edit Submit
  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setPatients(
      patients.map((p) =>
        p.id === selectedPatient.id
          ? {
              ...p,
              fullName: formData.fullName.trim(),
              dob: formData.dob,
              gender: formData.gender,
              phone: formData.phone.trim(),
              email: formData.email.trim(),
              status: formData.status
            }
          : p
      )
    );
    setValidationSuccessMsg('Patient record updated in client state (Phase 3 UI).');
    setTimeout(() => {
      setIsEditModalOpen(false);
      setValidationSuccessMsg(null);
    }, 1200);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#153C47] tracking-tight">
            Patient Management
          </h2>
          <p className="text-xs text-[#52717A] mt-0.5">
            Staff-managed patient intake records, contact profiles, and test eligibility
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-[#00BFA6] hover:bg-[#00a892] transition shadow-xs hover:scale-105 transform active:scale-95 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Patient Intake</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-[#52717A] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by name, patient ID, phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#F7FBF8] border border-slate-200 text-xs text-[#153C47] focus:outline-none focus:ring-2 focus:ring-[#00BFA6]"
          />
        </div>

        {/* Status Filter Buttons */}
        <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <span className="text-xs font-bold text-[#52717A] mr-1 hidden sm:inline">Status:</span>
          {['All', 'Active', 'Pending Intake', 'Inactive'].map((status) => (
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

      {/* Patient List Table */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs overflow-hidden">
        {filteredPatients.length === 0 ? (
          <div className="p-8">
            <AdminEmptyState
              icon={Users}
              title={patients.length === 0 ? "No Patient Records Registered" : "No Patients Matching Filter"}
              description={
                patients.length === 0
                  ? "No in-person patient records have been added to the hospital registry yet. Click 'New Patient Intake' to register an intake profile, or records will sync automatically after Phase 4 backend integration."
                  : "No patient records match the current search or status filter. Try clearing the filters."
              }
              actionText="New Patient Intake"
              onAction={handleOpenAdd}
              secondaryText={patients.length > 0 && (searchTerm || statusFilter !== 'All') ? 'Clear Filters' : undefined}
              onSecondary={() => { setSearchTerm(''); setStatusFilter('All'); }}
            />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#F7FBF8] border-b border-slate-200 text-[#52717A] uppercase text-[10px] tracking-wider font-extrabold">
                  <th className="py-3.5 px-4 sm:px-6">Patient ID</th>
                  <th className="py-3.5 px-4">Patient Name</th>
                  <th className="py-3.5 px-4">Contact Info</th>
                  <th className="py-3.5 px-4">Gender & DOB</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Registered Date</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredPatients.map((patient) => (
                  <tr
                    key={patient.id}
                    className="hover:bg-[#E5F8F4]/30 transition group"
                  >
                    <td className="py-4 px-4 sm:px-6 font-mono font-bold text-[#008e7b]">
                      {patient.id}
                    </td>

                    <td className="py-4 px-4">
                      <div className="font-extrabold text-[#153C47]">
                        {patient.fullName}
                      </div>
                      <div className="text-[11px] text-[#52717A] truncate max-w-xs">
                        {patient.notes || 'In-person hospital intake'}
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1.5 text-[#153C47] font-medium">
                        <Phone className="w-3.5 h-3.5 text-[#00BFA6]" />
                        <span>{patient.phone}</span>
                      </div>
                      {patient.email ? (
                        <div className="flex items-center gap-1.5 text-[11px] text-[#52717A] mt-0.5">
                          <Mail className="w-3 h-3 text-[#42B9E8]" />
                          <span>{patient.email}</span>
                        </div>
                      ) : (
                        <span className="text-[10px] text-slate-400 italic">No email on file</span>
                      )}
                    </td>

                    <td className="py-4 px-4 text-[#52717A]">
                      <span className="font-semibold text-[#153C47]">{patient.gender}</span>
                      <span className="block text-[11px]">{patient.dob || '--'}</span>
                    </td>

                    <td className="py-4 px-4">
                      <AdminStatusBadge status={patient.status} />
                    </td>

                    <td className="py-4 px-4 text-[#52717A] text-[11px]">
                      {patient.registeredDate}
                    </td>

                    <td className="py-4 px-4 sm:px-6 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => handleOpenProfile(patient)}
                          className="p-1.5 text-[#52717A] hover:text-[#00BFA6] hover:bg-[#E5F8F4] rounded-lg transition"
                          title="View Profile"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenEdit(patient)}
                          className="p-1.5 text-[#52717A] hover:text-[#FF684A] hover:bg-[#fff1ee] rounded-lg transition"
                          title="Edit Patient"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Footer pagination/count note */}
        <div className="p-4 bg-[#F7FBF8] border-t border-slate-100 flex items-center justify-between text-xs text-[#52717A]">
          <span>Showing {filteredPatients.length} of {patients.length} patients</span>
          <span className="text-[11px] font-semibold text-[#008e7b]">
            Strict In-Person Clinical Intake Policy
          </span>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* MODAL A: Add Patient Form UI                                         */}
      {/* ===================================================================== */}
      <AdminModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Patient"
        subtitle="In-person intake registration form for hospital reception staff"
      >
        {validationSuccessMsg ? (
          <div className="p-6 rounded-2xl bg-[#f2faed] border border-[#75C94B] text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-[#66b43e] mx-auto" />
            <h4 className="font-extrabold text-[#153C47] text-sm">Patient Validated</h4>
            <p className="text-xs text-[#52717A]">{validationSuccessMsg}</p>
          </div>
        ) : (
          <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
            
            {/* Full Name & Patient ID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-[#153C47] mb-1">
                  Full Name <span className="text-[#FF684A]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ramesh S. Patil"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl border bg-[#F7FBF8] text-[#153C47] focus:outline-none focus:ring-2 focus:ring-[#00BFA6] ${
                    formErrors.fullName ? 'border-[#FF684A]' : 'border-slate-200'
                  }`}
                />
                {formErrors.fullName && (
                  <p className="text-[11px] text-[#FF684A] mt-1">{formErrors.fullName}</p>
                )}
              </div>

              <div>
                <label className="block font-bold text-[#153C47] mb-1">
                  Patient ID <span className="text-[#FF684A]">*</span>
                </label>
                <input
                  type="text"
                  value={formData.patientId}
                  onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl border bg-[#F7FBF8] text-[#153C47] font-mono font-bold focus:outline-none focus:ring-2 focus:ring-[#00BFA6] ${
                    formErrors.patientId ? 'border-[#FF684A]' : 'border-slate-200'
                  }`}
                />
                {formErrors.patientId && (
                  <p className="text-[11px] text-[#FF684A] mt-1">{formErrors.patientId}</p>
                )}
              </div>
            </div>

            {/* DOB & Gender */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-[#153C47] mb-1">
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={formData.dob}
                  onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-[#F7FBF8] text-[#153C47] focus:outline-none focus:ring-2 focus:ring-[#00BFA6]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#153C47] mb-1">
                  Gender
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-[#F7FBF8] text-[#153C47] focus:outline-none focus:ring-2 focus:ring-[#00BFA6]"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Phone & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-[#153C47] mb-1">
                  Contact Mobile <span className="text-[#FF684A]">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="10-digit number e.g. 9823012345"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl border bg-[#F7FBF8] text-[#153C47] focus:outline-none focus:ring-2 focus:ring-[#00BFA6] ${
                    formErrors.phone ? 'border-[#FF684A]' : 'border-slate-200'
                  }`}
                />
                {formErrors.phone && (
                  <p className="text-[11px] text-[#FF684A] mt-1">{formErrors.phone}</p>
                )}
              </div>

              <div>
                <label className="block font-bold text-[#153C47] mb-1">
                  Email Address <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="email"
                  placeholder="patient@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl border bg-[#F7FBF8] text-[#153C47] focus:outline-none focus:ring-2 focus:ring-[#00BFA6] ${
                    formErrors.email ? 'border-[#FF684A]' : 'border-slate-200'
                  }`}
                />
                {formErrors.email && (
                  <p className="text-[11px] text-[#FF684A] mt-1">{formErrors.email}</p>
                )}
              </div>
            </div>

            {/* Account Status */}
            <div>
              <label className="block font-bold text-[#153C47] mb-1">
                Account Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-[#F7FBF8] text-[#153C47] focus:outline-none focus:ring-2 focus:ring-[#00BFA6]"
              >
                <option value="Active">Active</option>
                <option value="Pending Intake">Pending Intake</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            {/* Notice regarding medical privacy & data minimization */}
            <div className="p-3 rounded-xl bg-[#E5F8F4] border border-[#00BFA6]/20 text-[11px] text-[#153C47]">
              <strong>Patient Privacy & Data Minimization:</strong> Only administrative identifiers (name, age/DOB, gender, contact number) are collected for scheduling administration. No sensitive clinical complaints or psychiatric medical history are recorded in this intake form. Zero patient data is cached in browser local storage.
            </div>

            {/* Modal Buttons */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="px-5 py-2.5 rounded-full text-xs font-bold text-[#52717A] hover:bg-slate-100 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full text-xs font-bold text-white bg-[#00BFA6] hover:bg-[#00a892] transition shadow-xs"
              >
                Save Patient Profile
              </button>
            </div>
          </form>
        )}
      </AdminModal>

      {/* ===================================================================== */}
      {/* MODAL B: Edit Patient Form UI                                        */}
      {/* ===================================================================== */}
      <AdminModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Patient Information"
        subtitle={`Updating profile for ${selectedPatient?.id || 'Patient'}`}
      >
        {validationSuccessMsg ? (
          <div className="p-6 rounded-2xl bg-[#f2faed] border border-[#75C94B] text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-[#66b43e] mx-auto" />
            <h4 className="font-extrabold text-[#153C47] text-sm">Update Saved</h4>
            <p className="text-xs text-[#52717A]">{validationSuccessMsg}</p>
          </div>
        ) : (
          <form onSubmit={handleEditSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-[#153C47] mb-1">Full Name</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-[#F7FBF8] text-[#153C47] focus:outline-none focus:ring-2 focus:ring-[#00BFA6]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#153C47] mb-1">Patient ID</label>
                <input
                  type="text"
                  disabled
                  value={formData.patientId}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-100 text-slate-500 font-mono font-bold cursor-not-allowed"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-[#153C47] mb-1">Contact Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-[#F7FBF8] text-[#153C47] focus:outline-none focus:ring-2 focus:ring-[#00BFA6]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#153C47] mb-1">Account Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-[#F7FBF8] text-[#153C47] focus:outline-none focus:ring-2 focus:ring-[#00BFA6]"
                >
                  <option value="Active">Active</option>
                  <option value="Pending Intake">Pending Intake</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#E5F8F4] border border-[#00BFA6]/20 text-[11px] text-[#153C47]">
              <strong>Data Minimization Notice:</strong> Only administrative fields are editable. Clinical records are managed separately.
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="px-5 py-2.5 rounded-full text-xs font-bold text-[#52717A] hover:bg-slate-100 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full text-xs font-bold text-white bg-[#00BFA6] hover:bg-[#00a892] transition shadow-xs"
              >
                Update Record
              </button>
            </div>
          </form>
        )}
      </AdminModal>

      {/* ===================================================================== */}
      {/* MODAL C: Patient Profile View UI                                     */}
      {/* ===================================================================== */}
      <AdminModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        title="Patient Profile Overview"
        subtitle={`Clinical record ID: ${selectedPatient?.id}`}
      >
        {selectedPatient && (
          <div className="space-y-5 text-xs">
            {/* Header pill */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-[#F7FBF8] border border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#00BFA6] text-white flex items-center justify-center font-extrabold text-lg shadow-xs">
                  {selectedPatient.fullName.charAt(0)}
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-[#153C47]">
                    {selectedPatient.fullName}
                  </h4>
                  <p className="text-[11px] text-[#52717A] font-mono">
                    MRN: {selectedPatient.id}
                  </p>
                </div>
              </div>
              <AdminStatusBadge status={selectedPatient.status} />
            </div>

            {/* Profile Fields Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] font-bold text-[#52717A] uppercase block">Contact Phone</span>
                <span className="font-bold text-[#153C47] text-xs">{selectedPatient.phone}</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] font-bold text-[#52717A] uppercase block">Email Address</span>
                <span className="font-bold text-[#153C47] text-xs">{selectedPatient.email || 'None on file'}</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] font-bold text-[#52717A] uppercase block">Gender & DOB</span>
                <span className="font-bold text-[#153C47] text-xs">
                  {selectedPatient.gender} &bull; {selectedPatient.dob || 'Not specified'}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] font-bold text-[#52717A] uppercase block">Registration Date</span>
                <span className="font-bold text-[#153C47] text-xs">{selectedPatient.registeredDate}</span>
              </div>
            </div>

            {/* Administrative Privacy Policy */}
            <div className="p-3.5 rounded-xl bg-[#F7FBF8] border border-slate-200">
              <span className="text-[10px] font-bold text-[#52717A] uppercase block mb-1">Privacy & Record Policy</span>
              <p className="text-xs text-[#52717A] leading-relaxed">
                Administrative intake record only. Detailed clinical consultations and psychiatric notes are maintained separately and confidentially by Dr. Parag Keshav Mahajan.
              </p>
            </div>

            {/* Test Assignment Status Preview */}
            <div className="p-3.5 rounded-xl bg-[#E5F8F4] border border-[#00BFA6]/30">
              <span className="text-[10px] font-bold text-[#008e7b] uppercase block mb-1">
                Assigned Tests Eligibility
              </span>
              <p className="text-[11px] text-[#52717A] leading-relaxed">
                This patient can access only tests explicitly prescribed to them. When Dr. Parag Mahajan prescribes an assessment, single-use launch credentials are provided for portal sign-in.
              </p>
            </div>

            <div className="pt-2 flex items-center justify-end">
              <button
                onClick={() => setIsProfileModalOpen(false)}
                className="px-6 py-2 rounded-full text-xs font-bold text-white bg-[#153C47] hover:bg-[#0d2830] transition"
              >
                Close Profile
              </button>
            </div>
          </div>
        )}
      </AdminModal>

    </div>
  );
};
