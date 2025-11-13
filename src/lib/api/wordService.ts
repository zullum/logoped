import type { Word, WordFilters, DifficultyLevel, WordCategory } from '@/types';
import { mockWords, getWordById as getMockWordById } from '@/data/mockWords';

/**
 * Word Service
 * Provides API-like functions for querying word data
 * Currently uses mock data, will be replaced with actual API calls in production
 */

/**
 * Simulates network delay for realistic testing
 */
const simulateDelay = (ms: number = 300): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Fetch all words with optional filters
 */
export const fetchWords = async (filters?: WordFilters): Promise<Word[]> => {
  await simulateDelay();

  let results = [...mockWords];

  // Apply filters
  if (filters?.category) {
    results = results.filter((word) => word.category === filters.category);
  }

  if (filters?.difficulty) {
    results = results.filter((word) => word.difficulty === filters.difficulty);
  }

  if (filters?.language) {
    // Filter by language availability (all our words support en and es)
    results = results.filter((word) =>
      Object.keys(word.translations).includes(filters.language!)
    );
  }

  // Apply pagination
  if (filters?.offset !== undefined) {
    results = results.slice(filters.offset);
  }

  if (filters?.limit !== undefined) {
    results = results.slice(0, filters.limit);
  }

  return results;
};

/**
 * Fetch a single word by ID
 */
export const fetchWordById = async (id: string): Promise<Word | null> => {
  await simulateDelay(200);

  const word = getMockWordById(id);
  return word || null;
};

/**
 * Fetch words by category
 */
export const fetchWordsByCategory = async (
  category: WordCategory
): Promise<Word[]> => {
  return fetchWords({ category });
};

/**
 * Fetch words by difficulty level
 */
export const fetchWordsByDifficulty = async (
  difficulty: DifficultyLevel
): Promise<Word[]> => {
  return fetchWords({ difficulty });
};

/**
 * Fetch random words for practice
 */
export const fetchRandomWords = async (
  count: number = 5,
  category?: WordCategory,
  difficulty?: DifficultyLevel
): Promise<Word[]> => {
  await simulateDelay(200);

  let words = await fetchWords({ category, difficulty });

  // Shuffle using Fisher-Yates algorithm
  const shuffled = [...words];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, count);
};

/**
 * Search words by text
 */
export const searchWords = async (query: string): Promise<Word[]> => {
  await simulateDelay(300);

  const lowerQuery = query.toLowerCase();

  return mockWords.filter((word) =>
    word.text.toLowerCase().includes(lowerQuery) ||
    Object.values(word.translations).some((translation) =>
      translation.toLowerCase().includes(lowerQuery)
    )
  );
};

/**
 * Get total word count (optionally filtered)
 */
export const getWordCount = async (filters?: WordFilters): Promise<number> => {
  const words = await fetchWords(filters);
  return words.length;
};

/**
 * Get available categories with word counts
 */
export const getCategories = async (): Promise<Array<{
  category: WordCategory;
  count: number;
}>> => {
  await simulateDelay(200);

  const categories: WordCategory[] = [
    'animals',
    'food',
    'family',
    'toys',
    'colors',
    'body',
    'actions',
    'objects',
  ];

  const categoriesWithCounts = await Promise.all(
    categories.map(async (category) => ({
      category,
      count: await getWordCount({ category }),
    }))
  );

  // Filter out categories with no words
  return categoriesWithCounts.filter((c) => c.count > 0);
};
