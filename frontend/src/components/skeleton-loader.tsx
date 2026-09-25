'use client';

export function VitalsSkeleton() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="p-5 rounded-2xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 animate-pulse space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="h-3.5 w-24 bg-slate-200 dark:bg-slate-800 rounded-md" />
            <div className="w-7 h-7 bg-slate-200 dark:bg-slate-800 rounded-lg" />
          </div>
          <div className="h-8 w-20 bg-slate-300 dark:bg-slate-700 rounded-lg" />
          <div className="h-3 w-16 bg-slate-200 dark:bg-slate-800 rounded-md" />
        </div>
      ))}
    </div>
  );
}

export function AppointmentSkeleton() {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="p-4 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 animate-pulse flex items-center justify-between gap-4"
        >
          <div className="space-y-2 flex-1">
            <div className="h-4 w-40 bg-slate-300 dark:bg-slate-700 rounded-md" />
            <div className="h-3 w-28 bg-slate-200 dark:bg-slate-800 rounded-md" />
          </div>
          <div className="h-6 w-20 bg-slate-200 dark:bg-slate-800 rounded-full" />
        </div>
      ))}
    </div>
  );
}

export function MedicineSkeleton() {
  return (
    <div className="space-y-2.5">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 animate-pulse flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 bg-slate-200 dark:bg-slate-800 rounded-md" />
            <div className="space-y-1.5">
              <div className="h-3.5 w-32 bg-slate-300 dark:bg-slate-700 rounded-md" />
              <div className="h-2.5 w-24 bg-slate-200 dark:bg-slate-800 rounded-md" />
            </div>
          </div>
          <div className="h-6 w-16 bg-slate-200 dark:bg-slate-800 rounded-md" />
        </div>
      ))}
    </div>
  );
}

export function TableSkeleton() {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 animate-pulse">
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div className="h-5 w-36 bg-slate-200 dark:bg-slate-800 rounded-md" />
        <div className="h-8 w-28 bg-slate-200 dark:bg-slate-800 rounded-lg" />
      </div>
      <div className="divide-y divide-slate-100 dark:divide-slate-800">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1">
              <div className="w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-800 shrink-0" />
              <div className="space-y-2">
                <div className="h-4 w-36 bg-slate-300 dark:bg-slate-700 rounded-md" />
                <div className="h-3 w-48 bg-slate-200 dark:bg-slate-800 rounded-md" />
              </div>
            </div>
            <div className="h-6 w-20 bg-slate-200 dark:bg-slate-800 rounded-full" />
            <div className="h-8 w-24 bg-slate-200 dark:bg-slate-800 rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
}
