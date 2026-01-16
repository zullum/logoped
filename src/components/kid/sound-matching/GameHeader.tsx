import React from 'react';
import { View } from 'react-native';
import { Typography } from '@/components/ui';
import { StarDisplay } from '@/components/kid/StarDisplay';
import { BackButton } from '@/components/kid/BackButton';

interface GameHeaderProps {
  currentRound: number;
  totalRounds: number;
  score: number;
  onClose?: () => void;
}

export const GameHeader: React.FC<GameHeaderProps> = ({
  currentRound,
  totalRounds,
  score,
  onClose,
}) => {
  return (
    <View className="flex-row items-center justify-between px-6 py-4 bg-background-light">
      {/* Back button */}
      {onClose && <BackButton onPress={onClose} variant="back" />}

      {/* Progress indicator */}
      <View className="flex-1 items-center mx-4">
        <Typography variant="body-sm" color="medium" className="mb-2">
          Round {currentRound} of {totalRounds}
        </Typography>

        {/* Progress bar */}
        <View className="w-full max-w-xs h-3 bg-gray-200 rounded-full overflow-hidden">
          <View
            className="h-full bg-primary-500 rounded-full"
            style={{ width: `${(currentRound / totalRounds) * 100}%` }}
          />
        </View>
      </View>

      {/* Score display */}
      <View className="items-center">
        <StarDisplay count={score} />
      </View>
    </View>
  );
};
