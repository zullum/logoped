import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, ImageBackground, Image, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useTranslation } from '@/hooks/useTranslation';
import { useRewards } from '@/hooks/useRewards';
import { WordCard, ImageSlider, CategorySlider } from '@/components/kid/picture-cards';
import { SubtleRewardDisplay, CelebrationModal } from '@/components/kid';
import { REWARD_AMOUNTS } from '@/constants/rewards';
import type { WordCategory, Word } from '@/types';
import { ASSETS, CATEGORY_LIST } from './assets';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  runOnJS,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;

export default function PictureCardsScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const params = useLocalSearchParams<{ category?: string }>();

  // --- State ---
  const [selectedCategory, setSelectedCategory] = useState<string>(params.category || 'animals');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [sessionStarsEarned, setSessionStarsEarned] = useState(0);
  const { awardStarsSilent, celebration, clearCelebration, updateStreak } = useRewards();
  const [showSubtleReward, setShowSubtleReward] = useState(false);
  const [subtleRewardStars, setSubtleRewardStars] = useState(0);
  const [subtleRewardImage, setSubtleRewardImage] = useState<string | number | undefined>(undefined);

  // --- Animation ---
  const translateX = useSharedValue(0);
  const cardOpacity = useSharedValue(1);
  const scale = useSharedValue(1);

  // --- Data & Logic ---
  const currentCategoryAssets = ASSETS[selectedCategory];
  const currentAssetItem = currentCategoryAssets?.items[currentWordIndex];

  // Helper to map asset to Word type
  const mapAssetToWord = (item: { id: string; image: any }, category: string): Word => {
    const text = item.id.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    return {
      id: item.id,
      text: text,
      translations: { en: text, es: text }, // Placeholder translations
      phonetic: '',
      syllableCount: 1,
      category: category as WordCategory,
      difficulty: 1,
      imageUrl: item.image,
      audioUrl: { en: '', es: '' }, // No audio for now
    };
  };

  const currentWord = currentAssetItem ? mapAssetToWord(currentAssetItem, selectedCategory) : null;

  const getNextCategory = (): string | null => {
    const currentIndex = CATEGORY_LIST.indexOf(selectedCategory);
    return currentIndex < CATEGORY_LIST.length - 1 ? CATEGORY_LIST[currentIndex + 1] : null;
  };

  // Reset animations when index changes
  useEffect(() => {
    translateX.value = 0;
    cardOpacity.value = 0;
    scale.value = 0.8;
    
    cardOpacity.value = withTiming(1, { duration: 200 });
    scale.value = withSpring(1);
  }, [currentWordIndex, selectedCategory]);

  const goToNextWord = () => {
    if (currentWordIndex < currentCategoryAssets.items.length - 1) {
      setCurrentWordIndex(prev => prev + 1);
    } else {
      handleNextCategory();
    }
  };

  const goToPrevWord = () => {
    if (currentWordIndex > 0) {
      setCurrentWordIndex(prev => prev - 1);
    } else {
      translateX.value = withSpring(0);
    }
  };

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
    })
    .onEnd((event) => {
      if (event.translationX < -SWIPE_THRESHOLD) {
        // Swipe Left -> Next
        translateX.value = withTiming(-SCREEN_WIDTH, { duration: 200 }, () => {
          runOnJS(goToNextWord)();
        });
      } else if (event.translationX > SWIPE_THRESHOLD) {
        // Swipe Right -> Prev
        if (currentWordIndex > 0) {
          translateX.value = withTiming(SCREEN_WIDTH, { duration: 200 }, () => {
            runOnJS(goToPrevWord)();
          });
        } else {
          translateX.value = withSpring(0);
        }
      } else {
        translateX.value = withSpring(0);
      }
    });

  const animatedCardStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { rotateZ: `${interpolate(translateX.value, [-SCREEN_WIDTH, 0, SCREEN_WIDTH], [-15, 0, 15], Extrapolation.CLAMP)}deg` },
      { scale: scale.value }
    ],
    opacity: cardOpacity.value,
  }));

  const handleWordTap = async (word: Word) => {
    // await recordAttempt(word.id, true); // Disabled for now as we don't have real word IDs in DB
    awardStarsSilent(REWARD_AMOUNTS.WORD_LEARNED, `Practiced word: ${word.text}`, 'picture-cards');
    setSessionStarsEarned(prev => prev + REWARD_AMOUNTS.WORD_LEARNED);
    setSubtleRewardStars(REWARD_AMOUNTS.WORD_LEARNED);
    setSubtleRewardImage(word.imageUrl);
    setShowSubtleReward(true);
    setTimeout(() => setShowSubtleReward(false), 2500);
  };

  const handleSliderSelect = (index: number) => {
    if (index !== currentWordIndex) {
      setCurrentWordIndex(index);
    }
  };

  const handleNextCategory = () => {
    const nextCat = getNextCategory();
    if (nextCat) {
      setSelectedCategory(nextCat);
      setCurrentWordIndex(0); // Reset to first word
    } else {
      // End of all categories
    }
  };

  const handleCategoryChange = (category: WordCategory) => {
    setSelectedCategory(category);
    setCurrentWordIndex(0);
  };

  useEffect(() => {
    updateStreak();
  }, [updateStreak]);

  if (!currentCategoryAssets) {
    return (
      <View className="flex-1 items-center justify-center bg-primary-50">
        <ActivityIndicator size="large" color="#4A90E2" />
      </View>
    );
  }

  return (
    <ImageBackground 
      source={require('@assets/images/farm_background.jpg')} 
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <SafeAreaView className="flex-1" edges={['top', 'left', 'right']}>
        {/* Header */}
        <View className="px-4 pt-2 pb-2 flex-row items-start">
          <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7} className="mt-2">
            <Image 
              source={require('@assets/images/buttons/back_button.webp')} 
              style={{ width: 80, height: 80 }} 
              resizeMode="contain" 
            />
          </TouchableOpacity>
          <View className="flex-1 ml-2">
             <CategorySlider selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} />
          </View>
        </View>

        {/* Main Content */}
        <View className="flex-1 items-center justify-center px-4">
          {currentWord ? (
            <GestureDetector gesture={panGesture}>
              <Animated.View style={animatedCardStyle}>
                <WordCard 
                  word={currentWord} 
                  onTap={handleWordTap} 
                  size="large" 
                  showText={false} 
                />
              </Animated.View>
            </GestureDetector>
          ) : (
            <View className="flex-1 items-center justify-center">
              <ActivityIndicator size="small" color="#4A90E2" />
            </View>
          )}
        </View>

        {/* Bottom Slider */}
        <View className="pb-8">
          <ImageSlider 
            items={currentCategoryAssets.items} 
            currentIndex={currentWordIndex} 
            onSelectWord={handleSliderSelect}
            onNextCategory={getNextCategory() ? handleNextCategory : undefined}
          />
        </View>

        {showSubtleReward && (
          <SubtleRewardDisplay
            key={`reward-${Date.now()}`}
            starsEarned={subtleRewardStars}
            imageUrl={subtleRewardImage}
            onComplete={() => setShowSubtleReward(false)}
          />
        )}
        <CelebrationModal visible={!!celebration} celebration={celebration} onClose={clearCelebration} />
      </SafeAreaView>
    </ImageBackground>
  );
}
