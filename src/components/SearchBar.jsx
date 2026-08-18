import React, { useState, useEffect } from 'react';
import { sanitizeSubreddit } from '../api/reddit';

const PRESET_SUBREDDITS = ['reactjs', 'aww', 'technology', 'wallstreetbets', 'gaming', 'askreddit'];

export function SearchBar({ onSearch, isLoading, initialValue = 'reactjs' }) {
  const [inputVal, setInputVal] = useState(initialValue);

  useEffect(() => {
    if (initialValue) setInputVal(initialValue);
  }, [initialValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleaned = sanitizeSubreddit(inputVal);
    if (cleaned) {
      onSearch(cleaned);
    }
  };

  return (
    <div className="panel-module p-6 lg:col-span-2 flex flex-col justify-center">
      <div className="label-plate">Target Acquisition</div>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch sm:items-end gap-4 mt-4">
        <div className="flex-1">
          <label className="block font-['IBM_Plex_Sans'] text-xs font-semibold text-[#dec0b4] mb-2 tracking-widest uppercase">
            SUBREDDIT_IDENTIFIER
          </label>
          
          <div className="mechanical-input px-4 py-3 flex items-center font-['JetBrains_Mono'] font-bold text-lg sm:text-xl">
            <span className="opacity-50 mr-1 select-none">r/</span>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="MachineLearning"
              disabled={isLoading}
              className="bg-transparent border-none outline-none text-[#E0692D] w-full font-['JetBrains_Mono'] font-bold placeholder-[#574239]"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck="false"
            />
            <span className="blinking-cursor ml-1 inline-block w-3 h-5 bg-[#E0692D] flex-shrink-0" />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || !inputVal.trim()}
          className="switch-plate font-['IBM_Plex_Sans'] text-xs font-semibold px-6 sm:px-8 py-3.5 h-[52px] uppercase tracking-widest flex items-center justify-center gap-2 flex-shrink-0"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-[#E0692D] border-t-transparent rounded-full animate-spin" />
              <span>ACQUIRING...</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-lg">power</span>
              <span>ENGAGE SCAN</span>
            </>
          )}
        </button>
      </form>

      {/* Preset Subreddits */}
      <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-[#2d372d]">
        <span className="text-[11px] font-['IBM_Plex_Sans'] font-semibold text-[#a68b80] uppercase tracking-wider">
          PRESET FREQUENCIES:
        </span>
        {PRESET_SUBREDDITS.map((sub) => (
          <button
            key={sub}
            type="button"
            disabled={isLoading}
            onClick={() => {
              setInputVal(sub);
              onSearch(sub);
            }}
            className="px-2.5 py-1 text-xs font-['JetBrains_Mono'] bg-[#141e15] hover:bg-[#232c22] text-[#f1c043] border border-[#574239] transition-colors"
          >
            r/{sub}
          </button>
        ))}
      </div>
    </div>
  );
}
