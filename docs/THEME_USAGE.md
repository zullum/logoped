# Theme Usage Guide

This document explains how to use the centralized theme system in the Logoped app.

## Overview

All colors, fonts, sizes, and spacing should use the theme constants from `@/constants/theme` instead of hardcoded values. This ensures consistency across the app and makes it easier to maintain and update the design system.

## Importing the Theme

```typescript
import { COLORS, FONTS, BUTTON_SIZES, ICON_SIZES, SPACING, BORDER_RADIUS, ANIMATION } from '@/constants/theme';
```

## Available Theme Constants

### Colors

#### Brand Colors
```typescript
COLORS.primary      // '#4A90E2' - Sky blue (main brand)
COLORS.sunshine     // '#FFD166' - Yellow (stars, rewards)
COLORS.grass        // '#06D6A0' - Green (success, nature)
COLORS.coral        // '#EF476F' - Pink (accents, highlights)
COLORS.lavender     // '#9B89B3' - Purple (variety, calm)
```

#### Background Colors
```typescript
COLORS.background.light  // '#F7F9FC' - Main background
COLORS.background.white  // '#FFFFFF' - Cards, containers
COLORS.white             // '#FFFFFF' - Utility white
```

#### Text Colors
```typescript
COLORS.text.dark    // '#2D3748' - Primary text
COLORS.text.medium  // '#4A5568' - Secondary text
COLORS.text.light   // '#718096' - Tertiary text, hints
```

#### Feedback Colors
```typescript
COLORS.success      // '#48BB78' - Success states
COLORS.warning      // '#F6AD55' - Warning states
COLORS.error        // '#FC8181' - Error states
```

#### Utility Colors
```typescript
COLORS.gray[100-900]  // Gray scale
COLORS.disabled       // '#E0E0E0' - Disabled states
COLORS.lockedIcon     // '#999999' - Locked icon color
```

### Typography

#### Font Families
```typescript
// Quicksand - Playful, kid-friendly (headings)
FONTS.quicksand.light      // 'Quicksand_300Light'
FONTS.quicksand.regular    // 'Quicksand_400Regular'
FONTS.quicksand.medium     // 'Quicksand_500Medium'
FONTS.quicksand.semiBold   // 'Quicksand_600SemiBold'
FONTS.quicksand.bold       // 'Quicksand_700Bold'

// Nunito - Readable (body text)
FONTS.nunito.regular       // 'Nunito_400Regular'
FONTS.nunito.semiBold      // 'Nunito_600SemiBold'
FONTS.nunito.bold          // 'Nunito_700Bold'
```

#### Font Sizes
```typescript
FONT_SIZES.xs       // 12
FONT_SIZES.sm       // 14
FONT_SIZES.base     // 16
FONT_SIZES.lg       // 18
FONT_SIZES.xl       // 20
FONT_SIZES.xxl      // 24
FONT_SIZES.xxxl     // 30
FONT_SIZES.xxxxl    // 36
FONT_SIZES.xxxxxl   // 48
```

### Spacing
```typescript
SPACING.xs    // 4
SPACING.sm    // 8
SPACING.md    // 16
SPACING.lg    // 24
SPACING.xl    // 32
SPACING.xxl   // 48
SPACING.xxxl  // 64
```

### Border Radius
```typescript
BORDER_RADIUS.sm    // 8
BORDER_RADIUS.md    // 12
BORDER_RADIUS.lg    // 16
BORDER_RADIUS.xl    // 24
BORDER_RADIUS.xxl   // 32
BORDER_RADIUS.full  // 9999
```

### Button Sizes (for kid-friendly touch targets)
```typescript
BUTTON_SIZES.small       // 48 - Minimum for kids
BUTTON_SIZES.medium      // 56 - Standard for header buttons
BUTTON_SIZES.large       // 64 - Back buttons, primary actions
BUTTON_SIZES.extraLarge  // 80 - Main game buttons
```

### Icon Sizes
```typescript
ICON_SIZES.small       // 20
ICON_SIZES.medium      // 24
ICON_SIZES.large       // 28
ICON_SIZES.extraLarge  // 40
ICON_SIZES.huge        // 64
```

