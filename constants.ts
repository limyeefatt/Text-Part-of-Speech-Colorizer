
import { type PosTag } from './types';

export const POS_COLORS: Record<PosTag, string> = {
  NOUN: 'text-blue-600',
  VERB: 'text-green-600',
  ADJECTIVE: 'text-purple-600',
  ADVERB: 'text-orange-600',
  PRONOUN: 'text-red-600',
  PREPOSITION: 'text-teal-600',
  CONJUNCTION: 'text-pink-600',
  DETERMINER: 'text-yellow-700',
  OTHER: 'text-gray-500',
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
