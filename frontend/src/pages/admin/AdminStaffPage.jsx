import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  UserPlus,
  Shield,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Eye,
  Edit2,
  Lock,
  Mail,
  Phone,
  Briefcase,
  Building,
  Calendar,
  X,
  Sparkles,
  ToggleLeft,
  ToggleRight,
  Info
} from 'lucide-react';
import { AdminModal } from '../../components/admin/AdminModal';
import { AdminEmptyState } from '../../components/admin/AdminEmptyState';
import { AdminStatusBadge } from '../../components/admin/AdminStatusBadge';

export const AdminStaffPage = () => {
  // Verified hospital staff roster - Dr. Parag Keshav Mahajan is the sole verified entity (Phase 3 Requirement 2)
  const [staffList, setStaffList] = useState([
    {
      id: 'BNH-STF-001',
      fullName: 'Dr. Parag Keshav Mahajan',
      title: 'Medical Director & Chief Neuropsychiatrist',
      role: 'super_admin',
      roleLabel: 'Main Admin (Super Admin)',
      department: 'Clinical Leadership & Psychiatry',
      email: 'dr.parag@bhartineuro.com',
      phone: '9143430505',
      status: 'Active',
      createdAt: '2026-10-01',
      lastLogin: 'Active Console',
      isSystemOwner: true
    }
  ]);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPermissionsModalOpen, setIsPermissionsModalOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);

  // Form states
  const [newStaff, setNewStaff] = useState({
    fullName: '',
    title: '',
    role: 'psychologist',
    department: 'Psychological Assessment',
    email: '',
    phone: '',
    status: 'Active'
  });

  const [editFormData, setEditFormData] = useState({
    fullName: '',
    title: '',
    role: 'psychologist',
    department: '',
    email: '',
    phone: '',
    status: 'Active'
  });

  const [formErrors, setFormErrors] = useState({});
  const [feedbackToast, setFeedbackToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setFeedbackToast({ message, type });
    setTimeout(() => setFeedbackToast(null), 4000);
  };

  // Filtered staff records
  const filteredStaff = staffList.filter((staff) => {
    const matchesSearch =
      staff.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.phone.includes(searchQuery);

    const matchesRole = roleFilter === 'ALL' || staff.role === roleFilter;
    const matchesStatus = statusFilter === 'ALL' || staff.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  // Role permissions definitions
  const rolePermissions = {
    super_admin: [
      { module: 'Staff Management', access: 'Full Control', desc: 'Can create, edit, and deactivate all staff accounts.' },
      { module: 'Patient Registration', access: 'Full Control', desc: 'Can register in-person patients and manage medical records.' },
      { module: 'Test Batteries & URLs', access: 'Full Control', desc: 'Can add, modify, or retire psychometric assessment URLs.' },
      { module: 'Prescriptions & Assignments', access: 'Full Control', desc: 'Can assign assessment tokens and configure retakes.' },
      { module: 'Clinical Reports & Reviews', access: 'Doctor Review Authority', desc: 'Can review, approve, and sign clinical test reports.' },
      { module: 'Audit Logs & Diagnostics', access: 'Full View & Export', desc: 'Unrestricted visibility of all system logs and activities.' },
      { module: 'Hospital Profile & Settings', access: 'Full Control', desc: 'Can configure clinic details, OPD timings, and preferences.' }
    ],
    psychologist: [
      { module: 'Staff Management', access: 'No Access', desc: 'Staff account management restricted to Super Admin.' },
      { module: 'Patient Registration', access: 'View & Edit Records', desc: 'Can view patient profiles and clinical case history.' },
      { module: 'Test Batteries & URLs', access: 'View Catalog', desc: 'Can view verified test specs and instructions.' },
      { module: 'Prescriptions & Assignments', access: 'Full Control', desc: 'Can assign psychometric tests to scheduled patients.' },
      { module: 'Clinical Reports & Reviews', access: 'Evaluate & Review', desc: 'Can view patient submissions and prepare clinical notes.' },
      { module: 'Audit Logs & Diagnostics', access: 'No Access', desc: 'Restricted for hospital security compliance.' },
      { module: 'Hospital Profile & Settings', access: 'Read Only', desc: 'Can review clinic info and guidelines.' }
    ],
    receptionist: [
      { module: 'Staff Management', access: 'No Access', desc: 'Staff account management restricted to Super Admin.' },
      { module: 'Patient Registration', access: 'Create & View', desc: 'Can intake new walk-in patients and issue hospital IDs.' },
      { module: 'Test Batteries & URLs', access: 'View Only', desc: 'Can see test names for scheduling guidance.' },
      { module: 'Prescriptions & Assignments', access: 'Issue by Prescription', desc: 'Can issue tokens prescribed by doctors.' },
      { module: 'Clinical Reports & Reviews', access: 'Status View Only', desc: 'Cannot read confidential clinical interpretations.' },
      { module: 'Audit Logs & Diagnostics', access: 'No Access', desc: 'Restricted for hospital security compliance.' },
      { module: 'Hospital Profile & Settings', access: 'Read Only', desc: 'Can check OPD hours and emergency phone.' }
    ]
  };

  // Validation
  const validateForm = (data) => {
    const errors = {};
    if (!data.fullName.trim()) errors.fullName = 'Staff member full name is required';
    if (!data.title.trim()) errors.title = 'Professional designation is required';
    if (!data.email.trim()) {
      errors.email = 'Staff email address is required';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = 'Valid hospital email format required';
    }
    if (!data.phone.trim()) {
      errors.phone = '10-digit phone number is required';
    } else if (!/^\d{10}$/.test(data.phone.replace(/\D/g, ''))) {
      errors.phone = 'Phone number must be exactly 10 digits';
    }
    return errors;
  };

  // Handle Add Staff
  const handleAddStaff = (e) => {
    e.preventDefault();
    const errors = validateForm(newStaff);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const nextIdNum = staffList.length + 1;
    const staffId = `BNH-STF-${String(nextIdNum).padStart(3, '0')}`;
    const roleLabels = {
      super_admin: 'Main Admin (Super Admin)',
      psychologist: 'Clinical Psychologist',
      receptionist: 'Receptionist / Front Desk'
    };

    const createdRecord = {
      id: staffId,
      fullName: newStaff.fullName.trim(),
      title: newStaff.title.trim(),
      role: newStaff.role,
      roleLabel: roleLabels[newStaff.role] || newStaff.role,
      department: newStaff.department.trim(),
      email: newStaff.email.trim(),
      phone: newStaff.phone.trim(),
      status: newStaff.status,
      createdAt: new Date().toISOString().split('T')[0],
      lastLogin: 'Never logged in',
      isSystemOwner: false
    };

    setStaffList([createdRecord, ...staffList]);
    setIsAddModalOpen(false);
    setNewStaff({
      fullName: '',
      title: '',
      role: 'psychologist',
      department: 'Psychological Assessment',
      email: '',
      phone: '',
      status: 'Active'
    });
    setFormErrors({});
    showToast(`Staff member "${createdRecord.fullName}" registered successfully with ID ${staffId}.`);
  };

  // Handle Open Edit
  const handleOpenEdit = (staff) => {
    setSelectedStaff(staff);
    setEditFormData({
      fullName: staff.fullName,
      title: staff.title,
      role: staff.role,
      department: staff.department,
      email: staff.email,
      phone: staff.phone,
      status: staff.status
    });
    setFormErrors({});
    setIsEditModalOpen(true);
  };

  // Handle Update Staff
  const handleUpdateStaff = (e) => {
    e.preventDefault();
    const errors = validateForm(editFormData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const roleLabels = {
      super_admin: 'Main Admin (Super Admin)',
      psychologist: 'Clinical Psychologist',
      receptionist: 'Receptionist / Front Desk'
    };

    setStaffList((prev) =>
      prev.map((item) =>
        item.id === selectedStaff.id
          ? {
              ...item,
              fullName: editFormData.fullName.trim(),
              title: editFormData.title.trim(),
              role: editFormData.role,
              roleLabel: roleLabels[editFormData.role] || editFormData.role,
              department: editFormData.department.trim(),
              email: editFormData.email.trim(),
              phone: editFormData.phone.trim(),
              status: editFormData.status
            }
          : item
      )
    );

    setIsEditModalOpen(false);
    showToast(`Staff details for "${editFormData.fullName}" updated successfully.`);
  };

  // Toggle Active/Suspended status
  const handleToggleStatus = (staff) => {
    if (staff.isSystemOwner) {
      alert('The Main Hospital Director account cannot be deactivated.');
      return;
    }

    const newStatus = staff.status === 'Active' ? 'Suspended' : 'Active';
    setStaffList((prev) =>
      prev.map((s) => (s.id === staff.id ? { ...s, status: newStatus } : s))
    );
    showToast(`Staff account ${staff.id} status changed to ${newStatus}.`, 'info');
  };

  // Counts
  const totalStaff = staffList.length;
  const adminCount = staffList.filter((s) => s.role === 'super_admin').length;
  const psychCount = staffList.filter((s) => s.role === 'psychologist').length;
  const receptionCount = staffList.filter((s) => s.role === 'receptionist').length;

  return (
    <div className="space-y-6">
      
      {/* Toast Notification */}
      {feedbackToast && (
        <div
          className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border text-sm font-medium transition-all animate-bounce ${
            feedbackToast.type === 'info'
              ? 'bg-[#E5F8F4] text-[#153C47] border-[#00BFA6]/40'
              : 'bg-[#F7FBF8] text-[#153C47] border-[#75C94B]/50'
          }`}
        >
          <CheckCircle2 className="w-5 h-5 text-[#00BFA6] shrink-0" />
          <span>{feedbackToast.message}</span>
        </div>
      )}

      {/* Header and Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#153C47] tracking-tight">
              Staff & Team Management
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#E5F8F4] text-[#00BFA6] border border-[#00BFA6]/30">
              Role-Based Access
            </span>
          </div>
          <p className="text-sm text-[#52717A] mt-1">
            Manage hospital administrators, clinical psychologists, and front desk receptionists with strict role separation.
          </p>
        </div>

        <button
          onClick={() => {
            setFormErrors({});
            setIsAddModalOpen(true);
          }}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-white bg-[#00BFA6] hover:bg-[#009b86] shadow-sm shadow-[#00BFA6]/30 transition-all hover:shadow-md cursor-pointer text-sm"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add Staff Member</span>
        </button>
      </div>

      {/* CRITICAL ROLE RESTRICTION NOTICE BANNER */}
      <div className="p-4 rounded-2xl bg-white border border-[#FF684A]/30 shadow-xs flex items-start gap-3.5">
        <div className="w-10 h-10 rounded-xl bg-[#FF684A]/10 text-[#FF684A] flex items-center justify-center shrink-0">
          <ShieldAlert className="w-5 h-5" />
        </div>
        <div className="flex-1 text-sm">
          <h2 className="font-bold text-[#153C47] flex items-center gap-2">
            <span>Hospital Security Governance Rule</span>
            <span className="text-xs px-2 py-0.5 rounded-md bg-[#FF684A]/10 text-[#FF684A] font-semibold">
              Strict Policy
            </span>
          </h2>
          <p className="text-[#52717A] text-xs sm:text-sm mt-0.5 leading-relaxed">
            Only the <strong>Main Admin (Dr. Parag Keshav Mahajan)</strong> can create staff accounts and assign administrative roles. Receptionists and clinical staff cannot self-escalate permissions or create additional Main Admin accounts.
          </p>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-100 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#52717A] uppercase tracking-wider">Total Staff</span>
            <div className="w-8 h-8 rounded-lg bg-[#E5F8F4] text-[#00BFA6] flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-[#153C47] mt-2">{totalStaff}</p>
          <p className="text-xs text-[#52717A] mt-1">Authorized personnel</p>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-100 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#52717A] uppercase tracking-wider">Main Admin</span>
            <div className="w-8 h-8 rounded-lg bg-[#FF684A]/10 text-[#FF684A] flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-[#153C47] mt-2">{adminCount}</p>
          <p className="text-xs text-[#52717A] mt-1">Medical Director</p>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-100 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#52717A] uppercase tracking-wider">Psychologists</span>
            <div className="w-8 h-8 rounded-lg bg-[#42B9E8]/10 text-[#42B9E8] flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-[#153C47] mt-2">{psychCount > 0 ? psychCount : '--'}</p>
          <p className="text-xs text-[#52717A] mt-1">{psychCount > 0 ? 'Assessment specialists' : 'Awaiting Phase 4 onboarding'}</p>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-100 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#52717A] uppercase tracking-wider">Reception Desk</span>
            <div className="w-8 h-8 rounded-lg bg-[#75C94B]/10 text-[#75C94B] flex items-center justify-center">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-[#153C47] mt-2">{receptionCount > 0 ? receptionCount : '--'}</p>
          <p className="text-xs text-[#52717A] mt-1">{receptionCount > 0 ? 'Intake coordinators' : 'Awaiting Phase 4 onboarding'}</p>
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
            placeholder="Search by staff name, ID, email, or phone..."
            className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-gray-200 bg-[#F7FBF8] text-[#153C47] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00BFA6]/30 focus:border-[#00BFA6] transition"
          />
        </div>

        <div className="flex items-center gap-2.5 overflow-x-auto pb-1 md:pb-0">
          <div className="flex items-center gap-1.5 shrink-0">
            <Filter className="w-3.5 h-3.5 text-[#52717A]" />
            <span className="text-xs font-medium text-[#52717A]">Role:</span>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="text-xs py-1.5 px-2.5 rounded-lg border border-gray-200 bg-[#F7FBF8] text-[#153C47] font-medium focus:outline-none focus:border-[#00BFA6]"
            >
              <option value="ALL">All Roles</option>
              <option value="super_admin">Main Admin (Super Admin)</option>
              <option value="psychologist">Clinical Psychologist</option>
              <option value="receptionist">Receptionist</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-xs font-medium text-[#52717A]">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs py-1.5 px-2.5 rounded-lg border border-gray-200 bg-[#F7FBF8] text-[#153C47] font-medium focus:outline-none focus:border-[#00BFA6]"
            >
              <option value="ALL">All Status</option>
              <option value="Active">Active</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>

          {(searchQuery || roleFilter !== 'ALL' || statusFilter !== 'ALL') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setRoleFilter('ALL');
                setStatusFilter('ALL');
              }}
              className="text-xs text-[#FF684A] hover:underline font-semibold px-2 py-1"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Staff Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
        {filteredStaff.length === 0 ? (
          <AdminEmptyState
            title="No Staff Members Found"
            description="No staff members matched your search or role filters. Clear filters or add a new team member."
            actionText="Clear Filters"
            onAction={() => {
              setSearchQuery('');
              setRoleFilter('ALL');
              setStatusFilter('ALL');
            }}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-[#153C47]">
              <thead className="bg-[#F7FBF8] border-b border-gray-100 text-xs font-bold text-[#52717A] uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Staff Member</th>
                  <th className="py-3.5 px-4">Staff ID</th>
                  <th className="py-3.5 px-4">System Role</th>
                  <th className="py-3.5 px-4">Contact Info</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Joined Date</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredStaff.map((staff) => {
                  const initials = staff.fullName
                    .replace(/^(Dr\.|Mr\.|Mrs\.|Ms\.)\s*/i, '')
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .slice(0, 2)
                    .toUpperCase();

                  const roleBadgeColor =
                    staff.role === 'super_admin'
                      ? 'bg-[#FF684A]/10 text-[#FF684A] border-[#FF684A]/30'
                      : staff.role === 'psychologist'
                      ? 'bg-[#42B9E8]/10 text-[#0284c7] border-[#42B9E8]/30'
                      : 'bg-[#75C94B]/10 text-[#4d8b2d] border-[#75C94B]/30';

                  return (
                    <tr key={staff.id} className="hover:bg-[#F7FBF8]/60 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00BFA6] to-[#42B9E8] text-white font-bold flex items-center justify-center text-xs shrink-0 shadow-xs">
                            {initials}
                          </div>
                          <div>
                            <div className="font-bold text-[#153C47] flex items-center gap-1.5">
                              <span>{staff.fullName}</span>
                              {staff.isSystemOwner && (
                                <span className="inline-flex items-center px-1.5 py-0.2 rounded text-[10px] font-bold bg-[#FFD43B]/20 text-[#996500] border border-[#FFD43B]/40" title="Hospital Owner">
                                  Director
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-[#52717A] flex items-center gap-1 mt-0.5">
                              <Briefcase className="w-3 h-3 text-[#52717A]" />
                              <span>{staff.title}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 font-mono text-xs font-semibold text-[#153C47]">
                        {staff.id}
                      </td>

                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${roleBadgeColor}`}>
                          <Shield className="w-3 h-3" />
                          <span>{staff.roleLabel}</span>
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-xs">
                        <div className="flex flex-col gap-0.5">
                          <span className="flex items-center gap-1 text-[#153C47] font-medium">
                            <Mail className="w-3 h-3 text-[#00BFA6]" />
                            {staff.email}
                          </span>
                          <span className="flex items-center gap-1 text-[#52717A]">
                            <Phone className="w-3 h-3 text-[#52717A]" />
                            +91 {staff.phone}
                          </span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <AdminStatusBadge status={staff.status} />
                      </td>

                      <td className="py-3.5 px-4 text-xs text-[#52717A]">
                        {staff.createdAt}
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Permissions matrix view */}
                          <button
                            onClick={() => {
                              setSelectedStaff(staff);
                              setIsPermissionsModalOpen(true);
                            }}
                            className="p-1.5 rounded-lg text-[#00BFA6] hover:bg-[#E5F8F4] transition"
                            title="View Permissions Matrix"
                            aria-label="View Permissions Matrix"
                          >
                            <ShieldCheck className="w-4 h-4" />
                          </button>

                          {/* Edit Details */}
                          <button
                            onClick={() => handleOpenEdit(staff)}
                            className="p-1.5 rounded-lg text-[#52717A] hover:text-[#153C47] hover:bg-gray-100 transition"
                            title="Edit Staff Information"
                            aria-label="Edit Staff Information"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>

                          {/* Toggle Active/Suspended */}
                          {!staff.isSystemOwner && (
                            <button
                              onClick={() => handleToggleStatus(staff)}
                              className={`p-1.5 rounded-lg transition ${
                                staff.status === 'Active'
                                  ? 'text-[#52717A] hover:text-[#FF684A] hover:bg-[#FF684A]/10'
                                  : 'text-[#75C94B] hover:bg-[#75C94B]/10'
                              }`}
                              title={staff.status === 'Active' ? 'Suspend Access' : 'Activate Access'}
                              aria-label={staff.status === 'Active' ? 'Suspend Access' : 'Activate Access'}
                            >
                              {staff.status === 'Active' ? (
                                <ToggleRight className="w-4 h-4 text-[#00BFA6]" />
                              ) : (
                                <ToggleLeft className="w-4 h-4 text-gray-400" />
                              )}
                            </button>
                          )}
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
      {/* MODAL 1: ADD STAFF MEMBER */}
      {/* ================================================================= */}
      <AdminModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Register New Staff Member"
      >
        <form onSubmit={handleAddStaff} className="space-y-4">
          <div className="p-3 bg-[#E5F8F4] rounded-xl border border-[#00BFA6]/20 text-xs text-[#153C47] flex items-center gap-2">
            <Info className="w-4 h-4 text-[#00BFA6] shrink-0" />
            <span>Hospital policy requires verification of medical registration before authorizing clinical roles.</span>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#153C47] mb-1">
              Full Name <span className="text-[#FF684A]">*</span>
            </label>
            <input
              type="text"
              value={newStaff.fullName}
              onChange={(e) => setNewStaff({ ...newStaff, fullName: e.target.value })}
              placeholder="e.g., Dr. Rajesh V. Patil"
              className={`w-full px-3.5 py-2 text-sm rounded-xl border ${
                formErrors.fullName ? 'border-[#FF684A] bg-[#FF684A]/5' : 'border-gray-200 bg-[#F7FBF8]'
              } focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00BFA6]/30 focus:border-[#00BFA6]`}
            />
            {formErrors.fullName && <p className="text-[11px] text-[#FF684A] mt-1">{formErrors.fullName}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#153C47] mb-1">
                Designation / Title <span className="text-[#FF684A]">*</span>
              </label>
              <input
                type="text"
                value={newStaff.title}
                onChange={(e) => setNewStaff({ ...newStaff, title: e.target.value })}
                placeholder="e.g. Clinical Psychologist"
                className={`w-full px-3.5 py-2 text-sm rounded-xl border ${
                  formErrors.title ? 'border-[#FF684A] bg-[#FF684A]/5' : 'border-gray-200 bg-[#F7FBF8]'
                } focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00BFA6]/30 focus:border-[#00BFA6]`}
              />
              {formErrors.title && <p className="text-[11px] text-[#FF684A] mt-1">{formErrors.title}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-[#153C47] mb-1">
                Department
              </label>
              <input
                type="text"
                value={newStaff.department}
                onChange={(e) => setNewStaff({ ...newStaff, department: e.target.value })}
                placeholder="e.g. Psychological Assessment"
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 bg-[#F7FBF8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00BFA6]/30 focus:border-[#00BFA6]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#153C47] mb-1">
                Official Email <span className="text-[#FF684A]">*</span>
              </label>
              <input
                type="email"
                value={newStaff.email}
                onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
                placeholder="name@bhartineuro.com"
                className={`w-full px-3.5 py-2 text-sm rounded-xl border ${
                  formErrors.email ? 'border-[#FF684A] bg-[#FF684A]/5' : 'border-gray-200 bg-[#F7FBF8]'
                } focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00BFA6]/30 focus:border-[#00BFA6]`}
              />
              {formErrors.email && <p className="text-[11px] text-[#FF684A] mt-1">{formErrors.email}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-[#153C47] mb-1">
                Phone Number (10 digits) <span className="text-[#FF684A]">*</span>
              </label>
              <input
                type="tel"
                value={newStaff.phone}
                onChange={(e) => setNewStaff({ ...newStaff, phone: e.target.value })}
                placeholder="9823012345"
                maxLength={10}
                className={`w-full px-3.5 py-2 text-sm rounded-xl border ${
                  formErrors.phone ? 'border-[#FF684A] bg-[#FF684A]/5' : 'border-gray-200 bg-[#F7FBF8]'
                } focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00BFA6]/30 focus:border-[#00BFA6]`}
              />
              {formErrors.phone && <p className="text-[11px] text-[#FF684A] mt-1">{formErrors.phone}</p>}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#153C47] mb-1">
              Select Role & Access Level <span className="text-[#FF684A]">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <label
                className={`flex flex-col p-3 rounded-xl border text-xs cursor-pointer transition ${
                  newStaff.role === 'psychologist'
                    ? 'border-[#00BFA6] bg-[#E5F8F4] font-bold text-[#153C47]'
                    : 'border-gray-200 bg-[#F7FBF8] text-[#52717A]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-[#153C47]">Psychologist</span>
                  <input
                    type="radio"
                    name="role"
                    value="psychologist"
                    checked={newStaff.role === 'psychologist'}
                    onChange={() => setNewStaff({ ...newStaff, role: 'psychologist' })}
                    className="accent-[#00BFA6]"
                  />
                </div>
                <span className="text-[11px] leading-tight text-[#52717A]">
                  Can assign tests, conduct screenings, and view reports.
                </span>
              </label>

              <label
                className={`flex flex-col p-3 rounded-xl border text-xs cursor-pointer transition ${
                  newStaff.role === 'receptionist'
                    ? 'border-[#00BFA6] bg-[#E5F8F4] font-bold text-[#153C47]'
                    : 'border-gray-200 bg-[#F7FBF8] text-[#52717A]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-[#153C47]">Receptionist</span>
                  <input
                    type="radio"
                    name="role"
                    value="receptionist"
                    checked={newStaff.role === 'receptionist'}
                    onChange={() => setNewStaff({ ...newStaff, role: 'receptionist' })}
                    className="accent-[#00BFA6]"
                  />
                </div>
                <span className="text-[11px] leading-tight text-[#52717A]">
                  Can register walk-in patients and issue prescheduled tokens.
                </span>
              </label>

              <label
                className={`flex flex-col p-3 rounded-xl border text-xs cursor-pointer transition ${
                  newStaff.role === 'super_admin'
                    ? 'border-[#FF684A] bg-[#FF684A]/10 font-bold text-[#153C47]'
                    : 'border-gray-200 bg-[#F7FBF8] text-[#52717A]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-[#FF684A]">Main Admin</span>
                  <input
                    type="radio"
                    name="role"
                    value="super_admin"
                    checked={newStaff.role === 'super_admin'}
                    onChange={() => setNewStaff({ ...newStaff, role: 'super_admin' })}
                    className="accent-[#FF684A]"
                  />
                </div>
                <span className="text-[11px] leading-tight text-[#52717A]">
                  Full clinical and system authority. Restricted level.
                </span>
              </label>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 rounded-xl text-sm font-semibold text-[#52717A] hover:bg-gray-100 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-sm font-bold text-white bg-[#00BFA6] hover:bg-[#009b86] shadow-sm transition cursor-pointer"
            >
              Register Staff Member
            </button>
          </div>
        </form>
      </AdminModal>

      {/* ================================================================= */}
      {/* MODAL 2: STAFF PROFILE & PERMISSIONS MATRIX */}
      {/* ================================================================= */}
      <AdminModal
        isOpen={isPermissionsModalOpen}
        onClose={() => setIsPermissionsModalOpen(false)}
        title="Staff Role & Permissions Matrix"
      >
        {selectedStaff && (
          <div className="space-y-4">
            <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-[#F7FBF8] border border-gray-100">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00BFA6] to-[#42B9E8] text-white font-bold flex items-center justify-center text-sm shrink-0">
                {selectedStaff.fullName
                  .replace(/^(Dr\.|Mr\.|Mrs\.|Ms\.)\s*/i, '')
                  .slice(0, 2)
                  .toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-[#153C47] text-base truncate">
                    {selectedStaff.fullName}
                  </h3>
                  <span className="text-xs font-mono font-bold text-[#00BFA6]">
                    {selectedStaff.id}
                  </span>
                </div>
                <p className="text-xs text-[#52717A] mt-0.5">{selectedStaff.title} • {selectedStaff.department}</p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-xs font-bold text-[#153C47]">Current Role:</span>
                  <span className="text-xs font-bold text-[#00BFA6] bg-[#E5F8F4] px-2 py-0.5 rounded-md">
                    {selectedStaff.roleLabel}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-[#153C47] uppercase tracking-wider mb-2">
                Granular Module Permissions ({selectedStaff.roleLabel})
              </h4>
              <div className="divide-y divide-gray-100 rounded-xl border border-gray-100 overflow-hidden text-xs">
                {(rolePermissions[selectedStaff.role] || rolePermissions.psychologist).map((perm, idx) => (
                  <div key={idx} className="p-3 flex items-center justify-between gap-3 bg-white">
                    <div>
                      <p className="font-bold text-[#153C47]">{perm.module}</p>
                      <p className="text-[#52717A] text-[11px] mt-0.5">{perm.desc}</p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-md text-[11px] font-bold shrink-0 ${
                        perm.access.includes('Full') || perm.access.includes('Doctor')
                          ? 'bg-[#E5F8F4] text-[#00BFA6]'
                          : perm.access.includes('No Access')
                          ? 'bg-red-50 text-red-500'
                          : 'bg-[#FFD43B]/20 text-[#855900]'
                      }`}
                    >
                      {perm.access}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setIsPermissionsModalOpen(false)}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-white bg-[#153C47] hover:bg-[#0f2c34] transition"
              >
                Close View
              </button>
            </div>
          </div>
        )}
      </AdminModal>

      {/* ================================================================= */}
      {/* MODAL 3: EDIT STAFF MEMBER */}
      {/* ================================================================= */}
      <AdminModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Staff Member Information"
      >
        {selectedStaff && (
          <form onSubmit={handleUpdateStaff} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#153C47] mb-1">
                Full Name <span className="text-[#FF684A]">*</span>
              </label>
              <input
                type="text"
                value={editFormData.fullName}
                onChange={(e) => setEditFormData({ ...editFormData, fullName: e.target.value })}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 bg-[#F7FBF8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00BFA6]/30 focus:border-[#00BFA6]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#153C47] mb-1">
                  Designation / Title
                </label>
                <input
                  type="text"
                  value={editFormData.title}
                  onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 bg-[#F7FBF8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00BFA6]/30 focus:border-[#00BFA6]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#153C47] mb-1">
                  Department
                </label>
                <input
                  type="text"
                  value={editFormData.department}
                  onChange={(e) => setEditFormData({ ...editFormData, department: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 bg-[#F7FBF8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00BFA6]/30 focus:border-[#00BFA6]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#153C47] mb-1">
                  Official Email
                </label>
                <input
                  type="email"
                  value={editFormData.email}
                  onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 bg-[#F7FBF8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00BFA6]/30 focus:border-[#00BFA6]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#153C47] mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={editFormData.phone}
                  onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                  maxLength={10}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 bg-[#F7FBF8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00BFA6]/30 focus:border-[#00BFA6]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#153C47] mb-1">
                  System Role
                </label>
                <select
                  disabled={selectedStaff.isSystemOwner}
                  value={editFormData.role}
                  onChange={(e) => setEditFormData({ ...editFormData, role: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 bg-[#F7FBF8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00BFA6]/30 focus:border-[#00BFA6] disabled:opacity-60"
                >
                  <option value="psychologist">Clinical Psychologist</option>
                  <option value="receptionist">Receptionist</option>
                  <option value="super_admin">Main Admin (Super Admin)</option>
                </select>
                {selectedStaff.isSystemOwner && (
                  <p className="text-[10px] text-[#52717A] mt-1">Medical Director role cannot be changed.</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-[#153C47] mb-1">
                  Account Status
                </label>
                <select
                  disabled={selectedStaff.isSystemOwner}
                  value={editFormData.status}
                  onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 bg-[#F7FBF8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00BFA6]/30 focus:border-[#00BFA6] disabled:opacity-60"
                >
                  <option value="Active">Active</option>
                  <option value="Suspended">Suspended</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-[#52717A] hover:bg-gray-100 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl text-sm font-bold text-white bg-[#00BFA6] hover:bg-[#009b86] shadow-sm transition cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </form>
        )}
      </AdminModal>

    </div>
  );
};
