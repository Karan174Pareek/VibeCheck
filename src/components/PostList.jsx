import React, { useState, useMemo } from 'react';
import { PostItem } from './PostItem';
import { Search, Filter, ArrowUpDown, Layers, Sparkles } from 'lucide-react';

export function PostList({ posts, counts }) {
  const [filterTab, setFilterTab] = useState('all'); // 'all' | 'positive' | 'neutral' | 'negative'
  const [sortOption, setSortOption] = useState('rank'); // 'rank' | 'highest_sentiment' | 'lowest_sentiment' | 'upvotes' | 'comments'
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAndSortedPosts = useMemo(() => {
    if (!posts) return [];

    let result = [...posts];

    // 1. Sentiment Tab Filtering
    if (filterTab !== 'all') {
      result = result.filter(p => p.sentiment.classification === filterTab);
    }

    // 2. Search Text Filtering
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.author.toLowerCase().includes(q)
      );
    }

    // 3. Sorting
    result.sort((a, b) => {
      if (sortOption === 'highest_sentiment') {
        return b.sentiment.score - a.sentiment.score || b.sentiment.comparative - a.sentiment.comparative;
      }
      if (sortOption === 'lowest_sentiment') {
        return a.sentiment.score - b.sentiment.score || a.sentiment.comparative - b.sentiment.comparative;
      }
      if (sortOption === 'upvotes') {
        return b.score - a.score;
      }
      if (sortOption === 'comments') {
        return b.num_comments - a.num_comments;
      }
      // Default: Original Reddit Rank
      return 0;
    });

    return result;
  }, [posts, filterTab, sortOption, searchQuery]);

  return (
    <div className="space-y-4">
      {/* Controls Bar: Tabs, Search, and Sort */}
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
            All ({counts.total})
          </button>

          <button
            onClick={() => setFilterTab('positive')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              filterTab === 'positive'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-emerald-400/80 hover:text-emerald-300 hover:bg-emerald-500/10'
            }`}
          >
            Positive ({counts.positive})
          </button>

          <button
            onClick={() => setFilterTab('neutral')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              filterTab === 'neutral'
                ? 'bg-slate-700 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            Neutral ({counts.neutral})
          </button>

          <button
            onClick={() => setFilterTab('negative')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              filterTab === 'negative'
                ? 'bg-rose-600 text-white shadow-md'
                : 'text-rose-400/80 hover:text-rose-300 hover:bg-rose-500/10'
            }`}
          >
            Negative ({counts.negative})
          </button>
        </div>

        {/* Right side: In-list search & Sort dropdown */}
        <div className="flex items-center gap-3">
          {/* Search input */}
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter titles..."
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Sort dropdown */}
          <div className="relative flex items-center bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-1.5">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 mr-2" />
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="bg-transparent text-xs font-semibold text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value="rank" className="bg-slate-900">Hot Rank</option>
              <option value="highest_sentiment" className="bg-slate-900">Highest Sentiment</option>
              <option value="lowest_sentiment" className="bg-slate-900">Lowest Sentiment</option>
              <option value="upvotes" className="bg-slate-900">Most Upvotes</option>
              <option value="comments" className="bg-slate-900">Most Comments</option>
            </select>
          </div>
        </div>
      </div>

      {/* Posts List */}
      {filteredAndSortedPosts.length > 0 ? (
        <div className="space-y-3">
          {filteredAndSortedPosts.map((post, idx) => (
            <PostItem key={post.id || idx} post={post} index={idx} />
          ))}
        </div>
      ) : (
        <div className="glass-panel rounded-2xl p-12 text-center space-y-3">
          <Layers className="w-10 h-10 text-slate-600 mx-auto" />
          <h4 className="text-base font-semibold text-slate-300">No matching posts found</h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your sentiment filter or search query.
          </p>
        </div>
      )}
    </div>
  );
}
