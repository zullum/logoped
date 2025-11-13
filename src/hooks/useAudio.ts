import { useEffect, useCallback, useState } from 'react';
import { audioPlayer } from '@/lib/audio/audioPlayer';
import { useStorageBoolean } from './useStorageState';
import { STORAGE_KEYS } from '@/lib/storage';

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
  const [soundEnabled] = useStorageBoolean(STORAGE_KEYS.SOUND_ENABLED, true);

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
  const [soundEnabled] = useStorageBoolean(STORAGE_KEYS.SOUND_ENABLED, true);

  const play = useCallback(async () => {
    if (!soundEnabled) return;

    // Map sound name to asset
    // Note: These assets don't exist yet, they're placeholders
    const soundAssets: Record<string, any> = {
      success: { uri: 'asset:/audio/success.mp3' },
      tap: { uri: 'asset:/audio/tap.mp3' },
      celebration: { uri: 'asset:/audio/celebration.mp3' },
    };

    const asset = soundAssets[soundName];
    if (!asset) {
      console.warn(`Sound effect ${soundName} not found`);
      return;
    }

    try {
      await audioPlayer.play(`sfx-${soundName}`, asset.uri);
    } catch (error) {
      console.error(`Error playing sound effect ${soundName}:`, error);
    }
  }, [soundName, soundEnabled]);

  return { play };
};
