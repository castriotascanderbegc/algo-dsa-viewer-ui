import React from "react";

const FilterDropDown = ({ onFilter }) => {
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

  return (
    <select
      onChange={(e) => onFilter(e.target.value)}
      className="border p-2 w-full mt-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      <option value="">📁 Filter by Data Structure</option>
      {dataStructures.map((ds) => (
        <option key={ds} value={ds}>
          {ds}
        </option>
      ))}
    </select>
  );
};

export default FilterDropDown;
