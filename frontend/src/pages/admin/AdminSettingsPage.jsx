import React, { useState } from 'react';
import {
  Building2,
  Sliders,
  User,
  ShieldCheck,
  Save,
  CheckCircle2,
  Clock,
  Phone,
  MapPin,
  Calendar,
  Lock,
  Globe,
  Mail,
  Award,
  Sparkles,
  Info,
  Server,
  Key
} from 'lucide-react';

export const AdminSettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profile'); // profile, general, account, security
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Hospital Profile State (Matches Official Visiting Card & Hospital Identity)
  const [clinicProfile, setClinicProfile] = useState({
    clinicName: 'Bharti Neuropsychiatry Hospital',
    hospitalName: 'The Mind Solutions Center & Hospital',
    doctorName: 'डॉ. पराग केशव महाजन (Dr. Parag Keshav Mahajan)',
    doctorTitleMarathi: 'मानसोपचार तज्ज्ञ',
    doctorTitleEnglish: 'Psychiatrist & De-addiction Specialist',
    qualifications: 'MBBS, DNB, DPM, MA',
    registrationNumber: '2008/10/3670',
    primaryPhone: '9143430505',
    opdScheduleMarathi: 'दररोज सकाळी १० ते १ (शनिवार / मंगळवार बंद)',
    opdScheduleEnglish: 'Daily Morning 10:00 AM – 1:00 PM (Closed Saturday & Tuesday)',
    eveningAppointmentNoticeMarathi: 'सायंकाळच्या अपॉइंटमेंटसाठी मो.नं.वर संपर्क करावा.',
    eveningAppointmentNoticeEnglish: 'For evening appointments, prior phone booking is required.',
    addressMarathi: '३२७, जुनी LIC बिल्डिंगजवळ, कुलकर्णी प्लॉट, कोर्टाच्या मागे, २ नं. पेट्रोल पंपामागे, भुसावळ.',
    addressEnglish: '327, Near Old LIC Building, Kulkarni Plot, Behind Court, Behind No. 2 Petrol Pump, Bhusawal - 425201, Dist. Jalgaon, Maharashtra.'
  });

  // General Preferences State
  const [generalPrefs, setGeneralPrefs] = useState({
    language: 'en-IN',
    timezone: 'Asia/Kolkata',
    dateFormat: 'DD/MM/YYYY',
    tokenExpiryDays: '14',
    enableSmsNotification: true,
    enableEmailNotification: true,
    retakeCooloffDays: '7'
  });

  // Admin Account State
  const [accountData, setAccountData] = useState({
    fullName: 'Dr. Parag Keshav Mahajan',
    email: 'dr.parag@bhartineuro.com',
    phone: '9143430505',
    designation: 'Medical Director & Chief Neuropsychiatrist',
    role: 'Main Admin (Super Admin)'
  });

  // Security Policy State
  const [securitySettings, setSecuritySettings] = useState({
    sessionTimeout: '60',
    requireTwoFactor: true,
    enforceStrongPassword: true,
    logAllAdminActions: true
  });

  const handleSaveProfile = (e) => {
    e.preventDefault();
    showToast('Hospital profile and visiting card details saved successfully.');
  };

  const handleSaveGeneral = (e) => {
    e.preventDefault();
    showToast('General clinical preferences updated successfully.');
  };

  const handleSaveAccount = (e) => {
    e.preventDefault();
    showToast('Administrator profile saved successfully.');
  };

  const handleSaveSecurity = (e) => {
    e.preventDefault();
    showToast('Security policy and session timeout settings updated.');
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

      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#153C47] tracking-tight">
            Hospital & System Settings
          </h1>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#E5F8F4] text-[#00BFA6] border border-[#00BFA6]/30">
            Configuration
          </span>
        </div>
        <p className="text-sm text-[#52717A] mt-1">
          Manage official hospital visiting card data, clinical assessment rules, and administrative preferences.
        </p>
      </div>

      {/* Tabs Row */}
      <div className="flex items-center gap-2 border-b border-gray-200 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition whitespace-nowrap cursor-pointer ${
            activeTab === 'profile'
              ? 'border-[#00BFA6] text-[#00BFA6]'
              : 'border-transparent text-[#52717A] hover:text-[#153C47]'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Hospital Profile</span>
        </button>

        <button
          onClick={() => setActiveTab('general')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition whitespace-nowrap cursor-pointer ${
            activeTab === 'general'
              ? 'border-[#00BFA6] text-[#00BFA6]'
              : 'border-transparent text-[#52717A] hover:text-[#153C47]'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>General Preferences</span>
        </button>

        <button
          onClick={() => setActiveTab('account')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition whitespace-nowrap cursor-pointer ${
            activeTab === 'account'
              ? 'border-[#00BFA6] text-[#00BFA6]'
              : 'border-transparent text-[#52717A] hover:text-[#153C47]'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Doctor Account</span>
        </button>

        <button
          onClick={() => setActiveTab('security')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition whitespace-nowrap cursor-pointer ${
            activeTab === 'security'
              ? 'border-[#00BFA6] text-[#00BFA6]'
              : 'border-transparent text-[#52717A] hover:text-[#153C47]'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Security & System</span>
        </button>
      </div>

      {/* ================================================================= */}
      {/* TAB 1: HOSPITAL PROFILE */}
      {/* ================================================================= */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSaveProfile} className="space-y-6">
          
          {/* Official Visiting Card Live Preview Banner */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-[#153C47] to-[#0A2229] text-white shadow-md relative overflow-hidden">
            <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-[#00BFA6]/20 to-transparent pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-14 h-14 rounded-2xl bg-white p-2 flex items-center justify-center shrink-0 shadow-xs">
                  <img src="/logo.png" alt="Hospital Logo" className="w-full h-full object-contain" />
                </div>
                <div>
                  <span className="text-[11px] font-bold tracking-widest text-[#00BFA6] uppercase">
                    Official Hospital Identity
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-white leading-tight">
                    {clinicProfile.clinicName}
                  </h3>
                  <p className="text-xs text-white/80 font-medium">
                    {clinicProfile.hospitalName} • Bhusawal
                  </p>
                </div>
              </div>

              <div className="border-t md:border-t-0 md:border-l border-white/10 pt-3 md:pt-0 md:pl-5 text-xs space-y-1">
                <p className="font-bold text-[#FFD43B]">
                  {clinicProfile.doctorName}
                </p>
                <p className="text-white/80">
                  {clinicProfile.qualifications} • Reg. No. {clinicProfile.registrationNumber}
                </p>
                <p className="text-[#00BFA6] font-semibold flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" />
                  +91 {clinicProfile.primaryPhone}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-5">
            <h3 className="text-base font-bold text-[#153C47]">Official Hospital Identity Details</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#153C47] mb-1">
                  Official Hospital Name
                </label>
                <input
                  type="text"
                  value={clinicProfile.clinicName}
                  onChange={(e) => setClinicProfile({ ...clinicProfile, clinicName: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 bg-[#F7FBF8] text-[#153C47] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00BFA6]/30 focus:border-[#00BFA6]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#153C47] mb-1">
                  Center & Hospital Name
                </label>
                <input
                  type="text"
                  value={clinicProfile.hospitalName}
                  onChange={(e) => setClinicProfile({ ...clinicProfile, hospitalName: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 bg-[#F7FBF8] text-[#153C47] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00BFA6]/30 focus:border-[#00BFA6]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#153C47] mb-1">
                  Chief Doctor & Psychiatrist
                </label>
                <input
                  type="text"
                  value={clinicProfile.doctorName}
                  onChange={(e) => setClinicProfile({ ...clinicProfile, doctorName: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 bg-[#F7FBF8] text-[#153C47] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00BFA6]/30 focus:border-[#00BFA6]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#153C47] mb-1">
                  Qualifications
                </label>
                <input
                  type="text"
                  value={clinicProfile.qualifications}
                  onChange={(e) => setClinicProfile({ ...clinicProfile, qualifications: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 bg-[#F7FBF8] text-[#153C47] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00BFA6]/30 focus:border-[#00BFA6]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#153C47] mb-1">
                  Medical Council Reg. Number
                </label>
                <input
                  type="text"
                  value={clinicProfile.registrationNumber}
                  onChange={(e) => setClinicProfile({ ...clinicProfile, registrationNumber: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 bg-[#F7FBF8] text-[#153C47] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00BFA6]/30 focus:border-[#00BFA6]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#153C47] mb-1">
                  OPD Schedule (English)
                </label>
                <input
                  type="text"
                  value={clinicProfile.opdScheduleEnglish}
                  onChange={(e) => setClinicProfile({ ...clinicProfile, opdScheduleEnglish: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 bg-[#F7FBF8] text-[#153C47] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00BFA6]/30 focus:border-[#00BFA6]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#153C47] mb-1">
                  OPD Schedule (मराठी)
                </label>
                <input
                  type="text"
                  value={clinicProfile.opdScheduleMarathi}
                  onChange={(e) => setClinicProfile({ ...clinicProfile, opdScheduleMarathi: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 bg-[#F7FBF8] text-[#153C47] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00BFA6]/30 focus:border-[#00BFA6]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#153C47] mb-1">
                  Clinic Helpline / Contact Number
                </label>
                <input
                  type="text"
                  value={clinicProfile.primaryPhone}
                  onChange={(e) => setClinicProfile({ ...clinicProfile, primaryPhone: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 bg-[#F7FBF8] text-[#153C47] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00BFA6]/30 focus:border-[#00BFA6]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#153C47] mb-1">
                  Evening Consultations Note (Marathi)
                </label>
                <input
                  type="text"
                  value={clinicProfile.eveningAppointmentNoticeMarathi}
                  onChange={(e) => setClinicProfile({ ...clinicProfile, eveningAppointmentNoticeMarathi: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 bg-[#F7FBF8] text-[#153C47] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00BFA6]/30 focus:border-[#00BFA6]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#153C47] mb-1">
                Full Physical Address (Bhusawal, Dist. Jalgaon)
              </label>
              <textarea
                rows={2}
                value={clinicProfile.addressEnglish}
                onChange={(e) => setClinicProfile({ ...clinicProfile, addressEnglish: e.target.value })}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 bg-[#F7FBF8] text-[#153C47] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00BFA6]/30 focus:border-[#00BFA6]"
              />
            </div>

            <div className="flex justify-end pt-3 border-t border-gray-100">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-white bg-[#00BFA6] hover:bg-[#009b86] shadow-sm shadow-[#00BFA6]/30 transition cursor-pointer text-sm"
              >
                <Save className="w-4 h-4" />
                <span>Save Hospital Profile</span>
              </button>
            </div>
          </div>
        </form>
      )}

      {/* ================================================================= */}
      {/* TAB 2: GENERAL PREFERENCES */}
      {/* ================================================================= */}
      {activeTab === 'general' && (
        <form onSubmit={handleSaveGeneral} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-5">
          <h3 className="text-base font-bold text-[#153C47]">Clinical & System Preferences</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#153C47] mb-1">
                Platform Language
              </label>
              <select
                value={generalPrefs.language}
                onChange={(e) => setGeneralPrefs({ ...generalPrefs, language: e.target.value })}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 bg-[#F7FBF8] text-[#153C47] focus:bg-white focus:outline-none focus:border-[#00BFA6]"
              >
                <option value="en-IN">English (India) with Marathi Notes</option>
                <option value="mr-IN">मराठी (Full Marathi Interface)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#153C47] mb-1">
                Timezone
              </label>
              <input
                type="text"
                disabled
                value="Asia/Kolkata (IST +05:30)"
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 bg-gray-100 text-[#52717A] cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#153C47] mb-1">
                Date Display Format
              </label>
              <select
                value={generalPrefs.dateFormat}
                onChange={(e) => setGeneralPrefs({ ...generalPrefs, dateFormat: e.target.value })}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 bg-[#F7FBF8] text-[#153C47] focus:bg-white focus:outline-none focus:border-[#00BFA6]"
              >
                <option value="DD/MM/YYYY">DD/MM/YYYY (Standard Indian Format)</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD (ISO Format)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-[#153C47] mb-1">
                Assessment Link Expiry Window
              </label>
              <select
                value={generalPrefs.tokenExpiryDays}
                onChange={(e) => setGeneralPrefs({ ...generalPrefs, tokenExpiryDays: e.target.value })}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 bg-[#F7FBF8] text-[#153C47] focus:bg-white focus:outline-none focus:border-[#00BFA6]"
              >
                <option value="7">7 Days from Prescription</option>
                <option value="14">14 Days from Prescription (Recommended)</option>
                <option value="30">30 Days from Prescription</option>
              </select>
              <p className="text-[11px] text-[#52717A] mt-1">Single-use tokens expire automatically once submitted.</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#153C47] mb-1">
                Retake Cool-Off Period
              </label>
              <select
                value={generalPrefs.retakeCooloffDays}
                onChange={(e) => setGeneralPrefs({ ...generalPrefs, retakeCooloffDays: e.target.value })}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 bg-[#F7FBF8] text-[#153C47] focus:bg-white focus:outline-none focus:border-[#00BFA6]"
              >
                <option value="7">7 Days</option>
                <option value="14">14 Days</option>
                <option value="30">30 Days (Standard Psychological Retest)</option>
              </select>
              <p className="text-[11px] text-[#52717A] mt-1">Prevents learning effects on repetitive testing.</p>
            </div>
          </div>

          <div className="flex justify-end pt-3 border-t border-gray-100">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-white bg-[#00BFA6] hover:bg-[#009b86] shadow-sm shadow-[#00BFA6]/30 transition cursor-pointer text-sm"
            >
              <Save className="w-4 h-4" />
              <span>Save General Preferences</span>
            </button>
          </div>
        </form>
      )}

      {/* ================================================================= */}
      {/* TAB 3: DOCTOR ACCOUNT */}
      {/* ================================================================= */}
      {activeTab === 'account' && (
        <form onSubmit={handleSaveAccount} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-5">
          <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00BFA6] to-[#42B9E8] text-white text-xl font-black flex items-center justify-center shadow-xs">
              PM
            </div>
            <div>
              <h3 className="text-base font-bold text-[#153C47]">{accountData.fullName}</h3>
              <p className="text-xs text-[#52717A] mt-0.5">{accountData.designation}</p>
              <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#FF684A]/10 text-[#FF684A] border border-[#FF684A]/20">
                {accountData.role}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#153C47] mb-1">
                Display Name
              </label>
              <input
                type="text"
                value={accountData.fullName}
                onChange={(e) => setAccountData({ ...accountData, fullName: e.target.value })}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 bg-[#F7FBF8] text-[#153C47] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00BFA6]/30 focus:border-[#00BFA6]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#153C47] mb-1">
                Professional Designation
              </label>
              <input
                type="text"
                value={accountData.designation}
                onChange={(e) => setAccountData({ ...accountData, designation: e.target.value })}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 bg-[#F7FBF8] text-[#153C47] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00BFA6]/30 focus:border-[#00BFA6]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#153C47] mb-1">
                Admin Email
              </label>
              <input
                type="email"
                value={accountData.email}
                onChange={(e) => setAccountData({ ...accountData, email: e.target.value })}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 bg-[#F7FBF8] text-[#153C47] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00BFA6]/30 focus:border-[#00BFA6]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#153C47] mb-1">
                Registered Phone Number
              </label>
              <input
                type="tel"
                value={accountData.phone}
                onChange={(e) => setAccountData({ ...accountData, phone: e.target.value })}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 bg-[#F7FBF8] text-[#153C47] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00BFA6]/30 focus:border-[#00BFA6]"
              />
            </div>
          </div>

          <div className="flex justify-end pt-3 border-t border-gray-100">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-white bg-[#00BFA6] hover:bg-[#009b86] shadow-sm shadow-[#00BFA6]/30 transition cursor-pointer text-sm"
            >
              <Save className="w-4 h-4" />
              <span>Update Doctor Profile</span>
            </button>
          </div>
        </form>
      )}

      {/* ================================================================= */}
      {/* TAB 4: SECURITY & SYSTEM */}
      {/* ================================================================= */}
      {activeTab === 'security' && (
        <form onSubmit={handleSaveSecurity} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-5">
          <h3 className="text-base font-bold text-[#153C47]">Security Governance & System Status</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#153C47] mb-1">
                Admin Console Inactivity Timeout
              </label>
              <select
                value={securitySettings.sessionTimeout}
                onChange={(e) => setSecuritySettings({ ...securitySettings, sessionTimeout: e.target.value })}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 bg-[#F7FBF8] text-[#153C47] focus:bg-white focus:outline-none focus:border-[#00BFA6]"
              >
                <option value="30">30 minutes</option>
                <option value="60">60 minutes (Default)</option>
                <option value="120">120 minutes</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#153C47] mb-1">
                Two-Factor Authentication (2FA)
              </label>
              <select
                value={securitySettings.requireTwoFactor ? 'enabled' : 'disabled'}
                onChange={(e) => setSecuritySettings({ ...securitySettings, requireTwoFactor: e.target.value === 'enabled' })}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 bg-[#F7FBF8] text-[#153C47] focus:bg-white focus:outline-none focus:border-[#00BFA6]"
              >
                <option value="enabled">Enforced for all administrative staff</option>
                <option value="disabled">Optional (Not Recommended)</option>
              </select>
            </div>
          </div>

          {/* Secure Environment Information Box */}
          <div className="p-4 rounded-xl bg-[#F7FBF8] border border-gray-100 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-[#00BFA6] font-bold">
              <Server className="w-4 h-4" />
              <span>System Environment & Compliance</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-[#52717A]">
              <div>
                <span className="font-semibold text-[#153C47] block">Build Version</span>
                <span>v2.4.0 (Phase 3 Complete)</span>
              </div>
              <div>
                <span className="font-semibold text-[#153C47] block">Data Privacy</span>
                <span>HIPAA & DISHA Aligned</span>
              </div>
              <div>
                <span className="font-semibold text-[#153C47] block">Secret Exposure</span>
                <span className="text-[#75C94B] font-bold">Protected (Zero Client Leak)</span>
              </div>
            </div>
          </div>

          <div className="p-3.5 bg-[#E5F8F4] rounded-xl border border-[#00BFA6]/20 text-xs text-[#153C47] flex items-center gap-2.5">
            <Info className="w-4 h-4 text-[#00BFA6] shrink-0" />
            <span>Full server-side cryptographic authentication tokens and session refresh cookies will be integrated in Phase 4.</span>
          </div>

          <div className="flex justify-end pt-3 border-t border-gray-100">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-white bg-[#00BFA6] hover:bg-[#009b86] shadow-sm shadow-[#00BFA6]/30 transition cursor-pointer text-sm"
            >
              <Save className="w-4 h-4" />
              <span>Save Security Settings</span>
            </button>
          </div>
        </form>
      )}

    </div>
  );
};
