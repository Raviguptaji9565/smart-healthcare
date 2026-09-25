'use client';

import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { ThemeToggle } from '@/components/theme-toggle';
import { AIChatDrawer } from '@/components/ai-chat-drawer';
import { SymptomCheckerModal } from '@/components/symptom-checker-modal';
import { toast } from 'sonner';
import {
  Code2,
  UserRound,
  X,
  Bot,
  Activity,
  LayoutDashboard,
  Calendar,
  Pill,
  Scan,
  Users,
  Stethoscope,
  LogOut,
  Menu,
} from 'lucide-react';

interface User {
  user_id?: number;
  id?: number;
  name?: string;
  email?: string;
  role?: string;
}

type ViewRole = 'patient' | 'doctor';

const NAV_ITEMS = [
  {
    label: 'Dashboard',
    href: '/dashboard/patient',
    icon: LayoutDashboard,
    roles: ['patient', 'doctor'],
    match: (p: string) => p === '/dashboard/patient' || p.startsWith('/dashboard/patient/'),
  },
  {
    label: 'AI Health Assistant',
    href: '#ai-chat',
    isAction: 'ai-chat',
    icon: Bot,
    roles: ['patient', 'doctor'],
    match: () => false,
  },
  {
    label: 'Risk Assessment',
    href: '#risk-checker',
    isAction: 'risk-checker',
    icon: Activity,
    roles: ['patient', 'doctor'],
    match: () => false,
  },
  {
    label: 'Scan Analyzer',
    href: '/dashboard/imaging',
    icon: Scan,
    roles: ['patient', 'doctor'],
    match: (p: string) => p === '/dashboard/imaging',
  },
  {
    label: 'Medicine Reminders',
    href: '/dashboard/medicines',
    icon: Pill,
    roles: ['patient'],
    match: (p: string) => p === '/dashboard/medicines',
  },
  {
    label: 'Book Appointment',
    href: '/dashboard/book-appointment',
    icon: Calendar,
    roles: ['patient'],
    match: (p: string) => p === '/dashboard/book-appointment',
  },
  {
    label: 'Doctor Portal',
    href: '/dashboard/doctor',
    icon: Stethoscope,
    roles: ['doctor'],
    match: (p: string) => p === '/dashboard/doctor' || p.startsWith('/dashboard/doctor/'),
  },
  {
    label: 'Project Team',
    href: '/dashboard/team',
    icon: Users,
    roles: ['patient', 'doctor'],
    match: (p: string) => p === '/dashboard/team',
  },
];

