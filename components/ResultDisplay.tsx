import React, { useMemo } from 'react';
import { type WordPos } from '../types';
import { POS_COLORS } from '../constants';

interface ResultDisplayProps {
  text: string;
  posData: WordPos[];
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ text, posData }) => {

  const wordPosMap = useMemo(() => {
    const map = new Map<string, string[]>();
    posData.forEach(({ word, pos }) => {
      // Normalize word for mapping: lowercase and trim punctuation that might be attached
      // Gemini can sometimes return words like "components."
      const normalizedWord = word.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g,"");
      if (normalizedWord && !map.has(normalizedWord)) {
        map.set(normalizedWord, []);
      }
      // Push the color class for this instance of the word
      if(normalizedWord) {
        map.get(normalizedWord)?.push(POS_COLORS[pos] || POS_COLORS.OTHER);
      }
    });
    return map;
  }, [posData]);
  
  // A separate map to track the usage count of each word to handle duplicates
  const wordCounters = useMemo(() => new Map<string, number>(), [posData]);

  const processedContent = useMemo(() => {
    wordCounters.clear(); // Reset counters for each render

    // Split text into words and the spaces/punctuation that separate them
    const parts = text.split(/(\b[\w'-]+\b)/);
    
    return parts.map((part, index) => {
      const normalizedPart = part.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g,"");
      
      // Check if the part is a word we have POS data for
      if (normalizedPart && wordPosMap.has(normalizedPart)) {
        const colors = wordPosMap.get(normalizedPart)!;
        const counter = wordCounters.get(normalizedPart) || 0;
        const colorClass = colors[counter % colors.length];
        wordCounters.set(normalizedPart, counter + 1);

        return (
          <span key={index} className={`${colorClass} font-medium`}>
            {part}
          </span>
        );
      }

      // If it's not a word (e.g., space, punctuation, newline), return it as is
      return <React.Fragment key={index}>{part}</React.Fragment>;
    });
  }, [text, wordPosMap, wordCounters]);

  return (
    <div className="bg-white p-6 sm:p-8 rounded-lg border border-gray-200 shadow-sm text-gray-800 whitespace-pre-wrap leading-relaxed">
      {processedContent}
    </div>
  );
};