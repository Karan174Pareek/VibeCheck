import React, { useState, useMemo } from 'react';
import { ExternalLink, Search, ChevronDown, ChevronUp } from 'lucide-react';

export function PostList({ posts, counts }) {
  const [filterTab, setFilterTab] = useState('all'); // 'all' | 'Positive' | 'Neutral' | 'Negative'
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  const filteredPosts = useMemo(() => {
    if (!posts) return [];

    let result = [...posts];

    if (filterTab !== 'all') {
      result = result.filter((p) => p.label === filterTab);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) => p.title.toLowerCase().includes(q) || p.author.toLowerCase().includes(q)
      );
    }

    return result;
  }, [posts, filterTab, searchQuery]);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getFormattedTime = (utcTimestamp, idx) => {
    const d = utcTimestamp ? new Date(utcTimestamp * 1000) : new Date();
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const seconds = String((d.getSeconds() + idx) % 60).padStart(2, '0');
    const ms = String((idx * 137) % 999).padStart(3, '0');
    return `[${hours}:${minutes}:${seconds}.${ms}]`;
  };

  return (
    <div className="panel-module w-full h-[650px] flex flex-col shadow-2xl overflow-hidden bg-[#141e15]">
      {/* Module Title Plate */}
      <div className="label-plate z-20">Raw Sentiment Stream (50 Posts Ledger)</div>

      {/* Header Toolbar: Filter Tabs & Search Query Input */}
      <div className="mt-6 px-4 py-3 bg-[#182218] border-b border-[#574239] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 flex-shrink-0 z-10">
        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setFilterTab('all')}
            className={`px-3 py-1.5 text-xs font-['IBM_Plex_Sans'] font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
              filterTab === 'all'
                ? 'bg-[#E0692D] text-[#0B2B26]'
                : 'text-[#dec0b4] hover:bg-[#232c22]'
            }`}
          >
            All ({posts.length})
          </button>
          <button
            onClick={() => setFilterTab('Positive')}
            className={`px-3 py-1.5 text-xs font-['IBM_Plex_Sans'] font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
              filterTab === 'Positive'
                ? 'bg-[#b58a03] text-[#362700]'
                : 'text-[#b58a03] hover:bg-[#232c22]'
            }`}
          >
            Positive ({counts?.positive || 0})
          </button>
          <button
            onClick={() => setFilterTab('Neutral')}
            className={`px-3 py-1.5 text-xs font-['IBM_Plex_Sans'] font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
              filterTab === 'Neutral'
                ? 'bg-[#7A8578] text-[#0c160d]'
                : 'text-[#a68b80] hover:bg-[#232c22]'
            }`}
          >
            Neutral ({counts?.neutral || 0})
          </button>
          <button
            onClick={() => setFilterTab('Negative')}
            className={`px-3 py-1.5 text-xs font-['IBM_Plex_Sans'] font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
              filterTab === 'Negative'
                ? 'bg-[#e66b5c] text-[#410001]'
                : 'text-[#e66b5c] hover:bg-[#232c22]'
            }`}
          >
            Negative ({counts?.negative || 0})
          </button>
        </div>

        {/* Search Input */}
        <div className="relative flex items-center bg-[#051412] border border-[#574239] px-3 py-1.5 text-xs text-[#E0692D] w-full sm:w-64 flex-shrink-0">
          <Search className="w-3.5 h-3.5 mr-2 opacity-60 flex-shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter title stream..."
            className="bg-transparent border-none outline-none text-[#E0692D] w-full placeholder-[#574239] font-['JetBrains_Mono']"
          />
        </div>
      </div>

      {/* Scrollable Container with Smooth Native Overflow Scrolling */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#2d372d] flex justify-center custom-stream-scrollbar">
        {/* The Teletype Parchment Paper Strip */}
        <div className="teletype-paper w-full max-w-[950px] h-fit p-6 sm:p-8 font-['JetBrains_Mono'] text-sm relative shadow-xl">
          {/* Sprocket Feed Holes */}
          <div className="absolute top-4 left-0 h-full w-4 flex flex-col gap-6 select-none pointer-events-none">
            {[...Array(40)].map((_, i) => (
              <div key={i} className="feed-hole left" style={{ top: `${i * 30 + 10}px` }} />
            ))}
          </div>
          <div className="absolute top-4 right-0 h-full w-4 flex flex-col gap-6 select-none pointer-events-none">
            {[...Array(40)].map((_, i) => (
              <div key={i} className="feed-hole right" style={{ top: `${i * 30 + 10}px` }} />
            ))}
          </div>

          {/* Stream Entries List */}
          {filteredPosts.length > 0 ? (
            <div className="flex flex-col gap-4 pl-4 pr-4">
              {filteredPosts.map((post, idx) => {
                const isExpanded = expandedId === post.id;
                const isPos = post.label === 'Positive';
                const isNeg = post.label === 'Negative';

                const stampClass = isPos
                  ? 'text-[#b58a03] border-[#b58a03]'
                  : isNeg
                  ? 'text-[#e66b5c] border-[#e66b5c]'
                  : 'text-[#574239] border-[#7A8578]';

                return (
                  <div key={post.id || idx} className="border-b border-[#7A8578] border-dashed pb-3 space-y-1.5">
                    <div className="flex flex-wrap items-baseline gap-2">
                      <span className="text-[#7c2e00] opacity-70 text-xs font-bold font-mono">
                        {getFormattedTime(post.created_utc, idx)}
                      </span>
                      <span className={`stamp text-xs font-bold font-mono ${stampClass}`}>
                        {post.label.toUpperCase()}
                      </span>
                      <a
                        href={post.permalink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium hover:underline text-[#0c160d] inline-flex items-center gap-1 group flex-1 min-w-[200px]"
                      >
                        <span>"{post.title}"</span>
                        <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-[#E0692D] transition-opacity flex-shrink-0" />
                      </a>
                    </div>

                    <div className="flex items-center justify-between text-xs text-[#574239] font-mono pt-0.5">
                      <span>
                        UPVOTES: {post.ups} | SCORE: {post.score > 0 ? `+${post.score}` : post.score} | COMP: {post.comparative}
                      </span>

                      {((post.positiveWords && post.positiveWords.length > 0) || (post.negativeWords && post.negativeWords.length > 0)) && (
                        <button
                          onClick={() => toggleExpand(post.id)}
                          className="text-[11px] font-bold text-[#E0692D] hover:underline flex items-center gap-0.5 cursor-pointer"
                        >
                          <span>{isExpanded ? 'LESS' : 'DETAILS'}</span>
                          {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                        </button>
                      )}
                    </div>

                    {isExpanded && (
                      <div className="mt-2 p-3 bg-[#e2dbca] border border-[#7A8578] rounded text-xs space-y-1 text-[#0c160d]">
                        {post.positiveWords && post.positiveWords.length > 0 && (
                          <div className="text-[#b58a03] font-bold">
                            + POSITIVE TRIGGERS: {post.positiveWords.join(', ')}
                          </div>
                        )}
                        {post.negativeWords && post.negativeWords.length > 0 && (
                          <div className="text-[#e66b5c] font-bold">
                            - NEGATIVE TRIGGERS: {post.negativeWords.join(', ')}
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
          ) : (
            <div className="p-8 text-center text-[#574239] font-mono">
              No matching posts found in current stream.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
