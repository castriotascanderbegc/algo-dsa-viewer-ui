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
      className="overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white/50 dark:bg-neutral-800/50 backdrop-blur-sm shadow-lg divide-y divide-neutral-200 dark:divide-neutral-700"
    >
      {files.length === 0 ? (
        <div className="p-8 text-center">
          <div className="text-neutral-400 dark:text-neutral-500 text-4xl mb-4">
            <RiFileCodeLine className="mx-auto" />
          </div>
          <p className="text-neutral-500 dark:text-neutral-400 text-lg font-medium">
            No problems found
          </p>
        </div>
      ) : (
        <div className="divide-y divide-neutral-200 dark:divide-neutral-700">
          {files.map((file, index) => (
            <button
              key={file.path}
              className="w-full group flex items-center justify-between p-6 hover:bg-neutral-50/80 dark:hover:bg-neutral-700/30 transition-all duration-300 hover:shadow-md"
              onClick={() => onSelect(file)}
            >
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-300">
                  <RiFileCodeLine className="text-primary-500 text-2xl" />
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
                    {file.name}
                  </h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                    {file.path.split('/').slice(-2).join('/')}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400 group-hover:text-primary-500 transition-colors duration-200">
                  View Solution
                </span>
                <RiArrowRightSLine className="text-neutral-400 text-xl group-hover:text-primary-500 group-hover:translate-x-1 transition-all duration-200" />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileList;
