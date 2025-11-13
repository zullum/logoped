import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from '@/hooks/useFonts';
import { initI18n } from '@/lib/i18n/index-simple';
import { queryClient } from '@/lib/query/queryClient';
import { audioPlayer } from '@/lib/audio/audioPlayer';
import '../global.css';

// Keep the splash screen visible while we fetch resources
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
    <QueryClientProvider client={queryClient}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="(kid)" />
      </Stack>
    </QueryClientProvider>
  );
}
