import React, { useState } from 'react';
import { Image, ImageProps, View, StyleSheet } from 'react-native';
import { Typography } from './Typography';
import { COLORS } from '@/constants/theme';

interface ImageWithFallbackProps extends Omit<ImageProps, 'source'> {
  /**
   * Image source (URL string or local require number)
   */
  uri: string | number;

  /**
   * Emoji to show as fallback when image fails to load
   */
  fallbackEmoji?: string;

  /**
   * Text to show as fallback when image fails to load (if no emoji)
   */
  fallbackText?: string;

  /**
   * Custom fallback component
   */
  fallbackComponent?: React.ReactNode;

  /**
   * Show loading state
   */
  showLoading?: boolean;
}

/**
 * Image component with automatic fallback handling
 * Shows emoji or text placeholder when image fails to load
 */
export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  uri,
  fallbackEmoji,
  fallbackText,
  fallbackComponent,
  showLoading = false,
  style,
  ...imageProps
}) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = () => {
    setImageError(true);
    setIsLoading(false);
  };

  const handleLoadEnd = () => {
    setIsLoading(false);
  };

  // Determine source object based on uri type
  const source = typeof uri === 'string' ? { uri } : uri;

  // Show fallback if image failed to load
  if (imageError) {
    if (fallbackComponent) {
      return <>{fallbackComponent}</>;
    }

    return (
      <View
        style={[
          styles.fallbackContainer,
          style,
        ]}
      >
        {fallbackEmoji ? (
          <Typography
            variant="h1"
            center
            style={{ fontSize: 80 }}
          >
            {fallbackEmoji}
          </Typography>
        ) : (
          <View className="items-center justify-center">
            <Typography
              variant="h4"
              color="medium"
              center
            >
              📷
            </Typography>
            {fallbackText && (
              <Typography
                variant="body-sm"
                color="medium"
                center
                className="mt-2"
              >
                {fallbackText}
              </Typography>
            )}
          </View>
        )}
      </View>
    );
  }

  // Show loading state
  if (showLoading && isLoading) {
    return (
      <View style={[styles.loadingContainer, style]}>
        <Typography variant="h3" center>
          ⏳
        </Typography>
      </View>
    );
  }

  // Render image
  return (
    <Image
      source={source}
      onError={handleError}
      onLoadEnd={handleLoadEnd}
      style={style}
      {...imageProps}
    />
  );

};

const styles = StyleSheet.create({
  fallbackContainer: {
    backgroundColor: COLORS.background.light,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    backgroundColor: COLORS.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
});
