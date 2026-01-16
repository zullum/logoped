# Logoped App - Technical Implementation Plan

This document provides detailed technical stories for implementing the Logoped speech therapy app. Each story includes technical details, acceptance criteria, and step-by-step implementation guidance.

---

## ⚠️ Important: Package Versions & Dependencies

### Version Management Policy

**Always use the latest stable versions** of packages unless there are specific dependency conflicts. This document was last updated in **October 2025** with the following package versions:

### Core Dependencies (Verified October 2025)

| Package | Version | Notes |
|---------|---------|-------|
| **Expo SDK** | 54 | Latest (Sept 2025). Ships React Native 0.81 with React 19.1 |
| **React Native** | 0.81 | Bundled with Expo SDK 54 |
| **TypeScript** | Latest (5.x+) | Always use latest |
| **NativeWind** | 4.1.x | Stable v4, v5 in preview |
| **Tailwind CSS** | 3.4.x | Required by NativeWind v4 |
| **React Native Reanimated** | 3.17.4+ | **Use v3.x, NOT v4!** (See note below) |
| **TanStack Query** | 5.90.5+ | Package: `@tanstack/react-query` |
| **react-native-mmkv** | 4.x | Latest uses Nitro Modules |
| **i18next** | 24.2.3+ | Core i18n library |
| **react-i18next** | 16.0.1+ | React bindings |
| **expo-audio** | Latest | Replaces expo-av in SDK 53+ |
| **expo-font** | Latest | Bundled with Expo SDK |
| **@expo/vector-icons** | Latest | Bundled with Expo SDK |

### 🚨 Critical Dependency Notes

#### Reanimated Version Constraint
**IMPORTANT:** Use **React Native Reanimated v3.17.4+** (v3.x), NOT v4.x!

**Reason:**
- NativeWind v4 requires Reanimated v3.x (~3.17.4)
- Reanimated v4 only supports New React Native Architecture
- Using Reanimated v4 will cause compatibility issues with NativeWind v4

**Installation:**
```bash
# Correct - Use v3.x
npx expo install react-native-reanimated@~3.17.4

# Incorrect - Don't use v4.x with NativeWind v4
npx expo install react-native-reanimated@latest  # This would install v4+
```

#### expo-audio vs expo-av
- **SDK 53+**: Use `expo-audio` (new, better performance)
- **SDK 52 and below**: Use `expo-av`

#### MMKV New Architecture Requirement
- `react-native-mmkv` v4 requires New Architecture (Fabric/TurboModules)
- If not using New Architecture, stick with v3.x

#### Package Name Changes
- ❌ `react-query` (deprecated)
- ✅ `@tanstack/react-query` (use this)

### Checking for Updates

Before installing packages, always check for latest versions:

```bash
# Check for outdated packages
npm outdated

# Install latest compatible versions
npx expo install --check

# Update specific package to latest
npx expo install <package-name>@latest
```

### When to Pin Versions

Only pin specific versions when:
1. Known breaking changes in newer versions
2. Dependency conflicts (like Reanimated v3 for NativeWind)
3. Package in beta/alpha (wait for stable)
4. Critical production app (test thoroughly first)

---

## Table of Contents
1. [Phase 1: Foundation](#phase-1-foundation-weeks-1-3)
2. [Phase 2: Kid Mode Core](#phase-2-kid-mode-core-weeks-4-7)
3. [Phase 3: Advanced Activities](#phase-3-advanced-activities-weeks-8-10)
4. [Phase 4: Parent Mode](#phase-4-parent-mode-weeks-11-13)
5. [Phase 5: Adaptive Learning](#phase-5-adaptive-learning-weeks-14-15)
6. [Phase 6: Polish & Expansion](#phase-6-polish--expansion-weeks-16-18)
7. [Phase 7: Launch Prep](#phase-7-launch-prep-weeks-19-20)

---

## Phase 1: Foundation (Weeks 1-3) ✅ COMPLETE

### Story 1.1: Initialize Expo Project with TypeScript
**Priority:** Critical | **Effort:** 2 hours | **Dependencies:** None

#### Description
Set up a new Expo project with TypeScript configuration and essential tooling for the Logoped app.

#### Technical Details
- Use Expo SDK 54+ (latest) with TypeScript template
- Configure `tsconfig.json` with strict mode
- Set up path aliases for cleaner imports
- Configure EAS (Expo Application Services) for builds

#### Implementation Steps
```bash
# 1. Create new Expo project
npx create-expo-app logoped-app --template expo-template-blank-typescript

# 2. Navigate to project
cd logoped-app

# 3. Install Expo Router
npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar

# 4. Initialize EAS
eas init
```

#### Configuration Files

**app.json updates:**
```json
{
  "expo": {
    "name": "Logoped",
    "slug": "logoped-app",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "scheme": "logoped",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#4A90E2"
    },
    "assetBundlePatterns": ["**/*"],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.logoped.app"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#4A90E2"
      },
      "package": "com.logoped.app"
    },
    "plugins": [
      "expo-router"
    ]
  }
}
```

**tsconfig.json:**
```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "paths": {
      "@/*": ["./src/*"],
      "@components/*": ["./src/components/*"],
      "@features/*": ["./src/features/*"],
      "@lib/*": ["./src/lib/*"],
      "@hooks/*": ["./src/hooks/*"],
      "@types/*": ["./src/types/*"],
      "@constants/*": ["./src/constants/*"],
      "@assets/*": ["./assets/*"]
    }
  }
}
```

#### Acceptance Criteria
- [ ] Project initializes and runs on iOS simulator/device
- [ ] Project initializes and runs on Android emulator/device
- [ ] TypeScript compilation works without errors
- [ ] Path aliases resolve correctly
- [ ] EAS is configured and connected to Expo account

---

### Story 1.2: Configure NativeWind and Design System
**Priority:** Critical | **Effort:** 4 hours | **Dependencies:** 1.1

#### Description
Set up NativeWind (Tailwind CSS for React Native) and create the foundational design system with colors, typography, and spacing tokens.

#### Technical Details
- Install NativeWind v4.1+ with Tailwind CSS v3.4+
- Configure custom theme with brand colors
- Set up typography scale
- Create design tokens file
- Configure Metro bundler for CSS

#### Implementation Steps

```bash
# 1. Install NativeWind and dependencies
npm install nativewind@^4.1.0
npm install --save-dev tailwindcss@^3.4.0

# 2. Initialize Tailwind
npx tailwindcss init
```

**tailwind.config.js:**
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E3F2FD',
          100: '#BBDEFB',
          200: '#90CAF9',
          300: '#64B5F6',
          400: '#42A5F5',
          500: '#4A90E2', // Main brand color
          600: '#3A7BC8',
          700: '#2A66AE',
          800: '#1E4A7A',
          900: '#0D2847',
        },
        sunshine: {
          50: '#FFFBF0',
          500: '#FFD166', // Yellow
          600: '#F4C430',
        },
        grass: {
          50: '#E8FFF5',
          500: '#06D6A0', // Green
          600: '#05C090',
        },
        coral: {
          50: '#FFF0F3',
          500: '#EF476F', // Pink
          600: '#D63F63',
        },
        lavender: {
          50: '#F5F3F7',
          500: '#9B89B3', // Purple
          600: '#8A79A2',
        },
        background: {
          light: '#F7F9FC',
          white: '#FFFFFF',
        },
        text: {
          dark: '#2D3748',
          medium: '#4A5568',
          light: '#718096',
        },
        success: '#48BB78',
        warning: '#F6AD55',
        error: '#FC8181',
      },
      fontFamily: {
        'quicksand-light': ['Quicksand_300Light'],
        'quicksand-regular': ['Quicksand_400Regular'],
        'quicksand-medium': ['Quicksand_500Medium'],
        'quicksand-semibold': ['Quicksand_600SemiBold'],
        'quicksand-bold': ['Quicksand_700Bold'],
        'nunito-regular': ['Nunito_400Regular'],
        'nunito-semibold': ['Nunito_600SemiBold'],
        'nunito-bold': ['Nunito_700Bold'],
      },
      fontSize: {
        'xs': ['12px', { lineHeight: '16px' }],
        'sm': ['14px', { lineHeight: '20px' }],
        'base': ['16px', { lineHeight: '24px' }],
        'lg': ['18px', { lineHeight: '28px' }],
        'xl': ['20px', { lineHeight: '28px' }],
        '2xl': ['24px', { lineHeight: '32px' }],
        '3xl': ['30px', { lineHeight: '36px' }],
        '4xl': ['36px', { lineHeight: '40px' }],
        '5xl': ['48px', { lineHeight: '1' }],
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        '2xl': '48px',
        '3xl': '64px',
      },
      borderRadius: {
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        'full': '9999px',
      },
    },
  },
  plugins: [],
}
```

**metro.config.js:**
```javascript
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, { input: './global.css' });
```

**global.css:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**src/constants/theme.ts:**
```typescript
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

// Minimum touch target size for kids
export const TOUCH_TARGET = {
  min: 60,
  comfortable: 80,
  large: 100,
} as const;
```

#### Acceptance Criteria
- [ ] NativeWind classes work in React Native components
- [ ] Custom colors are accessible via Tailwind classes
- [ ] Design tokens file exports all theme values
- [ ] Hot reload works with style changes
- [ ] No console warnings about missing styles

---

### Story 1.3: Install and Configure Fonts
**Priority:** High | **Effort:** 2 hours | **Dependencies:** 1.1

#### Description
Install Google Fonts (Quicksand for headings, Nunito for body) and configure them for use throughout the app.

#### Technical Details
- Use expo-font for font loading
- Install @expo-google-fonts packages
- Create font loading hook
- Add font preloading to app root

#### Implementation Steps

```bash
# Install font packages
npx expo install expo-font @expo-google-fonts/quicksand @expo-google-fonts/nunito expo-splash-screen
```

**src/hooks/useFonts.ts:**
```typescript
import { useFonts as useExpoFonts } from 'expo-font';
import {
  Quicksand_300Light,
  Quicksand_400Regular,
  Quicksand_500Medium,
  Quicksand_600SemiBold,
  Quicksand_700Bold,
} from '@expo-google-fonts/quicksand';
import {
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
} from '@expo-google-fonts/nunito';

export const useFonts = () => {
  const [loaded, error] = useExpoFonts({
    Quicksand_300Light,
    Quicksand_400Regular,
    Quicksand_500Medium,
    Quicksand_600SemiBold,
    Quicksand_700Bold,
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
  });

  return { loaded, error };
};
```

**app/_layout.tsx:**
```typescript
import { useEffect } from 'react';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from '@/hooks/useFonts';
import '../global.css';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { loaded, error } = useFonts();

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}
```

#### Acceptance Criteria
- [ ] Fonts load successfully on app start
- [ ] Quicksand font displays correctly for headings
- [ ] Nunito font displays correctly for body text
- [ ] Splash screen shows until fonts are loaded
- [ ] No FOUT (Flash of Unstyled Text) occurs

---

### Story 1.4: Configure i18next for Multilingual Support
**Priority:** Critical | **Effort:** 3 hours | **Dependencies:** 1.1

#### Description
Set up i18next with react-i18next for internationalization, including English and Spanish as initial languages.

#### Technical Details
- Install i18next and react-i18next
- Configure language detection using expo-localization
- Create translation namespace structure
- Set up language switching mechanism
- Create translation files for EN and ES

#### Implementation Steps

```bash
# Install i18next dependencies (use latest versions)
npm install i18next@latest react-i18next@latest
npx expo install expo-localization

