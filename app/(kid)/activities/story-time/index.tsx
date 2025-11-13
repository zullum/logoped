import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, FlatList, Pressable, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { StoryPageView, PageNavigation } from '@/components/kid/story-time';
import { Card } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';
import { CelebrationModal } from '@/components/kid/CelebrationModal';
import { useRewards } from '@/hooks/useRewards';
import { useSoundEffect } from '@/hooks/useAudio';
import { getAllStories } from '@/data/stories';
import type { Story, StoryWord } from '@/types/story.types';

export default function StoryTimeScreen() {
  const router = useRouter();
  const stories = getAllStories();
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [highlightedWordIndex, setHighlightedWordIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { celebration, clearCelebration, awardStars } = useRewards();
  const tapSound = useSoundEffect('tap');

  // Page transition animation
  const pageOpacity = useSharedValue(1);
  const pageTranslateX = useSharedValue(0);

  /**
   * Handle story selection
   */
  const handleStorySelect = useCallback((story: Story) => {
    setSelectedStory(story);
    setCurrentPageIndex(0);
    setHighlightedWordIndex(null);
  }, []);

  /**
   * Close story reader
   */
  const handleCloseStory = useCallback(() => {
    setSelectedStory(null);
    setCurrentPageIndex(0);
    setHighlightedWordIndex(null);
    setIsPlaying(false);
  }, []);

  /**
   * Navigate to previous page
   */
  const handlePreviousPage = useCallback(() => {
    if (currentPageIndex > 0) {
      // Animate page transition
      pageOpacity.value = withTiming(0, { duration: 200 });
      pageTranslateX.value = withTiming(-50, { duration: 200 }, () => {
        setCurrentPageIndex((prev) => prev - 1);
        pageTranslateX.value = 50;
        pageOpacity.value = withTiming(1, { duration: 200 });
        pageTranslateX.value = withTiming(0, { duration: 200 });
      });
    }
  }, [currentPageIndex]);

  /**
   * Navigate to next page
   */
  const handleNextPage = useCallback(() => {
    if (selectedStory && currentPageIndex < selectedStory.pages.length - 1) {
      // Animate page transition
      pageOpacity.value = withTiming(0, { duration: 200 });
      pageTranslateX.value = withTiming(50, { duration: 200 }, () => {
        setCurrentPageIndex((prev) => prev + 1);
        pageTranslateX.value = -50;
        pageOpacity.value = withTiming(1, { duration: 200 });
        pageTranslateX.value = withTiming(0, { duration: 200 });
      });
    } else if (selectedStory && currentPageIndex === selectedStory.pages.length - 1) {
      // Story completed!
      awardStars(3, `Completed "${selectedStory.title}"!`, 'story-time', 3);
      setTimeout(() => {
        handleCloseStory();
      }, 2000);
    }
  }, [currentPageIndex, selectedStory, awardStars, handleCloseStory]);

  /**
   * Handle word tap
   */
  const handleWordTap = useCallback((word: StoryWord, index: number) => {
    tapSound.play();
    setHighlightedWordIndex(index);

    // In a real app, this would play the word's audio
    // For now, we'll just highlight it briefly
    setTimeout(() => {
      setHighlightedWordIndex(null);
    }, 1000);
  }, [tapSound]);

  /**
   * Play/pause narration
   */
  const handlePlayAudio = useCallback(() => {
    if (!selectedStory) return;

    if (isPlaying) {
      setIsPlaying(false);
      setHighlightedWordIndex(null);
    } else {
      setIsPlaying(true);

      // Simulate word-by-word highlighting
      const currentPage = selectedStory.pages[currentPageIndex];
      let wordIndex = 0;

      const highlightInterval = setInterval(() => {
        if (wordIndex < currentPage.words.length) {
          setHighlightedWordIndex(wordIndex);
          wordIndex++;
        } else {
          clearInterval(highlightInterval);
          setIsPlaying(false);
          setHighlightedWordIndex(null);
        }
      }, 800); // Highlight each word for 800ms

      // Clean up on unmount
      return () => clearInterval(highlightInterval);
    }
  }, [selectedStory, currentPageIndex, isPlaying]);

  const pageAnimatedStyle = useAnimatedStyle(() => ({
    opacity: pageOpacity.value,
    transform: [{ translateX: pageTranslateX.value }],
  }));

  // Story Selection View
  if (!selectedStory) {
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
            📚 Story Time
          </Text>

          <View className="w-12" />
        </View>

        {/* Story list */}
        <FlatList
          data={stories}
          keyExtractor={(item) => item.id}
          contentContainerClassName="p-4"
          renderItem={({ item }) => (
            <Pressable onPress={() => handleStorySelect(item)} className="mb-4">
              <Card className="p-4">
                <View className="flex-row">
                  {/* Story cover */}
                  <View className="w-20 h-20 rounded-lg overflow-hidden bg-background-light mr-4">
                    <Animated.Image
                      source={{ uri: item.coverImageUrl }}
                      className="w-full h-full"
                      resizeMode="cover"
                    />
                  </View>

                  {/* Story info */}
                  <View className="flex-1">
                    <Text
                      className="text-lg text-text-dark mb-1"
                      style={{ fontFamily: 'Quicksand_600SemiBold' }}
                    >
                      {item.title}
                    </Text>
                    <Text
                      className="text-sm text-text-medium mb-2"
                      style={{ fontFamily: 'Nunito_400Regular' }}
                    >
                      {item.pages.length} pages • Ages {item.ageRange}
                    </Text>
                    <View className="flex-row">
                      {item.tags.slice(0, 2).map((tag) => (
                        <View key={tag} className="bg-primary-100 px-2 py-1 rounded mr-2">
                          <Text
                            className="text-xs text-primary-600"
                            style={{ fontFamily: 'Nunito_600SemiBold' }}
                          >
                            {tag}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </View>

                  {/* Arrow */}
                  <Icon name="chevron-forward" size={24} color="#9CA3AF" />
                </View>
              </Card>
            </Pressable>
          )}
        />
      </SafeAreaView>
    );
  }

  // Story Reader View
  const currentPage = selectedStory.pages[currentPageIndex];

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 py-4 bg-background-light border-b border-gray-200">
        <Pressable
          onPress={handleCloseStory}
          className="w-10 h-10 items-center justify-center bg-white rounded-full shadow-sm"
          accessibilityLabel="Close story"
          accessibilityRole="button"
        >
          <Icon name="close" size={24} color="#6B7280" />
        </Pressable>

        <Text
          className="text-lg text-text-dark flex-1 text-center mx-4"
          style={{ fontFamily: 'Quicksand_600SemiBold' }}
          numberOfLines={1}
        >
          {selectedStory.title}
        </Text>

        <View className="w-10" />
      </View>

      {/* Story page */}
      <Animated.View style={[{ flex: 1 }, pageAnimatedStyle]}>
        <StoryPageView
          page={currentPage}
          highlightedWordIndex={highlightedWordIndex}
          onWordTap={handleWordTap}
        />
      </Animated.View>

      {/* Navigation */}
      <PageNavigation
        currentPage={currentPageIndex}
        totalPages={selectedStory.pages.length}
        onPrevious={handlePreviousPage}
        onNext={handleNextPage}
        onPlayAudio={handlePlayAudio}
        isPlaying={isPlaying}
      />

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
