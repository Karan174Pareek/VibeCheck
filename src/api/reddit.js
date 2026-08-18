/**
 * Reddit API service for fetching public subreddit hot posts.
 * Uses multiple real endpoint fallbacks to handle CORS restrictions and browser anti-bot blocks.
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

  const rawRedditUrl = `https://www.reddit.com/r/${cleanSub}/hot.json?limit=50`;

  // Array of direct endpoints and CORS proxy fallbacks
  const endpoints = [
    `https://api.reddit.com/r/${cleanSub}/hot?limit=50`,
    `https://www.reddit.com/r/${cleanSub}/hot.json?limit=50`,
    `https://old.reddit.com/r/${cleanSub}/hot.json?limit=50`,
    `https://api.allorigins.win/raw?url=${encodeURIComponent(rawRedditUrl)}`,
    `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(rawRedditUrl)}`,
    `https://corsproxy.io/?${encodeURIComponent(rawRedditUrl)}`
  ];

  let lastError = null;

  for (const url of endpoints) {
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
        // Skip 403 blocks from individual endpoints and try next fallback
        lastError = new Error(`This subreddit is private or unavailable.`);
        continue;
      }

      if (response.status === 429) {
        lastError = new Error(`Couldn't reach Reddit right now, try again in a moment.`);
        continue;
      }

      if (response.ok) {
        const text = await response.text();
        let data;
        try {
          data = JSON.parse(text);
          // Handle allorigins wrapped response
          if (data && data.contents) {
            data = JSON.parse(data.contents);
          }
        } catch (e) {
          continue;
        }

        // Check if Reddit returned an error JSON payload
        if (data.error) {
          if (data.error === 404 || data.reason === 'banned') {
            throw new Error(`r/${cleanSub} not found.`);
          }
          if (data.error === 403 || data.reason === 'private') {
            throw new Error(`This subreddit is private or unavailable.`);
          }
          continue;
        }

        const children = data?.data?.children;

        if (children && Array.isArray(children) && children.length > 0) {
          // Map valid post data
          const posts = children
            .map((child) => child.data)
            .filter((post) => post && post.title)
            .map((post) => ({
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
        }
      }
    } catch (error) {
      if (error.message.includes('not found') || error.message.includes('private')) {
        throw error;
      }
      lastError = error;
    }
  }

  throw lastError || new Error(`Couldn't reach Reddit right now, try again in a moment.`);
}
