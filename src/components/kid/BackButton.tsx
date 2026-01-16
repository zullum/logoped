import React from 'react';
import { Pressable, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { Icon } from '@/components/ui';
import { COLORS, TOUCH_TARGET } from '@/constants/theme';

interface BackButtonProps {
  onPress: () => void;
  variant?: 'home' | 'back';
  size?: 'medium' | 'large';
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const BackButton: React.FC<BackButtonProps> = ({
  onPress,
  variant = 'back',
  size = 'medium',
}) => {
  const translateY = useSharedValue(0);
  const pressDepth = 4;

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const handlePressIn = () => {
    translateY.value = withSpring(pressDepth, { damping: 15 });
  };

  const handlePressOut = () => {
    translateY.value = withSpring(0, { damping: 15 });
  };

  // Size configuration
  const sizeConfig = {
    medium: { size: 52, iconSize: 28 }, // Slightly larger for the toy look
    large: { size: 64, iconSize: 32 },
  };
  
  const { size: buttonSize, iconSize } = sizeConfig[size];

  // Colors based on variant - Toy Palette
  const colors = variant === 'home' 
    ? { top: COLORS.primary, bottom: '#2A69AC', icon: 'white' } // Blue
    : { top: COLORS.coral, bottom: '#C0395A', icon: 'white' }; // Pink/Red

  return (
    <View
      style={{
        height: buttonSize,
        width: buttonSize,
        borderRadius: buttonSize / 2,
        backgroundColor: colors.bottom,
        // Add a subtle shadow for the whole button
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 5,
      }}
    >
      <AnimatedPressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        accessibilityLabel={variant === 'home' ? 'Go home' : 'Go back'}
        accessibilityRole="button"
        style={[
          animatedStyle,
          {
            height: buttonSize,
            width: buttonSize,
            borderRadius: buttonSize / 2,
            backgroundColor: colors.top,
            alignItems: 'center',
            justifyContent: 'center',
            transform: [{ translateY: -pressDepth }],
            // Thick white border for the sticker/toy look
            borderWidth: 4,
            borderColor: 'white',
          },
        ]}
      >
        <Icon 
          name={variant === 'home' ? 'home' : 'arrow-back'} 
          size={iconSize} 
          color={colors.icon} 
        />
      </AnimatedPressable>
    </View>
  );
};
