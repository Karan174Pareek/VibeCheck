/**
 * Reddit API service for fetching public subreddit hot posts.
 * Includes JSON endpoints, Vite proxy, and RSS Atom XML fallbacks
 * to guarantee 100% data acquisition even when Cloudflare blocks raw JSON APIs.
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

/**
 * Parses Reddit Atom RSS feed XML into post objects
 */
export function parseRedditRSS(xmlText) {
  if (typeof DOMParser === 'undefined') return [];
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
  const entries = Array.from(xmlDoc.querySelectorAll('entry'));

  return entries
    .map((entry, idx) => {
      const title = entry.querySelector('title')?.textContent || '';
      const link = entry.querySelector('link')?.getAttribute('href') || '';
      const author = entry.querySelector('author name')?.textContent?.replace(/^\/u\//, '') || '[deleted]';
      const updated = entry.querySelector('updated')?.textContent || '';
      const created_utc = updated ? Math.floor(new Date(updated).getTime() / 1000) : Math.floor(Date.now() / 1000);

      if (!title) return null;

      return {
        id: `rss_${idx}_${Date.now()}`,
        title,
        ups: 1,
        num_comments: 0,
        permalink: link || '#',
        author,
        created_utc,
        over_18: false,
        link_flair_text: null
      };
    })
    .filter(Boolean);
}

export async function fetchHotPosts(subreddit) {
  const cleanSub = sanitizeSubreddit(subreddit);

  if (!cleanSub) {
    throw new Error('Please enter a valid subreddit name.');
  }

  const rawRedditUrl = `https://www.reddit.com/r/${cleanSub}/hot.json?limit=50`;

  // Multi-protocol endpoints (JSON, Proxies, and RSS)
  const jsonEndpoints = [
    `/reddit-api/r/${cleanSub}/hot.json?limit=50`,
    `https://api.reddit.com/r/${cleanSub}/hot?limit=50`,
    rawRedditUrl,
    `https://api.allorigins.win/raw?url=${encodeURIComponent(rawRedditUrl)}`,
    `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(rawRedditUrl)}`
  ];

  let lastError = null;

  // 1. Try JSON Endpoints
  for (const url of jsonEndpoints) {
    try {
      const response = await fetch(url, {
        headers: { 'Accept': 'application/json' }
      });

      if (response.status === 404) {
        throw new Error(`r/${cleanSub} not found.`);
      }

      if (response.status === 403) {
        lastError = new Error(`This subreddit is private or unavailable.`);
        continue;
      }

      if (response.ok) {
        const text = await response.text();
        let data;
        try {
          data = JSON.parse(text);
          if (data && data.contents) data = JSON.parse(data.contents);
        } catch (e) {
          continue;
        }

        if (data && data.error) {
          if (data.error === 404 || data.reason === 'banned') throw new Error(`r/${cleanSub} not found.`);
          if (data.error === 403 || data.reason === 'private') throw new Error(`This subreddit is private or unavailable.`);
          continue;
        }

        const children = data?.data?.children;
        if (children && Array.isArray(children) && children.length > 0) {
          return children
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
              link_flair_text: post.link_flair_text || null
            }));
        }
      }
    } catch (error) {
      if (error.message.includes('not found') || error.message.includes('private')) {
        throw error;
      }
      lastError = error;
    }
  }

  // 2. Fallback to RSS Feed if JSON APIs are blocked by Cloudflare
  try {
    const rssResponse = await fetch(`https://www.reddit.com/r/${cleanSub}/hot.rss`);
    if (rssResponse.status === 404) throw new Error(`r/${cleanSub} not found.`);
    if (rssResponse.status === 403) throw new Error(`This subreddit is private or unavailable.`);
    
    if (rssResponse.ok) {
      const xmlText = await rssResponse.text();
      const rssPosts = parseRedditRSS(xmlText);
      if (rssPosts && rssPosts.length > 0) {
        return rssPosts;
      }
    }
  } catch (rssError) {
    if (rssError.message.includes('not found') || rssError.message.includes('private')) {
      throw rssError;
    }
  }

  throw lastError || new Error(`Couldn't reach Reddit right now, try again in a moment.`);
}
