import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: 'var(--navy)',
        teal: 'var(--teal)',
        'warm-brown': 'var(--warm-brown)',
        gold: 'var(--gold)',
        cream: 'var(--cream)',
        deep: 'var(--deep)',
        stone: 'var(--stone)',
        white: 'var(--white)',
        charcoal: 'var(--charcoal)',
        muted: 'var(--muted)',
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 22px 60px rgba(27, 52, 51, 0.08)',
        card: '0 24px 70px rgba(27, 52, 51, 0.14)',
      },
      letterSpacing: {
        editorial: '0.28em',
      },
    },
  },
  plugins: [typography],
};
