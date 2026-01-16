import React from 'react';
import { View } from 'react-native';
import { Typography } from '@/components/ui';
import { StarDisplay } from '@/components/kid/StarDisplay';
import { BackButton } from '@/components/kid/BackButton';

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
        {/* Back button */}
        {onClose && <BackButton onPress={onClose} variant="back" size="medium" />}

        {/* Level indicator */}
        <View className="flex-1 items-center mx-4">
          <Typography variant="body-sm" color="medium" className="mb-1">
            Level {level}
          </Typography>

          {/* Progress bar */}
          <View className="w-full max-w-xs">
            <View className="flex-row items-center justify-between mb-1">
              <Typography variant="caption" color="medium">
                {score} / {targetScore}
              </Typography>
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
          <Typography variant="caption" color="medium" className="mb-1">
            Popped
          </Typography>
          <View className="bg-white rounded-full px-3 py-1 shadow-sm">
            <Typography variant="body-lg" className="text-grass-500">
              {bubblesPopped}
            </Typography>
          </View>
        </View>
      </View>
    </View>
  );
};
