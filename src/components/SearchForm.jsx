import React, { useState, useEffect } from 'react';
import { Search, X, Sparkles, ArrowRight } from 'lucide-react';
import { PresetChips } from './PresetChips';
import { sanitizeSubredditName } from '../services/redditApi';

export function SearchForm({ onSearch, isLoading, initialValue = 'reactjs' }) {
  const [inputVal, setInputVal] = useState(initialValue);

  useEffect(() => {
    if (initialValue) {
      setInputVal(initialValue);
    }
  }, [initialValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleaned = sanitizeSubredditName(inputVal);
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
        {/* Glowing background aura on focus */}
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl blur-md opacity-25 group-hover:opacity-40 transition duration-300 group-focus-within:opacity-75"></div>

        <div className="relative flex items-center bg-slate-900/90 border border-slate-700/80 rounded-xl shadow-2xl overflow-hidden focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/30 transition-all">
          {/* Prefix indicator */}
          <div className="pl-4 pr-1 text-slate-400 font-mono font-bold text-lg select-none flex items-center gap-1.5">
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
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
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

      {/* Preset Subreddit Quick Chips */}
      <PresetChips
        activeSubreddit={inputVal}
        disabled={isLoading}
        onSelectPreset={(subName) => {
          setInputVal(subName);
          onSearch(subName);
        }}
      />
    </div>
  );
}