# At time of writing (Oct 2025):
# i18next@24.2.3+
# react-i18next@16.0.1+
```

**src/lib/i18n/index.ts:**
```typescript
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';

import en from './locales/en.json';
import es from './locales/es.json';

const LANGUAGE_STORAGE_KEY = '@logoped:language';

const resources = {
  en: { translation: en },
  es: { translation: es },
};

// Get stored language or use device locale
const getInitialLanguage = async () => {
  try {
    const storedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (storedLanguage) return storedLanguage;

    const deviceLocale = Localization.locale.split('-')[0];
    return Object.keys(resources).includes(deviceLocale) ? deviceLocale : 'en';
  } catch (error) {
    return 'en';
  }
};

export const initI18n = async () => {
  const language = await getInitialLanguage();

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: language,
      fallbackLng: 'en',
      compatibilityJSON: 'v3',
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: false,
      },
    });

  return i18n;
};

export const changeLanguage = async (language: string) => {
  await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  await i18n.changeLanguage(language);
};

export default i18n;
```

**src/lib/i18n/locales/en.json:**
```json
{
  "common": {
    "loading": "Loading...",
    "error": "Something went wrong",
    "retry": "Try Again",
    "continue": "Continue",
    "back": "Back",
    "next": "Next",
    "done": "Done",
    "cancel": "Cancel",
    "save": "Save"
  },
  "kid": {
    "home": {
      "title": "Let's Learn!",
      "todayChallenge": "Today's Challenge",
      "freePlay": "Free Play",
      "myProgress": "My Progress"
    },
    "activities": {
      "pictureCards": "Picture Cards",
      "soundMatching": "Sound Matching",
      "bubblePop": "Bubble Pop",
      "storyTime": "Story Time",
      "singAlong": "Sing Along",
      "memoryGame": "Memory Game",
      "mirrorPractice": "Mirror Practice"
    },
    "rewards": {
      "greatJob": "Great Job!",
      "youEarned": "You earned {{count}} stars!",
      "keepGoing": "Keep going!",
      "newSticker": "New sticker unlocked!"
    }
  },
  "parent": {
    "dashboard": {
      "title": "Progress Dashboard",
      "wordsLearned": "Words Learned",
      "timeSpent": "Time Spent",
      "currentStreak": "Current Streak",
      "weeklyProgress": "Weekly Progress"
    },
    "settings": {
      "title": "Settings",
      "childProfile": "Child Profile",
      "language": "Language",
      "difficulty": "Difficulty Level",
      "focusAreas": "Focus Areas",
      "notifications": "Notifications"
    }
  },
  "words": {
    "categories": {
      "animals": "Animals",
      "food": "Food",
      "family": "Family",
      "toys": "Toys",
      "colors": "Colors",
      "body": "Body Parts"
    }
  }
}
```

**src/lib/i18n/locales/es.json:**
```json
{
  "common": {
    "loading": "Cargando...",
    "error": "Algo salió mal",
    "retry": "Intentar de Nuevo",
    "continue": "Continuar",
    "back": "Atrás",
    "next": "Siguiente",
    "done": "Hecho",
    "cancel": "Cancelar",
    "save": "Guardar"
  },
  "kid": {
    "home": {
      "title": "¡Vamos a Aprender!",
      "todayChallenge": "Desafío de Hoy",
      "freePlay": "Juego Libre",
      "myProgress": "Mi Progreso"
    },
    "activities": {
      "pictureCards": "Tarjetas con Imágenes",
      "soundMatching": "Emparejar Sonidos",
      "bubblePop": "Explotar Burbujas",
      "storyTime": "Hora del Cuento",
      "singAlong": "Cantar Juntos",
      "memoryGame": "Juego de Memoria",
      "mirrorPractice": "Práctica con Espejo"
    },
    "rewards": {
      "greatJob": "¡Muy Bien!",
      "youEarned": "¡Ganaste {{count}} estrellas!",
      "keepGoing": "¡Sigue así!",
      "newSticker": "¡Nueva calcomanía desbloqueada!"
    }
  },
  "parent": {
    "dashboard": {
      "title": "Panel de Progreso",
      "wordsLearned": "Palabras Aprendidas",
      "timeSpent": "Tiempo Dedicado",
      "currentStreak": "Racha Actual",
      "weeklyProgress": "Progreso Semanal"
    },
    "settings": {
      "title": "Configuración",
      "childProfile": "Perfil del Niño",
      "language": "Idioma",
      "difficulty": "Nivel de Dificultad",
      "focusAreas": "Áreas de Enfoque",
      "notifications": "Notificaciones"
    }
  },
  "words": {
    "categories": {
      "animals": "Animales",
      "food": "Comida",
      "family": "Familia",
      "toys": "Juguetes",
      "colors": "Colores",
      "body": "Partes del Cuerpo"
    }
  }
}
```

**Update app/_layout.tsx:**
```typescript
import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from '@/hooks/useFonts';
import { initI18n } from '@/lib/i18n';
import '../global.css';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { loaded: fontsLoaded, error: fontError } = useFonts();
  const [i18nInitialized, setI18nInitialized] = useState(false);

  useEffect(() => {
    initI18n().then(() => setI18nInitialized(true));
  }, []);

  useEffect(() => {
    if ((fontsLoaded || fontError) && i18nInitialized) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError, i18nInitialized]);

  if ((!fontsLoaded && !fontError) || !i18nInitialized) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}
```

**src/hooks/useTranslation.ts (convenience hook):**
```typescript
import { useTranslation as useI18nTranslation } from 'react-i18next';

export const useTranslation = (namespace?: string) => {
  const { t, i18n } = useI18nTranslation(namespace);

  return {
    t,
    language: i18n.language,
    changeLanguage: i18n.changeLanguage,
  };
};
```

#### Acceptance Criteria
- [ ] App initializes with device language (EN or ES)
- [ ] Language preference persists after app restart
- [ ] Translations display correctly for all keys
- [ ] Language can be changed dynamically
- [ ] Missing translations fallback to English

---

### Story 1.5: Set Up React Query for Data Management
**Priority:** Critical | **Effort:** 3 hours | **Dependencies:** 1.1

#### Description
Configure TanStack Query (React Query) for server state management, caching, and offline support.

#### Technical Details
- Install @tanstack/react-query
- Set up QueryClient with appropriate defaults
- Configure persistence for offline support
- Create custom hooks for common query patterns
- Set up dev tools for debugging

#### Implementation Steps

```bash
# Install React Query (TanStack Query v5+)
npm install @tanstack/react-query@latest
npm install @tanstack/react-query-persist-client@latest
npx expo install @react-native-async-storage/async-storage

# Note: Use @tanstack/react-query, NOT the deprecated react-query package
# At time of writing (Oct 2025): @tanstack/react-query@5.90.5+
```

**src/lib/query/queryClient.ts:**
```typescript
import { QueryClient } from '@tanstack/react-query';
import { createAsyncStoragePersister } from '@tanstack/react-query-persist-client';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Cache for 5 minutes
      staleTime: 1000 * 60 * 5,
      // Keep unused data for 10 minutes
      gcTime: 1000 * 60 * 10,
      // Retry failed queries
      retry: 2,
      // Refetch on window focus (when app comes to foreground)
      refetchOnWindowFocus: true,
      // Refetch on reconnect
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 1,
    },
  },
});

export const persister = createAsyncStoragePersister({
  storage: AsyncStorage,
  key: 'LOGOPED_QUERY_CACHE',
  throttleTime: 1000,
});
```

**src/lib/query/QueryProvider.tsx:**
```typescript
import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { queryClient, persister } from './queryClient';

interface QueryProviderProps {
  children: React.ReactNode;
  enablePersistence?: boolean;
}

