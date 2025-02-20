import React, { useState, useEffect } from "react";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      onSearch(searchTerm);
    }, 500); // Debounce

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, onSearch]);

  return (
    <input
      type="text"
      placeholder="🔍 Search problems..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="border p-2 w-full mt-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  );
};

export default SearchBar;
