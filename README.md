# 12Flock — Lyric & Music Distribution

Distribute your lyrics and tracks to Spotify, Apple Music, TikTok, WhatsApp, Instagram, YouTube Music, Amazon Music, and Deezer from one upload.

**Live site:** https://YOUR-USERNAME.github.io/12-Flock-Lyrics-Distribution/

## Features

- 🎵 Lyrics-first distribution — synced LRC, timed captions handled automatically
- 🌍 8 platforms in one upload
- 📊 Real-time analytics per platform
- 🔍 Catalog claiming — reclaim existing releases and route royalties to you
- 💰 Monthly royalty payouts via M-Pesa, PayPal, or bank transfer
- 🛡️ Rights protection via content ID registration
- 🆓 First release free, no credit card required

## Tech stack

- React 18 + Vite
- Lucide React icons
- Google Fonts (Fraunces, Inter, JetBrains Mono)
- Deployed via GitHub Actions → GitHub Pages

## Local development

```bash
npm install
npm run dev
```

## Deployment

Pushes to `main` automatically build and deploy to GitHub Pages via `.github/workflows/deploy.yml`.

Make sure to set the correct `base` in `vite.config.js` to match your repo name:

```js
base: '/12-Flock-Lyrics-Distribution/',
```

Then in your GitHub repo settings → Pages → Source → select **GitHub Actions**.
