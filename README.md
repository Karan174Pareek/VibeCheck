# Subreddit Vibe Check ✨

A modern, dark-themed dashboard built with **React**, **Vite**, **Tailwind CSS**, and **Recharts**. It fetches top "Hot" posts from any public subreddit in real-time and runs AFINN-165 sentiment analysis on post titles directly in the browser—with **no backend or API key required**.

![Subreddit Vibe Check Preview](https://raw.githubusercontent.com/reddit/reddit-plugin/master/assets/reddit-logo.png)

---

## 🚀 Features

- **Subreddit Search**: Input any subreddit (auto-strips `r/` prefix and sanitizes input) or click one of the popular presets (`r/reactjs`, `r/aww`, `r/technology`, `r/wallstreetbets`, `r/gaming`, `r/askreddit`).
- **Live Reddit Integration**: Fetches top 50 hot posts directly from Reddit's public read-only JSON API (`https://www.reddit.com/r/{subreddit}/hot.json?limit=50`).
- **Client-Side Sentiment Analysis**: Computes AFINN-165 numeric sentiment scores, comparative sentiment metrics, and classifies posts into *Positive*, *Neutral*, or *Negative*.
- **Vibe Summary Centerpiece Card**: Displays overall subreddit mood classification (*Overwhelmingly Positive*, *Mostly Positive*, *Mixed / Balanced*, *Mostly Negative*, *Toxic / Hostile*), interactive sentiment meter gauge, key driver words, and top post highlights.
- **Data Visualizations (Recharts)**: Interactive Donut Chart showing sentiment ratio breakdown and Bar Chart showing sentiment score distribution buckets.
- **Interactive Post Feed**: Scrollable list displaying post titles with color-coded sentiment badges, numeric scores, upvotes count, comment count, author, relative timestamps, external Reddit links, and expandable title word breakdown.
- **Filter & Search**: In-list search and filter tabs (*All*, *Positive*, *Neutral*, *Negative*) plus sort options (*Hot Rank*, *Highest Sentiment*, *Lowest Sentiment*, *Upvotes*, *Comments*).
- **Graceful Error Handling**: Custom glassmorphic error cards for invalid/banned subreddits (404), private subreddits (403), rate limits (429), and empty results.
- **Vercel SPA Ready**: Includes `vercel.json` SPA rewrite rules out of the box.

---

## 🛠️ Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Charts**: Recharts
- **Sentiment Scoring**: AFINN-165 Sentiment Engine (`sentiment`)
- **Deployment**: Vercel SPA ready

---

## 💻 Local Setup & Running

1. **Clone the repository**:
   ```bash
   git clone <repo-url>
   cd "Subreddit Vibe Check"
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## 📦 Deployment (Vercel)

This project contains zero environment variables or secrets and is configured for instant deployment on Vercel:

1. Import repository on [Vercel](https://vercel.com).
2. Framework Preset: **Vite**
3. Build Command: `npm run build`
4. Output Directory: `dist`
