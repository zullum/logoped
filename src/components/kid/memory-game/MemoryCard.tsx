import React, { useEffect } from 'react';
import { Pressable, View, Image, Text } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSpring,
  interpolate,
  runOnJS,
} from 'react-native-reanimated';

export interface CardData {
  id: string;
  content: string; // Word text or image URL
  type: 'image' | 'word';
  pairId: string; // Cards with same pairId match
  imageUrl?: string;
}

interface MemoryCardProps {
  card: CardData;
  isFlipped: boolean;
  isMatched: boolean;
  onPress: () => void;
  disabled: boolean;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const MemoryCard: React.FC<MemoryCardProps> = ({
  card,
  isFlipped,
  isMatched,
  onPress,
  disabled,
}) => {
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);

  // Flip animation
  useEffect(() => {
    rotation.value = withTiming(isFlipped || isMatched ? 180 : 0, {
      duration: 400,
    });
  }, [isFlipped, isMatched]);

  // Matched animation (pulse)
  useEffect(() => {
    if (isMatched) {
      scale.value = withSpring(1.05, { damping: 5 }, () => {
        scale.value = withSpring(1);
      });
    }
  }, [isMatched]);

  const frontAnimatedStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(rotation.value, [0, 180], [0, 180]);

    return {
      transform: [
        { perspective: 1000 },
        { rotateY: `${rotateY}deg` },
        { scale: scale.value },
      ],
      opacity: rotateY > 90 ? 0 : 1,
    };
  });

  const backAnimatedStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(rotation.value, [0, 180], [180, 360]);

    return {
      transform: [
        { perspective: 1000 },
        { rotateY: `${rotateY}deg` },
        { scale: scale.value },
      ],
      opacity: rotation.value > 90 ? 1 : 0,
    };
  });

  return (
    <AnimatedPressable
      onPress={onPress}
      disabled={disabled || isFlipped || isMatched}
      className="aspect-square p-1"
      accessibilityLabel={`Memory card ${isFlipped ? card.content : 'hidden'}`}
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || isFlipped || isMatched }}
    >
      <View className="relative w-full h-full">
        {/* Card Back (face-down, question mark) */}
        <Animated.View
          className="absolute inset-0 bg-primary-500 rounded-2xl items-center justify-center shadow-md"
          style={frontAnimatedStyle}
        >
          <View className="absolute inset-2 border-4 border-white/30 rounded-xl" />
          <Text className="text-6xl">?</Text>
        </Animated.View>

        {/* Card Front (face-up, content) */}
        <Animated.View
          className={`
            absolute inset-0 rounded-2xl items-center justify-center shadow-md
            ${isMatched ? 'bg-grass-500' : 'bg-white'}
          `}
          style={backAnimatedStyle}
        >
          {card.type === 'image' && card.imageUrl ? (
            <View className="w-full h-full p-3">
              <Image
                source={{ uri: card.imageUrl }}
                className="w-full h-full rounded-xl"
                resizeMode="cover"
              />
            </View>
          ) : (
            <Text
              className={`text-center px-2 ${isMatched ? 'text-white' : 'text-text-dark'}`}
              style={{
                fontFamily: 'Quicksand_700Bold',
                fontSize: 20,
              }}
              numberOfLines={2}
            >
              {card.content}
            </Text>
          )}

          {/* Checkmark for matched cards */}
          {isMatched && (
            <View className="absolute top-1 right-1 bg-white rounded-full p-1">
              <Text className="text-lg">✓</Text>
            </View>
          )}
        </Animated.View>
      </View>
    </AnimatedPressable>
  );
};
