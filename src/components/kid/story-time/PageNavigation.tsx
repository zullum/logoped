import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Icon } from '@/components/ui/Icon';

interface PageNavigationProps {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
  onPlayAudio: () => void;
  isPlaying: boolean;
}

export const PageNavigation: React.FC<PageNavigationProps> = ({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
  onPlayAudio,
  isPlaying,
}) => {
  const hasPrevious = currentPage > 0;
  const hasNext = currentPage < totalPages - 1;

  return (
    <View className="flex-row items-center justify-between px-6 py-4 bg-background-light border-t border-gray-200">
      {/* Previous button */}
      <Pressable
        onPress={onPrevious}
        disabled={!hasPrevious}
        className={`
          w-14 h-14 rounded-full items-center justify-center
          ${hasPrevious ? 'bg-primary-500' : 'bg-gray-300'}
        `}
        accessibilityLabel="Previous page"
        accessibilityRole="button"
        accessibilityState={{ disabled: !hasPrevious }}
      >
        <Icon
          name="chevron-back"
          size={28}
          color="white"
        />
      </Pressable>

      {/* Center controls */}
      <View className="flex-1 items-center mx-4">
        {/* Play/Pause button */}
        <Pressable
          onPress={onPlayAudio}
          className="w-16 h-16 rounded-full bg-sunshine-500 items-center justify-center shadow-lg mb-2"
          accessibilityLabel={isPlaying ? 'Pause narration' : 'Play narration'}
          accessibilityRole="button"
        >
          <Text className="text-4xl">
            {isPlaying ? '⏸️' : '▶️'}
          </Text>
        </Pressable>

        {/* Page indicator */}
        <Text
          className="text-sm text-text-medium"
          style={{ fontFamily: 'Nunito_600SemiBold' }}
        >
          Page {currentPage + 1} of {totalPages}
        </Text>
      </View>

      {/* Next button */}
      <Pressable
        onPress={onNext}
        disabled={!hasNext}
        className={`
          w-14 h-14 rounded-full items-center justify-center
          ${hasNext ? 'bg-primary-500' : 'bg-gray-300'}
        `}
        accessibilityLabel="Next page"
        accessibilityRole="button"
        accessibilityState={{ disabled: !hasNext }}
      >
        <Icon
          name="chevron-forward"
          size={28}
          color="white"
        />
      </Pressable>
    </View>
  );
};
