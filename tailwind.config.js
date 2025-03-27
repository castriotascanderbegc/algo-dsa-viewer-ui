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
        // Add custom theme extensions here if needed
      },
    },
    plugins: [],
  };
  