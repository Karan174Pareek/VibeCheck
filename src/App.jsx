import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { SearchForm } from './components/SearchForm';
import { VibeSummaryCard } from './components/VibeSummaryCard';
import { VibeCharts } from './components/VibeCharts';
import { PostList } from './components/PostList';
import { SkeletonLoader } from './components/SkeletonLoader';
import { ErrorMessage } from './components/ErrorMessage';
import { fetchSubredditHotPosts } from './services/redditApi';
import { analyzeSubredditVibe } from './utils/sentiment';
import { Sparkles, MessageCircle, ArrowUpRight, Heart, ShieldAlert } from 'lucide-react';

export function App() {
  const [currentSubreddit, setCurrentSubreddit] = useState('reactjs');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [subredditData, setSubredditData] = useState(null);
  const [vibeData, setVibeData] = useState(null);

  const handleFetchVibe = useCallback(async (subredditName) => {
    if (!subredditName) return;

    setIsLoading(true);
    setError(null);
    setCurrentSubreddit(subredditName);

    try {
      const data = await fetchSubredditHotPosts(subredditName, 50);
      const analyzed = analyzeSubredditVibe(data.posts);

      setSubredditData(data);
      setVibeData(analyzed);
    } catch (err) {
      setError(err.message || 'Failed to analyze subreddit vibe.');
      setSubredditData(null);
      setVibeData(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch initial default subreddit on mount
  useEffect(() => {
    handleFetchVibe('reactjs');
  }, [handleFetchVibe]);

  return (
    <div className="min-h-screen flex flex-col bg-[#030712] text-slate-100 selection:bg-indigo-500 selection:text-white">
      {/* Header */}
      <Header />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Search Hero Section */}
        <section className="text-center space-y-6 pt-4 sm:pt-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Instant Reddit Sentiment Scoring</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight max-w-3xl mx-auto font-display leading-tight">
            Check the <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Vibe</span> of Any Subreddit
          </h2>

          <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
            Scans the top 50 hot posts in real-time and runs AFINN sentiment analysis on post titles to detect positivity, drama, and community mood.
          </p>

          <SearchForm
            onSearch={handleFetchVibe}
            isLoading={isLoading}
            initialValue={currentSubreddit}
          />
        </section>

        {/* Dashboard Content Body */}
        {isLoading ? (
          <SkeletonLoader />
        ) : error ? (
          <ErrorMessage
            error={error}
            onRetry={() => handleFetchVibe(currentSubreddit)}
            onSelectPreset={handleFetchVibe}
          />
        ) : vibeData && subredditData ? (
          <section className="space-y-10 animate-fade-in">
            {/* Visual Centerpiece: Summary Card */}
            <VibeSummaryCard
              subredditData={subredditData}
              vibeData={vibeData}
            />

            {/* Recharts Analytics Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <VibeCharts vibeData={vibeData} />
              </div>

              {/* Quick Info & Insight Box */}
              <div className="glass-panel rounded-3xl p-6 border shadow-xl flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-base font-bold text-white font-display mb-1 flex items-center gap-2">
                    <Heart className="w-4 h-4 text-pink-400" />
                    How Vibe Check Works
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Titles are evaluated using AFINN-165, assigning positive values to encouraging words (e.g. <em>win, awesome, launch</em>) and negative values to complaints or outrage words (e.g. <em>bug, broken, toxic</em>).
                  </p>
                </div>

                <div className="space-y-2 bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800 text-xs">
                  <div className="flex justify-between font-mono">
                    <span className="text-slate-400">Subreddit:</span>
                    <span className="text-indigo-400 font-bold">r/{subredditData.subreddit}</span>
                  </div>
                  <div className="flex justify-between font-mono">
                    <span className="text-slate-400">Sample Count:</span>
                    <span className="text-slate-200">{vibeData.totalPosts} posts</span>
                  </div>
                  <div className="flex justify-between font-mono">
                    <span className="text-slate-400">Pos / Neu / Neg:</span>
                    <span className="text-slate-200">
                      {vibeData.positivePercent}% / {vibeData.neutralPercent}% / {vibeData.negativePercent}%
                    </span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-800">
                  Data loaded directly from official Reddit JSON endpoint. No server storage or API keys required.
                </div>
              </div>
            </div>

            {/* Posts List Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white font-display">
                  Analyzed Posts Feed
                </h3>
                <span className="text-xs text-slate-400 font-mono">
                  Showing {vibeData.analyzedPosts.length} posts
                </span>
              </div>

              <PostList
                posts={vibeData.analyzedPosts}
                counts={{
                  total: vibeData.totalPosts,
                  positive: vibeData.positiveCount,
                  neutral: vibeData.neutralCount,
                  negative: vibeData.negativeCount
                }}
              />
            </div>
          </section>
        ) : null}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-6 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center space-x-2">
            <span>Subreddit Vibe Check &copy; {new Date().getFullYear()}</span>
            <span>•</span>
            <span>Built with React, Vite & Tailwind CSS</span>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href="https://www.reddit.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-300 transition-colors flex items-center gap-1"
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
