import React from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

const CodeViewer = ({ file }) => {
  return (
    <div className="mt-6 p-4 border rounded-md bg-gray-50 shadow-sm w-full">
      <h2 className="text-xl font-bold mb-4">{file?.name}</h2>
      <div className="w-full overflow-auto">
        <SyntaxHighlighter
          language="python"
          style={docco}
          customStyle={{ 
            width: "100%", 
            maxWidth: "100%", 
            whiteSpace: "pre",   // preserve original formatting
            overflowX: "auto",   // allow horizontal scrolling
            background: "transparent",
            padding: 0
          }}
        >
          {file?.content || ""}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CodeViewer;