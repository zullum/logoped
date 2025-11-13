import {
  mockWords,
  getWordsByCategory,
  getWordsByDifficulty,
  getWordById,
  getRandomWords as getRandomWordsFromMock,
  getWordsBySearch,
  getAllCategories,
} from '@/data/mockWords';
import type { Word, WordFilters, WordCategory, DifficultyLevel } from '@/types';

// Simulate network delay
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Fetch words with optional filters.
 * In a real app, this would make an API call.
 */
export const fetchWords = async (filters?: WordFilters): Promise<Word[]> => {
  await sleep(300); // Simulate network latency

  if (!filters || Object.keys(filters).length === 0) {
    return mockWords;
  }

  return mockWords.filter((word) => {
    if (filters.category && word.category !== filters.category) {
      return false;
    }
    if (filters.difficulty && word.difficulty !== filters.difficulty) {
      return false;
    }
    if (filters.syllableCount && word.syllableCount !== filters.syllableCount) {
      return false;
    }
    if (filters.isLearned !== undefined) {
      // This would require joining with user progress data
      // For now, we'll ignore this filter
    }
    return true;
  });
};

/**
 * Fetch words by a specific category.
 */
export const fetchWordsByCategory = async (category: WordCategory): Promise<Word[]> => {
  await sleep(200);
  return getWordsByCategory(category);
};

/**
 * Fetch words by a specific difficulty level.
 */
export const fetchWordsByDifficulty = async (difficulty: DifficultyLevel): Promise<Word[]> => {
  await sleep(200);
  return getWordsByDifficulty(difficulty);
};

/**
 * Fetch a single word by its ID.
 */
export const fetchWordById = async (id: string): Promise<Word | undefined> => {
  await sleep(100);
  return getWordById(id);
};

/**
 * Fetch a list of random words.
 */
export const fetchRandomWords = async (
  count: number,
  category?: WordCategory,
  difficulty?: DifficultyLevel
): Promise<Word[]> => {
  await sleep(250);
  return getRandomWordsFromMock(count, category, difficulty);
};

/**
 * Search for words matching a query.
 */
export const searchWords = async (query: string): Promise<Word[]> => {
  await sleep(150);
  return getWordsBySearch(query);
};

/**
 * Get all available categories and their word counts.
 */
export const getCategories = async (): Promise<{ category: WordCategory; count: number }[]> => {
  await sleep(50);
  return getAllCategories();
};