export const QueryProvider: React.FC<QueryProviderProps> = ({
  children,
  enablePersistence = true
}) => {
  if (enablePersistence) {
    return (
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{ persister }}
      >
        {children}
      </PersistQueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};
```

**src/lib/query/hooks/useWords.ts (example hook):**
```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export interface Word {
  id: string;
  text: string;
  translations: Record<string, string>;
  category: string;
  difficulty: number;
  imageUrl: string;
  audioUrl: Record<string, string>;
}

// Query keys factory
export const wordKeys = {
  all: ['words'] as const,
  lists: () => [...wordKeys.all, 'list'] as const,
  list: (filters: Record<string, any>) => [...wordKeys.lists(), filters] as const,
  details: () => [...wordKeys.all, 'detail'] as const,
  detail: (id: string) => [...wordKeys.details(), id] as const,
};

// Fetch words by category
export const useWords = (category?: string, difficulty?: number) => {
  return useQuery({
    queryKey: wordKeys.list({ category, difficulty }),
    queryFn: async () => {
      // This will be replaced with actual API call
      const mockWords: Word[] = [
        {
          id: '1',
          text: 'cat',
          translations: { en: 'cat', es: 'gato' },
          category: 'animals',
          difficulty: 1,
          imageUrl: 'https://example.com/cat.png',
          audioUrl: { en: 'https://example.com/cat_en.mp3', es: 'https://example.com/cat_es.mp3' },
        },
      ];
      return mockWords;
    },
  });
};

// Fetch single word
export const useWord = (id: string) => {
  return useQuery({
    queryKey: wordKeys.detail(id),
    queryFn: async () => {
      // Mock implementation
      const word: Word = {
        id,
        text: 'cat',
        translations: { en: 'cat', es: 'gato' },
        category: 'animals',
        difficulty: 1,
        imageUrl: 'https://example.com/cat.png',
        audioUrl: { en: 'https://example.com/cat_en.mp3', es: 'https://example.com/cat_es.mp3' },
      };
      return word;
    },
    enabled: !!id,
  });
};
```

**Update app/_layout.tsx:**
```typescript
import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from '@/hooks/useFonts';
import { initI18n } from '@/lib/i18n';
import { QueryProvider } from '@/lib/query/QueryProvider';
import '../global.css';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { loaded: fontsLoaded, error: fontError } = useFonts();
  const [i18nInitialized, setI18nInitialized] = useState(false);

  useEffect(() => {
    initI18n().then(() => setI18nInitialized(true));
  }, []);

  useEffect(() => {
    if ((fontsLoaded || fontError) && i18nInitialized) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError, i18nInitialized]);

  if ((!fontsLoaded && !fontError) || !i18nInitialized) {
    return null;
  }

  return (
    <QueryProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
      </Stack>
    </QueryProvider>
  );
}
```

#### Acceptance Criteria
- [ ] QueryClient is properly configured and accessible
- [ ] Query persistence works across app restarts
- [ ] Example query hook fetches and caches data
- [ ] Stale data is automatically refetched
- [ ] Offline queries return cached data

---

### Story 1.6: Configure Storage (MMKV)
**Priority:** High | **Effort:** 2 hours | **Dependencies:** 1.1

#### Description
Set up react-native-mmkv for fast, synchronous local storage as an alternative to AsyncStorage for performance-critical data.

#### Technical Details
- Install react-native-mmkv
- Create storage utilities
- Set up separate storage instances for different data types
- Create hooks for reactive storage values

#### Implementation Steps

```bash
# Install MMKV (v4 requires New Architecture)
# If NOT using New Architecture, use v3.x
npx expo install react-native-mmkv@latest

# For New Architecture (Fabric/TurboModules):
npm install react-native-mmkv@^4.0.0 react-native-nitro-modules

# For older architecture, use v3.x:
# npm install react-native-mmkv@^3.2.0
```

**src/lib/storage/mmkv.ts:**
```typescript
import { MMKV } from 'react-native-mmkv';

// Main storage instance
export const storage = new MMKV({
  id: 'logoped-main-storage',
  encryptionKey: 'logoped-encryption-key-change-in-production',
});

// Separate instance for user progress (might grow large)
export const progressStorage = new MMKV({
  id: 'logoped-progress-storage',
  encryptionKey: 'logoped-progress-key-change-in-production',
});

// Separate instance for settings
export const settingsStorage = new MMKV({
  id: 'logoped-settings-storage',
});

// Type-safe storage helpers
export const storageHelpers = {
  // Generic getters/setters
  set: <T>(key: string, value: T): void => {
    storage.set(key, JSON.stringify(value));
  },

  get: <T>(key: string): T | null => {
    const value = storage.getString(key);
    return value ? JSON.parse(value) : null;
  },

  remove: (key: string): void => {
    storage.delete(key);
  },

  // Specific helpers
  getString: (key: string): string | undefined => {
    return storage.getString(key);
  },

  setString: (key: string, value: string): void => {
    storage.set(key, value);
  },

  getNumber: (key: string): number | undefined => {
    return storage.getNumber(key);
  },

  setNumber: (key: string, value: number): void => {
    storage.set(key, value);
  },

  getBoolean: (key: string): boolean | undefined => {
    return storage.getBoolean(key);
  },

  setBoolean: (key: string, value: boolean): void => {
    storage.set(key, value);
  },

  clearAll: (): void => {
    storage.clearAll();
  },
};

// Storage keys constants
export const STORAGE_KEYS = {
  USER_PROFILE: 'user_profile',
  CURRENT_LEVEL: 'current_level',
  TOTAL_STARS: 'total_stars',
  CURRENT_STREAK: 'current_streak',
  LAST_ACTIVE_DATE: 'last_active_date',
  SOUND_ENABLED: 'sound_enabled',
  HAPTICS_ENABLED: 'haptics_enabled',
  COMPLETED_ACTIVITIES: 'completed_activities',
} as const;
```

**src/hooks/useMMKVState.ts:**
```typescript
import { useState, useEffect, useCallback } from 'react';
import { storage } from '@/lib/storage/mmkv';

/**
 * React hook for reactive MMKV storage values
 * Similar to useState but persists to MMKV storage
 */
export function useMMKVState<T>(
  key: string,
  defaultValue: T
): [T, (value: T) => void] {
  // Initialize state from storage or default
  const [state, setState] = useState<T>(() => {
    const stored = storage.getString(key);
    return stored ? JSON.parse(stored) : defaultValue;
  });

  // Update both state and storage
  const updateState = useCallback(
    (value: T) => {
      setState(value);
      storage.set(key, JSON.stringify(value));
    },
    [key]
  );

  return [state, updateState];
}

/**
 * Hook for boolean storage values
 */
export function useMMKVBoolean(
  key: string,
  defaultValue: boolean
): [boolean, (value: boolean) => void] {
  const [state, setState] = useState<boolean>(() => {
    const stored = storage.getBoolean(key);
    return stored !== undefined ? stored : defaultValue;
  });

  const updateState = useCallback(
    (value: boolean) => {
      setState(value);
      storage.set(key, value);
    },
    [key]
  );

  return [state, updateState];
}

/**
 * Hook for number storage values
 */
export function useMMKVNumber(
  key: string,
  defaultValue: number
): [number, (value: number) => void] {
  const [state, setState] = useState<number>(() => {
    const stored = storage.getNumber(key);
    return stored !== undefined ? stored : defaultValue;
  });

  const updateState = useCallback(
    (value: number) => {
      setState(value);
      storage.set(key, value);
    },
    [key]
  );

  return [state, updateState];
}
```

**src/lib/storage/userProgress.ts (example usage):**
```typescript
import { progressStorage, STORAGE_KEYS } from './mmkv';

export interface UserProgress {
  totalStars: number;
  currentStreak: number;
  lastActiveDate: string;
  completedActivities: string[];
}

export const userProgressService = {
  getProgress: (): UserProgress => {
    const stored = progressStorage.getString(STORAGE_KEYS.USER_PROFILE);
    return stored
      ? JSON.parse(stored)
      : {
          totalStars: 0,
          currentStreak: 0,
          lastActiveDate: new Date().toISOString(),
          completedActivities: [],
        };
  },

  updateProgress: (progress: Partial<UserProgress>): void => {
    const current = userProgressService.getProgress();
    const updated = { ...current, ...progress };
    progressStorage.set(STORAGE_KEYS.USER_PROFILE, JSON.stringify(updated));
  },

  addStars: (count: number): void => {
    const progress = userProgressService.getProgress();
    progress.totalStars += count;
    userProgressService.updateProgress(progress);
  },

  completeActivity: (activityId: string): void => {
    const progress = userProgressService.getProgress();
    if (!progress.completedActivities.includes(activityId)) {
      progress.completedActivities.push(activityId);
      userProgressService.updateProgress(progress);
    }
  },
};
```

#### Acceptance Criteria
- [ ] MMKV storage reads/writes work synchronously
- [ ] Multiple storage instances are properly separated
- [ ] Type-safe storage helpers work correctly
- [ ] useMMKVState hook updates reactively
- [ ] Data persists across app restarts

---

### Story 1.7: Set Up Project Folder Structure
**Priority:** High | **Effort:** 1 hour | **Dependencies:** 1.1

#### Description
Create the organized folder structure for the app following feature-based architecture.

#### Technical Details
- Organize code by features rather than types
- Create placeholder files with TypeScript interfaces
- Set up barrel exports for cleaner imports
- Follow Expo Router file-based routing structure

#### Implementation Steps

```bash
# Create folder structure
mkdir -p src/{components/{kid,parent,shared,ui},features/{words,activities,progress,rewards,profile},lib/{api,audio,storage,utils},hooks,types,constants,assets/{images,audio,animations}}

# Create app folders for routing
mkdir -p app/{kid,parent}
```

**Folder Structure:**
```
/logoped-app
├── app/                          # Expo Router pages
│   ├── (kid)/                    # Kid mode routes (route group)
│   │   ├── _layout.tsx
│   │   ├── index.tsx            # Kid home screen
│   │   ├── activities/
│   │   │   ├── picture-cards.tsx
│   │   │   ├── sound-matching.tsx
│   │   │   └── ...
│   │   └── rewards/
│   │       └── index.tsx
│   ├── (parent)/                 # Parent mode routes (route group)
│   │   ├── _layout.tsx
│   │   ├── dashboard.tsx
│   │   ├── settings.tsx
│   │   └── progress.tsx
│   ├── _layout.tsx               # Root layout with providers
│   └── index.tsx                 # Entry point / mode selector
│
├── src/
│   ├── components/
│   │   ├── kid/                  # Kid-specific components
│   │   │   ├── ActivityCard.tsx
│   │   │   ├── RewardAnimation.tsx
│   │   │   └── StarDisplay.tsx
│   │   ├── parent/               # Parent-specific components
│   │   │   ├── ProgressChart.tsx
│   │   │   └── StatCard.tsx
│   │   ├── shared/               # Shared components
│   │   │   ├── AudioPlayer.tsx
│   │   │   └── LoadingSpinner.tsx
│   │   └── ui/                   # Base UI components
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       └── Icon.tsx
│   │
│   ├── features/                 # Feature modules
│   │   ├── words/
│   │   │   ├── hooks/
│   │   │   ├── components/
│   │   │   ├── types.ts
│   │   │   └── index.ts
│   │   ├── activities/
│   │   ├── progress/
│   │   ├── rewards/
│   │   └── profile/
│   │
│   ├── lib/                      # Core libraries
│   │   ├── api/
│   │   │   └── client.ts
│   │   ├── audio/
│   │   │   └── audioPlayer.ts
│   │   ├── storage/
│   │   │   ├── mmkv.ts
│   │   │   └── userProgress.ts
│   │   ├── i18n/
│   │   │   ├── index.ts
│   │   │   └── locales/
│   │   ├── query/
│   │   │   ├── queryClient.ts
│   │   │   └── QueryProvider.tsx
│   │   └── utils/
│   │       └── helpers.ts
│   │
│   ├── hooks/                    # Custom hooks
│   │   ├── useFonts.ts
│   │   ├── useTranslation.ts
│   │   ├── useMMKVState.ts
│   │   └── useAudio.ts
│   │
│   ├── types/                    # TypeScript types
│   │   ├── index.ts
│   │   ├── word.types.ts
│   │   ├── activity.types.ts
│   │   └── user.types.ts
│   │
│   └── constants/                # Constants
│       ├── theme.ts
│       ├── activities.ts
│       └── index.ts
│
├── assets/
│   ├── images/
│   ├── audio/
│   ├── animations/
│   └── fonts/
│
├── global.css                    # NativeWind styles
├── tailwind.config.js
├── metro.config.js
├── tsconfig.json
├── app.json
└── package.json
```

**Create type definitions src/types/index.ts:**
```typescript
export * from './word.types';
export * from './activity.types';
export * from './user.types';
```

**src/types/word.types.ts:**
```typescript
export type WordCategory =
  | 'animals'
  | 'food'
  | 'family'
  | 'toys'
  | 'colors'
  | 'body'
  | 'actions';

