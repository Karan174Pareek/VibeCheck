/**
 * Reddit API service for fetching public subreddit hot posts.
 * Uses api.reddit.com endpoint to avoid CORS issues in client-side browsers.
 */

export function sanitizeSubreddit(rawInput) {
  if (!rawInput) return '';
  let cleaned = rawInput.trim();
  // Strip leading r/ or /r/
  cleaned = cleaned.replace(/^(\/)?r\//i, '');
  // Strip trailing slashes
  cleaned = cleaned.replace(/\/+$/, '');
  // Keep valid subreddit characters (alphanumeric and underscores)
  cleaned = cleaned.replace(/[^a-zA-Z0-9_]/g, '');
  return cleaned;
}

export async function fetchHotPosts(subreddit) {
  const cleanSub = sanitizeSubreddit(subreddit);

  if (!cleanSub) {
    throw new Error('Please enter a valid subreddit name.');
  }

  const url = `https://api.reddit.com/r/${cleanSub}/hot?limit=50`;

  try {
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.status === 404) {
      throw new Error(`r/${cleanSub} not found.`);
    }

    if (response.status === 403) {
      throw new Error(`This subreddit is private or unavailable.`);
    }

    if (response.status === 429) {
      throw new Error(`Couldn't reach Reddit right now, try again in a moment.`);
    }

    if (!response.ok) {
      throw new Error(`Couldn't reach Reddit right now, try again in a moment.`);
    }

    const data = await response.json();

    // Handle Reddit JSON redirection/error payloads
    if (data.error) {
      if (data.error === 404 || data.reason === 'banned') {
        throw new Error(`r/${cleanSub} not found.`);
      }
      if (data.error === 403 || data.reason === 'private') {
        throw new Error(`This subreddit is private or unavailable.`);
      }
      throw new Error(`Couldn't reach Reddit right now, try again in a moment.`);
    }

    const children = data?.data?.children;

    if (!children || !Array.isArray(children) || children.length === 0) {
      throw new Error(`No posts found in r/${cleanSub}.`);
    }

    // Map children to post objects
    const posts = children
      .map(child => child.data)
      .filter(post => post && post.title)
      .map(post => ({
        id: post.id,
        title: post.title,
        ups: post.ups || post.score || 0,
        num_comments: post.num_comments || 0,
        permalink: `https://www.reddit.com${post.permalink}`,
        author: post.author || '[deleted]',
        created_utc: post.created_utc,
        over_18: Boolean(post.over_18),
        link_flair_text: post.link_flair_text || null,
        thumbnail: post.thumbnail && post.thumbnail.startsWith('http') ? post.thumbnail : null
      }));

    return posts;
  } catch (error) {
    if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
      throw new Error(`Couldn't reach Reddit right now, try again in a moment.`);
    }
    throw error;
  }
}
