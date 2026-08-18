import React from 'react';

export function ErrorState({ errorMessage, onRetry, onSelectPreset }) {
  const suggestions = ['reactjs', 'aww', 'technology', 'askreddit'];

  return (
    <div className="panel-module p-8 text-center space-y-6 max-w-2xl mx-auto border-[#e66b5c] shadow-2xl">
      <div className="label-plate" style={{ backgroundColor: '#93000a', color: '#ffdad6', borderColor: '#e66b5c' }}>
        Telemetry Fault
      </div>

      <div className="w-14 h-14 rounded-full bg-[#93000a]/20 border-2 border-[#e66b5c] flex items-center justify-center mx-auto text-[#e66b5c] mt-4">
        <span className="material-symbols-outlined text-3xl">warning</span>
      </div>

      <div className="space-y-2">
        <h3 className="font-['Oswald'] text-2xl text-[#e66b5c] uppercase tracking-wider">
          ACQUISITION FAULT DETECTED
        </h3>
        <p className="font-['JetBrains_Mono'] text-xs sm:text-sm text-[#dec0b4] max-w-md mx-auto leading-relaxed">
          {errorMessage || "Couldn't reach Reddit right now, try again in a moment."}
        </p>
      </div>

      <div className="pt-2 flex justify-center">
        <button
          onClick={onRetry}
          className="switch-plate font-['IBM_Plex_Sans'] text-xs font-semibold px-6 py-3 uppercase tracking-widest inline-flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-base">refresh</span>
          RE-ENGAGE TELEMETRY
        </button>
      </div>

      {/* Suggested Subreddits */}
      <div className="pt-4 border-t border-[#2d372d] space-y-2">
        <span className="text-[11px] text-[#a68b80] uppercase tracking-wider block font-['IBM_Plex_Sans'] font-semibold">
          ALTER TARGET FREQUENCY:
        </span>
        <div className="flex flex-wrap justify-center gap-2">
          {suggestions.map((sub) => (
            <button
              key={sub}
              onClick={() => onSelectPreset(sub)}
              className="px-3 py-1 text-xs font-['JetBrains_Mono'] bg-[#141e15] hover:bg-[#232c22] text-[#f1c043] border border-[#574239] transition-colors"
            >
              r/{sub}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
