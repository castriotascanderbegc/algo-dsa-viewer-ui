import React, { useEffect, useState } from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import useDarkMode from '../hooks/useDarkMode';

// Use a completely fresh approach with a wrapper and an inner component
const CodeViewer = ({ file }) => {
  const [darkMode] = useDarkMode();
  // Use unique keys to force a complete unmount/remount when theme changes
  const [themeKey, setThemeKey] = useState(darkMode ? 'dark' : 'light');
  
  // Update the key whenever darkMode changes to force a complete remount
  useEffect(() => {
    console.log('Dark mode state in CodeViewer changed to:', darkMode);
    setThemeKey(darkMode ? 'dark' : 'light');
  }, [darkMode]);
  
  // Also listen for theme change events
  useEffect(() => {
    const handleThemeChange = (event) => {
      console.log('Theme change event received in CodeViewer:', event.detail);
      setThemeKey(event.detail.isDark ? 'dark' : 'light');
    };
    
    window.addEventListener('themeChange', handleThemeChange);
    return () => {
      window.removeEventListener('themeChange', handleThemeChange);
    };
  }, []);

  // Use the CodeViewerContent with a unique key based on the theme
  // This forces a complete remount when the theme changes
  return <CodeViewerContent key={`theme-${themeKey}-${file?.name || 'empty'}`} file={file} />;
};

// Inner component that actually renders the content
// Completely re-mounted when theme changes via the key in the parent
const CodeViewerContent = ({ file }) => {
  const [darkMode] = useDarkMode();
  const codeStyle = darkMode ? a11yDark : docco;
  
  console.log('CodeViewerContent rendering with theme:', darkMode ? 'dark' : 'light');
  
  return (
    <div className="mt-6 p-4 border rounded-md shadow-sm max-w-[90%] mx-auto" 
         style={{ 
           backgroundColor: darkMode ? '#1e293b' : '#f8f9fa',
           borderColor: darkMode ? '#4a5568' : '#e2e8f0',
           boxShadow: darkMode ? '0 4px 6px rgba(0, 0, 0, 0.3)' : '0 1px 3px rgba(0, 0, 0, 0.1)'
         }}>
      <h2 className="text-xl font-bold mb-4" 
          style={{ color: darkMode ? '#f7fafc' : '#1a202c' }}>
        {file?.name}
      </h2>
      <div className="w-full overflow-auto"
           style={{ 
             backgroundColor: darkMode ? '#171e2e' : '#ffffff',
             padding: '16px',
             borderRadius: '8px'
           }}>
        <SyntaxHighlighter
          language="python"
          style={codeStyle}
          customStyle={{ 
            width: "100%", 
            maxWidth: "100%", 
            whiteSpace: "pre",
            overflowX: "auto",
            background: "transparent",
            fontSize: "14px",
            lineHeight: "1.6",
            padding: 0
          }}
          showLineNumbers={true}
          lineNumberStyle={{
            color: darkMode ? '#4b5563' : '#94a3b8',
            paddingRight: '1em',
            textAlign: 'right',
            minWidth: '40px',
            userSelect: 'none',
            borderRight: darkMode ? '1px solid #374151' : '1px solid #e2e8f0',
            marginRight: '1em'
          }}
          wrapLines={true}
          lineProps={lineNumber => ({
            style: {
              display: 'block',
              backgroundColor: 'transparent'
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