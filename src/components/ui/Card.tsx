import React from 'react';
import { Pressable, View, PressableProps, ViewProps } from 'react-native';

interface CardProps extends Omit<PressableProps, 'children'> {
  children: React.ReactNode;
  variant?: 'elevated' | 'outlined' | 'filled';
  padding?: 'none' | 'small' | 'medium' | 'large';
  onPress?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'elevated',
  padding = 'medium',
  onPress,
  className,
  ...props
}) => {
  const variantStyles = {
    elevated: 'bg-white shadow-md',
    outlined: 'bg-transparent border-2 border-gray-200',
    filled: 'bg-background-light',
  };

  const paddingStyles = {
    none: '',
    small: 'p-sm',
    medium: 'p-md',
    large: 'p-lg',
  };

  const Component = onPress ? Pressable : View;

  return (
    <Component
      className={`
        ${variantStyles[variant]}
        ${paddingStyles[padding]}
        rounded-xl
        ${onPress ? 'active:opacity-80' : ''}
        ${className || ''}
      `}
      onPress={onPress}
      {...(props as any)}
    >
      {children}
    </Component>
  );
};
