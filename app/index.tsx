import { View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function Index() {
  return (
    <View className="flex-1 bg-background-light items-center justify-center p-5">
      <Text
        className="text-4xl text-primary-500 mb-2 text-center"
        style={{ fontFamily: 'Quicksand_700Bold' }}
      >
        Welcome to Logoped! 🎉
      </Text>
      <Text
        className="text-lg text-text-dark text-center mb-4"
        style={{ fontFamily: 'Nunito_400Regular' }}
      >
        Speech Therapy App for Kids
      </Text>
      <View className="bg-sunshine-500 px-6 py-3 rounded-xl mb-4">
        <Text
          className="text-white text-base"
          style={{ fontFamily: 'Nunito_700Bold' }}
        >
          NativeWind is Working! ✨
        </Text>
      </View>
      <View className="bg-grass-500 px-6 py-3 rounded-xl">
        <Text
          className="text-white text-base"
          style={{ fontFamily: 'Quicksand_600SemiBold' }}
        >
          Custom Fonts Loaded! 🎨
        </Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
