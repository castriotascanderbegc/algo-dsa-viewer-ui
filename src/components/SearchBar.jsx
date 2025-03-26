import React, { useState, useEffect } from "react";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Set debounce timeout (500ms)
    const debounceTimer = setTimeout(() => {
      // Only trigger search if query length is sufficient
      if (searchTerm.trim().length >= 2) {
        onSearch(searchTerm);
      }
    }, 500);

    // Cleanup timeout on input change
    return () => clearTimeout(debounceTimer);
  }, [searchTerm, onSearch]);

  return (
    <input
      type="text"
      placeholder="🔍 Search problems..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  );
};

export default SearchBar;