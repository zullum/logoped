export type RewardType = 'star' | 'sticker' | 'achievement' | 'badge';

export type StickerCategory =
  | 'animals'
  | 'stars'
  | 'food'
  | 'emotions'
  | 'special';

export type AchievementType =
  | 'first_word'
  | 'daily_streak'
  | 'word_master'
  | 'activity_complete'
  | 'category_master'
  | 'early_bird'
  | 'night_owl'
  | 'perfectionist';

export interface Sticker {
  id: string;
  name: string;
  category: StickerCategory;
  imageUrl: string;
  description: string;
  unlockRequirement: {
    type: 'stars' | 'words' | 'activities' | 'streak';
    value: number;
  };
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  isUnlocked: boolean;
  unlockedAt?: Date;
}

export interface Achievement {
  id: string;
  type: AchievementType;
  title: string;
  description: string;
  iconName: string;
  rewardStars: number;
  unlockRequirement: {
    metric: string;
    value: number;
  };
  isUnlocked: boolean;
  unlockedAt?: Date;
  progress?: number; // Current progress towards achievement
}

export interface RewardEvent {
  id: string;
  type: RewardType;
  timestamp: Date;
  itemId?: string; // For stickers/achievements
  starsEarned?: number;
  reason: string;
  activityId?: string;
}

export interface RewardState {
  totalStars: number;
  availableStars: number; // Stars not yet spent
  stickersCollected: string[]; // Array of sticker IDs
  achievementsUnlocked: string[]; // Array of achievement IDs
  currentStreak: number;
  longestStreak: number;
  lastRewardDate: Date;
  recentEvents: RewardEvent[];
}

export interface CelebrationData {
  type: RewardType;
  title: string;
  message: string;
  starsEarned?: number;
  sticker?: Sticker;
  achievement?: Achievement;
  animationType: 'confetti' | 'stars' | 'balloons' | 'fireworks';
}
