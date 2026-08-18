import React, { useState } from 'react';
import { ExternalLink, ThumbsUp, ThumbsDown, MessageSquare, ChevronDown, ChevronUp, User, Clock, AlertTriangle } from 'lucide-react';

export function PostItem({ post, index }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const { title, score, num_comments, permalink, author, created_utc, over_18, link_flair_text, sentiment } = post;
  const { classification, score: sentimentScore, comparative, positiveWords, negativeWords } = sentiment;

  // Format relative time (e.g. "3 hours ago")
  const getRelativeTime = (utcTimestamp) => {
    if (!utcTimestamp) return '';
    const now = Date.now() / 1000;
    const diff = now - utcTimestamp;
    if (diff < 3600) return `${Math.max(1, Math.floor(diff / 60))}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  // Badge configuration based on sentiment classification
  const badgeConfig = {
    positive: {
      bg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
      label: 'Positive',
      icon: ThumbsUp,
      scoreColor: 'text-emerald-400'
    },
    negative: {
      bg: 'bg-rose-500/10 border-rose-500/30 text-rose-400',
      label: 'Negative',
      icon: ThumbsDown,
      scoreColor: 'text-rose-400'
    },
    neutral: {
      bg: 'bg-slate-800 border-slate-700 text-slate-300',
      label: 'Neutral',
      icon: null,
      scoreColor: 'text-slate-400'
    }
  }[classification];

  const BadgeIcon = badgeConfig.icon;

  // Highlight positive/negative sentiment words inside the title
  const renderHighlightedTitle = () => {
    const posSet = new Set(positiveWords.map(w => w.toLowerCase()));
    const negSet = new Set(negativeWords.map(w => w.toLowerCase()));

    if (posSet.size === 0 && negSet.size === 0) {
      return title;
    }

    const words = title.split(/(\s+)/);
    return words.map((word, idx) => {
      const clean = word.toLowerCase().replace(/[^a-z0-9]/g, '');
      if (posSet.has(clean)) {
        return (
          <span key={idx} className="bg-emerald-500/20 text-emerald-300 font-semibold px-1 rounded border border-emerald-500/40" title="Positive sentiment word">
            {word}
          </span>
        );
      }
      if (negSet.has(clean)) {
        return (
          <span key={idx} className="bg-rose-500/20 text-rose-300 font-semibold px-1 rounded border border-rose-500/40" title="Negative sentiment word">
            {word}
          </span>
        );
      }
      return word;
    });
  };

  return (
    <div className="glass-panel glass-panel-hover rounded-2xl p-4 sm:p-5 border transition-all">
      <div className="flex items-start justify-between gap-3">
        {/* Left: Index number & Title */}
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <span className="text-xs font-mono text-slate-500 pt-0.5 font-bold w-6 text-right select-none">
            #{index + 1}
          </span>

          <div className="space-y-2 flex-1 min-w-0">
            {/* Title & External Link */}
            <h3 className="text-sm sm:text-base font-semibold text-slate-100 leading-snug hover:text-indigo-300 transition-colors">
              <a href={permalink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 group">
                <span>{isExpanded ? renderHighlightedTitle() : title}</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-indigo-400 transition-opacity flex-shrink-0" />
              </a>
            </h3>

            {/* Metadata Badges Row */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
              {/* Upvotes */}
              <span className="font-mono font-medium text-slate-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                ↑ {score >= 1000 ? `${(score / 1000).toFixed(1)}k` : score}
              </span>

              {/* Comments */}
              <span className="flex items-center gap-1 font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                <MessageSquare className="w-3 h-3" />
                {num_comments >= 1000 ? `${(num_comments / 1000).toFixed(1)}k` : num_comments}
              </span>

              {/* Author */}
              <span className="flex items-center gap-1 text-slate-400">
                <User className="w-3 h-3 text-slate-500" />
                u/{author}
              </span>

              {/* Relative Time */}
              {created_utc && (
                <span className="flex items-center gap-1 text-slate-500">
                  <Clock className="w-3 h-3" />
                  {getRelativeTime(created_utc)}
                </span>
              )}

              {/* Flair Tag */}
              {link_flair_text && (
                <span className="px-2 py-0.5 text-[10px] rounded bg-slate-800 text-slate-300 border border-slate-700 truncate max-w-[140px]">
                  {link_flair_text}
                </span>
              )}

              {/* NSFW Tag */}
              {over_18 && (
                <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-rose-500/20 text-rose-400 border border-rose-500/40 uppercase">
                  NSFW
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right: Sentiment Badge & Score */}
        <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
          <div className="flex items-center gap-1.5">
            <span className={`px-2.5 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 shadow-sm ${badgeConfig.bg}`}>
              {BadgeIcon && <BadgeIcon className="w-3 h-3" />}
              {badgeConfig.label}
            </span>

            <span className={`font-mono text-xs font-extrabold px-2 py-1 rounded-lg bg-slate-900 border border-slate-800 ${badgeConfig.scoreColor}`}>
              {sentimentScore > 0 ? `+${sentimentScore}` : sentimentScore}
            </span>
          </div>

          {(positiveWords.length > 0 || negativeWords.length > 0) && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-[11px] text-slate-400 hover:text-slate-200 flex items-center gap-1 font-medium pt-1"
            >
              <span>{isExpanded ? 'Hide analysis' : 'Word breakdown'}</span>
              {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          )}
        </div>
      </div>

      {/* Expanded Sentiment Details Box */}
      {isExpanded && (
        <div className="mt-3 pt-3 border-t border-slate-800/80 text-xs space-y-2 bg-slate-950/60 p-3 rounded-xl">
          <div className="flex items-center justify-between text-slate-400 font-mono">
            <span>Comparative Score: <strong className="text-slate-200">{comparative}</strong></span>
            <span>AFINN Metric</span>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {positiveWords.length > 0 && (
              <div className="flex items-center gap-1 text-emerald-400">
                <span className="font-semibold text-slate-400">Positive trigger words:</span>
                {positiveWords.map((w, idx) => (
                  <span key={idx} className="bg-emerald-500/10 border border-emerald-500/30 px-1.5 py-0.5 rounded font-mono">
                    +{w}
                  </span>
                ))}
              </div>
            )}

            {negativeWords.length > 0 && (
              <div className="flex items-center gap-1 text-rose-400">
                <span className="font-semibold text-slate-400">Negative trigger words:</span>
                {negativeWords.map((w, idx) => (
                  <span key={idx} className="bg-rose-500/10 border border-rose-500/30 px-1.5 py-0.5 rounded font-mono">
                    -{w}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
