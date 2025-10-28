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