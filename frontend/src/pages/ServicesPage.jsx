import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Stethoscope, 
  Brain, 
  HeartHandshake, 
  Users, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2,
  Phone,
  Moon,
  Smile,
  Activity,
  ShieldCheck
} from 'lucide-react';
import { APP_CONFIG } from '../config/constants';

export const ServicesPage = () => {
  const treatments = [
    {
      title: 'Psychiatric Consultation & Medical Treatment',
      titleMarathi: 'मानसोपचार व वैद्यकीय सल्ला',
      badge: 'Doctor Consultation',
      description: 'In-person diagnosis and medical treatment by Dr. Parag Mahajan for emotional, mood, and neurological conditions.',
      icon: Stethoscope,
      borderTop: 'border-t-4 border-t-[#FF684A]',
      iconBg: 'bg-[#FF684A] text-white',
      badgeClass: 'bg-[#fff1ee] text-[#FF684A]',
      points: [
        'Detailed, patient listening to your concerns',
        'Accurate medical diagnosis of psychiatric conditions',
        'Safe, scientific medication management if needed',
        'Ongoing follow-up and progress tracking'
      ]
    },
    {
      title: 'Depression & Anxiety Care',
      titleMarathi: 'उदासीनता, भीती व चिंता निवारण',
      badge: 'Emotional Wellbeing',
      description: 'Supportive guidance and scientific therapy for constant sadness, panic attacks, nervousness, and overwhelming stress.',
      icon: Smile,
      borderTop: 'border-t-4 border-t-[#00BFA6]',
      iconBg: 'bg-[#00BFA6] text-white',
      badgeClass: 'bg-[#E5F8F4] text-[#008e7b]',
      points: [
        'Relief from constant low mood and exhaustion',
        'Management of panic attacks and racing thoughts',
        'Stress reduction techniques and counseling',
        'Restoring confidence and daily routine'
      ]
    },
    {
      title: 'Sleep & Headache Clinic',
      titleMarathi: 'झोप आणि डोकेदुखी उपचार',
      badge: 'Rest & Neurological Health',
      description: 'Specialized evaluation for insomnia, night awakenings, chronic tension headaches, and stress migraines.',
      icon: Moon,
      borderTop: 'border-t-4 border-t-[#FFD43B]',
      iconBg: 'bg-[#FFD43B] text-[#153C47]',
      badgeClass: 'bg-[#fffbf0] text-[#153C47]',
      points: [
        'Identification of physical or psychological causes of sleeplessness',
        'Non-habit-forming sleep hygiene guidance',
        'Tension headache and migraine relief',
        'Restoring fresh daytime energy'
      ]
    },
    {
      title: 'Memory & Elderly Mental Health',
      titleMarathi: 'स्मरणशक्ती व विसरभोळेपणा',
      badge: 'Senior Care',
      description: 'Care and support for forgetfulness, confusion, Alzheimer’s, dementia, and behavioral changes in older family members.',
      icon: Brain,
      borderTop: 'border-t-4 border-t-[#42B9E8]',
      iconBg: 'bg-[#42B9E8] text-white',
      badgeClass: 'bg-[#edf7fc] text-[#31a6d4]',
      points: [
        'Evaluation of age-related memory loss vs dementia',
        'Supportive counseling for family caregivers',
        'Management of agitation, sleep disturbance, or confusion',
        'Cognitive exercise recommendations'
      ]
    },
    {
      title: 'Child, Student & Teen Counseling',
      titleMarathi: 'लहान मुले व विद्यार्थी समुपदेशन',
      badge: 'Youth & Studies',
      description: 'Friendly support for ADHD, lack of attention in studies, stubbornness, exam fear, and teenage stress.',
      icon: Users,
      borderTop: 'border-t-4 border-t-[#75C94B]',
      iconBg: 'bg-[#75C94B] text-white',
      badgeClass: 'bg-[#f2faed] text-[#66b43e]',
      points: [
        'Assessment for attention and concentration issues',
        'Exam phobia and academic stress counseling',
        'Behavioral guidance for parents and children',
        'Screen time and digital addiction counseling'
      ]
    },
    {
      title: 'Psychological Tests & Assessments',
      titleMarathi: 'मानसिक व बौद्धिक चाचण्या',
      badge: 'Diagnostic Testing',
      description: 'Standardized psychological test questionnaires assigned by Dr. Parag Mahajan to objectively measure mood, memory, and focus.',
      icon: Activity,
      borderTop: 'border-t-4 border-t-[#FF684A]',
      iconBg: 'bg-[#FF684A] text-white',
      badgeClass: 'bg-[#fff1ee] text-[#FF684A]',
      points: [
        'Memory and cognitive screening batteries',
        'Depression and anxiety rating scales',
        'Personality and behavioral inventories',
        'Secure results reviewed directly by the doctor'
      ]
    }
  ];

  return (
    <div className="space-y-14 pb-20 bg-[#F7FBF8] min-h-screen text-[#153C47]">

      {/* Header Banner */}
      <section className="relative bg-[#00BFA6] text-white py-14 sm:py-18 px-4 sm:px-6 lg:px-8 border-b border-[#008e7b]">
        <div className="max-w-4xl mx-auto relative z-10 text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 border border-white/30 text-white text-xs font-bold tracking-wide backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-[#FFD43B]" />
            <span>Treatments & Care in Bhusawal</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Our Treatments & Services
          </h1>
          <p className="text-white/95 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-medium">
            Clear, compassionate, and scientifically proven psychiatric care under Dr. Parag Keshav Mahajan.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {treatments.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className={`bg-white rounded-3xl p-7 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-5 ${item.borderTop}`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm ${item.iconBg}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${item.badgeClass}`}>
                      {item.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-extrabold text-[#153C47]">
                      {item.title}
                    </h3>
                    <p className="text-xs font-bold text-[#008e7b] mt-0.5">
                      {item.titleMarathi}
                    </p>
                  </div>

                  <p className="text-xs text-[#52717A] leading-relaxed">
                    {item.description}
                  </p>

                  <div className="pt-2 border-t border-slate-100 space-y-2 text-xs">
                    {item.points.map((pt, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-2 text-[#153C47]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#00BFA6] shrink-0 mt-0.5" />
                        <span className="text-[11px] font-medium leading-tight">{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <a
                    href={`tel:${APP_CONFIG.PHONE}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF684A] hover:underline"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call for Appointment: {APP_CONFIG.PHONE}</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* OPD Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#E5F8F4] rounded-3xl p-8 sm:p-10 border-2 border-[#00BFA6]/40 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#008e7b] bg-white px-3 py-1 rounded-full border border-[#00BFA6]/30">
              Visiting Hours
            </span>
            <h3 className="text-xl font-extrabold text-[#153C47]">
              OPD Timings: Daily 10:00 AM – 1:00 PM
            </h3>
            <p className="text-xs text-[#52717A] font-medium">
              शनिवार व मंगळवार दवाखाना बंद राहील. &bull; Evening visits by prior phone appointment.
            </p>
          </div>
          <a
            href={`tel:${APP_CONFIG.PHONE}`}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs font-bold text-white bg-[#FF684A] hover:bg-[#e85538] transition shadow-md shrink-0"
          >
            <Phone className="w-4 h-4" />
            <span>Call: {APP_CONFIG.PHONE}</span>
          </a>
        </div>
      </section>

    </div>
  );
};
