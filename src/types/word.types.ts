/**
 * Word Types and Interfaces for Logoped App
 */

export type LanguageCode = "en" | "es";

export type WordCategory =
  | "animals"
  | "body_parts"
  | "clothes"
  | "colors"
  | "electronics"
  | "fantasy_creatures"
  | "food"
  | "furniture"
  | "household_items"
  | "musical_instruments"
  | "nature"
  | "plants"
  | "professions"
  | "school_supplies"
  | "shapes"
  | "sports_equipment"
  | "toys"
  | "vehicles"
  | "weather";

export type MasteryLevel = "new" | "learning" | "practicing" | "mastered";

export type DifficultyLevel = 1 | 2 | 3 | 4 | 5;

/**
 * Core Word interface representing a vocabulary word
 */
export interface Word {
  id: string;
  text: string;
  translations: Record<LanguageCode, string>;
  phonetic: string;
  syllableCount: number;
  category: WordCategory;
  difficulty: DifficultyLevel;
  imageUrl: any; // Changed to support require() for local assets

  audioUrl: Record<LanguageCode, string>;
  animationUrl?: string;
  tags?: string[];
  emoji?: string; // Emoji fallback for when image doesn't load
}

/**
 * User's progress tracking for a specific word
 */
export interface WordProgress {
  wordId: string;
  attempts: number;
  successCount: number;
  successRate: number;
  lastPracticed: Date;
  masteryLevel: MasteryLevel;
  firstSeenAt: Date;
}

/**
 * Category metadata for organizing words
 */
export interface WordCategoryInfo {
  id: WordCategory;
  nameKey: string; // Translation key
  iconName: string;
  color: string;
  description: string;
  totalWords: number;
}

/**
 * Filters for querying words
 */
export interface WordFilters {
  category?: WordCategory;
  difficulty?: DifficultyLevel;
  language?: LanguageCode;
  masteryLevel?: MasteryLevel;
  syllableCount?: number;
  isLearned?: boolean;
  limit?: number;
  offset?: number;
}

/**
 * Word learning session data
 */
export interface WordSession {
  sessionId: string;
  words: Word[];
  category: WordCategory;
  difficulty: DifficultyLevel;
  startedAt: Date;
  completedAt?: Date;
  totalAttempts: number;
  successfulAttempts: number;
  starsEarned: number;
}
