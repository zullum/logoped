import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTranslation } from '@/hooks/useTranslation';
import { useRewards } from '@/hooks/useRewards';
import { useWordsByCategory } from '@/features/words/hooks/useWords';
import { useWordProgress } from '@/features/words/hooks/useWordProgress';
import { Button } from '@/components/ui';
import { WordCard, CategorySelector, ProgressIndicator } from '@/components/kid/picture-cards';
import { SubtleRewardDisplay, CelebrationModal } from '@/components/kid';
import { REWARD_AMOUNTS } from '@/constants/rewards';
import type { WordCategory, Word } from '@/types';
import * as GestureHandler from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';

export default function PictureCardsScreen() {
  const { t } = useTranslation();
  const router = useRouter();

  // --- State ---
  const [selectedCategory, setSelectedCategory] = useState<WordCategory>('animals');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [practiceCount, setPracticeCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [sessionStarsEarned, setSessionStarsEarned] = useState(0);
  const { awardStars, awardStarsSilent, celebration, clearCelebration, updateStreak } = useRewards();
  const [showSubtleReward, setShowSubtleReward] = useState(false);
  const [subtleRewardStars, setSubtleRewardStars] = useState(0);

  // --- Animation & Gesture ---
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(1);

  // --- Data & Logic ---
  const categoryOrder: WordCategory[] = ['animals', 'food', 'family', 'toys', 'colors', 'body'];
  const { data: words, isLoading } = useWordsByCategory(selectedCategory);
  const { recordAttempt } = useWordProgress();
  const currentWord = words?.[currentWordIndex];
  const totalWords = words?.length || 0;

  const getNextCategory = (): WordCategory | null => {
    const currentIndex = categoryOrder.indexOf(selectedCategory);
    return currentIndex < categoryOrder.length - 1 ? categoryOrder[currentIndex + 1] : null;
  };

  const changeWord = (newIndex: number) => {
    'worklet';
    opacity.value = withTiming(0, { duration: 150 }, (isFinished) => {
      if (isFinished) {
        runOnJS(setCurrentWordIndex)(newIndex);
        opacity.value = withTiming(1, { duration: 150 });
      }
    });
  };

  const handleNextWord = () => {
    'worklet';
    if (currentWordIndex < totalWords - 1) {
      changeWord(currentWordIndex + 1);
    } else {
      runOnJS(setIsCompleted)(true);
    }
  };

  const handlePreviousWord = () => {
    'worklet';
    if (currentWordIndex > 0) {
      changeWord(currentWordIndex - 1);
    }
  };

  const flingLeft = GestureHandler.Gesture.Fling()
    .direction(GestureHandler.Directions.LEFT)
    .onEnd(handleNextWord);

  const flingRight = GestureHandler.Gesture.Fling()
    .direction(GestureHandler.Directions.RIGHT)
    .onEnd(handlePreviousWord);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    opacity: opacity.value,
  }));

  const handleWordTap = async (word: Word) => {
    await recordAttempt(word.id, true);
    awardStarsSilent(REWARD_AMOUNTS.WORD_LEARNED, `Practiced word: ${word.text}`, 'picture-cards');
    setSessionStarsEarned(prev => prev + REWARD_AMOUNTS.WORD_LEARNED);
    setSubtleRewardStars(REWARD_AMOUNTS.WORD_LEARNED);
    setShowSubtleReward(true);
    setTimeout(() => setShowSubtleReward(false), 2500);
    setPracticeCount(prev => prev + 1);
  };

  const handleRetry = () => {
    setIsCompleted(false);
    setCurrentWordIndex(0);
    setPracticeCount(0);
    setSessionStarsEarned(0);
  };

  const handleNextCategory = () => {
    const nextCat = getNextCategory();
    if (nextCat) {
      setSelectedCategory(nextCat);
    } else {
      router.back();
    }
  };
  
  const handleCategoryChange = (category: WordCategory) => {
    setSelectedCategory(category);
    setCurrentWordIndex(0);
    setPracticeCount(0);
    setIsCompleted(false);
  };

  useEffect(() => {
    updateStreak();
  }, [updateStreak]);

  useEffect(() => {
    setCurrentWordIndex(0);
    setPracticeCount(0);
    setIsCompleted(false);
    setSessionStarsEarned(0);
  }, [selectedCategory]);

  if (isLoading) {
    return <SafeAreaView className="flex-1 bg-background-light items-center justify-center"><ActivityIndicator size="large" color="#4A90E2" /></SafeAreaView>;
  }

  return (
    <SafeAreaView className="flex-1 bg-background-light" edges={['top', 'left', 'right']}>
      <View className="px-lg pt-md pb-sm">
        <View className="flex-row items-center justify-between mb-md">
          <Button variant="ghost" onPress={() => router.back()} className="px-0">{`← ${t('common.back')}`}</Button>
          <Text className="text-2xl text-text-dark" style={{ fontFamily: 'Quicksand_700Bold' }}>{t('kid.activities.pictureCards')}</Text>
          <View className="w-16" />
        </View>
        <CategorySelector selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} />
        <ProgressIndicator current={currentWordIndex + 1} total={totalWords} practiceCount={practiceCount} />
      </View>

      <ScrollView className="flex-1" contentContainerClassName="px-lg pb-lg">
        {isCompleted ? (
          <View className="flex-1 items-center justify-center py-xl">
            <Text className="text-4xl mb-md" style={{ fontFamily: 'Quicksand_700Bold' }}>🎉 {t('kid.pictureCards.allDone')}</Text>
            <Text className="text-xl text-text-medium text-center mb-xl" style={{ fontFamily: 'Nunito_600SemiBold' }}>{t('kid.pictureCards.completedCategory')}</Text>
            <View className="flex-row gap-sm w-full items-center">
              <Pressable onPress={handleRetry} className="items-center justify-center active:opacity-70" accessibilityRole="button" accessibilityLabel={t('kid.pictureCards.retry')} style={{ width: 70, height: 70 }}>
                <Text className="text-5xl" style={{ lineHeight: 56 }}>🔄</Text>
              </Pressable>
              <View className="flex-1">
                <Button onPress={handleNextCategory} variant="primary" size="large">
                  {getNextCategory() ? `${t('kid.pictureCards.nextCategory')} →` : t('kid.pictureCards.goHome')}
                </Button>
              </View>
            </View>
          </View>
        ) : currentWord ? (
          <View className="flex-1 items-center justify-center py-xl">
            <GestureHandler.GestureDetector gesture={GestureHandler.Gesture.Race(flingLeft, flingRight)}>
              <Animated.View style={animatedStyle}>
                <WordCard word={currentWord} onTap={handleWordTap} size="large" />
              </Animated.View>
            </GestureHandler.GestureDetector>
            <View className="mt-xl w-full">
              <Button onPress={handleNextWord} variant="primary" size="large">
                {currentWordIndex === totalWords - 1 ? t('kid.pictureCards.finish') : t('kid.pictureCards.next')}
              </Button>
            </View>
          </View>
        ) : (
          <View className="flex-1 items-center justify-center">
            <Text className="text-lg text-text-medium" style={{ fontFamily: 'Nunito_400Regular' }}>{t('kid.pictureCards.noWords')}</Text>
          </View>
        )}
      </ScrollView>

      {showSubtleReward && <SubtleRewardDisplay key={`reward-${Date.now()}`} starsEarned={subtleRewardStars} onComplete={() => setShowSubtleReward(false)} />}
      <CelebrationModal visible={!!celebration} celebration={celebration} onClose={clearCelebration} />
    </SafeAreaView>
  );
}
