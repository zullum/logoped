/**
 * Phoneme and syllable data for Bubble Pop Phonics activity
 * Organized by difficulty level
 */

export interface PhonemeData {
  text: string;
  category: 'consonant' | 'vowel' | 'syllable' | 'word';
  difficulty: 1 | 2 | 3 | 4;
  color?: string;
}

/**
 * Level 1: Single letter sounds (phonemes)
 * Simple, common sounds for ages 3-4
 */
export const level1Phonemes: PhonemeData[] = [
  // Vowels
  { text: 'a', category: 'vowel', difficulty: 1, color: '#EF476F' },
  { text: 'e', category: 'vowel', difficulty: 1, color: '#EF476F' },
  { text: 'i', category: 'vowel', difficulty: 1, color: '#EF476F' },
  { text: 'o', category: 'vowel', difficulty: 1, color: '#EF476F' },
  { text: 'u', category: 'vowel', difficulty: 1, color: '#EF476F' },

  // Common consonants
  { text: 'b', category: 'consonant', difficulty: 1, color: '#4A90E2' },
  { text: 'c', category: 'consonant', difficulty: 1, color: '#4A90E2' },
  { text: 'd', category: 'consonant', difficulty: 1, color: '#4A90E2' },
  { text: 'f', category: 'consonant', difficulty: 1, color: '#4A90E2' },
  { text: 'g', category: 'consonant', difficulty: 1, color: '#4A90E2' },
  { text: 'h', category: 'consonant', difficulty: 1, color: '#4A90E2' },
  { text: 'j', category: 'consonant', difficulty: 1, color: '#4A90E2' },
  { text: 'k', category: 'consonant', difficulty: 1, color: '#4A90E2' },
  { text: 'l', category: 'consonant', difficulty: 1, color: '#4A90E2' },
  { text: 'm', category: 'consonant', difficulty: 1, color: '#4A90E2' },
  { text: 'n', category: 'consonant', difficulty: 1, color: '#4A90E2' },
  { text: 'p', category: 'consonant', difficulty: 1, color: '#4A90E2' },
  { text: 'r', category: 'consonant', difficulty: 1, color: '#4A90E2' },
  { text: 's', category: 'consonant', difficulty: 1, color: '#4A90E2' },
  { text: 't', category: 'consonant', difficulty: 1, color: '#4A90E2' },
];

/**
 * Level 2: Simple syllables
 * Two-letter combinations for ages 4-5
 */
export const level2Syllables: PhonemeData[] = [
  // CV (Consonant-Vowel) syllables
  { text: 'ba', category: 'syllable', difficulty: 2, color: '#06D6A0' },
  { text: 'be', category: 'syllable', difficulty: 2, color: '#06D6A0' },
  { text: 'bi', category: 'syllable', difficulty: 2, color: '#06D6A0' },
  { text: 'bo', category: 'syllable', difficulty: 2, color: '#06D6A0' },
  { text: 'bu', category: 'syllable', difficulty: 2, color: '#06D6A0' },

  { text: 'ca', category: 'syllable', difficulty: 2, color: '#06D6A0' },
  { text: 'da', category: 'syllable', difficulty: 2, color: '#06D6A0' },
  { text: 'fa', category: 'syllable', difficulty: 2, color: '#06D6A0' },
  { text: 'ga', category: 'syllable', difficulty: 2, color: '#06D6A0' },
  { text: 'ha', category: 'syllable', difficulty: 2, color: '#06D6A0' },

  { text: 'la', category: 'syllable', difficulty: 2, color: '#06D6A0' },
  { text: 'ma', category: 'syllable', difficulty: 2, color: '#06D6A0' },
  { text: 'na', category: 'syllable', difficulty: 2, color: '#06D6A0' },
  { text: 'pa', category: 'syllable', difficulty: 2, color: '#06D6A0' },
  { text: 'ra', category: 'syllable', difficulty: 2, color: '#06D6A0' },
  { text: 'sa', category: 'syllable', difficulty: 2, color: '#06D6A0' },
  { text: 'ta', category: 'syllable', difficulty: 2, color: '#06D6A0' },
];

/**
 * Level 3: Simple CVC words
 * Three-letter words for ages 5-6
 */
export const level3Words: PhonemeData[] = [
  { text: 'cat', category: 'word', difficulty: 3, color: '#FFD166' },
  { text: 'dog', category: 'word', difficulty: 3, color: '#FFD166' },
  { text: 'bat', category: 'word', difficulty: 3, color: '#FFD166' },
  { text: 'hat', category: 'word', difficulty: 3, color: '#FFD166' },
  { text: 'cup', category: 'word', difficulty: 3, color: '#FFD166' },
  { text: 'sun', category: 'word', difficulty: 3, color: '#FFD166' },
  { text: 'bed', category: 'word', difficulty: 3, color: '#FFD166' },
  { text: 'pen', category: 'word', difficulty: 3, color: '#FFD166' },
  { text: 'box', category: 'word', difficulty: 3, color: '#FFD166' },
  { text: 'fox', category: 'word', difficulty: 3, color: '#FFD166' },
  { text: 'pig', category: 'word', difficulty: 3, color: '#FFD166' },
  { text: 'bug', category: 'word', difficulty: 3, color: '#FFD166' },
  { text: 'egg', category: 'word', difficulty: 3, color: '#FFD166' },
  { text: 'mop', category: 'word', difficulty: 3, color: '#FFD166' },
  { text: 'rug', category: 'word', difficulty: 3, color: '#FFD166' },
];

/**
 * Get phonemes for a specific level
 */
export const getPhonemesByLevel = (level: number): PhonemeData[] => {
  switch (level) {
    case 1:
      return level1Phonemes;
    case 2:
      return level2Syllables;
    case 3:
      return level3Words;
    default:
      return level1Phonemes;
  }
};

/**
 * Get a random subset of phonemes for gameplay
 */
export const getRandomPhonemes = (level: number, count: number): PhonemeData[] => {
  const phonemes = getPhonemesByLevel(level);
  const shuffled = [...phonemes].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, phonemes.length));
};
