import React, { useEffect, useState } from 'react';
import { View, Animated } from 'react-native';
import { Typography } from '@/components/ui';
import { useTranslation } from '@/hooks/useTranslation';

export function RewardAnimation() {
  const { t } = useTranslation();
  const [scaleAnim] = useState(new Animated.Value(0));
  const [opacityAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    // Entrance animation: scale up
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        tension: 40,
        useNativeDriver: true,
      }),
      // Hold for a moment
      Animated.delay(2000),
      // Exit animation: fade out
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View
      className="absolute inset-0 items-center justify-center"
      style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
      pointerEvents="none"
    >
      <Animated.View
        style={{
          transform: [{ scale: scaleAnim }],
          opacity: opacityAnim,
        }}
        className="bg-white rounded-3xl p-xl items-center shadow-2xl"
      >
        {/* Celebration Stars */}
        <View className="flex-row gap-sm mb-md">
          <Typography className="text-6xl">⭐</Typography>
          <Typography className="text-6xl">🎉</Typography>
          <Typography className="text-6xl">⭐</Typography>
        </View>

        {/* Reward Message */}
        <Typography variant="h3" color="primary" center className="mb-sm">
          {t('kid.rewards.greatJob')}
        </Typography>

        <Typography variant="button" color="medium" center>
          {t('kid.rewards.keepGoing')}
        </Typography>

        {/* Fun Characters */}
        <View className="flex-row gap-md mt-md">
          <Typography className="text-5xl">🎈</Typography>
          <Typography className="text-5xl">🌟</Typography>
          <Typography className="text-5xl">🎈</Typography>
        </View>
      </Animated.View>
    </View>
  );
}
