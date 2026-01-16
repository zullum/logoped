import React from 'react';
import { Pressable, ActivityIndicator, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { TOUCH_TARGET } from '@/constants/theme';
import { Typography } from './Typography';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type ButtonVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'ghost' | 'outline';

interface ButtonProps {
  children: string;
  variant?: ButtonVariant;
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
  onPress?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  loading = false,
  fullWidth = false,
  disabled = false,
  className,
  onPress,
}) => {
  // --- 3D "Chunky" Button Logic ---
  if (['primary', 'secondary', 'success', 'warning'].includes(variant)) {
    const translateY = useSharedValue(0);
    const pressDepth = size === 'large' ? 8 : 6;

    const variantStyles3D = {
      primary: { top: 'bg-primary-500', bottom: 'bg-primary-700', text: 'text-white' },
      secondary: { top: 'bg-sunshine-500', bottom: 'bg-sunshine-600', text: 'text-text-dark' },
      success: { top: 'bg-grass-500', bottom: 'bg-grass-600', text: 'text-white' },
      warning: { top: 'bg-coral-500', bottom: 'bg-coral-600', text: 'text-white' },
    };

    const sizeStyles3D = {
      medium: { container: `min-h-[${TOUCH_TARGET.min}px]`, padding: 'px-6 py-3', textSize: 'text-xl' },
      large: { container: `min-h-[${TOUCH_TARGET.comfortable}px]`, padding: 'px-8 py-4', textSize: 'text-2xl' },
    };

    const styles = variantStyles3D[variant as 'primary' | 'secondary' | 'success' | 'warning'];
    const sizing = sizeStyles3D[size as 'medium' | 'large'];

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ translateY: translateY.value }],
    }));

    const handlePressIn = () => {
      translateY.value = withSpring(pressDepth, { damping: 15 });
    };
    const handlePressOut = () => {
      translateY.value = withSpring(0, { damping: 15 });
    };

    return (
      <View
        className={`
          ${styles.bottom}
          ${fullWidth ? 'w-full' : ''}
          rounded-3xl
          ${className || ''}
        `}
        style={{ opacity: disabled || loading ? 0.6 : 1 }}
      >
        <AnimatedPressable
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          disabled={disabled || loading}
          style={[{ transform: [{ translateY: -pressDepth }] }, animatedStyle]}
          className={`
            ${styles.top}
            ${sizing.container}
            ${sizing.padding}
            rounded-3xl
            items-center
            justify-center
            border-2
            border-black/10
          `}
        >
          {loading ? (
            <ActivityIndicator color={styles.text === 'text-white' ? '#FFFFFF' : '#2D3748'} />
          ) : (
            <Typography
              variant="button"
              color={styles.text === 'text-white' ? 'white' : 'dark'}
              className={sizing.textSize}
              style={{
                textShadowColor: 'rgba(0, 0, 0, 0.2)',
                textShadowOffset: { width: 0, height: 2 },
                textShadowRadius: 2,
              }}
            >
              {children}
            </Typography>
          )}
        </AnimatedPressable>
      </View>
    );
  }

  // --- Flat Button Logic (for 'ghost' and 'outline') ---
  const variantStylesFlat = {
    outline: 'border-2 border-primary-500 bg-transparent active:bg-primary-50',
    ghost: 'bg-transparent active:bg-primary-50',
  };

  const sizeStylesFlat = {
    small: 'px-4 py-2',
    medium: `px-6 py-3 min-h-[${TOUCH_TARGET.min}px]`,
    large: `px-8 py-4 min-h-[${TOUCH_TARGET.comfortable}px]`,
  };

  const textColorStylesFlat = {
    outline: 'text-primary-500',
    ghost: 'text-primary-500',
  };
  
  const textSizeStyles = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      className={`
        ${variantStylesFlat[variant as 'outline' | 'ghost']}
        ${sizeStylesFlat[size as 'small' | 'medium' | 'large']}
        ${fullWidth ? 'w-full' : ''}
        rounded-xl
        items-center
        justify-center
        flex-row
        ${disabled || loading ? 'opacity-50' : ''}
        ${className || ''}
      `}
    >
      {loading ? (
        <ActivityIndicator color="#4A90E2" />
      ) : (
        <Typography
          variant={size === 'large' ? 'body-lg' : 'body'}
          color={variant === 'outline' || variant === 'ghost' ? 'primary' : 'dark'}
          style={{ fontWeight: '600' }}
        >
          {children}
        </Typography>
      )}
    </Pressable>
  );
};
