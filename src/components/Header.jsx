import React from 'react';

export function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 sm:px-6 h-16 bg-[#0c160d] border-b-2 border-[#574239] shadow-[inset_0_-2px_4px_rgba(0,0,0,0.5)]">
      <div className="font-['Oswald'] text-2xl text-[#ffb596] uppercase tracking-widest flex items-center gap-3">
        <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
          radar
        </span>
        <span>SENTIMENT-TELEMETRY-MK-IV</span>
      </div>

      <nav className="hidden md:flex items-center gap-8 h-full">
        <a className="h-full flex items-center text-[#ffb596] border-b-2 border-[#ffb596] font-['IBM_Plex_Sans'] text-xs font-semibold tracking-widest pt-[2px]" href="#">
          LIVE FEED
        </a>
        <a className="h-full flex items-center text-[#dec0b4] hover:text-[#ffb596] transition-colors font-['IBM_Plex_Sans'] text-xs font-semibold tracking-widest" href="#">
          ARCHIVES
        </a>
        <a className="h-full flex items-center text-[#dec0b4] hover:text-[#ffb596] transition-colors font-['IBM_Plex_Sans'] text-xs font-semibold tracking-widest" href="#">
          SYSTEM LOG
        </a>
      </nav>

      <div className="flex items-center gap-4 text-[#dec0b4]">
        <button className="hover:text-[#ffb596] transition-colors">
          <span className="material-symbols-outlined">settings</span>
        </button>
        <button className="hover:text-[#ffb596] transition-colors">
          <span className="material-symbols-outlined">power_settings_new</span>
        </button>
      </div>
    </header>
  );
}
