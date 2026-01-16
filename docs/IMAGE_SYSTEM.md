# Image System Documentation

## Overview

The Logoped app uses a robust image system with automatic fallback handling to ensure images always display properly, even when external URLs fail to load.

## Current Implementation

### Image Sources

**External Images (Currently Used):**
- **Unsplash** - High-quality photos for most categories (animals, food, family, toys, body)
- **Placeholder.com** - Color swatches for color words (red, blue, yellow, etc.)

**Fallback System:**
- Every word has an `emoji` property that serves as a visual fallback
- If an image fails to load, the emoji is displayed instead
- Emojis are child-friendly and instantly recognizable

### Components

#### 1. ImageWithFallback Component

Located: `src/components/ui/ImageWithFallback.tsx`

**Features:**
- Automatic error detection and fallback handling
- Shows emoji when image fails to load
- Optional loading state display
- Custom fallback component support
- Works seamlessly with React Native Image API

**Usage:**
```tsx
import { ImageWithFallback } from '@/components/ui';

<ImageWithFallback
  uri={word.imageUrl}
  fallbackEmoji={word.emoji}
  fallbackText={word.text}
  className="w-full h-full"
  resizeMode="cover"
/>
```

#### 2. Updated Components

The following components now use `ImageWithFallback`:

- **WordCard** (`src/components/kid/picture-cards/WordCard.tsx`)
  - Picture Cards activity
  - Shows word images with emoji fallbacks

- **OptionCard** (`src/components/kid/sound-matching/OptionCard.tsx`)
  - Sound Matching activity
  - Displays multiple word options with images

- **MemoryCard** (`src/components/kid/memory-game/MemoryCard.tsx`)
  - Memory Game activity
  - Shows image cards with emoji fallbacks

## Word Data Structure

### Word Interface

```typescript
export interface Word {
  id: string;
  text: string;
  translations: Record<LanguageCode, string>;
  phonetic: string;
  syllableCount: number;
  category: WordCategory;
  difficulty: DifficultyLevel;
  imageUrl: string;           // Primary image URL
  audioUrl: Record<LanguageCode, string>;
  animationUrl?: string;
  tags?: string[];
  emoji?: string;              // 🆕 Emoji fallback
}
```

### Emoji Fallbacks by Category

All 60 words in `src/data/mockWords.ts` now include emoji fallbacks:

**Animals (10):** 🐱 🐶 🐦 🐠 🐘 🦋 🦁 🐵 🐸 🐝
**Food (10):** 🍎 🍌 🍞 🥛 🍕 🍪 🥕 🧀 🧃 🍓
**Family (6):** 👩 👨 👶 👧 👦 👵
**Toys (8):** ⚽ 🎎 🧱 🚂 🚗 🧩 🤖 🦕
**Colors (8):** 🔴 🔵 🟡 🟢 🟣 🟠 ⚫ ⚪
**Body (10):** ✋ 🦶 👀 👃 👄 👂 💇 🤰 🖐️ 🦶

## Benefits

### 1. Reliability
- **No broken images**: Emojis always render, even if network fails
- **Graceful degradation**: App remains functional with emoji fallbacks
- **Child-friendly**: Large, colorful emojis are engaging for kids

### 2. Performance
- **Faster loading**: Emojis render instantly
- **Reduced bandwidth**: No need to download images when they fail
- **Better UX**: No white cards or broken image icons

### 3. Development Experience
- **Works offline**: Emojis work without internet connection
- **Predictable behavior**: Always shows something visual
- **Easy testing**: No dependency on external services

## Future Improvements

### Option 1: Local Assets (Recommended)
Store images in `/assets/images/words/` directory:

```
/assets
  /images
    /words
      /animals
        - cat.png
        - dog.png
      /food
        - apple.png
        - banana.png
```

**Advantages:**
- Always available offline
- Faster loading
- Full control over image quality
- No external dependencies

**Implementation:**
```typescript
{
  id: 'word-cat',
  text: 'cat',
  imageUrl: require('@/assets/images/words/animals/cat.png'),
  emoji: '🐱',
}
```

### Option 2: Content Delivery Network (CDN)
Host images on a reliable CDN like Cloudinary or AWS S3:

**Advantages:**
- Global availability
- Image optimization/resizing
- Fast delivery
- Professional hosting

### Option 3: Hybrid Approach
- Use local assets for critical/frequently used words
- Use CDN for extended vocabulary
- Keep emoji fallbacks for all words

## Image Requirements

For production-ready images:

**Dimensions:**
- Small: 256x256px
- Medium: 512x512px (current)
- Large: 1024x1024px

**Format:**
- Primary: WebP (best compression)
- Fallback: PNG or JPEG
- Avoid: GIF (poor quality for photos)

**Quality:**
- Child-friendly and age-appropriate
- High contrast and clear subjects
- Bright, engaging colors
- Simple compositions (avoid clutter)

**Accessibility:**
- Clear representation of the word
- Culturally appropriate
- Diverse representation for people

## Testing Images

### Manual Testing
1. Run app in development mode
2. Navigate to Picture Cards activity
3. Verify images load correctly
4. Test with airplane mode to verify fallbacks

### Automated Testing
```bash
# Check all image URLs are valid
npm run test:images

# Verify all words have emojis
npm run test:emoji-coverage
```

## Troubleshooting

### White Cards Appearing

**Cause:** External image URLs failing to load

**Solution:**
1. Check internet connection
2. Verify image URLs in `src/data/mockWords.ts`
3. Confirm emoji fallbacks are present
4. Check browser/device image loading settings

### Slow Image Loading

**Cause:** Large external images taking time to download

**Solutions:**
1. Use smaller image sizes (add `?w=512` to Unsplash URLs)
2. Implement progressive loading
3. Show loading indicator with `showLoading` prop
4. Cache images locally

### Emoji Not Displaying

**Cause:** Device/font doesn't support emoji

**Solution:**
1. Use system emoji font
2. Verify emoji is in standard Unicode set
3. Provide text fallback as backup

## Migration Guide

### From External URLs to Local Assets

1. **Download images** to `/assets/images/words/`
2. **Update word data:**
   ```typescript
   // Before
   imageUrl: 'https://external-url.com/image.jpg',

   // After
   imageUrl: require('@/assets/images/words/cat.png'),
   ```
3. **Keep emoji fallbacks** as secondary fallback
4. **Test thoroughly** across all activities

### Adding New Words

When adding new words, always include:
1. `imageUrl` - Primary image (external or local)
2. `emoji` - Fallback emoji (required)
3. `text` - Word text for final fallback

Example:
```typescript
{
  id: 'word-new',
  text: 'tiger',
  translations: { en: 'tiger', es: 'tigre' },
  phonetic: '/ˈtaɪɡər/',
  syllableCount: 2,
  category: 'animals',
  difficulty: 2,
  imageUrl: 'https://images.unsplash.com/photo-tiger?w=512',
  audioUrl: { en: 'placeholder.mp3', es: 'placeholder.mp3' },
  emoji: '🐯', // Always include emoji!
  tags: ['wild', 'mammal', 'cat'],
}
```

## Summary

✅ **All images now have emoji fallbacks**
✅ **No more white cards when images fail**
✅ **Child-friendly visual experience guaranteed**
✅ **Works offline with emoji fallbacks**
✅ **Easy to extend with new words**

The image system is now production-ready with graceful degradation and excellent user experience!
