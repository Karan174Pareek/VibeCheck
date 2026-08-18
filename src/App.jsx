import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { VibeSummaryCard } from './components/VibeSummaryCard';
import { StatCards } from './components/StatCards';
import { PostList } from './components/PostList';
import { LoadingState } from './components/LoadingState';
import { ErrorState } from './components/ErrorState';
import { EmptyState } from './components/EmptyState';
import { fetchHotPosts } from './api/reddit';
import { analyzeTitles } from './utils/sentiment';
import { computeVibe } from './utils/aggregate';

export function App() {
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
    <div className="min-h-screen bg-[#0B2B26] text-[#dae6d6] font-['JetBrains_Mono'] antialiased">
      {/* Header */}
      <Header />

      {/* Main Single-Page Canvas */}
      <main className="max-w-[1400px] mx-auto px-4 sm:px-8 pt-24 pb-12 space-y-8">
        {/* Full-width SearchBar (Target Acquisition) */}
        <SearchBar
          onSearch={handleSearch}
          isLoading={status === 'loading'}
          initialValue={subreddit}
        />

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
          <div className="space-y-8 animate-fade-in">
            {/* 1. Hero Vibe Centerpiece Result */}
            <VibeSummaryCard
              subreddit={subreddit}
              vibeSummary={vibeSummary}
            />

            {/* 2. Real Telemetry Stat Cards */}
            <StatCards vibeSummary={vibeSummary} />

            {/* 3. 50-Post Raw Stream Ledger View */}
            <PostList
              posts={posts}
              counts={vibeSummary.counts}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
