# 🎬 PickaFlick

A mood-based movie recommender web app. Describe how you're feeling in plain English and get 10 personalized movie recommendations powered by Gemini AI — complete with posters, ratings, streaming availability, and a cross-device watch history.

**Live Demo:** https://pickaflick-two.vercel.app

---

## Features

- Natural language mood input with quick-select mood chips
- AI-powered recommendations via Gemini 2.5 Flash
- Movie posters and ratings from TMDB
- Streaming platform availability (Netflix, Prime, Disney+ etc.)
- Watch history saved to cloud database — synced across all devices
- Never recommends movies you've already watched
- Learns your taste over time based on watch history
- Fully responsive — works on mobile, tablet and desktop

---

## Tech Stack

- ReactJS + Vite
- Gemini AI API (Google)
- TMDB API
- Supabase (PostgreSQL database)
- Vercel (deployment)
- Vanilla CSS

---

## Getting Started

1. Clone the repo and install dependencies

```bash
git clone https://github.com/lakshkhatri2021/pickaflick.git
cd pickaflick
npm install
```

2. Create a `.env` file in the root
   VITE_GEMINI_API_KEY=your_gemini_key

VITE_TMDB_API_KEY=your_tmdb_key

VITE_SUPABASE_URL=your_supabase_url

VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

3. Run locally

```bash
npm run dev
```

---

Built by Laksh • Powered by Gemini AI + TMDB + Supabase
