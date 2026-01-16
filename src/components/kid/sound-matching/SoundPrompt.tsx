import React from 'react';
import { Pressable, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
  cancelAnimation,
} from 'react-native-reanimated';
import { Typography } from '@/components/ui';

interface SoundPromptProps {
  isPlaying: boolean;
  onPlay: () => void;
  disabled?: boolean;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const SoundPrompt: React.FC<SoundPromptProps> = ({
  isPlaying,
  onPlay,
  disabled = false,
}) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  // Pulse animation when playing
  React.useEffect(() => {
    if (isPlaying) {
      scale.value = withRepeat(
        withSequence(
          withTiming(1.1, { duration: 400 }),
          withTiming(1, { duration: 400 })
        ),
        -1, // Infinite
        false
      );
      opacity.value = withRepeat(
        withSequence(
          withTiming(0.7, { duration: 400 }),
          withTiming(1, { duration: 400 })
        ),
        -1,
        false
      );
    } else {
      cancelAnimation(scale);
      cancelAnimation(opacity);
      scale.value = withTiming(1);
      opacity.value = withTiming(1);
    }
  }, [isPlaying]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <View className="items-center py-8">
      {/* Instruction text */}
      <Typography variant="button" color="dark" center className="mb-6 px-4">
        Tap the speaker to hear the word!
      </Typography>

      {/* Speaker button */}
      <AnimatedPressable
        onPress={onPlay}
        disabled={disabled || isPlaying}
        className="w-24 h-24 items-center justify-center bg-primary-500 rounded-full shadow-lg"
        style={animatedStyle}
        accessibilityLabel="Play word sound"
        accessibilityRole="button"
        accessibilityState={{ disabled: disabled || isPlaying }}
      >
        {/* Speaker icon */}
        <Typography className="text-5xl">🔊</Typography>
      </AnimatedPressable>

      {/* Helper text */}
      <Typography variant="body-sm" color="medium" className="mt-4">
        {isPlaying ? 'Playing...' : 'Tap to play again'}
      </Typography>
    </View>
  );
};
