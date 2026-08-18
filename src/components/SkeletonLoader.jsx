import React from 'react';

export function SkeletonLoader() {
  return (
    <div className="w-full space-y-8 animate-pulse">
      {/* Vibe Summary Card Skeleton */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border space-y-6">
        <div className="flex flex-col md:flex-row justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div className="space-y-3 flex-1">
            <div className="h-4 w-32 bg-slate-800 rounded-md"></div>
            <div className="h-9 w-64 bg-slate-800 rounded-xl"></div>
            <div className="h-4 w-80 bg-slate-800/60 rounded-md"></div>
          </div>
          <div className="flex gap-3">
            <div className="w-28 h-20 bg-slate-800 rounded-2xl"></div>
            <div className="w-28 h-20 bg-slate-800 rounded-2xl"></div>
          </div>
        </div>

        <div className="h-3 w-full bg-slate-800/80 rounded-full"></div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="h-20 bg-slate-800/60 rounded-2xl"></div>
          <div className="h-20 bg-slate-800/60 rounded-2xl"></div>
          <div className="h-20 bg-slate-800/60 rounded-2xl"></div>
          <div className="h-20 bg-slate-800/60 rounded-2xl"></div>
        </div>
      </div>

      {/* Charts & Highlights Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-panel rounded-3xl p-6 border h-72"></div>
        <div className="glass-panel rounded-3xl p-6 border h-72"></div>
      </div>

      {/* Post List Skeleton */}
      <div className="space-y-3">
        <div className="h-14 glass-panel rounded-2xl border"></div>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-24 glass-panel rounded-2xl border p-4 space-y-2">
            <div className="h-4 bg-slate-800 rounded w-3/4"></div>
            <div className="h-3 bg-slate-800/50 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
