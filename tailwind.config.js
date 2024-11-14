/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        normal:'#262626',
        fire:'#ef4444',
        fighting:'#f97316',
        water:'#3b82f6',
        flying:'#0ea5e9',
        grass:'#22c55e',
        poison:'#8b5cf6',
        electric:'#facc15',
        ground:'#92400e',
        psychic:'#ec4899',
        rock:'#57534e',
        ice:'#a5f3fc',
        bug:'#84cc16',
        dragon:'#d946ef',
        ghost:'#86198f',
        dark:'#a21caf',
        steel:'#e2e8f0',
        fairy:'#fb7185',
        stellar:'#34d399',
      }
    },
  },
  safelist: [
    'bg-normal', 'bg-fire', 'bg-fighting', 'bg-water', 'bg-flying', 'bg-grass', 'bg-poison',
    'bg-electric', 'bg-ground', 'bg-psychic', 'bg-rock', 'bg-ice', 'bg-bug', 'bg-dragon',
    'bg-ghost', 'bg-dark', 'bg-steel', 'bg-fairy', 'bg-stellar'
  ],
  plugins: [],
}
