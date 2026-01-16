import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
  withTiming,
  Easing,
  runOnJS,
} from 'react-native-reanimated';
import { Typography } from '@/components/ui';
import { FloatingReaction } from './FloatingReaction';
import { COLORS } from '@/constants/theme';

const { width } = Dimensions.get('window');

interface SubtleRewardDisplayProps {
  starsEarned: number;
  message?: string;
  onComplete?: () => void;
  imageUrl?: string | number; // Can be a URL string or local require() number
}

/**
 * Subtle reward display with floating emojis and small star count
 * Non-intrusive, appears at top of screen briefly
 */
export const SubtleRewardDisplay: React.FC<SubtleRewardDisplayProps> = ({
  starsEarned,
  message,
  onComplete,
  imageUrl,
}) => {

  const [showReactions, setShowReactions] = useState(false);
  const [animationStarted, setAnimationStarted] = useState(false);
  const translateY = useSharedValue(-100);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);

  useEffect(() => {
    // Prevent multiple animation starts
    if (animationStarted) {
      return;
    }

    setAnimationStarted(true);

    // Show floating reactions immediately
    setShowReactions(true);

    // Start entrance animation (70px down to avoid front cameras and notches)
    translateY.value = withSpring(70, { damping: 15 });
    opacity.value = withTiming(1, { duration: 300 });
    scale.value = withSpring(1, { damping: 12 });

    // Schedule exit animation after 2 seconds
    const exitTimer = setTimeout(() => {
      translateY.value = withTiming(-100, { duration: 500, easing: Easing.in(Easing.ease) });
      opacity.value = withTiming(0, { duration: 500 }, (finished) => {
        if (finished && onComplete) {
          runOnJS(onComplete)();
        }
      });
    }, 2000);

    // Cleanup timer if component unmounts
    return () => clearTimeout(exitTimer);
  }, []); // Empty dependency array to prevent re-runs

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { scale: scale.value },
    ],
    opacity: opacity.value,
  }));

  return (
    <>
      {/* Small top banner */}
      <Animated.View style={[styles.banner, animatedStyle]} pointerEvents="none">
        <View style={styles.bannerContent}>
          <Typography style={styles.starText}>⭐ +{starsEarned}</Typography>
          {message && <Typography style={styles.messageText}>{message}</Typography>}
        </View>
      </Animated.View>

      {/* Floating reactions */}
      {showReactions && (
        <View style={styles.reactionsContainer} pointerEvents="none">
          {imageUrl ? (
            <>
              <FloatingReaction imageUrl={imageUrl} startX={width * 0.3} />
              <FloatingReaction imageUrl={imageUrl} startX={width * 0.5} />
              <FloatingReaction imageUrl={imageUrl} startX={width * 0.7} />
            </>
          ) : (
            <>
              <FloatingReaction emoji="⭐" startX={width * 0.3} />
              <FloatingReaction emoji="💫" startX={width * 0.5} />
              <FloatingReaction emoji="✨" startX={width * 0.7} />
            </>
          )}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  banner: {
    position: 'absolute',
    top: 0,
    left: width * 0.25,
    right: width * 0.25,
    zIndex: 1000,
    backgroundColor: 'rgba(255, 209, 102, 0.95)', // sunshine color
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  bannerContent: {
    alignItems: 'center',
  },
  starText: {
    fontSize: 24,
    fontFamily: 'Quicksand_700Bold',
    color: COLORS.white,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  messageText: {
    fontSize: 14,
    fontFamily: 'Nunito_600SemiBold',
    color: COLORS.white,
    marginTop: 4,
  },
  reactionsContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 9999, // Ensure reactions are on top of everything
    elevation: 9999, // Android elevation
  },
});
