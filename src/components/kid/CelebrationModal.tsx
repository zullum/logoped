import React, { useEffect } from 'react';
import {
  View,
  Modal,
  Pressable,
  StyleSheet,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
  withRepeat,
  withDelay,
  runOnJS,
  Easing,
} from 'react-native-reanimated';
import { Icon } from '@/components/ui/Icon';
import { Typography } from '@/components/ui';
import type { CelebrationData } from '@/types/reward.types';
import { useSoundEffect } from '@/hooks/useAudio';
import { ANIMATION_DURATIONS } from '@/constants/rewards';
import { COLORS, ICON_SIZES } from '@/constants/theme';

interface CelebrationModalProps {
  visible: boolean;
  celebration: CelebrationData | null;
  onClose: () => void;
}

// Floating emoji animation component - Very subtle for kids
const FloatingEmoji: React.FC<{ emoji: string; delay: number }> = ({ emoji, delay }) => {
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withDelay(delay, withTiming(0.6, { duration: 500 }));
    // Very gentle float - only 8px up and down
    translateY.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(-8, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
          withTiming(0, { duration: 2000, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        false
      )
    );
  }, [delay]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Typography style={{ fontSize: 28 }}>
        {emoji}
      </Typography>
    </Animated.View>
  );
};

export const CelebrationModal: React.FC<CelebrationModalProps> = ({
  visible,
  celebration,
  onClose,
}) => {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);
  const { play: playSuccess } = useSoundEffect('celebration');

  useEffect(() => {
    if (visible && celebration) {
      // Play celebration sound
      playSuccess();

      // Animate entrance - gentle and subtle
      scale.value = 0;
      opacity.value = 0;

      // Gentle scale animation - no overshoot
      scale.value = withTiming(1, {
        duration: 400,
        easing: Easing.out(Easing.ease),
      });

      opacity.value = withTiming(1, { duration: 400 });

      // Auto-close after appropriate duration (more kid-friendly)
      const baseDuration = ANIMATION_DURATIONS[
        celebration.type === 'star' ? 'STAR_COLLECTION' :
        celebration.type === 'sticker' ? 'STICKER_UNLOCK' :
        'ACHIEVEMENT_UNLOCK'
      ];

      // Only reduce duration by 15% (not too short now)
      const duration = baseDuration * 0.85;

      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible, celebration]);

  const handleClose = () => {
    // Animate exit
    scale.value = withTiming(0.8, { duration: 200 });
    opacity.value = withTiming(0, { duration: 200 }, (finished) => {
      if (finished) {
        runOnJS(onClose)();
      }
    });
  };

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  if (!celebration) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={handleClose} />

        {/* Floating Background Animations - Subtle and fewer */}
        <View style={styles.floatingContainer} pointerEvents="none">
          <View style={styles.floatingRow}>
            <FloatingEmoji emoji="⭐" delay={0} />
            <FloatingEmoji emoji="✨" delay={300} />
          </View>
          <View style={[styles.floatingRow, { marginTop: 80 }]}>
            <FloatingEmoji emoji="🌟" delay={150} />
          </View>
        </View>

        {/* Main Celebration Content */}
        <Animated.View
          style={[styles.container, containerAnimatedStyle]}
          className="bg-white rounded-3xl p-8 items-center shadow-2xl"
        >
          {/* Icon/Image - Smaller and softer */}
          <View className="mb-5">
            {celebration.type === 'star' && (
              <View className="bg-sunshine-400 w-20 h-20 rounded-full items-center justify-center">
                <Icon name="star" size={48} color="white" />
              </View>
            )}

            {celebration.type === 'sticker' && celebration.sticker && (
              <View className="w-28 h-28 bg-primary-100 rounded-2xl items-center justify-center">
                {/* Placeholder for sticker image */}
                <Icon name="image" size={ICON_SIZES.huge} color={COLORS.primary} />
              </View>
            )}

            {celebration.type === 'achievement' && celebration.achievement && (
              <View className="bg-coral-400 w-20 h-20 rounded-full items-center justify-center">
                <Icon
                  name={celebration.achievement.iconName as any}
                  size={48}
                  color="white"
                />
              </View>
            )}
          </View>

          {/* Title - Slightly smaller */}
          <Typography variant="h3" color="dark" center className="mb-3">
            {celebration.title}
          </Typography>

          {/* Message */}
          <Typography variant="button" color="medium" center className="mb-6">
            {celebration.message}
          </Typography>

          {/* Stars Earned */}
          {celebration.starsEarned && celebration.starsEarned > 0 && (
            <View className="flex-row items-center bg-sunshine-50 px-6 py-3 rounded-full mb-6">
              <Icon name="star" size={ICON_SIZES.large} color={COLORS.sunshine} />
              <Typography variant="h4" className="text-sunshine-600 ml-2">
                +{celebration.starsEarned}
              </Typography>
            </View>
          )}

          {/* Sticker Details */}
          {celebration.sticker && (
            <View className="bg-lavender-50 px-6 py-4 rounded-2xl mb-6 w-full">
              <Typography variant="body-lg" center className="text-lavender-600 mb-1">
                {celebration.sticker.name}
              </Typography>
              <Typography variant="body" center className="text-lavender-500">
                {celebration.sticker.description}
              </Typography>
            </View>
          )}

          {/* Achievement Details */}
          {celebration.achievement && (
            <View className="bg-coral-50 px-6 py-4 rounded-2xl mb-6 w-full">
              <Typography variant="body" center className="text-coral-600">
                {celebration.achievement.description}
              </Typography>
            </View>
          )}

          {/* Continue Button */}
          <Pressable
            onPress={handleClose}
            className="bg-grass-500 px-8 py-4 rounded-2xl active:bg-grass-600 min-h-[60px] items-center justify-center"
          >
            <Typography variant="button" color="white">
              Awesome!
            </Typography>
          </Pressable>

          {/* Tap anywhere hint */}
          <Typography variant="body-sm" color="light" className="mt-4 opacity-70">
            Tap anywhere to continue
          </Typography>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Softer overlay
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  floatingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    paddingHorizontal: 40,
  },
  container: {
    width: '85%',
    maxWidth: 380,
    zIndex: 10,
  },
});
