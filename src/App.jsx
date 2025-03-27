import React, { useState, useCallback } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import FilterDropdown from "./components/FilterDropDown";
import FileList from "./components/FileList";
import CodeViewer from "./components/CodeViewer";
import DarkModeToggle from "./components/DarkModeToggle";
import useDarkMode from './hooks/useDarkMode';

const App = () => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileLoading, setFileLoading] = useState(false);
  const [error, setError] = useState(null);

  // 1) Use the custom hook here
  const [darkMode, toggleDarkMode] = useDarkMode();

  console.log('Dark Mode in App.jsx is', darkMode); // This should now update

  const backendURL = "http://localhost:8000";

  // Search Handler with Error & Loading
  const handleSearch = useCallback(async (query) => {
    if (!query || query.length < 2) {
      setFiles([]);
      return;
    }
    setLoading(true);
    setError(null);
  
    const apiURL = `${backendURL}/search?query=${encodeURIComponent(query)}`;
    console.log("Making API call to:", apiURL); // Log the API call
  
    try {
      const res = await axios.get(apiURL);
      console.log("Search API Response:", res.data); // Log response data
  
      setFiles(res.data);
    } catch (err) {
      console.error("Error searching files:", err.response || err.message); // Log error details
      setError("Failed to search files.");
    } finally {
      setLoading(false);
    }
  }, [backendURL]);
  
  // Filter Handler
  const handleFilter = async (structure) => {
    if (!structure) {
      setFiles([]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(
        `${backendURL}/filter?dataStructure=${structure}`
      );
      setFiles(res.data);
    } catch (err) {
      console.error("Error filtering files:", err);
      setError("Failed to filter files.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch File Content
  const handleFileSelect = async (file) => {
    setFileLoading(true);
    setError(null);
    try {
      const res = await axios.get(
        `${backendURL}/file/${encodeURIComponent(file.path)}`
      );
      setSelectedFile({ name: file.name, content: res.data.content });
    } catch (err) {
      console.error("Error fetching file content:", err);
      setError("Failed to fetch file content.");
    } finally {
      setFileLoading(false);
    }
  };

  // Clear File List when user clicks outside
  const clearFiles = () => setFiles([]);

  return (
    <div className="p-8 min-h-screen relative" style={{
      backgroundColor: darkMode ? '#1a202c' : 'white',
      color: darkMode ? 'white' : 'black',
      transition: 'background-color 300ms, color 300ms'
    }}> 
      {/* Pass darkMode & toggleDarkMode as props */}
      <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      {/* Main content container with consistent width for UI controls */}
      <div className="max-w-[770px] mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6" style={{
          color: darkMode ? 'white' : 'black'
        }}>
          📂 DSA Problem Viewer
        </h1>

        {/* Search Bar */}
        <SearchBar onSearch={handleSearch} />

        {/* Filter Dropdown */}
        <FilterDropdown onFilter={handleFilter} />

        {/* Error Message */}
        {error && <p className="text-red-500 mt-4">{error}</p>}

        {/* Loading Spinner */}
        {loading && <p className="text-blue-500 mt-4">Loading...</p>}

        {/* File List */}
        {!loading && files.length > 0 && (
          <FileList files={files} onSelect={handleFileSelect} clearFiles={clearFiles} />
        )}

        {/* File loading state */}
        {fileLoading && <p className="text-blue-500 mt-4">Loading file...</p>}
      </div>
      
      {/* Code Viewer - Placed outside the container to allow wider width */}
      {selectedFile && !fileLoading && <CodeViewer file={selectedFile} />}
    </div>
  );
};

export default App;
