// src/components/DarkModeToggle.jsx
import React from 'react';

const DarkModeToggle = ({darkMode, toggleDarkMode}) => {
  return (
    <button
      onClick={toggleDarkMode}
      className="dark-mode-toggle px-4 py-2 rounded-lg shadow-md hover:shadow-lg"
      style={{
        backgroundColor: darkMode ? '#1a202c' : 'white',
        color: darkMode ? 'white' : 'black',
        border: `1px solid ${darkMode ? '#2d3748' : '#eee'}`,
        transition: 'background-color 300ms, color 300ms, border-color 300ms'
      }}
      aria-label={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
    </button>
  );
};

export default DarkModeToggle;
