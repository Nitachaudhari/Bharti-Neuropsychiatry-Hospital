import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  UserCheck, 
  FileText, 
  Lock, 
  HelpCircle, 
  Phone, 
  Mail, 
  CheckCircle2, 
  ArrowRight,
  ClipboardList,
  Sparkles,
  Info,
  Clock,
  Stethoscope
} from 'lucide-react';
import { APP_CONFIG } from '../config/constants';

export const PatientInfoPage = () => {
  const steps = [
    {
      number: '01',
      title: 'Consult Dr. Parag Mahajan',
      titleMarathi: 'डॉक्टरांशी प्रत्यक्ष भेट',
      description: 'Visit Bharti Neuropsychiatry Hospital during morning OPD hours (10 AM to 1 PM, closed Sat/Tue) or book an evening slot by phone.',
      badge: 'In-Person Consultation',
      badgeColor: 'bg-[#E5F8F4] text-[#008e7b] border border-[#00BFA6]/30',
      borderAccent: 'border-t-4 border-t-[#00BFA6]'
    },
    {
      number: '02',
      title: 'Doctor Prescribes the Test',
      titleMarathi: 'डॉक्टर चाचणी लिहून देतात',
      description: 'If an objective evaluation is needed for memory, mood, or anxiety, Dr. Parag Mahajan prescribes the appropriate test battery.',
      badge: 'Doctor Authorized',
      badgeColor: 'bg-[#fff1ee] text-[#FF684A] border border-[#FF684A]/30',
      borderAccent: 'border-t-4 border-t-[#FF684A]'
    },
    {
      number: '03',
      title: 'Receive Simple Login Details',
      titleMarathi: 'लॉगिन माहिती मिळवा',
      description: 'Clinic staff securely registers your mobile number and gives you your private portal login credentials right at the clinic desk.',
      badge: 'Staff Handover',
      badgeColor: 'bg-[#fffbf0] text-[#153C47] border border-[#FFD43B]/50',
      borderAccent: 'border-t-4 border-t-[#FFD43B]'
    },
    {
      number: '04',
      title: 'Answer Simple Questions Online',
      titleMarathi: 'प्रश्नांची सोपी उत्तरे द्या',
      description: 'Sign in from your smartphone, tablet, or clinic computer to complete the questions at your own comfortable pace.',
      badge: 'Easy Online Questions',
      badgeColor: 'bg-[#f2faed] text-[#66b43e] border border-[#75C94B]/30',
      borderAccent: 'border-t-4 border-t-[#75C94B]'
    }
  ];

  const reasons = [
    {
      title: 'Accurate Medical Diagnosis',
      description: 'Psychological tests should only be taken when recommended by a qualified doctor based on your personal health history.'
    },
    {
      title: 'Complete Patient Privacy',
      description: 'Your answers and health records remain 100% confidential and are visible only to your treating doctor.'
    },
    {
      title: 'Proper Medical Guidance',
      description: 'Dr. Parag Mahajan personally reviews test scores to guide your diagnosis and medical treatment plan.'
    }
  ];

  return (
    <div className="space-y-14 pb-20 bg-[#F7FBF8] min-h-screen text-[#153C47]">
      
      {/* Header Banner */}
      <section className="relative bg-[#00BFA6] text-white py-14 sm:py-18 px-4 sm:px-6 lg:px-8 border-b border-[#008e7b]">
        <div className="max-w-4xl mx-auto relative z-10 text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 border border-white/30 text-white text-xs font-bold tracking-wide backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-[#FFD43B]" />
            <span>Patient Portal Guide</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            How the Patient Portal Works
          </h1>
          <p className="text-white/95 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-medium">
            Simple, clear information on how prescribed psychological assessments are taken at {APP_CONFIG.HOSPITAL_NAME}.
          </p>
        </div>
      </section>

      {/* Primary Guidance & Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Notice Box */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-7 sm:p-9 border border-slate-200 shadow-sm space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5F8F4] text-[#008e7b] text-xs font-bold border border-[#00BFA6]/30">
              <Info className="w-4 h-4 text-[#00BFA6]" />
              <span>Clinic Account Policy</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#153C47] leading-snug">
              Why Online Self-Registration is Closed
            </h2>

            <p className="text-sm text-[#52717A] leading-relaxed font-medium">
              To ensure patient safety and proper medical supervision, <strong>patients cannot register accounts themselves online</strong>. All patient accounts are created in person by clinic staff during your consultation with <strong>Dr. Parag Keshav Mahajan</strong>.
            </p>

            <div className="space-y-3 pt-2">
              {reasons.map((r, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#F7FBF8] border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-[#00BFA6] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-[#153C47]">{r.title}</h4>
                    <p className="text-[11px] text-[#52717A] mt-0.5">{r.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <Link
                to="/login"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full text-xs font-bold text-white bg-[#FF684A] hover:bg-[#e85538] transition shadow-md"
              >
                <Lock className="w-4 h-4" />
                <span>Go to Patient Login</span>
              </Link>
              <a
                href={`tel:${APP_CONFIG.PHONE}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full text-xs font-bold text-[#153C47] bg-white border-2 border-[#00BFA6] hover:bg-slate-50 transition"
              >
                <Phone className="w-4 h-4 text-[#00BFA6]" />
                <span>Need Help? Call: {APP_CONFIG.PHONE}</span>
              </a>
            </div>
          </div>

          {/* Quick Help Desk */}
          <div className="lg:col-span-4 bg-[#153C47] text-white rounded-3xl p-7 sm:p-8 flex flex-col justify-between space-y-5 shadow-sm">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FFD43B] text-[#153C47] flex items-center justify-center shadow-sm">
                <HelpCircle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-white">
                Clinic Assistance Desk
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                If you visited the clinic and have your login credentials, or if you forgot your password, contact our staff:
              </p>
              
              <div className="space-y-3 pt-2 text-xs">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.08]">
                  <Phone className="w-4 h-4 text-[#FFD43B] shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">Helpline</span>
                    <a href={`tel:${APP_CONFIG.PHONE}`} className="text-white font-bold text-xs hover:underline">
                      {APP_CONFIG.PHONE}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.08]">
                  <Clock className="w-4 h-4 text-[#75C94B] shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">OPD Hours</span>
                    <span className="text-white font-medium text-xs">10 AM – 1 PM (Sat/Tue Closed)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-700/80">
              <Link
                to="/contact"
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full text-xs font-bold text-white bg-[#00BFA6] hover:bg-[#00a892] transition"
              >
                <span>Clinic Address & Map</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 4-Step Process Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#008e7b] bg-[#E5F8F4] px-3.5 py-1 rounded-full border border-[#00BFA6]/30">
            Step-by-Step
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#153C47]">
            How to Take Your Prescribed Assessment
          </h2>
          <p className="text-xs text-[#52717A] font-medium">
            From your doctor consultation to viewing your results, here is what happens:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className={`bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between space-y-4 ${s.borderAccent}`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-extrabold text-[#153C47]">
                    {s.number}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${s.badgeColor}`}>
                    {s.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-extrabold text-[#153C47]">
                    {s.title}
                  </h3>
                  <p className="text-xs font-bold text-[#008e7b]">
                    {s.titleMarathi}
                  </p>
                </div>

                <p className="text-xs text-[#52717A] leading-relaxed">
                  {s.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center text-[11px] font-bold text-[#008e7b] gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Doctor Governed</span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
