import React, { useState, useEffect, useCallback } from 'react';
import { SearchBar } from './components/SearchBar';
import { VibeSummaryCard } from './components/VibeSummaryCard';
import { SentimentDonutChart } from './components/SentimentDonutChart';
import { StatCards } from './components/StatCards';
import { PostList } from './components/PostList';
import { LoadingState } from './components/LoadingState';
import { ErrorState } from './components/ErrorState';
import { EmptyState } from './components/EmptyState';
import { fetchHotPosts } from './api/reddit';
import { analyzeTitles } from './utils/sentiment';
import { computeVibe } from './utils/aggregate';
import { Sparkles, Radio, Activity, Heart, ArrowUpRight } from 'lucide-react';

export function App() {
  // State management as specified
  const [subreddit, setSubreddit] = useState('reactjs');
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [posts, setPosts] = useState([]);
  const [vibeSummary, setVibeSummary] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSearch = useCallback(async (targetSubreddit) => {
    if (!targetSubreddit) return;

    setSubreddit(targetSubreddit);
    setStatus('loading');
    setErrorMessage(null);

    try {
      // 1. Fetch raw posts from api/reddit.js
      const rawPosts = await fetchHotPosts(targetSubreddit);

      // 2. Enrich posts with sentiment scores via utils/sentiment.js
      const analyzedPosts = analyzeTitles(rawPosts);

      // 3. Compute aggregate statistics via utils/aggregate.js
      const summary = computeVibe(analyzedPosts);

      setPosts(analyzedPosts);
      setVibeSummary(summary);
      setStatus('success');
    } catch (err) {
      setErrorMessage(err.message || "Couldn't reach Reddit right now, try again in a moment.");
      setPosts([]);
      setVibeSummary(null);
      setStatus('error');
    }
  }, []);

  // Automatically fetch default subreddit on initial load
  useEffect(() => {
    handleSearch('reactjs');
  }, [handleSearch]);

  return (
    <div className="min-h-screen flex flex-col bg-[#030712] text-slate-100 selection:bg-indigo-500 selection:text-white">
      {/* Top Navigation Bar */}
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/25">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-slate-950 rounded-full" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-lg font-bold text-white tracking-tight font-display">
                  Subreddit Vibe Check
                </h1>
                <span className="px-2 py-0.5 text-[10px] font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full uppercase tracking-wider">
                  Live Analysis
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Client-side sentiment scoring for public subreddits
              </p>
            </div>
          </div>

          <div className="hidden sm:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-xs text-slate-400 bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-full">
              <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>api.reddit.com JSON API</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-slate-400 bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-full">
              <Activity className="w-3.5 h-3.5 text-indigo-400" />
              <span>AFINN-165 Sentiment Engine</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Search Hero Section */}
        <section className="text-center space-y-6 pt-2 sm:pt-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Instant Client-Side Scoring</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight max-w-3xl mx-auto font-display leading-tight">
            Check the <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Vibe</span> of Any Subreddit
          </h2>

          <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
            Scans hot post titles in real-time and runs sentiment analysis directly in your browser with zero server latency.
          </p>

          <SearchBar
            onSearch={handleSearch}
            isLoading={status === 'loading'}
            initialValue={subreddit}
          />
        </section>

        {/* View Switching based on State */}
        {status === 'loading' && <LoadingState />}

        {status === 'error' && (
          <ErrorState
            errorMessage={errorMessage}
            onRetry={() => handleSearch(subreddit)}
            onSelectPreset={handleSearch}
          />
        )}

        {status === 'idle' && <EmptyState onSelectPreset={handleSearch} />}

        {status === 'success' && vibeSummary && (
          <section className="space-y-8 animate-fade-in">
            {/* 1. Hero Vibe Summary Card */}
            <VibeSummaryCard
              subreddit={subreddit}
              vibeSummary={vibeSummary}
            />

            {/* 2. Recharts Donut & Info Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Donut Chart */}
              <div className="lg:col-span-1">
                <SentimentDonutChart counts={vibeSummary.counts} />
              </div>

              {/* Explainer / Methodology Box */}
              <div className="lg:col-span-2 glass-panel rounded-3xl p-6 border shadow-xl flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-base font-bold text-white font-display mb-1 flex items-center gap-2">
                    <Heart className="w-4 h-4 text-pink-400" />
                    How Vibe Analysis Works
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Each post title is evaluated using the AFINN-165 sentiment lexicon. Positive words (e.g. <em>win, launch, exciting</em>) increment the score, while negative words (e.g. <em>bug, broken, outrage</em>) decrement it. The overall label is calculated from average post sentiment across the feed.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800 text-xs">
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Subreddit</span>
                    <span className="text-indigo-400 font-mono font-bold">r/{subreddit}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Sample Count</span>
                    <span className="text-slate-200 font-mono font-bold">{vibeSummary.totalPosts} posts</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Overall Score</span>
                    <span className="text-emerald-400 font-mono font-bold">
                      {vibeSummary.avgScore > 0 ? `+${vibeSummary.avgScore}` : vibeSummary.avgScore}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Pos / Neu / Neg</span>
                    <span className="text-slate-200 font-mono font-bold">
                      {vibeSummary.counts.positive} / {vibeSummary.counts.neutral} / {vibeSummary.counts.negative}
                    </span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 border-t border-slate-800 pt-2">
                  Unauthenticated public client-side fetch from <code className="text-slate-400 font-mono">api.reddit.com</code>.
                </div>
              </div>
            </div>

            {/* 3. Stat Cards */}
            <StatCards vibeSummary={vibeSummary} />

            {/* 4. Full Post List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white font-display">
                  Analyzed Posts Feed
                </h3>
                <span className="text-xs text-slate-400 font-mono">
                  Showing {posts.length} posts
                </span>
              </div>

              <PostList
                posts={posts}
                counts={vibeSummary.counts}
              />
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-6 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            Subreddit Vibe Check &copy; {new Date().getFullYear()} • Built with React, Vite & Tailwind CSS
          </div>
          <div>
            <a
              href="https://www.reddit.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-300 transition-colors inline-flex items-center gap-1"
            >
              <span>Reddit API</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
