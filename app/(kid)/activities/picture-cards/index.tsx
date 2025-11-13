import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui';
import { WordCard, CategorySelector, ProgressIndicator } from '@/components/kid/picture-cards';
import { CelebrationModal } from '@/components/kid';
import { SubtleRewardDisplay } from '@/components/kid/SubtleRewardDisplay';
import { useWordsByCategory } from '@/features/words';
import { useWordProgress } from '@/features/words/hooks/useWordProgress';
import { useRewards } from '@/hooks/useRewards';
import { REWARD_AMOUNTS } from '@/constants/rewards';
import type { WordCategory, Word } from '@/types';

export default function PictureCardsScreen() {
  const { t } = useTranslation();
  const router = useRouter();

  // Selected category state
  const [selectedCategory, setSelectedCategory] = useState<WordCategory>('animals');

  // Session state
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [practiceCount, setPracticeCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [sessionStarsEarned, setSessionStarsEarned] = useState(0);

  // Reward system
  const { awardStars, awardStarsSilent, celebration, clearCelebration, updateStreak } = useRewards();

  // Subtle reward display state
  const [showSubtleReward, setShowSubtleReward] = useState(false);
  const [subtleRewardStars, setSubtleRewardStars] = useState(0);

  // Category order for "next" navigation
  const categoryOrder: WordCategory[] = ['animals', 'food', 'family', 'toys', 'colors', 'body'];

  const getNextCategory = (): WordCategory | null => {
    const currentIndex = categoryOrder.indexOf(selectedCategory);
    if (currentIndex < categoryOrder.length - 1) {
      return categoryOrder[currentIndex + 1];
    }
    return null; // Last category
  };

  // Fetch words for selected category
  const { data: words, isLoading } = useWordsByCategory(selectedCategory);
  const { recordAttempt, getProgress } = useWordProgress();

  const currentWord = words?.[currentWordIndex];
  const totalWords = words?.length || 0;

  // Handle word tap (plays audio and records progress)
  const handleWordTap = async (word: Word) => {
    // Record successful practice
    await recordAttempt(word.id, true);

    // Award stars silently (persisted but no big modal)
    awardStarsSilent(
      REWARD_AMOUNTS.WORD_LEARNED,
      `Practiced word: ${word.text}`,
      'picture-cards'
    );

    // Track session stars earned
    setSessionStarsEarned(prev => prev + REWARD_AMOUNTS.WORD_LEARNED);

    // Show subtle reward display
    setSubtleRewardStars(REWARD_AMOUNTS.WORD_LEARNED);
    setShowSubtleReward(true);

    // Clear after animation
    setTimeout(() => {
      setShowSubtleReward(false);
    }, 2500);

    setPracticeCount((prev) => prev + 1);
  };

  // Navigate to next word
  const handleNextWord = () => {
    if (currentWordIndex < totalWords - 1) {
      setCurrentWordIndex((prev) => prev + 1);
    } else {
      // Completed all words in category - award completion bonus
      const completionBonus = REWARD_AMOUNTS.CATEGORY_COMPLETED;
      const totalSessionStars = sessionStarsEarned + completionBonus;

      // Award completion bonus but show total session stars in celebration
      awardStars(
        completionBonus,
        `Completed ${selectedCategory} category! You earned ${totalSessionStars} stars this session!`,
        'picture-cards',
        totalSessionStars // Display total session stars in modal
      );

      setIsCompleted(true);
    }
  };

  // Retry current category
  const handleRetry = () => {
    setCurrentWordIndex(0);
    setPracticeCount(0);
    setIsCompleted(false);
  };

  // Go to next category or home
  const handleNextCategory = () => {
    const nextCat = getNextCategory();
    if (nextCat) {
      setSelectedCategory(nextCat);
      setCurrentWordIndex(0);
      setPracticeCount(0);
      setIsCompleted(false);
    } else {
      // Last category - go home
      router.back();
    }
  };

  // Handle category change
  const handleCategoryChange = (category: WordCategory) => {
    setSelectedCategory(category);
    setCurrentWordIndex(0);
    setPracticeCount(0);
    setIsCompleted(false);
  };

  // Update streak when component mounts
  useEffect(() => {
    updateStreak();
  }, [updateStreak]);

  // Reset when category changes
  useEffect(() => {
    setCurrentWordIndex(0);
    setPracticeCount(0);
    setIsCompleted(false);
  }, [selectedCategory]);

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-background-light items-center justify-center">
        <ActivityIndicator size="large" color="#4A90E2" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background-light" edges={['top', 'left', 'right']}>
      {/* Header */}
      <View className="px-lg pt-md pb-sm">
        <View className="flex-row items-center justify-between mb-md">
          <Button
            variant="ghost"
            onPress={() => router.back()}
            className="px-0"
          >
            {`← ${t('common.back')}`}
          </Button>

          <Text
            className="text-2xl text-text-dark"
            style={{ fontFamily: 'Quicksand_700Bold' }}
          >
            {t('kid.activities.pictureCards')}
          </Text>

          <View className="w-16" />
        </View>

        {/* Category Selector */}
        <CategorySelector
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />

        {/* Progress Indicator */}
        <ProgressIndicator
          current={currentWordIndex + 1}
          total={totalWords}
          practiceCount={practiceCount}
        />
      </View>

      {/* Main Content */}
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-lg pb-lg"
      >
        {isCompleted ? (
          // Completion Screen
          <View className="flex-1 items-center justify-center py-xl">
            <Text
              className="text-4xl mb-md"
              style={{ fontFamily: 'Quicksand_700Bold' }}
            >
              🎉 {t('kid.pictureCards.allDone')}
            </Text>

            <Text
              className="text-xl text-text-medium text-center mb-xl"
              style={{ fontFamily: 'Nunito_600SemiBold' }}
            >
              {t('kid.pictureCards.completedCategory')}
            </Text>

            {/* Action Buttons Row */}
            <View className="flex-row gap-sm w-full items-center">
              {/* Retry Button (Icon Only) */}
              <Pressable
                onPress={handleRetry}
                className="items-center justify-center active:opacity-70"
                accessibilityRole="button"
                accessibilityLabel={t('kid.pictureCards.retry')}
                style={{ width: 70, height: 70 }}
              >
                <Text className="text-5xl" style={{ lineHeight: 56 }}>🔄</Text>
              </Pressable>

              {/* Next Category Button (Large) */}
              <View className="flex-1">
                <Button
                  onPress={handleNextCategory}
                  variant="primary"
                  size="large"
                >
                  {getNextCategory()
                    ? `${t('kid.pictureCards.nextCategory')} →`
                    : t('kid.pictureCards.goHome')}
                </Button>
              </View>
            </View>
          </View>
        ) : currentWord ? (
          <View className="flex-1 items-center justify-center py-xl">
            <WordCard
              word={currentWord}
              onTap={handleWordTap}
              size="large"
            />

            {/* Next Button */}
            <View className="mt-xl w-full">
              <Button
                onPress={handleNextWord}
                variant="primary"
                size="large"
              >
                {currentWordIndex === totalWords - 1
                  ? t('kid.pictureCards.finish')
                  : t('kid.pictureCards.next')}
              </Button>
            </View>
          </View>
        ) : (
          <View className="flex-1 items-center justify-center">
            <Text
              className="text-lg text-text-medium"
              style={{ fontFamily: 'Nunito_400Regular' }}
            >
              {t('kid.pictureCards.noWords')}
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Subtle reward for word taps */}
      {showSubtleReward && (
        <SubtleRewardDisplay
          key={`reward-${Date.now()}`} // Unique key to prevent component reuse
          starsEarned={subtleRewardStars}
          onComplete={() => setShowSubtleReward(false)}
        />
      )}

      {/* Big celebration modal for category completion */}
      <CelebrationModal
        visible={!!celebration}
        celebration={celebration}
        onClose={clearCelebration}
      />
    </SafeAreaView>
  );
}
