/**
 * Reddit API service for fetching public subreddit hot posts
 */

export function sanitizeSubredditName(rawInput) {
  if (!rawInput) return '';
  let cleaned = rawInput.trim();
  // Strip leading r/ or /r/
  cleaned = cleaned.replace(/^(\/)?r\//i, '');
  // Strip trailing slashes
  cleaned = cleaned.replace(/\/+$/, '');
  // Keep only alphanumeric characters and underscores (Reddit subreddit naming rules)
  cleaned = cleaned.replace(/[^a-zA-Z0-9_]/g, '');
  return cleaned;
}

export async function fetchSubredditHotPosts(subredditName, limit = 50) {
  const cleanSub = sanitizeSubredditName(subredditName);
  
  if (!cleanSub) {
    throw new Error('Please enter a valid subreddit name.');
  }

  const url = `https://www.reddit.com/r/${cleanSub}/hot.json?limit=${limit}`;

  try {
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.status === 404) {
      throw new Error(`Subreddit 'r/${cleanSub}' was not found. Please check the spelling or try another subreddit.`);
    }

    if (response.status === 403) {
      throw new Error(`Subreddit 'r/${cleanSub}' is private or restricted.`);
    }

    if (response.status === 429) {
      throw new Error(`Reddit API rate limit hit. Please wait a few seconds and try again.`);
    }

    if (!response.ok) {
      throw new Error(`Unable to fetch posts for 'r/${cleanSub}'. (HTTP ${response.status})`);
    }

    const data = await response.json();

    // Check if Reddit returned a redirection error or error payload
    if (data.error) {
      if (data.error === 404 || data.reason === 'banned') {
        throw new Error(`Subreddit 'r/${cleanSub}' has been banned or does not exist.`);
      }
      if (data.error === 403 || data.reason === 'private') {
        throw new Error(`Subreddit 'r/${cleanSub}' is private.`);
      }
      throw new Error(data.message || `Error fetching r/${cleanSub}`);
    }

    const children = data?.data?.children;

    if (!children || !Array.isArray(children) || children.length === 0) {
      throw new Error(`No posts found in 'r/${cleanSub}'. The subreddit might be brand new or empty.`);
    }

    // Filter and map valid post data (ignoring stickied ads if needed, but keeping normal posts)
    const posts = children
      .map(child => child.data)
      .filter(post => post && post.title)
      .map(post => ({
        id: post.id,
        title: post.title,
        score: post.score || 0,
        num_comments: post.num_comments || 0,
        url: post.url,
        permalink: `https://www.reddit.com${post.permalink}`,
        author: post.author || '[deleted]',
        created_utc: post.created_utc,
        thumbnail: post.thumbnail && post.thumbnail.startsWith('http') ? post.thumbnail : null,
        over_18: Boolean(post.over_18),
        link_flair_text: post.link_flair_text || null,
        upvote_ratio: post.upvote_ratio || 0,
        stickied: Boolean(post.stickied)
      }));

    return {
      subreddit: cleanSub,
      postsCount: posts.length,
      posts
    };
  } catch (error) {
    if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
      throw new Error(`Network error. Please check your internet connection or ad-blocker settings.`);
    }
    throw error;
  }
}
