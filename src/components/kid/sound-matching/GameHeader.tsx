import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { StarDisplay } from '@/components/kid/StarDisplay';
import { Icon } from '@/components/ui/Icon';

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

      {/* Progress indicator */}
      <View className="flex-1 items-center mx-4">
        <Text
          className="text-sm text-text-medium mb-2"
          style={{ fontFamily: 'Nunito_600SemiBold' }}
        >
          Round {currentRound} of {totalRounds}
        </Text>

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
        <StarDisplay count={score} size="small" />
      </View>
    </View>
  );
};
