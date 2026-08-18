import React from 'react';

export function EmptyState({ onSelectPreset }) {
  return (
    <div className="panel-module p-8 text-center space-y-4 max-w-xl mx-auto shadow-2xl">
      <div className="label-plate">Console Standby</div>

      <div className="w-12 h-12 rounded-full bg-[#182218] border border-[#ffb596] flex items-center justify-center mx-auto text-[#ffb596] mt-4">
        <span className="material-symbols-outlined text-2xl">radar</span>
      </div>

      <h3 className="font-['Oswald'] text-xl text-[#f1c043] uppercase tracking-wider">
        READY FOR TELEMETRY ACQUISITION
      </h3>

      <p className="font-['JetBrains_Mono'] text-xs text-[#dec0b4] max-w-sm mx-auto leading-relaxed">
        Enter a subreddit in Target Acquisition above or select a preset frequency to commence real-time sentiment telemetry scan.
      </p>
    </div>
  );
}
