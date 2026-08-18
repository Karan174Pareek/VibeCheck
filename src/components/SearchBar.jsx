import React, { useState, useEffect } from 'react';
import { Sparkles, X, ArrowRight, Cpu, Heart, Flame, TrendingUp, Gamepad2, HelpCircle } from 'lucide-react';
import { sanitizeSubreddit } from '../api/reddit';

const PRESET_SUBREDDITS = [
  { name: 'reactjs', label: 'r/reactjs', icon: Cpu, color: 'hover:border-cyan-500/50 hover:text-cyan-400' },
  { name: 'aww', label: 'r/aww', icon: Heart, color: 'hover:border-pink-500/50 hover:text-pink-400' },
  { name: 'technology', label: 'r/technology', icon: Flame, color: 'hover:border-indigo-500/50 hover:text-indigo-400' },
  { name: 'wallstreetbets', label: 'r/wallstreetbets', icon: TrendingUp, color: 'hover:border-amber-500/50 hover:text-amber-400' },
  { name: 'gaming', label: 'r/gaming', icon: Gamepad2, color: 'hover:border-purple-500/50 hover:text-purple-400' },
  { name: 'askreddit', label: 'r/askreddit', icon: HelpCircle, color: 'hover:border-emerald-500/50 hover:text-emerald-400' },
];

export function SearchBar({ onSearch, isLoading, initialValue = 'reactjs' }) {
  const [inputVal, setInputVal] = useState(initialValue);

  useEffect(() => {
    if (initialValue) {
      setInputVal(initialValue);
    }
  }, [initialValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleaned = sanitizeSubreddit(inputVal);
    if (cleaned) {
      onSearch(cleaned);
    }
  };

  const handleClear = () => {
    setInputVal('');
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4">
      <form onSubmit={handleSubmit} className="relative group">
        {/* Glow backdrop on focus */}
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl blur-md opacity-25 group-hover:opacity-40 transition duration-300 group-focus-within:opacity-75" />

        <div className="relative flex items-center bg-slate-900/90 border border-slate-700/80 rounded-xl shadow-2xl overflow-hidden focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/30 transition-all">
          <div className="pl-4 pr-1 text-slate-400 font-mono font-bold text-lg select-none flex items-center gap-1">
            <span className="text-indigo-400">r/</span>
          </div>

          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="enter subreddit name (e.g. reactjs, aww, technology)..."
            disabled={isLoading}
            className="w-full bg-transparent py-4 px-2 text-slate-100 placeholder-slate-500 focus:outline-none font-medium text-base sm:text-lg disabled:opacity-50"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck="false"
          />

          {inputVal && !isLoading && (
            <button
              type="button"
              onClick={handleClear}
              className="p-2 text-slate-400 hover:text-slate-200 transition-colors mr-1"
              title="Clear input"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          <button
            type="submit"
            disabled={isLoading || !inputVal.trim()}
            className="m-1.5 px-5 sm:px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-sm sm:text-base flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Checking...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span className="hidden sm:inline">Check Vibe</span>
                <span className="sm:hidden">Check</span>
                <ArrowRight className="w-4 h-4 hidden sm:block opacity-75" />
              </>
            )}
          </button>
        </div>
      </form>

      {/* Preset Subreddit Chips */}
      <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
        <span className="text-xs font-medium text-slate-400 mr-1">
          Popular presets:
        </span>
        {PRESET_SUBREDDITS.map((preset) => {
          const Icon = preset.icon;
          const isActive = inputVal && inputVal.toLowerCase() === preset.name;
          return (
            <button
              key={preset.name}
              type="button"
              disabled={isLoading}
              onClick={() => {
                setInputVal(preset.name);
                onSearch(preset.name);
              }}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                isActive
                  ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300 shadow-sm shadow-indigo-500/20'
                  : `bg-slate-900/90 border-slate-800 text-slate-300 ${preset.color} hover:bg-slate-800/80`
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <Icon className="w-3.5 h-3.5 opacity-80" />
              <span>{preset.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
