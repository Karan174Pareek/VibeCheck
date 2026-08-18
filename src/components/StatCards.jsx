import React from 'react';
import { ExternalLink } from 'lucide-react';

export function StatCards({ vibeSummary }) {
  if (!vibeSummary) return null;

  const { mostPositivePost, mostNegativePost, totalPosts } = vibeSummary;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
      {/* Most Positive Post */}
      <div className="panel-module p-5 flex flex-col justify-between space-y-3 relative overflow-hidden group">
        <div className="label-plate">Vector Alpha Highlight</div>

        <div className="flex items-center justify-between mt-2">
          <span className="stamp font-['Oswald'] text-lg font-bold text-[#b58a03] border-[#b58a03]">
            MOST POSITIVE
          </span>
          {mostPositivePost && (
            <span className="font-['JetBrains_Mono'] text-xs font-bold text-[#b58a03]">
              SCORE: +{mostPositivePost.score}
            </span>
          )}
        </div>

        {mostPositivePost ? (
          <>
            <h4 className="text-xs sm:text-sm font-['JetBrains_Mono'] font-medium text-[#dae6d6] line-clamp-2 leading-relaxed group-hover:text-[#ffb596] transition-colors">
              "{mostPositivePost.title}"
            </h4>
            <div className="flex items-center justify-between text-xs font-['JetBrains_Mono'] text-[#a68b80] pt-2 border-t border-[#2d372d]">
              <span>UPVOTES: {mostPositivePost.ups}</span>
              <a
                href={mostPositivePost.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[#b58a03] hover:underline font-bold"
              >
                REDDIT <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </>
        ) : (
          <p className="text-xs text-[#574239] italic font-['JetBrains_Mono']">
            No strongly positive titles detected in sample.
          </p>
        )}
      </div>

      {/* Most Negative Post */}
      <div className="panel-module p-5 flex flex-col justify-between space-y-3 relative overflow-hidden group">
        <div className="label-plate">Vector Gamma Highlight</div>

        <div className="flex items-center justify-between mt-2">
          <span className="stamp font-['Oswald'] text-lg font-bold text-[#e66b5c] border-[#e66b5c]" style={{ transform: 'rotate(-2deg)' }}>
            MOST NEGATIVE
          </span>
          {mostNegativePost && (
            <span className="font-['JetBrains_Mono'] text-xs font-bold text-[#e66b5c]">
              SCORE: {mostNegativePost.score}
            </span>
          )}
        </div>

        {mostNegativePost ? (
          <>
            <h4 className="text-xs sm:text-sm font-['JetBrains_Mono'] font-medium text-[#dae6d6] line-clamp-2 leading-relaxed group-hover:text-[#e66b5c] transition-colors">
              "{mostNegativePost.title}"
            </h4>
            <div className="flex items-center justify-between text-xs font-['JetBrains_Mono'] text-[#a68b80] pt-2 border-t border-[#2d372d]">
              <span>UPVOTES: {mostNegativePost.ups}</span>
              <a
                href={mostNegativePost.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[#e66b5c] hover:underline font-bold"
              >
                REDDIT <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </>
        ) : (
          <p className="text-xs text-[#574239] italic font-['JetBrains_Mono']">
            No strongly negative titles detected in sample.
          </p>
        )}
      </div>

      {/* Total Sample Stats */}
      <div className="panel-module p-5 flex flex-col justify-between space-y-3">
        <div className="label-plate">Sample Telemetry</div>

        <div className="flex items-center justify-between mt-2">
          <span className="font-['IBM_Plex_Sans'] text-xs font-semibold text-[#dec0b4] tracking-widest uppercase">
            TOTAL SAMPLE SIZE
          </span>
          <span className="font-['JetBrains_Mono'] text-xs text-[#f1c043]">HOT FEED</span>
        </div>

        <div className="mechanical-input px-4 py-2 flex items-baseline justify-between">
          <span className="text-3xl font-extrabold font-['Oswald'] text-[#ffb596]">{totalPosts}</span>
          <span className="text-xs text-[#a68b80] font-['JetBrains_Mono']">POSTS SCORED</span>
        </div>

        <div className="text-[11px] text-[#a68b80] pt-1 border-t border-[#2d372d] font-['JetBrains_Mono']">
          ENGINE: AFINN-165 Sentiment Engine
        </div>
      </div>
    </div>
  );
}
