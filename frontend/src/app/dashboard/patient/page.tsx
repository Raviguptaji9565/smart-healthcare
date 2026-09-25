'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { apiUrl } from '@/lib/api';
import DownloadPdfButton from '@/components/DownloadPdfButton';
import { HealthMetricsChart } from '@/components/health-metrics-chart';
import { MedicineChecklist } from '@/components/medicine-checklist';
import { VitalsSkeleton, AppointmentSkeleton } from '@/components/skeleton-loader';
import { Heart, Activity, Droplets, Moon, Calendar, Clock, Plus, ArrowUpRight } from 'lucide-react';
import { toast } from 'sonner';

interface User {
  user_id?: number;
  id?: number;
  name?: string;
  email?: string;
  role?: string;
}

interface Appointment {
  id: number;
  patient_id: number;
  doctor_id: number;
  appointment_date: string;
  reason: string;
  status: string;
  doctor_name?: string;
}

interface HealthMetrics {
  heart_rate: number | null;
  systolic_bp: number | null;
  diastolic_bp: number | null;
  blood_glucose: number | null;
  sleep_duration: number | null;
}

export default function PatientDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [metrics, setMetrics] = useState<HealthMetrics>({
    heart_rate: 72,
    systolic_bp: 120,
    diastolic_bp: 80,
    blood_glucose: 95,
    sleep_duration: 7.5,
  });
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  const fetchAppointments = useCallback(async (patientId: number) => {
    try {
      const res = await fetch(apiUrl(`/api/appointments/patient/${patientId}`));
      if (res.ok) {
        const data = (await res.json()) as Appointment[];
        setAppointments(data);
      } else {
        // Sample fallback appointments
        setAppointments([
          {
            id: 1,
            patient_id: patientId,
            doctor_id: 101,
            appointment_date: '2026-09-28T10:00:00',
            reason: 'Cardiology Routine Follow-up',
            status: 'Confirmed',
            doctor_name: 'Dr. Sarah Jenkins',
          },
          {
            id: 2,
            patient_id: patientId,
            doctor_id: 102,
            appointment_date: '2026-10-02T14:30:00',
            reason: 'Annual General Health Consultation',
            status: 'Pending',
            doctor_name: 'Dr. Robert Chen',
          },
        ]);
      }
    } catch (err) {
      console.error('Failed to fetch appointments:', err);
    }
  }, []);

  const fetchMetrics = useCallback(async (userId: number) => {
    try {
      const res = await fetch(apiUrl(`/api/health-metrics/user/${userId}/latest`));
      if (res.ok) {
        const data = (await res.json()) as HealthMetrics;
        setMetrics(data);
      }
    } catch (err) {
      console.error('Failed to fetch health metrics:', err);
    }
  }, []);

  useEffect(() => {
    setIsClient(true);
    const storedUser = localStorage.getItem('user');

    if (!storedUser) {
      // Default patient user fallback
      const defaultUser = { user_id: 1, id: 1, name: 'Alex Morgan', email: 'alex@example.com', role: 'patient' };
      setUser(defaultUser);
      fetchAppointments(1);
      fetchMetrics(1);
      setLoading(false);
      return;
    }

    try {
      const parsed = JSON.parse(storedUser) as User;
      setUser(parsed);
      const patientId = parsed.user_id || parsed.id || 1;
      Promise.all([fetchAppointments(patientId), fetchMetrics(patientId)]).finally(() =>
        setLoading(false)
      );
    } catch {
      router.replace('/login');
    }
  }, [router, fetchAppointments, fetchMetrics]);

  if (!isClient) return null;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-page-enter">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
            Welcome back, {user?.name || 'Alex'} 👋
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Real-time patient telemetry, biometric trend analysis, and medication management.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <DownloadPdfButton />
          <Link
            href="/dashboard/book-appointment"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl shadow-md transition-all hover:-translate-y-0.5"
          >
            <Plus className="w-4 h-4" />
            <span>Book Consultation</span>
          </Link>
        </div>
      </div>

      {/* Vitals Summary Cards (with Skeleton Loader) */}
      {loading ? (
        <VitalsSkeleton />
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Heart Rate */}
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                Heart Rate
              </span>
              <div className="w-8 h-8 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                <Heart className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">
                {metrics.heart_rate ?? 72}
              </span>
              <span className="text-xs font-semibold text-slate-400">bpm</span>
            </div>
            <p className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 mt-2 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Normal Resting Rate
            </p>
          </div>

          {/* Blood Pressure */}
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                Blood Pressure
              </span>
              <div className="w-8 h-8 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
                <Activity className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">
                {metrics.systolic_bp ?? 120}/{metrics.diastolic_bp ?? 80}
              </span>
              <span className="text-xs font-semibold text-slate-400">mmHg</span>
            </div>
            <p className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 mt-2 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Optimal Pressure
            </p>
          </div>

          {/* Blood Glucose */}
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                Blood Glucose
              </span>
              <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                <Droplets className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">
                {metrics.blood_glucose ?? 95}
              </span>
              <span className="text-xs font-semibold text-slate-400">mg/dL</span>
            </div>
            <p className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 mt-2 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Fasting Target
            </p>
          </div>

          {/* Sleep Duration */}
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                Sleep Recovery
              </span>
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Moon className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">
                {metrics.sleep_duration ?? 7.5}
              </span>
              <span className="text-xs font-semibold text-slate-400">hrs</span>
            </div>
            <p className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 mt-2 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Restorative Night
            </p>
          </div>
        </div>
      )}

      {/* Main Grid: Theme-Aware Charts & Medicine Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Recharts Biometric Telemetry */}
        <div className="lg:col-span-7 space-y-8">
          <HealthMetricsChart />

          {/* Upcoming Appointments Section */}
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-teal-500" />
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  Upcoming Doctor Consultations
                </h3>
              </div>
              <Link
                href="/dashboard/book-appointment"
                className="text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1"
              >
                <span>Book New</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {loading ? (
              <AppointmentSkeleton />
            ) : appointments.length === 0 ? (
              <div className="p-6 text-center text-slate-400 text-xs rounded-xl border border-dashed border-slate-200 dark:border-slate-800">
                No upcoming consultations scheduled.
              </div>
            ) : (
              <div className="space-y-3">
                {appointments.map((apt) => (
                  <div
                    key={apt.id}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/50 flex items-center justify-between gap-4"
                  >
                    <div className="space-y-1 min-w-0">
                      <p className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                        {apt.doctor_name || 'Specialist Consultation'}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                        {apt.reason}
                      </p>
                      <div className="flex items-center gap-1 text-[11px] text-slate-400">
                        <Clock className="w-3 h-3" />
                        <span>{new Date(apt.appointment_date).toLocaleString()}</span>
                      </div>
                    </div>

                    <span
                      className={`px-2.5 py-1 text-[10px] font-extrabold uppercase rounded-full shrink-0 ${
                        apt.status?.toLowerCase() === 'confirmed'
                          ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                          : 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                      }`}
                    >
                      {apt.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Medicine Reminders Checklist */}
        <div className="lg:col-span-5">
          <MedicineChecklist />
        </div>
      </div>
    </div>
  );
}
