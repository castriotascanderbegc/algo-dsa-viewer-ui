// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
    // Use 'class' strategy for dark mode
    darkMode: 'class',
  
    // Make sure these paths correctly point to all your .html/.jsx files
    content: [
      './index.html',
      './src/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
      extend: {
        colors: {
          primary: {
            50: '#f0f9ff',
            100: '#e0f2fe',
            200: '#bae6fd',
            300: '#7dd3fc',
            400: '#38bdf8',
            500: '#0ea5e9',
            600: '#0284c7',
            700: '#0369a1',
            800: '#075985',
            900: '#0c4a6e',
          },
          neutral: {
            50: '#fafafa',
            100: '#f5f5f5',
            200: '#e5e5e5',
            300: '#d4d4d4',
            400: '#a3a3a3',
            500: '#737373',
            600: '#525252',
            700: '#404040',
            800: '#262626',
            900: '#171717',
          },
          success: {
            50: '#ecfdf5',
            500: '#10b981',
            700: '#047857',
          },
          warning: {
            50: '#fffbeb',
            500: '#f59e0b',
            700: '#b45309',
          },
          danger: {
            50: '#fef2f2',
            500: '#ef4444',
            700: '#b91c1c',
          },
        },
        fontFamily: {
          sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
          mono: ['"JetBrains Mono"', 'monospace'],
        },
        boxShadow: {
          'smooth': '0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.1)',
          'card': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
          'elevated': '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025)',
          'focus': '0 0 0 3px rgba(14, 165, 233, 0.3)',
        },
        borderRadius: {
          'lg': '0.625rem',
          'xl': '0.875rem',
          '2xl': '1.125rem',
        },
        animation: {
          'pulse-gentle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          'spin-slow': 'spin 2.5s linear infinite',
          'bounce-gentle': 'bounce 1.5s infinite',
        },
        transitionProperty: {
          'height': 'height',
          'spacing': 'margin, padding',
        },
      },
    },
    plugins: [],
  };
  