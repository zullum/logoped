import React from 'react';
import { View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

interface CharacterAvatarProps {
  size?: number;
  animate?: boolean;
}

export const CharacterAvatar: React.FC<CharacterAvatarProps> = ({
  size = 80,
  animate = true,
}) => {
  const rotation = useSharedValue(0);

  React.useEffect(() => {
    if (animate) {
      rotation.value = withRepeat(
        withSequence(
          withTiming(-10, { duration: 500 }),
          withTiming(10, { duration: 500 }),
          withTiming(0, { duration: 500 })
        ),
        -1,
        false
      );
    }
  }, [animate]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <Animated.View
      style={[
        {
          width: size,
          height: size,
        },
        animatedStyle,
      ]}
      className="bg-primary-100 rounded-full items-center justify-center border-4 border-primary-500"
    >
      {/* Placeholder - will be replaced with actual avatar */}
      <View className="w-full h-full rounded-full bg-primary-300" />
    </Animated.View>
  );
};
