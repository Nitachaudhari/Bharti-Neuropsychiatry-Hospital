import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Send,
  CheckCircle2,
  Sparkles,
  HelpCircle,
  Clock,
  Calendar,
  Stethoscope
} from 'lucide-react';
import { APP_CONFIG } from '../config/constants';

export const ContactPage = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    topic: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="space-y-14 pb-20 bg-[#F7FBF8] min-h-screen text-[#153C47]">

      {/* Header Banner */}
      <section className="relative bg-[#00BFA6] text-white py-14 sm:py-18 px-4 sm:px-6 lg:px-8 border-b border-[#008e7b]">
        <div className="max-w-4xl mx-auto relative z-10 text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 border border-white/30 text-white text-xs font-bold tracking-wide backdrop-blur-sm">
            <Phone className="w-3.5 h-3.5 text-[#FFD43B]" />
            <span>Clinic Contact & Appointments</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Contact {APP_CONFIG.HOSPITAL_NAME}
          </h1>
          <p className="text-white/95 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-medium">
            {APP_CONFIG.SUB_BRAND} &bull; {APP_CONFIG.DOCTOR_NAME} ({APP_CONFIG.DOCTOR_NAME_MARATHI})
          </p>
        </div>
      </section>

      {/* Main Content: Info & Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* Left Column: Clinic Contact Details from Visiting Card */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-white rounded-3xl p-7 sm:p-8 border border-slate-200 shadow-sm space-y-5 border-t-4 border-t-[#00BFA6]">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#008e7b]">
                  Clinic Details
                </span>
                <h2 className="text-2xl font-extrabold text-[#153C47] mt-1">
                  Bhusawal Clinic
                </h2>
                <p className="text-xs text-[#52717A] font-medium">
                  {APP_CONFIG.DOCTOR_NAME} &bull; {APP_CONFIG.DOCTOR_QUALIFICATIONS}
                </p>
              </div>

              <div className="space-y-4 text-xs">
                {/* Address */}
                <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#F7FBF8] border border-slate-200">
                  <div className="w-9 h-9 rounded-xl bg-[#FF684A] text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <strong className="block text-[#153C47] font-extrabold">दवाखान्याचा पत्ता (Address)</strong>
                    <span className="text-[#153C47] font-semibold leading-relaxed block">{APP_CONFIG.ADDRESS}</span>
                    <span className="text-[11px] text-[#52717A] leading-relaxed block">{APP_CONFIG.ADDRESS_MARATHI}</span>
                  </div>
                </div>

                {/* Timings */}
                <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#F7FBF8] border border-slate-200">
                  <div className="w-9 h-9 rounded-xl bg-[#00BFA6] text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <strong className="block text-[#153C47] font-extrabold">दवाखान्याची वेळ (Clinic Timings)</strong>
                    <span className="text-[#153C47] font-bold block">{APP_CONFIG.TIMINGS}</span>
                    <span className="text-rose-600 font-bold text-[11px] block">{APP_CONFIG.CLOSED_DAYS}</span>
                    <span className="text-[#52717A] text-[11px] block">{APP_CONFIG.EVENING_TIMINGS}</span>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#F7FBF8] border border-slate-200">
                  <div className="w-9 h-9 rounded-xl bg-[#FFD43B] text-[#153C47] flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                    <Phone className="w-5 h-5 text-[#FF684A]" />
                  </div>
                  <div>
                    <strong className="block text-[#153C47] font-extrabold mb-0.5">Mobile & Appointment Helpline</strong>
                    <a href={`tel:${APP_CONFIG.PHONE}`} className="text-lg text-[#FF684A] font-extrabold hover:underline block">
                      {APP_CONFIG.PHONE}
                    </a>
                    <span className="block text-[11px] text-[#52717A] mt-0.5 font-medium">Direct call for appointments or queries</span>
                  </div>
                </div>
              </div>

              {/* Direct call action */}
              <div className="pt-2">
                <a
                  href={`tel:${APP_CONFIG.PHONE}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#FF684A] hover:bg-[#e85538] text-white text-xs font-extrabold transition shadow-md"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call {APP_CONFIG.PHONE} Directly</span>
                </a>
              </div>
            </div>

            {/* Portal note */}
            <div className="p-4 rounded-2xl bg-[#E5F8F4] border border-[#00BFA6]/30 text-xs text-[#153C47] space-y-1">
              <div className="font-extrabold text-[#008e7b] flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-[#FF684A] shrink-0" />
                <span>Patient Portal Information</span>
              </div>
              <p className="text-[11px] text-[#52717A] leading-relaxed">
                If Dr. Parag Mahajan has prescribed online psychological tests, clinic staff will provide your login credentials during your consultation.
              </p>
            </div>
          </div>

          {/* Right Column: Simple Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200 shadow-sm space-y-5">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#008e7b]">
                  Leave a Message
                </span>
                <h3 className="text-2xl font-extrabold text-[#153C47] mt-1">
                  Ask a Question or Request a Call
                </h3>
                <p className="text-xs text-[#52717A] font-medium">
                  Fill in your details below and we will contact you during clinic hours.
                </p>
              </div>

              {formSubmitted ? (
                <div className="p-8 rounded-2xl bg-[#f2faed] border border-[#75C94B] text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-[#66b43e] mx-auto" />
                  <h4 className="font-extrabold text-[#153C47] text-base">Inquiry Submitted Successfully</h4>
                  <p className="text-xs text-[#52717A] max-w-sm mx-auto leading-relaxed">
                    Thank you. We have received your details. Dr. Parag Mahajan’s clinic desk will reach out to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#153C47] mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Patil"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-[#F7FBF8] text-xs text-[#153C47] focus:outline-none focus:ring-2 focus:ring-[#00BFA6]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#153C47] mb-1">Mobile Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="10-digit mobile number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-[#F7FBF8] text-xs text-[#153C47] focus:outline-none focus:ring-2 focus:ring-[#00BFA6]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#153C47] mb-1">Topic *</label>
                      <select
                        value={formData.topic}
                        onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-[#F7FBF8] text-xs text-[#153C47] focus:outline-none focus:ring-2 focus:ring-[#00BFA6]"
                      >
                        <option value="">Select concern</option>
                        <option value="appointment">OPD Appointment</option>
                        <option value="depression">Depression / Sadness</option>
                        <option value="anxiety">Anxiety / Stress</option>
                        <option value="sleep">Sleep Problems</option>
                        <option value="memory">Memory / Dementia</option>
                        <option value="child">Child / Study Issues</option>
                        <option value="other">General Question</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#153C47] mb-1">Your Message (Optional)</label>
                    <textarea
                      rows={3}
                      placeholder="Tell us briefly how we can help..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-[#F7FBF8] text-xs text-[#153C47] focus:outline-none focus:ring-2 focus:ring-[#00BFA6] resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-full bg-[#FF684A] hover:bg-[#e85538] text-white text-xs font-extrabold transition shadow-md flex items-center justify-center gap-2 hover:scale-105 transform active:scale-95"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message to Clinic</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
