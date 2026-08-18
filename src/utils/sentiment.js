import Sentiment from 'sentiment';

const analyzer = new Sentiment();

/**
 * Analyzes a single post title
 */
export function analyzePostTitle(post) {
  const result = analyzer.analyze(post.title || '');
  const score = result.score;
  const comparative = Number(result.comparative.toFixed(3));

  let classification = 'neutral';
  if (comparative > 0.03 || (comparative === 0 && score > 0)) {
    classification = 'positive';
  } else if (comparative < -0.03 || (comparative === 0 && score < 0)) {
    classification = 'negative';
  }

  return {
    ...post,
    sentiment: {
      score,
      comparative,
      classification,
      positiveWords: result.positive || [],
      negativeWords: result.negative || [],
      tokens: result.tokens || []
    }
  };
}

/**
 * Analyzes an array of posts and produces aggregate subreddit vibe metrics
 */
export function analyzeSubredditVibe(posts = []) {
  if (!posts.length) return null;

  const analyzedPosts = posts.map(analyzePostTitle);

  let positiveCount = 0;
  let neutralCount = 0;
  let negativeCount = 0;
  let totalScore = 0;
  let totalComparative = 0;

  const posWordMap = {};
  const negWordMap = {};

  let topPositivePost = analyzedPosts[0];
  let topNegativePost = analyzedPosts[0];

  analyzedPosts.forEach(post => {
    const { classification, score, comparative, positiveWords, negativeWords } = post.sentiment;

    totalScore += score;
    totalComparative += comparative;

    if (classification === 'positive') positiveCount++;
    else if (classification === 'negative') negativeCount++;
    else neutralCount++;

    if (score > topPositivePost.sentiment.score) topPositivePost = post;
    if (score < topNegativePost.sentiment.score) topNegativePost = post;

    positiveWords.forEach(word => {
      const w = word.toLowerCase();
      posWordMap[w] = (posWordMap[w] || 0) + 1;
    });

    negativeWords.forEach(word => {
      const w = word.toLowerCase();
      negWordMap[w] = (negWordMap[w] || 0) + 1;
    });
  });

  const total = analyzedPosts.length;
  const avgScore = Number((totalScore / total).toFixed(2));
  const avgComparative = Number((totalComparative / total).toFixed(3));

  const positivePercent = Math.round((positiveCount / total) * 100);
  const neutralPercent = Math.round((neutralCount / total) * 100);
  const negativePercent = Math.round((negativeCount / total) * 100);

  // Overall Vibe Classification
  let vibe = {
    label: 'Mixed / Balanced',
    tagline: 'A balanced mix of news, questions, and discussions.',
    color: 'amber',
    emoji: '⚖️',
    gradient: 'from-amber-500/20 via-yellow-500/10 to-transparent',
    borderColor: 'border-amber-500/40',
    textColor: 'text-amber-400',
    badgeBg: 'bg-amber-500/10 border-amber-500/30 text-amber-300'
  };

  if (avgComparative >= 0.15 || positivePercent >= 55) {
    vibe = {
      label: 'Overwhelmingly Positive',
      tagline: 'Community is full of optimism, wins, and high enthusiasm!',
      color: 'emerald',
      emoji: '🌟',
      gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
      borderColor: 'border-emerald-500/40',
      textColor: 'text-emerald-400',
      badgeBg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
    };
  } else if (avgComparative >= 0.04 || positivePercent >= 40) {
    vibe = {
      label: 'Mostly Positive',
      tagline: 'Generally upbeat, helpful, and constructive atmosphere.',
      color: 'green',
      emoji: '😊',
      gradient: 'from-green-500/20 via-emerald-500/10 to-transparent',
      borderColor: 'border-green-500/40',
      textColor: 'text-green-400',
      badgeBg: 'bg-green-500/10 border-green-500/30 text-green-300'
    };
  } else if (avgComparative <= -0.15 || negativePercent >= 50) {
    vibe = {
      label: 'Toxic / Hostile',
      tagline: 'Heavy outrage, intense complaints, or high negativity.',
      color: 'rose',
      emoji: '☣️',
      gradient: 'from-rose-600/20 via-red-500/10 to-transparent',
      borderColor: 'border-rose-500/40',
      textColor: 'text-rose-400',
      badgeBg: 'bg-rose-500/10 border-rose-500/30 text-rose-300'
    };
  } else if (avgComparative <= -0.04 || negativePercent >= 38) {
    vibe = {
      label: 'Mostly Negative',
      tagline: 'Notable frustration, critical discussions, or complaints.',
      color: 'orange',
      emoji: '😟',
      gradient: 'from-orange-500/20 via-amber-500/10 to-transparent',
      borderColor: 'border-orange-500/40',
      textColor: 'text-orange-400',
      badgeBg: 'bg-orange-500/10 border-orange-500/30 text-orange-300'
    };
  }

  // Top Keywords
  const topPositiveWords = Object.entries(posWordMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([word, count]) => ({ word, count }));

  const topNegativeWords = Object.entries(negWordMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([word, count]) => ({ word, count }));

  return {
    totalPosts: total,
    positiveCount,
    neutralCount,
    negativeCount,
    positivePercent,
    neutralPercent,
    negativePercent,
    avgScore,
    avgComparative,
    vibe,
    topPositivePost: topPositivePost.sentiment.score > 0 ? topPositivePost : null,
    topNegativePost: topNegativePost.sentiment.score < 0 ? topNegativePost : null,
    topPositiveWords,
    topNegativeWords,
    analyzedPosts
  };
}
