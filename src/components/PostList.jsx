import React, { useState, useMemo } from 'react';
import { SentimentBadge } from './SentimentBadge';
import { ExternalLink, Search, ArrowUpDown, MessageSquare, User, Clock, ChevronDown, ChevronUp } from 'lucide-react';

export function PostList({ posts, counts }) {
  const [filterTab, setFilterTab] = useState('all'); // 'all' | 'Positive' | 'Neutral' | 'Negative'
  const [sortOption, setSortOption] = useState('rank'); // 'rank' | 'highest' | 'lowest' | 'upvotes' | 'comments'
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  const filteredAndSortedPosts = useMemo(() => {
    if (!posts) return [];

    let result = [...posts];

    // 1. Tab filter
    if (filterTab !== 'all') {
      result = result.filter((p) => p.label === filterTab);
    }

    // 2. Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) => p.title.toLowerCase().includes(q) || p.author.toLowerCase().includes(q)
      );
    }

    // 3. Sort
    result.sort((a, b) => {
      if (sortOption === 'highest') {
        return b.score - a.score || b.comparative - a.comparative;
      }
      if (sortOption === 'lowest') {
        return a.score - b.score || a.comparative - b.comparative;
      }
      if (sortOption === 'upvotes') {
        return b.ups - a.ups;
      }
      if (sortOption === 'comments') {
        return b.num_comments - a.num_comments;
      }
      return 0; // default rank
    });

    return result;
  }, [posts, filterTab, sortOption, searchQuery]);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getRelativeTime = (utcTimestamp) => {
    if (!utcTimestamp) return '';
    const now = Date.now() / 1000;
    const diff = now - utcTimestamp;
    if (diff < 3600) return `${Math.max(1, Math.floor(diff / 60))}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  const renderHighlightedTitle = (post) => {
    const posSet = new Set((post.positiveWords || []).map((w) => w.toLowerCase()));
    const negSet = new Set((post.negativeWords || []).map((w) => w.toLowerCase()));

    if (posSet.size === 0 && negSet.size === 0) return post.title;

    const words = post.title.split(/(\s+)/);
    return words.map((word, idx) => {
      const clean = word.toLowerCase().replace(/[^a-z0-9]/g, '');
      if (posSet.has(clean)) {
        return (
          <span key={idx} className="bg-emerald-500/20 text-emerald-300 font-semibold px-1 rounded border border-emerald-500/40">
            {word}
          </span>
        );
      }
      if (negSet.has(clean)) {
        return (
          <span key={idx} className="bg-rose-500/20 text-rose-300 font-semibold px-1 rounded border border-rose-500/40">
            {word}
          </span>
        );
      }
      return word;
    });
  };

  return (
    <div className="space-y-4">
      {/* Filter and Sort Toolbar */}
      <div className="glass-panel rounded-2xl p-4 border flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Filter Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
          <button
            onClick={() => setFilterTab('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              filterTab === 'all'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            All ({posts.length})
          </button>

          <button
            onClick={() => setFilterTab('Positive')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              filterTab === 'Positive'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-emerald-400/80 hover:text-emerald-300 hover:bg-emerald-500/10'
            }`}
          >
            Positive ({counts?.positive || 0})
          </button>

          <button
            onClick={() => setFilterTab('Neutral')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              filterTab === 'Neutral'
                ? 'bg-slate-700 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            Neutral ({counts?.neutral || 0})
          </button>

          <button
            onClick={() => setFilterTab('Negative')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              filterTab === 'Negative'
                ? 'bg-rose-600 text-white shadow-md'
                : 'text-rose-400/80 hover:text-rose-300 hover:bg-rose-500/10'
            }`}
          >
            Negative ({counts?.negative || 0})
          </button>
        </div>

        {/* In-list Search & Sort */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter post titles..."
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="relative flex items-center bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-1.5">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 mr-2" />
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="bg-transparent text-xs font-semibold text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value="rank" className="bg-slate-900">Hot Rank</option>
              <option value="highest" className="bg-slate-900">Highest Sentiment</option>
              <option value="lowest" className="bg-slate-900">Lowest Sentiment</option>
              <option value="upvotes" className="bg-slate-900">Most Upvotes</option>
              <option value="comments" className="bg-slate-900">Most Comments</option>
            </select>
          </div>
        </div>
      </div>

      {/* Posts Feed List */}
      {filteredAndSortedPosts.length > 0 ? (
        <div className="space-y-3">
          {filteredAndSortedPosts.map((post, idx) => {
            const isExpanded = expandedId === post.id;
            const hasWords = (post.positiveWords && post.positiveWords.length > 0) || (post.negativeWords && post.negativeWords.length > 0);

            return (
              <div key={post.id || idx} className="glass-panel glass-panel-hover rounded-2xl p-4 sm:p-5 border transition-all">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <span className="text-xs font-mono text-slate-500 pt-0.5 font-bold w-6 text-right select-none">
                      #{idx + 1}
                    </span>

                    <div className="space-y-2 flex-1 min-w-0">
                      <h3 className="text-sm sm:text-base font-semibold text-slate-100 leading-snug hover:text-indigo-300 transition-colors">
                        <a href={post.permalink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 group">
                          <span>{isExpanded ? renderHighlightedTitle(post) : post.title}</span>
                          <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-indigo-400 transition-opacity flex-shrink-0" />
                        </a>
                      </h3>

                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                        <span className="font-mono font-medium text-slate-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                          ↑ {post.ups >= 1000 ? `${(post.ups / 1000).toFixed(1)}k` : post.ups}
                        </span>

                        <span className="flex items-center gap-1 font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                          <MessageSquare className="w-3 h-3" />
                          {post.num_comments >= 1000 ? `${(post.num_comments / 1000).toFixed(1)}k` : post.num_comments}
                        </span>

                        <span className="flex items-center gap-1 text-slate-400">
                          <User className="w-3 h-3 text-slate-500" />
                          u/{post.author}
                        </span>

                        {post.created_utc && (
                          <span className="flex items-center gap-1 text-slate-500">
                            <Clock className="w-3 h-3" />
                            {getRelativeTime(post.created_utc)}
                          </span>
                        )}

                        {post.link_flair_text && (
                          <span className="px-2 py-0.5 text-[10px] rounded bg-slate-800 text-slate-300 border border-slate-700 truncate max-w-[140px]">
                            {post.link_flair_text}
                          </span>
                        )}

                        {post.over_18 && (
                          <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-rose-500/20 text-rose-400 border border-rose-500/40 uppercase">
                            NSFW
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                    <div className="flex items-center gap-1.5">
                      <SentimentBadge label={post.label} />
                      <span className={`font-mono text-xs font-extrabold px-2 py-1 rounded-lg bg-slate-900 border border-slate-800 ${
                        post.score > 0 ? 'text-emerald-400' : post.score < 0 ? 'text-rose-400' : 'text-slate-400'
                      }`}>
                        {post.score > 0 ? `+${post.score}` : post.score}
                      </span>
                    </div>

                    {hasWords && (
                      <button
                        onClick={() => toggleExpand(post.id)}
                        className="text-[11px] text-slate-400 hover:text-slate-200 flex items-center gap-1 font-medium pt-1"
                      >
                        <span>{isExpanded ? 'Hide' : 'Analysis'}</span>
                        {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                      </button>
                    )}
                  </div>
                </div>

                {isExpanded && (
                  <div className="mt-3 pt-3 border-t border-slate-800/80 text-xs space-y-2 bg-slate-950/60 p-3 rounded-xl">
                    <div className="flex items-center justify-between text-slate-400 font-mono">
                      <span>Comparative Score: <strong className="text-slate-200">{post.comparative}</strong></span>
                      <span>AFINN Metric</span>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-1">
                      {post.positiveWords && post.positiveWords.length > 0 && (
                        <div className="flex items-center gap-1 text-emerald-400">
                          <span className="font-semibold text-slate-400">Positive triggers:</span>
                          {post.positiveWords.map((w, i) => (
                            <span key={i} className="bg-emerald-500/10 border border-emerald-500/30 px-1.5 py-0.5 rounded font-mono">
                              +{w}
                            </span>
                          ))}
                        </div>
                      )}

                      {post.negativeWords && post.negativeWords.length > 0 && (
                        <div className="flex items-center gap-1 text-rose-400">
                          <span className="font-semibold text-slate-400">Negative triggers:</span>
                          {post.negativeWords.map((w, i) => (
                            <span key={i} className="bg-rose-500/10 border border-rose-500/30 px-1.5 py-0.5 rounded font-mono">
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
          })}
        </div>
      ) : (
        <div className="glass-panel rounded-2xl p-12 text-center text-slate-400">
          No matching posts found.
        </div>
      )}
    </div>
  );
}
