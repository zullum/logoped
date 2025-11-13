import { useState, useEffect, useCallback } from 'react';
import { rewardService } from '@/lib/rewards/rewardService';
import type { RewardState, CelebrationData } from '@/types/reward.types';

/**
 * Hook to access and manage reward system
 */
export const useRewards = () => {
  const [rewardState, setRewardState] = useState<RewardState>(
    rewardService.getState()
  );
  const [celebration, setCelebration] = useState<CelebrationData | null>(null);

  // Subscribe to reward state changes
  useEffect(() => {
    const unsubscribe = rewardService.addListener(setRewardState);
    return unsubscribe;
  }, []);

  /**
   * Award stars to the user (with celebration modal)
   */
  const awardStars = useCallback(
    (amount: number, reason: string, activityId?: string, displayStars?: number) => {
      const celebrationData = rewardService.awardStars(amount, reason, activityId, displayStars);
      setCelebration(celebrationData);
      return celebrationData;
    },
    []
  );

  /**
   * Award stars silently (no celebration modal)
   */
  const awardStarsSilent = useCallback(
    (amount: number, reason: string, activityId?: string) => {
      rewardService.awardStarsSilent(amount, reason, activityId);
    },
    []
  );

  /**
   * Check for achievements based on current metrics
   */
  const checkAchievements = useCallback(
    (metrics: {
      wordsLearned?: number;
      activitiesCompleted?: number;
      perfectScore?: boolean;
      categoryMastered?: string;
    }) => {
      const celebrationData = rewardService.checkAchievements(metrics);
      if (celebrationData) {
        setCelebration(celebrationData);
      }
      return celebrationData;
    },
    []
  );

  /**
   * Update daily streak
   */
  const updateStreak = useCallback(() => {
    rewardService.updateStreak();
  }, []);

  /**
   * Clear current celebration
   */
  const clearCelebration = useCallback(() => {
    setCelebration(null);
  }, []);

  /**
   * Get all stickers
   */
  const getAllStickers = useCallback(() => {
    return rewardService.getAllStickers();
  }, []);

  /**
   * Get all achievements
   */
  const getAllAchievements = useCallback(() => {
    return rewardService.getAllAchievements();
  }, []);

  /**
   * Get recent events
   */
  const getRecentEvents = useCallback((limit?: number) => {
    return rewardService.getRecentEvents(limit);
  }, []);

  return {
    // State
    totalStars: rewardState.totalStars,
    availableStars: rewardState.availableStars,
    currentStreak: rewardState.currentStreak,
    longestStreak: rewardState.longestStreak,
    stickersCollected: rewardState.stickersCollected,
    achievementsUnlocked: rewardState.achievementsUnlocked,

    // Celebration
    celebration,
    clearCelebration,

    // Actions
    awardStars,
    awardStarsSilent,
    checkAchievements,
    updateStreak,
    getAllStickers,
    getAllAchievements,
    getRecentEvents,
  };
};

/**
 * Hook for quick star earning with automatic streak update
 */
export const useStarReward = () => {
  const { awardStars, updateStreak } = useRewards();

  const earnStars = useCallback(
    (amount: number, reason: string, activityId?: string) => {
      updateStreak(); // Update streak when earning stars
      return awardStars(amount, reason, activityId);
    },
    [awardStars, updateStreak]
  );

  return { earnStars };
};
