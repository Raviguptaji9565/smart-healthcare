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
    <div className="min-h-screen bg-white text-gray-800 flex flex-col animate-page-enter">

      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center font-bold text-lg text-white transition-transform duration-300 hover:rotate-12">
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

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950 pt-16 pb-24 px-6 sm:px-8 lg:px-12">
        {/* Ambient Glowing Background Orbs */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 animate-float" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-3xl pointer-events-none animate-float animate-delay-300" />

        {/* Matrix Grid Background Overlay */}
        <div className="hero-background absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
          <div className="hero-background__glow" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column - Hero Text & Action CTAs */}
            <div className="lg:col-span-7 flex flex-col items-start text-left pt-4 lg:pt-0">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-teal-400/10 border border-teal-400/30 text-xs sm:text-sm font-semibold text-teal-200 mb-6 backdrop-blur-md shadow-[0_0_15px_rgba(20,184,166,0.15)] animate-slide-in-left">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse shadow-[0_0_10px_#2dd4bf]" />
                Next-Gen Healthcare Platform
              </div>

              <h1 className="hero-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] mb-6 text-white">
                Next-Generation{' '}
                <span className="bg-gradient-to-r from-teal-300 via-cyan-200 to-teal-400 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(20,184,166,0.4)]">
                  Healthcare
                </span>{' '}
                for Everyone
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed mb-8 animate-page-enter animate-delay-200">
                Monitor real-time health metrics, schedule doctor consultations, automate medicine reminders, and unlock instant AI health insights — all in one unified, secure platform.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10 animate-page-enter animate-delay-300">
                <Link
                  href="/register"
                  className="px-8 py-3.5 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-[0_0_25px_rgba(20,184,166,0.4)] hover:shadow-[0_0_35px_rgba(20,184,166,0.6)] hover:-translate-y-0.5 text-center flex items-center justify-center gap-2"
                >
                  Start Free
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
                <Link
                  href="/login"
                  className="px-8 py-3.5 bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold rounded-xl transition-all duration-300 border border-slate-700/80 hover:border-teal-500/50 backdrop-blur-md text-center hover:-translate-y-0.5 shadow-md"
                >
                  Access Dashboard
                </Link>
              </div>

              {/* Feature Highlights Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-6 border-t border-slate-800/80 w-full animate-page-enter animate-delay-400">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300 font-medium">
                  <div className="w-2 h-2 rounded-full bg-teal-400 shadow-[0_0_8px_#2dd4bf]" />
                  24/7 AI Diagnostic
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300 font-medium">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8]" />
                  Instant Appointments
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300 font-medium col-span-2 sm:col-span-1">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                  HIPAA Secured Data
                </div>
              </div>
            </div>

            {/* Right Column - Futuristic Glowing AI Digital Brain Graphic */}
            <div className="lg:col-span-5 relative flex items-center justify-center mt-6 lg:mt-0">
              
              {/* Outer Neon Aura Glowing Base */}
              <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/20 via-cyan-400/25 to-blue-600/10 rounded-full blur-3xl transform scale-90 lg:scale-110 pointer-events-none animate-pulse" />

              {/* AI Brain Holographic Card Container */}
              <div className="relative w-full max-w-[460px] aspect-square flex items-center justify-center rounded-3xl p-6 bg-slate-900/60 border border-teal-500/30 backdrop-blur-xl shadow-[0_0_50px_rgba(20,184,166,0.25)] group hover:border-teal-400/60 transition-all duration-500">
                
                {/* Glowing Concentric Target Rings */}
                <div className="absolute inset-3 rounded-2xl border border-teal-500/20 pointer-events-none" />
                <div className="absolute inset-8 rounded-full border border-cyan-400/20 border-dashed animate-spin-slow pointer-events-none" />
                <div className="absolute inset-16 rounded-full border border-teal-300/15 pointer-events-none" />

                {/* SVG Digital AI Brain / Neural Network Visual */}
                <div className="relative w-full h-full flex items-center justify-center drop-shadow-[0_0_25px_rgba(20,184,166,0.5)]">
                  <svg
                    viewBox="0 0 500 500"
                    className="w-full h-full max-w-[380px] max-h-[380px] animate-float"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <linearGradient id="brainGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.9" />
                        <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#818cf8" stopOpacity="0.7" />
                      </linearGradient>
                      <linearGradient id="synapseLine" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.2" />
                        <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0.2" />
                      </linearGradient>
                      <filter id="neonShadow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="8" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                      </filter>
                    </defs>

                    {/* Left Hemisphere Neural Cortex Paths */}
                    <g filter="url(#neonShadow)" stroke="url(#brainGlow)" strokeWidth="2.5" strokeLinecap="round">
                      {/* Frontal & Temporal Lobe Circuits */}
                      <path d="M 230 110 C 170 100 120 140 110 200 C 100 250 120 300 150 330 C 180 360 220 370 240 370" className="tech-network__brain-path" />
                      <path d="M 220 130 C 180 130 145 160 140 210 C 135 250 155 285 180 310" className="tech-network__brain-path animate-delay-100" />
                      <path d="M 230 160 C 195 160 170 185 165 220 C 160 255 180 280 210 295" className="tech-network__brain-path animate-delay-200" />
                      
                      {/* Internal Synapse Interconnects */}
                      <path d="M 140 210 L 190 200 L 220 250 L 175 270 L 210 295" strokeWidth="1.5" strokeDasharray="4 4" className="tech-network__lines" />
                      <path d="M 180 140 L 210 180 L 165 220 L 230 220 L 220 330" strokeWidth="1.5" />
                    </g>

                    {/* Right Hemisphere Neural Cortex Paths */}
                    <g filter="url(#neonShadow)" stroke="url(#brainGlow)" strokeWidth="2.5" strokeLinecap="round">
                      {/* Parietal & Occipital Lobe Circuits */}
                      <path d="M 270 110 C 330 100 380 140 390 200 C 400 250 380 300 350 330 C 320 360 280 370 260 370" className="tech-network__brain-path" />
                      <path d="M 280 130 C 320 130 355 160 360 210 C 365 250 345 285 320 310" className="tech-network__brain-path animate-delay-100" />
                      <path d="M 270 160 C 305 160 330 185 335 220 C 340 255 320 280 290 295" className="tech-network__brain-path animate-delay-200" />

                      {/* Internal Synapse Interconnects */}
                      <path d="M 360 210 L 310 200 L 280 250 L 325 270 L 290 295" strokeWidth="1.5" strokeDasharray="4 4" className="tech-network__lines" />
                      <path d="M 320 140 L 290 180 L 335 220 L 270 220 L 280 330" strokeWidth="1.5" />
                    </g>

                    {/* Central Brain Stem & Corpus Callosum AI Bridge */}
                    <g stroke="url(#synapseLine)" strokeWidth="2">
                      <line x1="230" y1="160" x2="270" y2="160" />
                      <line x1="210" y1="200" x2="290" y2="200" />
                      <line x1="220" y1="250" x2="280" y2="250" />
                      <line x1="210" y1="295" x2="290" y2="295" />
                      <line x1="240" y1="370" x2="260" y2="370" />
                      <path d="M 250 370 L 250 430" stroke="#38bdf8" strokeWidth="3" strokeDasharray="6 6" className="animate-pulse" />
                    </g>

                    {/* Neural Synapse Nodes (Glowing Dots) */}
                    <g fill="#2dd4bf" filter="url(#neonShadow)">
                      <circle cx="250" cy="110" r="5" className="animate-ping" />
                      <circle cx="230" cy="110" r="4" />
                      <circle cx="270" cy="110" r="4" />
                      <circle cx="140" cy="210" r="4.5" />
                      <circle cx="360" cy="210" r="4.5" />
                      <circle cx="190" cy="200" r="3.5" />
                      <circle cx="310" cy="200" r="3.5" />
                      <circle cx="220" cy="250" r="5" fill="#38bdf8" />
                      <circle cx="280" cy="250" r="5" fill="#38bdf8" />
                      <circle cx="175" cy="270" r="3.5" />
                      <circle cx="325" cy="270" r="3.5" />
                      <circle cx="150" cy="330" r="4" />
                      <circle cx="350" cy="330" r="4" />
                      <circle cx="250" cy="250" r="7" fill="#67e8f9" className="animate-pulse" />
                    </g>

                    {/* Orbiting Matrix Data Streams / Floating Nodes */}
                    <g fill="#38bdf8" opacity="0.8">
                      <circle cx="80" cy="180" r="2.5" className="animate-ping" />
                      <circle cx="420" cy="180" r="2.5" className="animate-ping animate-delay-300" />
                      <circle cx="90" cy="310" r="3" />
                      <circle cx="410" cy="310" r="3" />
                      <circle cx="250" cy="70" r="3.5" fill="#2dd4bf" />
                    </g>
                  </svg>
                </div>

                {/* Floating Holographic Status Cards */}
                
                {/* Top-Right Badge: AI Health Engine Active */}
                <div className="absolute -top-3 -right-3 sm:top-4 sm:right-4 px-3.5 py-2 rounded-xl bg-slate-900/90 border border-teal-400/40 text-xs font-semibold text-teal-200 backdrop-blur-md shadow-[0_0_20px_rgba(20,184,166,0.3)] flex items-center gap-2 animate-float">
                  <div className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse shadow-[0_0_8px_#2dd4bf]" />
                  <span>Gemini AI Health Core</span>
                </div>

                {/* Bottom-Left Badge: Real-Time Diagnostic Accuracy */}
                <div className="absolute -bottom-3 -left-3 sm:bottom-4 sm:left-4 px-3.5 py-2 rounded-xl bg-slate-900/90 border border-cyan-400/40 text-xs font-semibold text-cyan-200 backdrop-blur-md shadow-[0_0_20px_rgba(56,189,248,0.3)] flex items-center gap-2 animate-float animate-delay-300">
                  <svg className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>99.4% Diagnostic Accuracy</span>
                </div>

              </div>
            </div>

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
                className="bg-white border border-gray-200 rounded-2xl p-6 hover:-translate-y-1 hover:shadow-md hover:border-gray-300 transition-all animate-page-enter"
                style={{ animationDelay: `${(STATS.length + FEATURES.indexOf(f)) * 70}ms` }}
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
