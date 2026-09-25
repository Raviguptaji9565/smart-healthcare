import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { Activity, ShieldCheck, Heart, Calendar, Pill, Stethoscope, ArrowRight, Bot } from 'lucide-react';

const FEATURES = [
  {
    icon: Calendar,
    title: 'Smart Appointment Booking',
    desc: 'Book consultations with specialist doctors in seconds. Real-time status tracking and instant confirmation.',
    color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800',
  },
  {
    icon: Activity,
    title: 'Health Metrics Tracking',
    desc: 'Monitor heart rate, blood pressure, glucose, and sleep trends — all in one unified health telemetry dashboard.',
    color: 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-200 dark:border-teal-800',
  },
  {
    icon: Bot,
    title: 'Streaming AI Assistant',
    desc: 'Get instant, evidence-based answers to health queries with our Vercel AI SDK powered 24/7 assistant.',
    color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800',
  },
  {
    icon: ShieldCheck,
    title: 'Symptom Risk Assessment',
    desc: 'Interactive 4-step health questionnaire calculates dynamic Risk Scores (Low, Moderate, High) with actionable advice.',
    color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800',
  },
  {
    icon: Pill,
    title: 'Medicine Reminders & OCR',
    desc: 'Track daily medication adherence with single-click updates and OCR prescription image scan extraction.',
    color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800',
  },
  {
    icon: Stethoscope,
    title: 'Doctor Clinical Portal',
    desc: 'Physicians manage patient queues, review vital trends, confirm appointments, and log clinical notes seamlessly.',
    color: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800',
  },
];

