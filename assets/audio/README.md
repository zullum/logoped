# Audio Assets

This directory contains audio files for the Logoped app.

## Required Audio Files

### Sound Effects (For Development)

The following sound effect files should be placed in this directory:

1. **success.mp3** - Played when a child successfully completes a word or activity
   - Duration: 1-2 seconds
   - Upbeat, positive sound (e.g., chime, bell, sparkle)

2. **tap.mp3** - Played on button taps and interactions
   - Duration: <0.5 seconds
   - Subtle click or tap sound

3. **celebration.mp3** - Played when unlocking stickers or achievements
   - Duration: 2-3 seconds
   - Joyful, exciting sound (e.g., fanfare, party horn, cheering)

4. **star-collect.mp3** - Played when earning stars
   - Duration: 1 second
   - Magical or sparkly sound

### Word Pronunciations

Word audio files will be organized by language:

```
/assets/audio/words/
  /en/
    word_1.mp3
    word_2.mp3
    ...
  /es/
    word_1.mp3
    word_2.mp3
    ...
  /fr/
  /de/
  /pl/
```

## Audio Specifications

- **Format**: MP3 (for compatibility)
- **Sample Rate**: 44.1kHz
- **Bit Rate**: 128kbps minimum
- **Channels**: Mono (sufficient for speech and effects)
- **Normalization**: -3dB peak to prevent clipping

## Sourcing Audio

### Sound Effects
- Use royalty-free sound libraries (Freesound.org, Zapsplat, etc.)
- Ensure license allows commercial use
- Test sounds with children to ensure they're engaging but not startling

### Word Pronunciations
- Record with native speakers
- Clear pronunciation, slightly slower pace for children
- Professional recording equipment recommended
- Consistent voice talent per language for familiarity

## Development Placeholders

During development, if audio files are missing:
- The app will continue to function
- Visual-only feedback will be shown
- Console warnings will indicate missing audio files

## Adding New Audio

When adding new audio files:
1. Place file in appropriate directory
2. Update audio constants in `src/constants/audio.ts` if needed
3. Ensure file is included in build via `assetBundlePatterns` in `app.json`
4. Test audio playback on both iOS and Android
