import React from 'react';

export function VectorTally({ counts }) {
  if (!counts) return null;

  const posFormatted = (counts.positive || 0).toLocaleString();
  const neuFormatted = (counts.neutral || 0).toLocaleString();
  const negFormatted = (counts.negative || 0).toLocaleString();

  return (
    <div className="panel-module p-6 flex flex-col">
      <div className="label-plate">Vector Tally</div>

      <div className="flex-1 flex flex-col justify-center gap-6 mt-4">
        {/* Vector Alpha (Positive) */}
        <div className="flex items-center justify-between group">
          <div className="flex flex-col">
            <span className="font-['IBM_Plex_Sans'] text-xs font-semibold text-[#dec0b4] mb-1 tracking-widest">
              VECTOR ALPHA (POS)
            </span>
            <span className="stamp font-['Oswald'] text-2xl font-bold text-[#b58a03] border-[#b58a03] inline-block">
              POSITIVE
            </span>
          </div>
          <div className="mechanical-input px-4 py-2 font-['JetBrains_Mono'] font-bold text-2xl text-[#b58a03] min-w-[100px] text-right">
            {posFormatted}
          </div>
        </div>

        {/* Vector Beta (Neutral) */}
        <div className="flex items-center justify-between group">
          <div className="flex flex-col">
            <span className="font-['IBM_Plex_Sans'] text-xs font-semibold text-[#dec0b4] mb-1 tracking-widest">
              VECTOR BETA (NEU)
            </span>
            <span
              className="stamp font-['Oswald'] text-2xl font-bold text-[#a68b80] border-[#a68b80] inline-block"
              style={{ transform: 'rotate(2deg)' }}
            >
              NEUTRAL
            </span>
          </div>
          <div className="mechanical-input px-4 py-2 font-['JetBrains_Mono'] font-bold text-2xl text-[#a68b80] min-w-[100px] text-right">
            {neuFormatted}
          </div>
        </div>

        {/* Vector Gamma (Negative) */}
        <div className="flex items-center justify-between group">
          <div className="flex flex-col">
            <span className="font-['IBM_Plex_Sans'] text-xs font-semibold text-[#dec0b4] mb-1 tracking-widest">
              VECTOR GAMMA (NEG)
            </span>
            <span
              className="stamp font-['Oswald'] text-2xl font-bold text-[#e66b5c] border-[#e66b5c] inline-block"
              style={{ transform: 'rotate(-1deg)' }}
            >
              NEGATIVE
            </span>
          </div>
          <div className="mechanical-input px-4 py-2 font-['JetBrains_Mono'] font-bold text-2xl text-[#e66b5c] min-w-[100px] text-right">
            {negFormatted}
          </div>
        </div>
      </div>
    </div>
  );
}
