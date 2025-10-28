# Logoped - Speech Therapy App for Kids
## Project Requirements Document

---

## 1. Project Overview

### 1.1 Purpose
A mobile application designed to help children aged 3-7 years old who are experiencing delays or difficulties in speech development. The app provides interactive, game-based learning experiences to encourage language acquisition through proven speech therapy techniques.

### 1.2 Vision
To create an engaging, child-friendly platform that makes speech therapy accessible, fun, and effective for young children, while providing parents and therapists with tools to track progress.

---

## 2. Target Audience

### 2.1 Primary Users
- **Children**: Ages 3-7 years old with speech delays or difficulties
- **Skill Levels**: Pre-verbal to early speakers
- **Attention Span**: 5-15 minutes per session

### 2.2 Secondary Users
- **Parents/Caregivers**: Monitor progress, manage settings
- **Speech Therapists**: Track patient progress, customize exercises

---

## 3. Technology Stack

### 3.1 Core Framework
- **Expo SDK** (Latest version ~51+)
  - Expo Router for navigation
  - Expo AV for audio/video
  - Expo Speech for text-to-speech
  - Expo Haptics for tactile feedback
  - Expo Localization for language detection

### 3.2 UI & Styling
- **NativeWind** (Tailwind CSS for React Native)
  - Consistent design system
  - Responsive layouts
  - Dark/Light mode support (parent mode only)

### 3.3 Animation & Interactions
- **React Native Reanimated** (v3+)
  - Smooth 60fps animations
  - Gesture handling
  - Interactive feedback for kids
- **Lottie React Native** for complex animations

### 3.4 State Management & Data
- **TanStack Query (React Query)** (v5+)
  - Server state management
  - Caching and synchronization
  - Offline support
- **Zustand** or **Jotai** for local state
- **AsyncStorage/MMKV** for persistent storage

### 3.5 Internationalization
- **i18next** with **react-i18next**
  - Support for multiple languages (English, Spanish, French, German, Polish, etc.)
  - RTL support for Arabic, Hebrew
  - Dynamic language switching

### 3.6 Audio & Media
- **Expo AV** for audio playback
- **Expo Speech** for pronunciation examples
- **react-native-sound** as backup for complex audio needs

### 3.7 Analytics & Monitoring
- **Expo Analytics** or **Firebase Analytics**
- **Sentry** for error tracking

---

## 4. Learning Strategies & Pedagogy

### 4.1 Speech Therapy Methodologies

#### 4.1.1 Core Approaches
1. **Visual Association Learning**
   - Connect images with words
   - Use bright, clear illustrations
   - Animate objects to maintain attention

2. **Repetition & Reinforcement**
   - Spaced repetition algorithm
   - Positive reinforcement with rewards
   - Multiple exposure to same words in different contexts

3. **Multisensory Learning**
   - Visual (images, animations)
   - Auditory (clear pronunciation, fun sounds)
   - Tactile (touch interactions, haptic feedback)

4. **Phonetic Progression**
   - Start with simple sounds (ma, ba, pa)
   - Progress to complex combinations
   - Focus on commonly difficult sounds

### 4.2 Level Structure

#### Level 1: Sound Exploration (Ages 3-4)
**Focus**: Basic phonemes and sound awareness
- **Activities**:
  - Animal sounds (moo, woof, meow)
  - Environmental sounds (car, water, bell)
  - Simple vowel sounds (aaa, ooo, eee)
  - Blowing/breathing exercises (visual bubbles)
- **Duration**: 3-5 minutes
- **Rewards**: Animated stickers

#### Level 2: First Words (Ages 3-5)
**Focus**: Single syllable words, familiar objects
- **Categories**:
  - Family (mama, papa, baby)
  - Food (milk, cookie, apple)
  - Toys (ball, car, doll)
  - Body parts (nose, hand, foot)
- **Activities**:
  - Point and repeat
  - Match word to image
  - Fill-in-the-blank with voice
- **Duration**: 5-7 minutes
- **Rewards**: Unlock new themes

#### Level 3: Word Building (Ages 4-6)
**Focus**: Two-syllable words, action verbs
- **Categories**:
  - Actions (eating, running, sleeping)
  - Animals (bunny, kitty, puppy)
  - Objects (table, water, window)
- **Activities**:
  - Syllable clapping games
  - Combine images (sun + flower = sunflower)
  - Simple sentence building (I see __)
- **Duration**: 7-10 minutes
- **Rewards**: Mini-games unlock

