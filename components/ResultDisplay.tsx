import React, { useMemo } from 'react';
import { type WordPos } from '../types';
import { POS_COLORS, POS_BACKGROUND_COLORS, POS_BACKGROUND_RGB } from '../constants';

interface ResultDisplayProps {
  text: string;
  posData: WordPos[];
}

interface PosStyle {
  textColor: string;
  bgColor: string;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ text, posData }) => {

  const wordPosMap = useMemo(() => {
    const map = new Map<string, PosStyle[]>();
    posData.forEach(({ word, pos }) => {
      // Normalize word for mapping: lowercase and trim punctuation that might be attached
      const normalizedWord = word.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g,"");
      if (normalizedWord && !map.has(normalizedWord)) {
        map.set(normalizedWord, []);
      }
      // Push the style object for this instance of the word
      if(normalizedWord) {
        map.get(normalizedWord)?.push({
          textColor: POS_COLORS[pos] || POS_COLORS.OTHER,
          bgColor: POS_BACKGROUND_COLORS[pos] || POS_BACKGROUND_COLORS.OTHER,
        });
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

    const getStyleForWord = (wordPart: string | undefined): PosStyle | null => {
      if (!wordPart) return null;
      const normalizedWord = wordPart.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "");
      if (normalizedWord && wordPosMap.has(normalizedWord)) {
        const styles = wordPosMap.get(normalizedWord)!;
        return styles[0];
      }
      return null;
    };
    
    return parts.map((part, index) => {
      const normalizedPart = part.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g,"");
      
      // Case 1: The part is a word we have POS data for
      if (index % 2 !== 0 && normalizedPart && wordPosMap.has(normalizedPart)) {
        const styles = wordPosMap.get(normalizedPart)!;
        const counter = wordCounters.get(normalizedPart) || 0;
        const style = styles[counter % styles.length];
        wordCounters.set(normalizedPart, counter + 1);

        return (
          <span key={index} className={`${style.textColor} ${style.bgColor} font-medium px-1 rounded`}>
            {part}
          </span>
        );
      }

      // Case 2: The part is a separator or a word without POS data.
      return (
        <React.Fragment key={index}>
          {part.split('').map((char, i) => {
            if (char !== ' ') {
              return char; // Return non-space characters as-is
            }

            // It's a space, determine its color based on the new contrast rule.
            let spaceBgColor = '';

            const getRandomLightColor = () => `rgb(${180 + Math.floor(Math.random() * 76)}, ${180 + Math.floor(Math.random() * 76)}, ${180 + Math.floor(Math.random() * 76)})`;
            const getRandomDarkColor = () => `rgb(${Math.floor(Math.random() * 101)}, ${Math.floor(Math.random() * 101)}, ${Math.floor(Math.random() * 101)})`;
            
            const getLuminance = (rgb: {r: number, g: number, b: number} | undefined) => {
              if (!rgb) return null;
              // Simple luminance formula
              return 0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b;
            };

            const isDark = (luminance: number | null) => luminance !== null && luminance < 140;

            const nextWordStyle = getStyleForWord(parts[index + 1]);
            const prevWordStyle = getStyleForWord(parts[index - 1]);

            // Rule 1: If space is between two words, check their backgrounds.
            if (prevWordStyle && nextWordStyle) {
              const prevRgb = POS_BACKGROUND_RGB[prevWordStyle.bgColor as keyof typeof POS_BACKGROUND_RGB];
              const nextRgb = POS_BACKGROUND_RGB[nextWordStyle.bgColor as keyof typeof POS_BACKGROUND_RGB];
              
              const prevLuminance = getLuminance(prevRgb);
              const nextLuminance = getLuminance(nextRgb);

              if (isDark(prevLuminance) && isDark(nextLuminance)) {
                // If both surrounding words are dark, make the space light.
                spaceBgColor = getRandomLightColor();
              } else if (!isDark(prevLuminance) && !isDark(nextLuminance) && prevLuminance !== null && nextLuminance !== null) {
                // If both surrounding words are light, make the space dark.
                spaceBgColor = getRandomDarkColor();
              } else {
                // If mixed (one dark, one light), fallback to the default light color.
                spaceBgColor = getRandomLightColor();
              }
            } else {
              // Rule 2: Fallback for all other cases (start/end of line, isolated space).
              // Default to a light color as requested.
              spaceBgColor = getRandomLightColor();
            }

            return <span key={`${index}-${i}`} style={{ backgroundColor: spaceBgColor }}>{char}</span>;
          })}
        </React.Fragment>
      );
    });
  }, [text, wordPosMap, wordCounters]);

  return (
    <div className="bg-white p-6 sm:p-8 rounded-lg border border-gray-200 shadow-sm text-gray-800 whitespace-pre-wrap leading-relaxed">
      {processedContent}
    </div>
  );
};