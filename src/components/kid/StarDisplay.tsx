import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from '@/components/ui/Icon';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withDelay,
} from 'react-native-reanimated';

import { formatCompactNumber } from '@/lib/utils/format';

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
      <Icon name="star" size={24} color="white" />
      <Text
        className="text-xl text-white ml-2"
        style={{ fontFamily: 'Quicksand_700Bold' }}
      >
        {formatCompactNumber(count)}
      </Text>
    </Animated.View>
  );
};
