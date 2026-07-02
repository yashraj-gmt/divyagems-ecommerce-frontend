/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--color-primary)",
          light: "var(--color-primary-light)",
        },
        secondary: {
          DEFAULT: "var(--color-secondary)",
          dark: "var(--color-secondary-dark)",
          light: "var(--color-secondary-light)",
        },
        "accent-emerald": "var(--color-accent-emerald)",
        bg: {
          DEFAULT: "var(--color-bg)",
          section: "var(--color-bg-section)",
          dark: "var(--color-bg-dark)",
        },
        "text-primary": "var(--color-text-primary)",
        "text-muted": "var(--color-text-muted)",
        "text-inverse": "var(--color-text-inverse)",
        "text-gold": "var(--color-text-gold)",
        border: "var(--color-border)",
        btn: {
          DEFAULT: "var(--color-btn)",
          hover: "var(--color-btn-hover)",
        },
      },
      fontFamily: {
        sans: ["Libre Baskerville", "Georgia", "serif"],
        display: ["Fraunces", "serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
      fontSize: {
        xs: ['14px', { lineHeight: '20px' }],
        sm: ['16px', { lineHeight: '24px' }],
        base: ['18px', { lineHeight: '28px' }],
        lg: ['20px', { lineHeight: '28px' }],
        xl: ['22px', { lineHeight: '32px' }],
        '2xl': ['26px', { lineHeight: '34px' }],
        '3xl': ['32px', { lineHeight: '40px' }],
        '4xl': ['38px', { lineHeight: '44px' }],
        '5xl': ['50px', { lineHeight: '56px' }],
        '6xl': ['62px', { lineHeight: '72px' }],
      },
      boxShadow: {
        card: "var(--shadow-card)",
        hover: "var(--shadow-hover)",
      },
      maxWidth: {
        container: "var(--container-max)",
      },
      borderRadius: {
        card: "12px",
      },
    },
  },
  plugins: [],
};