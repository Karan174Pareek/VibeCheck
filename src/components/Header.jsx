import React from 'react';
import { Sparkles, Radio, Activity } from 'lucide-react';

export function Header() {
  return (
    <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-slate-950 rounded-full"></span>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-lg font-bold text-white tracking-tight font-display">
                Subreddit Vibe Check
              </h1>
              <span className="px-2 py-0.5 text-[10px] font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full uppercase tracking-wider">
                Live Analysis
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Real-time client-side sentiment analysis for public subreddits
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-xs text-slate-400 bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-full">
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>Reddit Public JSON API</span>
          </div>
          <div className="flex items-center space-x-2 text-xs text-slate-400 bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-full">
            <Activity className="w-3.5 h-3.5 text-indigo-400" />
            <span>AFINN-165 Sentiment Engine</span>
          </div>
        </div>
      </div>
    </header>
  );
}
