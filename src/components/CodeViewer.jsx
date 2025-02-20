import React from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

const CodeViewer = ({ file }) => {
  return (
    <div className="mt-6 p-4 border rounded-md bg-gray-50 shadow-sm">
      <h2 className="text-xl font-bold mb-2">{file?.name}</h2>
      <SyntaxHighlighter language="python" style={docco}>
        {file?.content || ""}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeViewer;
