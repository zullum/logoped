import type { Sticker, Achievement } from '@/types/reward.types';

// Star reward amounts for different activities
export const REWARD_AMOUNTS = {
  WORD_LEARNED: 1,
  ACTIVITY_COMPLETED: 5,
  PERFECT_ROUND: 10,
  DAILY_CHALLENGE: 15,
  CATEGORY_COMPLETED: 20,
  STREAK_MILESTONE: 25,
} as const;

// Sticker unlock milestones
export const STICKER_MILESTONES = {
  FIRST_STAR: 1,
  TEN_STARS: 10,
  FIFTY_STARS: 50,
  HUNDRED_STARS: 100,
  FIVE_WORDS: 5,
  TEN_WORDS: 10,
  TWENTY_WORDS: 20,
  FIFTY_WORDS: 50,
  FIRST_ACTIVITY: 1,
  FIVE_ACTIVITIES: 5,
  TEN_ACTIVITIES: 10,
  THREE_DAY_STREAK: 3,
  WEEK_STREAK: 7,
  MONTH_STREAK: 30,
} as const;

// Predefined stickers (will be expanded with actual images)
export const STICKERS: Omit<Sticker, 'isUnlocked' | 'unlockedAt'>[] = [
  // Common stickers (easy to unlock)
  {
    id: 'sticker_star_1',
    name: 'First Star',
    category: 'stars',
    imageUrl: 'https://placeholder.com/stickers/star_1.png',
    description: 'Your very first star!',
    unlockRequirement: { type: 'stars', value: 1 },
    rarity: 'common',
  },
  {
    id: 'sticker_cat',
    name: 'Happy Cat',
    category: 'animals',
    imageUrl: 'https://placeholder.com/stickers/cat.png',
    description: 'A friendly cat friend',
    unlockRequirement: { type: 'words', value: 5 },
    rarity: 'common',
  },
  {
    id: 'sticker_dog',
    name: 'Playful Pup',
    category: 'animals',
    imageUrl: 'https://placeholder.com/stickers/dog.png',
    description: 'A playful puppy',
    unlockRequirement: { type: 'words', value: 10 },
    rarity: 'common',
  },
  {
    id: 'sticker_happy_face',
    name: 'Happy Face',
    category: 'emotions',
    imageUrl: 'https://placeholder.com/stickers/happy.png',
    description: 'A big happy smile!',
    unlockRequirement: { type: 'activities', value: 1 },
    rarity: 'common',
  },

  // Rare stickers (moderate effort)
  {
    id: 'sticker_unicorn',
    name: 'Magic Unicorn',
    category: 'special',
    imageUrl: 'https://placeholder.com/stickers/unicorn.png',
    description: 'A magical unicorn!',
    unlockRequirement: { type: 'stars', value: 50 },
    rarity: 'rare',
  },
  {
    id: 'sticker_rocket',
    name: 'Rocket Ship',
    category: 'special',
    imageUrl: 'https://placeholder.com/stickers/rocket.png',
    description: 'Blast off to learning!',
    unlockRequirement: { type: 'words', value: 20 },
    rarity: 'rare',
  },
  {
    id: 'sticker_rainbow',
    name: 'Rainbow',
    category: 'special',
    imageUrl: 'https://placeholder.com/stickers/rainbow.png',
    description: 'A beautiful rainbow',
    unlockRequirement: { type: 'streak', value: 7 },
    rarity: 'rare',
  },

  // Epic stickers (significant effort)
  {
    id: 'sticker_crown',
    name: 'Royal Crown',
    category: 'special',
    imageUrl: 'https://placeholder.com/stickers/crown.png',
    description: 'You are royalty!',
    unlockRequirement: { type: 'stars', value: 100 },
    rarity: 'epic',
  },
  {
    id: 'sticker_trophy',
    name: 'Golden Trophy',
    category: 'special',
    imageUrl: 'https://placeholder.com/stickers/trophy.png',
    description: 'Champion learner!',
    unlockRequirement: { type: 'words', value: 50 },
    rarity: 'epic',
  },

  // Legendary stickers (major achievement)
  {
    id: 'sticker_diamond',
    name: 'Diamond Star',
    category: 'special',
    imageUrl: 'https://placeholder.com/stickers/diamond.png',
    description: 'You shine so bright!',
    unlockRequirement: { type: 'stars', value: 500 },
    rarity: 'legendary',
  },
  {
    id: 'sticker_superhero',
    name: 'Super Learner',
    category: 'special',
    imageUrl: 'https://placeholder.com/stickers/superhero.png',
    description: 'You are a learning superhero!',
    unlockRequirement: { type: 'words', value: 100 },
    rarity: 'legendary',
  },
];

