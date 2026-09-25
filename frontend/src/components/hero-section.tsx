'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ShieldCheck,
  Activity,
  Calendar,
  Sparkles,
  HeartPulse,
  Bot,
  CheckCircle2,
} from 'lucide-react';

export function HeroSection({
  onOpenAIChat,
}: {
  onOpenAIChat?: () => void;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-slate-100 to-emerald-50/40 dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950/20 pt-16 pb-20 md:pt-24 md:pb-28 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      {/* Decorative Ambient Orbs */}
      <div
        className="absolute top-1/4 -left-20 w-96 h-96 bg-emerald-500/15 dark:bg-emerald-500/20 rounded-full blur-3xl pointer-events-none -translate-y-1/2"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 right-0 w-[450px] h-[450px] bg-cyan-500/15 dark:bg-cyan-500/20 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* LEFT COLUMN: Content & CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex flex-col items-start text-left"
          >
            {/* Top Pill Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs sm:text-sm font-semibold mb-6 backdrop-blur-md shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-emerald-500 animate-pulse" />
              <span>✨ Next-Gen Healthcare Platform</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-slate-900 dark:text-white mb-6"
            >
              Next-Generation Healthcare,{' '}
              <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 dark:from-emerald-400 dark:via-teal-300 dark:to-cyan-400 bg-clip-text text-transparent">
                Powered by AI.
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed mb-8"
            >
              Streamline patient care with real-time vitals monitoring, instant AI diagnostics, intelligent OCR medicine tracking, and automated appointment scheduling—all in one HIPAA-compliant platform.
            </motion.p>

            {/* Action Buttons (CTA) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10"
            >
              {/* Primary Button */}
              <Link
                href="/register"
                className="group relative px-7 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-600 to-emerald-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02] flex items-center justify-center gap-2 text-center"
              >
                <span>Start Free</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>

              {/* Secondary Button */}
              <Link
                href="/dashboard/patient"
                className="px-7 py-3.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800/80 text-slate-800 dark:text-slate-200 font-semibold text-sm transition-all duration-200 backdrop-blur-sm shadow-sm hover:scale-[1.02] text-center flex items-center justify-center gap-2"
              >
                <span>Explore Features</span>
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-200 dark:border-slate-800/80 w-full"
            >
              <button
                type="button"
                onClick={onOpenAIChat}
                className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium text-left hover:text-emerald-600 dark:hover:text-emerald-400 transition"
              >
                <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  <Activity className="w-4 h-4" />
                </div>
                <span>24/7 AI Diagnostic</span>
              </button>

              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
                <div className="p-1.5 rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span>HIPAA Secured Data</span>
              </div>

              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
                <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                  <Calendar className="w-4 h-4" />
                </div>
                <span>Instant Bookings</span>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN: Glassmorphism Showcase Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            className="relative flex justify-center items-center"
          >
            {/* Decorative Background Glow Blur */}
            <div
              className="absolute -z-10 inset-0 blur-3xl opacity-30 bg-emerald-500/30 dark:bg-emerald-400/20 rounded-full scale-110 pointer-events-none"
              aria-hidden="true"
            />

            {/* Glassmorphism Showcase Frame Container */}
            <div className="w-full relative rounded-3xl border border-white/40 dark:border-slate-800 backdrop-blur-xl bg-white/40 dark:bg-slate-900/50 shadow-2xl p-2.5 sm:p-4 transition-all duration-300 hover:border-emerald-500/30 dark:hover:border-emerald-500/30">
              {/* Inner Showcase Image */}
              <div className="relative overflow-hidden rounded-2xl aspect-[16/10] bg-slate-900/80 group">
                <Image
                  src="/hero-bg.png"
                  alt="SmartHealth AI Interface Showcase"
                  width={1200}
                  height={750}
                  priority
                  className="w-full h-full object-cover rounded-2xl transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />

                {/* Subtle Gradient Overlay for visual polish */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none rounded-2xl" />

                {/* Floating Glass Badges */}
                {/* Floating Badge 1: Top Right - Live Telemetry */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 backdrop-blur-md bg-white/70 dark:bg-slate-900/80 border border-white/40 dark:border-slate-700/80 rounded-xl px-3 py-2 shadow-lg flex items-center gap-2.5"
                >
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                  </span>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-semibold tracking-wider uppercase text-slate-500 dark:text-slate-400">
                      Live Telemetry
                    </span>
                    <span className="text-xs font-bold text-slate-900 dark:text-emerald-300 flex items-center gap-1">
                      <HeartPulse className="w-3.5 h-3.5 text-emerald-500" />
                      78 BPM • 98% SpO₂
                    </span>
                  </div>
                </motion.div>

                {/* Floating Badge 2: Bottom Left - AI Health Risk Score (Clickable Trigger) */}
                <motion.button
                  type="button"
                  onClick={onOpenAIChat}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 backdrop-blur-md bg-white/80 dark:bg-slate-900/85 border border-emerald-500/40 rounded-xl px-3 py-2 sm:px-4 sm:py-2.5 shadow-lg flex items-center gap-3 hover:scale-[1.03] transition-all cursor-pointer text-left"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-xs font-bold text-slate-900 dark:text-white">
                        AI Diagnostics Active
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-600 dark:text-slate-300">
                      Risk Score: <strong className="text-emerald-600 dark:text-emerald-400">Low (98% Normal)</strong>
                    </span>
                  </div>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