const STATS = [
  { value: '99.8%', label: 'Vitals Uptime' },
  { value: '4', label: 'Health Models' },
  { value: '24/7', label: 'AI Availability' },
  { value: '2', label: 'User Roles' },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col transition-colors duration-200 animate-page-enter">

      {/* Main Navbar */}
      <header className="border-b border-border bg-background/80 sticky top-0 z-50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-teal-600 flex items-center justify-center font-bold text-lg text-white transition-transform duration-300 hover:rotate-12">
              +
            </div>
            <span className="text-lg font-bold">
              SmartHealth<span className="text-teal-600 dark:text-teal-400"> AI</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <Link href="#features" className="hover:text-primary transition">Features</Link>
            <Link href="/dashboard/patient" className="hover:text-primary transition">Patient Portal</Link>
            <Link href="/dashboard/doctor" className="hover:text-primary transition">Doctor Portal</Link>
          </nav>

          <div className="flex items-center gap-3">
            {/* Prominent Theme Switcher */}
            <ThemeToggle variant="dropdown" />

            <Link
              href="/login"
              className="text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white px-3 py-2 rounded-xl transition"
            >
              Log in
            </Link>
            <Link
              href="/register"
              className="text-xs font-semibold bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-xl transition shadow-sm"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-slate-100 to-teal-50 dark:from-slate-950 dark:via-slate-900 dark:to-teal-950 pt-16 pb-24 px-6 sm:px-8 lg:px-12 transition-colors duration-200">
        {/* Ambient Orbs */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-teal-500/10 dark:bg-teal-500/15 rounded-full blur-3xl pointer-events-none -translate-y-1/2 animate-float" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-cyan-500/10 dark:bg-cyan-500/15 rounded-full blur-3xl pointer-events-none animate-float animate-delay-300" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column - Hero Text */}
            <div className="lg:col-span-7 flex flex-col items-start text-left pt-4 lg:pt-0">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/30 text-xs sm:text-sm font-semibold text-teal-700 dark:text-teal-300 mb-6 backdrop-blur-md shadow-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse" />
                Production-Grade Healthcare Platform
              </div>

              <h1 className="hero-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] mb-6">
                Next-Generation{' '}
                <span className="bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-500 dark:from-teal-300 dark:via-cyan-200 dark:to-teal-400 bg-clip-text text-transparent">
                  Healthcare
                </span>{' '}
                for Everyone
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed mb-8">
                Monitor real-time health metrics, schedule doctor consultations, automate medicine reminders with OCR scanning, and unlock AI health risk assessment — all in one unified, secure platform.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
                <Link
                  href="/register"
                  className="px-8 py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-md hover:-translate-y-0.5 text-center flex items-center justify-center gap-2 text-sm"
                >
                  Start Free Patient Trial
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/dashboard/patient"
                  className="px-8 py-3.5 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold rounded-xl transition-all duration-200 border border-slate-200 dark:border-slate-700 text-center hover:-translate-y-0.5 text-sm shadow-sm"
                >
                  Explore Patient Dashboard
                </Link>
              </div>

              {/* Feature Highlights Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-6 border-t border-slate-200 dark:border-slate-800 w-full">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium">
                  <div className="w-2 h-2 rounded-full bg-teal-500" />
                  AI Diagnostic Engine
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium">
                  <div className="w-2 h-2 rounded-full bg-cyan-500" />
                  Real-Time Vitals Sync
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium col-span-2 sm:col-span-1">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  Patient Monitoring Grid
                </div>
              </div>
            </div>

            {/* Right Column - Refactored Realistic AI Digital Brain Graphic */}
            <div className="lg:col-span-5 relative flex items-center justify-center mt-6 lg:mt-0">
              
              {/* Outer Neon Aura Glowing Base */}
              <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/20 via-cyan-400/20 to-blue-500/10 rounded-full blur-3xl transform scale-90 lg:scale-110 pointer-events-none animate-pulse" />

              {/* AI Brain Holographic Card Container */}
              <div className="relative w-full max-w-[460px] aspect-square flex items-center justify-center rounded-3xl p-6 bg-white/70 dark:bg-slate-900/60 border border-teal-500/30 backdrop-blur-xl shadow-2xl group transition-all duration-500">
                
                {/* SVG Visual */}
                <div className="relative w-full h-full flex items-center justify-center">
                  <svg
                    viewBox="0 0 500 500"
                    className="w-full h-full max-w-[360px] max-h-[360px] animate-float"
                    fill="none"
                  >
                    <defs>
                      <linearGradient id="brainGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.9" />
                        <stop offset="50%" stopColor="#0284c7" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.7" />
                      </linearGradient>
                    </defs>

                    <g stroke="url(#brainGlow)" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M 230 110 C 170 100 120 140 110 200 C 100 250 120 300 150 330 C 180 360 220 370 240 370" />
                      <path d="M 270 110 C 330 100 380 140 390 200 C 400 250 380 300 350 330 C 320 360 280 370 260 370" />
                    </g>
                    <g fill="#14b8a6">
                      <circle cx="250" cy="110" r="5" className="animate-ping" />
                      <circle cx="140" cy="210" r="5" />
                      <circle cx="360" cy="210" r="5" />
                      <circle cx="250" cy="250" r="7" className="animate-pulse" />
                    </g>
                  </svg>
                </div>

                {/* Floating Realistic Healthcare Badges (REPLACED SCI-FI PLACEHOLDERS) */}
                
                {/* Top-Right Badge: AI Diagnostic Engine */}
                <div className="absolute -top-3 -right-3 sm:top-3 sm:right-3 px-3.5 py-2 rounded-xl bg-white/90 dark:bg-slate-900/90 border border-teal-500/40 text-xs font-semibold text-teal-800 dark:text-teal-200 backdrop-blur-md shadow-lg flex items-center gap-2 animate-float">
                  <div className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse" />
                  <span>AI Diagnostic Engine</span>
                </div>

                {/* Bottom-Left Badge: Real-Time Vitals Sync */}
                <div className="absolute -bottom-3 -left-3 sm:bottom-3 sm:left-3 px-3.5 py-2 rounded-xl bg-white/90 dark:bg-slate-900/90 border border-cyan-500/40 text-xs font-semibold text-cyan-800 dark:text-cyan-200 backdrop-blur-md shadow-lg flex items-center gap-2 animate-float animate-delay-300">
                  <Activity className="w-4 h-4 text-cyan-500 animate-pulse" />
                  <span>Real-Time Vitals Sync</span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-10 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-extrabold text-teal-600 dark:text-teal-400">{stat.value}</p>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
            Comprehensive Clinical & Patient Capabilities
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 max-w-lg mx-auto">
            Engineered with App Router Next.js 16, TypeScript, Tailwind CSS, and Vercel AI SDK
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f) => {
            const IconComponent = f.icon;
            return (
              <div
                key={f.title}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:-translate-y-1 hover:shadow-md transition-all"
              >
                <div className={`w-11 h-11 rounded-xl border flex items-center justify-center text-xl mb-4 ${f.color}`}>
                  <IconComponent className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-2 text-base">{f.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-8 px-6 text-center mt-auto">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-md bg-teal-600 flex items-center justify-center text-white text-xs font-bold">+</div>
          <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">SmartHealth AI</span>
        </div>
        <p className="text-xs text-slate-400">© 2026 SmartHealth AI — Clinical AI Decision Support System.</p>
      </footer>
    </div>
  );
}
