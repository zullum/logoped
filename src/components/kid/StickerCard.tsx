import React from 'react';
import { View, Pressable, Image, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { Icon, Typography } from '@/components/ui';
import type { Sticker } from '@/types/reward.types';
import { RARITY_COLORS } from '@/constants/rewards';
import { COLORS } from '@/constants/theme';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface StickerCardProps {
  sticker: Sticker;
  onPress?: () => void;
  size?: 'small' | 'medium' | 'large';
}

const sizeMap = {
  small: { card: 80, icon: 50 },
  medium: { card: 120, icon: 80 },
  large: { card: 150, icon: 110 },
};

export const StickerCard: React.FC<StickerCardProps> = ({
  sticker,
  onPress,
  size = 'medium',
}) => {
  const scale = useSharedValue(1);
  const { card, icon } = sizeMap[size];

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  const borderColor = RARITY_COLORS[sticker.rarity];

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={!sticker.isUnlocked || !onPress}
      style={[
        styles.container,
        animatedStyle,
        {
          width: card,
          height: card,
          borderColor: sticker.isUnlocked ? borderColor : COLORS.disabled,
          borderWidth: 3,
        },
      ]}
      className={`rounded-2xl items-center justify-center ${
        sticker.isUnlocked ? 'bg-white' : 'bg-gray-100'
      }`}
    >
      {sticker.isUnlocked ? (
        <>
          {/* Sticker Image Placeholder */}
          <View
            style={{ width: icon, height: icon }}
            className="items-center justify-center"
          >
            {/* Replace with actual image when available */}
            <Icon
              name="star"
              size={icon}
              color={borderColor}
            />
          </View>

          {/* Rarity Indicator */}
          <View
            style={[
              styles.rarityBadge,
              { backgroundColor: borderColor },
            ]}
          >
            <Typography
              variant="caption"
              color="white"
              style={{ textTransform: 'capitalize' }}
            >
              {sticker.rarity}
            </Typography>
          </View>
        </>
      ) : (
        <>
          {/* Locked State */}
          <View className="items-center justify-center opacity-30">
            <Icon name="lock-closed" size={icon * 0.6} color={COLORS.lockedIcon} />
          </View>
          <View className="absolute bottom-2 bg-gray-300 px-3 py-1 rounded-full">
            <Typography
              variant="caption"
              color="medium"
            >
              Locked
            </Typography>
          </View>
        </>
      )}
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  rarityBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
});
