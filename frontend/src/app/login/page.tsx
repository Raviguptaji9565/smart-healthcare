'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { apiUrl, parseApiResponse } from '@/lib/api';

interface LoginResponse {
  user_id?: number;
  id?: number;
  name?: string;
  email?: string;
  role?: string;
  user?: {
    user_id?: number;
    id?: number;
    name?: string;
    email?: string;
    role?: string;
  };
  access_token?: string;
  token?: string;
}

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError('');
    setLoading(true);

    try {
      const response = await fetch(
        apiUrl('/api/auth/login'),
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email.trim(),
            password,
          }),
        }
      );

      // Safely parse JSON response
      const data = await parseApiResponse<LoginResponse>(response);

      console.log('Login response:', data);

      const userData = data.user || data;
      const role = userData.role?.toLowerCase();
      const userId = userData.user_id || userData.id;

      if (!role) {
        console.error('Backend response does not contain role:', data);
        throw new Error(
          'Login successful, but user role was not returned by the server.'
        );
      }

      // LocalStorage mein complete user save karein
      localStorage.setItem(
        'user',
        JSON.stringify({
          user_id: userId,
          id: userId,
          name: userData.name || '',
          email: userData.email || email,
          role: role,
        })
      );

      // Token available ho to save karein
      if (data.access_token) {
        localStorage.setItem('access_token', data.access_token);
      }

      if (data.token) {
        localStorage.setItem('token', data.token);
      }

      // Role ke according redirect
      if (role === 'doctor') {
        router.replace('/dashboard/doctor');
      } else if (role === 'patient') {
        router.replace('/dashboard/patient');
      } else {
        router.replace('/dashboard/combined');
      }
    } catch (err) {
      console.error('Login error:', err);

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Unable to login. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-xl p-8 shadow-xl"
      >
        <div className="text-center mb-6">
          <Link href="/" className="inline-block text-3xl font-bold text-blue-400 hover:text-blue-300 transition">
            SmartHealth-AI
          </Link>
          <p className="text-gray-400 mt-2">
            Login to your healthcare account
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-lg border border-red-800 bg-red-900/20 px-4 py-3">
            <p className="text-sm text-red-400">
              {error}
            </p>
          </div>
        )}

        {/* Email */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm text-gray-300 mb-2"
          >
            Email
          </label>

          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none focus:border-blue-500"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm text-gray-300 mb-2"
          >
            Password
          </label>

          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none focus:border-blue-500"
            required
          />
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <div className="mt-6 text-center text-sm text-gray-400">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-blue-400 hover:text-blue-300 font-medium">
            Create an account
          </Link>
        </div>
      </form>
    </div>
  );
}