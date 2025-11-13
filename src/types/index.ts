// Common TypeScript type definitions

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

export interface Word {
  id: string;
  text: string;
  translations: Record<string, string>;
  phonetic: string;
  syllableCount: number;
  category: WordCategory;
  difficulty: 1 | 2 | 3 | 4 | 5;
  imageUrl: string;
  audioUrl: Record<string, string>;
  animationUrl?: string;
}

export type WordCategory =
  | 'animals'
  | 'food'
  | 'family'
  | 'toys'
  | 'colors'
  | 'body'
  | 'actions'
  | 'objects';

export interface UserProgress {
  userId: string;
  wordsLearned: WordProgress[];
  phonemesMastered: PhonemeProgress[];
  activitiesCompleted: ActivityCompletion[];
  totalStars: number;
  currentStreak: number;
  achievements: Achievement[];
}

export interface WordProgress {
  wordId: string;
  attempts: number;
  successRate: number;
  lastPracticed: Date;
  masteryLevel: 'new' | 'learning' | 'practicing' | 'mastered';
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
