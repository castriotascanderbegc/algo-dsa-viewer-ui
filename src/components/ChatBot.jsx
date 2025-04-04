import React, { useState } from 'react';
import { getBasicExplanation, getStructuredExplanation } from '../api/ai';
import ReactMarkdown from 'react-markdown';

const LoadingSpinner = () => (
  <div className="flex items-center justify-center">
    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
  </div>
);

const ChatBot = ({ code }) => {
    const [question, setQuestion] = useState('');
    const [response, setResponse] = useState('');
    const [responseType, setResponseType] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleBasicExplanation = async () => {
        setLoading(true);
        setError('');
        setResponse(null);
        setResponseType('markdown');

        try {
            const explanation = await getBasicExplanation(code, question);
            setResponse(explanation);
        } catch (err) {
            setError('An error occurred while fetching the explanation.');
        } finally {
            setLoading(false);
        }
    };

    const handleStructuredExplanation = async () => {
        setLoading(true);
        setError(null);
        setResponse(null)
        setResponseType('structured');

        try {
            const structuredExplanation = await getStructuredExplanation(code, question);
            setResponse(structuredExplanation);
        } catch (err) {
            setError('An error occurred while fetching the explanation.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-6 p-4 border-t border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-2">🤖 Ask the AI about this code solution</h3>
          <textarea
            className="w-full border rounded-lg p-3 dark:bg-gray-700 dark:text-white"
            rows={3}
            placeholder="Enter your question about the code solution..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            disabled={loading}
          />
    
          <div className="flex space-x-2 mt-3">
            <button
              className={`flex-1 bg-blue-500 text-white py-2 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 ${
                loading && responseType === 'markdown' ? 'opacity-75' : ''
              }`}
              disabled={loading || !question.trim()}
              onClick={handleBasicExplanation}
            >
              {loading && responseType === 'markdown' ? (
                <>
                  <LoadingSpinner />
                  <span>Processing...</span>
                </>
              ) : (
                'Simply Ask AI'
              )}
            </button>
    
            <button
              className={`flex-1 bg-green-500 text-white py-2 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 ${
                loading && responseType === 'structured' ? 'opacity-75' : ''
              }`}
              disabled={loading || !question.trim()}
              onClick={handleStructuredExplanation}
            >
              {loading && responseType === 'structured' ? (
                <>
                  <LoadingSpinner />
                  <span>Processing...</span>
                </>
              ) : (
                'Ask AI for a Step-by-Step Response'
              )}
            </button>
          </div>
    
          {error && <div className="text-red-500 mt-3">{error}</div>}
    
          {loading && (
            <div className="mt-4 p-4 border rounded bg-white dark:bg-gray-700 animate-pulse">
              <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/2 mb-4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-2/3"></div>
            </div>
          )}
    
          {response && responseType === 'markdown' && (
            <div className="mt-4 p-4 border rounded bg-white dark:bg-gray-700">
              <ReactMarkdown>{response}</ReactMarkdown>
            </div>
          )}
    
          {response && responseType === 'structured' && (
            <div className="mt-4 p-4 border rounded bg-white dark:bg-gray-700">
              <h4 className="text-lg font-semibold">📌 Summary</h4>
              <p>{response.summary}</p>
    
              <h4 className="text-lg font-semibold mt-4">🧩 Steps</h4>
              <ol className="list-decimal ml-4">
                {response.steps.map((step) => (
                  <li key={step.step_number} className="mt-2">
                    <p>{step.description}</p>
                    {step.code_snippet && (
                      <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded overflow-auto">
                        {step.code_snippet}
                      </pre>
                    )}
                  </li>
                ))}
              </ol>
    
              <h4 className="text-lg font-semibold mt-4">⏳ Complexities</h4>
              <ul className="list-disc ml-4">
                <li><strong>Time Complexity:</strong> {response.time_complexity}</li>
                <li><strong>Space Complexity:</strong> {response.space_complexity}</li>
              </ul>
    
              {response.additional_notes && (
                <>
                  <h4 className="text-lg font-semibold mt-4">📝 Additional Notes</h4>
                  <p>{response.additional_notes}</p>
                </>
              )}
            </div>
          )}
        </div>
      );
    };
    
    export default ChatBot;
    