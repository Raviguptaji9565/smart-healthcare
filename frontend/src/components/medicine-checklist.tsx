'use client';

import { useState } from 'react';
import { Pill, CheckCircle2, Circle, Upload, Sparkles, Plus, Trash2, Clock } from 'lucide-react';
import { toast } from 'sonner';

export interface Medicine {
  id: number;
  name: string;
  dosage?: string;
  instructions?: string;
  is_taken: boolean;
  time?: string;
}

const INITIAL_MEDICINES: Medicine[] = [
  {
    id: 101,
    name: 'Amoxicillin',
    dosage: '500mg',
    instructions: 'Take 1 capsule with water after meals',
    is_taken: true,
    time: '08:00 AM',
  },
  {
    id: 102,
    name: 'Lisinopril',
    dosage: '10mg',
    instructions: 'Daily morning blood pressure management',
    is_taken: false,
    time: '09:00 AM',
  },
  {
    id: 103,
    name: 'Metformin',
    dosage: '850mg',
    instructions: 'Take 1 tablet before dinner',
    is_taken: false,
    time: '07:30 PM',
  },
  {
    id: 104,
    name: 'Multivitamin Complex',
    dosage: '1 Capsule',
    instructions: 'Daily dietary supplement',
    is_taken: true,
    time: '01:00 PM',
  },
];

