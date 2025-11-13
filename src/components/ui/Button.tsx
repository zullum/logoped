import React from 'react';
import { Pressable, Text, ActivityIndicator, PressableProps } from 'react-native';
import { TOUCH_TARGET } from '@/constants/theme';

interface ButtonProps extends Omit<PressableProps, 'children'> {
  children: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  loading = false,
  fullWidth = false,
  disabled,
  className,
  ...props
}) => {
  const variantStyles = {
    primary: 'bg-primary-500 active:bg-primary-600',
    secondary: 'bg-sunshine-500 active:bg-sunshine-600',
    outline: 'border-2 border-primary-500 bg-transparent active:bg-primary-50',
    ghost: 'bg-transparent active:bg-primary-50',
  };

  const sizeStyles = {
    small: 'px-4 py-2',
    medium: `px-6 py-3 min-h-[${TOUCH_TARGET.min}px]`,
    large: `px-8 py-4 min-h-[${TOUCH_TARGET.comfortable}px]`,
  };

  const textColorStyles = {
    primary: 'text-white',
    secondary: 'text-text-dark',
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
      className={`
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${fullWidth ? 'w-full' : ''}
        rounded-xl
        items-center
        justify-center
        ${disabled || loading ? 'opacity-50' : ''}
        ${className || ''}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? '#FFFFFF' : '#4A90E2'} />
      ) : (
        <Text
          className={`
            ${textColorStyles[variant]}
            ${textSizeStyles[size]}
            font-nunito-semibold
          `}
        >
          {children}
        </Text>
      )}
    </Pressable>
  );
};
