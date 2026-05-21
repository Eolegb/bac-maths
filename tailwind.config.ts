import { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#0c0c0f',
        'dark-card': '#131318',
        'dark-border': '#252530',
        'dark-text': '#ededf5',
        'dark-subtext': '#8888a8',
        'accent-gold': '#f0c040',
      },
      spacing: {
        'safe': 'env(safe-area-inset-top)',
      },
      padding: {
        'safe': 'env(safe-area-inset-top)',
      },
    },
  },
  plugins: [],
}

export default config
