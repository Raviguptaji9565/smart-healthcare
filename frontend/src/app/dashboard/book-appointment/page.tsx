'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { apiUrl } from '@/lib/api';

interface User {
  user_id?: number;
  id?: number;
  name?: string;
  email?: string;
  role?: string;
}

interface Doctor {
  id: number;
  full_name: string;
  email: string;
  role: string;
}

function BookAppointmentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedDoctorId = searchParams.get('doctor_id') || '';

  const [doctorId, setDoctorId] = useState(preselectedDoctorId);
  const [appointmentDate, setAppointmentDate] = useState('');
  const [reason, setReason] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.replace('/login');
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser) as User;
      setUser(parsedUser);
    } catch {
      router.replace('/login');
      return;
    }

    // Fetch doctors for dropdown
    const fetchDoctors = async () => {
      try {
        const res = await fetch(apiUrl('/api/auth/doctors'));
        if (res.ok) {
          const data = (await res.json()) as Doctor[];
          setDoctors(data);
          if (preselectedDoctorId) {
            setDoctorId(preselectedDoctorId);
          } else if (data.length > 0) {
            setDoctorId(String(data[0].id));
          }
        }
      } catch (err) {
        console.error('Failed to load doctors list:', err);
      }
    };

    fetchDoctors();
  }, [router, preselectedDoctorId]);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!user) {
      setError('User not authenticated. Please log in again.');
      return;
    }

    const patientId = user.user_id || user.id;
    if (!patientId) {
      setError('Patient ID not found. Please log out and log in again.');
      return;
    }

    if (!doctorId) {
      setError('Please select a doctor.');
      return;
    }

    if (!appointmentDate) {
      setError('Please select an appointment date & time.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(apiUrl('/api/appointments/'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patient_id: patientId,
          doctor_id: parseInt(doctorId, 10),
          appointment_date: new Date(appointmentDate).toISOString(),
          reason: reason || 'General Consultation',
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || 'Failed to book appointment');
      }

      setMessage('Appointment booked successfully! Redirecting to dashboard...');
      setTimeout(() => {
        router.push('/dashboard/patient');
      }, 1500);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred while booking');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-white">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mr-3" />
        Loading...
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 max-w-2xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Link
            href="/dashboard/patient"
            className="text-xs text-blue-400 hover:text-blue-300 font-medium inline-flex items-center gap-1 mb-2"
          >
            ← Back to Patient Dashboard
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Book an Appointment</h1>
          <p className="text-gray-400 text-sm mt-1">Schedule a consultation with our medical specialists</p>
        </div>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 md:p-8 shadow-xl">
        {message && (
          <div className="mb-6 rounded-lg border border-emerald-800 bg-emerald-950/40 p-4 text-sm text-emerald-400">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-6 rounded-lg border border-red-800 bg-red-950/40 p-4 text-sm text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleBooking} className="space-y-5">
          {/* Doctor Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Select Specialist Doctor
            </label>
            {doctors.length > 0 ? (
              <select
                value={doctorId}
                onChange={(e) => setDoctorId(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2.5 text-white outline-none focus:border-blue-500"
              >
                <option value="">-- Choose a doctor --</option>
                {doctors.map((doc) => (
                  <option key={doc.id} value={doc.id}>
                    Dr. {doc.full_name} ({doc.email}) - ID #{doc.id}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="number"
                placeholder="Enter Doctor ID (e.g. 1)"
                value={doctorId}
                onChange={(e) => setDoctorId(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2.5 text-white outline-none focus:border-blue-500"
              />
            )}
            <p className="text-xs text-gray-500 mt-1">
              {doctors.length > 0
                ? `${doctors.length} doctors currently available in the directory`
                : 'Enter the registered doctor ID'}
            </p>
          </div>

          {/* Appointment Date & Time */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Appointment Date & Time
            </label>
            <input
              type="datetime-local"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2.5 text-white outline-none focus:border-blue-500 [color-scheme:dark]"
            />
          </div>

          {/* Reason / Symptoms */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Reason for Visit / Symptoms
            </label>
            <textarea
              rows={4}
              placeholder="Please describe your symptoms, health concerns, or consultation goals..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2.5 text-white outline-none focus:border-blue-500 resize-none"
            />
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition shadow-lg shadow-blue-600/20 disabled:opacity-50"
            >
              {loading ? 'Submitting Appointment...' : 'Confirm & Book Appointment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function BookAppointmentPage() {
  return (
    <Suspense fallback={<div className="p-8 text-white">Loading booking portal...</div>}>
      <BookAppointmentContent />
    </Suspense>
  );
}