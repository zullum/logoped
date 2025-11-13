import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { StarDisplay } from '@/components/kid/StarDisplay';

interface GameStatsProps {
  score: number;
  targetScore: number;
  bubblesPopped: number;
  level: number;
  onClose?: () => void;
}

export const GameStats: React.FC<GameStatsProps> = ({
  score,
  targetScore,
  bubblesPopped,
  level,
  onClose,
}) => {
  const progress = Math.min((score / targetScore) * 100, 100);

  return (
    <View className="px-6 py-4 bg-background-light">
      <View className="flex-row items-center justify-between">
        {/* Close button */}
        {onClose && (
          <Pressable
            onPress={onClose}
            className="w-12 h-12 items-center justify-center bg-white rounded-full shadow-sm"
            accessibilityLabel="Close game"
            accessibilityRole="button"
          >
            <Text className="text-2xl text-text-medium">✕</Text>
          </Pressable>
        )}

        {/* Level indicator */}
        <View className="flex-1 items-center mx-4">
          <Text
            className="text-sm text-text-medium mb-1"
            style={{ fontFamily: 'Nunito_600SemiBold' }}
          >
            Level {level}
          </Text>

          {/* Progress bar */}
          <View className="w-full max-w-xs">
            <View className="flex-row items-center justify-between mb-1">
              <Text
                className="text-xs text-text-medium"
                style={{ fontFamily: 'Nunito_400Regular' }}
              >
                {score} / {targetScore}
              </Text>
            </View>
            <View className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <View
                className="h-full bg-grass-500 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </View>
          </View>
        </View>

        {/* Score display */}
        <View className="items-center">
          <Text
            className="text-xs text-text-medium mb-1"
            style={{ fontFamily: 'Nunito_400Regular' }}
          >
            Popped
          </Text>
          <View className="bg-white rounded-full px-3 py-1 shadow-sm">
            <Text
              className="text-lg text-grass-500"
              style={{ fontFamily: 'Quicksand_700Bold' }}
            >
              {bubblesPopped}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
