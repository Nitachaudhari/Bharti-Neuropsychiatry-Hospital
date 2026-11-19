import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Brain,
  Clock,
  Lock,
  ArrowRight,
  Sparkles,
  Info
} from 'lucide-react';
import { api } from '../services/api';
import { APP_CONFIG } from '../config/constants';

export const AssessmentsCatalogPreview = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(false);

  // Standardized categories with colorful cards (Sky Blue, Coral, Yellow, Fresh Green)
  const standardCategories = [
    {
      code: 'COG-BATTERY',
      title: 'Cognitive & Neuropsychological Batteries',
      category: 'Neuropsychology',
      description: 'Standardized assessment of memory retention, executive cognitive function, spatial orientation, and mental processing speed.',
      estimatedDuration: '30-45 minutes',
      borderTop: 'border-t-4 border-t-[#42B9E8]',
      badgeClass: 'bg-[#edf7fc] text-[#31a6d4] border border-[#42B9E8]/30',
      iconBg: 'bg-[#42B9E8] text-white'
    },
    {
      code: 'MOOD-AFFECT',
      title: 'Mood & Affective Diagnostic Inventories',
      category: 'Affective Profiling',
      description: 'Standardized clinical scales evaluating depressive symptoms, generalized anxiety states, panic indices, and emotional regulation.',
      estimatedDuration: '20-30 minutes',
      borderTop: 'border-t-4 border-t-[#FF684A]',
      badgeClass: 'bg-[#fff1ee] text-[#FF684A] border border-[#FF684A]/30',
      iconBg: 'bg-[#FF684A] text-white shadow-md'
    },
    {
      code: 'PERS-DIAG',
      title: 'Personality & Behavioral Diagnostic Profiling',
      category: 'Personality Psychometry',
      description: 'Comprehensive psychometric diagnostic inventories designed for clinical evaluation of behavioral patterns and coping styles.',
      estimatedDuration: '35-50 minutes',
      borderTop: 'border-t-4 border-t-[#FFD43B]',
      badgeClass: 'bg-[#fffbf0] text-[#153C47] border border-[#FFD43B]/50',
      iconBg: 'bg-[#FFD43B] text-[#153C47] shadow-sm'
    },
    {
      code: 'ADHD-ATTN',
      title: 'Attention & Executive Function Screening',
      category: 'Developmental & Attention',
      description: 'Age-normed clinical screening scales evaluating attention span, impulse control, working memory, and executive task management.',
      estimatedDuration: '25-35 minutes',
      borderTop: 'border-t-4 border-t-[#75C94B]',
      badgeClass: 'bg-[#f2faed] text-[#66b43e] border border-[#75C94B]/30',
      iconBg: 'bg-[#75C94B] text-white'
    }
  ];

  useEffect(() => {
    const fetchTests = async () => {
      try {
        setLoading(true);
        const res = await api.get('/tests');
        if (res?.data && Array.isArray(res.data) && res.data.length > 0) {
          setTests(res.data);
        }
      } catch (err) {
        // Fallback cleanly without fake tests
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, []);

  return (
    <div className="space-y-16 pb-20 bg-white min-h-screen text-[#153C47]">

      {/* Header Banner in Tropical Teal */}
      <section className="relative bg-[#00BFA6] text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-[#008e7b]">
        <div className="max-w-4xl mx-auto relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 border border-white/30 text-white text-xs font-bold tracking-wide backdrop-blur-sm">
            <Brain className="w-4 h-4 text-[#FFD43B]" />
            <span>Standardized Assessment Directory</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Psychological & Neuropsychiatric Assessments
          </h1>
          <p className="text-white/95 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-medium">
            Directory of psychological assessments and tests prescribed by Dr. Parag Keshav Mahajan at {APP_CONFIG.HOSPITAL_NAME}.
          </p>
        </div>
      </section>

      {/* Clinical Access Notice Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F7FBF8] rounded-3xl p-6 sm:p-8 border-2 border-[#00BFA6]/20 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-2xl bg-[#00BFA6] text-white flex items-center justify-center shrink-0 shadow-md mt-0.5">
              <Lock className="w-5 h-5 text-[#FFD43B]" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-extrabold text-[#153C47]">
                Clinical Access Protocol
              </h3>
              <p className="text-xs text-[#52717A] leading-relaxed max-w-2xl font-medium">
                These assessment descriptions are published for informational purposes. To undertake an assessment, a patient must be registered by hospital medical staff and assigned the test under clinical supervision.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/patient"
              className="px-6 py-3 rounded-full text-xs font-bold text-[#153C47] bg-white hover:bg-slate-50 border border-slate-200 transition shadow-sm"
            >
              Patient Information
            </Link>
            <Link
              to="/login"
              className="px-6 py-3 rounded-full text-xs font-bold text-white bg-[#FF684A] hover:bg-[#e85538] transition shadow-md hover:scale-105 transform active:scale-95"
            >
              Patient Login
            </Link>
          </div>
        </div>
      </section>

      {/* Assessment Categories Directory with Colorful Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#008e7b]">
              Evaluation Domains
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#153C47] mt-1">
              Assessment Categories
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {standardCategories.map((cat, idx) => (
              <div
                key={idx}
                className={`bg-white rounded-3xl p-7 border border-slate-200 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between space-y-5 ${cat.borderTop}`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#153C47] bg-[#F7FBF8] px-2.5 py-1 rounded-lg border border-slate-200">
                      {cat.code}
                    </span>
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${cat.badgeClass}`}>
                      {cat.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-[#153C47]">
                    {cat.title}
                  </h3>

                  <p className="text-xs text-[#52717A] leading-relaxed font-medium">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-[#52717A]">
                  <div className="flex items-center gap-1.5 font-medium">
                    <Clock className="w-4 h-4 text-[#00BFA6]" />
                    <span>Est. Time: {cat.estimatedDuration}</span>
                  </div>
                  <span className="text-[11px] font-bold text-[#FF684A]">Prescription Required</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Assessments from Backend API (if available) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F7FBF8] rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <div>
              <h3 className="text-lg font-extrabold text-[#153C47]">
                Active Assessment Catalog Registry
              </h3>
              <p className="text-xs text-[#52717A] mt-0.5 font-medium">
                Real-time registry synced with hospital assessment servers.
              </p>
            </div>
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#f2faed] text-[#66b43e] border border-[#75C94B]/30">
              API Connection Active
            </span>
          </div>

          {loading ? (
            <div className="py-12 text-center text-xs text-[#52717A] space-y-2">
              <div className="w-6 h-6 border-2 border-[#00BFA6] border-t-transparent rounded-full animate-spin mx-auto"></div>
              <span>Connecting to assessment server...</span>
            </div>
          ) : tests.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tests.map((t, i) => (
                <div key={i} className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
                  <h4 className="text-xs font-bold text-[#153C47]">{t.name || t.title}</h4>
                  <p className="text-[11px] text-[#52717A] leading-normal">{t.description}</p>
                  <div className="pt-2 flex items-center justify-between text-[10px]">
                    <span className="text-[#00BFA6] font-bold">{t.category || 'General'}</span>
                    <span className="text-[#52717A]">Active in Portal</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-white border border-slate-200 text-center space-y-2">
              <Info className="w-5 h-5 text-[#00BFA6] mx-auto" />
              <p className="text-xs text-[#52717A] max-w-md mx-auto font-medium">
                Specific clinical test modules are enabled by your doctor upon assignment. Browse the general categories above or log in to view tests assigned to your record.
              </p>
            </div>
          )}
        </div>
      </section>

    </div>
  );
};
