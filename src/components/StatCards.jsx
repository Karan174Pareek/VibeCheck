import React from 'react';
import { ThumbsUp, ThumbsDown, Layers, ExternalLink } from 'lucide-react';
import { SentimentBadge } from './SentimentBadge';

export function StatCards({ vibeSummary }) {
  if (!vibeSummary) return null;

  const { mostPositivePost, mostNegativePost, totalPosts } = vibeSummary;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Most Positive Post */}
      <div className="glass-panel rounded-2xl p-4 border border-emerald-500/30 flex flex-col justify-between space-y-3 relative overflow-hidden group">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
            <ThumbsUp className="w-3.5 h-3.5" /> Most Positive Title
          </span>
          {mostPositivePost && (
            <span className="font-mono text-xs font-bold text-emerald-400">
              Score: +{mostPositivePost.score}
            </span>
          )}
        </div>

        {mostPositivePost ? (
          <>
            <h4 className="text-xs sm:text-sm font-semibold text-slate-100 line-clamp-2 leading-snug group-hover:text-emerald-300 transition-colors">
              {mostPositivePost.title}
            </h4>
            <div className="flex items-center justify-between text-xs text-slate-400 pt-1 border-t border-slate-800/80">
              <span className="font-mono">↑ {mostPositivePost.ups.toLocaleString()} upvotes</span>
              <a
                href={mostPositivePost.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-emerald-400 hover:underline font-medium"
              >
                Reddit <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </>
        ) : (
          <p className="text-xs text-slate-500 italic">No strongly positive titles found in sample.</p>
        )}
      </div>

      {/* Most Negative Post */}
      <div className="glass-panel rounded-2xl p-4 border border-rose-500/30 flex flex-col justify-between space-y-3 relative overflow-hidden group">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-rose-400 flex items-center gap-1.5">
            <ThumbsDown className="w-3.5 h-3.5" /> Most Negative Title
          </span>
          {mostNegativePost && (
            <span className="font-mono text-xs font-bold text-rose-400">
              Score: {mostNegativePost.score}
            </span>
          )}
        </div>

        {mostNegativePost ? (
          <>
            <h4 className="text-xs sm:text-sm font-semibold text-slate-100 line-clamp-2 leading-snug group-hover:text-rose-300 transition-colors">
              {mostNegativePost.title}
            </h4>
            <div className="flex items-center justify-between text-xs text-slate-400 pt-1 border-t border-slate-800/80">
              <span className="font-mono">↑ {mostNegativePost.ups.toLocaleString()} upvotes</span>
              <a
                href={mostNegativePost.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-rose-400 hover:underline font-medium"
              >
                Reddit <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </>
        ) : (
          <p className="text-xs text-slate-500 italic">No strongly negative titles found in sample.</p>
        )}
      </div>

      {/* Total Posts Card */}
      <div className="glass-panel rounded-2xl p-4 border border-indigo-500/30 flex flex-col justify-between space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-indigo-400 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5" /> Total Posts Analyzed
          </span>
          <span className="text-xs font-mono font-bold text-indigo-300">Hot Feed</span>
        </div>

        <div className="flex items-baseline justify-between">
          <span className="text-3xl font-extrabold text-white font-mono">{totalPosts}</span>
          <span className="text-xs text-slate-400">client-side scored</span>
        </div>

        <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-800/80">
          Scored via AFINN-165 Sentiment Engine
        </div>
      </div>
    </div>
  );
}
