import React, { useEffect, useState } from 'react';
import { View, Text, Animated } from 'react-native';
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
          <Text className="text-6xl">⭐</Text>
          <Text className="text-6xl">🎉</Text>
          <Text className="text-6xl">⭐</Text>
        </View>

        {/* Reward Message */}
        <Text
          className="text-3xl text-primary-500 text-center mb-sm"
          style={{ fontFamily: 'Quicksand_700Bold' }}
        >
          {t('kid.rewards.greatJob')}
        </Text>

        <Text
          className="text-xl text-text-medium text-center"
          style={{ fontFamily: 'Nunito_600SemiBold' }}
        >
          {t('kid.rewards.keepGoing')}
        </Text>

        {/* Fun Characters */}
        <View className="flex-row gap-md mt-md">
          <Text className="text-5xl">🎈</Text>
          <Text className="text-5xl">🌟</Text>
          <Text className="text-5xl">🎈</Text>
        </View>
      </Animated.View>
    </View>
  );
}
