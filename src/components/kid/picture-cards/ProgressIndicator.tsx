import React from 'react';
import { View, Text } from 'react-native';
import { useTranslation } from '@/hooks/useTranslation';

interface ProgressIndicatorProps {
  current: number;
  total: number;
  practiceCount: number;
}

export function ProgressIndicator({
  current,
  total,
  practiceCount,
}: ProgressIndicatorProps) {
  const { t } = useTranslation();

  const progress = total > 0 ? (current / total) * 100 : 0;

  return (
    <View className="mt-md">
      {/* Progress Bar */}
      <View className="flex-row items-center gap-sm mb-sm">
        <Text
          className="text-sm text-text-medium"
          style={{ fontFamily: 'Nunito_600SemiBold' }}
        >
          {t('kid.pictureCards.progress')}
        </Text>

        <View className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
          <View
            className="h-full bg-grass-500 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </View>

        <Text
          className="text-sm text-text-dark"
          style={{ fontFamily: 'Nunito_700Bold' }}
        >
          {current}/{total}
        </Text>
      </View>

      {/* Practice Count with Stars */}
      <View className="flex-row items-center gap-xs">
        <Text className="text-xl">⭐</Text>
        <Text
          className="text-sm text-text-medium"
          style={{ fontFamily: 'Nunito_400Regular' }}
        >
          {t('kid.pictureCards.wordsPlayed', { count: practiceCount })}
        </Text>
      </View>
    </View>
  );
}
