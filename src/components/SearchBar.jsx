import React, { useState, useEffect } from "react";
import { RiSearchLine, RiCloseLine } from "react-icons/ri";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  // Clear search function
  const handleClearSearch = () => {
    setSearchTerm("");
    onSearch("");
  };

  useEffect(() => {
    // Debounce search with 500ms delay
    const debounceTimer = setTimeout(() => {
      if (searchTerm.trim().length >= 2) {
        onSearch(searchTerm);
      } else if (searchTerm.trim().length === 0) {
        onSearch("");
      }
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, onSearch]);

  return (
    <div className="relative mb-6">
      {/* Create a flex container for better layout control */}
      <div className={`
        flex items-center
        shadow-md border-2 border-neutral-200 dark:border-neutral-700
        rounded-xl bg-white dark:bg-neutral-800
        ${isFocused ? 'shadow-lg ring-2 ring-primary-500/30 border-primary-300 dark:border-primary-700' : ''}
        transition-all duration-300
      `}>
        {/* Icon container with fixed width */}
        <div className={`
          flex-shrink-0 w-16 flex justify-center items-center 
          transition-colors duration-200
          ${isFocused ? 'text-primary-500' : 'text-neutral-500 dark:text-neutral-400'}
        `}>
          <RiSearchLine className="text-2xl" />
        </div>
        
        {/* Input field */}
        <input
          type="text"
          placeholder="Search problems..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`
            flex-grow py-6 pr-14 
            text-lg font-medium
            bg-transparent
            text-neutral-800
            placeholder:text-neutral-400 dark:placeholder:text-neutral-300
            focus:outline-none
          `}
          aria-label="Search problems"
        />
        
        {/* Clear button */}
        {searchTerm && (
          <button
            onClick={handleClearSearch}
            className="flex-shrink-0 w-14 flex justify-center items-center text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors duration-200"
            aria-label="Clear search"
          >
            <RiCloseLine className="text-2xl" />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;