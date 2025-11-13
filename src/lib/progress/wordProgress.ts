import type { WordProgress, MasteryLevel } from '@/types';
import { storage } from '@/lib/storage';
import { MASTERY_THRESHOLDS } from '@/constants/words';

const WORD_PROGRESS_KEY = 'user.wordProgress';

/**
 * Get all word progress data
 */
export const getAllWordProgress = (): WordProgress[] => {
  const stored = storage.getString(WORD_PROGRESS_KEY);
  return stored ? JSON.parse(stored) : [];
};

/**
 * Get progress for a specific word
 */
export const getWordProgress = (wordId: string): WordProgress | null => {
  const allProgress = getAllWordProgress();
  return allProgress.find((p) => p.wordId === wordId) || null;
};

/**
 * Calculate mastery level based on attempts and success rate
 */
export const calculateMasteryLevel = (
  attempts: number,
  successRate: number
): MasteryLevel => {
  if (
    attempts >= MASTERY_THRESHOLDS.mastered.minAttempts &&
    successRate >= MASTERY_THRESHOLDS.mastered.minSuccessRate
  ) {
    return 'mastered';
  }

  if (
    attempts >= MASTERY_THRESHOLDS.practicing.minAttempts &&
    successRate >= MASTERY_THRESHOLDS.practicing.minSuccessRate
  ) {
    return 'practicing';
  }

  if (
    attempts >= MASTERY_THRESHOLDS.learning.minAttempts &&
    successRate >= MASTERY_THRESHOLDS.learning.minSuccessRate
  ) {
    return 'learning';
  }

  return 'new';
};

/**
 * Record a word practice attempt
 */
export const recordWordAttempt = (
  wordId: string,
  wasSuccessful: boolean
): WordProgress => {
  const allProgress = getAllWordProgress();
  const existingProgress = allProgress.find((p) => p.wordId === wordId);

  let updatedProgress: WordProgress;

  if (existingProgress) {
    // Update existing progress
    const newAttempts = existingProgress.attempts + 1;
    const newSuccessCount = existingProgress.successCount + (wasSuccessful ? 1 : 0);
    const newSuccessRate = newSuccessCount / newAttempts;

    updatedProgress = {
      ...existingProgress,
      attempts: newAttempts,
      successCount: newSuccessCount,
      successRate: newSuccessRate,
      lastPracticed: new Date(),
      masteryLevel: calculateMasteryLevel(newAttempts, newSuccessRate),
    };

    // Replace in array
    const updatedArray = allProgress.map((p) =>
      p.wordId === wordId ? updatedProgress : p
    );
    storage.set(WORD_PROGRESS_KEY, JSON.stringify(updatedArray));
  } else {
    // Create new progress entry
    updatedProgress = {
      wordId,
      attempts: 1,
      successCount: wasSuccessful ? 1 : 0,
      successRate: wasSuccessful ? 1 : 0,
      lastPracticed: new Date(),
      masteryLevel: 'new',
      firstSeenAt: new Date(),
    };

    allProgress.push(updatedProgress);
    storage.set(WORD_PROGRESS_KEY, JSON.stringify(allProgress));
  }

  return updatedProgress;
};

/**
 * Get words that need practice (not mastered, or haven't been practiced recently)
 */
export const getWordsNeedingPractice = (
  wordIds: string[],
  maxCount: number = 10
): string[] => {
  const allProgress = getAllWordProgress();
  const progressMap = new Map(allProgress.map((p) => [p.wordId, p]));

  // Score each word based on need for practice
  const scored = wordIds.map((wordId) => {
    const progress = progressMap.get(wordId);

    if (!progress) {
      // New words get highest priority
      return { wordId, score: 1000 };
    }

    if (progress.masteryLevel === 'mastered') {
      // Mastered words get low priority
      return { wordId, score: 10 };
    }

    // Calculate recency score (days since last practiced)
    const daysSinceLastPractice = Math.floor(
      (Date.now() - new Date(progress.lastPracticed).getTime()) / (1000 * 60 * 60 * 24)
    );

    // Higher score = needs more practice
    // Factors: low success rate + time since practice + not mastered
    const successPenalty = (1 - progress.successRate) * 100;
    const recencyBonus = daysSinceLastPractice * 10;
    const masteryBonus =
      progress.masteryLevel === 'new' ? 50 :
      progress.masteryLevel === 'learning' ? 30 :
      20;

    return {
      wordId,
      score: successPenalty + recencyBonus + masteryBonus,
    };
  });

  // Sort by score (highest first) and return top maxCount
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, maxCount)
    .map((item) => item.wordId);
};

/**
 * Get word progress statistics
 */
export const getProgressStats = () => {
  const allProgress = getAllWordProgress();

  const stats = {
    totalWords: allProgress.length,
    newWords: allProgress.filter((p) => p.masteryLevel === 'new').length,
    learning: allProgress.filter((p) => p.masteryLevel === 'learning').length,
    practicing: allProgress.filter((p) => p.masteryLevel === 'practicing').length,
    mastered: allProgress.filter((p) => p.masteryLevel === 'mastered').length,
    totalAttempts: allProgress.reduce((sum, p) => sum + p.attempts, 0),
    averageSuccessRate:
      allProgress.length > 0
        ? allProgress.reduce((sum, p) => sum + p.successRate, 0) / allProgress.length
        : 0,
  };

  return stats;
};

/**
 * Reset progress for a word (useful for testing)
 */
export const resetWordProgress = (wordId: string): void => {
  const allProgress = getAllWordProgress();
  const updatedArray = allProgress.filter((p) => p.wordId !== wordId);
  storage.set(WORD_PROGRESS_KEY, JSON.stringify(updatedArray));
};

/**
 * Reset all progress (useful for testing)
 */
export const resetAllProgress = (): void => {
  storage.set(WORD_PROGRESS_KEY, JSON.stringify([]));
};
