// src/components/DarkModeToggle.jsx
import React from 'react';
import { RiSunLine, RiMoonClearLine } from 'react-icons/ri';

const DarkModeToggle = ({darkMode, toggleDarkMode}) => {
  return (
    <button
      onClick={toggleDarkMode}
      className="relative inline-flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm font-medium transition-all duration-300 hover:scale-105 hover:border-primary-300 dark:hover:border-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
      aria-label={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {darkMode ? (
        <RiSunLine className="h-5 w-5 md:h-6 md:w-6 text-amber-500 transition-transform duration-500 rotate-0" />
      ) : (
        <RiMoonClearLine className="h-5 w-5 md:h-6 md:w-6 text-neutral-700 transition-transform duration-500 rotate-0" />
      )}
      <span className="sr-only">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
    </button>
  );
};

export default DarkModeToggle;
