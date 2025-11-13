import { storage } from '@/lib/storage/mmkv';
import type {
  RewardState,
  RewardEvent,
  Sticker,
  Achievement,
  CelebrationData,
} from '@/types/reward.types';
import { STICKERS, ACHIEVEMENTS, REWARD_AMOUNTS } from '@/constants/rewards';

const REWARD_STATE_KEY = 'reward_state';

class RewardService {
  private listeners: Set<(state: RewardState) => void> = new Set();

  /**
   * Initialize reward state if it doesn't exist
   */
  private initializeState(): RewardState {
    return {
      totalStars: 0,
      availableStars: 0,
      stickersCollected: [],
      achievementsUnlocked: [],
      currentStreak: 0,
      longestStreak: 0,
      lastRewardDate: new Date(),
      recentEvents: [],
    };
  }

  /**
   * Get current reward state
   */
  getState(): RewardState {
    const stored = storage.getString(REWARD_STATE_KEY);
    if (!stored) {
      const initialState = this.initializeState();
      this.saveState(initialState);
      return initialState;
    }

    try {
      const parsed = JSON.parse(stored);
      // Convert date strings back to Date objects
      return {
        ...parsed,
        lastRewardDate: new Date(parsed.lastRewardDate),
        recentEvents: parsed.recentEvents.map((event: any) => ({
          ...event,
          timestamp: new Date(event.timestamp),
        })),
      };
    } catch (error) {
      console.error('Error parsing reward state:', error);
      return this.initializeState();
    }
  }

  /**
   * Save reward state to storage
   */
  private saveState(state: RewardState): void {
    try {
      storage.set(REWARD_STATE_KEY, JSON.stringify(state));
      this.notifyListeners(state);
    } catch (error) {
      console.error('Error saving reward state:', error);
    }
  }

