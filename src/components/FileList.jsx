import React, { useEffect, useRef } from "react";
import { RiFileCodeLine, RiArrowRightSLine } from "react-icons/ri";

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
    <div
      ref={listRef} 
      className="overflow-hidden rounded-xl border-2 border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-md divide-y divide-neutral-200 dark:divide-neutral-700"
    >
      {files.length === 0 ? (
        <div className="p-6 text-center text-neutral-500 dark:text-neutral-400 text-lg">
          No files found
        </div>
      ) : (
        files.map((file) => (
          <button
            key={file.path}
            className="w-full group flex items-center justify-between p-4 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-all duration-200 hover:shadow-inner"
            onClick={() => onSelect(file)}
          >
            <div className="flex items-center">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center mr-4 shadow-sm group-hover:shadow group-hover:bg-primary-100 dark:group-hover:bg-primary-900/30 transition-all duration-200">
                <RiFileCodeLine className="text-primary-500 text-2xl" />
              </div>
              <div className="text-left">
                <h3 className="text-base font-medium text-neutral-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {file.name}
                </h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 truncate max-w-xs">
                  {file.path.split('/').slice(-2).join('/')}
                </p>
              </div>
            </div>
            <RiArrowRightSLine className="text-neutral-400 text-xl group-hover:text-primary-500 group-hover:translate-x-1 transition-all duration-200" />
          </button>
        ))
      )}
    </div>
  );
};

export default FileList;
