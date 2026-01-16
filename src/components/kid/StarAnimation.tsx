import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import { Icon } from '@/components/ui/Icon';
import { COLORS } from '@/constants/theme';

interface StarAnimationProps {
  count: number;
  size?: number;
  color?: string;
  delay?: number;
  onAnimationComplete?: () => void;
}

/**
 * Animated star component that bounces in with a delay
 */
const AnimatedStar: React.FC<{
  index: number;
  size: number;
  color: string;
  delay: number;
}> = ({ index, size, color, delay }) => {
  const scale = useSharedValue(0);
  const rotation = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    // Stagger animation for each star
    const starDelay = delay + index * 100;

    scale.value = withDelay(
      starDelay,
      withSequence(
        withSpring(1.3, { damping: 8 }),
        withSpring(1, { damping: 10 })
      )
    );

    rotation.value = withDelay(
      starDelay,
      withSequence(
        withTiming(360, { duration: 500, easing: Easing.out(Easing.cubic) }),
        withTiming(0, { duration: 0 })
      )
    );

    opacity.value = withDelay(
      starDelay,
      withTiming(1, { duration: 200 })
    );
  }, [index, delay]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotate: `${rotation.value}deg` },
    ],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.star, animatedStyle]}>
      <Icon name="star" size={size} color={color} />
    </Animated.View>
  );
};

/**
 * Component that displays animated stars for rewards
 */
export const StarAnimation: React.FC<StarAnimationProps> = ({
  count,
  size = 40,
  color = COLORS.sunshine,
  delay = 0,
  onAnimationComplete,
}) => {
  useEffect(() => {
    if (onAnimationComplete) {
      const totalDuration = delay + count * 100 + 800; // Animation duration
      const timer = setTimeout(onAnimationComplete, totalDuration);
      return () => clearTimeout(timer);
    }
  }, [count, delay, onAnimationComplete]);

  // Limit to max 5 visible stars for UI purposes
  const visibleCount = Math.min(count, 5);

  return (
    <View style={styles.container}>
      {Array.from({ length: visibleCount }, (_, i) => (
        <AnimatedStar
          key={i}
          index={i}
          size={size}
          color={color}
          delay={delay}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  star: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
