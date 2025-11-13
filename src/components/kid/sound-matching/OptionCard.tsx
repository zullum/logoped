import React from 'react';
import { Pressable, View, Image, Text } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withSequence,
  runOnJS,
} from 'react-native-reanimated';
import type { Word } from '@/types';

interface OptionCardProps {
  word: Word;
  isSelected: boolean;
  isCorrect: boolean | null;
  onPress: () => void;
  disabled: boolean;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const OptionCard: React.FC<OptionCardProps> = ({
  word,
  isSelected,
  isCorrect,
  onPress,
  disabled,
}) => {
  const scale = useSharedValue(1);
  const borderWidth = useSharedValue(0);

  // Animate when selected
  React.useEffect(() => {
    if (isSelected) {
      scale.value = withSequence(
        withSpring(1.1, { damping: 10 }),
        withSpring(1, { damping: 10 })
      );
    }
  }, [isSelected]);

  // Show border feedback
  React.useEffect(() => {
    if (isCorrect !== null) {
      borderWidth.value = withSpring(4);
    } else {
      borderWidth.value = withSpring(0);
    }
  }, [isCorrect]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const borderStyle = useAnimatedStyle(() => ({
    borderWidth: borderWidth.value,
    borderColor: isCorrect ? '#06D6A0' : '#EF476F',
  }));

  return (
    <AnimatedPressable
      onPress={onPress}
      disabled={disabled}
      className="flex-1 m-2 min-w-[140px] max-w-[180px]"
      style={animatedStyle}
      accessibilityLabel={`Select ${word.text}`}
      accessibilityRole="button"
    >
      <Animated.View
        className="bg-white rounded-3xl p-4 items-center justify-center shadow-lg"
        style={borderStyle}
      >
        {/* Image */}
        <View className="w-full aspect-square mb-3 rounded-2xl overflow-hidden bg-background-light">
          <Image
            source={{ uri: word.imageUrl }}
            className="w-full h-full"
            resizeMode="cover"
            accessibilityLabel={word.text}
          />
        </View>

        {/* Word label (optional - can be hidden for more challenge) */}
        <Text
          className="text-lg text-text-dark text-center"
          style={{ fontFamily: 'Nunito_600SemiBold' }}
        >
          {word.text}
        </Text>

        {/* Feedback emoji */}
        {isCorrect !== null && (
          <View className="absolute top-2 right-2 bg-white rounded-full p-2">
            <Text className="text-3xl">{isCorrect ? '✓' : '✗'}</Text>
          </View>
        )}
      </Animated.View>
    </AnimatedPressable>
  );
};
