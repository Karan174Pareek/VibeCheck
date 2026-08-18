import React from 'react';

export function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 sm:px-8 h-16 bg-[#0c160d] border-b-2 border-[#574239] shadow-[inset_0_-2px_4px_rgba(0,0,0,0.5)]">
      <div className="font-['Oswald'] text-xl sm:text-2xl text-[#ffb596] uppercase tracking-widest flex items-center gap-2.5">
        <span className="w-8 h-8 rounded-md bg-[#232c22] border border-[#ffb596] text-[#ffb596] font-mono text-lg font-bold flex items-center justify-center shadow-sm">
          @
        </span>
        <span>Subreddit Vibe Check</span>
      </div>

      <div className="flex items-center gap-2 text-xs font-['IBM_Plex_Sans'] font-semibold text-[#dec0b4] tracking-widest">
        <span className="w-2 h-2 rounded-full bg-[#f1c043] animate-pulse" />
        <span className="hidden sm:inline uppercase">Live Telemetry</span>
      </div>
    </header>
  );
}
