/**
 * Computes aggregate subreddit sentiment statistics and overall vibe label
 * @param {Array} analyzedPosts - Array of posts enriched with sentiment fields from analyzeTitles
 * @returns {Object} { overallLabel, avgScore, avgComparative, counts: { positive, neutral, negative }, mostPositivePost, mostNegativePost, totalPosts, vibeMeta }
 */
export function computeVibe(analyzedPosts = []) {
  if (!Array.isArray(analyzedPosts) || analyzedPosts.length === 0) {
    return {
      overallLabel: 'Neutral',
      avgScore: 0,
      avgComparative: 0,
      counts: { positive: 0, neutral: 0, negative: 0 },
      mostPositivePost: null,
      mostNegativePost: null,
      totalPosts: 0,
      vibeMeta: {
        emoji: '⚖️',
        color: 'amber',
        gradient: 'from-amber-500/20 via-yellow-500/10 to-transparent',
        textColor: 'text-amber-400',
        badgeBg: 'bg-amber-500/10 border-amber-500/30 text-amber-300',
        tagline: 'No posts analyzed.'
      }
    };
  }

  let positiveCount = 0;
  let neutralCount = 0;
  let negativeCount = 0;
  let totalScore = 0;
  let totalComparative = 0;

  let mostPositivePost = analyzedPosts[0];
  let mostNegativePost = analyzedPosts[0];

  analyzedPosts.forEach((post) => {
    const s = post.score || 0;
    const comp = post.comparative || 0;

    totalScore += s;
    totalComparative += comp;

    if (post.label === 'Positive') positiveCount++;
    else if (post.label === 'Negative') negativeCount++;
    else neutralCount++;

    if (s > (mostPositivePost.score || 0)) mostPositivePost = post;
    if (s < (mostNegativePost.score || 0)) mostNegativePost = post;
  });

  const totalPosts = analyzedPosts.length;
  const avgScore = Number((totalScore / totalPosts).toFixed(2));
  const avgComparative = Number((totalComparative / totalPosts).toFixed(3));

  // Determine overall Vibe Label & Metadata based on average score
  let overallLabel = 'Mixed';
  let vibeMeta = {
    emoji: '⚖️',
    color: 'amber',
    gradient: 'from-amber-500/20 via-yellow-500/10 to-transparent',
    textColor: 'text-amber-400',
    badgeBg: 'bg-amber-500/10 border-amber-500/30 text-amber-300',
    tagline: 'A balanced mix of news, questions, and discussions.'
  };

  if (avgScore > 1.0) {
    overallLabel = 'Overwhelmingly Positive';
    vibeMeta = {
      emoji: '🌟',
      color: 'emerald',
      gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
      textColor: 'text-emerald-400',
      badgeBg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300',
      tagline: 'Community is full of optimism, wins, and high enthusiasm!'
    };
  } else if (avgScore > 0.0) {
    overallLabel = 'Mostly Positive';
    vibeMeta = {
      emoji: '😊',
      color: 'green',
      gradient: 'from-green-500/20 via-emerald-500/10 to-transparent',
      textColor: 'text-green-400',
      badgeBg: 'bg-green-500/10 border-green-500/30 text-green-300',
      tagline: 'Generally upbeat, helpful, and constructive atmosphere.'
    };
  } else if (avgScore < -1.0) {
    overallLabel = 'Overwhelmingly Negative';
    vibeMeta = {
      emoji: '😟',
      color: 'rose',
      gradient: 'from-rose-600/20 via-red-500/10 to-transparent',
      textColor: 'text-rose-400',
      badgeBg: 'bg-rose-500/10 border-rose-500/30 text-rose-300',
      tagline: 'Heavy outrage, intense complaints, or critical news.'
    };
  } else if (avgScore < 0.0) {
    overallLabel = 'Mixed';
    vibeMeta = {
      emoji: '⚖️',
      color: 'amber',
      gradient: 'from-amber-500/20 via-yellow-500/10 to-transparent',
      textColor: 'text-amber-400',
      badgeBg: 'bg-amber-500/10 border-amber-500/30 text-amber-300',
      tagline: 'A balanced mix of news, questions, and discussions.'
    };
  }

  return {
    overallLabel,
    avgScore,
    avgComparative,
    counts: {
      positive: positiveCount,
      neutral: neutralCount,
      negative: negativeCount
    },
    mostPositivePost: mostPositivePost.score > 0 ? mostPositivePost : null,
    mostNegativePost: mostNegativePost.score < 0 ? mostNegativePost : null,
    totalPosts,
    vibeMeta
  };
}
