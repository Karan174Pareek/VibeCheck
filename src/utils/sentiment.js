import Sentiment from 'sentiment';

const sentiment = new Sentiment();

/**
 * Enriches an array of post objects with client-side AFINN sentiment scores and labels
 * @param {Array} posts - Raw posts array from Reddit API
 * @returns {Array} Enriched posts array with { score, label, comparative, positiveWords, negativeWords }
 */
export function analyzeTitles(posts = []) {
  if (!Array.isArray(posts)) return [];

  return posts.map((post) => {
    const title = post.title || '';
    const result = sentiment.analyze(title);

    const score = result.score;
    const comparative = Number(result.comparative.toFixed(3));

    let label = 'Neutral';
    if (score > 0) {
      label = 'Positive';
    } else if (score < 0) {
      label = 'Negative';
    }

    return {
      ...post,
      score, // sentiment score
      label, // 'Positive' | 'Neutral' | 'Negative'
      comparative,
      positiveWords: result.positive || [],
      negativeWords: result.negative || []
    };
  });
}
