import React, { useEffect } from 'react';
import {
  View,
  Text,
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
import type { CelebrationData } from '@/types/reward.types';
import { useSoundEffect } from '@/hooks/useAudio';
import { ANIMATION_DURATIONS } from '@/constants/rewards';

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
    <Animated.Text style={[{ fontSize: 28 }, animatedStyle]}>
      {emoji}
    </Animated.Text>
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
                <Icon name="image" size={64} color="#4A90E2" />
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
          <Text
            className="text-3xl font-quicksand-bold text-text-dark text-center mb-3"
            style={{ fontFamily: 'Quicksand_700Bold' }}
          >
            {celebration.title}
          </Text>

          {/* Message */}
          <Text
            className="text-xl font-nunito-regular text-text-medium text-center mb-6"
            style={{ fontFamily: 'Nunito_400Regular' }}
          >
            {celebration.message}
          </Text>

          {/* Stars Earned */}
          {celebration.starsEarned && celebration.starsEarned > 0 && (
            <View className="flex-row items-center bg-sunshine-50 px-6 py-3 rounded-full mb-6">
              <Icon name="star" size={28} color="#FFD166" />
              <Text
                className="text-2xl font-quicksand-bold text-sunshine-600 ml-2"
                style={{ fontFamily: 'Quicksand_700Bold' }}
              >
                +{celebration.starsEarned}
              </Text>
            </View>
          )}

          {/* Sticker Details */}
          {celebration.sticker && (
            <View className="bg-lavender-50 px-6 py-4 rounded-2xl mb-6 w-full">
              <Text
                className="text-lg font-nunito-semibold text-center text-lavender-600 mb-1"
                style={{ fontFamily: 'Nunito_600SemiBold' }}
              >
                {celebration.sticker.name}
              </Text>
              <Text
                className="text-base font-nunito-regular text-center text-lavender-500"
                style={{ fontFamily: 'Nunito_400Regular' }}
              >
                {celebration.sticker.description}
              </Text>
            </View>
          )}

          {/* Achievement Details */}
          {celebration.achievement && (
            <View className="bg-coral-50 px-6 py-4 rounded-2xl mb-6 w-full">
              <Text
                className="text-base font-nunito-regular text-center text-coral-600"
                style={{ fontFamily: 'Nunito_400Regular' }}
              >
                {celebration.achievement.description}
              </Text>
            </View>
          )}

          {/* Continue Button */}
          <Pressable
            onPress={handleClose}
            className="bg-grass-500 px-8 py-4 rounded-2xl active:bg-grass-600 min-h-[60px] items-center justify-center"
          >
            <Text
              className="text-xl font-quicksand-bold text-white"
              style={{ fontFamily: 'Quicksand_700Bold' }}
            >
              Awesome!
            </Text>
          </Pressable>

          {/* Tap anywhere hint */}
          <Text
            className="text-sm font-nunito-regular text-text-light mt-4 opacity-70"
            style={{ fontFamily: 'Nunito_400Regular' }}
          >
            Tap anywhere to continue
          </Text>
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
