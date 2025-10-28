export const COLORS = {
  primary: '#4A90E2',
  sunshine: '#FFD166',
  grass: '#06D6A0',
  coral: '#EF476F',
  lavender: '#9B89B3',
  background: '#F7F9FC',
  white: '#FFFFFF',
  textDark: '#2D3748',
  textMedium: '#4A5568',
  textLight: '#718096',
  success: '#48BB78',
  warning: '#F6AD55',
  error: '#FC8181',
} as const;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
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
} as const;

export const BORDER_RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

// Minimum touch target size for kids (in dp/pt)
export const TOUCH_TARGET = {
  min: 60,
  comfortable: 80,
  large: 100,
} as const;