// Predefined achievements
export const ACHIEVEMENTS: Omit<Achievement, 'isUnlocked' | 'unlockedAt' | 'progress'>[] = [
  {
    id: 'achievement_first_word',
    type: 'first_word',
    title: 'First Word!',
    description: 'You learned your first word!',
    iconName: 'trophy',
    rewardStars: 5,
    unlockRequirement: { metric: 'wordsLearned', value: 1 },
  },
  {
    id: 'achievement_word_master',
    type: 'word_master',
    title: 'Word Master',
    description: 'You learned 50 words!',
    iconName: 'medal',
    rewardStars: 25,
    unlockRequirement: { metric: 'wordsLearned', value: 50 },
  },
  {
    id: 'achievement_daily_streak_3',
    type: 'daily_streak',
    title: '3 Day Streak',
    description: 'You practiced 3 days in a row!',
    iconName: 'flame',
    rewardStars: 10,
    unlockRequirement: { metric: 'currentStreak', value: 3 },
  },
  {
    id: 'achievement_daily_streak_7',
    type: 'daily_streak',
    title: 'Week Warrior',
    description: 'You practiced for 7 days straight!',
    iconName: 'flame',
    rewardStars: 25,
    unlockRequirement: { metric: 'currentStreak', value: 7 },
  },
  {
    id: 'achievement_daily_streak_30',
    type: 'daily_streak',
    title: 'Month Master',
    description: 'Amazing! 30 days of learning!',
    iconName: 'flame',
    rewardStars: 100,
    unlockRequirement: { metric: 'currentStreak', value: 30 },
  },
  {
    id: 'achievement_activity_complete_1',
    type: 'activity_complete',
    title: 'Activity Star',
    description: 'You completed your first activity!',
    iconName: 'star',
    rewardStars: 5,
    unlockRequirement: { metric: 'activitiesCompleted', value: 1 },
  },
  {
    id: 'achievement_activity_complete_10',
    type: 'activity_complete',
    title: 'Super Student',
    description: 'You completed 10 activities!',
    iconName: 'ribbon',
    rewardStars: 20,
    unlockRequirement: { metric: 'activitiesCompleted', value: 10 },
  },
  {
    id: 'achievement_category_master_animals',
    type: 'category_master',
    title: 'Animal Expert',
    description: 'You mastered all animal words!',
    iconName: 'paw',
    rewardStars: 30,
    unlockRequirement: { metric: 'categoryMastered:animals', value: 1 },
  },
  {
    id: 'achievement_perfectionist',
    type: 'perfectionist',
    title: 'Perfect Practice',
    description: 'You got 100% in an activity!',
    iconName: 'checkmark-circle',
    rewardStars: 15,
    unlockRequirement: { metric: 'perfectScore', value: 1 },
  },
];

// Rarity colors for UI
export const RARITY_COLORS = {
  common: '#A0A0A0', // Gray
  rare: '#4169E1', // Blue
  epic: '#9B59B6', // Purple
  legendary: '#FFD700', // Gold
} as const;

// Animation durations
export const ANIMATION_DURATIONS = {
  STAR_COLLECTION: 2000, // Increased from 1000
  STICKER_UNLOCK: 3000, // Increased from 2000
  ACHIEVEMENT_UNLOCK: 3500, // Increased from 2500
  CONFETTI: 4000, // Increased from 3000
} as const;
