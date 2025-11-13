import { createAudioPlayer, AudioPlayer, AudioSource } from 'expo-audio';

class AudioPlayerService {
  private players: Map<string, AudioPlayer> = new Map();
  private currentPlayer: AudioPlayer | null = null;

  async initialize() {
    // expo-audio handles audio mode automatically
    // No need for manual configuration like expo-av
    console.log('Audio player initialized');
  }

  async preload(key: string, uri: string): Promise<boolean> {
    try {
      if (this.players.has(key)) {
        return true;
      }

      const player = createAudioPlayer({ uri } as AudioSource);
      this.players.set(key, player);
      return true;
    } catch (error) {
      console.warn(`Unable to preload sound ${key} (this is expected in development with mock URLs)`);
      return false;
    }
  }

  async play(key: string, uri?: string): Promise<boolean> {
    try {
      // Stop current player if playing
      if (this.currentPlayer) {
        try {
          this.currentPlayer.pause();
        } catch (e) {
          // Ignore pause errors
        }
      }

      let player = this.players.get(key);

      // If player not preloaded, create it now
      if (!player && uri) {
        const loaded = await this.preload(key, uri);
        if (!loaded) {
          return false;
        }
        player = this.players.get(key);
      }

      if (!player) {
        console.warn(`Player ${key} not found and no URI provided`);
        return false;
      }

      // Seek to start and play
      player.seekTo(0);
      player.play();
      this.currentPlayer = player;
      return true;
    } catch (error) {
      console.warn(`Unable to play sound ${key} (this is expected in development with mock URLs)`);
      return false;
    }
  }

  async stop(): Promise<void> {
    if (this.currentPlayer) {
      this.currentPlayer.pause();
      this.currentPlayer.seekTo(0);
      this.currentPlayer = null;
    }
  }

  async pause(): Promise<void> {
    if (this.currentPlayer) {
      this.currentPlayer.pause();
    }
  }

  async unload(key: string): Promise<void> {
    const player = this.players.get(key);
    if (player) {
      player.remove();
      this.players.delete(key);
    }
  }

  async unloadAll(): Promise<void> {
    for (const [key] of this.players) {
      await this.unload(key);
    }
  }
}

export const audioPlayer = new AudioPlayerService();
