import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: 'rgb(var(--navy) / <alpha-value>)',
        teal: 'rgb(var(--teal) / <alpha-value>)',
        'warm-brown': 'rgb(var(--warm-brown) / <alpha-value>)',
        gold: 'rgb(var(--gold) / <alpha-value>)',
        cream: 'rgb(var(--cream) / <alpha-value>)',
        'section-bg': 'rgb(var(--section-bg) / <alpha-value>)',
        sand: 'rgb(var(--sand) / <alpha-value>)',
        deep: 'rgb(var(--deep) / <alpha-value>)',
        stone: 'rgb(var(--stone) / <alpha-value>)',
        white: 'rgb(var(--white) / <alpha-value>)',
        charcoal: 'rgb(var(--charcoal) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
      },
      fontFamily: {
        serif: ['Henri Didot', 'Didot', 'serif'],
        sans: ['Acumin Variable', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 22px 60px rgb(var(--navy) / 0.08)',
        card: '0 24px 70px rgb(var(--navy) / 0.14)',
      },
      letterSpacing: {
        editorial: '0.28em',
      },
    },
  },
  plugins: [typography],
};