export type MasteryLevel = 'new' | 'learning' | 'practicing' | 'mastered';

export interface Word {
  id: string;
  text: string;
  translations: Record<LanguageCode, string>;
  phonetic: string;
  syllableCount: number;
  category: WordCategory;
  difficulty: 1 | 2 | 3 | 4 | 5;
  imageUrl: string;
  audioUrl: Record<LanguageCode, string>;
  animationUrl?: string;
}

export interface WordProgress {
  wordId: string;
  attempts: number;
  successRate: number;
  lastPracticed: Date;
  masteryLevel: MasteryLevel;
}

export type LanguageCode = 'en' | 'es' | 'fr' | 'de' | 'pl' | 'it' | 'pt';
```

**src/types/activity.types.ts:**
```typescript
export type ActivityType =
  | 'picture-cards'
  | 'sound-matching'
  | 'bubble-pop'
  | 'story-time'
  | 'sing-along'
  | 'memory-game'
  | 'mirror-practice';

export interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  level: number;
  targetWords: string[];
  targetPhonemes?: string[];
  estimatedDuration: number;
  iconName: string;
  color: string;
}

export interface ActivityCompletion {
  activityId: string;
  completedAt: Date;
  score: number;
  starsEarned: number;
  timeSpent: number;
}
```

**src/types/user.types.ts:**
```typescript
export interface ChildProfile {
  id: string;
  name: string;
  age: number;
  dateOfBirth: Date;
  avatarConfig: AvatarCustomization;
  currentLevel: number;
  focusAreas: string[];
  language: string;
  createdAt: Date;
  lastActiveAt: Date;
}

export interface AvatarCustomization {
  skinTone: string;
  hairStyle: string;
  hairColor: string;
  accessories: string[];
}

export interface UserProgress {
  userId: string;
  wordsLearned: WordProgress[];
  phonemesMastered: string[];
  activitiesCompleted: ActivityCompletion[];
  totalStars: number;
  currentStreak: number;
  achievements: Achievement[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  iconUrl: string;
  unlockedAt: Date;
}

import type { WordProgress } from './word.types';
import type { ActivityCompletion } from './activity.types';
```

**Create barrel exports for features (example src/features/words/index.ts):**
```typescript
export * from './types';
export * from './hooks/useWords';
export * from './components/WordCard';
```

#### Acceptance Criteria
- [ ] All folders are created
- [ ] Type definitions compile without errors
- [ ] Barrel exports work correctly
- [ ] Path aliases resolve to correct folders
- [ ] No circular dependencies exist

---

### Story 1.8: Create Base UI Component Library
**Priority:** High | **Effort:** 6 hours | **Dependencies:** 1.2, 1.3

#### Description
Build the foundational UI component library including Button, Card, Icon, and other base components with child-friendly designs.

#### Technical Details
- Use NativeWind for styling
- Implement proper TypeScript types
- Add animations using Reanimated
- Ensure accessibility (screen readers, touch targets)
- Follow design system tokens

#### Implementation Steps

**src/components/ui/Button.tsx:**
```typescript
import React from 'react';
import {
  Pressable,
  Text,
  View,
  ActivityIndicator,
  PressableProps,
  ViewStyle,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withSequence,
} from 'react-native-reanimated';
import { TOUCH_TARGET } from '@/constants/theme';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'warning';
export type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps extends Omit<PressableProps, 'style'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  style?: ViewStyle;
}

const variantStyles = {
  primary: 'bg-primary-500 active:bg-primary-600',
  secondary: 'bg-sunshine-500 active:bg-sunshine-600',
  success: 'bg-grass-500 active:bg-grass-600',
  warning: 'bg-coral-500 active:bg-coral-600',
};

const sizeStyles = {
  small: {
    container: 'px-4 py-2 min-h-[48px]',
    text: 'text-base',
  },
  medium: {
    container: 'px-6 py-3 min-h-[60px]',
    text: 'text-lg',
  },
  large: {
    container: 'px-8 py-4 min-h-[80px]',
    text: 'text-2xl',
  },
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'large',
  children,
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  disabled,
  style,
  ...props
}) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSequence(
      withSpring(1.05),
      withSpring(1)
    );
  };

  const variantClass = variantStyles[variant];
  const sizeClass = sizeStyles[size];

  return (
    <AnimatedPressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || isLoading}
      style={[animatedStyle, style]}
      className={`
        ${sizeClass.container}
        ${variantClass}
        ${fullWidth ? 'w-full' : ''}
        rounded-xl
        flex-row
        items-center
        justify-center
        shadow-lg
        ${disabled || isLoading ? 'opacity-50' : ''}
      `}
      accessible={true}
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || isLoading }}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator color="white" size="small" />
      ) : (
        <>
          {leftIcon && <View className="mr-2">{leftIcon}</View>}
          <Text
            className={`
              ${sizeClass.text}
              font-quicksand-bold
              text-white
              text-center
            `}
          >
            {children}
          </Text>
          {rightIcon && <View className="ml-2">{rightIcon}</View>}
        </>
      )}
    </AnimatedPressable>
  );
};
```

**src/components/ui/Card.tsx:**
```typescript
import React from 'react';
import { View, Pressable, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  variant?: 'default' | 'primary' | 'success';
  className?: string;
  style?: ViewStyle;
}

const variantStyles = {
  default: 'bg-white border-gray-200',
  primary: 'bg-primary-50 border-primary-200',
  success: 'bg-grass-50 border-grass-200',
};

export const Card: React.FC<CardProps> = ({
  children,
  onPress,
  variant = 'default',
  className = '',
  style,
}) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    if (onPress) {
      scale.value = withSpring(0.98);
    }
  };

  const handlePressOut = () => {
    if (onPress) {
      scale.value = withSpring(1);
    }
  };

  const baseClass = `
    ${variantStyles[variant]}
    rounded-xl
    border-2
    p-md
    shadow-md
    ${className}
  `;

  if (onPress) {
    return (
      <AnimatedPressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[animatedStyle, style]}
        className={baseClass}
      >
        {children}
      </AnimatedPressable>
    );
  }

  return (
    <View style={style} className={baseClass}>
      {children}
    </View>
  );
};
```

**src/components/ui/Icon.tsx:**
```typescript
import React from 'react';
import { View, ViewStyle } from 'react-native';
// Note: Install @expo/vector-icons
import { Ionicons } from '@expo/vector-icons';

interface IconProps {
  name: keyof typeof Ionicons.glyphMap;
  size?: number;
  color?: string;
  className?: string;
  style?: ViewStyle;
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color = '#2D3748',
  className = '',
  style,
}) => {
  return (
    <View style={style} className={className}>
      <Ionicons name={name} size={size} color={color} />
    </View>
  );
};
```

**src/components/ui/index.ts (barrel export):**
```typescript
export { Button } from './Button';
export { Card } from './Card';
export { Icon } from './Icon';
export type { ButtonVariant, ButtonSize } from './Button';
```

**Install required dependencies:**
```bash
# IMPORTANT: Install Reanimated v3.x (NOT v4!) for NativeWind v4 compatibility
npx expo install react-native-reanimated@~3.17.4 @expo/vector-icons

# DO NOT use @latest for Reanimated - it will install v4 which is incompatible with NativeWind v4
```

**Update babel.config.js for Reanimated:**
```javascript
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    // Reanimated plugin must be listed last
    plugins: ['react-native-reanimated/plugin'],
  };
};
```

**⚠️ Critical:** After updating babel.config.js, clear cache:
```bash
npx expo start --clear
```

#### Acceptance Criteria
- [ ] Button component renders with all variants
- [ ] Button animations work smoothly
- [ ] Card component supports press interactions
- [ ] Icon component displays vector icons
- [ ] All components are accessible
- [ ] Touch targets meet minimum 60dp size for kids
- [ ] TypeScript types are complete

---

## Phase 2: Kid Mode Core (Weeks 4-7)

### Story 2.1: Implement Kid Mode Home Screen
**Priority:** Critical | **Effort:** 6 hours | **Dependencies:** 1.8

#### Description
Create the main home screen for kids with large, colorful activity cards and character avatar.

#### Technical Details
- Design grid layout for 4-6 activities
- Implement character avatar display
- Add progress indicators (stars, badges)
- Include daily challenge indicator
- Ensure animations are smooth and engaging

#### Implementation Steps

**app/(kid)/_layout.tsx:**
```typescript
import { Stack } from 'expo-router';
import { View } from 'react-native';

export default function KidLayout() {
  return (
    <View className="flex-1 bg-background-light">
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="activities/[id]" />
        <Stack.Screen name="rewards/index" />
      </Stack>
    </View>
  );
}
```

**app/(kid)/index.tsx:**
```typescript
import React from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from '@/hooks/useTranslation';
import { Card } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';
import { CharacterAvatar } from '@/components/kid/CharacterAvatar';
import { StarDisplay } from '@/components/kid/StarDisplay';
import { useMMKVNumber } from '@/hooks/useMMKVState';
import { STORAGE_KEYS } from '@/lib/storage/mmkv';

interface Activity {
  id: string;
  titleKey: string;
  icon: keyof typeof Icon;
  color: string;
  route: string;
}

const activities: Activity[] = [
  {
    id: 'picture-cards',
    titleKey: 'kid.activities.pictureCards',
    icon: 'images-outline',
    color: 'bg-primary-500',
    route: '/kid/activities/picture-cards',
  },
  {
    id: 'sound-matching',
    titleKey: 'kid.activities.soundMatching',
    icon: 'musical-notes-outline',
    color: 'bg-sunshine-500',
    route: '/kid/activities/sound-matching',
  },
  {
    id: 'bubble-pop',
    titleKey: 'kid.activities.bubblePop',
    icon: 'radio-button-on-outline',
    color: 'bg-grass-500',
    route: '/kid/activities/bubble-pop',
  },
  {
    id: 'story-time',
    titleKey: 'kid.activities.storyTime',
    icon: 'book-outline',
    color: 'bg-coral-500',
    route: '/kid/activities/story-time',
  },
];

