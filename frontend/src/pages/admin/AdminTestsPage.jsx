import React, { useState, useEffect } from 'react';
import {
  Brain,
  Plus,
  Search,
  ExternalLink,
  Eye,
  Edit2,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  Link as LinkIcon,
  ShieldCheck,
  Info
} from 'lucide-react';
import { AdminModal } from '../../components/admin/AdminModal';
import { AdminEmptyState } from '../../components/admin/AdminEmptyState';
import { AdminStatusBadge } from '../../components/admin/AdminStatusBadge';
import { api } from '../../services/api';

export const AdminTestsPage = () => {
  // Empty initial registry - no unverified fake test URLs (Phase 3 Requirement 2)
  const [tests, setTests] = useState([]);

  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Cognitive Profiling',
    deployedUrl: '',
    status: 'Active',
    estimatedDuration: '25-30 mins'
  });

  const [formErrors, setFormErrors] = useState({});
  const [validationSuccessMsg, setValidationSuccessMsg] = useState(null);

  // Check if live tests API exists
  useEffect(() => {
    let isMounted = true;
    const fetchApiTests = async () => {
      try {
        setLoading(true);
        const res = await api.get('/tests');
        if (isMounted && res?.data && Array.isArray(res.data) && res.data.length > 0) {
          // Merge API data with deployed URL metadata
          setTests(res.data);
        }
      } catch (err) {
        // Fallback cleanly to verified standardized battery UI
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchApiTests();
    return () => { isMounted = false; };
  }, []);

  // Filter
  const filteredTests = tests.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (t.deployedUrl && t.deployedUrl.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory =
      categoryFilter === 'All' || t.category.toLowerCase() === categoryFilter.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  const categories = ['All', 'Cognitive Profiling', 'Affective Health', 'Executive Function', 'Personality Psychometry'];

  // Open Add Test Form
  const handleOpenAdd = () => {
    setFormData({
      name: '',
      description: '',
      category: 'Cognitive Profiling',
      deployedUrl: '',
      status: 'Active',
      estimatedDuration: '25-30 mins'
    });
    setFormErrors({});
    setValidationSuccessMsg(null);
    setIsAddModalOpen(true);
  };

  // Open Edit Form
  const handleOpenEdit = (test) => {
    setSelectedTest(test);
    setFormData({
      name: test.name,
      description: test.description,
      category: test.category || 'Cognitive Profiling',
      deployedUrl: test.deployedUrl || '',
      status: test.status || 'Active',
      estimatedDuration: test.estimatedDuration || '25-30 mins'
    });
    setFormErrors({});
    setValidationSuccessMsg(null);
    setIsEditModalOpen(true);
  };

  // Open Details Modal
  const handleOpenDetails = (test) => {
    setSelectedTest(test);
    setIsDetailsModalOpen(true);
  };

  // Validation
  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Test name is required';
    if (!formData.description.trim()) errors.description = 'Short description is required';
    if (!formData.deployedUrl.trim()) {
      errors.deployedUrl = 'Deployed application URL is required';
    } else if (!/^https?:\/\/.+/.test(formData.deployedUrl.trim())) {
      errors.deployedUrl = 'Must be a valid URL starting with http:// or https://';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle Add Submit (Phase 3 UI Client Simulation)
  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newTest = {
      id: `CAT-EXT-${(tests.length + 1).toString().padStart(2, '0')}`,
      name: formData.name.trim(),
      description: formData.description.trim(),
      category: formData.category,
      deployedUrl: formData.deployedUrl.trim(),
      status: formData.status,
      estimatedDuration: formData.estimatedDuration.trim() || '25-30 mins',
      createdDate: new Date().toISOString().split('T')[0],
      assignedCount: '--'
    };

    setTests([newTest, ...tests]);
    setValidationSuccessMsg('Test registered in client state (Phase 3 UI). Ready for backend linkage in later phases.');
    setTimeout(() => {
      setIsAddModalOpen(false);
      setValidationSuccessMsg(null);
    }, 1200);
  };

  // Handle Edit Submit
  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setTests(
      tests.map((t) =>
        t.id === selectedTest.id
          ? {
              ...t,
              name: formData.name.trim(),
              description: formData.description.trim(),
              category: formData.category,
              deployedUrl: formData.deployedUrl.trim(),
              status: formData.status,
              estimatedDuration: formData.estimatedDuration.trim()
            }
          : t
      )
    );

    setValidationSuccessMsg('Test configuration updated in client state (Phase 3 UI).');
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
            Test Management
          </h2>
          <p className="text-xs text-[#52717A] mt-0.5">
            Register independently deployed psychological test applications and manage clinical catalog access
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-[#00BFA6] hover:bg-[#00a892] transition shadow-xs hover:scale-105 transform active:scale-95 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Register Deployed Test</span>
        </button>
      </div>

      {/* Integration Notice Bar */}
      <div className="p-4 rounded-3xl bg-[#E5F8F4] border border-[#00BFA6]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#153C47]">
        <div className="flex items-center gap-2.5">
          <Brain className="w-5 h-5 text-[#00BFA6] shrink-0" />
          <p className="leading-relaxed">
            <strong>Architecture Notice:</strong> Assessment applications remain separate independent projects. Administrators register their deployed URLs here for controlled patient assignment.
          </p>
        </div>
        <span className="text-[10px] font-bold text-[#008e7b] bg-white px-3 py-1 rounded-full border border-[#00BFA6]/30 shrink-0 self-start sm:self-auto">
          Isolated Sandboxes
        </span>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-[#52717A] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search test name, category, or URL..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#F7FBF8] border border-slate-200 text-xs text-[#153C47] focus:outline-none focus:ring-2 focus:ring-[#00BFA6]"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition shrink-0 ${
                categoryFilter === cat
                  ? 'bg-[#153C47] text-white shadow-xs'
                  : 'bg-[#F7FBF8] text-[#52717A] hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Tests Table */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs overflow-hidden">
        {filteredTests.length === 0 ? (
          <div className="p-8">
            <AdminEmptyState
              icon={Brain}
              title={tests.length === 0 ? "No Assessment Batteries Registered" : "No Tests Matching Filter"}
              description={
                tests.length === 0
                  ? "No independently deployed assessment applications are currently registered in the database. Click 'Register Deployed Test' to configure a verified assessment URL, or test records will load automatically after Phase 4 backend integration."
                  : "No registered tests match your current search or category filter. Try clearing the filter."
              }
              actionText="Register Deployed Test"
              onAction={handleOpenAdd}
              secondaryText={tests.length > 0 && (searchTerm || categoryFilter !== 'All') ? 'Clear Filters' : undefined}
              onSecondary={() => { setSearchTerm(''); setCategoryFilter('All'); }}
            />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#F7FBF8] border-b border-slate-200 text-[#52717A] uppercase text-[10px] tracking-wider font-extrabold">
                  <th className="py-3.5 px-4 sm:px-6">Test Name & Category</th>
                  <th className="py-3.5 px-4">Description</th>
                  <th className="py-3.5 px-4">Deployed App URL</th>
                  <th className="py-3.5 px-4">Duration</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredTests.map((test) => (
                  <tr
                    key={test.id}
                    className="hover:bg-[#E5F8F4]/30 transition group"
                  >
                    <td className="py-4 px-4 sm:px-6">
                      <div className="font-extrabold text-[#153C47]">
                        {test.name}
                      </div>
                      <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#edf7fc] text-[#31a6d4] border border-[#42B9E8]/30">
                        {test.category}
                      </span>
                    </td>

                    <td className="py-4 px-4 text-[#52717A] max-w-xs leading-relaxed text-[11px]">
                      {test.description}
                    </td>

                    <td className="py-4 px-4 font-mono text-[11px]">
                      {test.deployedUrl ? (
                        <a
                          href={test.deployedUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#008e7b] hover:underline inline-flex items-center gap-1 font-semibold"
                        >
                          <span className="truncate max-w-[180px]">{test.deployedUrl}</span>
                          <ExternalLink className="w-3 h-3 shrink-0" />
                        </a>
                      ) : (
                        <span className="text-slate-400 italic">No URL registered</span>
                      )}
                    </td>

                    <td className="py-4 px-4 text-[#52717A]">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#00BFA6]" />
                        <span>{test.estimatedDuration || '20-30 mins'}</span>
                      </span>
                    </td>

                    <td className="py-4 px-4">
                      <AdminStatusBadge status={test.status} />
                    </td>

                    <td className="py-4 px-4 sm:px-6 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => handleOpenDetails(test)}
                          className="p-1.5 text-[#52717A] hover:text-[#00BFA6] hover:bg-[#E5F8F4] rounded-lg transition"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenEdit(test)}
                          className="p-1.5 text-[#52717A] hover:text-[#FF684A] hover:bg-[#fff1ee] rounded-lg transition"
                          title="Edit Configuration"
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

        <div className="p-4 bg-[#F7FBF8] border-t border-slate-100 flex items-center justify-between text-xs text-[#52717A]">
          <span>Showing {filteredTests.length} of {tests.length} registered tests</span>
          <span className="text-[11px] font-semibold text-[#008e7b]">
            Prescription Required for Patient Access
          </span>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* MODAL: Register New Test Form                                         */}
      {/* ===================================================================== */}
      <AdminModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Register Deployed Test Application"
        subtitle="Connect an independently hosted assessment battery to the hospital portal"
      >
        {validationSuccessMsg ? (
          <div className="p-6 rounded-2xl bg-[#f2faed] border border-[#75C94B] text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-[#66b43e] mx-auto" />
            <h4 className="font-extrabold text-[#153C47] text-sm">Test Registered</h4>
            <p className="text-xs text-[#52717A]">{validationSuccessMsg}</p>
          </div>
        ) : (
          <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-[#153C47] mb-1">
                Test Name <span className="text-[#FF684A]">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Cognitive Flexibility Battery"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full px-3.5 py-2.5 rounded-xl border bg-[#F7FBF8] text-[#153C47] focus:outline-none focus:ring-2 focus:ring-[#00BFA6] ${
                  formErrors.name ? 'border-[#FF684A]' : 'border-slate-200'
                }`}
              />
              {formErrors.name && (
                <p className="text-[11px] text-[#FF684A] mt-1">{formErrors.name}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-[#153C47] mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-[#F7FBF8] text-[#153C47] focus:outline-none focus:ring-2 focus:ring-[#00BFA6]"
                >
                  <option value="Cognitive Profiling">Cognitive Profiling</option>
                  <option value="Affective Health">Affective Health</option>
                  <option value="Executive Function">Executive Function</option>
                  <option value="Personality Psychometry">Personality Psychometry</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#153C47] mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-[#F7FBF8] text-[#153C47] focus:outline-none focus:ring-2 focus:ring-[#00BFA6]"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-[#153C47] mb-1">
                Deployed Application URL <span className="text-[#FF684A]">*</span>
              </label>
              <div className="relative">
                <LinkIcon className="w-4 h-4 text-[#52717A] absolute left-3.5 top-3 pointer-events-none" />
                <input
                  type="url"
                  placeholder="https://test-app.vercel.app"
                  value={formData.deployedUrl}
                  onChange={(e) => setFormData({ ...formData, deployedUrl: e.target.value })}
                  className={`w-full pl-9 pr-3.5 py-2.5 rounded-xl border bg-[#F7FBF8] font-mono text-xs text-[#153C47] focus:outline-none focus:ring-2 focus:ring-[#00BFA6] ${
                    formErrors.deployedUrl ? 'border-[#FF684A]' : 'border-slate-200'
                  }`}
                />
              </div>
              {formErrors.deployedUrl && (
                <p className="text-[11px] text-[#FF684A] mt-1">{formErrors.deployedUrl}</p>
              )}
            </div>

            <div>
              <label className="block font-bold text-[#153C47] mb-1">
                Short Clinical Description <span className="text-[#FF684A]">*</span>
              </label>
              <textarea
                rows={3}
                placeholder="Brief clinical purpose, target symptoms, and psychometric dimensions..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className={`w-full px-3.5 py-2.5 rounded-xl border bg-[#F7FBF8] text-[#153C47] focus:outline-none focus:ring-2 focus:ring-[#00BFA6] resize-none ${
                  formErrors.description ? 'border-[#FF684A]' : 'border-slate-200'
                }`}
              />
              {formErrors.description && (
                <p className="text-[11px] text-[#FF684A] mt-1">{formErrors.description}</p>
              )}
            </div>

            <div className="p-3.5 rounded-xl bg-[#E5F8F4] border border-[#00BFA6]/20 text-[11px] text-[#153C47]">
              <strong>Security Protocol:</strong> External tests will only launch with authenticated, time-limited launch tokens assigned by staff to specific registered patients.
            </div>

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
                Register Test
              </button>
            </div>
          </form>
        )}
      </AdminModal>

      {/* ===================================================================== */}
      {/* MODAL: Edit Test Form                                                 */}
      {/* ===================================================================== */}
      <AdminModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Test Configuration"
        subtitle={`Updating settings for ${selectedTest?.name}`}
      >
        {validationSuccessMsg ? (
          <div className="p-6 rounded-2xl bg-[#f2faed] border border-[#75C94B] text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-[#66b43e] mx-auto" />
            <h4 className="font-extrabold text-[#153C47] text-sm">Updated Successfully</h4>
            <p className="text-xs text-[#52717A]">{validationSuccessMsg}</p>
          </div>
        ) : (
          <form onSubmit={handleEditSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-[#153C47] mb-1">Test Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-[#F7FBF8] text-[#153C47] focus:outline-none focus:ring-2 focus:ring-[#00BFA6]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-[#153C47] mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-[#F7FBF8] text-[#153C47] focus:outline-none focus:ring-2 focus:ring-[#00BFA6]"
                >
                  <option value="Cognitive Profiling">Cognitive Profiling</option>
                  <option value="Affective Health">Affective Health</option>
                  <option value="Executive Function">Executive Function</option>
                  <option value="Personality Psychometry">Personality Psychometry</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#153C47] mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-[#F7FBF8] text-[#153C47] focus:outline-none focus:ring-2 focus:ring-[#00BFA6]"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-[#153C47] mb-1">Deployed URL</label>
              <input
                type="url"
                value={formData.deployedUrl}
                onChange={(e) => setFormData({ ...formData, deployedUrl: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-[#F7FBF8] font-mono text-xs text-[#153C47] focus:outline-none focus:ring-2 focus:ring-[#00BFA6]"
              />
            </div>

            <div>
              <label className="block font-bold text-[#153C47] mb-1">Description</label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-[#F7FBF8] text-[#153C47] focus:outline-none focus:ring-2 focus:ring-[#00BFA6] resize-none"
              />
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
                Save Changes
              </button>
            </div>
          </form>
        )}
      </AdminModal>

      {/* ===================================================================== */}
      {/* MODAL: Test Details View                                              */}
      {/* ===================================================================== */}
      <AdminModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        title="Test Details & Architecture"
        subtitle={`ID: ${selectedTest?.id}`}
      >
        {selectedTest && (
          <div className="space-y-5 text-xs">
            <div className="p-4 rounded-2xl bg-[#F7FBF8] border border-slate-200 flex items-center justify-between">
              <div className="space-y-1">
                <h4 className="text-base font-extrabold text-[#153C47]">{selectedTest.name}</h4>
                <span className="text-[11px] font-bold text-[#008e7b] bg-[#E5F8F4] px-2.5 py-0.5 rounded-full">
                  {selectedTest.category}
                </span>
              </div>
              <AdminStatusBadge status={selectedTest.status} />
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="font-bold text-[#153C47] block">Deployed Application URL</span>
              <a
                href={selectedTest.deployedUrl}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-xs text-[#008e7b] hover:underline flex items-center gap-1.5 break-all"
              >
                <span>{selectedTest.deployedUrl}</span>
                <ExternalLink className="w-3.5 h-3.5 shrink-0" />
              </a>
            </div>

            <div className="p-4 rounded-2xl bg-[#F7FBF8] border border-slate-200 space-y-1">
              <span className="font-bold text-[#153C47] block">Description & Psychometric Purpose</span>
              <p className="text-[#52717A] leading-relaxed text-xs">
                {selectedTest.description}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#E5F8F4] border border-[#00BFA6]/30 text-[#153C47] space-y-1">
              <strong className="block text-[#008e7b]">Independent Project Boundary:</strong>
              <p className="leading-relaxed text-[11px]">
                This test runs as a distinct decoupled application. In Phase 4, the Main Portal will generate launch tickets carrying encrypted patient session parameters and receive completion webhooks securely.
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
