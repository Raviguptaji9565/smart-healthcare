'use client';

import { useEffect, useState, useCallback } from 'react';
import { apiUrl } from '@/lib/api';

interface Medicine {
  id: number;
  user_id: number;
  name: string;
  dosage?: string;
  frequency?: string;
  instructions?: string;
  is_taken: boolean;
  taken_at?: string;
  created_at?: string;
}

interface NewMedicine {
  name: string;
  dosage: string;
  frequency: string;
  instructions: string;
}

const FREQUENCIES = [
  'Once daily',
  'Twice daily',
  'Three times daily',
  'Every 8 hours',
  'Every 12 hours',
  'As needed',
  'With meals',
  'At bedtime',
];

export default function MedicinesPage() {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [userId, setUserId] = useState<number>(1);
  const [form, setForm] = useState<NewMedicine>({
    name: '',
    dosage: '',
    frequency: 'Once daily',
    instructions: '',
  });
  const [successMsg, setSuccessMsg] = useState('');

  const fetchMedicines = useCallback(async (uid: number) => {
    try {
      const res = await fetch(apiUrl(`/api/medicines/user/${uid}`));
      if (res.ok) {
        const data = (await res.json()) as Medicine[];
        setMedicines(data);
      }
    } catch (e) {
      console.error('Failed to fetch medicines:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      try {
        const user = JSON.parse(stored);
        const uid = user.user_id || user.id || 1;
        setUserId(uid);
        fetchMedicines(uid);
      } catch { /* ignore */ }
    }
  }, [fetchMedicines]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch(apiUrl('/api/medicines/'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, ...form }),
      });
      if (res.ok) {
        await fetchMedicines(userId);
        setForm({ name: '', dosage: '', frequency: 'Once daily', instructions: '' });
        setShowForm(false);
        setSuccessMsg('Medicine added successfully!');
        setTimeout(() => setSuccessMsg(''), 3000);
      }
    } catch (e) {
      console.error('Failed to add medicine:', e);
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleTaken = async (med: Medicine) => {
    try {
      const res = await fetch(apiUrl(`/api/medicines/${med.id}/taken`), {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_taken: !med.is_taken }),
      });
      if (res.ok) await fetchMedicines(userId);
    } catch (e) {
      console.error('Failed to update medicine:', e);
    }
  };

  const handleDelete = async (medId: number) => {
    if (!confirm('Delete this medicine reminder?')) return;
    try {
      const res = await fetch(apiUrl(`/api/medicines/${medId}`), { method: 'DELETE' });
      if (res.ok) await fetchMedicines(userId);
    } catch (e) {
      console.error('Failed to delete medicine:', e);
    }
  };

  const takenCount = medicines.filter((m) => m.is_taken).length;

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">💊</span>
            <h1 className="text-xl font-bold text-gray-800">Medicine Reminders</h1>
          </div>
          <p className="text-sm text-gray-500 mt-1">Track your daily medications and mark them as taken.</p>
        </div>
        <button
          onClick={() => setShowForm((prev) => !prev)}
          className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition shadow-sm"
        >
          <span>{showForm ? '✕ Cancel' : '+ Add Medicine'}</span>
        </button>
      </div>

      {/* Success Toast */}
      {successMsg && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm px-4 py-3 rounded-xl flex items-center gap-2">
          <span>✅</span> {successMsg}
        </div>
      )}

      {/* Add Form */}
      {showForm && (
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <h2 className="font-semibold text-gray-800 mb-4">Add New Medicine</h2>
          <form onSubmit={handleAdd} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">
                  Medicine Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Metformin 500mg"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-teal-500 bg-gray-50"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">
                  Dosage
                </label>
                <input
                  type="text"
                  placeholder="e.g. 500mg"
                  value={form.dosage}
                  onChange={(e) => setForm((f) => ({ ...f, dosage: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-teal-500 bg-gray-50"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">
                  Frequency
                </label>
                <select
                  value={form.frequency}
                  onChange={(e) => setForm((f) => ({ ...f, frequency: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-teal-500 bg-gray-50"
                >
                  {FREQUENCIES.map((f) => <option key={f}>{f}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">
                  Instructions
                </label>
                <input
                  type="text"
                  placeholder="e.g. Take with breakfast"
                  value={form.instructions}
                  onChange={(e) => setForm((f) => ({ ...f, instructions: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-teal-500 bg-gray-50"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-200 rounded-lg transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-5 py-2 text-sm bg-teal-600 hover:bg-teal-700 disabled:opacity-60 text-white font-medium rounded-lg transition"
              >
                {submitting ? 'Adding...' : 'Add Medicine'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-gray-800">{medicines.length}</p>
          <p className="text-xs text-gray-400 mt-1">Total Medicines</p>
        </div>
        <div className="bg-white rounded-xl border border-emerald-200 p-4 text-center">
          <p className="text-2xl font-bold text-emerald-600">{takenCount}</p>
          <p className="text-xs text-gray-400 mt-1">Taken Today</p>
        </div>
        <div className="bg-white rounded-xl border border-amber-200 p-4 text-center">
          <p className="text-2xl font-bold text-amber-600">{medicines.length - takenCount}</p>
          <p className="text-xs text-gray-400 mt-1">Remaining</p>
        </div>
      </div>

      {/* Medicines List */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-800">Your Medications</h2>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : medicines.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-4xl mb-3">💊</p>
            <p className="text-gray-400 text-sm mb-4">No medicines added yet.</p>
            <button
              onClick={() => setShowForm(true)}
              className="text-sm bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-lg transition"
            >
              Add Your First Medicine
            </button>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {medicines.map((med) => (
              <div
                key={med.id}
                className={`flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition ${med.is_taken ? 'opacity-70' : ''}`}
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div className={`mt-0.5 w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm
                    ${med.is_taken ? 'bg-emerald-100 text-emerald-600' : 'bg-teal-100 text-teal-600'}`}>
                    {med.is_taken ? '✓' : '💊'}
                  </div>
                  <div className="min-w-0">
                    <p className={`font-semibold text-sm ${med.is_taken ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                      {med.name}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {med.dosage && (
                        <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{med.dosage}</span>
                      )}
                      {med.frequency && (
                        <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">{med.frequency}</span>
                      )}
                    </div>
                    {med.instructions && (
                      <p className="text-xs text-gray-400 mt-1">{med.instructions}</p>
                    )}
                    {med.taken_at && med.is_taken && (
                      <p className="text-xs text-emerald-500 mt-1">
                        Taken at {new Date(med.taken_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 ml-4">
                  <button
                    onClick={() => handleToggleTaken(med)}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition
                      ${med.is_taken
                        ? 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                        : 'bg-teal-600 text-white hover:bg-teal-700'
                      }`}
                  >
                    {med.is_taken ? 'Undo' : 'Mark Taken'}
                  </button>
                  <button
                    onClick={() => handleDelete(med.id)}
                    className="text-xs text-red-400 hover:text-red-600 hover:bg-red-50 px-2 py-1.5 rounded-lg transition"
                    title="Delete"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