export default function KidHomeScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const [totalStars] = useMMKVNumber(STORAGE_KEYS.TOTAL_STARS, 0);

  return (
    <SafeAreaView className="flex-1 bg-background-light">
      <ScrollView className="flex-1" contentContainerClassName="p-lg">
        {/* Header with Avatar and Stars */}
        <View className="flex-row justify-between items-center mb-xl">
          <View>
            <Text className="text-3xl font-quicksand-bold text-text-dark">
              {t('kid.home.title')}
            </Text>
          </View>
          <View className="flex-row items-center gap-4">
            <StarDisplay count={totalStars} />
            <CharacterAvatar size={60} />
          </View>
        </View>

        {/* Activities Grid */}
        <View className="gap-md">
          <Text className="text-xl font-quicksand-semibold text-text-dark mb-sm">
            {t('kid.home.todayChallenge')}
          </Text>

          <View className="flex-row flex-wrap gap-md">
            {activities.map((activity) => (
              <View key={activity.id} className="w-[48%]">
                <Card
                  onPress={() => router.push(activity.route)}
                  className="aspect-square items-center justify-center"
                >
                  <View
                    className={`
                      ${activity.color}
                      w-20 h-20
                      rounded-full
                      items-center
                      justify-center
                      mb-md
                    `}
                  >
                    <Icon
                      name={activity.icon}
                      size={40}
                      color="white"
                    />
                  </View>
                  <Text className="text-lg font-quicksand-semibold text-text-dark text-center">
                    {t(activity.titleKey)}
                  </Text>
                </Card>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
```

**src/components/kid/CharacterAvatar.tsx:**
```typescript
import React from 'react';
import { View, Image } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

interface CharacterAvatarProps {
  size?: number;
  animate?: boolean;
}

export const CharacterAvatar: React.FC<CharacterAvatarProps> = ({
  size = 80,
  animate = true,
}) => {
  const rotation = useSharedValue(0);

  React.useEffect(() => {
    if (animate) {
      rotation.value = withRepeat(
        withSequence(
          withTiming(-10, { duration: 500 }),
          withTiming(10, { duration: 500 }),
          withTiming(0, { duration: 500 })
        ),
        -1,
        false
      );
    }
  }, [animate]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <Animated.View
      style={[
        {
          width: size,
          height: size,
        },
        animatedStyle,
      ]}
      className="bg-primary-100 rounded-full items-center justify-center border-4 border-primary-500"
    >
      {/* Placeholder - will be replaced with actual avatar */}
      <View className="w-full h-full rounded-full bg-primary-300" />
    </Animated.View>
  );
};
```

**src/components/kid/StarDisplay.tsx:**
```typescript
import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from '@/components/ui/Icon';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withDelay,
} from 'react-native-reanimated';

interface StarDisplayProps {
  count: number;
}

export const StarDisplay: React.FC<StarDisplayProps> = ({ count }) => {
  const scale = useSharedValue(1);

  React.useEffect(() => {
    // Animate when count changes
    scale.value = withDelay(
      100,
      withSpring(1.2, {}, () => {
        scale.value = withSpring(1);
      })
    );
  }, [count]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View
      style={animatedStyle}
      className="flex-row items-center bg-sunshine-500 px-4 py-2 rounded-full"
    >
      <Icon name="star" size={24} color="white" />
      <Text className="text-xl font-quicksand-bold text-white ml-2">
        {count}
      </Text>
    </Animated.View>
  );
};
```

#### Acceptance Criteria
- [x] Home screen displays 4-6 activity cards in grid
- [x] Character avatar animates gently
- [x] Star count displays correctly from storage
- [x] All activity cards are tappable with proper touch targets
- [x] Navigation to activities works
- [x] Translations display in selected language
- [x] Screen is responsive on different device sizes

---

### Story 2.2: Build Audio Playback System
**Priority:** Critical | **Effort:** 4 hours | **Dependencies:** 1.1

#### Description
Create a robust audio playback system for word pronunciation, sound effects, and background music.

#### Technical Details
- Use expo-audio (SDK 53+) or expo-av (SDK 52 and below) for audio playback
- Implement preloading for faster playback
- Support multiple audio formats (mp3, m4a)
- Handle audio interruptions (calls, etc.)
- Create hooks for easy audio management

#### Implementation Steps

```bash
# Install audio dependencies

# For Expo SDK 53+ (recommended - better performance)
npx expo install expo-audio

# For Expo SDK 52 and below
# npx expo install expo-av

# Note: This guide uses expo-av for broader compatibility
# Migrate to expo-audio when using SDK 53+
npx expo install expo-av
```

**src/lib/audio/audioPlayer.ts:**
```typescript
import { Audio, AVPlaybackStatus } from 'expo-av';
import { Sound } from 'expo-av/build/Audio';

class AudioPlayer {
  private sounds: Map<string, Sound> = new Map();
  private currentSound: Sound | null = null;

  async initialize() {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        shouldDuckAndroid: true,
      });
    } catch (error) {
      console.error('Error initializing audio:', error);
    }
  }

  async preload(key: string, uri: string): Promise<void> {
    try {
      if (this.sounds.has(key)) {
        return;
      }

      const { sound } = await Audio.Sound.createAsync(
        { uri },
        { shouldPlay: false },
        this.onPlaybackStatusUpdate
      );

      this.sounds.set(key, sound);
    } catch (error) {
      console.error(`Error preloading sound ${key}:`, error);
      throw error;
    }
  }

  async play(key: string, uri?: string): Promise<void> {
    try {
      // Stop current sound if playing
      if (this.currentSound) {
        await this.currentSound.stopAsync();
      }

      let sound = this.sounds.get(key);

      // If sound not preloaded, load it now
      if (!sound && uri) {
        await this.preload(key, uri);
        sound = this.sounds.get(key);
      }

      if (!sound) {
        throw new Error(`Sound ${key} not found and no URI provided`);
      }

      // Rewind to start
      await sound.setPositionAsync(0);
      await sound.playAsync();
      this.currentSound = sound;
    } catch (error) {
      console.error(`Error playing sound ${key}:`, error);
      throw error;
    }
  }

  async stop(): Promise<void> {
    if (this.currentSound) {
      await this.currentSound.stopAsync();
      this.currentSound = null;
    }
  }

  async pause(): Promise<void> {
    if (this.currentSound) {
      await this.currentSound.pauseAsync();
    }
  }

  async unload(key: string): Promise<void> {
    const sound = this.sounds.get(key);
    if (sound) {
      await sound.unloadAsync();
      this.sounds.delete(key);
    }
  }

  async unloadAll(): Promise<void> {
    for (const [key] of this.sounds) {
      await this.unload(key);
    }
  }

  private onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (!status.isLoaded) {
      if (status.error) {
        console.error(`Playback error: ${status.error}`);
      }
    }
  };
}

export const audioPlayer = new AudioPlayer();
```

**src/hooks/useAudio.ts:**
```typescript
import { useEffect, useCallback, useState } from 'react';
import { audioPlayer } from '@/lib/audio/audioPlayer';
import { useMMKVBoolean } from './useMMKVState';
import { STORAGE_KEYS } from '@/lib/storage/mmkv';

export interface UseAudioOptions {
  autoPlay?: boolean;
  preload?: boolean;
}

export const useAudio = (
  key: string,
  uri: string,
  options: UseAudioOptions = {}
) => {
  const { autoPlay = false, preload = false } = options;
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [soundEnabled] = useMMKVBoolean(STORAGE_KEYS.SOUND_ENABLED, true);

  // Preload audio on mount
  useEffect(() => {
    if (preload && uri) {
      setIsLoading(true);
      audioPlayer
        .preload(key, uri)
        .then(() => setIsLoading(false))
        .catch(() => setIsLoading(false));
    }

    return () => {
      // Don't unload on unmount as sounds might be reused
    };
  }, [key, uri, preload]);

  // Auto play if enabled
  useEffect(() => {
    if (autoPlay && soundEnabled && !isLoading) {
      play();
    }
  }, [autoPlay, soundEnabled, isLoading]);

  const play = useCallback(async () => {
    if (!soundEnabled) return;

    try {
      setIsPlaying(true);
      await audioPlayer.play(key, uri);
      // In real implementation, listen for completion
      setTimeout(() => setIsPlaying(false), 2000);
    } catch (error) {
      console.error('Error playing audio:', error);
      setIsPlaying(false);
    }
  }, [key, uri, soundEnabled]);

  const stop = useCallback(async () => {
    try {
      await audioPlayer.stop();
      setIsPlaying(false);
    } catch (error) {
      console.error('Error stopping audio:', error);
    }
  }, []);

  return {
    play,
    stop,
    isPlaying,
    isLoading,
  };
};

// Hook for sound effects
export const useSoundEffect = (soundName: string) => {
  const [soundEnabled] = useMMKVBoolean(STORAGE_KEYS.SOUND_ENABLED, true);

  const play = useCallback(async () => {
    if (!soundEnabled) return;

    // Map sound name to asset
    const soundAssets: Record<string, any> = {
      success: require('@/assets/audio/success.mp3'),
      tap: require('@/assets/audio/tap.mp3'),
      celebration: require('@/assets/audio/celebration.mp3'),
    };

    const asset = soundAssets[soundName];
    if (!asset) {
      console.warn(`Sound effect ${soundName} not found`);
      return;
    }

    try {
      await audioPlayer.play(`sfx-${soundName}`, asset);
    } catch (error) {
      console.error(`Error playing sound effect ${soundName}:`, error);
    }
  }, [soundName, soundEnabled]);

  return { play };
};
```

**src/components/shared/AudioPlayer.tsx (UI Component):**
```typescript
import React from 'react';
import { Pressable, View, ActivityIndicator } from 'react-native';
import { Icon } from '@/components/ui/Icon';
import { useAudio } from '@/hooks/useAudio';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

