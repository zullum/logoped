# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Logoped is a speech therapy mobile app for children aged 3-7, built with Expo, React Native, TypeScript, and NativeWind. The app provides interactive, game-based learning experiences using proven speech therapy techniques.

**Tech Stack:**
- **Framework**: Expo SDK 54 with React Native 0.81 and React 19.1
- **Routing**: Expo Router (file-based)
- **Styling**: NativeWind v4 (Tailwind CSS for React Native)
- **Language**: TypeScript with strict mode
- **Package Manager**: npm (standard node_modules)

## Critical Package Version Constraints

⚠️ **React Native Reanimated**: Must use v4.1.1+ (v4.x)
- Reason: This project has New Architecture enabled (`"newArchEnabled": true` in app.json)
- NativeWind v4 with New Architecture requires Reanimated v4.x
- Install: `npx expo install react-native-reanimated`

⚠️ **React Version**: Must use React 19.1.0 with Expo SDK 54
- react@19.1.0
- react-dom@19.1.0
- @types/react@~19.1.0
- @types/react-dom@~19.1.0

## Common Development Commands

### Running the App
```bash
# Start development server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Run web version
npm run web
```

### Type Checking
```bash
# Run TypeScript type checking
npm run typecheck
```

### Package Management
```bash
# Install dependencies
npm install

# Add a new package (use expo install for expo packages)
npx expo install <package-name>

# Check for outdated packages
npx expo install --check

# Fix package versions to match SDK
npx expo install --fix

# Add non-Expo package
npm install <package-name>
```

## Project Architecture

### Directory Structure

```
/logoped-app
├── /app                    # Expo Router pages (file-based routing)
│   ├── index.tsx          # Home/entry screen
│   └── _layout.tsx        # Root layout with fonts and navigation
├── /src
│   ├── /constants         # Design tokens (theme.ts)
│   └── /hooks            # Custom hooks (useFonts.ts)
├── /assets               # Images, audio, animations, fonts
├── global.css           # NativeWind global styles
├── tailwind.config.js   # Tailwind design system config
└── metro.config.js      # Metro bundler with NativeWind
```

### Planned Structure (Per TECHNICAL_PLAN.md)
```
/src
├── /components
│   ├── /kid              # Kid-friendly components
│   ├── /parent           # Parent dashboard components
│   ├── /shared           # Reusable components
│   └── /ui               # Base UI components
├── /features             # Feature-based modules
│   ├── /words
│   ├── /activities
│   ├── /progress
│   └── /rewards
├── /lib
│   ├── /api              # React Query client
│   ├── /audio            # Audio utilities
│   ├── /storage          # AsyncStorage/MMKV
│   └── /utils            # Helper functions
├── /types                # TypeScript definitions
└── /hooks                # Custom React hooks
```

### TypeScript Path Aliases

Configured in `tsconfig.json`:
- `@/*` → `./src/*`
- `@components/*` → `./src/components/*`
- `@features/*` → `./src/features/*`
- `@lib/*` → `./src/lib/*`
- `@hooks/*` → `./src/hooks/*`
- `@types/*` → `./src/types/*`
- `@constants/*` → `./src/constants/*`
- `@assets/*` → `./assets/*`

## Design System

### Colors (Tailwind/NativeWind)

