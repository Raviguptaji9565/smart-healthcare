'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { apiUrl } from '@/lib/api';

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
  patient_name?: string;
  doctor_name?: string;
}

export default function DoctorDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [actionLoadingId, setActionLoadingId] = useState<number | null>(null);
  const [isClient, setIsClient] = useState(false);

  const fetchDoctorAppointments = useCallback(async (doctorId: number) => {
    try {
      const res = await fetch(apiUrl(`/api/appointments/doctor/${doctorId}`));
      if (res.ok) {
        const data = (await res.json()) as Appointment[];
        setAppointments(data);
      }
    } catch (err) {
      console.error('Failed to fetch doctor appointments:', err);
    }
  }, []);

  useEffect(() => {
    setIsClient(true);
    const storedUser = localStorage.getItem('user');

    if (!storedUser) {
      router.replace('/login');
      return;
    }

    try {
      const parsed = JSON.parse(storedUser) as User;
      if (parsed.role?.toLowerCase() !== 'doctor') {
        // If not a doctor, redirect to patient dashboard
        router.replace('/dashboard/patient');
        return;
      }
      setUser(parsed);
      const doctorId = parsed.user_id || parsed.id || 1;
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

      if (res.ok) {
        const updated = (await res.json()) as Appointment;
        setAppointments((prev) =>
          prev.map((apt) => (apt.id === appointmentId ? { ...apt, status: updated.status } : apt))
        );
      } else {
        alert('Failed to update appointment status');
      }
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Error updating appointment status');
    } finally {
      setActionLoadingId(null);
    }
  };

  if (!isClient) return null;

  if (!user) {
    return (
      <div className="p-8 text-white flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mr-3" />
        Loading Doctor Portal...
      </div>
    );
  }

  const doctorId = user.user_id || user.id || 1;
  const pendingCount = appointments.filter((a) => a.status?.toLowerCase() === 'pending').length;
  const confirmedCount = appointments.filter((a) => a.status?.toLowerCase() === 'confirmed').length;
  const completedCount = appointments.filter((a) => a.status?.toLowerCase() === 'completed').length;

  const filteredAppointments = appointments.filter((apt) => {
    if (filter === 'all') return true;
    return apt.status?.toLowerCase() === filter;
  });

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-gray-800 pb-6">
        <div>
          <span className="inline-block px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-800 rounded-md mb-2">
            Doctor Portal
          </span>
          <h1 className="text-3xl font-bold text-white">Dr. {user.name || 'Doctor'}</h1>
          <p className="text-gray-400 text-sm mt-1">{user.email} (Doctor ID: #{doctorId})</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setLoading(true);
              fetchDoctorAppointments(doctorId).finally(() => setLoading(false));
            }}
            className="px-4 py-2 text-sm bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition border border-gray-700"
          >
            Refresh Schedule
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <p className="text-sm text-gray-400 font-medium">Total Patient Requests</p>
          <p className="text-3xl font-bold text-white mt-2">{appointments.length}</p>
          <p className="text-xs text-gray-500 mt-1">All incoming bookings</p>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <p className="text-sm text-yellow-400 font-medium">Action Needed (Pending)</p>
          <p className="text-3xl font-bold text-white mt-2">{pendingCount}</p>
          <p className="text-xs text-yellow-500/70 mt-1">Requires your confirmation</p>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <p className="text-sm text-emerald-400 font-medium">Upcoming Confirmed</p>
          <p className="text-3xl font-bold text-white mt-2">{confirmedCount}</p>
          <p className="text-xs text-emerald-500/70 mt-1">Ready for consultation</p>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <p className="text-sm text-blue-400 font-medium">Completed Sessions</p>
          <p className="text-3xl font-bold text-white mt-2">{completedCount}</p>
          <p className="text-xs text-blue-500/70 mt-1">Concluded patient visits</p>
        </div>
      </div>

      {/* Appointment Management Table */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-white">Patient Appointments</h2>
            <p className="text-xs text-gray-400 mt-1">Review, accept, and manage consultation requests</p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 bg-gray-800/80 p-1 rounded-lg border border-gray-700 text-xs">
            {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-3 py-1.5 rounded-md font-medium capitalize transition ${
                  filter === tab
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="py-12 text-center text-gray-400">
            <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            Loading appointments...
          </div>
        ) : filteredAppointments.length === 0 ? (
          <div className="border border-dashed border-gray-800 rounded-xl p-12 text-center">
            <p className="text-gray-400 text-base">No appointments found matching this filter.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs text-gray-400 uppercase bg-gray-800/80 border-b border-gray-700">
                <tr>
                  <th className="px-4 py-3 rounded-l-lg">ID</th>
                  <th className="px-4 py-3">Patient</th>
                  <th className="px-4 py-3">Date & Time</th>
                  <th className="px-4 py-3">Reason / Symptoms</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right rounded-r-lg">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {filteredAppointments.map((apt) => {
                  const status = apt.status?.toLowerCase();
                  let badgeColor = 'bg-yellow-500/20 text-yellow-400 border-yellow-800';
                  if (status === 'confirmed') badgeColor = 'bg-emerald-500/20 text-emerald-400 border-emerald-800';
                  if (status === 'completed') badgeColor = 'bg-blue-500/20 text-blue-400 border-blue-800';
                  if (status === 'cancelled') badgeColor = 'bg-red-500/20 text-red-400 border-red-800';

                  const isBusy = actionLoadingId === apt.id;

                  return (
                    <tr key={apt.id} className="hover:bg-gray-800/40 transition">
                      <td className="px-4 py-3.5 font-mono text-gray-300">#{apt.id}</td>
                      <td className="px-4 py-3.5 font-medium text-white">
                        {apt.patient_name || `Patient #${apt.patient_id}`}
                      </td>
                      <td className="px-4 py-3.5 text-gray-300">
                        {new Date(apt.appointment_date).toLocaleString([], {
                          dateStyle: 'medium',
                          timeStyle: 'short',
                        })}
                      </td>
                      <td className="px-4 py-3.5 text-gray-400 max-w-xs truncate">{apt.reason || 'Routine Consultation'}</td>
                      <td className="px-4 py-3.5">
                        <span className={`inline-block px-2.5 py-0.5 text-xs font-semibold border rounded-full ${badgeColor}`}>
                          {apt.status || 'Pending'}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-right space-x-2">
                        {status === 'pending' && (
                          <>
                            <button
                              disabled={isBusy}
                              onClick={() => handleStatusUpdate(apt.id, 'Confirmed')}
                              className="px-2.5 py-1 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded transition disabled:opacity-50"
                            >
                              Confirm
                            </button>
                            <button
                              disabled={isBusy}
                              onClick={() => handleStatusUpdate(apt.id, 'Cancelled')}
                              className="px-2.5 py-1 text-xs font-semibold bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white border border-red-800 rounded transition disabled:opacity-50"
                            >
                              Decline
                            </button>
                          </>
                        )}
                        {status === 'confirmed' && (
                          <>
                            <button
                              disabled={isBusy}
                              onClick={() => handleStatusUpdate(apt.id, 'Completed')}
                              className="px-2.5 py-1 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded transition disabled:opacity-50"
                            >
                              Mark Done
                            </button>
                            <button
                              disabled={isBusy}
                              onClick={() => handleStatusUpdate(apt.id, 'Cancelled')}
                              className="px-2.5 py-1 text-xs font-semibold bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white border border-red-800 rounded transition disabled:opacity-50"
                            >
                              Cancel
                            </button>
                          </>
                        )}
                        {(status === 'completed' || status === 'cancelled') && (
                          <button
                            disabled={isBusy}
                            onClick={() => handleStatusUpdate(apt.id, 'Pending')}
                            className="px-2 py-1 text-xs text-gray-400 hover:text-white hover:bg-gray-800 rounded transition"
                          >
                            Reopen
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}