
export interface WordPos {
  word: string;
  pos: PosTag;
}

export type PosTag = 'NOUN' | 'VERB' | 'ADJECTIVE' | 'ADVERB' | 'PRONOUN' | 'PREPOSITION' | 'CONJUNCTION' | 'DETERMINER' | 'OTHER';
