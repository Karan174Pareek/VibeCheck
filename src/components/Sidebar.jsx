import React from 'react';

export function Sidebar({ onNewScan }) {
  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-64px)] w-64 z-40 flex-col p-4 bg-[#182218] border-r-2 border-[#574239] shadow-[inset_-2px_0_4px_rgba(0,0,0,0.5)] hidden md:flex">
      <div className="mb-8 border-b border-[#574239] pb-4">
        <div className="text-[#dec0b4] font-['IBM_Plex_Sans'] text-xs font-semibold mb-2 opacity-50 tracking-wider">
          OPERATOR
        </div>
        <div className="font-['Oswald'] text-2xl text-[#f1c043] leading-none">
          OPERATOR_01
        </div>
        <div className="text-[#dec0b4] font-['JetBrains_Mono'] text-xs mt-1">
          SECTOR-7G
        </div>
      </div>

      <button
        onClick={onNewScan}
        className="switch-plate font-['IBM_Plex_Sans'] text-xs font-semibold py-3 px-4 mb-8 flex justify-center items-center gap-2 w-full uppercase tracking-widest"
      >
        <span className="material-symbols-outlined text-sm">add</span>
        NEW SCAN
      </button>

      <nav className="flex-1 flex flex-col">
        <a className="flex items-center gap-2 text-[#dec0b4] border-2 border-transparent px-4 py-3 mb-2 hover:border-[#a68b80] hover:bg-[#232c22] font-['IBM_Plex_Sans'] text-xs font-semibold tracking-widest" href="#">
          <span className="material-symbols-outlined text-base">dashboard</span>
          DASHBOARD
        </a>
        <a className="flex items-center gap-2 bg-[#b58a03] text-[#362700] border-2 border-[#ffb596] px-4 py-3 mb-2 font-['IBM_Plex_Sans'] text-xs font-semibold tracking-widest shadow-md" href="#">
          <span className="material-symbols-outlined text-base">forum</span>
          SUBREDDITS
        </a>
        <a className="flex items-center gap-2 text-[#dec0b4] border-2 border-transparent px-4 py-3 mb-2 hover:border-[#a68b80] hover:bg-[#232c22] font-['IBM_Plex_Sans'] text-xs font-semibold tracking-widest" href="#">
          <span className="material-symbols-outlined text-base">terminal</span>
          TERMINAL
        </a>
        <a className="flex items-center gap-2 text-[#dec0b4] border-2 border-transparent px-4 py-3 mb-2 hover:border-[#a68b80] hover:bg-[#232c22] font-['IBM_Plex_Sans'] text-xs font-semibold tracking-widest" href="#">
          <span className="material-symbols-outlined text-base">settings_input_component</span>
          CALIBRATION
        </a>
      </nav>

      <div className="mt-auto flex flex-col border-t border-[#574239] pt-4">
        <a className="flex items-center gap-2 text-[#dec0b4] hover:text-[#ffb596] px-4 py-2 font-['IBM_Plex_Sans'] text-xs font-semibold tracking-widest" href="#">
          <span className="material-symbols-outlined text-base">help</span>
          HELP
        </a>
        <a className="flex items-center gap-2 text-[#dec0b4] hover:text-[#ffb596] px-4 py-2 font-['IBM_Plex_Sans'] text-xs font-semibold tracking-widest" href="#">
          <span className="material-symbols-outlined text-base">logout</span>
          LOGOUT
        </a>
      </div>
    </aside>
  );
}
