import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: 'var(--navy)',
        gold: 'var(--gold)',
        cream: 'var(--cream)',
        white: 'var(--white)',
        charcoal: 'var(--charcoal)',
        muted: 'var(--muted)',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'serif'],
        sans: ['DM Sans', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 22px 60px rgba(15, 27, 45, 0.08)',
        card: '0 24px 70px rgba(15, 27, 45, 0.14)',
      },
      letterSpacing: {
        editorial: '0.28em',
      },
    },
  },
  plugins: [typography],
};