  /**
   * Add a listener for state changes
   */
  addListener(callback: (state: RewardState) => void): () => void {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  /**
   * Notify all listeners of state change
   */
  private notifyListeners(state: RewardState): void {
    this.listeners.forEach((callback) => callback(state));
  }

  /**
   * Award stars silently (no celebration data returned)
   */
  awardStarsSilent(amount: number, reason: string, activityId?: string): void {
    const state = this.getState();

    // Update star counts
    state.totalStars += amount;
    state.availableStars += amount;

    // Add reward event
    const event: RewardEvent = {
      id: `event_${Date.now()}`,
      type: 'star',
      timestamp: new Date(),
      starsEarned: amount,
      reason,
      activityId,
    };

    state.recentEvents = [event, ...state.recentEvents].slice(0, 50);

    this.saveState(state);

    // Check for unlocks but don't return celebration
    this.checkStickerUnlocks(state);
  }

  /**
   * Award stars for an activity
   */
  awardStars(amount: number, reason: string, activityId?: string, displayStars?: number): CelebrationData {
    const state = this.getState();

    // Update star counts
    state.totalStars += amount;
    state.availableStars += amount;

    // Add reward event
    const event: RewardEvent = {
      id: `event_${Date.now()}`,
      type: 'star',
      timestamp: new Date(),
      starsEarned: amount,
      reason,
      activityId,
    };

    state.recentEvents = [event, ...state.recentEvents].slice(0, 50); // Keep last 50 events

    this.saveState(state);

    // Check for newly unlocked stickers
    const newStickers = this.checkStickerUnlocks(state);
    if (newStickers.length > 0) {
      // Return first new sticker as celebration
      return this.createStickerCelebration(newStickers[0], amount);
    }

    // Return star celebration
    const starsToShow = displayStars ?? amount;
    return {
      type: 'star',
      title: 'Amazing!',
      message: `You earned ${starsToShow} stars!`,
      starsEarned: starsToShow,
      animationType: 'stars',
    };
  }

  /**
   * Check for newly unlocked stickers
   */
  private checkStickerUnlocks(state: RewardState): Sticker[] {
    const newlyUnlocked: Sticker[] = [];

    STICKERS.forEach((stickerTemplate) => {
      // Skip if already unlocked
      if (state.stickersCollected.includes(stickerTemplate.id)) {
        return;
      }

      // Check if requirement is met
      let requirement = 0;
      switch (stickerTemplate.unlockRequirement.type) {
        case 'stars':
          requirement = state.totalStars;
          break;
        case 'words':
          // This will be implemented when we add word tracking
          requirement = 0;
          break;
        case 'activities':
          // This will be implemented when we add activity tracking
          requirement = 0;
          break;
        case 'streak':
          requirement = state.currentStreak;
          break;
      }

      if (requirement >= stickerTemplate.unlockRequirement.value) {
        const unlockedSticker: Sticker = {
          ...stickerTemplate,
          isUnlocked: true,
          unlockedAt: new Date(),
        };
        newlyUnlocked.push(unlockedSticker);
        state.stickersCollected.push(stickerTemplate.id);

        // Add sticker unlock event
        const event: RewardEvent = {
          id: `event_${Date.now()}_sticker`,
          type: 'sticker',
          timestamp: new Date(),
          itemId: stickerTemplate.id,
          reason: 'Sticker unlocked!',
        };
        state.recentEvents = [event, ...state.recentEvents].slice(0, 50);
      }
    });

    if (newlyUnlocked.length > 0) {
      this.saveState(state);
    }

    return newlyUnlocked;
  }

  /**
   * Check for newly unlocked achievements
   */
  checkAchievements(metrics: {
    wordsLearned?: number;
    activitiesCompleted?: number;
    perfectScore?: boolean;
    categoryMastered?: string;
  }): CelebrationData | null {
    const state = this.getState();
    const newlyUnlocked: Achievement[] = [];

    ACHIEVEMENTS.forEach((achievementTemplate) => {
      // Skip if already unlocked
      if (state.achievementsUnlocked.includes(achievementTemplate.id)) {
        return;
      }

      // Check if requirement is met
      let currentValue = 0;
      const metric = achievementTemplate.unlockRequirement.metric;

      if (metric === 'wordsLearned' && metrics.wordsLearned !== undefined) {
        currentValue = metrics.wordsLearned;
      } else if (metric === 'currentStreak') {
        currentValue = state.currentStreak;
      } else if (metric === 'activitiesCompleted' && metrics.activitiesCompleted !== undefined) {
        currentValue = metrics.activitiesCompleted;
      } else if (metric === 'perfectScore' && metrics.perfectScore) {
        currentValue = 1;
      } else if (metric.startsWith('categoryMastered:') && metrics.categoryMastered) {
        const category = metric.split(':')[1];
        currentValue = metrics.categoryMastered === category ? 1 : 0;
      }

      if (currentValue >= achievementTemplate.unlockRequirement.value) {
        const unlockedAchievement: Achievement = {
          ...achievementTemplate,
          isUnlocked: true,
          unlockedAt: new Date(),
          progress: currentValue,
        };
        newlyUnlocked.push(unlockedAchievement);
        state.achievementsUnlocked.push(achievementTemplate.id);

        // Award bonus stars
        state.totalStars += achievementTemplate.rewardStars;
        state.availableStars += achievementTemplate.rewardStars;

        // Add achievement unlock event
        const event: RewardEvent = {
          id: `event_${Date.now()}_achievement`,
          type: 'achievement',
          timestamp: new Date(),
          itemId: achievementTemplate.id,
          starsEarned: achievementTemplate.rewardStars,
          reason: 'Achievement unlocked!',
        };
        state.recentEvents = [event, ...state.recentEvents].slice(0, 50);
      }
    });

    if (newlyUnlocked.length > 0) {
      this.saveState(state);
      return this.createAchievementCelebration(newlyUnlocked[0]);
    }

    return null;
  }

  /**
   * Update streak based on last activity date
   */
  updateStreak(): void {
    const state = this.getState();
    const now = new Date();
    const lastDate = new Date(state.lastRewardDate);

    // Calculate days difference
    const daysDiff = Math.floor(
      (now.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysDiff === 0) {
      // Same day - no change
      return;
    } else if (daysDiff === 1) {
      // Next day - increment streak
      state.currentStreak += 1;
      if (state.currentStreak > state.longestStreak) {
        state.longestStreak = state.currentStreak;
      }
    } else {
      // Missed day(s) - reset streak
      state.currentStreak = 1;
    }

    state.lastRewardDate = now;
    this.saveState(state);

    // Check for streak achievements
    this.checkAchievements({ activitiesCompleted: 0 });
  }

  /**
   * Get all stickers with unlock status
   */
  getAllStickers(): Sticker[] {
    const state = this.getState();
    return STICKERS.map((stickerTemplate) => ({
      ...stickerTemplate,
      isUnlocked: state.stickersCollected.includes(stickerTemplate.id),
      unlockedAt: state.stickersCollected.includes(stickerTemplate.id)
        ? new Date()
        : undefined,
    }));
  }

  /**
   * Get all achievements with unlock status
   */
  getAllAchievements(): Achievement[] {
    const state = this.getState();
    return ACHIEVEMENTS.map((achievementTemplate) => ({
      ...achievementTemplate,
      isUnlocked: state.achievementsUnlocked.includes(achievementTemplate.id),
      unlockedAt: state.achievementsUnlocked.includes(achievementTemplate.id)
        ? new Date()
        : undefined,
    }));
  }

  /**
   * Get recent reward events
   */
  getRecentEvents(limit: number = 10): RewardEvent[] {
    const state = this.getState();
    return state.recentEvents.slice(0, limit);
  }

  /**
   * Create celebration data for sticker unlock
   */
  private createStickerCelebration(
    sticker: Sticker,
    starsEarned: number
  ): CelebrationData {
    return {
      type: 'sticker',
      title: 'New Sticker!',
      message: `You unlocked ${sticker.name}!`,
      starsEarned,
      sticker,
      animationType: 'confetti',
    };
  }

  /**
   * Create celebration data for achievement unlock
   */
  private createAchievementCelebration(achievement: Achievement): CelebrationData {
    return {
      type: 'achievement',
      title: 'Achievement Unlocked!',
      message: achievement.title,
      starsEarned: achievement.rewardStars,
      achievement,
      animationType: 'fireworks',
    };
  }

  /**
   * Reset all rewards (for testing or profile reset)
   */
  reset(): void {
    const initialState = this.initializeState();
    this.saveState(initialState);
  }
}

export const rewardService = new RewardService();
