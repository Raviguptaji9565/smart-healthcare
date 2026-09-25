'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import {
  Activity,
  ScanLine,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowUpRight,
  HeartPulse,
  Bot,
  UserCheck,
  FileText,
} from 'lucide-react';

const VITALS_DATA = [
  { time: '08:00', heartRate: 72, spo2: 98, bp: 118 },
  { time: '10:00', heartRate: 76, spo2: 99, bp: 121 },
  { time: '12:00', heartRate: 82, spo2: 97, bp: 124 },
  { time: '14:00', heartRate: 75, spo2: 98, bp: 119 },
  { time: '16:00', heartRate: 78, spo2: 98, bp: 120 },
  { time: '18:00', heartRate: 74, spo2: 99, bp: 117 },
  { time: '20:00', heartRate: 71, spo2: 98, bp: 118 },
];

export function FeaturesBentoGrid({
  onOpenAIChat,
}: {
  onOpenAIChat?: () => void;
}) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scannedMed, setScannedMed] = useState([
    { id: 1, name: 'Amoxicillin 500mg', schedule: '8:00 AM & 8:00 PM', done: true },
    { id: 2, name: 'Atorvastatin 20mg', schedule: '9:00 PM Bedtime', done: true },
    { id: 3, name: 'Metformin 850mg', schedule: '1:00 PM with lunch', done: false },
  ]);
  const [selectedSlot, setSelectedSlot] = useState('10:00 AM');

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === 'dark' : true;
  const strokeColor = isDark ? '#10b981' : '#059669';
  const fillColor = isDark ? 'rgba(16, 185, 129, 0.15)' : 'rgba(16, 185, 129, 0.12)';

  const toggleMed = (id: number) => {
    setScannedMed((prev) =>
      prev.map((m) => (m.id === id ? { ...m, done: !m.done } : m))
    );
  };

  return (
    <section id="features" className="py-20 bg-slate-50/50 dark:bg-slate-950/60 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
            <span>Next-Gen Clinical Features</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Engineered for Modern Healthcare & Precision AI
          </h2>
          <p className="mt-4 text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Discover a unified suite of continuous vitals telemetry, intelligent prescription OCR, automated appointments, and real-time clinical triage.
          </p>
        </motion.div>

        {/* Bento Grid Layout (3 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* CARD 1: Real-Time Vitals Tracking (Span 2) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-2 relative group rounded-3xl bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 hover:border-emerald-500/40 dark:hover:border-emerald-500/40 transition-all duration-300 shadow-xl flex flex-col justify-between overflow-hidden"
          >
            {/* Subtle Gradient Glow */}
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-500/15 transition-all" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center justify-center font-bold">
                  <Activity className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Live Syncing • 60 FPS
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Real-Time Vitals Telemetry & Continuous Sync
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-6 max-w-xl">
                Continuous streaming from wearable sensors, blood oxygen monitors, and ECG devices with sub-second latency and predictive anomaly detection.
              </p>
            </div>

            {/* Vitals Summary Pill Badges */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Heart Rate</span>
                <span className="text-sm sm:text-base font-extrabold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <HeartPulse className="w-4 h-4 text-emerald-500 inline" /> 78 BPM
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Oxygen (SpO₂)</span>
                <span className="text-sm sm:text-base font-extrabold text-teal-600 dark:text-teal-400">
                  98% Normal
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Blood Pressure</span>
                <span className="text-sm sm:text-base font-extrabold text-cyan-600 dark:text-cyan-400">
                  120/80 mmHg
                </span>
              </div>
            </div>

            {/* Recharts Mini Area Chart */}
            <div className="w-full h-44 sm:h-52 pt-2">
              {mounted && (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={VITALS_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="vitalsGlow" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={strokeColor} stopOpacity={0.4} />
                        <stop offset="95%" stopColor={strokeColor} stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="time" stroke={isDark ? '#64748b' : '#94a3b8'} fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis domain={[60, 95]} hide />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: isDark ? '#0f172a' : '#ffffff',
                        borderColor: isDark ? '#334155' : '#e2e8f0',
                        borderRadius: '12px',
                        fontSize: '12px',
                        color: isDark ? '#f8fafc' : '#0f172a',
                        boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                      }}
                      formatter={(val: any) => [`${val} BPM`, 'Heart Rate']}
                    />
                    <Area type="monotone" dataKey="heartRate" stroke={strokeColor} strokeWidth={2.5} fillOpacity={1} fill="url(#vitalsGlow)" />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </motion.div>

          {/* CARD 2: OCR Medicine Scanner (Span 1) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-1 relative group rounded-3xl bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 hover:border-emerald-500/40 dark:hover:border-emerald-500/40 transition-all duration-300 shadow-xl flex flex-col justify-between overflow-hidden"
          >
            <div>
              <div className="w-10 h-10 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20 flex items-center justify-center font-bold mb-4">
                <ScanLine className="w-5 h-5" />
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                OCR Prescription Scanner
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                Scan prescription labels with optical character recognition to extract dosages & auto-build reminder checklists.
              </p>
            </div>

            {/* Micro Medicine Checklist */}
            <div className="space-y-2.5 bg-slate-50 dark:bg-slate-800/50 p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-700/60">
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1">
                <span>SCANNED PRESCRIPTION</span>
                <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> OCR Verified
                </span>
              </div>

              {scannedMed.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => toggleMed(m.id)}
                  className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center justify-between gap-2 text-xs ${
                    m.done
                      ? 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-200'
                      : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300 font-semibold'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-md border flex items-center justify-center ${m.done ? 'bg-emerald-500 text-white border-emerald-500' : 'border-slate-400'}`}>
                      {m.done && <CheckCircle2 className="w-3 h-3" />}
                    </div>
                    <div>
                      <p className={`font-medium ${m.done ? 'line-through text-slate-400 dark:text-slate-500' : ''}`}>{m.name}</p>
                      <p className="text-[10px] text-slate-400">{m.schedule}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>

          {/* CARD 3: Smart Appointment Scheduling (Span 1) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:col-span-1 relative group rounded-3xl bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 hover:border-emerald-500/40 dark:hover:border-emerald-500/40 transition-all duration-300 shadow-xl flex flex-col justify-between overflow-hidden"
          >
            <div>
              <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 flex items-center justify-center font-bold mb-4">
                <Calendar className="w-5 h-5" />
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                Instant Doctor Queue & Booking
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                Connect with specialist physicians with real-time queue position tracking and instant slot bookings.
              </p>
            </div>

            {/* Doctor Card & Slot Picker Preview */}
            <div className="bg-slate-50 dark:bg-slate-800/50 p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-700/60">
              <div className="flex items-center gap-3 mb-3 pb-3 border-b border-slate-200 dark:border-slate-700">
                <div className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold text-xs">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">Dr. Sarah Jenkins</h4>
                  <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">Cardiology • Online Now</p>
                </div>
              </div>

              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Available Today</p>
              <div className="grid grid-cols-3 gap-1.5 mb-3">
                {['10:00 AM', '02:30 PM', '04:15 PM'].map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedSlot(slot)}
                    className={`py-1.5 px-2 rounded-lg text-[11px] font-semibold transition ${
                      selectedSlot === slot
                        ? 'bg-teal-600 text-white shadow-sm'
                        : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-teal-500'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>

              <button
                type="button"
                className="w-full py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold shadow-sm transition flex items-center justify-center gap-1.5"
              >
                <span>Confirm Booking ({selectedSlot})</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>

          {/* CARD 4: AI Symptom Risk Assessment & Clinical AI (Span 2) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="md:col-span-2 relative group rounded-3xl bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 hover:border-emerald-500/40 dark:hover:border-emerald-500/40 transition-all duration-300 shadow-xl flex flex-col justify-between overflow-hidden"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 flex items-center justify-center font-bold">
                  <Bot className="w-5 h-5" />
                </div>
                {onOpenAIChat && (
                  <button
                    type="button"
                    onClick={onOpenAIChat}
                    className="px-3.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold transition shadow-sm flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Launch AI Assistant</span>
                  </button>
                )}
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2">
                24/7 AI Health Assistant & Dynamic Triage
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-6 max-w-xl">
                Interactive clinical assessment questionnaire calculates dynamic Risk Scores with actionable medical advice and HIPAA-compliant data encryption.
              </p>
            </div>

            {/* Risk Score Progress Bar & Highlights */}
            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/60">
              <div className="flex items-center justify-between mb-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  Clinical Health Index
                </span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                  Low Risk Score (98% Normal)
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mb-4">
                <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full w-[94%]" />
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-medium text-slate-600 dark:text-slate-400">
                <div className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="block text-emerald-600 dark:text-emerald-400 font-bold">24/7</span> Streaming AI
                </div>
                <div className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="block text-teal-600 dark:text-teal-400 font-bold">HIPAA</span> Encrypted
                </div>
                <div className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="block text-cyan-600 dark:text-cyan-400 font-bold">OCR</span> Medical Scan
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
