'use client';

import { useState, useEffect } from 'react';
import { apiUrl } from '@/lib/api';

interface RiskFactor {
  name: string;
  value: string;
  status: 'normal' | 'warning' | 'danger';
  recommendation: string;
}

interface HealthMetrics {
  heart_rate: number | null;
  systolic_bp: number | null;
  diastolic_bp: number | null;
  blood_glucose: number | null;
  sleep_duration: number | null;
  weight: number | null;
  height: number | null;
}

function getRiskScore(metrics: HealthMetrics): number {
  let score = 0;
  let factors = 0;

  if (metrics.systolic_bp !== null) {
    factors++;
    if (metrics.systolic_bp >= 140) score += 30;
    else if (metrics.systolic_bp >= 130) score += 15;
    else score += 5;
  }
  if (metrics.blood_glucose !== null) {
    factors++;
    if (metrics.blood_glucose >= 126) score += 30;
    else if (metrics.blood_glucose >= 100) score += 15;
    else score += 3;
  }
  if (metrics.heart_rate !== null) {
    factors++;
    if (metrics.heart_rate > 100 || metrics.heart_rate < 50) score += 20;
    else score += 2;
  }
  if (metrics.sleep_duration !== null) {
    factors++;
    if (metrics.sleep_duration < 6 || metrics.sleep_duration > 9) score += 10;
    else score += 1;
  }

  const avg = factors > 0 ? score / factors : 0;
  return Math.min(Math.round(avg * 2.5), 100);
}

function getRiskLevel(score: number): { label: string; color: string; bg: string; ring: string } {
  if (score < 25) return { label: 'Low Risk', color: 'text-emerald-600', bg: 'bg-emerald-500', ring: 'ring-emerald-200' };
  if (score < 50) return { label: 'Moderate Risk', color: 'text-amber-600', bg: 'bg-amber-500', ring: 'ring-amber-200' };
  if (score < 75) return { label: 'High Risk', color: 'text-orange-600', bg: 'bg-orange-500', ring: 'ring-orange-200' };
  return { label: 'Critical Risk', color: 'text-red-600', bg: 'bg-red-500', ring: 'ring-red-200' };
}

function buildRiskFactors(metrics: HealthMetrics): RiskFactor[] {
  const factors: RiskFactor[] = [];

  // Blood Pressure
  if (metrics.systolic_bp !== null && metrics.diastolic_bp !== null) {
    const status =
      metrics.systolic_bp >= 140 ? 'danger' :
      metrics.systolic_bp >= 130 ? 'warning' : 'normal';
    factors.push({
      name: 'Blood Pressure',
      value: `${metrics.systolic_bp}/${metrics.diastolic_bp} mmHg`,
      status,
      recommendation: status === 'normal'
        ? 'Excellent! Maintain a low-sodium diet and regular exercise.'
        : status === 'warning'
        ? 'Slightly elevated. Reduce salt intake and monitor daily.'
        : 'High BP detected. Consult your cardiologist immediately.',
    });
  }

  // Blood Glucose
  if (metrics.blood_glucose !== null) {
    const status =
      metrics.blood_glucose >= 126 ? 'danger' :
      metrics.blood_glucose >= 100 ? 'warning' : 'normal';
    factors.push({
      name: 'Blood Glucose',
      value: `${metrics.blood_glucose} mg/dL`,
      status,
      recommendation: status === 'normal'
        ? 'Glucose levels are healthy. Keep up the balanced diet.'
        : status === 'warning'
        ? 'Pre-diabetic range. Reduce sugar intake and increase activity.'
        : 'Diabetic range. Follow your doctor\'s treatment plan.',
    });
  }

  // Heart Rate
  if (metrics.heart_rate !== null) {
    const status =
      metrics.heart_rate > 100 || metrics.heart_rate < 50 ? 'danger' :
      metrics.heart_rate > 90 ? 'warning' : 'normal';
    factors.push({
      name: 'Heart Rate',
      value: `${metrics.heart_rate} bpm`,
      status,
      recommendation: status === 'normal'
        ? 'Heart rate is in a healthy range.'
        : status === 'warning'
        ? 'Slightly elevated. Reduce caffeine and stress levels.'
        : 'Abnormal heart rate. Seek medical evaluation promptly.',
    });
  }

  // Sleep
  if (metrics.sleep_duration !== null) {
    const status =
      metrics.sleep_duration < 5 ? 'danger' :
      metrics.sleep_duration < 7 || metrics.sleep_duration > 9 ? 'warning' : 'normal';
    factors.push({
      name: 'Sleep Duration',
      value: `${metrics.sleep_duration} hrs/night`,
      status,
      recommendation: status === 'normal'
        ? 'Great sleep! Consistent rest supports immunity and cognition.'
        : status === 'warning'
        ? 'Slightly off optimal. Aim for 7–9 hours consistently.'
        : 'Severe sleep deprivation. This increases risk of multiple conditions.',
    });
  }

  return factors;
}

