import React from 'react';
import { View, Image, Text } from 'react-native';
import { TappableWord } from './TappableWord';
import type { StoryPage, StoryWord } from '@/types/story.types';

interface StoryPageViewProps {
  page: StoryPage;
  highlightedWordIndex: number | null;
  onWordTap: (word: StoryWord, index: number) => void;
}

export const StoryPageView: React.FC<StoryPageViewProps> = ({
  page,
  highlightedWordIndex,
  onWordTap,
}) => {
  return (
    <View className="flex-1 bg-white">
      {/* Story image */}
      <View className="w-full aspect-[4/3] bg-background-light">
        <Image
          source={{ uri: page.imageUrl }}
          className="w-full h-full"
          resizeMode="cover"
          accessibilityLabel="Story illustration"
        />
      </View>

      {/* Story text with tappable words */}
      <View className="flex-1 p-6 justify-center">
        <View className="flex-row flex-wrap justify-center">
          {page.words.map((word, index) => (
            <React.Fragment key={`${word.text}-${index}`}>
              <TappableWord
                word={word.text}
                isHighlighted={highlightedWordIndex === index}
                onTap={() => onWordTap(word, index)}
                fontSize={28}
                fontFamily="Nunito_600SemiBold"
              />
              {/* Add space between words */}
              {index < page.words.length - 1 && (
                <Text
                  className="text-text-dark"
                  style={{ fontSize: 28, fontFamily: 'Nunito_600SemiBold' }}
                >
                  {' '}
                </Text>
              )}
            </React.Fragment>
          ))}
        </View>
      </View>
    </View>
  );
};
