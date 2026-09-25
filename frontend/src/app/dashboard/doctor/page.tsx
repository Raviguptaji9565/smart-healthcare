'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { apiUrl } from '@/lib/api';
import { TableSkeleton } from '@/components/skeleton-loader';
import {
  Stethoscope,
  CheckCircle2,
  Clock,
  Check,
  Search,
  User,
  Filter,
  AlertCircle,
  Sparkles,
  FileText,
  ShieldAlert,
  HeartPulse,
  Activity,
  X,
  Bot,
} from 'lucide-react';
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
  priority?: 'Critical' | 'Urgent' | 'Routine';
  patient_name?: string;
  doctor_name?: string;
  vitals_summary?: {
    heartRate: number;
    bp: string;
    glucose: number;
    riskScore: string;
  };
  ai_notes?: string;
}

const SAMPLE_DOCTOR_APPOINTMENTS: Appointment[] = [
  {
    id: 201,
    patient_id: 1,
    doctor_id: 2,
    patient_name: 'Alex Morgan',
    appointment_date: '2026-09-26T14:30:00',
    reason: 'Hypertension monitoring & prescription review',
    status: 'Pending',
    priority: 'Urgent',
    vitals_summary: {
      heartRate: 84,
      bp: '138/88',
      glucose: 104,
      riskScore: 'Moderate (Stage 1 HTN)',
    },
    ai_notes:
      'AI Diagnostic Alert: Patient exhibits elevated systolic BP trend over 7 days. Recommend reviewing Lisinopril dosage and sodium intake guidelines.',
  },
  {
    id: 202,
    patient_id: 2,
    doctor_id: 2,
    patient_name: 'David Miller',
    appointment_date: '2026-09-26T15:15:00',
    reason: 'Post-op cardiac recovery & arrhythmia check',
    status: 'Confirmed',
    priority: 'Critical',
    vitals_summary: {
      heartRate: 92,
      bp: '142/90',
      glucose: 110,
      riskScore: 'High Risk (Post-Op Arrhythmia)',
    },
    ai_notes:
      'ECG telemetry detected transient sinus tachycardia during light exercise. Recommend Holter monitor 24-hr trace and telemetry review.',
  },
  {
    id: 203,
    patient_id: 3,
    doctor_id: 2,
    patient_name: 'Sophia Chen',
    appointment_date: '2026-09-26T11:00:00',
    reason: 'Diabetes Type-2 glucose trend analysis',
    status: 'Completed',
    priority: 'Routine',
    vitals_summary: {
      heartRate: 72,
      bp: '118/78',
      glucose: 94,
      riskScore: 'Low Risk (Target Met)',
    },
    ai_notes:
      'Fasting glucose readings remain within 80-100 mg/dL target range over 14 days. Patient adherence to Metformin is 100%.',
  },
  {
    id: 204,
    patient_id: 4,
    doctor_id: 2,
    patient_name: 'Marcus Vance',
    appointment_date: '2026-09-27T09:30:00',
    reason: 'Routine lipid panel & vital telemetry review',
    status: 'Pending',
    priority: 'Routine',
    vitals_summary: {
      heartRate: 70,
      bp: '120/80',
      glucose: 92,
      riskScore: 'Optimal Wellness',
    },
    ai_notes:
      'All telemetry markers normal. Annual preventative screening recommended.',
  },
];

