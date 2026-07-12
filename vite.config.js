import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// IMPORTANT: set base to your repo name for GitHub Pages
// e.g. if your repo is github.com/yourname/12-Flock-Lyrics-Distribution
// set base to '/12-Flock-Lyrics-Distribution/'
export default defineConfig({
  plugins: [react()],
  base: '/12-Flock-Lyrics-Distribution/',
})
