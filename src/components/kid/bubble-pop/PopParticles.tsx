import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';

interface Particle {
  id: number;
  angle: number;
  distance: number;
  color: string;
  size: number;
}

interface PopParticlesProps {
  x: number;
  y: number;
  color: string;
  onComplete: () => void;
}

const PARTICLE_COUNT = 8;

export const PopParticles: React.FC<PopParticlesProps> = ({ x, y, color, onComplete }) => {
  const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    id: i,
    angle: (360 / PARTICLE_COUNT) * i,
    distance: 40 + Math.random() * 30,
    color,
    size: 8 + Math.random() * 6,
  }));

  useEffect(() => {
    // Auto-remove after animation completes
    const timer = setTimeout(onComplete, 600);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <View
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: 0,
        height: 0,
      }}
    >
      {particles.map((particle) => (
        <ParticleItem key={particle.id} particle={particle} />
      ))}
    </View>
  );
};

const ParticleItem: React.FC<{ particle: Particle }> = ({ particle }) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  useEffect(() => {
    const radians = (particle.angle * Math.PI) / 180;
    const endX = Math.cos(radians) * particle.distance;
    const endY = Math.sin(radians) * particle.distance;

    translateX.value = withTiming(endX, {
      duration: 500,
      easing: Easing.out(Easing.quad),
    });

    translateY.value = withTiming(endY, {
      duration: 500,
      easing: Easing.out(Easing.quad),
    });

    scale.value = withTiming(0, {
      duration: 500,
      easing: Easing.in(Easing.quad),
    });

    opacity.value = withDelay(
      200,
      withTiming(0, {
        duration: 300,
      })
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          width: particle.size,
          height: particle.size,
          borderRadius: particle.size / 2,
          backgroundColor: particle.color,
        },
        animatedStyle,
      ]}
    />
  );
};
