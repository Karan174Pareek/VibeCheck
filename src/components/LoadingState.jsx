import React from 'react';

export function LoadingState() {
  return (
    <div className="panel-module p-8 text-center space-y-6 w-full shadow-2xl relative overflow-hidden">
      <div className="label-plate">Telemetry Acquisition</div>

      <div className="mt-4 flex flex-col items-center space-y-4">
        {/* Animated Dial Scanning Placeholder */}
        <div className="relative w-64 h-32 overflow-hidden border-t-2 border-x-2 border-[#574239] rounded-t-full bg-[#182218] flex items-end justify-center">
          <div className="w-1 h-28 bg-[#E0692D] origin-bottom animate-[spin_2s_ease-in-out_infinite] shadow-[0_0_12px_#E0692D]" />
          <div className="w-6 h-6 rounded-full bg-[#574239] border border-[#0c160d] absolute -bottom-3 z-10" />
        </div>

        <div className="font-['Oswald'] text-2xl text-[#f1c043] uppercase tracking-widest animate-pulse">
          SCANNING SUBREDDIT FREQUENCY...
        </div>

        <p className="text-xs text-[#dec0b4] font-['JetBrains_Mono'] max-w-md mx-auto">
          Parsing live post stream, extracting AFINN-165 sentiment metrics, and calibrating vibe telemetry...
        </p>
      </div>
    </div>
  );
}
