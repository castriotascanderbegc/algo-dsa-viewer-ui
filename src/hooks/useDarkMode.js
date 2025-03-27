// src/hooks/useDarkMode.js
import { useState, useEffect } from 'react';

// Create a custom event for theme changes
const createThemeChangeEvent = (isDark) => {
  console.log('Dispatching themeChange event, isDark:', isDark);
  const event = new CustomEvent('themeChange', { detail: { isDark } });
  window.dispatchEvent(event);
};

const useDarkMode = () => {
  // Initialize from localStorage or system preference
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage first
    const stored = localStorage.getItem('darkMode');
    if (stored !== null) {
      return JSON.parse(stored);
    }
    // If no stored preference, check system preference
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Apply dark mode changes to the HTML element
  useEffect(() => {
    console.log("Dark mode changed to:", darkMode);
    
    if (darkMode) {
      document.documentElement.classList.add('dark');
      console.log("Added 'dark' class to HTML element");
    } else {
      document.documentElement.classList.remove('dark');
      console.log("Removed 'dark' class from HTML element");
    }
    
    // Store the preference
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    
    // Dispatch a custom event that components can listen for
    createThemeChangeEvent(darkMode);
  }, [darkMode]);

  // Listen for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      // Only update if user hasn't manually set a preference
      if (localStorage.getItem('darkMode') === null) {
        setDarkMode(e.matches);
      }
    };

    // Add listener if browser supports it
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  const toggleDarkMode = () => {
    console.log("Toggling dark mode from", darkMode, "to", !darkMode);
    // Use functional update to ensure we're toggling the current value
    setDarkMode(prevDarkMode => {
      const newDarkMode = !prevDarkMode;
      // Create theme change event immediately after update
      setTimeout(() => createThemeChangeEvent(newDarkMode), 0);
      return newDarkMode;
    });
  };

  return [darkMode, toggleDarkMode];
};

export default useDarkMode;
