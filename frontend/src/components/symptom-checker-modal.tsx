'use client';

import { useState } from 'react';
import { X, AlertTriangle, ShieldCheck, AlertOctagon, Activity, ChevronRight, ChevronLeft, Calendar, Stethoscope } from 'lucide-react';
import Link from 'next/link';

interface SymptomAssessmentResult {
  score: number;
  level: 'LOW' | 'MODERATE' | 'HIGH';
  summary: string;
  recommendations: string[];
  urgencyText: string;
}

export function SymptomCheckerModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [step, setStep] = useState(1);
  const [symptomCategory, setSymptomCategory] = useState('cardiovascular');
  const [duration, setDuration] = useState('1-3 days');
  const [preExisting, setPreExisting] = useState<string[]>([]);
  const [severity, setSeverity] = useState(4);
  const [result, setResult] = useState<SymptomAssessmentResult | null>(null);

  if (!isOpen) return null;

  const toggleCondition = (cond: string) => {
    setPreExisting((prev) =>
      prev.includes(cond) ? prev.filter((c) => c !== cond) : [...prev, cond]
    );
  };

  const calculateRisk = () => {
    let score = severity * 7;

    if (duration === 'more than a week') score += 15;
    if (duration === '1-3 days') score += 8;

    if (preExisting.includes('Hypertension')) score += 12;
    if (preExisting.includes('Diabetes')) score += 10;
    if (preExisting.includes('Asthma / Respiratory')) score += 10;
    if (preExisting.includes('Heart Disease')) score += 20;

    if (symptomCategory === 'cardiovascular') score += 15;
    if (symptomCategory === 'neurological') score += 12;

    score = Math.min(Math.max(score, 12), 98);

    let level: 'LOW' | 'MODERATE' | 'HIGH' = 'LOW';
    let summary = 'Vitals and symptom profiles suggest low risk. Continue routine monitoring.';
    let urgencyText = 'Standard Consultation Recommended';
    let recommendations = [
      'Maintain adequate hydration and rest.',
      'Log daily vitals in patient dashboard.',
      'Schedule routine health checkup if symptoms persist beyond 48 hours.',
    ];

    if (score >= 65) {
      level = 'HIGH';
      summary = 'High priority health risk indicator detected based on reported severity and cardiovascular factors.';
      urgencyText = 'Immediate Clinical Evaluation Advised';
      recommendations = [
        'Seek urgent clinical or emergency medical evaluation.',
        'Do not undertake strenuous physical activity.',
        'Contact emergency response or go to nearest emergency department if severe chest pain or dyspnea occurs.',
      ];
    } else if (score >= 40) {
      level = 'MODERATE';
      summary = 'Moderate risk score identified. Early medical consultation is recommended.';
      urgencyText = 'Same-Day or Next-Day Consultation Advised';
      recommendations = [
        'Book a consultation with a specialist doctor within 24 hours.',
        'Monitor blood pressure and heart rate every 4 hours.',
        'Avoid caffeine, alcohol, and heavy meals.',
      ];
    }

    setResult({
      score,
      level,
      summary,
      recommendations,
      urgencyText,
    });
    setStep(5); // Result View Step
  };

  const handleReset = () => {
    setStep(1);
    setResult(null);
    setSeverity(4);
    setPreExisting([]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-page-enter">
      <div className="relative w-full max-w-xl rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-2xl transition-all">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-xl p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              AI Symptom Checker & Risk Assessment
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Clinical decision-support questionnaire (Step {Math.min(step, 4)} of 4)
            </p>
          </div>
        </div>

        {/* Question 1: Primary Symptom Category */}
        {step === 1 && (
          <div className="space-y-4 animate-page-enter">
            <label className="text-sm font-semibold text-slate-800 dark:text-slate-200 block">
              1. What primary symptom area are you experiencing?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                { id: 'cardiovascular', title: 'Chest / Heart', desc: 'Palpitations, chest tightness, elevated heart rate' },
                { id: 'respiratory', title: 'Respiratory / Lungs', desc: 'Shortness of breath, persistent cough, wheezing' },
                { id: 'neurological', title: 'Head & Neurological', desc: 'Dizziness, severe headache, confusion' },
                { id: 'general', title: 'General / Fatigue', desc: 'Fever, body aches, exhaustion, nausea' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSymptomCategory(item.id)}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    symptomCategory === item.id
                      ? 'border-teal-500 bg-teal-50/60 dark:bg-teal-950/40 text-slate-900 dark:text-slate-100 font-medium'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <p className="text-xs font-bold">{item.title}</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">{item.desc}</p>
                </button>
              ))}
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold rounded-xl transition"
              >
                <span>Next Question</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Question 2: Duration */}
        {step === 2 && (
          <div className="space-y-4 animate-page-enter">
            <label className="text-sm font-semibold text-slate-800 dark:text-slate-200 block">
              2. How long have these symptoms been present?
            </label>
            <div className="space-y-2.5">
              {[
                { id: 'less than 24h', label: 'Less than 24 hours (Sudden Onset)' },
                { id: '1-3 days', label: '1 to 3 Days' },
                { id: '4-7 days', label: '4 to 7 Days' },
                { id: 'more than a week', label: 'More than 1 Week (Chronic)' },
              ].map((dur) => (
                <button
                  key={dur.id}
                  type="button"
                  onClick={() => setDuration(dur.id)}
                  className={`w-full p-3 rounded-xl border text-left text-xs font-semibold transition-all ${
                    duration === dur.id
                      ? 'border-teal-500 bg-teal-50/60 dark:bg-teal-950/40 text-teal-800 dark:text-teal-200'
                      : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  {dur.label}
                </button>
              ))}
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold rounded-xl transition"
              >
                <span>Next Question</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Question 3: Pre-existing Conditions */}
        {step === 3 && (
          <div className="space-y-4 animate-page-enter">
            <label className="text-sm font-semibold text-slate-800 dark:text-slate-200 block">
              3. Select any pre-existing medical conditions (Multiple allowed):
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {['Hypertension', 'Diabetes', 'Asthma / Respiratory', 'Heart Disease', 'High Cholesterol', 'None'].map(
                (cond) => {
                  const selected = preExisting.includes(cond);
                  return (
                    <button
                      key={cond}
                      type="button"
                      onClick={() => toggleCondition(cond)}
                      className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all ${
                        selected
                          ? 'border-teal-500 bg-teal-50 dark:bg-teal-950/50 text-teal-800 dark:text-teal-200'
                          : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                      }`}
                    >
                      {selected ? '✓ ' : '+ '} {cond}
                    </button>
                  );
                }
              )}
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={() => setStep(4)}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold rounded-xl transition"
              >
                <span>Next Question</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Question 4: Severity Scale */}
        {step === 4 && (
          <div className="space-y-5 animate-page-enter">
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm font-semibold">
                <span className="text-slate-800 dark:text-slate-200">
                  4. Pain / Discomfort Severity Level
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300 font-bold text-xs">
                  {severity} / 10
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={severity}
                onChange={(e) => setSeverity(parseInt(e.target.value))}
                className="w-full h-2 rounded-lg bg-slate-200 dark:bg-slate-700 accent-teal-500 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                <span>1 - Mild Discomfort</span>
                <span>5 - Moderate Pain</span>
                <span>10 - Severe Distress</span>
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={calculateRisk}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white text-xs font-bold rounded-xl shadow-md transition"
              >
                <Stethoscope className="w-4 h-4" />
                <span>Calculate Risk Score</span>
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Risk Results View */}
        {step === 5 && result && (
          <div className="space-y-5 animate-page-enter">
            {/* Risk Badge Header */}
            <div
              className={`p-4 rounded-xl border flex items-center gap-3.5 ${
                result.level === 'HIGH'
                  ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200'
                  : result.level === 'MODERATE'
                  ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200'
                  : 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200'
              }`}
            >
              {result.level === 'HIGH' && <AlertOctagon className="w-7 h-7 text-rose-500 shrink-0" />}
              {result.level === 'MODERATE' && <AlertTriangle className="w-7 h-7 text-amber-500 shrink-0" />}
              {result.level === 'LOW' && <ShieldCheck className="w-7 h-7 text-emerald-500 shrink-0" />}

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Risk Assessment Score: {result.score} / 100
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-white/60 dark:bg-black/40">
                    {result.level} RISK
                  </span>
                </div>
                <p className="text-xs font-medium mt-0.5">{result.urgencyText}</p>
              </div>
            </div>

            {/* Assessment Summary */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide">
                Clinical Summary
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                {result.summary}
              </p>
            </div>

            {/* Action Recommendations */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide">
                Recommended Actions
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                {result.recommendations.map((rec, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-teal-500 font-bold">•</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-auto px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition"
              >
                Retake Assessment
              </button>
              <Link
                href="/dashboard/book-appointment"
                onClick={onClose}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl shadow-md transition"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Doctor Consultation</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
