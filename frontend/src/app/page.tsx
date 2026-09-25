'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { HeroSection } from '@/components/hero-section';
import { FeaturesBentoGrid } from '@/components/features-bento-grid';
import { AIChatDrawer } from '@/components/ai-chat-drawer';
import { Bot, Sparkles, Calendar, Activity, Pill, ShieldCheck, Stethoscope } from 'lucide-react';

const STATS = [
  { value: '99.8%', label: 'Vitals Uptime' },
  { value: '4', label: 'Health Models' },
  { value: '24/7', label: 'AI Availability' },
  { value: '2', label: 'User Roles' },
];

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col transition-colors duration-200 animate-page-enter">
      {/* Main Navbar */}
      <header className="border-b border-border bg-background/80 sticky top-0 z-50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-teal-600 flex items-center justify-center font-bold text-lg text-white transition-transform duration-300 hover:rotate-12">
              +
            </div>
            <span className="text-lg font-bold">
              SmartHealth<span className="text-teal-600 dark:text-teal-400"> AI</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <Link href="#features" className="hover:text-primary transition">
              Features
            </Link>
            <Link href="/dashboard/patient" className="hover:text-primary transition">
              Patient Portal
            </Link>
            <Link href="/dashboard/doctor" className="hover:text-primary transition">
              Doctor Portal
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            {/* AI Assistant Quick Trigger */}
            <button
              type="button"
              onClick={() => setIsChatOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 text-xs font-semibold hover:bg-emerald-500/20 transition"
            >
              <Bot className="w-3.5 h-3.5" />
              <span>AI Chat</span>
            </button>

            {/* Theme Switcher */}
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
      <HeroSection onOpenAIChat={() => setIsChatOpen(true)} />

      {/* Apple/Vercel Bento Grid Features Section */}
      <FeaturesBentoGrid onOpenAIChat={() => setIsChatOpen(true)} />

      {/* Key Performance Stats Section */}
      <section className="py-12 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-extrabold text-teal-600 dark:text-teal-400">
                  {stat.value}
                </p>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Floating Action Button for Mobile / Quick AI Access */}
      <button
        type="button"
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-6 right-6 z-40 p-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-600 to-cyan-500 text-white shadow-2xl hover:scale-105 transition-all duration-200 flex items-center gap-2 font-semibold text-xs border border-white/30 backdrop-blur-md"
        aria-label="Open AI Assistant"
      >
        <Bot className="w-5 h-5 animate-bounce" />
        <span className="hidden sm:inline">Ask AI Doctor</span>
      </button>

      {/* Slide-Out AI Health Assistant Drawer */}
      <AIChatDrawer isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-8 px-6 text-center mt-auto bg-slate-50 dark:bg-slate-950">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-md bg-teal-600 flex items-center justify-center text-white text-xs font-bold">
            +
          </div>
          <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">
            SmartHealth AI
          </span>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          © 2026 SmartHealth AI — Clinical Decision Support & Telemetry System.
        </p>
      </footer>
    </div>
  );
}
