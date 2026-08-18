import React from 'react';
import { Sparkles, ThumbsUp, ThumbsDown, MessageCircle, ArrowUpRight, TrendingUp, Tag, ShieldCheck } from 'lucide-react';

export function VibeSummaryCard({ subredditData, vibeData }) {
  if (!vibeData) return null;

  const {
    vibe,
    avgScore,
    avgComparative,
    positivePercent,
    neutralPercent,
    negativePercent,
    positiveCount,
    neutralCount,
    negativeCount,
    totalPosts,
    topPositivePost,
    topNegativePost,
    topPositiveWords,
    topNegativeWords
  } = vibeData;

  // Scale comparative score from -0.5..+0.5 to a 0%..100% meter position
  const meterPercent = Math.min(Math.max(((avgComparative + 0.3) / 0.6) * 100, 5), 95);

  return (
    <div className="relative rounded-3xl overflow-hidden glass-panel p-6 sm:p-8 border shadow-2xl transition-all">
      {/* Ambient background glow gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${vibe.gradient} pointer-events-none -z-10`} />
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-glow" />

      <div className="space-y-8">
        {/* Top Header Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <div className="flex items-center space-x-2.5 mb-1.5">
              <span className="text-xs font-bold font-mono tracking-wider text-slate-400 uppercase bg-slate-900/80 px-2.5 py-1 rounded-md border border-slate-800">
                r/{subredditData.subreddit}
              </span>
              <span className="flex items-center gap-1 text-xs text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                {totalPosts} Hot Posts Analyzed
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center gap-3 font-display">
              <span>{vibe.emoji}</span>
              <span className={vibe.textColor}>{vibe.label}</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-1 max-w-xl">
              {vibe.tagline}
            </p>
          </div>

          {/* Quick Score Badge */}
          <div className="flex items-center gap-3">
            <div className={`p-4 rounded-2xl border ${vibe.badgeBg} flex flex-col items-center justify-center min-w-[120px] shadow-lg`}>
              <span className="text-2xl sm:text-3xl font-extrabold font-mono tracking-tight">
                {avgScore > 0 ? `+${avgScore}` : avgScore}
              </span>
              <span className="text-[11px] font-semibold tracking-wider uppercase opacity-80">
                Avg Score
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col items-center justify-center min-w-[120px]">
              <span className="text-2xl sm:text-3xl font-extrabold font-mono text-indigo-400 tracking-tight">
                {avgComparative > 0 ? `+${avgComparative}` : avgComparative}
              </span>
              <span className="text-[11px] font-semibold text-slate-400 tracking-wider uppercase">
                Comparative
              </span>
            </div>
          </div>
        </div>

        {/* Sentiment Meter Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-semibold text-slate-400">
            <span className="flex items-center gap-1 text-rose-400">
              <ThumbsDown className="w-3.5 h-3.5" /> Negative (-1.0)
            </span>
            <span className="text-slate-300">Sentiment Meter</span>
            <span className="flex items-center gap-1 text-emerald-400">
              Positive (+1.0) <ThumbsUp className="w-3.5 h-3.5" />
            </span>
          </div>

          <div className="relative w-full h-3 bg-slate-950 rounded-full border border-slate-800 overflow-hidden">
            {/* Meter Gradient Bar */}
            <div className="absolute inset-0 bg-gradient-to-r from-rose-500 via-amber-400 to-emerald-500 opacity-80" />
            
            {/* Target Indicator Needle */}
            <div
              className="absolute top-0 bottom-0 w-2 bg-white rounded-full shadow-lg shadow-white/50 -ml-1 transition-all duration-700 ease-out"
              style={{ left: `${meterPercent}%` }}
            />
          </div>
        </div>

        {/* Breakdown Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex flex-col justify-between">
            <div className="flex items-center justify-between text-emerald-400 text-xs font-medium">
              <span>Positive Posts</span>
              <ThumbsUp className="w-4 h-4" />
            </div>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-bold text-emerald-300">{positivePercent}%</span>
              <span className="text-xs text-emerald-400/80 font-mono">{positiveCount} posts</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/50 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
              <span>Neutral Posts</span>
              <span className="text-base font-bold">⚖️</span>
            </div>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-bold text-slate-200">{neutralPercent}%</span>
              <span className="text-xs text-slate-400 font-mono">{neutralCount} posts</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex flex-col justify-between">
            <div className="flex items-center justify-between text-rose-400 text-xs font-medium">
              <span>Negative Posts</span>
              <ThumbsDown className="w-4 h-4" />
            </div>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-bold text-rose-300">{negativePercent}%</span>
              <span className="text-xs text-rose-400/80 font-mono">{negativeCount} posts</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex flex-col justify-between">
            <div className="flex items-center justify-between text-indigo-400 text-xs font-medium">
              <span>Sample Size</span>
              <TrendingUp className="w-4 h-4" />
            </div>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-bold text-indigo-300">{totalPosts}</span>
              <span className="text-xs text-indigo-400/80 font-mono">Hot Feed</span>
            </div>
          </div>
        </div>

        {/* Top Positive vs Top Negative Post Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {topPositivePost ? (
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-emerald-500/30 space-y-2 relative overflow-hidden group">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                  <ThumbsUp className="w-3 h-3" /> Most Positive Post
                </span>
                <span className="text-xs font-mono font-bold text-emerald-400">
                  Score: +{topPositivePost.sentiment.score}
                </span>
              </div>
              <h4 className="text-sm font-semibold text-slate-100 line-clamp-2 leading-snug group-hover:text-emerald-300 transition-colors">
                {topPositivePost.title}
              </h4>
              <div className="flex items-center justify-between pt-1 text-xs text-slate-400">
                <span className="font-mono">↑ {topPositivePost.score.toLocaleString()} upvotes</span>
                <a
                  href={topPositivePost.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-emerald-400 hover:underline font-medium"
                >
                  View on Reddit <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs text-slate-500 flex items-center justify-center">
              No strongly positive posts in top 50
            </div>
          )}

          {topNegativePost ? (
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-rose-500/30 space-y-2 relative overflow-hidden group">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20 flex items-center gap-1">
                  <ThumbsDown className="w-3 h-3" /> Most Negative Post
                </span>
                <span className="text-xs font-mono font-bold text-rose-400">
                  Score: {topNegativePost.sentiment.score}
                </span>
              </div>
              <h4 className="text-sm font-semibold text-slate-100 line-clamp-2 leading-snug group-hover:text-rose-300 transition-colors">
                {topNegativePost.title}
              </h4>
              <div className="flex items-center justify-between pt-1 text-xs text-slate-400">
                <span className="font-mono">↑ {topNegativePost.score.toLocaleString()} upvotes</span>
                <a
                  href={topNegativePost.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-rose-400 hover:underline font-medium"
                >
                  View on Reddit <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs text-slate-500 flex items-center justify-center">
              No strongly negative posts in top 50
            </div>
          )}
        </div>

        {/* Top Keywords Row */}
        {(topPositiveWords.length > 0 || topNegativeWords.length > 0) && (
          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs border-t border-slate-800/80">
            <span className="text-slate-400 font-semibold flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-indigo-400" /> Key Drivers:
            </span>

            {topPositiveWords.map(({ word, count }) => (
              <span
                key={`pos-${word}`}
                className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-mono"
              >
                +{word} <span className="opacity-60 text-[10px]">({count})</span>
              </span>
            ))}

            {topNegativeWords.map(({ word, count }) => (
              <span
                key={`neg-${word}`}
                className="px-2.5 py-1 rounded-md bg-rose-500/10 text-rose-300 border border-rose-500/20 font-mono"
              >
                -{word} <span className="opacity-60 text-[10px]">({count})</span>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
