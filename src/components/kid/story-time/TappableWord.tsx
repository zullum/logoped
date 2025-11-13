import React, { useState } from 'react';
import { Pressable, Text } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withSequence,
} from 'react-native-reanimated';

interface TappableWordProps {
  word: string;
  isHighlighted?: boolean;
  onTap?: () => void;
  fontSize?: number;
  fontFamily?: string;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const TappableWord: React.FC<TappableWordProps> = ({
  word,
  isHighlighted = false,
  onTap,
  fontSize = 24,
  fontFamily = 'Nunito_600SemiBold',
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const scale = useSharedValue(1);

  const handlePress = () => {
    // Bounce animation
    scale.value = withSequence(
      withSpring(1.2, { damping: 8 }),
      withSpring(1, { damping: 8 })
    );

    setIsPressed(true);
    onTap?.();

    // Reset pressed state
    setTimeout(() => setIsPressed(false), 300);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedPressable
      onPress={handlePress}
      style={animatedStyle}
      accessibilityLabel={`Hear ${word}`}
      accessibilityRole="button"
    >
      <Text
        style={{
          fontSize,
          fontFamily,
          color: isHighlighted ? '#4A90E2' : '#2D3748',
          backgroundColor: isHighlighted ? 'rgba(74, 144, 226, 0.1)' : 'transparent',
          paddingHorizontal: 4,
          paddingVertical: 2,
          borderRadius: 4,
          textDecorationLine: isPressed ? 'underline' : 'none',
        }}
      >
        {word}
      </Text>
    </AnimatedPressable>
  );
};
