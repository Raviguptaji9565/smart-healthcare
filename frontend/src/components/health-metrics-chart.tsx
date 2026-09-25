'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { Activity, Heart, Droplets, Moon } from 'lucide-react';

interface MetricPoint {
  time: string;
  heartRate: number;
  systolicBp: number;
  diastolicBp: number;
  glucose: number;
  sleep: number;
}

const SAMPLE_METRICS_DATA: MetricPoint[] = [
  { time: 'Mon', heartRate: 71, systolicBp: 118, diastolicBp: 78, glucose: 92, sleep: 7.2 },
  { time: 'Tue', heartRate: 74, systolicBp: 122, diastolicBp: 81, glucose: 96, sleep: 6.8 },
  { time: 'Wed', heartRate: 69, systolicBp: 119, diastolicBp: 79, glucose: 90, sleep: 8.0 },
  { time: 'Thu', heartRate: 76, systolicBp: 125, diastolicBp: 84, glucose: 102, sleep: 6.5 },
  { time: 'Fri', heartRate: 72, systolicBp: 120, diastolicBp: 80, glucose: 94, sleep: 7.5 },
  { time: 'Sat', heartRate: 68, systolicBp: 116, diastolicBp: 76, glucose: 89, sleep: 8.4 },
  { time: 'Sun', heartRate: 73, systolicBp: 121, diastolicBp: 80, glucose: 95, sleep: 7.8 },
];

export function HealthMetricsChart({
  data = SAMPLE_METRICS_DATA,
}: {
  data?: MetricPoint[];
}) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'cardio' | 'metabolic'>('all');

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === 'dark' : true;

  // Theme dependent styling
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)';
  const textColor = isDark ? '#94a3b8' : '#64748b';
  const tooltipBg = isDark ? '#0f172a' : '#ffffff';
  const tooltipBorder = isDark ? '#1e293b' : '#e2e8f0';
  const tooltipText = isDark ? '#f8fafc' : '#0f172a';

  if (!mounted) {
    return (
      <div className="w-full h-72 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 animate-pulse flex items-center justify-center text-slate-400 text-sm">
        Initializing Health Analytics Visualizer...
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-5 shadow-sm transition-colors duration-200">
      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center">
              <Activity className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Vitals & Biometric Trends
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Dynamic 7-day health telemetry adapted to active theme
          </p>
        </div>

        {/* Metric Selector Tabs */}
        <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-xs font-medium self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'all'
                ? 'bg-white dark:bg-slate-700 text-teal-600 dark:text-teal-300 font-semibold shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            All Metrics
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('cardio')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'cardio'
                ? 'bg-white dark:bg-slate-700 text-teal-600 dark:text-teal-300 font-semibold shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Cardiovascular
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('metabolic')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'metabolic'
                ? 'bg-white dark:bg-slate-700 text-teal-600 dark:text-teal-300 font-semibold shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Glucose & Sleep
          </button>
        </div>
      </div>

      {/* Chart Area */}
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorHeart" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#14b8a6" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="colorBp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="colorGlucose" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#a855f7" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#a855f7" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="colorSleep" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />

            <XAxis
              dataKey="time"
              stroke={textColor}
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: gridColor }}
            />
            <YAxis
              stroke={textColor}
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: gridColor }}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: tooltipBg,
                borderColor: tooltipBorder,
                borderRadius: '12px',
                color: tooltipText,
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2)',
                fontSize: '12px',
              }}
              itemStyle={{ color: tooltipText }}
            />
            <Legend
              wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
            />

            {(activeTab === 'all' || activeTab === 'cardio') && (
              <>
                <Area
                  type="monotone"
                  dataKey="heartRate"
                  name="Heart Rate (bpm)"
                  stroke="#14b8a6"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorHeart)"
                />
                <Area
                  type="monotone"
                  dataKey="systolicBp"
                  name="Systolic BP (mmHg)"
                  stroke="#38bdf8"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorBp)"
                />
              </>
            )}

            {(activeTab === 'all' || activeTab === 'metabolic') && (
              <>
                <Area
                  type="monotone"
                  dataKey="glucose"
                  name="Blood Glucose (mg/dL)"
                  stroke="#a855f7"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorGlucose)"
                />
                <Area
                  type="monotone"
                  dataKey="sleep"
                  name="Sleep Duration (hrs)"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorSleep)"
                />
              </>
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Footer Metrics Quick Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
          <Heart className="w-4 h-4 text-teal-500 shrink-0" />
          <div>
            <span className="font-semibold text-slate-900 dark:text-white">72 bpm</span> Avg Heart Rate
          </div>
        </div>

        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
          <Activity className="w-4 h-4 text-cyan-500 shrink-0" />
          <div>
            <span className="font-semibold text-slate-900 dark:text-white">120/80</span> Blood Pressure
          </div>
        </div>

        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
          <Droplets className="w-4 h-4 text-purple-500 shrink-0" />
          <div>
            <span className="font-semibold text-slate-900 dark:text-white">95 mg/dL</span> Glucose
          </div>
        </div>

        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
          <Moon className="w-4 h-4 text-amber-500 shrink-0" />
          <div>
            <span className="font-semibold text-slate-900 dark:text-white">7.5 hrs</span> Night Rest
          </div>
        </div>
      </div>
    </div>
  );
}
