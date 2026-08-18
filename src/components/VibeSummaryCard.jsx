import React from 'react';
import { ShieldCheck, ThumbsUp, ThumbsDown } from 'lucide-react';

export function VibeSummaryCard({ subreddit, vibeSummary }) {
  if (!vibeSummary) return null;

  const { overallLabel, avgScore, avgComparative, counts, totalPosts, vibeMeta } = vibeSummary;

  // Percentage calculations
  const posPercent = totalPosts ? Math.round((counts.positive / totalPosts) * 100) : 0;
  const neuPercent = totalPosts ? Math.round((counts.neutral / totalPosts) * 100) : 0;
  const negPercent = totalPosts ? Math.round((counts.negative / totalPosts) * 100) : 0;

  // Scale average comparative score (-0.3..+0.3) into gauge meter (5%..95%)
  const meterPercent = Math.min(Math.max(((avgComparative + 0.3) / 0.6) * 100, 5), 95);

  return (
    <div className="relative rounded-3xl overflow-hidden glass-panel p-6 sm:p-8 border shadow-2xl transition-all">
      {/* Ambient glowing gradient backdrop */}
      <div className={`absolute inset-0 bg-gradient-to-br ${vibeMeta.gradient} pointer-events-none -z-10`} />

      <div className="space-y-6">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-xs font-bold font-mono text-slate-400 uppercase bg-slate-900/80 px-2.5 py-1 rounded-md border border-slate-800">
                r/{subreddit}
              </span>
              <span className="flex items-center gap-1 text-xs text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                {totalPosts} Hot Posts Analyzed
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center gap-3 font-display">
              <span>{vibeMeta.emoji}</span>
              <span className={vibeMeta.textColor}>{overallLabel}</span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              {vibeMeta.tagline}
            </p>
          </div>

          {/* Average Score Box */}
          <div className="flex items-center gap-3">
            <div className={`p-4 rounded-2xl border ${vibeMeta.badgeBg} flex flex-col items-center justify-center min-w-[120px] shadow-lg`}>
              <span className="text-2xl sm:text-3xl font-extrabold font-mono tracking-tight">
                {avgScore > 0 ? `+${avgScore}` : avgScore}
              </span>
              <span className="text-[11px] font-semibold tracking-wider uppercase opacity-80">
                Avg Score
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col items-center justify-center min-w-[120px]">
              <span className="text-2xl sm:text-3xl font-extrabold font-mono text-indigo-400 tracking-tight">
                {avgComparative > 0 ? `+${avgComparative}` : avgComparative}
              </span>
              <span className="text-[11px] font-semibold text-slate-400 tracking-wider uppercase">
                Comparative
              </span>
            </div>
          </div>
        </div>

        {/* Sentiment Meter Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-semibold text-slate-400">
            <span className="flex items-center gap-1 text-rose-400">
              <ThumbsDown className="w-3.5 h-3.5" /> Negative (-1.0)
            </span>
            <span className="text-slate-300">Sentiment Meter</span>
            <span className="flex items-center gap-1 text-emerald-400">
              Positive (+1.0) <ThumbsUp className="w-3.5 h-3.5" />
            </span>
          </div>

          <div className="relative w-full h-3 bg-slate-950 rounded-full border border-slate-800 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-rose-500 via-amber-400 to-emerald-500 opacity-80" />
            <div
              className="absolute top-0 bottom-0 w-2 bg-white rounded-full shadow-lg shadow-white/50 -ml-1 transition-all duration-700 ease-out"
              style={{ left: `${meterPercent}%` }}
            />
          </div>
        </div>

        {/* Counts summary row */}
        <div className="grid grid-cols-3 gap-3 pt-2">
          <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center">
            <span className="block text-xl font-bold text-emerald-300 font-mono">{posPercent}%</span>
            <span className="text-[11px] font-semibold text-emerald-400/80 uppercase">Positive ({counts.positive})</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-800/50 border border-slate-700/50 text-center">
            <span className="block text-xl font-bold text-slate-200 font-mono">{neuPercent}%</span>
            <span className="text-[11px] font-semibold text-slate-400 uppercase">Neutral ({counts.neutral})</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-center">
            <span className="block text-xl font-bold text-rose-300 font-mono">{negPercent}%</span>
            <span className="text-[11px] font-semibold text-rose-400/80 uppercase">Negative ({counts.negative})</span>
          </div>
        </div>
      </div>
    </div>
  );
}
