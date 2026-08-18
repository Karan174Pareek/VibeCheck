import React from 'react';

export function VibeSummaryCard({ subreddit, vibeSummary }) {
  if (!vibeSummary) return null;

  const { overallLabel, avgScore, avgComparative, counts, totalPosts, vibeMeta } = vibeSummary;

  // Percentage calculations
  const posPercent = totalPosts ? Math.round((counts.positive / totalPosts) * 100) : 0;
  const neuPercent = totalPosts ? Math.round((counts.neutral / totalPosts) * 100) : 0;
  const negPercent = totalPosts ? Math.round((counts.negative / totalPosts) * 100) : 0;

  // Map comparative score (-0.3 .. +0.3) to gauge angle (0deg .. 180deg)
  const rotationDeg = Math.min(Math.max(((avgComparative + 0.3) / 0.6) * 180, 0), 180);

  const displayScore = avgScore > 0 ? `+${avgScore}` : `${avgScore}`;

  return (
    <div className="panel-module p-6 sm:p-8 w-full flex flex-col items-center justify-center min-h-[380px] shadow-2xl relative overflow-hidden">
      <div className="label-plate">Primary Vibe Reading</div>

      <div className="w-full max-w-4xl mx-auto space-y-8 flex flex-col items-center">
        {/* Header Title */}
        <div className="text-center mt-2 space-y-1">
          <div className="text-xs font-['IBM_Plex_Sans'] font-semibold text-[#dec0b4] uppercase tracking-widest">
            TARGET SUBREDDIT: <span className="text-[#f1c043] font-mono">r/{subreddit}</span>
          </div>
          <h2 className="font-['Oswald'] text-3xl sm:text-5xl font-extrabold text-[#ffb596] uppercase tracking-wider flex items-center justify-center gap-3">
            <span>{vibeMeta.emoji}</span>
            <span>{overallLabel}</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#dec0b4] font-['JetBrains_Mono'] max-w-lg mx-auto">
            {vibeMeta.tagline}
          </p>
        </div>

        {/* Mechanical Semicircular Analog Gauge */}
        <div className="relative my-4">
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

          {/* Average Score Readout Box */}
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-[#0c160d] border-2 border-[#574239] px-6 py-1.5 font-['Oswald'] text-3xl sm:text-4xl text-[#f1c043] shadow-2xl z-20 font-bold tracking-tight">
            {displayScore}
          </div>
        </div>

        {/* Breakdown Percentage Row */}
        <div className="grid grid-cols-3 gap-4 w-full max-w-2xl pt-4">
          <div className="p-3.5 bg-[#141e15] border border-[#574239] text-center">
            <span className="block text-2xl font-bold font-['Oswald'] text-[#b58a03]">{posPercent}%</span>
            <span className="text-[11px] font-['IBM_Plex_Sans'] font-semibold text-[#dec0b4] uppercase tracking-wider">
              POS ({counts.positive})
            </span>
          </div>

          <div className="p-3.5 bg-[#141e15] border border-[#574239] text-center">
            <span className="block text-2xl font-bold font-['Oswald'] text-[#a68b80]">{neuPercent}%</span>
            <span className="text-[11px] font-['IBM_Plex_Sans'] font-semibold text-[#dec0b4] uppercase tracking-wider">
              NEU ({counts.neutral})
            </span>
          </div>

          <div className="p-3.5 bg-[#141e15] border border-[#574239] text-center">
            <span className="block text-2xl font-bold font-['Oswald'] text-[#e66b5c]">{negPercent}%</span>
            <span className="text-[11px] font-['IBM_Plex_Sans'] font-semibold text-[#dec0b4] uppercase tracking-wider">
              NEG ({counts.negative})
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