### Animation Durations
```typescript
ANIMATION.fast    // 150ms
ANIMATION.normal  // 300ms
ANIMATION.slow    // 500ms
```

## Usage Examples

### Before (Hardcoded) ❌
```typescript
<View
  style={{
    backgroundColor: '#4A90E2',
    borderRadius: 16,
    padding: 24,
  }}
>
  <Text style={{ fontFamily: 'Quicksand_700Bold', color: '#2D3748' }}>
    Hello
  </Text>
</View>
```

### After (Using Theme) ✅
```typescript
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from '@/constants/theme';

<View
  style={{
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
  }}
>
  <Text style={{ fontFamily: FONTS.quicksand.bold, color: COLORS.text.dark }}>
    Hello
  </Text>
</View>
```

### Button Example
```typescript
import { COLORS, BUTTON_SIZES, FONTS } from '@/constants/theme';

<Pressable
  style={{
    width: BUTTON_SIZES.large,
    height: BUTTON_SIZES.large,
    backgroundColor: COLORS.grass,
    borderRadius: BORDER_RADIUS.full,
  }}
>
  <Text style={{ fontFamily: FONTS.quicksand.bold, color: COLORS.white }}>
    Tap Me
  </Text>
</Pressable>
```

### Icon with Theme Colors
```typescript
import { COLORS, ICON_SIZES } from '@/constants/theme';

<Icon
  name="star"
  size={ICON_SIZES.medium}
  color={COLORS.sunshine}
/>
```

### Animation with Theme Durations
```typescript
import { ANIMATION } from '@/constants/theme';

rotate.value = withTiming(360, { duration: ANIMATION.normal });
```

## Migration Checklist

When updating components to use the theme:

1. ✅ **Import theme constants** at the top of the file
2. ✅ **Replace hardcoded colors** with `COLORS.*`
3. ✅ **Replace hardcoded font families** with `FONTS.*`
4. ✅ **Replace hardcoded sizes** with appropriate size constants
5. ✅ **Replace magic numbers** for spacing with `SPACING.*`
6. ✅ **Test** that the component still looks and behaves correctly

## Finding Hardcoded Values

To find hardcoded values in the codebase:

```bash
# Find hardcoded colors (hex codes)
grep -r "#[0-9A-Fa-f]\{6\}" src/

# Find hardcoded font families
grep -r "Quicksand_\|Nunito_" src/

# Find hardcoded sizes (common patterns)
grep -r "size={[0-9]\+}" src/
```

## Benefits of Using the Theme

1. **Consistency**: All components use the same colors and styles
2. **Maintainability**: Change colors/fonts in one place to update everywhere
3. **Readability**: `COLORS.primary` is clearer than `'#4A90E2'`
4. **Type Safety**: TypeScript autocomplete and error checking
5. **Scalability**: Easy to add new colors or update existing ones
6. **Accessibility**: Ensures consistent sizing for kid-friendly touch targets

## Best Practices

### ✅ DO:
- Use theme constants for all colors, fonts, and sizes
- Use semantic names (e.g., `COLORS.success` instead of `COLORS.green`)
- Add new colors to the theme if needed instead of hardcoding

### ❌ DON'T:
- Hardcode hex color values
- Hardcode font family strings
- Use magic numbers for sizes or spacing
- Create one-off color variations

## Tailwind CSS Integration

The theme is also integrated with NativeWind/Tailwind CSS. You can use className props:

```typescript
// These map to theme colors
<View className="bg-primary-500 text-white p-lg rounded-xl">
  <Text className="text-2xl font-quicksand-bold">
    Hello
  </Text>
</View>
```

However, for **non-Tailwind properties** (like font families in style prop), always use the theme constants:

```typescript
// CORRECT ✅
<Text className="text-2xl" style={{ fontFamily: FONTS.quicksand.bold }}>

// WRONG ❌
<Text className="text-2xl" style={{ fontFamily: 'Quicksand_700Bold' }}>
```

## Questions?

If you need a color, size, or style that doesn't exist in the theme:
1. Check if it can be composed from existing values
2. If it's reusable, add it to `src/constants/theme.ts`
3. Update this documentation
4. Use it consistently throughout the app
