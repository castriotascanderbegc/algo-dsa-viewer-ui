import React, { useEffect, useRef } from "react";

const FileList = ({ files, onSelect, clearFiles }) => {
  const listRef = useRef();

  // Clear file list when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (listRef.current && !listRef.current.contains(e.target)) {
        clearFiles();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [clearFiles]);

  return (
    <ul
      ref={listRef} 
      className="mt-4 border rounded-md p-2 max-h-64 overflow-auto bg-white dark:bg-gray-800 dark:border-gray-600 shadow-md"
    >
      {files.map((file) => (
        <li
          key={file.path}
          className="p-2 hover:bg-blue-100 dark:hover:bg-gray-700 cursor-pointer rounded-md transition"
          onClick={() => onSelect(file)}
        >
          📄 {file.name}
        </li>
      ))}
      {files.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400 text-center">No files found.</p>
      )}
    </ul>
  );
};

export default FileList;
