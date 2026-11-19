import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Brain,
  Stethoscope,
  HeartHandshake,
  ShieldCheck,
  Lock,
  Users,
  Clock,
  CheckCircle2,
  ArrowRight,
  Activity,
  Building2,
  MapPin,
  Phone,
  Mail,
  Sparkles,
  Send,
  UserCheck,
  Info,
  Calendar,
  AlertCircle,
  Smile,
  Moon,
  Sparkle
} from 'lucide-react';
import { APP_CONFIG } from '../config/constants';
import { api } from '../services/api';

export const HomePage = () => {
  const [inquirySent, setInquirySent] = useState(false);
  const [inquiryData, setInquiryData] = useState({
    name: '',
    phone: '',
    topic: '',
    message: ''
  });

  const [assessments, setAssessments] = useState([]);
  const [loadingAssessments, setLoadingAssessments] = useState(false);

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        setLoadingAssessments(true);
        const res = await api.get('/tests');
        if (res?.data && Array.isArray(res.data) && res.data.length > 0) {
          setAssessments(res.data);
        }
      } catch (err) {
        // Fallback gracefully without fake tests
      } finally {
        setLoadingAssessments(false);
      }
    };

    fetchAssessments();
  }, []);

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    setInquirySent(true);
  };

  // Common Mental Health Conditions in Simple Language
  const commonConditions = [
    {
      title: 'Depression & Sadness',
      titleMarathi: 'उदासीनता व नैराश्य',
      description: 'Feeling constantly low, lost interest in daily activities, sadness, lack of energy, or hopeless thoughts.',
      icon: Smile,
      accentBorder: 'border-t-4 border-t-[#FF684A]',
      iconBg: 'bg-[#FF684A] text-white',
      badge: 'Mood Care',
      badgeBg: 'bg-[#fff1ee] text-[#FF684A]'
    },
    {
      title: 'Anxiety, Panic & Fear',
      titleMarathi: 'चिंता, भीती व अस्वस्थता',
      description: 'Excessive worry, rapid heartbeat, sudden panic attacks, nervousness in social situations, or restlessness.',
      icon: HeartHandshake,
      accentBorder: 'border-t-4 border-t-[#00BFA6]',
      iconBg: 'bg-[#00BFA6] text-white',
      badge: 'Anxiety Relief',
      badgeBg: 'bg-[#E5F8F4] text-[#008e7b]'
    },
    {
      title: 'Sleep Problems & Insomnia',
      titleMarathi: 'झोपेच्या तक्रारी',
      description: 'Difficulty falling asleep, waking up frequently during the night, daytime drowsiness, or disturbed sleep cycles.',
      icon: Moon,
      accentBorder: 'border-t-4 border-t-[#FFD43B]',
      iconBg: 'bg-[#FFD43B] text-[#153C47]',
      badge: 'Sleep Health',
      badgeBg: 'bg-[#fffbf0] text-[#153C47]'
    },
    {
      title: 'Memory Loss & Confusion',
      titleMarathi: 'स्मरणशक्ती व विसरभोळेपणा',
      description: 'Forgetfulness, difficulty remembering everyday things, confusion, dementia care, and elderly mental health support.',
      icon: Brain,
      accentBorder: 'border-t-4 border-t-[#42B9E8]',
      iconBg: 'bg-[#42B9E8] text-white',
      badge: 'Cognitive Care',
      badgeBg: 'bg-[#edf7fc] text-[#31a6d4]'
    },
    {
      title: 'Headache & Migraine',
      titleMarathi: 'डोकेदुखी व मायग्रेन',
      description: 'Persistent tension headaches, stress-induced migraines, dizziness, and nervous system symptoms.',
      icon: Activity,
      accentBorder: 'border-t-4 border-t-[#75C94B]',
      iconBg: 'bg-[#75C94B] text-white',
      badge: 'Neuro Care',
      badgeBg: 'bg-[#f2faed] text-[#66b43e]'
    },
    {
      title: 'Child & Student Guidance',
      titleMarathi: 'लहान मुले व अभ्यास समस्या',
      description: 'Lack of focus in studies, ADHD, behavioral issues, exam stress, anger, and teenage emotional counseling.',
      icon: Users,
      accentBorder: 'border-t-4 border-t-[#FF684A]',
      iconBg: 'bg-[#FF684A] text-white',
      badge: 'Child Wellness',
      badgeBg: 'bg-[#fff1ee] text-[#FF684A]'
    }
  ];

  // Simple 3-step visit flow
  const visitSteps = [
    {
      step: '1',
      title: 'Visit or Call Clinic',
      titleMarathi: 'दवाखान्यात या किंवा फोन करा',
      desc: 'Come directly during morning OPD hours (10:00 AM – 1:00 PM, closed Sat/Tue) or call 9143430505 for an evening appointment.',
      color: 'bg-[#00BFA6] text-white'
    },
    {
      step: '2',
      title: 'Doctor Consultation',
      titleMarathi: 'डॉक्टरांशी सविस्तर चर्चा',
      desc: 'Consult in private with Dr. Parag Mahajan. He listens carefully, diagnoses the root cause, and explains the treatment simply.',
      color: 'bg-[#FF684A] text-white'
    },
    {
      step: '3',
      title: 'Tests & Recovery Plan',
      titleMarathi: 'चाचण्या व योग्य उपचार',
      desc: 'If psychological assessments are prescribed, clinic staff gives you simple login access. You can answer questions on your phone or in clinic.',
      color: 'bg-[#FFD43B] text-[#153C47]'
    }
  ];

  return (
    <div className="space-y-0 text-[#153C47] bg-[#F7FBF8]">

      {/* ============================================================ */}
      {/* 1. HERO SECTION: Light Aqua + Simple, Friendly & Clear Text */}
      {/* ============================================================ */}
      <section className="relative bg-[#E5F8F4] text-[#153C47] overflow-hidden py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-[#00BFA6]/20">

        {/* Ambient background blur */}
        <div className="absolute top-10 right-10 w-80 h-80 bg-[#FFD43B]/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#42B9E8]/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

            {/* Left Column: Clinic & Doctor Details */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">

              {/* Doctor intro pill */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#00BFA6]/40 text-[#153C47] text-xs font-bold tracking-wide shadow-sm">
                <Stethoscope className="w-4 h-4 text-[#FF684A]" />
                <span>{APP_CONFIG.DOCTOR_NAME} &bull; {APP_CONFIG.DOCTOR_NAME_MARATHI}</span>
                <span className="hidden sm:inline text-[#008e7b]">({APP_CONFIG.DOCTOR_QUALIFICATIONS})</span>
              </div>

              {/* Main Heading */}
              <div className="space-y-2">
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#153C47] leading-[1.15]">
                  {APP_CONFIG.HOSPITAL_NAME}
                </h1>
                <p className="text-xl sm:text-2xl font-bold text-[#00BFA6]">
                  {APP_CONFIG.SUB_BRAND}
                </p>
                <p className="text-base sm:text-lg font-semibold text-[#FF684A] italic">
                  "{APP_CONFIG.TAGLINE}"
                </p>
              </div>

              {/* Simple, Easy-to-Understand Description */}
              <p className="text-base sm:text-lg text-[#52717A] leading-relaxed max-w-2xl font-medium">
                Compassionate, confidential, and professional psychiatric care in Bhusawal. We help you and your family overcome stress, anxiety, depression, sleep issues, memory concerns, and emotional difficulties.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-1">
                <a
                  href={`tel:${APP_CONFIG.PHONE}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-sm font-extrabold text-white bg-[#FF684A] hover:bg-[#e85538] transition-all shadow-md hover:scale-105 transform active:scale-95"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call: {APP_CONFIG.PHONE_DISPLAY}</span>
                </a>

                <Link
                  to="/login"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-extrabold text-[#153C47] bg-white hover:bg-slate-50 border-2 border-[#00BFA6] transition-all shadow-sm hover:scale-105 transform active:scale-95"
                >
                  <Lock className="w-4 h-4 text-[#00BFA6]" />
                  <span>Patient Portal Login</span>
                </Link>
              </div>

              {/* 3 Quick Highlights from the Visiting Card */}
              <div className="pt-6 border-t border-[#00BFA6]/20 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left text-xs">
                <div className="p-3.5 rounded-2xl bg-white border border-[#00BFA6]/30 shadow-sm">
                  <div className="flex items-center gap-1.5 font-extrabold text-sm text-[#153C47]">
                    <Clock className="w-4 h-4 text-[#FF684A]" />
                    <span>दवाखान्याची वेळ</span>
                  </div>
                  <span className="text-[#153C47] text-xs font-bold block mt-1">सकाळी १० ते १ (Daily)</span>
                  <span className="text-[#FF684A] text-[11px] font-semibold block">शनिवार व मंगळवार बंद</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-[#00BFA6]/30 shadow-sm">
                  <div className="flex items-center gap-1.5 font-extrabold text-sm text-[#153C47]">
                    <Phone className="w-4 h-4 text-[#00BFA6]" />
                    <span>अपॉइंटमेंट फोन</span>
                  </div>
                  <span className="text-[#153C47] text-xs font-bold block mt-1">{APP_CONFIG.PHONE}</span>
                  <span className="text-[#52717A] text-[11px] block">संध्याकाळी अपॉइंटमेंट साठी</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-[#00BFA6]/30 shadow-sm">
                  <div className="flex items-center gap-1.5 font-extrabold text-sm text-[#153C47]">
                    <MapPin className="w-4 h-4 text-[#42B9E8]" />
                    <span>पत्ता (Bhusawal)</span>
                  </div>
                  <span className="text-[#153C47] text-xs font-bold block mt-1">३२७, जुनी LIC बिल्डींग</span>
                  <span className="text-[#52717A] text-[11px] block">कोर्टाच्या मागे, भुसावळ</span>
                </div>
              </div>

            </div>

            {/* Right Column: Visiting Card Representation */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-lg lg:max-w-none">

                {/* Card Container styled like the actual Visiting Card */}
                <div className="relative rounded-3xl bg-white p-7 sm:p-8 border-2 border-[#00BFA6]/40 shadow-xl space-y-5">

                  {/* Card Top: Sub-Brand & Official Logo */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="h-14 w-auto p-1 bg-white rounded-2xl border border-slate-200/80 shadow-sm shrink-0">
                        <img
                          src="/logo.png"
                          alt="The Mind Solutions Center & Hospital"
                          className="h-12 w-auto object-contain rounded-xl"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-extrabold tracking-wider text-[#008e7b] block">
                          THE MIND SOLUTIONS
                        </span>
                        <h3 className="text-xs font-bold text-[#153C47]">
                          CENTER & HOSPITAL
                        </h3>
                        <p className="text-[11px] text-[#52717A]">Bhusawal, Maharashtra</p>
                      </div>
                    </div>

                    <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-[#E5F8F4] text-[#008e7b] border border-[#00BFA6]/30">
                      Reg. 2008/10/3670
                    </span>
                  </div>

                  {/* Doctor Info */}
                  <div className="bg-[#F7FBF8] rounded-2xl p-4 border border-slate-200 text-center space-y-1.5">
                    <div className="w-9 h-9 mx-auto rounded-full bg-[#FFD43B]/20 text-[#153C47] flex items-center justify-center">
                      <Stethoscope className="w-5 h-5 text-[#FF684A]" />
                    </div>
                    <h3 className="text-lg font-extrabold text-[#153C47]">
                      {APP_CONFIG.DOCTOR_NAME_MARATHI}
                    </h3>
                    <p className="text-xs font-bold text-[#008e7b]">
                      (मानसोपचार तज्ज्ञ &bull; Neuropsychiatrist)
                    </p>
                    <p className="text-xs text-[#52717A] font-semibold">
                      {APP_CONFIG.DOCTOR_NAME} &bull; {APP_CONFIG.DOCTOR_QUALIFICATIONS}
                    </p>
                  </div>

                  {/* Visual: Glowing Brain with "Your Mental Health Matters" */}
                  <div className="relative rounded-2xl bg-gradient-to-r from-[#153C47] to-[#1e4d5b] text-white p-4 text-center overflow-hidden">
                    <div className="relative z-10 space-y-1">
                      <p className="text-xs text-[#FFD43B] font-bold uppercase tracking-widest">
                        Clinic Motto
                      </p>
                      <h4 className="text-xl font-extrabold tracking-wide text-white italic">
                        "{APP_CONFIG.TAGLINE}"
                      </h4>
                      <p className="text-[11px] text-slate-300">
                        Caring for your mind, emotions & peace of mind.
                      </p>
                    </div>
                  </div>

                  {/* Timings summary */}
                  <div className="p-3.5 rounded-2xl bg-[#fff1ee] border border-[#FF684A]/30 text-xs text-[#153C47] space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#FF684A] flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        <span>दवाखान्याची वेळ:</span>
                      </span>
                      <span className="font-extrabold">सकाळी १० ते १</span>
                    </div>
                    <p className="text-[11px] text-rose-700 font-bold">
                      शनिवार व मंगळवार दवाखाना बंद राहील.
                    </p>
                    <p className="text-[11px] text-[#52717A]">
                      संध्याकाळी अपॉइंटमेंट साठी: <strong className="text-[#153C47]">{APP_CONFIG.PHONE}</strong>
                    </p>
                  </div>

                  {/* Portal Sign In Link */}
                  <Link
                    to="/login"
                    className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-[#00BFA6] hover:bg-[#00a892] text-white text-xs font-bold transition shadow-sm"
                  >
                    <span className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-[#FFD43B]" />
                      <span>Have doctor-assigned tests? Patient Login</span>
                    </span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </Link>

                </div>

              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ============================================================ */}
      {/* 2. ABOUT DOCTOR & CLINIC: Plain, Reassuring Language        */}
      {/* ============================================================ */}
      <section className="bg-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

            {/* Doctor Bio Card */}
            <div className="lg:col-span-5">
              <div className="bg-[#F7FBF8] rounded-3xl p-7 sm:p-9 border-2 border-[#00BFA6]/30 shadow-sm space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-[#00BFA6] text-white flex items-center justify-center font-extrabold text-2xl shadow-md shrink-0">
                    <Stethoscope className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-[#153C47]">
                      {APP_CONFIG.DOCTOR_NAME}
                    </h3>
                    <p className="text-sm font-bold text-[#FF684A]">
                      {APP_CONFIG.DOCTOR_NAME_MARATHI}
                    </p>
                    <p className="text-xs text-[#52717A] font-semibold mt-0.5">
                      मानसोपचार तज्ज्ञ &bull; Neuropsychiatrist
                    </p>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-200 text-xs">
                  <div className="flex items-center justify-between py-1 border-b border-slate-100">
                    <span className="text-[#52717A] font-medium">Qualifications:</span>
                    <strong className="text-[#153C47] font-bold">{APP_CONFIG.DOCTOR_QUALIFICATIONS}</strong>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-slate-100">
                    <span className="text-[#52717A] font-medium">MMC Registration:</span>
                    <strong className="text-[#153C47] font-bold">{APP_CONFIG.DOCTOR_REG_NO}</strong>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span className="text-[#52717A] font-medium">Hospital Center:</span>
                    <strong className="text-[#153C47] font-bold">{APP_CONFIG.SUB_BRAND}</strong>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#E5F8F4] border border-[#00BFA6]/30 text-xs text-[#153C47] space-y-1">
                  <p className="font-bold text-[#008e7b]">रुग्णांसाठी संदेश (A Note for Patients):</p>
                  <p className="text-[11px] text-[#52717A] italic leading-relaxed">
                    "मानसिक आरोग्य हे शारीरिक आरोग्याइतकेच महत्त्वाचे आहे. ताणतणाव, चिंता किंवा नैराश्याकडे दुर्लक्ष करू नका. योग्य समुपदेशन आणि वेळेवर उपचाराने संपूर्ण बरे वाटू शकते."
                  </p>
                </div>
              </div>
            </div>

            {/* Explanatory text */}
            <div className="lg:col-span-7 space-y-5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#008e7b] bg-[#E5F8F4] px-3.5 py-1 rounded-full border border-[#00BFA6]/30">
                About Our Clinic in Bhusawal
              </span>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#153C47] leading-tight">
                Simple, Caring & Respectful Help for Mental Wellbeing
              </h2>

              <p className="text-base text-[#52717A] leading-relaxed font-medium">
                Mental health concerns are common and treatable. At <strong>{APP_CONFIG.HOSPITAL_NAME}</strong>, we provide a safe, friendly, and non-judgmental space where you and your family can talk openly.
              </p>

              <p className="text-sm text-[#52717A] leading-relaxed">
                Whether you are facing constant worry, difficulty sleeping, low mood, or memory changes, <strong>Dr. Parag Keshav Mahajan</strong> offers scientific medical evaluations, supportive counseling, and personalized treatment plans tailored to each patient.
              </p>

              {/* 4 simple clinical guarantees */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#F7FBF8] border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-[#00BFA6] shrink-0" />
                  <span className="font-bold text-[#153C47]">100% Confidential Consultations</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#F7FBF8] border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-[#FF684A] shrink-0" />
                  <span className="font-bold text-[#153C47]">Friendly, Patient Listening</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#F7FBF8] border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-[#75C94B] shrink-0" />
                  <span className="font-bold text-[#153C47]">Modern Medical Science</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#F7FBF8] border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-[#42B9E8] shrink-0" />
                  <span className="font-bold text-[#153C47]">Clear Guidance for Family</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-xs font-bold text-white bg-[#00BFA6] hover:bg-[#00a892] transition shadow-md"
                >
                  <span>Read More About Our Clinic</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

            </div>

          </div>
        </div>
      </section>


      {/* ============================================================ */}
      {/* 3. COMMON PROBLEMS WE TREAT: Clear, Simple Everyday Words   */}
      {/* ============================================================ */}
      <section className="bg-[#F7FBF8] py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
        <div className="max-w-7xl mx-auto space-y-10">

          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF684A] bg-[#fff1ee] px-3.5 py-1 rounded-full border border-[#FF684A]/30">
              Problems We Treat
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#153C47]">
              Common Conditions We Help With
            </h2>
            <p className="text-sm text-[#52717A] font-medium">
              We provide treatment and supportive guidance for everyday emotional and psychological concerns.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {commonConditions.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className={`bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 ${item.accentBorder}`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${item.iconBg}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${item.badgeBg}`}>
                        {item.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base font-extrabold text-[#153C47]">
                        {item.title}
                      </h3>
                      <p className="text-xs font-bold text-[#008e7b]">
                        {item.titleMarathi}
                      </p>
                    </div>

                    <p className="text-xs text-[#52717A] leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100">
                    <Link
                      to="/services"
                      className="text-xs font-bold text-[#FF684A] hover:underline inline-flex items-center gap-1"
                    >
                      <span>Learn about treatments</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>


      {/* ============================================================ */}
      {/* 4. HOW IT WORKS: 3 Simple Steps For Every Patient            */}
      {/* ============================================================ */}
      <section className="bg-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
        <div className="max-w-7xl mx-auto space-y-10">

          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#66b43e] bg-[#f2faed] px-3.5 py-1 rounded-full border border-[#75C94B]/40">
              Simple 3-Step Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#153C47]">
              How to Visit & Get Treatment
            </h2>
            <p className="text-sm text-[#52717A] font-medium">
              A simple, straightforward way to consult Dr. Parag Mahajan and access prescribed tests.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {visitSteps.map((s, idx) => (
              <div
                key={idx}
                className="bg-[#F7FBF8] rounded-3xl p-7 border border-slate-200 shadow-sm flex flex-col justify-between space-y-4 relative"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-extrabold shadow-sm ${s.color}`}>
                      {s.step}
                    </span>
                    <span className="text-[11px] font-bold text-[#52717A]">Step {idx + 1}</span>
                  </div>

                  <div>
                    <h3 className="text-base font-extrabold text-[#153C47]">
                      {s.title}
                    </h3>
                    <p className="text-xs font-bold text-[#008e7b]">
                      {s.titleMarathi}
                    </p>
                  </div>

                  <p className="text-xs text-[#52717A] leading-relaxed">
                    {s.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200/60 flex items-center text-[11px] font-bold text-[#008e7b] gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Simple & Guided</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* ============================================================ */}
      {/* 5. CLINIC TIMINGS & LOCATION: Prominent from Visiting Card  */}
      {/* ============================================================ */}
      <section className="bg-[#E5F8F4] py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-[#00BFA6]/20">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border-2 border-[#00BFA6]/40 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            <div className="lg:col-span-7 space-y-5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#008e7b] bg-[#E5F8F4] px-3.5 py-1 rounded-full border border-[#00BFA6]/30">
                Clinic Visiting Information
              </span>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#153C47] leading-tight">
                Clinic Timings & Address in Bhusawal
              </h2>

              <p className="text-sm text-[#52717A] leading-relaxed font-medium">
                Please review our daily clinic hours before visiting. For evening visits, please call ahead to confirm your appointment.
              </p>

              {/* Timing cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="p-4 rounded-2xl bg-[#F7FBF8] border border-slate-200 space-y-1">
                  <div className="flex items-center gap-2 text-[#153C47] font-bold text-xs">
                    <Clock className="w-4 h-4 text-[#00BFA6]" />
                    <span>दवाखान्याची वेळ (Daily OPD)</span>
                  </div>
                  <p className="text-sm font-extrabold text-[#153C47]">सकाळी १० ते १ (10 AM – 1 PM)</p>
                  <p className="text-xs text-rose-600 font-bold">शनिवार व मंगळवार बंद (Closed)</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#F7FBF8] border border-slate-200 space-y-1">
                  <div className="flex items-center gap-2 text-[#153C47] font-bold text-xs">
                    <Phone className="w-4 h-4 text-[#FF684A]" />
                    <span>संध्याकाळी अपॉइंटमेंट (Evening)</span>
                  </div>
                  <p className="text-sm font-extrabold text-[#153C47]">मो.नं. ९१४३४३०५०५</p>
                  <p className="text-xs text-[#52717A]">Please call for prior booking</p>
                </div>
              </div>

              {/* Full Address */}
              <div className="p-4 rounded-2xl bg-[#E5F8F4] border border-[#00BFA6]/30 space-y-1 text-xs">
                <div className="flex items-start gap-2 font-bold text-[#153C47]">
                  <MapPin className="w-4 h-4 text-[#FF684A] shrink-0 mt-0.5" />
                  <span>पत्ता (Address):</span>
                </div>
                <p className="text-sm font-bold text-[#153C47] pl-6">
                  {APP_CONFIG.ADDRESS}
                </p>
                <p className="text-xs text-[#52717A] pl-6 font-medium">
                  {APP_CONFIG.ADDRESS_MARATHI}
                </p>
              </div>

            </div>

            {/* Direct Phone Call Card */}
            <div className="lg:col-span-5 bg-[#153C47] text-white rounded-3xl p-8 space-y-5 shadow-md text-center sm:text-left">
              <div className="w-12 h-12 rounded-2xl bg-[#FF684A] text-white flex items-center justify-center shadow-md mx-auto sm:mx-0">
                <Phone className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold text-[#FFD43B] uppercase tracking-wider block">
                  Direct Helpline
                </span>
                <h3 className="text-2xl font-extrabold text-white">
                  {APP_CONFIG.PHONE_DISPLAY}
                </h3>
                <p className="text-xs text-slate-300">
                  Call for consultation timings, appointment booking, or patient portal assistance.
                </p>
              </div>

              <div className="pt-2">
                <a
                  href={`tel:${APP_CONFIG.PHONE}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#FF684A] hover:bg-[#e85538] text-white text-xs font-extrabold transition shadow-md"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call {APP_CONFIG.PHONE} Now</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ============================================================ */}
      {/* 6. CONTACT & INQUIRY FORM: Simple, Clear & Functional        */}
      {/* ============================================================ */}
      <section className="bg-[#00BFA6] py-16 sm:py-20 px-4 sm:px-6 lg:px-8 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

            {/* Left Info Column */}
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 text-white text-xs font-bold border border-white/30 backdrop-blur-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#FFD43B]" />
                <span>Contact & Questions</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                Send Us a Message or Ask a Question
              </h2>

              <p className="text-sm text-white/95 leading-relaxed font-medium">
                Have a question about consultation, timings, or prescribed tests? Leave your details below and our clinic desk will contact you.
              </p>

              <div className="space-y-3 pt-1 text-xs">
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm">
                  <MapPin className="w-4 h-4 text-[#FFD43B] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-white text-xs">{APP_CONFIG.ADDRESS}</span>
                    <span className="text-[11px] text-white/80">{APP_CONFIG.ADDRESS_MARATHI}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm">
                  <Phone className="w-4 h-4 text-[#FFD43B] shrink-0" />
                  <div>
                    <span className="font-bold text-white text-xs">Phone: {APP_CONFIG.PHONE}</span>
                    <span className="text-[11px] text-white/80 block">OPD: 10 AM – 1 PM (Sat/Tue Closed)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Form Card */}
            <div className="lg:col-span-6">
              <div className="bg-white text-[#153C47] rounded-3xl p-7 sm:p-9 shadow-xl border border-white">
                <h3 className="text-xl font-extrabold text-[#153C47] mb-1">
                  Send an Inquiry
                </h3>
                <p className="text-xs text-[#52717A] mb-5 font-medium">
                  We will reply during clinic hours.
                </p>

                {inquirySent ? (
                  <div className="p-6 rounded-2xl bg-[#f2faed] border border-[#75C94B] text-center space-y-2">
                    <CheckCircle2 className="w-8 h-8 text-[#66b43e] mx-auto" />
                    <h4 className="font-extrabold text-[#153C47] text-base">Message Sent Successfully</h4>
                    <p className="text-xs text-[#52717A]">
                      Thank you. We have received your inquiry and will call you shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleInquirySubmit} className="space-y-3.5">
                    <div>
                      <label className="block text-xs font-bold text-[#153C47] mb-1">Your Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Enter your name"
                        value={inquiryData.name}
                        onChange={(e) => setInquiryData({ ...inquiryData, name: e.target.value })}
                        className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-[#F7FBF8] text-xs text-[#153C47] focus:outline-none focus:ring-2 focus:ring-[#00BFA6]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-[#153C47] mb-1">Phone Number</label>
                        <input
                          type="tel"
                          required
                          placeholder="Your 10-digit mobile number"
                          value={inquiryData.phone}
                          onChange={(e) => setInquiryData({ ...inquiryData, phone: e.target.value })}
                          className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-[#F7FBF8] text-xs text-[#153C47] focus:outline-none focus:ring-2 focus:ring-[#00BFA6]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#153C47] mb-1">What can we help with?</label>
                        <select
                          value={inquiryData.topic}
                          onChange={(e) => setInquiryData({ ...inquiryData, topic: e.target.value })}
                          className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-[#F7FBF8] text-xs text-[#153C47] focus:outline-none focus:ring-2 focus:ring-[#00BFA6]"
                        >
                          <option value="">Select a topic</option>
                          <option value="appointment">Doctor Appointment</option>
                          <option value="depression">Depression / Sadness</option>
                          <option value="anxiety">Anxiety / Stress</option>
                          <option value="sleep">Sleep Problems</option>
                          <option value="memory">Memory / Elderly Care</option>
                          <option value="child">Child / Student Issues</option>
                          <option value="portal">Patient Portal Help</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#153C47] mb-1">Message (Optional)</label>
                      <textarea
                        rows={2}
                        placeholder="Briefly describe your concern..."
                        value={inquiryData.message}
                        onChange={(e) => setInquiryData({ ...inquiryData, message: e.target.value })}
                        className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-[#F7FBF8] text-xs text-[#153C47] focus:outline-none focus:ring-2 focus:ring-[#00BFA6] resize-none"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 px-6 rounded-full bg-[#FF684A] hover:bg-[#e85538] text-white text-xs font-extrabold transition shadow-md flex items-center justify-center gap-2 hover:scale-105 transform active:scale-95"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Inquiry</span>
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
