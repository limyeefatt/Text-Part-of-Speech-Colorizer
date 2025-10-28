import React, { useState, useCallback } from 'react';
import { UrlInputForm } from './components/UrlInputForm';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ResultDisplay } from './components/ResultDisplay';
import { ColorKey } from './components/ColorKey';
import { analyzeTextForPOS } from './services/geminiService';
import { type WordPos } from './types';
import { AlertTriangleIcon } from './components/Icons';

// Default text for the user to try.
const defaultText = `React is a free and open-source front-end JavaScript library for building user interfaces based on components. It is maintained by Meta and a community of individual developers and companies.

React can be used to develop single-page, mobile, or server-rendered applications with frameworks like Next.js. Because React is only concerned with the user interface and rendering components to the DOM, React applications often rely on libraries for routing and other client-side functionality.`;


const App: React.FC = () => {
  const [inputText, setInputText] = useState<string>(defaultText);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<{
    originalText: string;
    posData: WordPos[];
  } | null>(null);

  const handleSubmit = useCallback(async (newText: string) => {
    setInputText(newText);
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      if (!newText.trim()) {
        throw new Error("The text input cannot be empty.");
      }

      const posData = await analyzeTextForPOS(newText);
      setAnalysisResult({ originalText: newText, posData });

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Error: ${errorMessage}. Please check your input and try again.`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-2">Text Part-of-Speech Colorizer</h1>
          <p className="text-lg text-gray-600">Analyze any block of text to see it colored by part of speech.</p>
        </header>

        <main>
          <UrlInputForm
            initialText={inputText}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />

          <div className="mt-8">
            {isLoading && <LoadingSpinner />}
            {error && (
              <div className="mt-6 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md flex items-start space-x-3" role="alert">
                 <AlertTriangleIcon className="h-5 w-5 mt-0.5 flex-shrink-0"/>
                 <div>
                    <p className="font-bold">Analysis Failed</p>
                    <p>{error}</p>
                 </div>
              </div>
            )}
            {analysisResult && !isLoading && !error && (
              <div className="animate-fade-in">
                <h2 className="text-2xl font-bold my-4 text-gray-700">Analysis Result</h2>
                <ColorKey />
                <ResultDisplay 
                  text={analysisResult.originalText} 
                  posData={analysisResult.posData} 
                />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;