import type { WordCategory, WordCategoryInfo } from '@/types';

/**
 * Word category metadata with UI information
 */
export const WORD_CATEGORIES: Record<WordCategory, WordCategoryInfo> = {
  animals: {
    id: 'animals',
    nameKey: 'words.categories.animals',
    iconName: 'paw',
    color: '#4A90E2', // primary blue
    description: 'Learn animal names',
    totalWords: 0, // Will be calculated from actual word data
  },
  food: {
    id: 'food',
    nameKey: 'words.categories.food',
    iconName: 'fast-food',
    color: '#EF476F', // coral
    description: 'Learn food names',
    totalWords: 0,
  },
  family: {
    id: 'family',
    nameKey: 'words.categories.family',
    iconName: 'people',
    color: '#06D6A0', // grass green
    description: 'Learn family members',
    totalWords: 0,
  },
  toys: {
    id: 'toys',
    nameKey: 'words.categories.toys',
    iconName: 'game-controller',
    color: '#FFD166', // sunshine yellow
    description: 'Learn toy names',
    totalWords: 0,
  },
  colors: {
    id: 'colors',
    nameKey: 'words.categories.colors',
    iconName: 'color-palette',
    color: '#9B89B3', // lavender
    description: 'Learn colors',
    totalWords: 0,
  },
  body: {
    id: 'body',
    nameKey: 'words.categories.body',
    iconName: 'body',
    color: '#F6AD55', // warning orange
    description: 'Learn body parts',
    totalWords: 0,
  },
  actions: {
    id: 'actions',
    nameKey: 'words.categories.actions',
    iconName: 'walk',
    color: '#48BB78', // success green
    description: 'Learn action words',
    totalWords: 0,
  },
  objects: {
    id: 'objects',
    nameKey: 'words.categories.objects',
    iconName: 'cube',
    color: '#4299E1', // blue
    description: 'Learn common objects',
    totalWords: 0,
  },
};

/**
 * Get all category IDs
 */
export const getCategoryIds = (): WordCategory[] => {
  return Object.keys(WORD_CATEGORIES) as WordCategory[];
};

/**
 * Get category info by ID
 */
export const getCategoryInfo = (categoryId: WordCategory): WordCategoryInfo => {
  return WORD_CATEGORIES[categoryId];
};

/**
 * Difficulty level metadata
 */
export const DIFFICULTY_LEVELS = {
  1: {
    level: 1,
    name: 'Beginner',
    description: 'Simple 1-syllable words',
    ageRange: '3-4 years',
    color: '#48BB78',
  },
  2: {
    level: 2,
    name: 'Easy',
    description: '1-2 syllable common words',
    ageRange: '4-5 years',
    color: '#4299E1',
  },
  3: {
    level: 3,
    name: 'Intermediate',
    description: '2-3 syllable words',
    ageRange: '5-6 years',
    color: '#FFD166',
  },
  4: {
    level: 4,
    name: 'Advanced',
    description: '3+ syllable words',
    ageRange: '6-7 years',
    color: '#EF476F',
  },
  5: {
    level: 5,
    name: 'Expert',
    description: 'Complex words and phrases',
    ageRange: '7+ years',
    color: '#9B89B3',
  },
} as const;

/**
 * Mastery level thresholds
 */
export const MASTERY_THRESHOLDS = {
  new: { minAttempts: 0, minSuccessRate: 0 },
  learning: { minAttempts: 1, minSuccessRate: 0.3 },
  practicing: { minAttempts: 3, minSuccessRate: 0.6 },
  mastered: { minAttempts: 5, minSuccessRate: 0.85 },
} as const;

/**
 * Star rewards per activity
 */
export const STAR_REWARDS = {
  wordPractice: 1,
  activityCompletion: 5,
  perfectScore: 10,
  dailyStreak: 3,
  categoryCompletion: 20,
} as const;
