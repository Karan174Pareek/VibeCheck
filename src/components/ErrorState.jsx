import React from 'react';
import { AlertCircle, RefreshCw, HelpCircle, ArrowRight } from 'lucide-react';

export function ErrorState({ errorMessage, onRetry, onSelectPreset }) {
  const suggestions = ['reactjs', 'aww', 'technology', 'askreddit'];

  return (
    <div className="w-full max-w-2xl mx-auto glass-panel rounded-3xl p-8 border border-rose-500/30 text-center space-y-6 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mx-auto text-rose-400">
        <AlertCircle className="w-7 h-7" />
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-bold text-white font-display">
          Unable to check subreddit
        </h3>
        <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
          {errorMessage || "Couldn't reach Reddit right now, try again in a moment."}
        </p>
      </div>

      <div className="pt-2 flex justify-center">
        <button
          onClick={onRetry}
          className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm flex items-center gap-2 border border-slate-700 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Try Again</span>
        </button>
      </div>

      {/* Suggested Subreddits */}
      <div className="pt-4 border-t border-slate-800/80 space-y-2">
        <span className="text-xs text-slate-400 font-medium flex items-center justify-center gap-1">
          <HelpCircle className="w-3.5 h-3.5 text-indigo-400" /> Try a known active subreddit instead:
        </span>

        <div className="flex flex-wrap justify-center gap-2">
          {suggestions.map((sub) => (
            <button
              key={sub}
              onClick={() => onSelectPreset(sub)}
              className="px-3 py-1 rounded-lg text-xs font-mono bg-slate-900 hover:bg-slate-800 border border-slate-800 text-indigo-300 flex items-center gap-1 transition-colors"
            >
              <span>r/{sub}</span>
              <ArrowRight className="w-3 h-3 opacity-60" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
