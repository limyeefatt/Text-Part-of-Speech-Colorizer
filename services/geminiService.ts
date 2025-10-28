
import { GoogleGenAI, Type } from "@google/genai";
import { type WordPos } from '../types';

// FIX: Initialize GoogleGenAI directly with process.env.API_KEY and remove the unnecessary check as per guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      word: {
        type: Type.STRING,
        description: 'The original word from the text.',
      },
      pos: {
        type: Type.STRING,
        description: 'The part of speech tag.',
        enum: ['NOUN', 'VERB', 'ADJECTIVE', 'ADVERB', 'PRONOUN', 'PREPOSITION', 'CONJUNCTION', 'DETERMINER', 'OTHER'],
      },
    },
    required: ["word", "pos"],
  },
};

export const analyzeTextForPOS = async (text: string): Promise<WordPos[]> => {
  try {
    const prompt = `Analyze the following text and provide the part of speech for each word. Return the result as a JSON array where each object has a 'word' and a 'pos' (Part of Speech) key. The POS tags must be one of: NOUN, VERB, ADJECTIVE, ADVERB, PRONOUN, PREPOSITION, CONJUNCTION, DETERMINER, OTHER. Maintain the original word order. Treat punctuation as OTHER. Here is the text: \n\n"${text}"`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const jsonString = response.text;
    const result = JSON.parse(jsonString);
    return result as WordPos[];

  } catch (error) {
    console.error("Error analyzing text with Gemini API:", error);
    if (error instanceof Error) {
        throw new Error(`Gemini API Error: ${error.message}`);
    }
    throw new Error("An unknown error occurred while communicating with the Gemini API.");
  }
};