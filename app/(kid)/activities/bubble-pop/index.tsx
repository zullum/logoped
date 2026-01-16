import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Typography } from '@/components/ui';
import { Bubble, PopParticles, GameStats } from '@/components/kid/bubble-pop';
import type { BubbleData } from '@/components/kid/bubble-pop';
import { CelebrationModal } from '@/components/kid/CelebrationModal';
import { useRewards } from '@/hooks/useRewards';
import { useSoundEffect } from '@/hooks/useAudio';
import { getRandomPhonemes } from '@/data/phonemes';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface PopEffect {
  id: string;
  x: number;
  y: number;
  color: string;
}

const BUBBLE_COLORS = ['#4A90E2', '#EF476F', '#06D6A0', '#FFD166', '#9B89B3'];
const SPAWN_INTERVAL_BASE = 2000; // Base spawn rate: 2 seconds
const MAX_BUBBLES_ON_SCREEN = 6;

export default function BubblePopGame() {
  const router = useRouter();
  const { celebration, clearCelebration, awardStars } = useRewards();
  const popSound = useSoundEffect('tap');

  // Game state
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [bubblesPopped, setBubblesPopped] = useState(0);
  const [targetScore, setTargetScore] = useState(20); // Score needed to advance
  const [bubbles, setBubbles] = useState<BubbleData[]>([]);
  const [popEffects, setPopEffects] = useState<PopEffect[]>([]);
  const [isGameActive, setIsGameActive] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const bubbleIdCounter = useRef(0);
  const spawnIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /**
   * Calculate spawn interval based on level (gets faster with difficulty)
   */
  const getSpawnInterval = useCallback(() => {
    return SPAWN_INTERVAL_BASE - (level - 1) * 300; // Faster spawning at higher levels
  }, [level]);

  /**
   * Get bubble size based on level
   */
  const getBubbleSize = useCallback(() => {
    const baseSize = 80;
    const sizeVariation = 20;
    return baseSize + Math.random() * sizeVariation - (level - 1) * 5; // Slightly smaller at higher levels
  }, [level]);

  /**
   * Create a new bubble
   */
  const spawnBubble = useCallback(() => {
    if (bubbles.length >= MAX_BUBBLES_ON_SCREEN) return;

    const phonemes = getRandomPhonemes(level, 1);
    if (phonemes.length === 0) return;

    const phoneme = phonemes[0];
    const size = getBubbleSize();
    const padding = 50;

    const newBubble: BubbleData = {
      id: `bubble-${bubbleIdCounter.current++}`,
      text: phoneme.text,
      color: phoneme.color || BUBBLE_COLORS[Math.floor(Math.random() * BUBBLE_COLORS.length)],
      size,
      x: padding + Math.random() * (SCREEN_WIDTH - padding * 2),
      y: SCREEN_HEIGHT + size, // Start below screen
    };

    setBubbles((prev) => [...prev, newBubble]);
  }, [bubbles.length, level, getBubbleSize]);

  /**
   * Start bubble spawning
   */
  useEffect(() => {
    if (isGameActive && !isPaused) {
      spawnIntervalRef.current = setInterval(() => {
        spawnBubble();
      }, getSpawnInterval());

      return () => {
        if (spawnIntervalRef.current) {
          clearInterval(spawnIntervalRef.current);
        }
      };
    }
  }, [isGameActive, isPaused, spawnBubble, getSpawnInterval]);

  /**
   * Handle bubble pop
   */
  const handleBubblePop = useCallback(
    (bubbleId: string) => {
      const poppedBubble = bubbles.find((b) => b.id === bubbleId);
      if (!poppedBubble) return;

      // Play pop sound
      popSound.play();

      // Remove bubble
      setBubbles((prev) => prev.filter((b) => b.id !== bubbleId));

      // Add pop effect
      setPopEffects((prev) => [
        ...prev,
        {
          id: `effect-${Date.now()}`,
          x: poppedBubble.x,
          y: poppedBubble.y,
          color: poppedBubble.color,
        },
      ]);

      // Update score
      const pointsPerPop = level; // Higher levels = more points
      setScore((prev) => prev + pointsPerPop);
      setBubblesPopped((prev) => prev + 1);
    },
    [bubbles, level, popSound]
  );

  /**
   * Remove pop effect after animation
   */
  const removePopEffect = useCallback((effectId: string) => {
    setPopEffects((prev) => prev.filter((e) => e.id !== effectId));
  }, []);

  /**
   * Clean up bubbles that have floated off screen
   */
  useEffect(() => {
    const cleanupInterval = setInterval(() => {
      setBubbles((prev) => prev.filter((bubble) => bubble.y > -200));
    }, 1000);

    return () => clearInterval(cleanupInterval);
  }, []);

  /**
   * Level up when target score is reached
   */
  useEffect(() => {
    if (score >= targetScore && isGameActive) {
      // Pause game temporarily
      setIsPaused(true);

      // Award stars based on performance
      const starsEarned = level;
      awardStars(starsEarned, `Completed Level ${level}!`, 'bubble-pop', starsEarned);

      // Advance to next level after delay
      setTimeout(() => {
        setLevel((prev) => prev + 1);
        setTargetScore((prev) => prev + 15); // Increase target for next level
        setScore(0); // Reset score (could also carry over)
        setBubblesPopped(0);
        setIsPaused(false);
      }, 3000);
    }
  }, [score, targetScore, level, isGameActive, awardStars]);

  /**
   * End game
   */
  const handleEndGame = useCallback(() => {
    setIsGameActive(false);
    setTimeout(() => {
      router.back();
    }, 500);
  }, [router]);

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-b from-sky-200 to-sky-100" edges={['top']}>
      {/* Stats header */}
      <GameStats
        score={score}
        targetScore={targetScore}
        bubblesPopped={bubblesPopped}
        level={level}
        onClose={handleEndGame}
      />

      {/* Instructions */}
      <View className="px-6 py-3 bg-white/80">
        <Typography variant="body-lg" color="dark" center>
          {level === 1 && '🔤 Pop the letter bubbles!'}
          {level === 2 && '🎵 Pop the syllable bubbles!'}
          {level === 3 && '📝 Pop the word bubbles!'}
        </Typography>
      </View>

      {/* Game area */}
      <View className="flex-1 relative">
        {/* Background pattern (optional) */}
        <View className="absolute inset-0 bg-sky-100" />

        {/* Bubbles */}
        {bubbles.map((bubble) => (
          <Bubble
            key={bubble.id}
            data={bubble}
            onPop={handleBubblePop}
            isPaused={isPaused}
          />
        ))}

        {/* Pop particle effects */}
        {popEffects.map((effect) => (
          <PopParticles
            key={effect.id}
            x={effect.x}
            y={effect.y}
            color={effect.color}
            onComplete={() => removePopEffect(effect.id)}
          />
        ))}

        {/* Pause overlay */}
        {isPaused && (
          <View className="absolute inset-0 bg-black/20 items-center justify-center">
            <View className="bg-white rounded-3xl p-8 shadow-lg">
              <Typography variant="h3" color="primary" center className="mb-2">
                🎉 Level Complete!
              </Typography>
              <Typography variant="body-lg" color="medium" center>
                Get ready for Level {level + 1}...
              </Typography>
            </View>
          </View>
        )}
      </View>

      {/* Celebration modal */}
      {celebration && (
        <CelebrationModal
          visible={!!celebration}
          onClose={clearCelebration}
          celebration={celebration}
        />
      )}
    </SafeAreaView>
  );
}
