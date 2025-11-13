import React, { useState } from 'react';
import { View, Text, Image, Pressable, Animated } from 'react-native';
import type { Word } from '@/types';
import { useTranslation } from '@/hooks/useTranslation';
import { audioPlayer } from '@/lib/audio/audioPlayer';

interface WordCardProps {
  word: Word;
  onTap: (word: Word) => void;
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
}

export function WordCard({
  word,
  onTap,
  size = 'medium',
  showText = true,
}: WordCardProps) {
  const { language } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(false);
  const scaleAnim = useState(new Animated.Value(1))[0];

  const currentLanguage = language as 'en' | 'es';

  // Size configuration
  const sizeConfig = {
    small: { width: 120, height: 120, textSize: 'text-base', borderRadius: 'rounded-2xl' },
    medium: { width: 200, height: 200, textSize: 'text-xl', borderRadius: 'rounded-3xl' },
    large: { width: 280, height: 280, textSize: 'text-2xl', borderRadius: 'rounded-3xl' },
  };

  const config = sizeConfig[size];

  const handlePress = async () => {
    // Animate scale down then up (bounce effect)
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    // Play audio
    setIsPlaying(true);
    const audioUrl = word.audioUrl[currentLanguage];
    const played = await audioPlayer.play(word.id, audioUrl);

    // Call onTap callback regardless of audio success (for progress tracking)
    // In development with mock URLs, audio won't play but interaction still counts
    onTap(word);

    // Reset playing state after 2 seconds
    setTimeout(() => setIsPlaying(false), 2000);
  };

  return (
    <View className="items-center">
      <Pressable
        onPress={handlePress}
        accessibilityLabel={`${word.text} word card`}
        accessibilityHint="Tap to hear the word"
        accessibilityRole="button"
      >
        <Animated.View
          style={{
            transform: [{ scale: scaleAnim }],
          }}
        >
          <View
            className={`
              ${config.borderRadius}
              bg-white
              shadow-lg
              overflow-hidden
              ${isPlaying ? 'border-4 border-primary-500' : 'border-2 border-gray-200'}
            `}
            style={{
              width: config.width,
              height: config.height,
            }}
          >
            {/* Word Image */}
            <Image
              source={{ uri: word.imageUrl }}
              className="w-full h-full"
              resizeMode="cover"
              accessibilityIgnoresInvertColors
            />

            {/* Playing Indicator Overlay */}
            {isPlaying && (
              <View className="absolute inset-0 bg-primary-500/20 items-center justify-center">
                <View className="bg-white/90 rounded-full w-16 h-16 items-center justify-center">
                  <Text className="text-3xl">🔊</Text>
                </View>
              </View>
            )}
          </View>
        </Animated.View>
      </Pressable>

      {/* Word Text */}
      {showText && (
        <View className="mt-md">
          <Text
            className={`${config.textSize} text-text-dark text-center`}
            style={{ fontFamily: 'Quicksand_700Bold' }}
          >
            {word.translations[currentLanguage]}
          </Text>

          {/* Phonetic */}
          <Text
            className="text-sm text-text-medium text-center mt-xs"
            style={{ fontFamily: 'Nunito_400Regular' }}
          >
            {word.phonetic}
          </Text>
        </View>
      )}
    </View>
  );
}
