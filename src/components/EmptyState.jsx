import React from 'react';
import { Sparkles, ArrowUp } from 'lucide-react';

export function EmptyState({ onSelectPreset }) {
  return (
    <div className="w-full max-w-xl mx-auto glass-panel rounded-3xl p-10 border border-slate-800 text-center space-y-4">
      <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center mx-auto text-indigo-400">
        <Sparkles className="w-6 h-6" />
      </div>

      <h3 className="text-lg font-bold text-white font-display">
        Ready for a Vibe Check
      </h3>

      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm mx-auto">
        Type any subreddit name in the search bar above or pick a preset to analyze hot post sentiment in real-time.
      </p>

      <div className="pt-2 flex justify-center text-indigo-400 animate-bounce">
        <ArrowUp className="w-5 h-5" />
      </div>
    </div>
  );
}
