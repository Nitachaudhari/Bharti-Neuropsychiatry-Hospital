import React from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  Clock,
  HeartHandshake,
  Lock,
  ArrowRight,
  User,
  Stethoscope,
  Award,
  Calendar
} from 'lucide-react';
import { APP_CONFIG } from '../../config/constants';

export const Footer = () => {
  return (
    <footer className="bg-[#153C47] text-slate-200 border-t border-slate-700/80 mt-auto">

      {/* Upper Highlights Bar with Bright Accents */}
      <div className="border-b border-slate-700/80 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.05] border border-white/10">
            <div className="w-11 h-11 rounded-2xl bg-[#00BFA6]/20 border border-[#00BFA6]/40 text-[#00BFA6] flex items-center justify-center shrink-0">
              <Stethoscope className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white text-xs font-bold uppercase tracking-wider">{APP_CONFIG.DOCTOR_NAME}</h4>
              <p className="text-[11px] text-slate-300 font-medium">{APP_CONFIG.DOCTOR_QUALIFICATIONS} &bull; {APP_CONFIG.DOCTOR_REG_NO}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.05] border border-white/10">
            <div className="w-11 h-11 rounded-2xl bg-[#FFD43B]/20 border border-[#FFD43B]/40 text-[#FFD43B] flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white text-xs font-bold uppercase tracking-wider">OPD: Daily 10 AM – 1 PM</h4>
              <p className="text-[11px] text-slate-300 font-medium">Saturday & Tuesday Closed &bull; Evening by Call</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.05] border border-white/10">
            <div className="w-11 h-11 rounded-2xl bg-[#FF684A]/20 border border-[#FF684A]/40 text-[#FF684A] flex items-center justify-center shrink-0">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white text-xs font-bold uppercase tracking-wider">Helpline: {APP_CONFIG.PHONE}</h4>
              <p className="text-[11px] text-slate-300 font-medium">Appointments & Inquiries &bull; Bhusawal</p>
            </div>
          </div>

        </div>
      </div>

      {/* Main Footer Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Column 1: Hospital Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="p-1.5 bg-white rounded-2xl shadow-sm shrink-0">
                <img
                  src="/logo.png"
                  alt="The Mind Solutions Center & Hospital"
                  className="h-11 w-auto object-contain rounded-xl"
                />
              </div>
              <div>
                <span className="text-lg font-extrabold text-white tracking-tight">
                  {APP_CONFIG.HOSPITAL_NAME}
                </span>
                <span className="block text-[11px] text-[#FFD43B] font-bold">
                  {APP_CONFIG.SUB_BRAND}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed max-w-sm font-medium">
              Dedicated neuropsychiatric clinic and counseling center in Bhusawal led by <strong>{APP_CONFIG.DOCTOR_NAME}</strong> ({APP_CONFIG.DOCTOR_NAME_MARATHI} - मानसोपचार तज्ज्ञ).
            </p>

            <div className="p-3 rounded-xl bg-white/[0.05] border border-white/10 text-xs space-y-1">
              <p className="text-[#FFD43B] font-bold text-xs">दवाखान्याची वेळ (Clinic Timings):</p>
              <p className="text-slate-200 text-[11px]">{APP_CONFIG.TIMINGS}</p>
              <p className="text-rose-300 text-[11px] font-semibold">{APP_CONFIG.CLOSED_DAYS}</p>
              <p className="text-slate-300 text-[11px]">{APP_CONFIG.EVENING_TIMINGS}</p>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h4 className="text-[#FFD43B] text-xs font-bold uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/" className="text-slate-300 hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-[#00BFA6]" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-300 hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-[#00BFA6]" />
                  <span>About Doctor & Clinic</span>
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-slate-300 hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-[#00BFA6]" />
                  <span>Treatments & Services</span>
                </Link>
              </li>
              <li>
                <Link to="/assessments" className="text-slate-300 hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-[#00BFA6]" />
                  <span>Psychological Tests</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-300 hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-[#00BFA6]" />
                  <span>Contact & Map</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Patient Portal */}
          <div>
            <h4 className="text-[#FF684A] text-xs font-bold uppercase tracking-wider mb-4">
              Patient Portal
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/patient" className="text-slate-300 hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-[#75C94B]" />
                  <span className="font-bold text-[#75C94B]">How Portal Works</span>
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-slate-300 hover:text-white transition-colors flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#00BFA6]" />
                  <span>Patient Login</span>
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-slate-300 hover:text-white transition-colors flex items-center gap-1.5">
                  <Stethoscope className="w-3.5 h-3.5 text-[#42B9E8]" />
                  <span>Doctor / Staff Login</span>
                </Link>
              </li>
              <li className="pt-2 text-[11px] text-slate-400 leading-normal">
                Patient logins are given during your clinic consultation. Public online registration is closed.
              </li>
            </ul>
          </div>

          {/* Column 4: Clinic Location & Contact */}
          <div>
            <h4 className="text-[#42B9E8] text-xs font-bold uppercase tracking-wider mb-4">
              Clinic Address
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#FF684A] shrink-0 mt-0.5" />
                <div className="text-slate-300 leading-relaxed">
                  <p className="font-semibold text-white">{APP_CONFIG.ADDRESS}</p>
                  <p className="text-[11px] text-slate-400 mt-1">{APP_CONFIG.ADDRESS_MARATHI}</p>
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#FFD43B] shrink-0" />
                <a href={`tel:${APP_CONFIG.PHONE}`} className="text-white font-bold hover:underline">
                  {APP_CONFIG.PHONE}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#75C94B] shrink-0" />
                <span className="text-slate-300">{APP_CONFIG.EMAIL}</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="border-t border-slate-700/80 py-5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} {APP_CONFIG.HOSPITAL_NAME} &bull; {APP_CONFIG.SUB_BRAND}.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-[#FFD43B] font-semibold italic">"{APP_CONFIG.TAGLINE}"</span>
            <span>&bull;</span>
            <span className="text-[#00BFA6] font-semibold">Dr. Parag Keshav Mahajan</span>
            <span>&bull;</span>
            <span className="text-[#75C94B] font-semibold">Bhusawal</span>
          </div>
        </div>
      </div>

    </footer>
  );
};