function DashboardContent({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState<ViewRole>('patient');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [developerProfileOpen, setDeveloperProfileOpen] = useState(false);
  const [developerProfileClosing, setDeveloperProfileClosing] = useState(false);

  // AI & Symptom Checker Drawer States
  const [aiDrawerOpen, setAiDrawerOpen] = useState(false);
  const [symptomModalOpen, setSymptomModalOpen] = useState(false);

  useEffect(() => {
    // Check RBAC Unauthorized Toast
    if (searchParams.get('unauthorized') === 'doctor_only') {
      toast.error('Access Denied: The Doctor Portal is restricted to authorized doctor accounts.');
    }
  }, [searchParams]);

  useEffect(() => {
    try {
      const storedUser = window.localStorage.getItem('user');
      if (!storedUser) {
        // Fallback default user for seamless experience
        const defaultUser = { user_id: 1, id: 1, name: 'Alex Morgan', email: 'alex@example.com', role: 'patient' };
        setUser(defaultUser);
        setActiveView('patient');
      } else {
        const parsedUser = JSON.parse(storedUser) as User;
        setUser(parsedUser);
        setActiveView((parsedUser.role as ViewRole) || 'patient');
      }
    } catch (error) {
      console.error('User authentication parse error:', error);
    } finally {
      setLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    window.localStorage.removeItem('user');
    document.cookie = 'smart_health_role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie = 'smart_health_user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    toast.info('Logged out successfully.');
    router.replace('/login');
  };

  const handleViewSwitch = (view: ViewRole) => {
    if (view === 'doctor' && user?.role !== 'doctor') {
      toast.error('Doctor Portal is restricted to authorized doctor accounts.');
      return;
    }
    setActiveView(view);
    router.push(view === 'doctor' ? '/dashboard/doctor' : '/dashboard/patient');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-slate-300 text-xs font-semibold">Loading SmartHealth AI Portal...</p>
        </div>
      </div>
    );
  }

  const visibleNav = NAV_ITEMS.filter((item) =>
    item.roles.includes(activeView)
  );

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden transition-colors duration-200">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-950/60 z-20 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ─── SIDEBAR ───────────────────────────────────────────── */}
      <aside
        className={`animate-slide-in-left
          fixed lg:static inset-y-0 left-0 z-30
          w-64 shrink-0 bg-slate-900 dark:bg-slate-950 text-white flex flex-col border-r border-slate-800
          transform transition-transform duration-200
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Logo */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-teal-500 flex items-center justify-center text-white font-bold text-base shadow-sm">
              +
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-none">SmartHealth AI</p>
              <p className="text-slate-400 text-[11px] mt-0.5">Clinical Telemetry</p>
            </div>
          </div>
        </div>

        {/* View Switcher */}
        <div className="px-4 py-3 border-b border-slate-800">
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1.5">
            Active Role
          </p>
          <div className="relative">
            <select
              value={activeView}
              onChange={(e) => handleViewSwitch(e.target.value as ViewRole)}
              className="w-full bg-slate-800 text-white text-xs font-semibold rounded-xl px-3 py-2 border border-slate-700 appearance-none cursor-pointer focus:outline-none focus:border-teal-500"
            >
              <option value="patient">Patient Portal View</option>
              <option value="doctor">Doctor Portal View</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-xs">▾</div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 py-3 px-3 space-y-1 overflow-y-auto">
          {visibleNav.map((item) => {
            const IconComponent = item.icon;
            const isActive = item.match(pathname);

            if (item.isAction === 'ai-chat') {
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => {
                    setSidebarOpen(false);
                    setAiDrawerOpen(true);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-teal-400 bg-teal-950/40 border border-teal-800/60 hover:bg-teal-900/60 transition-all text-left"
                >
                  <IconComponent className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            }

            if (item.isAction === 'risk-checker') {
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => {
                    setSidebarOpen(false);
                    setSymptomModalOpen(true);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-amber-400 bg-amber-950/30 border border-amber-800/50 hover:bg-amber-900/50 transition-all text-left"
                >
                  <IconComponent className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all
                  ${isActive
                    ? 'bg-teal-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                  }
                `}
              >
                <IconComponent className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Profile Footer */}
        <div className="border-t border-slate-800 px-4 py-3.5 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
              {(user?.name || 'U').charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-white text-xs font-bold truncate">{user?.name || 'Alex Morgan'}</p>
              <p className="text-slate-400 text-[11px] truncate capitalize">{user?.role || 'Patient'}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 text-xs py-2 rounded-xl bg-rose-950/40 text-rose-300 border border-rose-800/50 hover:bg-rose-900/60 transition font-semibold"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* ─── MAIN AREA ─────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Top Notice Bar */}
        <div className="bg-slate-900 text-slate-200 border-b border-slate-800 px-4 py-1.5 flex items-center justify-between text-[11px] shrink-0">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-teal-500 text-slate-950 text-[10px] font-extrabold">i</span>
            <span>Clinical decision-support system. Does not replace professional medical diagnosis.</span>
          </div>
        </div>

        {/* Dashboard Header */}
        <div className="flex items-center justify-between gap-3 px-4 py-3 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shrink-0 transition-colors duration-200 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white lg:hidden"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="font-extrabold text-slate-900 dark:text-slate-100 text-sm">
              SmartHealth <span className="text-teal-600 dark:text-teal-400">AI</span>
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Quick AI Trigger Button */}
            <button
              type="button"
              onClick={() => setAiDrawerOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300 text-xs font-bold hover:bg-teal-100 dark:hover:bg-teal-900/60 transition shadow-sm"
            >
              <Bot className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">AI Assistant</span>
            </button>

            {/* Prominent Theme Toggle */}
            <ThemeToggle variant="dropdown" />

            {/* Developer Profile Modal Button */}
            <button
              type="button"
              onClick={() => setDeveloperProfileOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 transition hover:border-teal-400 hover:text-teal-600 dark:hover:text-teal-400"
            >
              <UserRound className="h-3.5 w-3.5 text-teal-500" />
              <span className="hidden sm:inline">Developer Profile</span>
            </button>
          </div>
        </div>

        {/* Page Content Container */}
        <main className="relative flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950 animate-page-enter transition-colors duration-200">
          <div className="relative z-10 min-h-full">
            {children}
          </div>
        </main>
      </div>

      {/* AI Assistant Drawer Component */}
      <AIChatDrawer isOpen={aiDrawerOpen} onClose={() => setAiDrawerOpen(false)} />

      {/* Symptom Checker Modal Component */}
      <SymptomCheckerModal isOpen={symptomModalOpen} onClose={() => setSymptomModalOpen(false)} />

      {/* Developer Profile Dialog Modal */}
      {developerProfileOpen && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-sm ${
            developerProfileClosing ? 'modal-backdrop-exit' : 'modal-backdrop-enter'
          }`}
          onClick={() => setDeveloperProfileOpen(false)}
          role="presentation"
        >
          <section
            className="relative w-full max-w-sm rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 text-center text-slate-900 dark:text-white shadow-2xl backdrop-blur-xl"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <button
              type="button"
              onClick={() => setDeveloperProfileOpen(false)}
              className="absolute right-3 top-3 rounded-lg p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="mx-auto mb-4 h-20 w-20 overflow-hidden rounded-full border-2 border-teal-500 bg-gradient-to-br from-teal-500/30 to-blue-500/20 shadow-lg">
              <Image
                src="/images/ravi.jpg"
                alt="Ravi Gupta"
                width={80}
                height={80}
                className="h-full w-full scale-110 object-cover"
              />
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-600 dark:text-teal-400">Developer Profile</p>
            <h2 className="mt-2 text-xl font-bold">Ravi Gupta</h2>
            <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              B.Tech CSE (CCML) • 3rd Year | BBD University
            </p>
            <a
              href="https://github.com/Raviguptaji9565"
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 px-4 py-2.5 text-xs font-semibold transition hover:border-teal-500 text-slate-800 dark:text-slate-200"
            >
              <Code2 className="h-4 w-4" />
              View GitHub Profile
            </a>
          </section>
        </div>
      )}
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-slate-400">Loading Dashboard...</div>}>
      <DashboardContent>{children}</DashboardContent>
    </Suspense>
  );
}