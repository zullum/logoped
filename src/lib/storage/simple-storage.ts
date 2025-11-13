// Simple in-memory storage for Expo Go compatibility
// This will be replaced with MMKV when using development builds

const storage = new Map<string, any>();

export const simpleStorage = {
  getString: (key: string): string | undefined => {
    return storage.get(key);
  },

  getNumber: (key: string): number | undefined => {
    return storage.get(key);
  },

  getBoolean: (key: string): boolean | undefined => {
    return storage.get(key);
  },

  set: (key: string, value: any): void => {
    storage.set(key, value);
  },

  remove: (key: string): void => {
    storage.delete(key);
  },

  clearAll: (): void => {
    storage.clear();
  },

  contains: (key: string): boolean => {
    return storage.has(key);
  },
};

export const STORAGE_KEYS = {
  TOTAL_STARS: 'user.totalStars',
  CURRENT_STREAK: 'user.currentStreak',
  WORDS_LEARNED: 'user.wordsLearned',
  LANGUAGE: 'settings.language',
  DIFFICULTY_LEVEL: 'settings.difficultyLevel',
  SOUND_ENABLED: 'settings.soundEnabled',
  HAPTICS_ENABLED: 'settings.hapticsEnabled',
  AVATAR_CONFIG: 'avatar.config',
  LAST_ACTIVITY_DATE: 'activity.lastDate',
  DAILY_GOAL_COMPLETED: 'activity.dailyGoalCompleted',
} as const;
