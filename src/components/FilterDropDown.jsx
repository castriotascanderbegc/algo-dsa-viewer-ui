import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import { RiFilterLine, RiArrowDownSLine, RiCheckLine } from "react-icons/ri";

const FilterDropDown = forwardRef(({ onFilter }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const dropdownRef = useRef(null);
  
  // Expose resetFilter method to parent component via ref
  useImperativeHandle(ref, () => ({
    resetFilter: () => {
      setSelected("");
      onFilter("");
    }
  }));
  
  const dataStructures = [
    "Arrays",
    "Graphs",
    "LinkedLists",
    "DynamicProgramming",
    "Backtracking",
    "Heaps",
    "Trees",
    "Binary Search",
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (structure) => {
    setSelected(structure);
    onFilter(structure);
    setIsOpen(false);
  };

  return (
    <div className="relative mb-6" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full flex items-center justify-between px-5 py-6 rounded-xl text-lg font-medium
          shadow-md border-2 border-neutral-200 dark:border-neutral-700
          bg-white dark:bg-neutral-800
          text-neutral-800 dark:text-neutral-100
          transition-all duration-300
          hover:shadow-lg hover:border-primary-300 dark:hover:border-primary-700
          ${isOpen ? 'shadow-lg ring-2 ring-primary-500/30 border-primary-300 dark:border-primary-700' : ''}
        `}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="flex items-center">
          <RiFilterLine className="mr-4 text-2xl text-neutral-500 dark:text-neutral-400" />
          <span className={selected ? 'text-neutral-900 dark:text-white font-medium' : 'text-neutral-500 dark:text-neutral-400'}>
            {selected || "Filter by Data Structure"}
          </span>
        </div>
        <RiArrowDownSLine className={`text-neutral-500 dark:text-neutral-400 text-2xl transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute z-20 mt-2 w-full max-h-80 overflow-auto bg-white dark:bg-neutral-800 rounded-xl border-2 border-neutral-200 dark:border-neutral-700 shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="py-2">
            <button
              onClick={() => handleSelect("")}
              className={`
                w-full text-left px-5 py-4 flex items-center justify-between text-lg
                text-neutral-700 dark:text-neutral-300
                hover:bg-neutral-100 dark:hover:bg-neutral-700/50
                transition-colors duration-150
                ${!selected ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 font-medium' : ''}
              `}
            >
              <span>Show All</span>
              {!selected && <RiCheckLine className="text-primary-500 text-xl" />}
            </button>
            
            {dataStructures.map((ds) => (
              <button
                key={ds}
                onClick={() => handleSelect(ds)}
                className={`
                  w-full text-left px-5 py-4 flex items-center justify-between text-lg
                  text-neutral-700 dark:text-neutral-300
                  hover:bg-neutral-100 dark:hover:bg-neutral-700/50
                  transition-colors duration-150
                  ${selected === ds ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 font-medium' : ''}
                `}
              >
                <span>{ds}</span>
                {selected === ds && <RiCheckLine className="text-primary-500 text-xl" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

export default FilterDropDown;
