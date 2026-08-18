import React from 'react';

export function AnalogGauge({ vibeSummary }) {
  if (!vibeSummary) return null;

  const { avgScore, avgComparative, overallLabel, vibeMeta } = vibeSummary;

  // Map comparative score (-0.3 .. +0.3) to gauge angle (0deg .. 180deg)
  const rotationDeg = Math.min(Math.max(((avgComparative + 0.3) / 0.6) * 180, 0), 180);

  // Format score display (scale to 0..10 or display raw score)
  const displayScore = avgScore > 0 ? `+${avgScore}` : `${avgScore}`;

  return (
    <div className="panel-module p-6 flex flex-col items-center justify-center min-h-[300px]">
      <div className="label-plate">Primary Vibe Reading</div>

      <div className="mt-8 relative">
        <div className="gauge-container">
          <div className="gauge-scale" />
          <div className="gauge-ticks" />
          <div className="gauge-glass" />
          <div
            className="gauge-needle"
            style={{ transform: `translateX(-50%) rotate(${rotationDeg}deg)` }}
          />
          <div className="gauge-pivot" />
        </div>

        <div className="flex justify-between w-full px-4 mt-4 font-['IBM_Plex_Sans'] text-xs font-semibold tracking-widest text-[#dec0b4]">
          <span className="text-[#B5473A]">STORMY</span>
          <span className="text-[#f1c043]">{overallLabel.toUpperCase()}</span>
          <span className="text-[#D4A62A]">SUNNY</span>
        </div>

        {/* Readout Display Badge */}
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-[#0c160d] border border-[#574239] px-5 py-1.5 font-['Oswald'] text-3xl sm:text-4xl text-[#f1c043] shadow-lg z-20 font-bold tracking-tight">
          {displayScore}
        </div>
      </div>
    </div>
  );
}
