import React, { useState } from 'react';
import { ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';

export function TeletypeStream({ posts }) {
  const [expandedId, setExpandedId] = useState(null);

  if (!posts || posts.length === 0) return null;

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Generate synthetic timestamp based on post index
  const getFormattedTime = (utcTimestamp, idx) => {
    const d = utcTimestamp ? new Date(utcTimestamp * 1000) : new Date();
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const seconds = String((d.getSeconds() + idx) % 60).padStart(2, '0');
    const ms = String((idx * 137) % 999).padStart(3, '0');
    return `[${hours}:${minutes}:${seconds}.${ms}]`;
  };

  return (
    <div className="panel-module relative h-[480px] overflow-hidden bg-[#2d372d]">
      <div className="label-plate z-20">Raw Sentiment Stream</div>

      {/* Hardware bezel for paper feed */}
      <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-[#071008] to-transparent z-10 border-b border-[#574239]" />
      <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-[#071008] to-transparent z-10 border-t border-[#574239] flex items-center justify-center">
        <div className="w-1/2 h-2 bg-[#0c160d] rounded-full shadow-inner opacity-50" />
      </div>

      {/* The Parchment Paper Strip */}
      <div className="absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 w-[92%] max-w-[900px] teletype-paper overflow-y-auto pt-12 pb-16 font-['JetBrains_Mono'] text-sm">
        {/* Sprocket feed holes */}
        <div className="absolute top-4 left-0 h-full w-4 flex flex-col gap-6 select-none pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="feed-hole left" style={{ top: `${i * 30 + 10}px` }} />
          ))}
        </div>
        <div className="absolute top-4 right-0 h-full w-4 flex flex-col gap-6 select-none pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="feed-hole right" style={{ top: `${i * 30 + 10}px` }} />
          ))}
        </div>

        {/* Log Entries */}
        <div className="flex flex-col gap-3 pl-4 pr-4">
          {posts.map((post, idx) => {
            const isExpanded = expandedId === post.id;
            const isPos = post.label === 'Positive';
            const isNeg = post.label === 'Negative';

            const tagColor = isPos ? 'text-[#b58a03]' : isNeg ? 'text-[#e66b5c]' : 'text-[#574239]';
            const tagLabel = isPos ? '[POS]' : isNeg ? '[NEG]' : '[NEU]';

            return (
              <div key={post.id || idx} className="border-b border-[#7A8578] border-dashed pb-2 space-y-1">
                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="text-[#7c2e00] opacity-70 text-xs font-bold">
                    {getFormattedTime(post.created_utc, idx)}
                  </span>
                  <span className={`font-bold font-mono ${tagColor}`}>
                    {tagLabel}
                  </span>
                  <a
                    href={post.permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium hover:underline text-[#0c160d] inline-flex items-center gap-1 group flex-1 min-w-[200px]"
                  >
                    <span>"{post.title}"</span>
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 text-[#E0692D] transition-opacity flex-shrink-0" />
                  </a>
                </div>

                <div className="flex items-center justify-between text-xs text-[#574239] font-mono pt-0.5">
                  <span>
                    UPVOTES: {post.ups} | SCORE: {post.score > 0 ? `+${post.score}` : post.score} | COMP: {post.comparative}
                  </span>
                  
                  {((post.positiveWords && post.positiveWords.length > 0) || (post.negativeWords && post.negativeWords.length > 0)) && (
                    <button
                      onClick={() => toggleExpand(post.id)}
                      className="text-[11px] font-bold text-[#E0692D] hover:underline flex items-center gap-0.5"
                    >
                      <span>{isExpanded ? 'LESS' : 'DETAILS'}</span>
                      {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>
                  )}
                </div>

                {isExpanded && (
                  <div className="mt-2 p-2 bg-[#e2dbca] border border-[#7A8578] rounded text-xs space-y-1 text-[#0c160d]">
                    {post.positiveWords && post.positiveWords.length > 0 && (
                      <div className="text-[#b58a03] font-bold">
                        + TRIGGERS: {post.positiveWords.join(', ')}
                      </div>
                    )}
                    {post.negativeWords && post.negativeWords.length > 0 && (
                      <div className="text-[#e66b5c] font-bold">
                        - TRIGGERS: {post.negativeWords.join(', ')}
                      </div>
                    )}
                    <div className="text-[11px] text-[#574239] italic">
                      AUTHOR: u/{post.author} • COMMENTS: {post.num_comments}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Typewriter Cursor */}
          <div className="mt-2 text-[#E0692D] blinking-cursor inline-block w-2 h-4 bg-current" />
        </div>
      </div>
    </div>
  );
}
