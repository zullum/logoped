import React from 'react';
import { Pressable, ActivityIndicator } from 'react-native';
import { Icon } from '@/components/ui/Icon';
import { useAudio } from '@/hooks/useAudio';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

interface AudioPlayerProps {
  audioUri: string;
  audioKey: string;
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

const sizeMap = {
  small: { container: 40, icon: 20 },
  medium: { container: 60, icon: 30 },
  large: { container: 80, icon: 40 },
};

export const AudioPlayerButton: React.FC<AudioPlayerProps> = ({
  audioUri,
  audioKey,
  size = 'medium',
  color = '#4A90E2',
}) => {
  const { play, isPlaying, isLoading } = useAudio(audioKey, audioUri, {
    preload: true,
  });
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = () => {
    scale.value = withSpring(0.9, {}, () => {
      scale.value = withSpring(1);
    });
    play();
  };

  const { container, icon } = sizeMap[size];

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        onPress={handlePress}
        disabled={isLoading || isPlaying}
        style={{
          width: container,
          height: container,
          backgroundColor: color,
          borderRadius: container / 2,
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        {isLoading ? (
          <ActivityIndicator color="white" size="small" />
        ) : (
          <Icon
            name={isPlaying ? 'pause' : 'volume-high'}
            size={icon}
            color="white"
          />
        )}
      </Pressable>
    </Animated.View>
  );
};
