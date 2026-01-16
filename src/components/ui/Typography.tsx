import React from 'react';
import { Text as RNText, TextProps as RNTextProps, StyleProp, TextStyle } from 'react-native';
import { FONTS, FONT_SIZES, COLORS } from '@/constants/theme';

/**
 * Typography variants following design system
 * - h1-h4: Headings using Quicksand (playful, kid-friendly)
 * - body-lg/body/body-sm: Body text using Nunito (readable)
 * - caption: Small text for hints/labels
 * - button: Button text styling
 */
export type TypographyVariant =
  | 'h1'      // xxxxxl (48px) - Main titles
  | 'h2'      // xxxxl (36px) - Section titles
  | 'h3'      // xxxl (30px) - Subsection titles
  | 'h4'      // xxl (24px) - Card titles
  | 'body-lg' // lg (18px) - Large body text (kid-friendly minimum)
  | 'body'    // base (16px) - Standard body text
  | 'body-sm' // sm (14px) - Small body text
  | 'caption' // xs (12px) - Labels, hints
  | 'button'; // xl (20px) - Button text

export type TypographyColor =
  | 'dark'    // Primary text (#2D3748)
  | 'medium'  // Secondary text (#4A5568)
  | 'light'   // Tertiary text (#718096)
  | 'white'   // White text
  | 'primary' // Brand primary (#4A90E2)
  | 'success' // Success green (#48BB78)
  | 'warning' // Warning orange (#F6AD55)
  | 'error';  // Error red (#FC8181)

export interface TypographyProps extends Omit<RNTextProps, 'style'> {
  /**
   * Typography variant defining font family, size, and weight
   * @default 'body'
   */
  variant?: TypographyVariant;

  /**
   * Text color from design system
   * @default 'dark'
   */
  color?: TypographyColor;

  /**
   * Center align text
   * @default false
   */
  center?: boolean;

  /**
   * Additional className for NativeWind styling
   */
  className?: string;

  /**
   * Additional inline styles (use sparingly, prefer className)
   */
  style?: StyleProp<TextStyle>;

  /**
   * Children content (text or React nodes)
   */
  children: React.ReactNode;
}

/**
 * Variant style mappings
 * Headings use Quicksand (playful), body text uses Nunito (readable)
 */
const variantStyles: Record<TypographyVariant, { fontFamily: string; fontSize: number }> = {
  h1: {
    fontFamily: FONTS.quicksand.bold,
    fontSize: FONT_SIZES.xxxxxl, // 48px
  },
  h2: {
    fontFamily: FONTS.quicksand.bold,
    fontSize: FONT_SIZES.xxxxl, // 36px
  },
  h3: {
    fontFamily: FONTS.quicksand.semiBold,
    fontSize: FONT_SIZES.xxxl, // 30px
  },
  h4: {
    fontFamily: FONTS.quicksand.semiBold,
    fontSize: FONT_SIZES.xxl, // 24px
  },
  'body-lg': {
    fontFamily: FONTS.nunito.regular,
    fontSize: FONT_SIZES.lg, // 18px - Kid-friendly minimum
  },
  body: {
    fontFamily: FONTS.nunito.regular,
    fontSize: FONT_SIZES.base, // 16px
  },
  'body-sm': {
    fontFamily: FONTS.nunito.regular,
    fontSize: FONT_SIZES.sm, // 14px
  },
  caption: {
    fontFamily: FONTS.nunito.regular,
    fontSize: FONT_SIZES.xs, // 12px
  },
  button: {
    fontFamily: FONTS.quicksand.bold,
    fontSize: FONT_SIZES.xl, // 20px
  },
};

/**
 * Color mappings from design system
 */
const colorStyles: Record<TypographyColor, string> = {
  dark: COLORS.text.dark,
  medium: COLORS.text.medium,
  light: COLORS.text.light,
  white: COLORS.white,
  primary: COLORS.primary,
  success: COLORS.success,
  warning: COLORS.warning,
  error: COLORS.error,
};

/**
 * Typography component for consistent text styling across the app
 *
 * @example
 * ```tsx
 * <Typography variant="h1" color="primary" center>
 *   Welcome!
 * </Typography>
 *
 * <Typography variant="body-lg" color="dark">
 *   This is kid-friendly body text at 18px minimum.
 * </Typography>
 *
 * <Typography variant="caption" color="medium">
 *   Hint text
 * </Typography>
 * ```
 */
export const Typography: React.FC<TypographyProps> = ({
  variant = 'body',
  color = 'dark',
  center = false,
  className = '',
  style,
  children,
  ...rest
}) => {
  const variantStyle = variantStyles[variant];
  const colorStyle = colorStyles[color];

  return (
    <RNText
      className={`${center ? 'text-center' : ''} ${className}`}
      style={[
        {
          fontFamily: variantStyle.fontFamily,
          fontSize: variantStyle.fontSize,
          color: colorStyle,
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </RNText>
  );
};

/**
 * Convenience components for common use cases
 */
export const Heading1: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="h1" {...props} />
);

export const Heading2: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="h2" {...props} />
);

export const Heading3: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="h3" {...props} />
);

export const Heading4: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="h4" {...props} />
);

export const BodyText: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="body-lg" {...props} />
);

export const Caption: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="caption" {...props} />
);
