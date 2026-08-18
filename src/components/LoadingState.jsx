import React from 'react';

export function LoadingState() {
  return (
    <div className="panel-module p-8 text-center space-y-4 animate-pulse">
      <div className="label-plate">Telemetry Acquisition</div>
      <div className="w-12 h-12 rounded-full border-4 border-[#E0692D] border-t-transparent animate-spin mx-auto mt-4" />
      <div className="font-['Oswald'] text-xl text-[#f1c043] uppercase tracking-widest">
        ACQUIRING SUBREDDIT TELEMETRY STREAM...
      </div>
      <p className="text-xs text-[#dec0b4] font-['JetBrains_Mono']">
        Establishing connection to api.reddit.com JSON telemetry pipeline...
      </p>
    </div>
  );
}
