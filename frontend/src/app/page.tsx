import Link from 'next/link';

const FEATURES = [
  {
    icon: '📅',
    title: 'Smart Appointment Booking',
    desc: 'Book consultations with specialist doctors in seconds. Real-time status tracking and confirmation.',
    color: 'bg-blue-100 text-blue-600 border-blue-200',
  },
  {
    icon: '📊',
    title: 'Health Metrics Tracking',
    desc: 'Monitor heart rate, blood pressure, glucose, and sleep — all in one unified health dashboard.',
    color: 'bg-teal-100 text-teal-600 border-teal-200',
  },
  {
    icon: '🤖',
    title: 'AI Health Assistant',
    desc: 'Get instant answers to health questions from our AI assistant, available 24/7.',
    color: 'bg-purple-100 text-purple-600 border-purple-200',
  },
  {
    icon: '⚠️',
    title: 'Risk Assessment',
    desc: 'AI-powered health risk scoring analyzes your vitals and flags potential health concerns early.',
    color: 'bg-amber-100 text-amber-600 border-amber-200',
  },
  {
    icon: '💊',
    title: 'Medicine Reminders',
    desc: 'Never miss a dose. Track daily medications and mark them as taken with a single click.',
    color: 'bg-emerald-100 text-emerald-600 border-emerald-200',
  },
  {
    icon: '🩺',
    title: 'Doctor Clinical Portal',
    desc: 'Doctors can manage patient queues, confirm appointments, and track their daily schedule.',
    color: 'bg-rose-100 text-rose-600 border-rose-200',
  },
];

const STATS = [
  { value: '15+', label: 'API Endpoints' },
  { value: '4', label: 'Health Models' },
  { value: '8+', label: 'App Pages' },
  { value: '2', label: 'User Roles' },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col">

      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center font-bold text-lg text-white">
              +
            </div>
            <span className="text-lg font-bold text-gray-800">
              SmartHealth<span className="text-teal-600"> AI</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-500">
            <Link href="#features" className="hover:text-teal-600 transition">Features</Link>
            <Link href="/dashboard/patient" className="hover:text-teal-600 transition">Patient Portal</Link>
            <Link href="/dashboard/doctor" className="hover:text-teal-600 transition">Doctor Portal</Link>
          </nav>

          <div className="flex items-center gap-2.5">
            <Link
              href="/login"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg transition"
            >
              Log in
            </Link>
            <Link
              href="/register"
              className="text-sm font-semibold bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition shadow-sm"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-50 via-white to-blue-50 pt-20 pb-24 px-6">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-100/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-xs font-semibold text-teal-700 mb-6">
            <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
            AI-Powered Healthcare Management System
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight mb-6">
            Next-Generation{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-emerald-600">
              Healthcare
            </span>{' '}
            for Everyone
          </h1>

          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed mb-8">
            Monitor your health metrics, book appointments, track medications, and get AI health insights —
            all in one professional platform designed for patients and doctors.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="w-full sm:w-auto px-8 py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl transition shadow-lg shadow-teal-600/20 text-center"
            >
              Start Free →
            </Link>
            <Link
              href="/login"
              className="w-full sm:w-auto px-8 py-3.5 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-xl transition border border-gray-200 text-center"
            >
              Access Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 bg-gray-900">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-bold text-teal-400">{stat.value}</p>
                <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Everything You Need</h2>
            <p className="text-gray-500 text-sm mt-2 max-w-md mx-auto">
              A comprehensive suite of tools for modern healthcare management
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md hover:border-gray-300 transition-all"
              >
                <div className={`w-11 h-11 rounded-xl border flex items-center justify-center text-xl mb-4 ${f.color}`}>
                  {f.icon}
                </div>
                <h3 className="font-bold text-gray-800 mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-teal-600">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Ready to take control of your health?
          </h2>
          <p className="text-teal-100 text-sm mb-8 max-w-md mx-auto">
            Join SmartHealth AI and access your personal health dashboard, AI assistant, and appointment manager.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/register"
              className="px-6 py-3 bg-white text-teal-700 hover:bg-teal-50 font-semibold rounded-xl transition text-sm"
            >
              Create Patient Account
            </Link>
            <Link
              href="/dashboard/patient"
              className="px-6 py-3 bg-teal-700 hover:bg-teal-800 text-white font-semibold rounded-xl transition text-sm border border-teal-500"
            >
              View Demo Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8 px-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-md bg-teal-600 flex items-center justify-center text-white text-xs font-bold">+</div>
          <span className="font-bold text-gray-700">SmartHealth AI</span>
        </div>
        <p className="text-xs text-gray-400">© 2026 SmartHealth AI — AI-Powered Healthcare Platform. For informational purposes only.</p>
      </footer>
    </div>
  );
}
