import React, { useEffect, useState } from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import useDarkMode from '../hooks/useDarkMode';
import { RiCodeSSlashFill, RiFileCopyLine, RiCheckLine, RiArrowLeftLine } from "react-icons/ri";
import ChatBot from './ChatBot';

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
    <div className="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-md rounded-2xl shadow-xl border border-neutral-200 dark:border-neutral-700 overflow-hidden">
      <div className="p-6 border-b border-neutral-200 dark:border-neutral-700 flex items-center justify-between bg-white/50 dark:bg-neutral-800/50">
        <div className="flex items-center gap-4">
          {onBackToSearch && (
            <button 
              onClick={onBackToSearch}
              className="p-2 text-neutral-600 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-white rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-700/50 transition-all duration-200"
              aria-label="Back to search"
            >
              <RiArrowLeftLine className="text-2xl" />
            </button>
          )}
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 p-2.5 rounded-xl shadow-sm">
              <RiCodeSSlashFill className="text-primary-500 text-2xl" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
                {file?.name}
              </h2>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
                Python Solution
              </p>
            </div>
          </div>
        </div>
        <button 
          onClick={copyToClipboard}
          className="flex items-center gap-2 px-4 py-2 text-neutral-600 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-white rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-700/50 transition-all duration-200"
          aria-label="Copy to clipboard"
        >
          {copied ? (
            <>
              <RiCheckLine className="text-success-500 text-xl" />
              <span className="text-sm font-medium">Copied!</span>
            </>
          ) : (
            <>
              <RiFileCopyLine className="text-xl" />
              <span className="text-sm font-medium">Copy Code</span>
            </>
          )}
        </button>
      </div>
      
      <div className="overflow-auto">
        <SyntaxHighlighter
          language="python"
          style={codeStyle}
          customStyle={{ 
            margin: 0,
            padding: '2rem',
            background: darkMode ? '#1a1e2b' : '#f9fafb',
            fontFamily: "'JetBrains Mono', 'Menlo', 'Monaco', 'Courier New', monospace",
            fontSize: "14px",
            lineHeight: "1.6",
            borderRadius: 0,
          }}
          showLineNumbers={true}
          lineNumberStyle={{
            textAlign: 'right',
            paddingRight: '1.5em',
            color: darkMode ? '#6b7280' : '#9ca3af',
            borderRight: darkMode ? '1px solid #374151' : '1px solid #e5e7eb',
            marginRight: '1.5em',
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
      {/* ChatBot integrated into a Footer */}
      <footer className="mt-8 pt-4 border-t dark:border-gray-700">
        <ChatBot code={file?.content || ""} />
      </footer>
    </div>
  );
};

export default CodeViewer;