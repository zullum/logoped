import React, { useState } from 'react';
import { View, Pressable } from 'react-native';
import type { Word } from '@/types';
import { useTranslation } from '@/hooks/useTranslation';
import { audioPlayer } from '@/lib/audio/audioPlayer';
import { Icon, Typography, ImageWithFallback } from '@/components/ui';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  Easing,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';

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
  const [isPressed, setIsPressed] = useState(false);
  
  // Animation values
  const scaleAnim = useSharedValue(1);
  const waveProgress = useSharedValue(0);

  const currentLanguage = language as 'en' | 'es';

  // Size configuration
  const sizeConfig = {
    small: { width: 120, height: 120, textSize: 'text-base', borderRadius: 'rounded-2xl' },
    medium: { width: 200, height: 200, textSize: 'text-xl', borderRadius: 'rounded-3xl' },
    large: { width: 280, height: 280, textSize: 'text-2xl', borderRadius: 'rounded-3xl' },
  };

  const config = sizeConfig[size];

  const handlePress = async () => {
    if (isPressed) return;
    setIsPressed(true);

    // Bounce animation
    scaleAnim.value = withSpring(0.9, {}, () => {
      scaleAnim.value = withSpring(1);
    });

    // Sound wave animation
    waveProgress.value = 0; // Reset before playing
    waveProgress.value = withTiming(1, {
      duration: 800,
      easing: Easing.out(Easing.quad),
    });

    // Play audio
    setIsPlaying(true);
    const audioUrl = word.audioUrl[currentLanguage];
    await audioPlayer.play(word.id, audioUrl);
    onTap(word);

    setTimeout(() => {
      setIsPressed(false);
      setIsPlaying(false);
    }, 2000);
  };

  const animatedCardStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleAnim.value }],
  }));

  const animatedWaveStyle = useAnimatedStyle(() => {
    // A more pronounced animation: scale from 1 to 1.5, opacity from 0.7 to 0
    const scale = interpolate(waveProgress.value, [0, 1], [1, 1.5]);
    const opacity = interpolate(waveProgress.value, [0, 1], [0.7, 0]);

    return {
      transform: [{ scale }],
      opacity,
    };
  });

  return (
    <View className="items-center">
      <Pressable
        onPress={handlePress}
        accessibilityLabel={`${word.text} word card`}
        accessibilityHint="Tap to hear the word"
        accessibilityRole="button"
      >
        <Animated.View style={[animatedCardStyle, { width: config.width, height: config.height }]}>
          {/* Sound Wave Animation - positioned absolutely behind the card */}
          <Animated.View
            className={`absolute inset-0 ${config.borderRadius} border-8 border-[#D4A574]`}
            style={animatedWaveStyle}
            pointerEvents="none"
          />

          {/* Main Card content with overflow hidden for image clipping */}
          <View
            className={`flex-1 ${config.borderRadius} bg-[#FFF9E6] shadow-lg overflow-hidden border-2 border-gray-200`}
          >
            <ImageWithFallback
              uri={word.imageUrl}
              fallbackEmoji={word.emoji}
              fallbackText={word.text}
              className="w-full h-full"
              resizeMode="cover"
              accessibilityIgnoresInvertColors
            />
            {/* Audio Icon in bottom right corner */}
            <View className="absolute bottom-3 right-3 bg-black/40 rounded-full p-2">
              <Icon
                name={isPlaying ? 'volume-high' : 'volume-medium-outline'}
                size={size === 'large' ? 28 : 20}
                color="white"
              />
            </View>
          </View>
        </Animated.View>
      </Pressable>

      {/* Word Text */}
      {showText && (
        <View className="mt-md">
          <Typography
            variant={size === 'large' ? 'h4' : size === 'medium' ? 'body-lg' : 'body'}
            color="dark"
            center
          >
            {word.translations[currentLanguage]}
          </Typography>

          {/* Phonetic */}
          <Typography
            variant="body-sm"
            color="medium"
            center
            className="mt-xs"
          >
            {word.phonetic}
          </Typography>
        </View>
      )}
    </View>
  );
}
