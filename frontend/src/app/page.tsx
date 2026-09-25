import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { HeroSection } from '@/components/hero-section';
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

      {/* Hero Section Component */}
      <HeroSection />

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