Available through `className` prop:
- **Primary**: `bg-primary-500`, `text-primary-500` (Sky Blue #4A90E2)
- **Sunshine**: `bg-sunshine-500` (Yellow #FFD166)
- **Grass**: `bg-grass-500` (Green #06D6A0)
- **Coral**: `bg-coral-500` (Pink #EF476F)
- **Lavender**: `bg-lavender-500` (Purple #9B89B3)
- **Background**: `bg-background-light` (#F7F9FC)
- **Text**: `text-text-dark`, `text-text-medium`, `text-text-light`

Also available as constants in `src/constants/theme.ts` for non-Tailwind usage.

### Typography

Two font families loaded via `@expo-google-fonts`:
- **Quicksand**: Headings, playful elements (300, 400, 500, 600, 700 weights)
- **Nunito**: Body text, readable content (400, 600, 700 weights)

Usage:
```tsx
<Text
  className="text-2xl text-primary-500"
  style={{ fontFamily: 'Quicksand_700Bold' }}
>
  Heading
</Text>
```

### Child-Friendly Design Requirements
- **Touch targets**: Minimum 60x60dp (prefer 80x80dp for kids)
- **Font sizes**: Minimum 18px for children's content
- **Animations**: Smooth 300-500ms, bouncy/joyful, skippable
- **Colors**: Bright, engaging, high contrast
- **Icons**: Large, simple, bold illustrations

## Key Technical Patterns

### Expo Router Navigation
File-based routing in `/app` directory:
- `app/index.tsx` → `/`
- `app/about.tsx` → `/about`
- `app/(tabs)/home.tsx` → `/home` (with layout)
- `app/_layout.tsx` → Root layout component

Navigation:
```tsx
import { useRouter } from 'expo-router';

const router = useRouter();
router.push('/screen-name');
```

### NativeWind Styling
Use Tailwind classes via `className` prop:
```tsx
<View className="flex-1 bg-background-light p-md">
  <Text className="text-2xl text-primary-500 font-quicksand-bold">
    Title
  </Text>
</View>
```

Custom font weights via inline `style` (NativeWind limitation):
```tsx
<Text
  className="text-lg"
  style={{ fontFamily: 'Nunito_600SemiBold' }}
>
  Text
</Text>
```

### Font Loading Pattern
Fonts must be loaded before rendering (see `app/_layout.tsx`):
```tsx
import { useFonts } from '@/hooks/useFonts';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

const { loaded, error } = useFonts();

useEffect(() => {
  if (loaded || error) {
    SplashScreen.hideAsync();
  }
}, [loaded, error]);

if (!loaded && !error) return null;
```

## Planned Future Stack (Not Yet Implemented)

Per TECHNICAL_PLAN.md, these will be added:
- **State Management**: TanStack Query v5 (server state) + Zustand (local state)
- **Storage**: MMKV for persistent data
- **i18n**: i18next + react-i18next (multi-language support)
- **Audio**: expo-audio (SDK 53+) or expo-av (SDK 52 and below)
- **Animations**: React Native Reanimated v4 + Lottie
- **Analytics**: Expo Analytics or Firebase Analytics
- **Error Tracking**: Sentry

## Development Guidelines

### Component Creation
- Use functional components with TypeScript
- Props should be strongly typed with interfaces
- Use `className` for styles (NativeWind), `style` only for fonts or platform-specific
- Keep components small and focused (single responsibility)
- Child-facing components must have large touch targets (60dp+)

### File Naming
- Components: PascalCase (`ButtonPrimary.tsx`)
- Hooks: camelCase with `use` prefix (`useAudioPlayer.ts`)
- Utils: camelCase (`formatProgress.ts`)
- Types: PascalCase (`UserProfile.ts`)
- Constants: UPPER_SNAKE_CASE exports

### TypeScript
- Strict mode enabled - all types required
- Use interfaces for props and public APIs
- Use type aliases for unions and complex types
- Avoid `any` - use `unknown` if truly unknown
- Export types alongside components

### Accessibility
- Always provide `accessibilityLabel` for interactive elements
- Use semantic components (`Pressable` not `TouchableOpacity`)
- Ensure color contrast meets WCAG AA (4.5:1 for text)
- Support screen readers
- Minimum 18px font size for child content

## Important Context

### Target Users
- **Primary**: Children aged 3-7 with speech delays
- **Secondary**: Parents/caregivers and speech therapists
- **Attention span**: 5-15 minutes per session

### Design Philosophy
- Child-first interface: simple, colorful, rewarding
- No negative feedback - redirect, don't punish
- Multisensory learning (visual, auditory, tactile/haptic)
- Progress tracking and adaptive difficulty
- Parent mode gated (hidden from kids)

### Two-Mode Architecture (Planned)
1. **Kid Mode** (primary): Learning activities, games, rewards
2. **Parent/Therapist Mode**: Dashboard, progress reports, settings

### Educational Methodology
- Visual association learning (images + words)
- Repetition and reinforcement (spaced repetition)
- Phonetic progression (simple → complex sounds)
- 5 difficulty levels (ages 3-7, sound exploration → conversation)

## Key Documentation References

- **Project Requirements**: `PROJECT_REQUIREMENTS.md` - Comprehensive requirements document
- **Technical Plan**: `TECHNICAL_PLAN.md` - 35 detailed implementation stories across 7 phases
- **Current Phase**: Phase 1 (Foundation) - Stories 1.1-1.3 completed (Expo init, NativeWind, Google Fonts)

## Testing and Quality

TypeScript checking before commits:
```bash
npm run typecheck
```

Ensure no TypeScript errors before pushing code.

## Known Issues and Gotchas

1. **New Architecture Enabled**: This project uses React Native's New Architecture (`"newArchEnabled": true`)
   - Requires React Native Reanimated v4.x (not v3.x)
   - Ensure all packages are compatible with New Architecture
2. **Font Loading**: App requires fonts loaded before render - handled in `_layout.tsx`
3. **NativeWind + Fonts**: Font weights must use inline `style={{ fontFamily }}`, not Tailwind classes
4. **Package Versions**: Always use `npx expo install --fix` after adding packages to ensure compatibility

## Getting Help

- Review `PROJECT_REQUIREMENTS.md` for feature context
- Check `TECHNICAL_PLAN.md` for implementation stories
- Expo documentation: https://docs.expo.dev
- NativeWind documentation: https://www.nativewind.dev
