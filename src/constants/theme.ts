/**
 * Comprehensive theme configuration for the Logoped app
 * Use these constants instead of hardcoded values for consistency
 */

// ============================================================================
// COLORS
// ============================================================================

export const COLORS = {
  // Primary brand colors
  primary: '#4A90E2',      // Sky blue - main brand
  sunshine: '#FFD166',     // Yellow - stars, rewards
  grass: '#06D6A0',        // Green - success, nature
  coral: '#EF476F',        // Pink - accents, highlights
  lavender: '#9B89B3',     // Purple - variety, calm

  // Background colors
  background: {
    light: '#F7F9FC',      // Main background
    white: '#FFFFFF',      // Cards, containers
  },

  // Text colors
  text: {
    dark: '#2D3748',       // Primary text
    medium: '#4A5568',     // Secondary text
    light: '#718096',      // Tertiary text, hints
  },

  // Feedback colors
  success: '#48BB78',      // Success states
  warning: '#F6AD55',      // Warning states
  error: '#FC8181',        // Error states

  // Utility colors
  white: '#FFFFFF',
  gray: {
    100: '#F7FAFC',
    200: '#EDF2F7',
    300: '#E2E8F0',
    400: '#CBD5E0',
    500: '#A0AEC0',
    600: '#718096',
    700: '#4A5568',
    800: '#2D3748',
    900: '#1A202C',
  },

  // Locked/disabled states
  disabled: '#E0E0E0',
  lockedIcon: '#999999',
} as const;

// ============================================================================
// TYPOGRAPHY
// ============================================================================

export const FONTS = {
  // Quicksand - Playful, kid-friendly (headings)
  quicksand: {
    light: 'Quicksand_300Light',
    regular: 'Quicksand_400Regular',
    medium: 'Quicksand_500Medium',
    semiBold: 'Quicksand_600SemiBold',
    bold: 'Quicksand_700Bold',
  },

  // Nunito - Readable (body text)
  nunito: {
    regular: 'Nunito_400Regular',
    semiBold: 'Nunito_600SemiBold',
    bold: 'Nunito_700Bold',
  },
} as const;

export const FONT_SIZES = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 30,
  xxxxl: 36,
  xxxxxl: 48,
} as const;

// ============================================================================
// SPACING
// ============================================================================

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
} as const;

// ============================================================================
// BORDER RADIUS
// ============================================================================

export const BORDER_RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  full: 9999,
} as const;

// ============================================================================
// BUTTON SIZES (for kid-friendly touch targets)
// ============================================================================

export const BUTTON_SIZES = {
  small: 48,        // Minimum for kids
  medium: 56,       // Standard for header buttons
  large: 64,        // Back buttons, primary actions
  extraLarge: 80,   // Main game buttons
} as const;

// Minimum touch target size for kids (in dp/pt)
export const TOUCH_TARGET = {
  min: 60,
  comfortable: 80,
  large: 100,
} as const;

// ============================================================================
// ICON SIZES
// ============================================================================

export const ICON_SIZES = {
  small: 20,
  medium: 24,
  large: 28,
  extraLarge: 40,
  huge: 64,
} as const;

// ============================================================================
// ANIMATION DURATIONS
// ============================================================================

export const ANIMATION = {
  fast: 150,
  normal: 300,
  slow: 500,
} as const;

// ============================================================================
// COMPLETE THEME OBJECT
// ============================================================================

export const theme = {
  colors: COLORS,
  fonts: FONTS,
  fontSizes: FONT_SIZES,
  spacing: SPACING,
  borderRadius: BORDER_RADIUS,
  buttonSizes: BUTTON_SIZES,
  touchTarget: TOUCH_TARGET,
  iconSizes: ICON_SIZES,
  animation: ANIMATION,
} as const;

export default theme;
