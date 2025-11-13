# Audio Assets Directory

This directory contains all audio files for the Logoped app.

## Directory Structure

```
audio/
├── words/          # Word pronunciation audio files
│   ├── en/         # English pronunciations
│   └── es/         # Spanish pronunciations
├── effects/        # Sound effects (success, tap, celebration, etc.)
└── music/          # Background music
```

## Audio File Guidelines

### Format
- **Preferred**: MP3 (best compatibility)
- **Alternative**: M4A, WAV
- **Sample rate**: 44.1 kHz
- **Bitrate**: 128-192 kbps for speech, 256 kbps for music

### File Naming Convention

**Word Pronunciations:**
- Format: `{word_id}_{language}.mp3`
- Example: `cat_en.mp3`, `gato_es.mp3`

**Sound Effects:**
- Format: `{effect_name}.mp3`
- Example: `success.mp3`, `tap.mp3`, `celebration.mp3`

**Background Music:**
- Format: `{music_name}.mp3`
- Example: `home_bg.mp3`, `activity_bg.mp3`

## Required Sound Effects

The following sound effects are referenced in the code and should be added:

1. `effects/success.mp3` - Played when a task is completed successfully
2. `effects/tap.mp3` - Played on button taps
3. `effects/celebration.mp3` - Played on major achievements

## How to Add Audio Files

1. Place audio files in the appropriate subdirectory
2. Use lowercase, underscore-separated naming
3. Ensure files are optimized for mobile (small file size)
4. Test on both iOS and Android devices

## Current Status

⚠️ **Placeholder Directory**: This directory structure is ready for audio files.
No actual audio files are included yet.

When adding audio files:
- Update word database with correct audio URLs
- Test playback on physical devices
- Verify audio plays correctly with device on silent mode (iOS)
