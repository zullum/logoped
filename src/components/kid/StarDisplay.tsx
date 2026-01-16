import React from 'react';
import { View } from 'react-native';
import { Icon } from '@/components/ui/Icon';
import { Typography } from '@/components/ui';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withDelay,
} from 'react-native-reanimated';
import { formatCompactNumber } from '@/lib/utils/format';
import { COLORS, ICON_SIZES } from '@/constants/theme';

interface StarDisplayProps {
  count: number;
}

export const StarDisplay: React.FC<StarDisplayProps> = ({ count }) => {
  const scale = useSharedValue(1);

  React.useEffect(() => {
    // Animate when count changes
    scale.value = withDelay(
      100,
      withSpring(1.2, {}, () => {
        scale.value = withSpring(1);
      })
    );
  }, [count]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View
      style={animatedStyle}
      className="flex-row items-center bg-sunshine-500 px-4 py-2 rounded-full"
    >
      <Icon name="star" size={ICON_SIZES.medium} color={COLORS.white} />
      <Typography variant="button" color="white" className="ml-2">
        {formatCompactNumber(count)}
      </Typography>
    </Animated.View>
  );
};
