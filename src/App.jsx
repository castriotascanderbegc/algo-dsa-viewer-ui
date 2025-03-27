import React, { useState, useCallback, useRef } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import FilterDropdown from "./components/FilterDropDown";
import FileList from "./components/FileList";
import CodeViewer from "./components/CodeViewer";
import DarkModeToggle from "./components/DarkModeToggle";
import ToastContainer from "./components/Toast";
import useDarkMode from './hooks/useDarkMode';
import { BiCodeBlock } from "react-icons/bi";
import { RiLoader4Line } from "react-icons/ri";
import { v4 as uuidv4 } from 'uuid';

const App = () => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileLoading, setFileLoading] = useState(false);
  const [error, setError] = useState(null);
  const [darkMode, toggleDarkMode] = useDarkMode();
  const filterDropdownRef = useRef(null);
  const [toasts, setToasts] = useState([]);

  const backendURL = "http://localhost:8000";

  // Toast management
  const addToast = (message, variant = 'info', duration = 3000) => {
    const id = uuidv4();
    setToasts(prevToasts => [...prevToasts, { id, message, variant, duration }]);
    return id;
  };

  const removeToast = (id) => {
    setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
  };

  // Search Handler with Error & Loading
  const handleSearch = useCallback(async (query) => {
    if (!query || query.length < 2) {
      setFiles([]);
      return;
    }
    setLoading(true);
    setError(null);
  
    const apiURL = `${backendURL}/search?query=${encodeURIComponent(query)}`;
    
    try {
      const res = await axios.get(apiURL);
      setFiles(res.data);
      if (res.data.length === 0) {
        addToast('No results found for your search.', 'info');
      } else {
        addToast(`Found ${res.data.length} result(s)`, 'success');
      }
    } catch (err) {
      console.error("Error searching files:", err.response || err.message);
      setError("Failed to search files.");
      addToast('Failed to search files. Please try again.', 'error');
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
      if (res.data.length === 0) {
        addToast(`No results found for ${structure}.`, 'info');
      } else {
        addToast(`Found ${res.data.length} result(s) for ${structure}`, 'success');
      }
    } catch (err) {
      console.error("Error filtering files:", err);
      setError("Failed to filter files.");
      addToast('Failed to filter files. Please try again.', 'error');
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
      addToast(`Loaded solution: ${file.name}`, 'success');
      
      // Clear file list and reset filter dropdown after file is selected
      setFiles([]);
      // Reset the filter dropdown if the ref is available
      if (filterDropdownRef.current) {
        filterDropdownRef.current.resetFilter();
      }
    } catch (err) {
      console.error("Error fetching file content:", err);
      setError("Failed to fetch file content.");
      addToast('Failed to load file content. Please try again.', 'error');
    } finally {
      setFileLoading(false);
    }
  };

  // Clear File List when user clicks outside
  const clearFiles = () => setFiles([]);
  
  // Handler for returning to search from code view
  const handleBackToSearch = () => {
    setSelectedFile(null);
    addToast('Returned to search view', 'info');
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 transition-colors duration-300">
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      
      <header className="bg-white dark:bg-neutral-800 shadow-sm border-b border-neutral-200 dark:border-neutral-700 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 md:py-4 flex justify-between items-center">
          <div className="w-14 md:w-16">
            {/* Empty div for alignment - Toast is positioned absolutely */}
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <BiCodeBlock className="text-2xl md:text-3xl text-primary-500" />
            <h1 className="text-lg md:text-xl lg:text-2xl font-semibold text-neutral-900 dark:text-white">
              DSA Problem Viewer
            </h1>
          </div>
          <div className="w-14 md:w-16 flex justify-end">
            <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-10 md:py-12">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-card p-6 mb-8">
            <SearchBar onSearch={handleSearch} />
            <FilterDropdown ref={filterDropdownRef} onFilter={handleFilter} />
            
            {error && (
              <div className="mt-4 p-3 bg-danger-50 dark:bg-danger-700/20 border border-danger-500/20 rounded-lg text-danger-700 dark:text-danger-300 text-sm">
                {error}
              </div>
            )}
            
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <RiLoader4Line className="text-primary-500 text-3xl animate-spin mr-3" />
                <span className="text-neutral-500 dark:text-neutral-400 text-lg font-medium">Searching...</span>
              </div>
            ) : (
              files.length > 0 && (
                <div className="mt-6">
                  <h2 className="text-lg font-medium mb-4 text-neutral-800 dark:text-white flex items-center">
                    <span className="bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 py-1 px-3 rounded-lg mr-2 text-base font-semibold">{files.length}</span>
                    Results
                  </h2>
                  <FileList files={files} onSelect={handleFileSelect} clearFiles={clearFiles} />
                </div>
              )
            )}
          </div>
        </div>
        
        {fileLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative">
              <RiLoader4Line className="text-primary-500 text-5xl animate-spin mb-4" />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-50/80 dark:from-neutral-900/80 to-transparent h-full w-full rounded-full" style={{ mixBlendMode: 'overlay' }}></div>
            </div>
            <span className="text-neutral-700 dark:text-neutral-300 text-lg font-medium">Loading file content...</span>
          </div>
        ) : (
          selectedFile && <CodeViewer file={selectedFile} onBackToSearch={handleBackToSearch} />
        )}
      </main>
    </div>
  );
};

export default App;
