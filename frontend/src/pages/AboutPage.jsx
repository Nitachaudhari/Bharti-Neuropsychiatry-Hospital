import React from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  ShieldCheck,
  Activity,
  HeartHandshake,
  Stethoscope,
  Users,
  CheckCircle2,
  ArrowRight,
  Brain,
  Sparkles,
  Phone,
  Mail,
  Clock,
  MapPin,
  Smile
} from 'lucide-react';
import { APP_CONFIG } from '../config/constants';

export const AboutPage = () => {
  return (
    <div className="space-y-14 pb-20 bg-[#F7FBF8] min-h-screen text-[#153C47]">

      {/* Header Banner in Tropical Teal */}
      <section className="relative bg-[#00BFA6] text-white py-14 sm:py-18 px-4 sm:px-6 lg:px-8 border-b border-[#008e7b]">
        <div className="max-w-4xl mx-auto relative z-10 text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 border border-white/30 text-white text-xs font-bold tracking-wide backdrop-blur-sm">
            <Building2 className="w-4 h-4 text-[#FFD43B]" />
            <span>Dedicated Neuropsychiatry Center in Bhusawal</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            About {APP_CONFIG.HOSPITAL_NAME}
          </h1>
          <p className="text-white/95 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-medium">
            {APP_CONFIG.SUB_BRAND} &bull; <em className="not-italic text-[#FFD43B]">"{APP_CONFIG.TAGLINE}"</em>
          </p>
        </div>
      </section>

      {/* Doctor & Clinic Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

          {/* Left Column: Easy to Understand Intro */}
          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#008e7b] bg-[#E5F8F4] px-3.5 py-1 rounded-full border border-[#00BFA6]/30">
              Meet Dr. Parag Mahajan
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#153C47] tracking-tight leading-snug">
              Compassionate Mental Healthcare & Neuropsychiatry in Bhusawal
            </h2>
            <p className="text-[#52717A] text-sm sm:text-base leading-relaxed font-medium">
              At <strong>{APP_CONFIG.HOSPITAL_NAME}</strong>, we believe every person's mental health matters. Mental health struggles like stress, worry, sleep issues, or sadness are very real medical conditions, and you don't have to suffer in silence.
            </p>
            <p className="text-[#52717A] text-xs sm:text-sm leading-relaxed">
              Led by <strong>{APP_CONFIG.DOCTOR_NAME}</strong> ({APP_CONFIG.DOCTOR_NAME_MARATHI}), our clinic provides scientific medical evaluation, respectful counseling, and standardized psychological testing in a safe, completely confidential environment.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#00BFA6] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#153C47]">100% Confidential</h4>
                  <p className="text-[11px] text-[#52717A] mt-0.5 font-medium">All discussions and medical records are kept strictly private.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-3">
                <HeartHandshake className="w-5 h-5 text-[#FF684A] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#153C47]">Compassionate Care</h4>
                  <p className="text-[11px] text-[#52717A] mt-0.5 font-medium">We listen with patience, respect, and zero judgment.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Doctor Card */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-7 sm:p-9 border-2 border-[#00BFA6]/30 shadow-md space-y-5">
            <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100">
              <div className="p-1 bg-white rounded-xl border border-slate-200/80 shadow-sm shrink-0">
                <img
                  src="/logo.png"
                  alt="The Mind Solutions Center & Hospital"
                  className="h-12 w-auto object-contain rounded-lg"
                />
              </div>
              <div>
                <span className="text-[10px] uppercase font-extrabold text-[#008e7b] tracking-wider block">Official Center</span>
                <h4 className="text-xs font-bold text-[#153C47]">{APP_CONFIG.SUB_BRAND}</h4>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-2xl bg-[#00BFA6] text-white flex items-center justify-center shadow-md shrink-0">
                <Stethoscope className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-[#153C47]">{APP_CONFIG.DOCTOR_NAME}</h3>
                <p className="text-sm font-bold text-[#FF684A]">{APP_CONFIG.DOCTOR_NAME_MARATHI}</p>
                <p className="text-xs text-[#008e7b] font-semibold">{APP_CONFIG.DOCTOR_ROLE}</p>
              </div>
            </div>

            <div className="space-y-2.5 pt-2 border-t border-slate-100 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-slate-100">
                <span className="text-[#52717A] font-medium">Qualifications:</span>
                <strong className="text-[#153C47] font-bold">{APP_CONFIG.DOCTOR_QUALIFICATIONS}</strong>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-100">
                <span className="text-[#52717A] font-medium">Reg. Number:</span>
                <strong className="text-[#153C47] font-bold">{APP_CONFIG.DOCTOR_REG_NO}</strong>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-100">
                <span className="text-[#52717A] font-medium">Clinic Timings:</span>
                <strong className="text-[#153C47] font-bold">10 AM – 1 PM (Daily)</strong>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-[#52717A] font-medium">Closed Days:</span>
                <strong className="text-rose-600 font-bold">Sat & Tue Closed</strong>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#fff1ee] border border-[#FF684A]/30 text-xs text-[#153C47] space-y-1">
              <p className="font-bold text-[#FF684A] flex items-center gap-1.5">
                <Phone className="w-4 h-4" />
                <span>Call for Appointments:</span>
              </p>
              <p className="text-base font-extrabold text-[#153C47]">
                {APP_CONFIG.PHONE_DISPLAY}
              </p>
              <p className="text-[11px] text-[#52717A]">
                संध्याकाळी अपॉइंटमेंट साठी मो.नं.वर संपर्क करावा.
              </p>
            </div>

            <div className="pt-1">
              <a
                href={`tel:${APP_CONFIG.PHONE}`}
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full text-xs font-bold text-white bg-[#FF684A] hover:bg-[#e85538] transition shadow-md hover:scale-105 transform active:scale-95"
              >
                <Phone className="w-4 h-4" />
                <span>Call Clinic Now</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* Address & Visiting Card Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-7 sm:p-9 border-2 border-[#00BFA6]/30 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#008e7b] bg-[#E5F8F4] px-3 py-1 rounded-full">
              Clinic Location
            </span>
            <h3 className="text-lg font-extrabold text-[#153C47]">
              {APP_CONFIG.ADDRESS}
            </h3>
            <p className="text-xs text-[#52717A] font-medium">
              {APP_CONFIG.ADDRESS_MARATHI}
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-xs font-bold text-white bg-[#00BFA6] hover:bg-[#00a892] transition shadow-md shrink-0"
          >
            <span>View Map & Contact</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </div>
  );
};
