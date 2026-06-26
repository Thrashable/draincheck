/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        surface: {
          base: '#0B0E11',
          raised: '#12161B',
          overlay: '#1A1F26',
          border: '#252B33',
        },
        accent: {
          coral: '#FF6B6B',
          coralDim: '#FF6B6B20',
        },
        category: {
          entertainment: '#FF6B6B',
          music: '#A78BFA',
          productivity: '#34D399',
          cloud: '#60A5FA',
          finance: '#FBBF24',
          health: '#F472B6',
          shopping: '#FB923C',
          news: '#94A3B8',
          other: '#6B7280',
        },
        text: {
          primary: '#F1F5F9',
          secondary: '#94A3B8',
          muted: '#64748B',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        body: ['"DM Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
