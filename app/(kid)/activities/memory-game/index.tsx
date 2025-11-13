import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MemoryCard } from '@/components/kid/memory-game';
import type { CardData } from '@/components/kid/memory-game';
import { Icon } from '@/components/ui/Icon';
import { StarDisplay } from '@/components/kid/StarDisplay';
import { CelebrationModal } from '@/components/kid/CelebrationModal';
import { useWords } from '@/features/words';
import { useRewards } from '@/hooks/useRewards';
import { useSoundEffect } from '@/hooks/useAudio';
import type { Word } from '@/types';

type GameDifficulty = 'easy' | 'medium' | 'hard';

interface DifficultyConfig {
  pairs: number;
  columns: number;
  rows: number;
  label: string;
}

const DIFFICULTIES: Record<GameDifficulty, DifficultyConfig> = {
  easy: { pairs: 6, columns: 3, rows: 4, label: 'Easy (6 pairs)' },
  medium: { pairs: 8, columns: 4, rows: 4, label: 'Medium (8 pairs)' },
  hard: { pairs: 10, columns: 4, rows: 5, label: 'Hard (10 pairs)' },
};

export default function MemoryMatchingGame() {
  const router = useRouter();
  const { words, isLoading } = useWords();
  const { celebration, clearCelebration, awardStars } = useRewards();
  const flipSound = useSoundEffect('tap');
  const matchSound = useSoundEffect('success');

  // Game state
  const [difficulty, setDifficulty] = useState<GameDifficulty>('easy');
  const [gameStarted, setGameStarted] = useState(false);
  const [cards, setCards] = useState<CardData[]>([]);
  const [flippedCards, setFlippedCards] = useState<string[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [isChecking, setIsChecking] = useState(false);

  /**
   * Generate card pairs from words
   */
  const generateCards = useCallback((selectedWords: Word[]): CardData[] => {
    const cardPairs: CardData[] = [];

    selectedWords.forEach((word, index) => {
      const pairId = `pair-${index}`;

      // Image card
      cardPairs.push({
        id: `${pairId}-image`,
        content: word.text,
        type: 'image',
        pairId,
        imageUrl: word.imageUrl,
      });

      // Word card
      cardPairs.push({
        id: `${pairId}-word`,
        content: word.text,
        type: 'word',
        pairId,
      });
    });

    // Shuffle cards
    return cardPairs.sort(() => Math.random() - 0.5);
  }, []);

  /**
   * Start new game
   */
  const startGame = useCallback(() => {
    if (words.length === 0) return;

    const config = DIFFICULTIES[difficulty];
    const selectedWords = [...words]
      .sort(() => Math.random() - 0.5)
      .slice(0, config.pairs);

    const newCards = generateCards(selectedWords);
    setCards(newCards);
    setFlippedCards([]);
    setMatchedPairs([]);
    setMoves(0);
    setIsChecking(false);
    setGameStarted(true);
  }, [words, difficulty, generateCards]);

  /**
   * Handle card flip
   */
  const handleCardPress = useCallback(
    (card: CardData) => {
      if (isChecking || flippedCards.length >= 2) return;
      if (flippedCards.includes(card.id)) return;
      if (matchedPairs.includes(card.pairId)) return;

      flipSound.play();

      const newFlippedCards = [...flippedCards, card.id];
      setFlippedCards(newFlippedCards);

      // Check for match if two cards are flipped
      if (newFlippedCards.length === 2) {
        setIsChecking(true);
        setMoves((prev) => prev + 1);

        const card1 = cards.find((c) => c.id === newFlippedCards[0]);
        const card2 = cards.find((c) => c.id === newFlippedCards[1]);

        if (card1 && card2 && card1.pairId === card2.pairId) {
          // Match found!
          matchSound.play();
          setMatchedPairs((prev) => [...prev, card1.pairId]);
          setFlippedCards([]);
          setIsChecking(false);
        } else {
          // No match - flip back after delay
          setTimeout(() => {
            setFlippedCards([]);
            setIsChecking(false);
          }, 1200);
        }
      }
    },
    [flippedCards, matchedPairs, isChecking, cards, flipSound, matchSound]
  );

  /**
   * Check if game is complete
   */
  useEffect(() => {
    if (gameStarted && matchedPairs.length === DIFFICULTIES[difficulty].pairs) {
      // Game complete!
      const maxMoves = DIFFICULTIES[difficulty].pairs * 3;
      const performance = moves / maxMoves;

      // Award stars based on performance
      let starsEarned = 3;
      if (performance > 0.8) starsEarned = 1;
      else if (performance > 0.5) starsEarned = 2;

      setTimeout(() => {
        awardStars(
          starsEarned,
          `Completed Memory Game (${DIFFICULTIES[difficulty].label})!`,
          'memory-game',
          starsEarned
        );
      }, 800);
    }
  }, [matchedPairs, gameStarted, difficulty, moves, awardStars]);

  /**
   * Restart game
   */
  const handleRestart = useCallback(() => {
    setGameStarted(false);
  }, []);

  // Difficulty Selection Screen
  if (!gameStarted) {
    return (
      <SafeAreaView className="flex-1 bg-background-light" edges={['top']}>
        {/* Header */}
        <View className="flex-row items-center justify-between px-6 py-4">
          <Pressable
            onPress={() => router.back()}
            className="w-12 h-12 items-center justify-center bg-white rounded-full shadow-sm"
            accessibilityLabel="Go back"
            accessibilityRole="button"
          >
            <Icon name="arrow-back" size={24} color="#4A90E2" />
          </Pressable>

          <Text
            className="text-2xl text-text-dark"
            style={{ fontFamily: 'Quicksand_700Bold' }}
          >
            🧠 Memory Game
          </Text>

          <View className="w-12" />
        </View>

        {/* Difficulty selection */}
        <View className="flex-1 justify-center px-6">
          <Text
            className="text-xl text-text-dark text-center mb-8"
            style={{ fontFamily: 'Quicksand_600SemiBold' }}
          >
            Choose your difficulty:
          </Text>

          {(Object.keys(DIFFICULTIES) as GameDifficulty[]).map((diff) => (
            <Pressable
              key={diff}
              onPress={() => setDifficulty(diff)}
              className="mb-4"
            >
              <View
                className={`
                  p-6 rounded-2xl border-2
                  ${difficulty === diff ? 'bg-primary-500 border-primary-500' : 'bg-white border-gray-300'}
                `}
              >
                <Text
                  className={`text-lg text-center ${difficulty === diff ? 'text-white' : 'text-text-dark'}`}
                  style={{ fontFamily: 'Quicksand_600SemiBold' }}
                >
                  {DIFFICULTIES[diff].label}
                </Text>
                <Text
                  className={`text-sm text-center mt-1 ${difficulty === diff ? 'text-white/80' : 'text-text-medium'}`}
                  style={{ fontFamily: 'Nunito_400Regular' }}
                >
                  {DIFFICULTIES[diff].columns} × {DIFFICULTIES[diff].rows} grid
                </Text>
              </View>
            </Pressable>
          ))}

          {/* Start button */}
          <Pressable
            onPress={startGame}
            className="mt-8 bg-grass-500 rounded-2xl p-6 shadow-lg"
            disabled={isLoading}
          >
            <Text
              className="text-xl text-white text-center"
              style={{ fontFamily: 'Quicksand_700Bold' }}
            >
              {isLoading ? 'Loading...' : 'Start Game'}
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  // Game Screen
  const config = DIFFICULTIES[difficulty];
  const progress = (matchedPairs.length / config.pairs) * 100;

  return (
    <SafeAreaView className="flex-1 bg-background-light" edges={['top']}>
      {/* Header */}
      <View className="px-6 py-4">
        <View className="flex-row items-center justify-between mb-3">
          <Pressable
            onPress={handleRestart}
            className="w-12 h-12 items-center justify-center bg-white rounded-full shadow-sm"
            accessibilityLabel="Restart game"
            accessibilityRole="button"
          >
            <Icon name="refresh" size={24} color="#4A90E2" />
          </Pressable>

          <View className="items-center">
            <Text
              className="text-sm text-text-medium"
              style={{ fontFamily: 'Nunito_600SemiBold' }}
            >
              Moves: {moves}
            </Text>
          </View>

          <View className="w-12" />
        </View>

        {/* Progress bar */}
        <View className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <View
            className="h-full bg-grass-500 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </View>
      </View>

      {/* Card grid */}
      <FlatList
        data={cards}
        numColumns={config.columns}
        keyExtractor={(item) => item.id}
        contentContainerClassName="px-2 py-4"
        renderItem={({ item }) => (
          <View style={{ width: `${100 / config.columns}%` }}>
            <MemoryCard
              card={item}
              isFlipped={flippedCards.includes(item.id)}
              isMatched={matchedPairs.includes(item.pairId)}
              onPress={() => handleCardPress(item)}
              disabled={isChecking}
            />
          </View>
        )}
      />

      {/* Celebration modal */}
      {celebration && (
        <CelebrationModal
          visible={!!celebration}
          onClose={() => {
            clearCelebration();
            handleRestart();
          }}
          celebration={celebration}
        />
      )}
    </SafeAreaView>
  );
}
