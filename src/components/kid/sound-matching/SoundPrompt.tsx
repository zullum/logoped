import React from 'react';
import { Pressable, View, Text } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
  cancelAnimation,
} from 'react-native-reanimated';

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
      <Text
        className="text-xl text-text-dark mb-6 text-center px-4"
        style={{ fontFamily: 'Quicksand_600SemiBold' }}
      >
        Tap the speaker to hear the word!
      </Text>

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
        <Text className="text-5xl">🔊</Text>
      </AnimatedPressable>

      {/* Helper text */}
      <Text
        className="text-sm text-text-medium mt-4"
        style={{ fontFamily: 'Nunito_400Regular' }}
      >
        {isPlaying ? 'Playing...' : 'Tap to play again'}
      </Text>
    </View>
  );
};
