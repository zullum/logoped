import { createMMKV } from 'react-native-mmkv';

// Create MMKV instance for persistent storage
export const storage = createMMKV({
  id: 'logoped-storage',
});

// Storage keys constants
export const STORAGE_KEYS = {
  // User Progress
  TOTAL_STARS: 'user.totalStars',
  CURRENT_STREAK: 'user.currentStreak',
  WORDS_LEARNED: 'user.wordsLearned',

  // Settings
  LANGUAGE: 'settings.language',
  DIFFICULTY_LEVEL: 'settings.difficultyLevel',
  SOUND_ENABLED: 'settings.soundEnabled',
  HAPTICS_ENABLED: 'settings.hapticsEnabled',

  // Avatar
  AVATAR_CONFIG: 'avatar.config',

  // Activity Progress
  LAST_ACTIVITY_DATE: 'activity.lastDate',
  DAILY_GOAL_COMPLETED: 'activity.dailyGoalCompleted',
} as const;

// Utility functions for common operations
export const storageUtils = {
  // Get a value with type safety
  get: <T>(key: string, defaultValue?: T): T | undefined => {
    const value = storage.getString(key);
    if (value === undefined) return defaultValue;
    try {
      return JSON.parse(value) as T;
    } catch {
      return value as T;
    }
  },

  // Set a value
  set: <T>(key: string, value: T): void => {
    storage.set(key, JSON.stringify(value));
  },

  // Get number
  getNumber: (key: string, defaultValue?: number): number | undefined => {
    return storage.getNumber(key) ?? defaultValue;
  },

  // Set number
  setNumber: (key: string, value: number): void => {
    storage.set(key, value);
  },

  // Get boolean
  getBoolean: (key: string, defaultValue?: boolean): boolean | undefined => {
    return storage.getBoolean(key) ?? defaultValue;
  },

  // Set boolean
  setBoolean: (key: string, value: boolean): void => {
    storage.set(key, value);
  },

  // Get string
  getString: (key: string, defaultValue?: string): string | undefined => {
    return storage.getString(key) ?? defaultValue;
  },

  // Set string
  setString: (key: string, value: string): void => {
    storage.set(key, value);
  },

  // Delete a key
  delete: (key: string): void => {
    storage.remove(key);
  },

  // Clear all storage (use with caution!)
  clearAll: (): void => {
    storage.clearAll();
  },

  // Check if key exists
  contains: (key: string): boolean => {
    return storage.contains(key);
  },
};