export function MedicineChecklist({
  initialMedicines = INITIAL_MEDICINES,
}: {
  initialMedicines?: Medicine[];
}) {
  const [medicines, setMedicines] = useState<Medicine[]>(initialMedicines);
  const [newMedName, setNewMedName] = useState('');
  const [newMedDosage, setNewMedDosage] = useState('');
  const [newMedTime, setNewMedTime] = useState('08:00 AM');
  const [showAddForm, setShowAddForm] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  // Toggle Medicine Status
  const toggleTaken = (id: number) => {
    setMedicines((prev) =>
      prev.map((med) => {
        if (med.id === id) {
          const updatedState = !med.is_taken;
          toast.success(
            updatedState
              ? `Marked ${med.name} (${med.dosage || ''}) as taken!`
              : `Reset ${med.name} status.`
          );
          return { ...med, is_taken: updatedState };
        }
        return med;
      })
    );
  };

  // Delete Medicine
  const deleteMed = (id: number) => {
    setMedicines((prev) => prev.filter((m) => m.id !== id));
    toast.info('Medication removed from checklist.');
  };

  // Add Manual Medicine
  const handleAddMedicine = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMedName.trim()) return;

    const newMed: Medicine = {
      id: Date.now(),
      name: newMedName.trim(),
      dosage: newMedDosage.trim() || 'As prescribed',
      instructions: 'Self-added reminder',
      is_taken: false,
      time: newMedTime || '09:00 AM',
    };

    setMedicines((prev) => [newMed, ...prev]);
    setNewMedName('');
    setNewMedDosage('');
    setShowAddForm(false);
    toast.success(`Added ${newMed.name} to reminder schedule.`);
  };

  // Simulated Prescription OCR Upload Handler
  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload a prescription image file (JPEG, PNG, WEBP).');
      return;
    }

    setIsScanning(true);
    toast.loading('Analyzing prescription image with OCR vision AI...', { id: 'ocr-toast' });

    setTimeout(() => {
      // Extract simulated OCR medications from image
      const scannedMedicines: Medicine[] = [
        {
          id: Date.now() + 1,
          name: 'Atorvastatin (Scanned)',
          dosage: '20mg',
          instructions: 'OCR Extracted: 1 tablet daily at bedtime',
          is_taken: false,
          time: '09:00 PM',
        },
        {
          id: Date.now() + 2,
          name: 'Vitamin D3 (Scanned)',
          dosage: '2000 IU',
          instructions: 'OCR Extracted: Take weekly after meal',
          is_taken: false,
          time: '10:00 AM',
        },
      ];

      setMedicines((prev) => [...scannedMedicines, ...prev]);
      setIsScanning(false);
      toast.success('Prescription scanned successfully! Added 2 medications.', {
        id: 'ocr-toast',
      });
    }, 2000);
  };

  const takenCount = medicines.filter((m) => m.is_taken).length;
  const totalCount = medicines.length;
  const progressPercent = totalCount > 0 ? Math.round((takenCount / totalCount) * 100) : 0;

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-5 shadow-sm transition-colors duration-200">
      {/* Header & Adherence Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Pill className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Daily Medicine Reminders
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Track prescriptions and mark taken in real-time
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowAddForm((prev) => !prev)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold shadow-sm transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Medicine</span>
        </button>
      </div>

      {/* Daily Progress Tracker */}
      <div className="mb-5 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
        <div className="flex items-center justify-between text-xs font-semibold mb-2">
          <span className="text-slate-700 dark:text-slate-300">Daily Adherence Progress</span>
          <span className="text-emerald-600 dark:text-emerald-400">
            {takenCount} of {totalCount} Taken ({progressPercent}%)
          </span>
        </div>
        <div className="w-full h-2.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 transition-all duration-500 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Add Medicine Form Modal/Inline */}
      {showAddForm && (
        <form
          onSubmit={handleAddMedicine}
          className="mb-5 p-4 rounded-xl bg-teal-50/60 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800/60 space-y-3 animate-page-enter"
        >
          <p className="text-xs font-bold text-teal-800 dark:text-teal-300">Add New Medication Reminder</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <input
              type="text"
              placeholder="Medicine Name (e.g. Paracetamol)"
              value={newMedName}
              onChange={(e) => setNewMedName(e.target.value)}
              required
              className="px-3 py-2 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <input
              type="text"
              placeholder="Dosage (e.g. 500mg)"
              value={newMedDosage}
              onChange={(e) => setNewMedDosage(e.target.value)}
              className="px-3 py-2 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <input
              type="text"
              placeholder="Scheduled Time (e.g. 09:00 AM)"
              value={newMedTime}
              onChange={(e) => setNewMedTime(e.target.value)}
              className="px-3 py-2 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-3 py-1.5 text-xs text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 text-xs font-semibold bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition"
            >
              Save Reminder
            </button>
          </div>
        </form>
      )}

      {/* Medication Checklist Items */}
      <div className="space-y-2.5 mb-6">
        {medicines.map((med) => (
          <div
            key={med.id}
            onClick={() => toggleTaken(med.id)}
            className={`group p-3.5 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 ${
              med.is_taken
                ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200/80 dark:border-emerald-800/40 text-slate-700 dark:text-slate-300'
                : 'bg-white dark:bg-slate-800/70 border-slate-200 dark:border-slate-700/70 hover:border-teal-400/60 dark:hover:border-teal-500/60'
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <button
                type="button"
                className="shrink-0 focus:outline-none"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleTaken(med.id);
                }}
              >
                {med.is_taken ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-100 dark:fill-emerald-950" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-400 dark:text-slate-500 group-hover:text-teal-500" />
                )}
              </button>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p
                    className={`text-sm font-semibold truncate ${
                      med.is_taken
                        ? 'line-through text-slate-400 dark:text-slate-500'
                        : 'text-slate-900 dark:text-slate-100'
                    }`}
                  >
                    {med.name}
                  </p>
                  {med.dosage && (
                    <span className="px-2 py-0.5 text-[10px] font-semibold rounded-md bg-teal-100 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800/60">
                      {med.dosage}
                    </span>
                  )}
                </div>
                {med.instructions && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                    {med.instructions}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              {med.time && (
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  <Clock className="w-3 h-3 text-slate-400" />
                  {med.time}
                </span>
              )}

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteMed(med.id);
                }}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition opacity-0 group-hover:opacity-100"
                title="Remove reminder"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bonus Feature: Prescription OCR Dropzone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragActive(false);
          if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileUpload(e.dataTransfer.files[0]);
          }
        }}
        className={`p-4 rounded-xl border-2 border-dashed transition-all text-center relative ${
          dragActive
            ? 'border-teal-500 bg-teal-50 dark:bg-teal-950/40'
            : 'border-slate-200 dark:border-slate-800 hover:border-teal-400/50 bg-slate-50/50 dark:bg-slate-800/30'
        }`}
      >
        <input
          type="file"
          accept="image/*"
          id="prescription-upload"
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              handleFileUpload(e.target.files[0]);
            }
          }}
        />
        <label
          htmlFor="prescription-upload"
          className="cursor-pointer flex flex-col items-center justify-center space-y-1.5"
        >
          <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-950/80 text-teal-600 dark:text-teal-400 flex items-center justify-center">
            {isScanning ? (
              <Sparkles className="w-4 h-4 animate-spin text-teal-500" />
            ) : (
              <Upload className="w-4 h-4" />
            )}
          </div>
          <div>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center justify-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-teal-500" />
              Prescription OCR Scanner
            </span>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              Drag & drop or click to upload prescription image for automatic AI medication extraction
            </p>
          </div>
        </label>
      </div>
    </div>
  );
}
