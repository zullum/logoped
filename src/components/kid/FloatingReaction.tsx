import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions, Image } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  Easing,
  runOnJS,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

interface FloatingReactionProps {
  emoji?: string;
  imageUrl?: string | number; // Can be a URL string or local require() number
  onComplete?: () => void;
  startX?: number;
}

/**
 * Floating emoji animation like Instagram/Facebook stories
 * Non-intrusive, floats up and fades out
 */
export const FloatingReaction: React.FC<FloatingReactionProps> = ({
  emoji,
  imageUrl,
  onComplete,
  startX = Math.random() * (width - 60) + 30,
}) => {

  const [animationStarted, setAnimationStarted] = useState(false);
  const translateY = useSharedValue(0); // Start from current position
  const translateX = useSharedValue(0); // Start from current position
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0);

  useEffect(() => {
    // Prevent multiple animation starts
    if (animationStarted) {
      return;
    }

    setAnimationStarted(true);

    // Entrance: quick scale up
    scale.value = withSpring(1, {
      damping: 15,
      stiffness: 200,
    });

    opacity.value = withTiming(1, { duration: 200 });

    // Start float up animation immediately
    translateY.value = withTiming(
      -300, // Float up 300px from starting position (more visible)
      {
        duration: 2500,
        easing: Easing.out(Easing.ease),
      }
    );

    // Gentle horizontal drift - relative to starting position
    translateX.value = withTiming(
      (Math.random() > 0.5 ? 30 : -30),
      {
        duration: 2500,
        easing: Easing.inOut(Easing.ease),
      }
    );

    // Schedule fade out after 2 seconds
    const fadeTimer = setTimeout(() => {
      opacity.value = withTiming(0, {
        duration: 500,
        easing: Easing.out(Easing.ease),
      }, (finished) => {
        if (finished && onComplete) {
          runOnJS(onComplete)();
        }
      });
    }, 2000);

    // Cleanup timer if component unmounts
    return () => clearTimeout(fadeTimer);
  }, []); // Empty dependency array to prevent re-runs

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
    opacity: opacity.value,
  }));

  // Determine if we're rendering an image or emoji
  const renderContent = () => {
    if (imageUrl) {
      const imageSource = typeof imageUrl === 'number' ? imageUrl : { uri: imageUrl };
      return (
        <Animated.View style={[styles.imageContainer, animatedStyle, { left: startX }]} pointerEvents="none">
          <Image source={imageSource} style={styles.image} resizeMode="cover" />
        </Animated.View>
      );
    }

    return (
      <Animated.Text
        style={[styles.emoji, animatedStyle, { left: startX }]}
        pointerEvents="none"
      >
        {emoji}
      </Animated.Text>
    );
  };

  return renderContent();
};

const styles = StyleSheet.create({
  emoji: {
    position: 'absolute',
    bottom: 20, // Start from bottom of screen
    fontSize: 40,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    zIndex: 9999, // Ensure it's on top
  },
  imageContainer: {
    position: 'absolute',
    bottom: 20, // Start from bottom of screen
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 1,
    elevation: 4,
    zIndex: 9999,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
