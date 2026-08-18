import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { SearchBar } from './components/SearchBar';
import { SystemStatus } from './components/SystemStatus';
import { AnalogGauge } from './components/AnalogGauge';
import { VectorTally } from './components/VectorTally';
import { TeletypeStream } from './components/TeletypeStream';
import { LoadingState } from './components/LoadingState';
import { ErrorState } from './components/ErrorState';
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
      {/* Top Telemetry Header */}
      <Header />

      {/* Operator Side Console */}
      <Sidebar onNewScan={() => handleSearch('reactjs')} />

      {/* Main Content Canvas */}
      <main className="pt-24 pb-8 px-4 md:pl-72 md:pr-8 min-h-screen flex flex-col gap-8 max-w-[1600px] mx-auto">
        {/* Top Row: Input Acquisition & System Status */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <SearchBar
            onSearch={handleSearch}
            isLoading={status === 'loading'}
            initialValue={subreddit}
          />
          <SystemStatus
            isLoading={status === 'loading'}
            isError={status === 'error'}
            isSuccess={status === 'success'}
          />
        </div>

        {/* View Switching based on State */}
        {status === 'loading' && <LoadingState />}

        {status === 'error' && (
          <ErrorState
            errorMessage={errorMessage}
            onRetry={() => handleSearch(subreddit)}
            onSelectPreset={handleSearch}
          />
        )}

        {status === 'success' && vibeSummary && (
          <>
            {/* Middle Row: Analog Gauge Dial & Vector Tally */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <AnalogGauge vibeSummary={vibeSummary} />
              <VectorTally counts={vibeSummary.counts} />
            </div>

            {/* Bottom Row: Raw Teletype Sentiment Stream */}
            <TeletypeStream posts={posts} />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
