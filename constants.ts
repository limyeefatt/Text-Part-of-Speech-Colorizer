import { type PosTag } from './types';

// New high-contrast color palette based on user request:
// - Dark Blue Background -> Light Red Text
// - Light Green Background -> Dark Blue Text
// - Dark Red Background -> Light Green Text
// Other pairings follow a similar high-contrast (dark/light) principle.

export const POS_COLORS: Record<PosTag, string> = {
  // Main pairings
  NOUN: 'text-red-300',         // Light Red
  VERB: 'text-blue-900',        // Dark Blue
  ADJECTIVE: 'text-green-300',      // Light Green
  
  // Other high-contrast pairings
  ADVERB: 'text-yellow-300',    // Light Yellow
  PRONOUN: 'text-indigo-900',     // Dark Indigo
  PREPOSITION: 'text-pink-300',     // Light Pink
  CONJUNCTION: 'text-pink-900',       // Dark Pink
  DETERMINER: 'text-orange-300',    // Light Orange
  OTHER: 'text-slate-800',        // Dark Slate
};

export const POS_BACKGROUND_COLORS: Record<PosTag, string> = {
  // Main pairings
  NOUN: 'bg-blue-900',      // Dark Blue
  VERB: 'bg-green-200',     // Light Green
  ADJECTIVE: 'bg-red-900',      // Dark Red

  // Other high-contrast pairings
  ADVERB: 'bg-purple-900',    // Dark Purple
  PRONOUN: 'bg-orange-200',   // Light Orange
  PREPOSITION: 'bg-teal-900',     // Dark Teal
  CONJUNCTION: 'bg-cyan-200',     // Light Cyan
  DETERMINER: 'bg-indigo-900',  // Dark Indigo
  OTHER: 'bg-slate-200',      // Light Slate
};

/**
 * Maps background color class names to their RGB values for color manipulation.
 */
export const POS_BACKGROUND_RGB: Record<string, { r: number; g: number; b: number }> = {
  'bg-blue-900': { r: 30, g: 58, b: 138 },
  'bg-green-200': { r: 187, g: 247, b: 208 },
  'bg-red-900': { r: 127, g: 29, b: 29 },
  'bg-purple-900': { r: 88, g: 28, b: 135 },
  'bg-orange-200': { r: 254, g: 215, b: 170 },
  'bg-teal-900': { r: 19, g: 78, b: 74 },
  'bg-cyan-200': { r: 165, g: 243, b: 252 },
  'bg-indigo-900': { r: 49, g: 46, b: 129 },
  'bg-slate-200': { r: 226, g: 232, b: 240 },
};


export const POS_DESCRIPTIONS: Record<PosTag, string> = {
  NOUN: 'Nouns (e.g., dog, idea, city)',
  VERB: 'Verbs (e.g., run, thinks, is)',
  ADJECTIVE: 'Adjectives (e.g., big, happy)',
  ADVERB: 'Adverbs (e.g., quickly, very)',
  PRONOUN: 'Pronouns (e.g., he, it, they)',
  PREPOSITION: 'Prepositions (e.g., in, on, at)',
  CONJUNCTION: 'Conjunctions (e.g., and, but)',
  DETERMINER: 'Determiners (e.g., the, a, this)',
  OTHER: 'Other (e.g., punctuation, numbers)',
}