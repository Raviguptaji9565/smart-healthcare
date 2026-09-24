'use client';
import { useState, useEffect, useCallback } from 'react';
import { apiUrl } from '@/lib/api';

interface User {
  user_id?: number;
  id?: number;
  name?: string;
  role?: string;
  email?: string;
}

interface Appointment {
  id: number;
  patient_id: number;
  doctor_id: number;
  appointment_date: string;
  reason: string;
  status: string;
  doctor_name?: string;
  patient_name?: string;
}

export default function CombinedDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  
  // Booking Form State
  const [doctorId, setDoctorId] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [reason, setReason] = useState('');
  const [message, setMessage] = useState('');

  const fetchAppointments = useCallback(async (id: number, role: string) => {
    try {
      const endpoint = role === 'doctor'
        ? `/api/appointments/doctor/${id}`
        : `/api/appointments/patient/${id}`;
      const response = await fetch(apiUrl(endpoint));
      if (response.ok) {
        const data = (await response.json()) as Appointment[];
        setAppointments(data);
      }
    } catch (err) {
      console.error("Failed to fetch appointments", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const loadData = async () => {
      setIsClient(true);
      const storedUser = localStorage.getItem('user');
      
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser) as User;
        const uid = parsedUser.user_id || parsedUser.id || 1;
        setUser(parsedUser);
        fetchAppointments(uid, parsedUser.role || 'patient');
      } else {
        const fallbackUser: User = { user_id: 1, id: 1, name: 'Demo User', role: 'patient' };
        setUser(fallbackUser);
        fetchAppointments(1, 'patient');
      }
    };

    loadData();
  }, [fetchAppointments]);


  const handleBookAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const patientId = user.user_id || user.id || 1;

    try {
      const response = await fetch(apiUrl('/api/appointments/'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patient_id: patientId,
          doctor_id: parseInt(doctorId),
          appointment_date: new Date(appointmentDate).toISOString(),
          reason: reason,
        }),
      });

      if (response.ok) {
        setMessage('Appointment booked successfully!');
        setReason('');
        setDoctorId('');
        setAppointmentDate('');
        fetchAppointments(patientId, user.role || 'patient'); // Refresh list
      } else {
        const errData = await response.json();
        setMessage(`Error: ${errData.detail || 'Failed to book'}`);
      }
    } catch (err: unknown) {
      // 3. Catch me <any> hata kar strict typing ki
      setMessage(`Error: ${(err as Error).message}`);
    }
  };

  // Hydration mismatch rokne ke liye
  if (!isClient) return null;

  return (
    <div className="p-8 min-h-screen bg-gray-950 text-white">
      <h1 className="text-3xl font-bold text-blue-400 mb-2">Unified Healthcare Portal</h1>
      <p className="text-gray-300 mb-8">Welcome, {user?.name || 'User'}! Book appointments and view management records side by side.</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Book Appointment Form */}
        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
          <h2 className="text-xl font-semibold mb-4 text-emerald-400">Book New Appointment</h2>
          
          {message && (
            <div className={`p-3 mb-4 rounded text-sm ${message.includes('success') ? 'bg-emerald-950 border border-emerald-700 text-emerald-300' : 'bg-red-950 border border-red-700 text-red-300'}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleBookAppointment} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Doctor ID</label>
              <input 
                type="number" 
                value={doctorId} 
                onChange={(e) => setDoctorId(e.target.value)} 
                required 
                placeholder="Enter Doctor ID (e.g. 1)"
                className="w-full bg-gray-950 border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Date & Time</label>
              <input 
                type="datetime-local" 
                value={appointmentDate} 
                onChange={(e) => setAppointmentDate(e.target.value)} 
                required 
                className="w-full bg-gray-950 border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Reason for Visit</label>
              <textarea 
                value={reason} 
                onChange={(e) => setReason(e.target.value)} 
                required 
                rows={3}
                placeholder="Describe symptoms..."
                className="w-full bg-gray-950 border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded transition"
            >
              Confirm & Book
            </button>
          </form>
        </div>

        {/* Right Column: Live Appointments Table */}
        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">Live Appointments Record</h2>
          
          {loading ? (
            <p className="text-gray-400">Loading records...</p>
          ) : appointments.length === 0 ? (
            <p className="text-gray-400 border border-gray-800 p-4 rounded bg-gray-950">No appointments found in database.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-800 text-left text-sm">
                <thead>
                  <tr className="bg-gray-800">
                    <th className="border border-gray-700 p-2.5">ID</th>
                    <th className="border border-gray-700 p-2.5">Date & Time</th>
                    <th className="border border-gray-700 p-2.5">Reason</th>
                    <th className="border border-gray-700 p-2.5">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((apt) => (
                    <tr key={apt.id} className="hover:bg-gray-800/50">
                      <td className="border border-gray-800 p-2.5">#{apt.id}</td>
                      <td className="border border-gray-800 p-2.5">{new Date(apt.appointment_date).toLocaleString()}</td>
                      <td className="border border-gray-800 p-2.5">{apt.reason}</td>
                      <td className="border border-gray-800 p-2.5">
                        <span className="px-2 py-0.5 rounded text-xs bg-yellow-600/20 text-yellow-400 border border-yellow-800">
                          {apt.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}