#### Level 4: Sentences & Expression (Ages 5-7)
**Focus**: Simple sentences, emotional expression
- **Activities**:
  - Complete the sentence
  - Story sequencing (3-4 images)
  - Emotion recognition and naming
  - Question-answer games (What is this? It's a...)
- **Duration**: 10-15 minutes
- **Rewards**: Story unlocks, character customization

#### Level 5: Conversation Skills (Ages 6-7)
**Focus**: Complex sentences, social language
- **Activities**:
  - Role-play scenarios
  - Multiple-turn conversations
  - Problem-solving dialogues
  - Describing pictures
- **Duration**: 12-15 minutes
- **Rewards**: Achievement badges, new avatars

### 4.3 Adaptive Learning System
- Track individual progress per phoneme/word
- Identify struggling areas and provide extra practice
- Adjust difficulty based on success rate
- Celebrate small wins to maintain motivation

---

## 5. Core Features

### 5.1 Kid Mode (Primary Interface)

#### 5.1.1 Home Screen
- **Large, colorful icons** for each activity
- **Character avatar** (customizable)
- **Progress visualization** (simple star/badge system)
- **Daily challenge** indicator
- **Maximum 4-6 options** on screen at once

#### 5.1.2 Learning Activities

**A. Word of the Day**
- New word introduced daily
- Multiple exposure throughout the day
- 5 different contexts/activities

**B. Picture Cards**
- Tap to hear pronunciation
- Repeat button (microphone icon)
- Visual feedback when speaking
- Categories: Animals, Food, Toys, Family, etc.

**C. Sound Matching**
- Hear a sound/word
- Select matching image from 2-4 options
- Increasing difficulty levels

**D. Bubble Pop Phonics**
- Bubbles with letters/syllables
- Pop to hear the sound
- Combine bubbles to make words

**E. Story Time**
- Interactive stories with simple text
- Tap words to hear pronunciation
- Characters animated
- Pause and repeat functionality

**F. Sing-Along Songs**
- Simple, repetitive songs
- Karaoke-style word highlighting
- Focus on speech therapy targets

**G. Memory Games**
- Match words to images
- Match similar sounds
- Builds vocabulary retention

**H. Mirror Practice**
- Use camera to show child their face
- Side-by-side with animated character
- Encourages mouth movement observation

#### 5.1.3 Reward System
- **Stars**: Earned per activity completion
- **Stickers**: Collectible after milestones
- **Character Customization**: Unlock hats, accessories
- **Garden/Aquarium**: Virtual pet that grows with progress
- **Celebration Animations**: Confetti, balloons, cheers

### 5.2 Parent/Therapist Mode

#### 5.2.1 Dashboard
- Overall progress charts
- Time spent per activity
- Words mastered vs. struggling
- Streaks and consistency metrics
- Comparison to age-appropriate milestones

#### 5.2.2 Settings & Customization
- **Profile Management**: Multiple child profiles
- **Language Selection**: Interface and content language
- **Difficulty Adjustment**: Manual override
- **Focus Areas**: Select specific phonemes/sounds to practice
- **Session Duration**: Set time limits
- **Voice Recording**: Toggle on/off
- **Content Filtering**: Select age-appropriate content

#### 5.2.3 Progress Reports
- Weekly summary emails/notifications
- Exportable PDF reports for therapists
- Activity history and completion rates
- Recommendations for focus areas

#### 5.2.4 Custom Word Lists
- Add personalized vocabulary
- Upload family photos with labels
- Record custom pronunciations
- Create custom lessons

### 5.3 General Features

#### 5.3.1 Offline Support
- Core activities available offline
- Progress synced when online
- Downloadable content packs

#### 5.3.2 Accessibility
- High contrast mode
- Adjustable text/icon sizes
- Closed captions for all audio
- Switch control support
- Screen reader compatibility

#### 5.3.3 Safety & Privacy
- No ads in kid mode
- COPPA compliant
- No external links accessible to kids
- Parent-gated settings
- Local-first data storage option

---

## 6. UI/UX Design Guidelines

### 6.1 Visual Design Principles

#### 6.1.1 Color Palette
**Primary Colors** (Bright, engaging)
- Sky Blue: #4A90E2
- Sunshine Yellow: #FFD166
- Grass Green: #06D6A0
- Coral Pink: #EF476F
- Lavender: #9B89B3

**Secondary Colors** (Supporting)
- Soft backgrounds: #F7F9FC
- Dark text: #2D3748
- Success: #48BB78
- Warning: #F6AD55

#### 6.1.2 Typography
- **Headings**: Rounded, friendly fonts (e.g., Quicksand, Fredoka)
- **Body**: Clear, highly legible (e.g., Nunito, Poppins)
- **Minimum size**: 18px for children's content
- **High contrast**: Dark text on light backgrounds

#### 6.1.3 Icons & Illustrations
- **Large touch targets**: Minimum 60x60dp
- **Simple, bold illustrations**: No fine details
- **Consistent style**: Cartoon/flat design
- **Cultural sensitivity**: Diverse representation

#### 6.1.4 Animations
- **Smooth transitions**: 300-500ms
- **Celebratory**: Bouncy, joyful
- **Loading states**: Entertaining (e.g., spinning toy)
- **Never block interaction**: Can skip animations

### 6.2 Navigation Structure

```
App Root
│
├── Kid Mode (Default)
│   ├── Home
│   │   ├── Today's Challenge
│   │   ├── Free Play
│   │   └── My Progress (simplified)
│   │
│   ├── Learning Activities
│   │   ├── Picture Cards
│   │   ├── Sound Matching
│   │   ├── Bubble Pop
│   │   ├── Story Time
│   │   ├── Sing-Along
│   │   ├── Memory Game
│   │   └── Mirror Practice
│   │
│   ├── Rewards
│   │   ├── Sticker Collection
│   │   ├── Character Customization
│   │   └── Virtual Pet/Garden
│   │
│   └── [Parent Mode Gate] (Hidden button, e.g., tap corners)
│
└── Parent/Therapist Mode
    ├── Dashboard
    ├── Child Profiles
    ├── Progress Reports
    ├── Settings
    │   ├── Language
    │   ├── Difficulty
    │   ├── Focus Areas
    │   ├── Notifications
    │   └── Privacy
    ├── Custom Content
    └── Help & Support
```

### 6.3 Interaction Patterns

#### 6.3.1 Touch Interactions
- **Tap**: Select, activate
- **Long press**: Preview (hear word without committing)
- **Swipe**: Navigate between activities (with visual indicator)
- **Drag**: Matching activities
- **Multi-touch**: Disabled to prevent confusion

#### 6.3.2 Feedback
- **Visual**: Color change, scale animation, particle effects
- **Audio**: Success sounds, encouraging voice
- **Haptic**: Light tap on success, gentle pattern on error
- **No negative feedback**: Redirect, don't punish

---

## 7. Multilingual Support

### 7.1 Supported Languages (Initial Launch)
1. English (US, UK)
2. Spanish (Spain, Latin America)
3. French
4. German
5. Polish
6. Italian
7. Portuguese (Brazil, Portugal)

### 7.2 Language-Specific Content
- **Phoneme Libraries**: Language-specific sounds
- **Word Lists**: Culturally appropriate vocabulary
- **Voice Recordings**: Native speakers (clear, slow pronunciation)
- **Illustrations**: Culturally sensitive images

### 7.3 Implementation Strategy
- **Namespaced translations**: Separate by feature/screen
- **Lazy loading**: Load language packs on demand
- **Fallback chain**: English as default fallback
- **Plural rules**: Proper pluralization per language
- **Date/Number formatting**: Locale-specific

---

## 8. Data Models

### 8.1 User Profile
```typescript
interface ChildProfile {
  id: string;
  name: string;
  age: number;
  dateOfBirth: Date;
  avatarConfig: AvatarCustomization;
  currentLevel: number;
  focusAreas: PhonemeTarget[];
  language: LanguageCode;
  createdAt: Date;
  lastActiveAt: Date;
}
```

### 8.2 Progress Tracking
```typescript
interface UserProgress {
  userId: string;
  wordsLearned: WordProgress[];
  phonemesMastered: PhonemeProgress[];
  activitiesCompleted: ActivityCompletion[];
  totalStars: number;
  currentStreak: number;
  achievements: Achievement[];
}

interface WordProgress {
  wordId: string;
  attempts: number;
  successRate: number;
  lastPracticed: Date;
  masteryLevel: 'new' | 'learning' | 'practicing' | 'mastered';
}
```

### 8.3 Content Models
```typescript
interface Word {
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

interface Activity {
  id: string;
  type: ActivityType;
  level: number;
  targetWords: string[];
  targetPhonemes: string[];
  duration: number; // estimated minutes
  instructions: Record<LanguageCode, string>;
}
```

---

## 9. Technical Architecture

### 9.1 Project Structure
```
/logoped
├── /app                    # Expo Router pages
│   ├── (kid)              # Kid mode screens
│   ├── (parent)           # Parent mode screens
│   ├── _layout.tsx        # Root layout
│   └── index.tsx          # Entry point
├── /components
│   ├── /kid               # Kid-friendly components
│   ├── /parent            # Parent dashboard components
│   ├── /shared            # Reusable components
│   └── /ui                # Base UI components (buttons, cards, etc.)
├── /features              # Feature-based modules
│   ├── /words
│   ├── /activities
│   ├── /progress
│   └── /rewards
├── /lib
│   ├── /api               # API client (React Query)
│   ├── /audio             # Audio utilities
│   ├── /storage           # AsyncStorage/MMKV
│   └── /utils             # Helper functions
├── /assets
│   ├── /images
│   ├── /audio
│   ├── /animations
│   └── /fonts
├── /locales               # i18next translations
│   ├── en.json
│   ├── es.json
│   └── ...
├── /types                 # TypeScript definitions
├── /constants             # App constants
└── /hooks                 # Custom React hooks
```

### 9.2 State Management Strategy
- **Server State**: React Query (words, activities, content)
- **Local State**: Zustand (user progress, settings, UI state)
- **Persistent State**: MMKV (preferences, offline data)
- **Form State**: React Hook Form (parent settings)

### 9.3 Performance Optimization
- **Image optimization**: WebP format, lazy loading
- **Code splitting**: Feature-based lazy loading
- **Memoization**: React.memo, useMemo, useCallback
- **List virtualization**: FlashList for long lists
- **Bundle size**: Tree-shaking, compression

---

## 10. Development Phases

### Phase 1: Foundation (Weeks 1-3)
**Goal**: Project setup and core infrastructure

- [ ] Initialize Expo project with TypeScript
- [ ] Set up NativeWind and design system
- [ ] Configure i18next with 2 base languages (English, Spanish)
- [ ] Set up React Query and storage
- [ ] Implement basic navigation (Expo Router)
- [ ] Create design system components (Button, Card, Icon)
- [ ] Set up folder structure

### Phase 2: Kid Mode Core (Weeks 4-7)
**Goal**: Essential learning activities for kids

- [ ] Implement Home screen for kids
- [ ] Build Picture Cards activity (Level 1-2 content)
- [ ] Build Sound Matching activity
- [ ] Implement basic reward system (stars, stickers)
- [ ] Add audio playback functionality
- [ ] Create avatar customization
- [ ] Add 50-100 basic words with audio

### Phase 3: Advanced Activities (Weeks 8-10)
**Goal**: More engaging learning experiences

- [ ] Implement Bubble Pop Phonics
- [ ] Build Story Time feature
- [ ] Add Sing-Along Songs
- [ ] Create Memory Game
- [ ] Implement Mirror Practice (camera)
- [ ] Add Level 3-4 content (200+ words)
- [ ] Enhance animations and interactions

### Phase 4: Parent Mode (Weeks 11-13)
**Goal**: Monitoring and customization for parents

- [ ] Build parent mode gate/authentication
- [ ] Create dashboard with progress charts
- [ ] Implement child profile management
- [ ] Add progress reports and export
- [ ] Build settings screens
- [ ] Implement custom word lists
- [ ] Add notification system

### Phase 5: Adaptive Learning (Weeks 14-15)
**Goal**: Personalized learning paths

- [ ] Implement progress tracking algorithm
- [ ] Build adaptive difficulty system
- [ ] Create spaced repetition logic
- [ ] Add focus area recommendations
- [ ] Implement achievement system
- [ ] Build daily challenge generator

### Phase 6: Polish & Expansion (Weeks 16-18)
**Goal**: Refinement and additional content

- [ ] Add 3 more languages
- [ ] Expand to 500+ words
- [ ] Add Level 5 content
- [ ] Implement offline mode
- [ ] Add accessibility features
- [ ] Performance optimization
- [ ] User testing with target audience
- [ ] Bug fixes and refinements

### Phase 7: Launch Prep (Weeks 19-20)
**Goal**: Production readiness

- [ ] Set up analytics and error tracking
- [ ] Security audit
- [ ] App store assets (screenshots, descriptions)
- [ ] Privacy policy and terms
- [ ] Beta testing (TestFlight/Google Play Beta)
- [ ] Final QA testing
- [ ] App store submission

---

## 11. Success Metrics

### 11.1 Engagement Metrics
- Daily active users (DAU)
- Session duration (target: 10-15 min/day)
- Retention rate (Day 1, Day 7, Day 30)
- Activities completed per session
- Streak maintenance

### 11.2 Learning Metrics
- Words learned per week
- Progress through levels
- Success rate per activity type
- Time to word mastery
- Phoneme improvement over time

### 11.3 Technical Metrics
- App crash rate (<0.1%)
- Load time (<2 seconds)
- API response time (<500ms)
- Offline capability usage

---

## 12. Compliance & Safety

### 12.1 Privacy Regulations
- **COPPA** (Children's Online Privacy Protection Act)
  - No personal data collection from children under 13 without parental consent
  - Clear privacy policy
  - Parental controls for data management

- **GDPR** (for EU users)
  - Right to access, delete, export data
  - Clear consent mechanisms
  - Data minimization

### 12.2 Content Safety
- Age-appropriate content only
- No external links accessible from kid mode
- Moderated custom content (parent uploads)
- No in-app purchases in kid mode
- No ads

### 12.3 Accessibility Standards
- WCAG 2.1 Level AA compliance
- Screen reader support
- Keyboard navigation
- Color contrast ratios
- Alternative text for images

---

## 13. Future Enhancements (Post-Launch)

### 13.1 V2 Features
- **AI Speech Recognition**: Real-time pronunciation feedback
- **Video Modeling**: Watch therapist demonstrate sounds
- **Parent-Child Activities**: Interactive games requiring both
- **Social Features**: Safe, moderated peer interactions
- **AR Mode**: Interactive 3D objects to name
- **Therapist Portal**: Professional dashboard for tracking patients

### 13.2 Content Expansion
- More languages (Arabic, Mandarin, Japanese, etc.)
- Specialized content for specific speech disorders (apraxia, articulation disorders)
- Seasonal and cultural themes
- Chapter books for advanced readers

### 13.3 Platform Expansion
- Web version for desktop practice
- Smart TV app for larger screen practice
- Wearable integration (reminders, rewards)
- Integration with speech therapy platforms

---

## 14. Resources & References

### 14.1 Speech Therapy Resources
- American Speech-Language-Hearing Association (ASHA) guidelines
- Evidence-based articulation therapy techniques
- Childhood apraxia of speech resources
- Language development milestones (CDC)

### 14.2 Child Development
- Attention span by age
- Screen time recommendations (AAP)
- Age-appropriate learning styles
- Inclusive design for neurodiverse children

### 14.3 Technical Documentation
- Expo documentation
- React Native best practices
- NativeWind setup and usage
- React Query documentation
- i18next best practices

---

## 15. Team & Roles

### 15.1 Recommended Team Structure
- **Product Owner**: Vision and requirements
- **UX/UI Designer**: Child-friendly design
- **React Native Developers** (2-3): Frontend implementation
- **Backend Developer**: API and data management (if needed)
- **Speech Therapist Consultant**: Content validation
- **Child Psychologist Consultant**: Age-appropriate design
- **QA Tester**: Quality assurance
- **Content Creator**: Words, audio, images
- **Voice Artists**: Native speakers for audio

---

## 16. Budget Considerations

### 16.1 Development Costs
- Developer salaries (4-6 months)
- Design tools and assets
- Testing devices (iOS/Android)
- Developer accounts (Apple, Google)

### 16.2 Content Creation
- Voice recording and editing
- Illustration/animation commissioning
- Audio editing software
- Translation services

### 16.3 Infrastructure
- Cloud storage (images, audio)
- Database hosting
- CDN for content delivery
- Analytics and monitoring tools

### 16.4 Ongoing Costs
- App store fees
- Server/hosting
- Maintenance and updates
- Customer support
- Marketing

---

## 17. Risk Assessment

### 17.1 Technical Risks
- **Audio playback issues** on various devices
  - Mitigation: Extensive device testing, fallback mechanisms
- **Performance** on older devices
  - Mitigation: Optimization, minimum requirements
- **Offline sync conflicts**
  - Mitigation: Robust conflict resolution strategy

### 17.2 Content Risks
- **Cultural insensitivity** in illustrations/words
  - Mitigation: Diverse review team, cultural consultants
- **Incorrect phonetic guidance**
  - Mitigation: Professional speech therapist review

### 17.3 Business Risks
- **User adoption** among target audience
  - Mitigation: Beta testing, iterative design, parent education
- **Competition** from existing apps
  - Mitigation: Unique features, superior UX, evidence-based approach

---

## Conclusion

This document serves as a comprehensive blueprint for developing a speech therapy app that is both educationally effective and engaging for young children. The combination of modern technology, evidence-based speech therapy techniques, and child-centered design will create a valuable tool for families and therapists supporting children's language development.

**Next Steps:**
1. Review and approve requirements
2. Create detailed wireframes and mockups
3. Set up development environment
4. Begin Phase 1 implementation
5. Engage speech therapy and child development consultants
6. Plan user testing sessions with target audience

---

*Document Version: 1.0*
*Last Updated: 2025-10-28*
*Status: Draft for Review*
