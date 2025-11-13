# Logoped - Speech Therapy App for Kids

A mobile application designed to help children aged 3-7 years old with speech development through interactive, game-based learning experiences.

Built with Expo, React Native, TypeScript, and NativeWind.

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

### Required for All Platforms

- **Node.js** (v18 or later): [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git**: [Download](https://git-scm.com/)

### For iOS Development (macOS only)

- **macOS** (Ventura 13.0 or later recommended)
- **Xcode** (15.0 or later): [Download from Mac App Store](https://apps.apple.com/us/app/xcode/id497799835)
- **Xcode Command Line Tools**
- **CocoaPods** (iOS dependency manager)
- **Ruby** (v2.7 or later - usually pre-installed on macOS)

### For Android Development

- **Android Studio**: [Download](https://developer.android.com/studio)
- **Android SDK** (API Level 34 or higher)
- **Java Development Kit (JDK)** 17 or later

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd logoped
```

### 2. Install Dependencies

```bash
npm install
```

---

## 🍎 iOS Setup (macOS only)

### Step 1: Install Xcode

1. Install Xcode from the Mac App Store
2. Open Xcode and accept the license agreement
3. Install Command Line Tools:

```bash
xcode-select --install
```

4. Verify installation:

```bash
xcode-select -p
# Should output: /Applications/Xcode.app/Contents/Developer
```

### Step 2: Install CocoaPods

CocoaPods is required for iOS native dependencies.

**Check if Ruby is installed:**
```bash
ruby --version
# Should show v2.7 or later
```

**Install CocoaPods:**
```bash
# Option 1: Using gem (recommended)
sudo gem install cocoapods

# Option 2: Using Homebrew
brew install cocoapods
```

**Verify CocoaPods installation:**
```bash
pod --version
# Should show version 1.12 or later
```

### Step 3: Install iOS Pods

```bash
# Navigate to iOS directory and install pods
cd ios
pod install
cd ..
```

If you get permission errors, try:
```bash
sudo gem install cocoapods
sudo gem install activesupport -v 7.0.8
```

### Step 4: Create iOS Simulators

Open Xcode and create simulators for testing:

```bash
# Open Xcode
open -a Xcode

# In Xcode: Window → Devices and Simulators (Shift+Cmd+2)
# Click "Simulators" tab → "+" button
# Create these recommended simulators:
# - iPhone 15 (iOS 17.5+)
# - iPhone SE (3rd generation) - for smaller screens
# - iPad Pro 12.9-inch - for tablet testing
```

Or via command line:
```bash
# List available devices
xcrun simctl list devicetypes

# Create iPhone 15 simulator
xcrun simctl create "iPhone 15" "iPhone 15" "iOS17.5"
```

### Step 5: Run on iOS

```bash
# Start Metro bundler and build iOS app
npm run ios

# Or specify a simulator:
npx expo run:ios --device "iPhone 15"
```

**First build takes 5-10 minutes.** Subsequent builds are much faster.

---

## 🤖 Android Setup

### Step 1: Install Android Studio

1. Download and install [Android Studio](https://developer.android.com/studio)
2. During installation, ensure these components are selected:
   - Android SDK
   - Android SDK Platform
   - Android Virtual Device (AVD)

### Step 2: Install Android SDK

1. Open Android Studio
2. Go to: **Settings/Preferences → Appearance & Behavior → System Settings → Android SDK**
3. Install:
   - **Android 14.0 (API Level 34)** or higher
   - Under "SDK Tools" tab, check:
     - Android SDK Build-Tools
     - Android SDK Platform-Tools
     - Android Emulator
     - Intel x86 Emulator Accelerator (HAXM) - for Intel Macs
     - Google Play services

### Step 3: Set Environment Variables

Add to your `~/.zshrc` or `~/.bash_profile`:

```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
```

Then reload:
```bash
source ~/.zshrc  # or source ~/.bash_profile
```

Verify:
```bash
echo $ANDROID_HOME
# Should output: /Users/your-username/Library/Android/sdk

adb --version
# Should show Android Debug Bridge version
```

### Step 4: Create Android Virtual Device (AVD)

1. Open Android Studio
2. Go to: **Tools → Device Manager** (or **AVD Manager**)
3. Click **Create Device**
4. Select device:
   - **Pixel 7** (recommended for testing)
   - **Pixel Tablet** (for tablet testing)
5. Select system image: **Android 14 (API 34)** or higher
6. Click **Finish**

Or via command line:
```bash
# List available devices
avdmanager list device

# Create AVD
avdmanager create avd -n Pixel_7_API_34 -k "system-images;android-34;google_apis;x86_64" -d "pixel_7"
```

### Step 5: Run on Android

```bash
# Start an emulator first (or use Android Studio Device Manager)
emulator -avd Pixel_7_API_34

# In a separate terminal, run the app
npm run android
```

**First build takes 5-10 minutes.** Subsequent builds are faster.

---

## 🖥️ Development Commands

### Start Development Server

```bash
# Start Expo development server
npm start

# Options:
# Press 'a' - Open on Android
# Press 'i' - Open on iOS
# Press 'w' - Open on Web
# Press 'r' - Reload app
# Press 'j' - Open debugger
```

### Platform-Specific Builds

```bash
# iOS (macOS only)
npm run ios

# Android
npm run android

# Web
npm run web
```

### Type Checking

```bash
# Run TypeScript type checking
npm run typecheck
```

### Clear Cache (if experiencing issues)

```bash
# Clear Metro bundler cache
npx expo start --clear

# Or clear everything:
rm -rf node_modules
rm -rf ios/Pods
rm -rf ios/Podfile.lock
npm install
cd ios && pod install && cd ..
```

---

## 🛠️ Troubleshooting

### iOS Issues

**"pod: command not found"**
```bash
sudo gem install cocoapods
```

**Pod install fails**
```bash
cd ios
pod deintegrate
pod install
cd ..
```

**"No iOS devices available"**
```bash
# Open Simulator first:
open -a Simulator

# Then run:
npm run ios
```

**CocoaPods permission errors**
```bash
sudo gem install cocoapods
sudo gem install activesupport -v 7.0.8
```

### Android Issues

**"ANDROID_HOME not set"**
```bash
# Add to ~/.zshrc:
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/platform-tools

# Reload:
source ~/.zshrc
```

**"SDK location not found"**
```bash
# Create local.properties in android/ folder:
echo "sdk.dir=$HOME/Library/Android/sdk" > android/local.properties
```

**Gradle build fails**
```bash
cd android
./gradlew clean
cd ..
npm run android
```

### General Issues

**Metro bundler issues**
```bash
npx expo start --clear
```

**TypeScript errors**
```bash
npm run typecheck
```

**Module not found errors**
```bash
rm -rf node_modules
npm install
```

**Expo Go connection issues**
- Use `npm run ios` or `npm run android` instead of Expo Go
- Development builds are more reliable with this project's configuration

---

## 📱 Recommended Development Setup

For the best development experience:

1. **iOS**: Use `npm run ios` (development build, not Expo Go)
2. **Android**: Use `npm run android` (development build, not Expo Go)
3. **Why?** This project uses:
   - New Architecture enabled
   - NativeWind v4
   - Custom Metro configuration
   - React Native Reanimated v4

Development builds handle these better than Expo Go.

---

## 📚 Project Documentation

- **CLAUDE.md** - Development guide for AI assistants
- **PROJECT_REQUIREMENTS.md** - Complete project requirements
- **TECHNICAL_PLAN.md** - Detailed implementation roadmap
- **tailwind.config.js** - Design system tokens

---

## 🎯 Current Development Phase

**Phase 1: Foundation - ✅ Complete**
- Expo project initialized with TypeScript
- NativeWind v4 configured with design system
- Google Fonts (Quicksand, Nunito) installed

**Next: Phase 2 - Kid Mode Core Features**

See TECHNICAL_PLAN.md for detailed implementation stories.

---

## 🤝 Contributing

This is an active development project. Please refer to TECHNICAL_PLAN.md for upcoming features and implementation details.

---

## 📄 License

[Your License Here]

---

## 🆘 Need Help?

- Check CLAUDE.md for detailed technical guidance
- Review troubleshooting section above
- Consult Expo documentation: https://docs.expo.dev
- NativeWind docs: https://www.nativewind.dev
