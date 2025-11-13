import React, { useEffect } from 'react';
import { Pressable, Text, View, Dimensions } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
  withSequence,
  Easing,
  runOnJS,
} from 'react-native-reanimated';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export interface BubbleData {
  id: string;
  text: string; // Phoneme, syllable, or letter
  color: string;
  size: number;
  x: number; // Initial X position
  y: number; // Initial Y position
}

interface BubbleProps {
  data: BubbleData;
  onPop: (id: string) => void;
  isPaused?: boolean;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const Bubble: React.FC<BubbleProps> = ({ data, onPop, isPaused = false }) => {
  // Animated values
  const translateX = useSharedValue(data.x);
  const translateY = useSharedValue(data.y);
  const scale = useSharedValue(0);
  const opacity = useSharedValue(1);

  // Bubble entrance animation
  useEffect(() => {
    scale.value = withSpring(1, {
      damping: 8,
      stiffness: 100,
    });
  }, []);

  // Floating physics animation
  useEffect(() => {
    if (!isPaused) {
      // Float upward continuously
      translateY.value = withRepeat(
        withTiming(translateY.value - SCREEN_HEIGHT * 1.5, {
          duration: 8000 + Math.random() * 4000, // 8-12 seconds
          easing: Easing.linear,
        }),
        1, // Run once (bubble will be removed when off screen)
        false
      );

      // Gentle side-to-side drift
      const driftAmount = 30 + Math.random() * 40;
      translateX.value = withRepeat(
        withSequence(
          withTiming(translateX.value + driftAmount, {
            duration: 2000 + Math.random() * 2000,
            easing: Easing.inOut(Easing.ease),
          }),
          withTiming(translateX.value - driftAmount, {
            duration: 2000 + Math.random() * 2000,
            easing: Easing.inOut(Easing.ease),
          })
        ),
        -1, // Infinite
        true // Reverse
      );
    }
  }, [isPaused]);

  // Pop animation
  const handlePop = () => {
    // Animate pop effect
    scale.value = withSequence(
      withSpring(1.3, { damping: 5 }),
      withTiming(0, { duration: 200 })
    );
    opacity.value = withTiming(0, { duration: 200 }, () => {
      runOnJS(onPop)(data.id);
    });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
    opacity: opacity.value,
  }));

  return (
    <AnimatedPressable
      onPress={handlePop}
      style={[
        {
          position: 'absolute',
          width: data.size,
          height: data.size,
          left: -data.size / 2, // Center the bubble on its position
          top: -data.size / 2,
        },
        animatedStyle,
      ]}
      accessibilityLabel={`Pop bubble with ${data.text}`}
      accessibilityRole="button"
    >
      {/* Bubble circle with gradient-like effect */}
      <View
        className="w-full h-full rounded-full items-center justify-center shadow-lg"
        style={{
          backgroundColor: data.color,
          borderWidth: 3,
          borderColor: 'rgba(255, 255, 255, 0.5)',
        }}
      >
        {/* Inner highlight for 3D effect */}
        <View
          className="absolute top-2 left-2 rounded-full"
          style={{
            width: data.size * 0.3,
            height: data.size * 0.3,
            backgroundColor: 'rgba(255, 255, 255, 0.4)',
          }}
        />

        {/* Text content */}
        <Text
          className="text-white font-bold text-center"
          style={{
            fontFamily: 'Quicksand_700Bold',
            fontSize: data.size * 0.35,
            textShadowColor: 'rgba(0, 0, 0, 0.3)',
            textShadowOffset: { width: 1, height: 1 },
            textShadowRadius: 2,
          }}
        >
          {data.text}
        </Text>
      </View>
    </AnimatedPressable>
  );
};
