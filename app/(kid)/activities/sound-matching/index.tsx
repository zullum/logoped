import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, ScrollView, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Typography } from '@/components/ui';
import { useWords } from '@/features/words';
import { useWordProgress } from '@/features/words/hooks/useWordProgress';
import { useRewards } from '@/hooks/useRewards';
import { useAudio } from '@/hooks/useAudio';
import { useTranslation } from '@/hooks/useTranslation';
import { GameHeader } from '@/components/kid/sound-matching/GameHeader';
import { SoundPrompt } from '@/components/kid/sound-matching/SoundPrompt';
import { OptionCard } from '@/components/kid/sound-matching/OptionCard';
import { CelebrationModal } from '@/components/kid/CelebrationModal';
import { FloatingReactionContainer } from '@/components/kid/FloatingReactionContainer';
import type { Word } from '@/types';

interface GameRound {
  targetWord: Word;
  options: Word[];
  selectedWordId: string | null;
  isCorrect: boolean | null;
  attempts: number;
}

const TOTAL_ROUNDS = 5;
const MIN_OPTIONS = 2;
const MAX_OPTIONS = 4;

export default function SoundMatchingGame() {
  const router = useRouter();
  const { language } = useTranslation();
  const { data: words, isLoading } = useWords();
  const { recordAttempt } = useWordProgress();
  const { celebration, clearCelebration, awardStars } = useRewards();

  // Game state
  const [currentRound, setCurrentRound] = useState(1);
  const [score, setScore] = useState(0);
  const [gameRounds, setGameRounds] = useState<GameRound[]>([]);
  const [currentRoundData, setCurrentRoundData] = useState<GameRound | null>(null);
  const [difficulty, setDifficulty] = useState(2); // Start with 2 options
  const [successStreak, setSuccessStreak] = useState(0);
  const [isRoundComplete, setIsRoundComplete] = useState(false);

  // Audio hook
  const audioUri = currentRoundData?.targetWord.audioUrl[language as 'en' | 'es'] || '';
  const { play: playWordAudio, isPlaying } = useAudio(
    `word-${currentRoundData?.targetWord.id}`,
    audioUri,
    { autoPlay: false }
  );

  /**
   * Generate random wrong options that are different from the target
   */
  const generateOptions = useCallback(
    (targetWord: Word, count: number): Word[] => {
      if (!words) return [];

      // Filter out the target word
      const availableWords = words.filter((w: Word) => w.id !== targetWord.id);

      // Shuffle and take `count - 1` words (we'll add target later)
      const shuffled = [...availableWords].sort(() => Math.random() - 0.5);
      const wrongOptions = shuffled.slice(0, count - 1);

      // Combine with target and shuffle again
      const allOptions = [targetWord, ...wrongOptions].sort(
        () => Math.random() - 0.5
      );

      return allOptions;
    },
    [words]
  );

  /**
   * Initialize a new round
   */
  const initializeRound = useCallback(
    (roundNumber: number) => {
      if (!words || words.length < difficulty) {
        console.warn('Not enough words for current difficulty');
        return;
      }

      // Select a random target word
      const targetWord = words[Math.floor(Math.random() * words.length)];

      // Generate options based on current difficulty
      const options = generateOptions(targetWord, difficulty);

      const round: GameRound = {
        targetWord,
        options,
        selectedWordId: null,
        isCorrect: null,
        attempts: 0,
      };

      setCurrentRoundData(round);
      setIsRoundComplete(false);

      // Auto-play audio after a short delay
      setTimeout(() => {
        playWordAudio();
      }, 500);
    },
    [words, difficulty, generateOptions, playWordAudio]
  );

  /**
   * Initialize game on mount
   */
  useEffect(() => {
    if (words && words.length > 0 && currentRound === 1 && !currentRoundData) {
      initializeRound(1);
    }
  }, [words, currentRound, currentRoundData, initializeRound]);

  /**
   * Handle option selection
   */
  const handleOptionSelect = useCallback(
    (selectedWord: Word) => {
      if (!currentRoundData || isRoundComplete) return;

      const isCorrect = selectedWord.id === currentRoundData.targetWord.id;
      const newAttempts = currentRoundData.attempts + 1;

      // Update round data
      const updatedRound: GameRound = {
        ...currentRoundData,
        selectedWordId: selectedWord.id,
        isCorrect,
        attempts: newAttempts,
      };
      setCurrentRoundData(updatedRound);

      // Record attempt for progress tracking
      recordAttempt(currentRoundData.targetWord.id, isCorrect);

      if (isCorrect) {
        // Update success streak
        setSuccessStreak((prev: number) => prev + 1);

        // Award stars (1 star for correct on first try, 0.5 for second try)
        const starsEarned = newAttempts === 1 ? 1 : 0.5;
        setScore((prev: number) => prev + starsEarned);

        // Mark round as complete
        setIsRoundComplete(true);

        // Move to next round after delay
        setTimeout(() => {
          if (currentRound < TOTAL_ROUNDS) {
            setCurrentRound((prev: number) => prev + 1);
            initializeRound(currentRound + 1);
          } else {
            // Game complete!
            completeGame();
          }
        }, 2000);
      } else {
        // Incorrect - reset selection after showing feedback
        setSuccessStreak(0);

        setTimeout(() => {
          setCurrentRoundData({
            ...updatedRound,
            selectedWordId: null,
            isCorrect: null,
          });
        }, 1500);
      }
    },
    [currentRoundData, isRoundComplete, recordAttempt, currentRound, initializeRound]
  );

  /**
   * Complete the game and award final rewards
   */
  const completeGame = useCallback(() => {
    // Award stars based on score
    const finalStars = Math.round(score);
    awardStars(finalStars, 'Completed Sound Matching Game!', 'sound-matching', score);

    // Navigate back after celebration
    setTimeout(() => {
      router.back();
    }, 3000);
  }, [score, awardStars, router]);

  /**
   * Adaptive difficulty adjustment
   */
  useEffect(() => {
    // Increase difficulty if streak is high
    if (successStreak >= 3 && difficulty < MAX_OPTIONS) {
      setDifficulty((prev: number) => Math.min(prev + 1, MAX_OPTIONS));
      setSuccessStreak(0);
    }
  }, [successStreak, difficulty]);

  /**
   * Replay audio
   */
  const handleReplayAudio = useCallback(() => {
    if (!isPlaying) {
      playWordAudio();
    }
  }, [isPlaying, playWordAudio]);

  if (isLoading || !currentRoundData) {
    return (
      <SafeAreaView className="flex-1 bg-background-light items-center justify-center">
        <Typography variant="button" color="medium">
          Loading game...
        </Typography>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background-light">
      <FloatingReactionContainer>
        {/* Header */}
        <GameHeader
          currentRound={currentRound}
          totalRounds={TOTAL_ROUNDS}
          score={score}
          onClose={() => router.back()}
        />

        <ScrollView
          className="flex-1"
          contentContainerClassName="pb-8"
          showsVerticalScrollIndicator={false}
        >
          {/* Sound prompt */}
          <SoundPrompt
            isPlaying={isPlaying}
            onPlay={handleReplayAudio}
            disabled={isRoundComplete}
          />

          {/* Instructions */}
          <Typography variant="body-lg" color="dark" center className="px-6 mb-6">
            Which picture matches the sound?
          </Typography>

          {/* Options grid */}
          <View className="flex-row flex-wrap justify-center px-4">
            {currentRoundData.options.map((word: Word) => (
              <OptionCard
                key={word.id}
                word={word}
                isSelected={word.id === currentRoundData.selectedWordId}
                isCorrect={
                  word.id === currentRoundData.selectedWordId
                    ? currentRoundData.isCorrect
                    : null
                }
                onPress={() => handleOptionSelect(word)}
                disabled={isRoundComplete}
              />
            ))}
          </View>

          {/* Feedback message */}
          {currentRoundData.isCorrect !== null && (
            <View className="items-center mt-8">
              <Typography variant="h4" center className="px-6">
                {currentRoundData.isCorrect
                  ? '🎉 Great job! That\'s correct!'
                  : '💪 Try again! Listen carefully.'}
              </Typography>
            </View>
          )}
        </ScrollView>

        {/* Celebration modal */}
        {celebration && (
          <CelebrationModal
            visible={!!celebration}
            onClose={clearCelebration}
            celebration={celebration}
          />
        )}
      </FloatingReactionContainer>
    </SafeAreaView>
  );
}