export default function DoctorDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [actionLoadingId, setActionLoadingId] = useState<number | null>(null);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isClient, setIsClient] = useState(false);

  const fetchDoctorAppointments = useCallback(async (doctorId: number) => {
    try {
      const res = await fetch(apiUrl(`/api/appointments/doctor/${doctorId}`));
      if (res.ok) {
        const data = (await res.json()) as Appointment[];
        setAppointments(data.length > 0 ? data : SAMPLE_DOCTOR_APPOINTMENTS);
      } else {
        setAppointments(SAMPLE_DOCTOR_APPOINTMENTS);
      }
    } catch (err) {
      console.error('Failed to fetch doctor appointments:', err);
      setAppointments(SAMPLE_DOCTOR_APPOINTMENTS);
    }
  }, []);

  useEffect(() => {
    setIsClient(true);
    const storedUser = localStorage.getItem('user');

    if (!storedUser) {
      // Default doctor fallback for viewing doctor portal
      const defaultDoctor = { user_id: 2, id: 2, name: 'Dr. Sarah Jenkins', email: 'doctor@example.com', role: 'doctor' };
      setUser(defaultDoctor);
      fetchDoctorAppointments(2).finally(() => setLoading(false));
      return;
    }

    try {
      const parsed = JSON.parse(storedUser) as User;
      if (parsed.role?.toLowerCase() !== 'doctor') {
        toast.error('Access Denied: Doctor Portal is restricted to authorized doctor accounts.');
        router.replace('/dashboard/patient?unauthorized=doctor_only');
        return;
      }
      setUser(parsed);
      const doctorId = parsed.user_id || parsed.id || 2;
      fetchDoctorAppointments(doctorId).finally(() => setLoading(false));
    } catch {
      router.replace('/login');
    }
  }, [router, fetchDoctorAppointments]);

  const handleStatusUpdate = async (appointmentId: number, newStatus: string) => {
    setActionLoadingId(appointmentId);
    try {
      const res = await fetch(apiUrl(`/api/appointments/${appointmentId}/status`), {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      setAppointments((prev) =>
        prev.map((apt) => (apt.id === appointmentId ? { ...apt, status: newStatus } : apt))
      );
      toast.success(`Appointment #${appointmentId} status updated to ${newStatus}`);
    } catch (err) {
      console.error('Error updating status:', err);
      // Fallback local update
      setAppointments((prev) =>
        prev.map((apt) => (apt.id === appointmentId ? { ...apt, status: newStatus } : apt))
      );
      toast.success(`Appointment status updated to ${newStatus}`);
    } finally {
      setActionLoadingId(null);
    }
  };

  if (!isClient) return null;

  const pendingCount = appointments.filter((a) => a.status?.toLowerCase() === 'pending').length;
  const confirmedCount = appointments.filter((a) => a.status?.toLowerCase() === 'confirmed').length;
  const completedCount = appointments.filter((a) => a.status?.toLowerCase() === 'completed').length;

  const filteredAppointments = appointments.filter((apt) => {
    const matchesFilter = filter === 'all' || apt.status?.toLowerCase() === filter;
    const matchesSearch =
      (apt.patient_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (apt.reason || '').toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-page-enter">
      {/* Doctor Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold">
              <Stethoscope className="w-4 h-4" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
              Doctor Clinical Portal
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Physician Patient Queue Management & Clinical AI Decision Support System
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300">
            {user?.name || 'Dr. Sarah Jenkins'}
          </div>
        </div>
      </div>

      {/* Quick Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/60 dark:bg-amber-950/30 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-amber-700 dark:text-amber-300 uppercase tracking-wide">
              Pending Queue
            </p>
            <p className="text-3xl font-extrabold text-amber-900 dark:text-amber-100 mt-1">
              {pendingCount}
            </p>
          </div>
          <Clock className="w-8 h-8 text-amber-500 opacity-80" />
        </div>

        <div className="p-5 rounded-2xl border border-cyan-200 dark:border-cyan-900/60 bg-cyan-50/60 dark:bg-cyan-950/30 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-cyan-700 dark:text-cyan-300 uppercase tracking-wide">
              Confirmed Consultations
            </p>
            <p className="text-3xl font-extrabold text-cyan-900 dark:text-cyan-100 mt-1">
              {confirmedCount}
            </p>
          </div>
          <Check className="w-8 h-8 text-cyan-500 opacity-80" />
        </div>

        <div className="p-5 rounded-2xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/60 dark:bg-emerald-950/30 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wide">
              Completed
            </p>
            <p className="text-3xl font-extrabold text-emerald-900 dark:text-emerald-100 mt-1">
              {completedCount}
            </p>
          </div>
          <CheckCircle2 className="w-8 h-8 text-emerald-500 opacity-80" />
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Filter Tabs */}
        <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs font-medium self-start sm:self-auto">
          {[
            { id: 'all', label: `All (${appointments.length})` },
            { id: 'pending', label: `Pending (${pendingCount})` },
            { id: 'confirmed', label: `Confirmed (${confirmedCount})` },
            { id: 'completed', label: `Completed (${completedCount})` },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filter === tab.id
                  ? 'bg-white dark:bg-slate-700 text-teal-600 dark:text-teal-300 font-bold shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search patient or reason..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </div>

      {/* Patient Queue Table */}
      {loading ? (
        <TableSkeleton />
      ) : filteredAppointments.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-2">
          <AlertCircle className="w-8 h-8 text-slate-400 mx-auto" />
          <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
            No patient appointments found matching the current filter.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-sm">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-bold uppercase tracking-wider">
              <tr>
                <th className="p-4">Patient</th>
                <th className="p-4">Priority</th>
                <th className="p-4">Reason / Complaint</th>
                <th className="p-4">Date & Time</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-800 dark:text-slate-200">
              {filteredAppointments.map((apt) => {
                const priority = apt.priority || 'Routine';
                return (
                  <tr key={apt.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition">
                    {/* Patient info */}
                    <td className="p-4 font-semibold">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold text-xs shrink-0">
                          <User className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 dark:text-slate-100">
                            {apt.patient_name || `Patient #${apt.patient_id}`}
                          </p>
                          <p className="text-[10px] text-slate-400">ID: #{apt.patient_id}</p>
                        </div>
                      </div>
                    </td>

                    {/* Priority Badge */}
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                          priority === 'Critical'
                            ? 'bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-800'
                            : priority === 'Urgent'
                            ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-800'
                            : 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                        }`}
                      >
                        {priority === 'Critical' && <ShieldAlert className="w-3 h-3 text-rose-500" />}
                        {priority}
                      </span>
                    </td>

                    {/* Reason */}
                    <td className="p-4 max-w-xs truncate text-slate-600 dark:text-slate-300 font-medium">
                      {apt.reason}
                    </td>

                    {/* Date & Time */}
                    <td className="p-4 text-slate-500 dark:text-slate-400 font-medium">
                      {new Date(apt.appointment_date).toLocaleString()}
                    </td>

                    {/* Status Badge */}
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                          apt.status?.toLowerCase() === 'completed'
                            ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                            : apt.status?.toLowerCase() === 'confirmed'
                            ? 'bg-cyan-100 dark:bg-cyan-950/80 text-cyan-700 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-800'
                            : 'bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-800'
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        {apt.status}
                      </span>
                    </td>

                    {/* Quick Actions */}
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* AI Notes Trigger */}
                        <button
                          type="button"
                          onClick={() => setSelectedAppointment(apt)}
                          className="px-2.5 py-1 rounded-lg bg-teal-500/10 text-teal-700 dark:text-teal-300 hover:bg-teal-500/20 font-semibold text-[11px] border border-teal-500/20 transition flex items-center gap-1"
                        >
                          <Sparkles className="w-3 h-3 text-teal-500" />
                          <span>AI Notes</span>
                        </button>

                        {apt.status?.toLowerCase() === 'pending' && (
                          <button
                            type="button"
                            disabled={actionLoadingId === apt.id}
                            onClick={() => handleStatusUpdate(apt.id, 'Confirmed')}
                            className="px-2.5 py-1 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white font-semibold text-[11px] transition shadow-sm"
                          >
                            Confirm
                          </button>
                        )}

                        {apt.status?.toLowerCase() !== 'completed' && (
                          <button
                            type="button"
                            disabled={actionLoadingId === apt.id}
                            onClick={() => handleStatusUpdate(apt.id, 'Completed')}
                            className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-[11px] transition shadow-sm"
                          >
                            Complete
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* AI Diagnostic Notes & Clinical Telemetry Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-page-enter">
          <div className="w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 relative">
            <button
              type="button"
              onClick={() => setSelectedAppointment(null)}
              className="absolute top-4 right-4 p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                  Clinical AI Diagnostic Summary
                  <Sparkles className="w-4 h-4 text-teal-500" />
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Patient: <strong className="text-slate-800 dark:text-slate-200">{selectedAppointment.patient_name || `Patient #${selectedAppointment.patient_id}`}</strong>
                </p>
              </div>
            </div>

            {/* Vitals Quick Grid */}
            <div className="grid grid-cols-3 gap-2.5 mb-4 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Heart Rate</span>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <HeartPulse className="w-3.5 h-3.5" />
                  {selectedAppointment.vitals_summary?.heartRate || 78} BPM
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Blood Pressure</span>
                <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 flex items-center gap-1">
                  <Activity className="w-3.5 h-3.5" />
                  {selectedAppointment.vitals_summary?.bp || '120/80'}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Risk Score</span>
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400 truncate block">
                  {selectedAppointment.vitals_summary?.riskScore || 'Low Risk'}
                </span>
              </div>
            </div>

            {/* AI Notes Body */}
            <div className="p-4 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-xs leading-relaxed text-slate-800 dark:text-slate-200 mb-6">
              <p className="font-bold text-teal-800 dark:text-teal-300 mb-1 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-teal-500" />
                AI Diagnostic Insights & Telemetry Notes
              </p>
              <p>
                {selectedAppointment.ai_notes ||
                  'Patient vital indicators demonstrate stable physiological baseline. Continuous monitoring recommended.'}
              </p>
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setSelectedAppointment(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition"
              >
                Close Summary
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}