const STATUS_STYLES = {
  normal: { dot: 'bg-emerald-500', badge: 'bg-emerald-100 text-emerald-700', label: 'Normal' },
  warning: { dot: 'bg-amber-500', badge: 'bg-amber-100 text-amber-700', label: 'Warning' },
  danger: { dot: 'bg-red-500', badge: 'bg-red-100 text-red-700', label: 'Danger' },
};

export default function RiskAssessmentPage() {
  const [metrics, setMetrics] = useState<HealthMetrics>({
    heart_rate: 72,
    systolic_bp: 120,
    diastolic_bp: 80,
    blood_glucose: 95,
    sleep_duration: 7.5,
    weight: null,
    height: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stored = localStorage.getItem('user');
        if (!stored) return;
        const user = JSON.parse(stored);
        const userId = user.user_id || user.id || 1;
        const res = await fetch(apiUrl(`/api/health-metrics/user/${userId}/latest`));
        if (res.ok) {
          const data = await res.json();
          setMetrics(data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const score = getRiskScore(metrics);
  const level = getRiskLevel(score);
  const riskFactors = buildRiskFactors(metrics);

  const circumference = 2 * Math.PI * 54;
  const dashOffset = circumference - (score / 100) * circumference;

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-6">

      {/* Header */}
      <div className="border-b border-gray-200 pb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xl">⚠️</span>
          <h1 className="text-xl font-bold text-gray-800">Health Risk Assessment</h1>
        </div>
        <p className="text-sm text-gray-500">AI-powered analysis based on your health metrics. Results are indicative only.</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <>
          {/* Score + Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Circular Score */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col items-center justify-center">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Overall Risk Score</p>
              <div className={`relative ring-8 ${level.ring} rounded-full`}>
                <svg className="w-36 h-36 -rotate-90" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="54" fill="none" stroke="#e5e7eb" strokeWidth="10" />
                  <circle
                    cx="60" cy="60" r="54" fill="none"
                    stroke={score < 25 ? '#10b981' : score < 50 ? '#f59e0b' : score < 75 ? '#f97316' : '#ef4444'}
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={dashOffset}
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-gray-800">{score}</span>
                  <span className="text-xs text-gray-400">/ 100</span>
                </div>
              </div>
              <p className={`mt-4 text-sm font-bold ${level.color}`}>{level.label}</p>
            </div>

            {/* Summary Cards */}
            <div className="md:col-span-2 grid grid-cols-2 gap-4">
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-1">Normal Factors</p>
                <p className="text-3xl font-bold text-emerald-700">
                  {riskFactors.filter((f) => f.status === 'normal').length}
                </p>
                <p className="text-xs text-emerald-500 mt-1">Within healthy range</p>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider mb-1">Warnings</p>
                <p className="text-3xl font-bold text-amber-700">
                  {riskFactors.filter((f) => f.status === 'warning').length}
                </p>
                <p className="text-xs text-amber-500 mt-1">Needs monitoring</p>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-xs font-semibold text-red-600 uppercase tracking-wider mb-1">Critical Factors</p>
                <p className="text-3xl font-bold text-red-700">
                  {riskFactors.filter((f) => f.status === 'danger').length}
                </p>
                <p className="text-xs text-red-500 mt-1">Immediate attention</p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">Factors Analyzed</p>
                <p className="text-3xl font-bold text-blue-700">{riskFactors.length}</p>
                <p className="text-xs text-blue-500 mt-1">Health indicators</p>
              </div>
            </div>
          </div>

          {/* Risk Factors List */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="font-bold text-gray-800 mb-4">Detailed Risk Factors</h2>
            <div className="space-y-4">
              {riskFactors.map((factor) => {
                const styles = STATUS_STYLES[factor.status];
                return (
                  <div key={factor.name} className="border border-gray-100 rounded-xl p-4 hover:border-gray-200 transition">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-2.5 h-2.5 rounded-full ${styles.dot}`} />
                        <p className="font-semibold text-gray-800 text-sm">{factor.name}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-mono text-gray-600">{factor.value}</span>
                        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${styles.badge}`}>
                          {styles.label}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 ml-5">{factor.recommendation}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">
            <p className="text-xs text-gray-500">
              ⚠️ This risk assessment is for informational purposes only and does not constitute medical advice.
              Always consult a qualified healthcare professional for diagnosis and treatment.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
