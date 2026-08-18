import React from 'react';

export function LoadingState() {
  return (
    <div className="w-full space-y-8 animate-pulse">
      {/* Vibe Summary Card Skeleton */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border space-y-6">
        <div className="flex flex-col md:flex-row justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div className="space-y-3 flex-1">
            <div className="h-4 w-32 bg-slate-800 rounded-md" />
            <div className="h-9 w-64 bg-slate-800 rounded-xl" />
            <div className="h-4 w-80 bg-slate-800/60 rounded-md" />
          </div>
          <div className="flex gap-3">
            <div className="w-28 h-20 bg-slate-800 rounded-2xl" />
            <div className="w-28 h-20 bg-slate-800 rounded-2xl" />
          </div>
        </div>

        <div className="h-3 w-full bg-slate-800/80 rounded-full" />

        <div className="grid grid-cols-3 gap-3">
          <div className="h-16 bg-slate-800/60 rounded-2xl" />
          <div className="h-16 bg-slate-800/60 rounded-2xl" />
          <div className="h-16 bg-slate-800/60 rounded-2xl" />
        </div>
      </div>

      {/* Charts & Stat Cards Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 glass-panel rounded-3xl p-6 border h-72" />
        <div className="lg:col-span-2 space-y-4">
          <div className="h-20 glass-panel rounded-2xl border" />
          <div className="h-20 glass-panel rounded-2xl border" />
          <div className="h-20 glass-panel rounded-2xl border" />
        </div>
      </div>

      {/* Post List Skeleton */}
      <div className="space-y-3">
        <div className="h-14 glass-panel rounded-2xl border" />
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-24 glass-panel rounded-2xl border p-4 space-y-2" />
        ))}
      </div>
    </div>
  );
}
