// Common TypeScript type definitions

// Export word-related types from dedicated file
export * from './word.types';

// Import types needed for interfaces below
import type { WordProgress } from './word.types';

export interface ChildProfile {
  id: string;
  name: string;
  age: number;
  dateOfBirth: Date;
  avatarConfig?: AvatarCustomization;
  currentLevel: number;
  focusAreas: string[];
  language: string;
  createdAt: Date;
  lastActiveAt: Date;
}

export interface AvatarCustomization {
  skinTone: string;
  hairStyle: string;
  hairColor: string;
  accessories: string[];
}

export interface UserProgress {
  userId: string;
  wordsLearned: WordProgress[];
  phonemesMastered: PhonemeProgress[];
  activitiesCompleted: ActivityCompletion[];
  totalStars: number;
  currentStreak: number;
  achievements: Achievement[];
}

export interface PhonemeProgress {
  phoneme: string;
  accuracy: number;
  practiceCount: number;
}

export interface ActivityCompletion {
  activityId: string;
  completedAt: Date;
  starsEarned: number;
  timeSpent: number;
}

export interface Achievement {
  id: string;
  type: string;
  unlockedAt: Date;
  title: string;
  description: string;
}
