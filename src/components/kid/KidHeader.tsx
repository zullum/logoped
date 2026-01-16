import React from 'react';
import { View, Pressable } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { Icon } from '@/components/ui/Icon';
import { Typography } from '@/components/ui';
import { StarDisplay } from './StarDisplay';
import { CharacterAvatar } from './CharacterAvatar';
import { COLORS, BUTTON_SIZES, ICON_SIZES, ANIMATION } from '@/constants/theme';

interface KidHeaderProps {
  title: string;
  totalStars: number;
  onRewardsPress: () => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const RewardButton: React.FC<{ onPress: () => void }> = ({ onPress }) => {
  const scale = useSharedValue(1);
  const rotate = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotate: `${rotate.value}deg` },
    ],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.85, {
      damping: 12,
      stiffness: 400,
    });
    rotate.value = withSequence(
      withTiming(-10, { duration: ANIMATION.fast }),
      withTiming(10, { duration: ANIMATION.fast }),
      withTiming(-10, { duration: ANIMATION.fast }),
      withTiming(0, { duration: ANIMATION.fast })
    );
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, {
      damping: 10,
      stiffness: 300,
    });
  };

  const buttonSize = BUTTON_SIZES.medium;

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={animatedStyle}
      accessibilityLabel="View rewards"
      accessibilityRole="button"
      className="items-center justify-center"
    >
      {/* Colorful reward button */}
      <View
        className="items-center justify-center rounded-full shadow-md"
        style={{
          width: buttonSize,
          height: buttonSize,
          backgroundColor: COLORS.coral,
        }}
      >
        {/* Inner white glow */}
        <View
          className="absolute rounded-full opacity-30"
          style={{
            width: 40,
            height: 40,
            backgroundColor: COLORS.white,
          }}
        />

        {/* Medal icon */}
        <Icon name="ribbon-outline" size={ICON_SIZES.large} color={COLORS.white} />
      </View>

      {/* Outer glow effect */}
      <View
        className="absolute -z-10 rounded-full opacity-20"
        style={{
          width: buttonSize + 8,
          height: buttonSize + 8,
          backgroundColor: COLORS.coral,
        }}
      />
    </AnimatedPressable>
  );
};

const ProfileButton: React.FC = () => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.9, {
      damping: 12,
      stiffness: 400,
    });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, {
      damping: 10,
      stiffness: 300,
    });
  };

  const buttonSize = BUTTON_SIZES.medium;

  return (
    <AnimatedPressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={animatedStyle}
      accessibilityLabel="View profile"
      accessibilityRole="button"
    >
      <View
        className="rounded-full shadow-md"
        style={{
          width: buttonSize,
          height: buttonSize,
        }}
      >
        <CharacterAvatar size={buttonSize} />
      </View>
    </AnimatedPressable>
  );
};

export const KidHeader: React.FC<KidHeaderProps> = ({
  title,
  totalStars,
  onRewardsPress,
}) => {
  return (
    <View className="px-4 pt-4 pb-2">
      {/* Colorful gradient background */}
      <View
        className="absolute inset-0 opacity-10 rounded-3xl"
        style={{
          backgroundColor: COLORS.primary,
        }}
      />

      {/* Title */}
      <View className="mb-4">
        <Typography
          variant="h3"
          color="dark"
          numberOfLines={2}
          adjustsFontSizeToFit
        >
          {title}
        </Typography>
      </View>

      {/* Action buttons row */}
      <View className="flex-row items-center justify-end gap-3">
        {/* Rewards button */}
        <RewardButton onPress={onRewardsPress} />

        {/* Star display */}
        <StarDisplay count={totalStars} />

        {/* Profile avatar */}
        <ProfileButton />
      </View>
    </View>
  );
};
