'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { apiUrl } from '@/lib/api';

export default function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('patient');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(apiUrl('/api/auth/register'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: fullName.trim(),
          email: email.trim(),
          password: password,
          role: role,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Registration failed');

      alert('Registration Successful! Please login now.');
      router.push('/login');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Something went wrong');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-950 px-4 text-white">
      <div className="w-full max-w-md space-y-6 rounded-xl bg-gray-900 border border-gray-800 p-8 shadow-xl">
        <div className="text-center">
          <Link href="/" className="inline-block text-3xl font-bold text-blue-400 hover:text-blue-300 transition">
            SmartHealth-AI
          </Link>
          <h2 className="mt-2 text-xl font-semibold text-gray-100">Create Account</h2>
          <p className="mt-1 text-sm text-gray-400">Join Smart Healthcare System</p>
        </div>
        
        {error && (
          <div className="rounded-lg border border-red-800 bg-red-900/20 p-3 text-sm text-red-400 text-center">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleRegister}>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
            <input
              type="text"
              required
              placeholder="e.g. John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2.5 text-white outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
            <input
              type="email"
              required
              placeholder="e.g. name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2.5 text-white outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
            <input
              type="password"
              required
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2.5 text-white outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Account Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2.5 text-white outline-none focus:border-blue-500"
            >
              <option value="patient">Patient (Book Appointments)</option>
              <option value="doctor">Doctor (Consult & Manage)</option>
            </select>
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-blue-600 py-3 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </div>
        </form>

        <div className="text-center text-sm text-gray-400">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-400 hover:text-blue-300 font-medium">
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
}

