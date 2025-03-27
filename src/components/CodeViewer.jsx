import React, { useEffect, useState } from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import useDarkMode from '../hooks/useDarkMode';
import { RiCodeSSlashFill, RiFileCopyLine, RiCheckLine, RiArrowLeftLine } from "react-icons/ri";

// Use a completely fresh approach with a wrapper and an inner component
const CodeViewer = ({ file, onBackToSearch }) => {
  const [darkMode] = useDarkMode();
  // Use unique keys to force a complete unmount/remount when theme changes
  const [themeKey, setThemeKey] = useState(darkMode ? 'dark' : 'light');
  
  // Update the key whenever darkMode changes to force a complete remount
  useEffect(() => {
    setThemeKey(darkMode ? 'dark' : 'light');
  }, [darkMode]);
  
  // Also listen for theme change events
  useEffect(() => {
    const handleThemeChange = (event) => {
      setThemeKey(event.detail.isDark ? 'dark' : 'light');
    };
    
    window.addEventListener('themeChange', handleThemeChange);
    return () => {
      window.removeEventListener('themeChange', handleThemeChange);
    };
  }, []);

  // Use the CodeViewerContent with a unique key based on the theme
  // This forces a complete remount when the theme changes
  return <CodeViewerContent key={`theme-${themeKey}-${file?.name || 'empty'}`} file={file} onBackToSearch={onBackToSearch} />;
};

// Inner component that actually renders the content
// Completely re-mounted when theme changes via the key in the parent
const CodeViewerContent = ({ file, onBackToSearch }) => {
  const [darkMode] = useDarkMode();
  const [copied, setCopied] = useState(false);
  const codeStyle = darkMode ? a11yDark : docco;
  
  const copyToClipboard = () => {
    if (file?.content) {
      navigator.clipboard.writeText(file.content)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch(err => console.error('Failed to copy: ', err));
    }
  };
  
  return (
    <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg border-2 border-neutral-200 dark:border-neutral-700 max-w-5xl mx-auto overflow-hidden">
      <div className="p-5 border-b-2 border-neutral-200 dark:border-neutral-700 flex items-center justify-between bg-neutral-50 dark:bg-neutral-800/80">
        <div className="flex items-center">
          {onBackToSearch && (
            <button 
              onClick={onBackToSearch}
              className="p-2 mr-3 text-neutral-600 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-white rounded-lg hover:bg-neutral-200/70 dark:hover:bg-neutral-700/80 transition-colors shadow-sm"
              aria-label="Back to search"
            >
              <RiArrowLeftLine className="text-2xl" />
            </button>
          )}
          <div className="flex items-center">
            <div className="bg-primary-50 dark:bg-primary-900/20 p-2 rounded-lg mr-3 shadow-sm">
              <RiCodeSSlashFill className="text-primary-500 text-2xl" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
                {file?.name}
              </h2>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Python Solution
              </p>
            </div>
          </div>
        </div>
        <button 
          onClick={copyToClipboard}
          className="p-2 text-neutral-600 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-white rounded-lg hover:bg-neutral-200/70 dark:hover:bg-neutral-700/80 transition-colors shadow-sm"
          aria-label="Copy to clipboard"
        >
          {copied ? <RiCheckLine className="text-success-500 text-2xl" /> : <RiFileCopyLine className="text-2xl" />}
        </button>
      </div>
      
      <div className="overflow-auto">
        <SyntaxHighlighter
          language="python"
          style={codeStyle}
          customStyle={{ 
            margin: 0,
            padding: '1.5rem',
            background: darkMode ? '#1a1e2b' : '#f9fafb',
            fontFamily: "'JetBrains Mono', 'Menlo', 'Monaco', 'Courier New', monospace",
            fontSize: "14px",
            lineHeight: "1.6",
            borderRadius: 0,
          }}
          showLineNumbers={true}
          lineNumberStyle={{
            textAlign: 'right',
            paddingRight: '1em',
            color: darkMode ? '#6b7280' : '#9ca3af',
            borderRight: darkMode ? '1px solid #374151' : '1px solid #e5e7eb',
            marginRight: '1em',
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 400,
            fontSize: "13px",
          }}
          wrapLines={true}
          lineProps={lineNumber => ({
            style: {
              display: 'block',
              backgroundColor: 'transparent',
              ':hover': {
                backgroundColor: darkMode ? 'rgba(55, 65, 81, 0.3)' : 'rgba(243, 244, 246, 0.8)'
              }
            }
          })}
        >
          {file?.content || ""}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CodeViewer;