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
