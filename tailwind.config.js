/** Tailwind configuration mapped to Mazdoor palette tokens */
module.exports = {
  content: [
    './app/**/*.{vue,js,ts}',
    './components/**/*.{vue,js,ts}',
    './pages/**/*.{vue,js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f6ff',
          100: '#e0edff',
          200: '#c7d7ff',
          300: '#9db8ff',
          400: '#6f95ff',
          500: '#1E40AF',
          600: '#1a3aa0',
          700: '#15328a',
          800: '#122c75',
          900: '#0c214e',
        },
        secondary: {
          50: '#f3fbf6',
          100: '#e6f8ee',
          200: '#cfeecf',
          300: '#a6e8bf',
          400: '#75d8a1',
          500: '#16A34A',
          600: '#139a45',
          700: '#108a39',
          800: '#0f7a31',
          900: '#0c5f25',
        },
        neutral: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        // optional accent family if needed
        accent: {
          50: '#fff7ed',
          100: '#fed7aa',
          200: '#fdba74',
          300: '#f59e0b',
          400: '#d97706',
          500: '#b45309',
          600: '#9a3412',
          700: '#7c2d12',
          800: '#6b2d0a',
          900: '#4b2106',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