interface AudioPlayerProps {
  audioUri: string;
  audioKey: string;
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

const sizeMap = {
  small: { container: 40, icon: 20 },
  medium: { container: 60, icon: 30 },
  large: { container: 80, icon: 40 },
};

export const AudioPlayerButton: React.FC<AudioPlayerProps> = ({
  audioUri,
  audioKey,
  size = 'medium',
  color = '#4A90E2',
}) => {
  const { play, isPlaying, isLoading } = useAudio(audioKey, audioUri, {
    preload: true,
  });
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = () => {
    scale.value = withSpring(0.9, {}, () => {
      scale.value = withSpring(1);
    });
    play();
  };

  const { container, icon } = sizeMap[size];

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        onPress={handlePress}
        disabled={isLoading || isPlaying}
        style={{
          width: container,
          height: container,
          backgroundColor: color,
          borderRadius: container / 2,
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        {isLoading ? (
          <ActivityIndicator color="white" size="small" />
        ) : (
          <Icon
            name={isPlaying ? 'pause' : 'volume-high'}
            size={icon}
            color="white"
          />
        )}
      </Pressable>
    </Animated.View>
  );
};
```

**Initialize audio in app/_layout.tsx:**
```typescript
import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from '@/hooks/useFonts';
import { initI18n } from '@/lib/i18n';
import { QueryProvider } from '@/lib/query/QueryProvider';
import { audioPlayer } from '@/lib/audio/audioPlayer';
import '../global.css';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { loaded: fontsLoaded, error: fontError } = useFonts();
  const [i18nInitialized, setI18nInitialized] = useState(false);
  const [audioInitialized, setAudioInitialized] = useState(false);

  useEffect(() => {
    Promise.all([
      initI18n(),
      audioPlayer.initialize(),
    ]).then(() => {
      setI18nInitialized(true);
      setAudioInitialized(true);
    });
  }, []);

  useEffect(() => {
    if ((fontsLoaded || fontError) && i18nInitialized && audioInitialized) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError, i18nInitialized, audioInitialized]);

  if ((!fontsLoaded && !fontError) || !i18nInitialized || !audioInitialized) {
    return null;
  }

  return (
    <QueryProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
      </Stack>
    </QueryProvider>
  );
}
```

#### Acceptance Criteria
- [x] Audio initializes correctly on app start
- [x] Preloading works and improves playback speed
- [x] Play/pause/stop functions work reliably
- [x] Sound effects play with minimal delay
- [x] Audio respects device silent mode on iOS
- [x] Multiple sounds don't overlap (unless intended)
- [x] Sound toggle in settings works

---

### Story 2.3: Build Picture Cards Activity
**Priority:** Critical | **Effort:** 8 hours | **Dependencies:** 2.1, 2.2

#### Description
Create the core Picture Cards learning activity where children tap images to hear words and practice pronunciation.

#### Technical Details
- Display word image with clear illustration
- Play audio pronunciation on tap
- Show visual feedback for interaction
- Support categories (animals, food, family, etc.)
- Track progress for each word

#### Key Components
- WordCard component with image and audio
- Category selector
- Progress indicator
- Reward animation on completion

#### Acceptance Criteria
- [x] Images load and display correctly
- [x] Audio plays when card is tapped
- [x] Visual feedback shows during interaction
- [x] Multiple categories are supported
- [x] Progress is tracked and saved
- [x] Reward animation plays after milestone
- [x] Works offline with cached content

---

### Story 2.4: Create Word Content Database
**Priority:** Critical | **Effort:** 10 hours | **Dependencies:** None

#### Description
Build initial word content library with 100+ words across categories with images and audio in English and Spanish.

#### Technical Details
- Structure word data with metadata
- Source/create child-friendly illustrations
- Record clear audio pronunciations (EN, ES)
- Organize by difficulty levels 1-2
- Tag with categories and phonemes

#### Content Requirements
- Minimum 100 words
- Categories: Animals (20), Food (20), Family (15), Toys (15), Colors (10), Body Parts (10), Common Objects (10)
- High-quality PNG images (512x512px)
- Clear audio MP3 files (native speakers)
- Metadata: syllable count, phonemes, difficulty

#### Acceptance Criteria
- [ ] 100+ words with complete data
- [ ] All images are child-friendly and culturally appropriate
- [ ] Audio is clear and properly paced for children
- [ ] Both English and Spanish audio recorded
- [ ] Content organized in structured JSON/database
- [ ] Words tagged with appropriate difficulty levels

---

### Story 2.5: Implement Reward System
**Priority:** High | **Effort:** 6 hours | **Dependencies:** 2.1

#### Description
Create the reward and motivation system including stars, stickers, and celebration animations.

#### Technical Details
- Star earning on activity completion
- Sticker collection system
- Celebration animations using Lottie
- Achievement unlocking
- Progress persistence

#### Key Features
- Animated star collection
- Sticker album/collection view
- Celebratory confetti/balloon animations
- Sound effects for achievements
- Virtual pet or garden that grows

#### Acceptance Criteria
- [x] Stars are awarded and persisted
- [x] Celebration animations play smoothly
- [x] Stickers unlock at milestones
- [x] Collection view displays all rewards
- [x] Animations are engaging but not too long
- [x] Sound effects enhance experience

---

## Phase 3: Advanced Activities (Weeks 8-10)

### Story 3.1: Build Sound Matching Game
**Priority:** High | **Effort:** 8 hours | **Dependencies:** 2.2, 2.4

#### Description
Create interactive sound matching activity where children hear a word and select the matching image.

#### Technical Details
- Play audio of target word
- Display 2-4 image options
- Validate selection
- Provide encouraging feedback
- Adapt difficulty based on performance

#### Game Flow
1. Play word audio automatically
2. Show 2-4 image choices
3. Child taps selection
4. Immediate feedback (correct/try again)
5. Reward stars on success
6. Progress to next word

#### Acceptance Criteria
- [ ] Audio plays clearly on game start
- [ ] 2-4 images display based on difficulty
- [ ] Touch targets are large enough for kids
- [ ] Positive feedback for correct answers
- [ ] Encouraging redirect for incorrect answers (no negativity)
- [ ] Difficulty adapts to child's performance
- [ ] Progress is saved

---

### Story 3.2: Implement Bubble Pop Phonics
**Priority:** High | **Effort:** 10 hours | **Dependencies:** 2.2, 2.4

#### Description
Create an engaging bubble-popping game for phoneme practice and syllable combination.

#### Technical Details
- Animated bubbles with letters/syllables
- Physics-based movement
- Pop interaction with sound
- Combine bubbles to form words
- Particle effects on pop

#### Implementation Details
- Use React Native Reanimated for bubble animations
- Gesture Handler for pop interactions
- Sound effects for pops
- Visual particles/effects
- Progressive difficulty (single sounds → syllables → words)

#### Acceptance Criteria
- [ ] Bubbles float smoothly with physics
- [ ] Tap/pop interaction is responsive
- [ ] Sound plays on each pop
- [ ] Bubbles contain appropriate phonemes/syllables
- [ ] Combining bubbles creates words
- [ ] Visual effects are delightful
- [ ] Performance is smooth (60fps)

---

### Story 3.3: Create Interactive Story Time
**Priority:** High | **Effort:** 12 hours | **Dependencies:** 2.2

#### Description
Build interactive story feature with simple tales, word highlighting, and audio narration.

#### Technical Details
- Story data structure (pages, text, images)
- Text-to-speech or pre-recorded narration
- Word highlighting during narration
- Tap-to-hear word pronunciation
- Page turning animations

#### Story Features
- 5-10 simple stories (3-5 pages each)
- Colorful illustrations
- Highlighted words sync with audio
- Tap words for pronunciation
- Replay functionality
- Progress tracking

#### Acceptance Criteria
- [ ] Stories load with text and images
- [ ] Narration plays with word highlighting
- [ ] Words can be tapped for pronunciation
- [ ] Page turns with smooth animation
- [ ] Stories appropriate for ages 3-7
- [ ] Progress saves (which stories completed)
- [ ] Replay button works

---

### Story 3.4: Add Memory Matching Game
**Priority:** Medium | **Effort:** 8 hours | **Dependencies:** 2.4

#### Description
Classic memory/concentration game with word-image pairs to build vocabulary retention.

#### Technical Details
- Grid of face-down cards (4x3, 4x4)
- Flip animation
- Match validation
- Audio on card reveal
- Star rewards on completion

#### Game Mechanics
- Cards flip to reveal image or word
- Match image to corresponding word
- Cards stay revealed when matched
- Cards flip back if no match
- Complete grid to win stars

#### Acceptance Criteria
- [ ] Cards display in grid layout
- [ ] Flip animation is smooth
- [ ] Audio plays when image card is revealed
- [ ] Matching logic works correctly
- [ ] Matched cards stay revealed
- [ ] Game completion triggers reward
- [ ] Difficulty scales (grid size, number of pairs)

---

## Phase 4: Parent Mode (Weeks 11-13)

### Story 4.1: Implement Parent Mode Gate/Authentication
**Priority:** Critical | **Effort:** 4 hours | **Dependencies:** 1.8

#### Description
Create secure transition from kid mode to parent mode with simple authentication to prevent accidental access by children.

#### Technical Details
- Hidden gesture/button in kid mode (e.g., tap 4 corners)
- Simple math problem or pattern unlock
- Session-based access (auto-lock after inactivity)
- Clear visual distinction from kid mode

#### Security Approach
- Not user account login (COPPA compliance)
- Simple challenge (e.g., "What is 5 + 3?")
- Timed session (15 minutes)
- Clear exit back to kid mode

#### Acceptance Criteria
- [ ] Parent mode access is not obvious to children
- [ ] Simple challenge prevents accidental access
- [ ] Session expires after inactivity
- [ ] Clear visual difference between modes
- [ ] Easy exit back to kid mode
- [ ] No user data required (COPPA compliant)

---

### Story 4.2: Build Progress Dashboard
**Priority:** High | **Effort:** 10 hours | **Dependencies:** 4.1, 2.4

#### Description
Create comprehensive dashboard showing child's learning progress, including words learned, time spent, streaks, and activity completion.

#### Technical Details
- Charts for progress visualization
- Use react-native-chart-kit or Victory Native
- Display key metrics (words learned, time, streaks)
- Activity breakdown
- Weekly/monthly views

#### Dashboard Sections
1. Overview cards (total words, stars, streak)
2. Weekly progress chart
3. Activity completion breakdown
4. Recent achievements
5. Focus area recommendations

#### Acceptance Criteria
- [ ] Dashboard displays current statistics
- [ ] Charts render correctly
- [ ] Data updates in real-time
- [ ] Weekly and monthly views available
- [ ] Performance is smooth with data
- [ ] Helpful insights for parents

---

### Story 4.3: Create Child Profile Management
**Priority:** High | **Effort:** 6 hours | **Dependencies:** 4.1

#### Description
Allow parents to create and manage multiple child profiles with customized settings.

#### Technical Details
- CRUD operations for profiles
- Avatar customization
- Age and focus area settings
- Profile switching
- Data isolation per profile

#### Profile Features
- Name, age, date of birth
- Custom avatar
- Language preference
- Difficulty level override
- Focus phonemes/areas
- Activity restrictions

#### Acceptance Criteria
- [ ] Multiple profiles can be created
- [ ] Profiles save and persist
- [ ] Easy switching between profiles
- [ ] Each profile has isolated progress data
- [ ] Avatar customization works
- [ ] Settings apply correctly per profile

---

### Story 4.4: Build Settings Screen
**Priority:** High | **Effort:** 6 hours | **Dependencies:** 4.1

#### Description
Create comprehensive settings for app configuration including language, difficulty, notifications, and privacy.

#### Settings Categories
1. **Language & Region**
   - Interface language
   - Content language (can differ)
   - Voice gender preference

2. **Learning Settings**
   - Difficulty level
   - Session duration limits
   - Focus areas/phonemes
   - Content filtering by age

3. **App Preferences**
   - Sound effects on/off
   - Haptic feedback on/off
   - Notifications on/off
   - Auto-play audio

4. **Privacy & Data**
   - Data export
   - Clear progress data
   - Offline mode toggle

#### Acceptance Criteria
- [ ] All settings save and persist
- [ ] Language change updates immediately
- [ ] Difficulty adjustment affects content
- [ ] Sound/haptic toggles work
- [ ] Data export generates file
- [ ] Settings organized clearly

---

### Story 4.5: Implement Progress Reports & Export
**Priority:** Medium | **Effort:** 8 hours | **Dependencies:** 4.2

#### Description
Generate detailed progress reports for parents/therapists with export to PDF functionality.

#### Technical Details
- Report generation with statistics
- Charts and visualizations
- Export to PDF using react-native-print or similar
- Share functionality
- Weekly/monthly reports

#### Report Contents
- Time period summary
- Words learned (breakdown by category)
- Activity completion rates
- Success rates per activity type
- Recommendations for focus
- Milestones achieved

#### Acceptance Criteria
- [ ] Reports generate with accurate data
- [ ] PDF export works on iOS and Android
- [ ] Reports include charts and visualizations
- [ ] Share functionality works (email, etc.)
- [ ] Reports are readable and professional
- [ ] Data privacy is maintained

---

## Phase 5: Adaptive Learning (Weeks 14-15)

### Story 5.1: Build Progress Tracking Algorithm
**Priority:** Critical | **Effort:** 10 hours | **Dependencies:** 2.3, 3.1

#### Description
Implement intelligent progress tracking that monitors performance per word, phoneme, and activity type.

#### Technical Details
- Track attempts, success rate, time per word
- Identify struggling areas (words, phonemes, activities)
- Mastery level calculation (new → learning → practicing → mastered)
- Spaced repetition intervals
- Data aggregation and analysis

#### Tracking Metrics
- Word-level: attempts, success%, last practiced, mastery
- Phoneme-level: accuracy across words containing phoneme
- Activity-level: completion rate, average score
- Time-based: session duration, consistency

#### Algorithm Logic
```
Mastery Calculation:
- New: 0-2 successful attempts
- Learning: 3-5 successful attempts, <70% accuracy
- Practicing: 6-10 successful attempts, 70-90% accuracy
- Mastered: 10+ successful attempts, >90% accuracy, practiced across 5+ days

Spaced Repetition:
- New words: Daily
- Learning: Every 2-3 days
- Practicing: Weekly
- Mastered: Monthly review
```

#### Acceptance Criteria
- [ ] All interactions are tracked accurately
- [ ] Mastery levels calculate correctly
- [ ] Struggling areas are identified
- [ ] Performance data persists
- [ ] Algorithm is performant (no lag)
- [ ] Data structure supports analytics

---

### Story 5.2: Implement Adaptive Difficulty System
**Priority:** High | **Effort:** 8 hours | **Dependencies:** 5.1

#### Description
Create dynamic difficulty adjustment based on child's performance to maintain optimal challenge level.

#### Technical Details
- Monitor success rates in real-time
- Adjust difficulty parameters automatically
- Provide easier alternatives when struggling
- Increase challenge when mastering
- Smooth transitions (not jarring)

#### Difficulty Parameters by Activity
- **Picture Cards**: Number of cards, repetition frequency
- **Sound Matching**: Number of options (2-4), similarity of words
- **Bubble Pop**: Bubble speed, number of bubbles, phoneme complexity
- **Memory Game**: Grid size (3x2 → 4x4), card types

#### Adaptation Rules
```
If success rate < 50% over 5 attempts:
  → Reduce difficulty one level
  → Provide more guidance
  → Increase repetition

If success rate > 90% over 10 attempts:
  → Increase difficulty one level
  → Introduce new content
  → Reduce repetition
```

#### Acceptance Criteria
- [ ] Difficulty adjusts based on performance
- [ ] Changes are gradual and not frustrating
- [ ] System prevents content becoming too easy/hard
- [ ] Manual override in parent settings works
- [ ] Adaptation respects focus areas
- [ ] Child doesn't notice "testing" - feels natural

---

### Story 5.3: Create Daily Challenge Generator
**Priority:** Medium | **Effort:** 6 hours | **Dependencies:** 5.1

#### Description
Generate personalized daily challenges based on child's current level and areas needing practice.

#### Technical Details
- Analyze recent performance
- Select words/activities needing practice
- Create varied, engaging daily goals
- Balance review and new content
- Reward completion with special prizes

#### Challenge Types
1. **Word of the Day**: Focus on one new word, 5 different activities
2. **Category Challenge**: Practice all words in category
3. **Speed Challenge**: Complete activity in time limit
4. **Mastery Challenge**: Review words marked "learning"
5. **Phoneme Focus**: Practice specific sound across words

#### Generation Algorithm
```
Daily Challenge Selection:
1. Identify 1-2 words needing practice (lowest mastery)
2. Select 1-2 new words from current difficulty level
3. Choose 2-3 activities child enjoys most
4. Set appropriate difficulty and time goals
5. Define reward (bonus stars, special sticker)
```

#### Acceptance Criteria
- [ ] Challenge generates daily at midnight
- [ ] Challenge is personalized to child
- [ ] Appropriate difficulty for current level
- [ ] Completion tracked and rewarded
- [ ] Visual indicator for challenge completion
- [ ] Special reward on completion

---

## Phase 6: Polish & Expansion (Weeks 16-18)

### Story 6.1: Add 3 More Languages
**Priority:** High | **Effort:** 12 hours | **Dependencies:** 1.4, 2.5

#### Description
Expand language support to include French, German, and Bosnian with full translations and audio content.

#### Tasks Per Language
1. **Translation**
   - UI strings (all screens, buttons, labels)
   - Activity instructions
   - Feedback messages
   - Parent mode content

2. **Content Creation**
   - Record 100+ words with native speaker
   - Culturally appropriate word selection
   - Regional variations if needed

3. **Voice Recording**
   - Clear, child-paced pronunciation
   - Consistent voice across language
   - High-quality audio (44.1kHz, MP3)

4. **Testing**
   - Native speaker review
   - Cultural appropriateness check
   - Audio quality verification

#### Acceptance Criteria (per language)
- [ ] All UI translated accurately
- [ ] 100+ words recorded with native speaker
- [ ] Audio quality is consistent and clear
- [ ] Language selection works in settings
- [ ] App fully functional in new language
- [ ] Cultural review completed

---

### Story 6.2: Expand to 500+ Words
**Priority:** High | **Effort:** 20 hours | **Dependencies:** 2.5

#### Description
Grow word library from 100 to 500+ words covering Levels 1-4 content.

#### Content Breakdown
- **Level 1** (100 words): Basic objects, animals, family
- **Level 2** (150 words): Actions, descriptors, common phrases
- **Level 3** (150 words): Complex objects, emotions, locations
- **Level 4** (100 words): Abstract concepts, complex actions

#### Tasks
1. Word selection (age-appropriate, high-frequency)
2. Illustration sourcing/creation
3. Audio recording (all 5 languages)
4. Categorization and tagging
5. Difficulty assignment
6. Integration into app

#### Acceptance Criteria
- [ ] 500+ words with complete metadata
- [ ] All words have images (512x512px)
- [ ] Audio recorded in all 5 languages
- [ ] Words categorized appropriately
- [ ] Difficulty levels assigned correctly
- [ ] Content tested and verified

---

### Story 6.3: Implement Offline Mode
**Priority:** High | **Effort:** 8 hours | **Dependencies:** 1.5, 2.5

#### Description
Enable full offline functionality with content caching and progress syncing.

#### Technical Details
- Cache all images and audio locally
- Offline-first progress tracking
- Sync when connection available
- Download management
- Storage optimization

#### Implementation
1. **Asset Caching**
   - Download content packs by level
   - Manage storage limits
   - Background downloads
   - Update checking

2. **Offline Data**
   - Local progress storage (MMKV)
   - Queue sync operations
   - Conflict resolution
   - Data integrity checks

3. **User Experience**
   - Offline indicator
   - Download progress
   - Storage management
   - Seamless transition online/offline

#### Acceptance Criteria
- [ ] App works fully offline after initial download
- [ ] Content downloads in background
- [ ] Progress saves offline
- [ ] Sync works automatically when online
- [ ] Storage usage is optimized
- [ ] No data loss during sync

---

### Story 6.4: Add Accessibility Features
**Priority:** High | **Effort:** 10 hours | **Dependencies:** 1.8

#### Description
Implement comprehensive accessibility features including screen reader support, high contrast, and switch control.

#### Features
1. **Screen Reader Support**
   - Proper accessibility labels
   - Semantic grouping
   - Focus management
   - Announcements

2. **Visual Accessibility**
   - High contrast mode
   - Adjustable text sizes
   - Color-blind friendly palette
   - Reduced motion option

3. **Motor Accessibility**
   - Switch control support
   - Larger touch targets
   - Simplified gestures
   - Longer interaction times

4. **Auditory Accessibility**
   - Visual feedback for all audio
   - Captions for spoken content
   - Adjustable audio speed
   - Visual-only mode option

#### Acceptance Criteria
- [ ] VoiceOver (iOS) works correctly
- [ ] TalkBack (Android) works correctly
- [ ] High contrast mode available
- [ ] Text size adjustable
- [ ] Switch control functional
- [ ] All audio has visual equivalent
- [ ] WCAG 2.1 AA compliant

---

### Story 6.5: Performance Optimization
**Priority:** High | **Effort:** 8 hours | **Dependencies:** All previous

#### Description
Optimize app performance for smooth experience on older devices and faster load times.

#### Optimization Areas
1. **Bundle Size**
   - Code splitting by route
   - Tree shaking unused code
   - Compress assets
   - Lazy loading

2. **Runtime Performance**
   - Memoization (React.memo, useMemo)
   - FlashList for long lists
   - Image optimization (WebP, caching)
   - Reanimated worklets

3. **Load Time**
   - Asset preloading
   - Splash screen optimization
   - Critical path loading
   - Background loading

4. **Memory Management**
   - Proper cleanup
   - Image memory management
   - Audio unloading
   - Leak detection

#### Performance Targets
- App launch: < 2 seconds
- Screen transitions: < 300ms
- Animations: Consistent 60fps
- Memory: < 100MB typical usage
- Bundle size: < 20MB

#### Acceptance Criteria
- [ ] App meets performance targets
- [ ] No memory leaks detected
- [ ] Animations smooth on older devices
- [ ] Bundle size under target
- [ ] Load times improved from baseline

---

## Phase 7: Launch Prep (Weeks 19-20)

### Story 7.1: Set Up Analytics & Error Tracking
**Priority:** Critical | **Effort:** 4 hours | **Dependencies:** None

#### Description
Implement analytics to understand usage patterns and error tracking to identify issues quickly.

#### Tools
- **Analytics**: Expo Analytics or Firebase Analytics
- **Error Tracking**: Sentry for React Native
- **Performance**: Firebase Performance Monitoring

#### Events to Track
1. **User Journey**
   - App opens
   - Activity starts/completes
   - Level progression
   - Reward unlocks

2. **Learning Metrics**
   - Words practiced
   - Success rates
   - Time per activity
   - Streaks maintained

3. **Technical**
   - Crashes/errors
   - API failures
   - Load times
   - Device info

#### Privacy Considerations
- COPPA compliance (no PII)
- Aggregate data only
- Opt-out option
- Clear privacy policy

#### Acceptance Criteria
- [ ] Analytics integrated and tracking
- [ ] Error tracking catches crashes
- [ ] No PII collected
- [ ] Performance monitoring active
- [ ] Dashboard accessible to team
- [ ] Privacy policy updated

---

### Story 7.2: Security Audit & COPPA Compliance
**Priority:** Critical | **Effort:** 8 hours | **Dependencies:** All features

#### Description
Conduct security audit and ensure full COPPA compliance for children's app.

#### Security Checklist
- [ ] No external links accessible from kid mode
- [ ] Secure data storage (encryption)
- [ ] No data transmission without consent
- [ ] Parent gate tested and secure
- [ ] No third-party trackers in kid mode
- [ ] Secure API communication (HTTPS)
- [ ] Input validation
- [ ] Dependency security scan

#### COPPA Requirements
- [ ] No personal info collection from children
- [ ] Parental consent mechanism
- [ ] Clear privacy policy
- [ ] Data deletion capability
- [ ] No targeted advertising
- [ ] Age-gating for features
- [ ] Compliance documentation

#### Acceptance Criteria
- [ ] Security audit passed
- [ ] COPPA compliance verified
- [ ] Privacy policy published
- [ ] Parental controls functional
- [ ] No security vulnerabilities
- [ ] Legal review completed

---

### Story 7.3: App Store Assets & Metadata
**Priority:** Critical | **Effort:** 8 hours | **Dependencies:** None

#### Description
Create all required assets for App Store and Google Play listings.

#### Required Assets

**App Store (iOS)**
- [ ] Icon (1024x1024px)
- [ ] Screenshots (6.5", 5.5" displays)
- [ ] App preview video (15-30 sec)
- [ ] Description (170 char subtitle, 4000 char description)
- [ ] Keywords
- [ ] Age rating
- [ ] Privacy policy URL
- [ ] Support URL

**Google Play (Android)**
- [ ] Icon (512x512px)
- [ ] Feature graphic (1024x500px)
- [ ] Screenshots (multiple sizes)
- [ ] Promo video
- [ ] Description (short: 80 char, full: 4000 char)
- [ ] Category: Education
- [ ] Content rating questionnaire
- [ ] Privacy policy URL

#### Marketing Copy
- Compelling description highlighting benefits
- Target keywords for ASO (App Store Optimization)
- Age-appropriate screenshots
- Parent testimonials (if available)
- Feature highlights

#### Acceptance Criteria
- [ ] All assets created in correct sizes
- [ ] Screenshots show key features
- [ ] Description is compelling and clear
- [ ] Keywords optimized for discovery
- [ ] Age rating appropriate
- [ ] All links functional
- [ ] Copy proofread and approved

---

### Story 7.4: Beta Testing Program
**Priority:** High | **Effort:** 10 hours | **Dependencies:** All features complete

#### Description
Run beta testing program with target users (parents and children) to gather feedback and identify issues.

#### Beta Testing Plan

**Participants**
- 20-30 families
- Children ages 3-7
- Mix of speech development levels
- Geographic diversity (language testing)

**Testing Duration**
- 2 weeks intensive testing
- Daily usage encouraged
- Feedback collection midpoint and end

**Feedback Collection**
- In-app feedback form (parent mode)
- Weekly survey
- User interviews (5-10 families)
- Analytics review
- Bug reports

**Focus Areas**
- Engagement: Do kids want to use app?
- Effectiveness: Are kids learning?
- Usability: Can kids navigate independently?
- Parent value: Do parents find it useful?
- Technical: Any bugs or performance issues?

#### Acceptance Criteria
- [ ] 20+ families enrolled
- [ ] TestFlight (iOS) setup complete
- [ ] Google Play Beta setup complete
- [ ] Feedback mechanism working
- [ ] All critical bugs fixed
- [ ] Positive feedback on core experience
- [ ] Data supports learning outcomes

---

### Story 7.5: Final QA & App Store Submission
**Priority:** Critical | **Effort:** 12 hours | **Dependencies:** 7.4

#### Description
Complete final quality assurance testing and submit to App Store and Google Play.

#### QA Test Plan

**Functional Testing**
- [ ] All activities work as expected
- [ ] Navigation flows correctly
- [ ] Audio plays properly
- [ ] Progress saves and loads
- [ ] Rewards trigger correctly
- [ ] Parent mode accessible
- [ ] Settings apply correctly
- [ ] Multi-language works

**Device Testing**
- [ ] iOS: iPhone SE, iPhone 14, iPad
- [ ] Android: Samsung Galaxy, Pixel, Tablet
- [ ] Various OS versions
- [ ] Different screen sizes

**Edge Cases**
- [ ] Airplane mode/offline
- [ ] Low storage
- [ ] App backgrounding/foregrounding
- [ ] Interruptions (calls, notifications)
- [ ] Fresh install
- [ ] App updates

**Submission Checklist**

**App Store (iOS)**
- [ ] Build uploaded via EAS
- [ ] All metadata complete
- [ ] Screenshots uploaded
- [ ] Privacy details filled
- [ ] App review notes written
- [ ] Test account provided (if needed)
- [ ] Submit for review

**Google Play (Android)**
- [ ] AAB uploaded via EAS
- [ ] All metadata complete
- [ ] Screenshots uploaded
- [ ] Content rating complete
- [ ] Privacy policy linked
- [ ] Release notes written
- [ ] Submit for review

#### Acceptance Criteria
- [ ] All QA tests passed
- [ ] No critical bugs remaining
- [ ] App submitted to both stores
- [ ] Review notes comprehensive
- [ ] Test accounts work
- [ ] Ready for launch

---

## Summary Checklist

### Phase 1: Foundation ✓
- [ ] 1.1 Initialize Expo Project
- [ ] 1.2 Configure NativeWind
- [ ] 1.3 Install Fonts
- [ ] 1.4 Configure i18next
- [ ] 1.5 Set Up React Query
- [ ] 1.6 Configure MMKV Storage
- [ ] 1.7 Create Folder Structure
- [ ] 1.8 Build UI Component Library

### Phase 2: Kid Mode Core ✓
- [ ] 2.1 Kid Mode Home Screen
- [ ] 2.2 Audio Playback System
- [ ] 2.3 Picture Cards Activity
- [ ] 2.4 Create Word Content Database (100+ words)
- [ ] 2.5 Implement Reward System

### Phase 3: Advanced Activities ✓
- [ ] 3.1 Sound Matching Game
- [ ] 3.2 Bubble Pop Phonics
- [ ] 3.3 Interactive Story Time
- [ ] 3.4 Memory Matching Game

### Phase 4: Parent Mode ✓
- [ ] 4.1 Parent Mode Gate
- [ ] 4.2 Progress Dashboard
- [ ] 4.3 Profile Management
- [ ] 4.4 Settings Screen
- [ ] 4.5 Progress Reports & Export

### Phase 5: Adaptive Learning ✓
- [ ] 5.1 Progress Tracking Algorithm
- [ ] 5.2 Adaptive Difficulty System
- [ ] 5.3 Daily Challenge Generator

### Phase 6: Polish & Expansion ✓
- [ ] 6.1 Add 3 More Languages
- [ ] 6.2 Expand to 500+ Words
- [ ] 6.3 Implement Offline Mode
- [ ] 6.4 Add Accessibility Features
- [ ] 6.5 Performance Optimization

### Phase 7: Launch Prep ✓
- [ ] 7.1 Analytics & Error Tracking
- [ ] 7.2 Security Audit & COPPA
- [ ] 7.3 App Store Assets
- [ ] 7.4 Beta Testing
- [ ] 7.5 Final QA & Submission

---

## Development Best Practices

### Code Quality
- Write TypeScript for all files
- Follow ESLint rules
- Use Prettier for formatting
- Write meaningful comments
- Keep components small and focused

### Testing
- Unit tests for utilities and hooks
- Component tests for UI
- Integration tests for features
- Manual testing on real devices

### Git Workflow
- Feature branches for each story
- Meaningful commit messages
- Pull request reviews
- Keep main branch deployable

### Performance
- Profile before optimizing
- Measure impact of changes
- Use React DevTools
- Monitor memory usage
- Test on low-end devices

---

**Document Complete** | **Total Stories: 35** | **Estimated Duration: 18-20 weeks**