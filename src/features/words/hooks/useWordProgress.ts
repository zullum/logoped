import { useState, useCallback } from 'react';
import type { WordProgress } from '@/types';
import * as wordProgressService from '@/lib/progress/wordProgress';

/**
 * Hook for managing word learning progress
 */
export const useWordProgress = (wordId?: string) => {
  const [progress, setProgress] = useState<WordProgress | null>(() => {
    return wordId ? wordProgressService.getWordProgress(wordId) : null;
  });

  /**
   * Record a practice attempt for the word
   */
  const recordAttempt = useCallback(
    (idOrSuccess: string | boolean, wasSuccessful?: boolean) => {
      // Support two signatures:
      // 1. recordAttempt(wordId, wasSuccessful) - for any word
      // 2. recordAttempt(wasSuccessful) - for the hook's word (backwards compatible)
      let targetWordId: string;
      let success: boolean;

      if (typeof idOrSuccess === 'string') {
        // New signature: recordAttempt(wordId, wasSuccessful)
        targetWordId = idOrSuccess;
        success = wasSuccessful ?? true;
      } else {
        // Old signature: recordAttempt(wasSuccessful)
        if (!wordId) return null;
        targetWordId = wordId;
        success = idOrSuccess;
      }

      const updatedProgress = wordProgressService.recordWordAttempt(
        targetWordId,
        success
      );

      // Update state only if recording for the hook's word
      if (targetWordId === wordId) {
        setProgress(updatedProgress);
      }

      return updatedProgress;
    },
    [wordId]
  );

  /**
   * Get progress for any word
   */
  const getProgress = useCallback((id: string) => {
    return wordProgressService.getWordProgress(id);
  }, []);

  /**
   * Reset progress for this word
   */
  const resetProgress = useCallback(() => {
    if (!wordId) return;

    wordProgressService.resetWordProgress(wordId);
    setProgress(null);
  }, [wordId]);

  /**
   * Refresh progress from storage
   */
  const refreshProgress = useCallback(() => {
    if (!wordId) return;

    const updated = wordProgressService.getWordProgress(wordId);
    setProgress(updated);
  }, [wordId]);

  return {
    progress,
    recordAttempt,
    getProgress,
    resetProgress,
    refreshProgress,
  };
};

/**
 * Hook for getting overall progress statistics
 */
export const useProgressStats = () => {
  const [stats, setStats] = useState(() =>
    wordProgressService.getProgressStats()
  );

  const refresh = useCallback(() => {
    setStats(wordProgressService.getProgressStats());
  }, []);

  return {
    stats,
    refresh,
  };
};

/**
 * Hook for getting words that need practice
 */
export const useWordsNeedingPractice = (
  wordIds: string[],
  maxCount: number = 10
) => {
  const [practiceWords, setPracticeWords] = useState<string[]>(() =>
    wordProgressService.getWordsNeedingPractice(wordIds, maxCount)
  );

  const refresh = useCallback(() => {
    setPracticeWords(
      wordProgressService.getWordsNeedingPractice(wordIds, maxCount)
    );
  }, [wordIds, maxCount]);

  return {
    practiceWords,
    refresh,
  };
};
