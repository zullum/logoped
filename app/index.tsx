import { View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function Index() {
  return (
    <View className="flex-1 bg-background-light items-center justify-center p-5">
      <Text className="text-4xl font-bold text-primary-500 mb-2 text-center">
        Welcome to Logoped! 🎉
      </Text>
      <Text className="text-lg text-text-dark text-center mb-4">
        Speech Therapy App for Kids
      </Text>
      <View className="bg-sunshine-500 px-6 py-3 rounded-xl">
        <Text className="text-white font-bold text-base">
          NativeWind is Working! ✨
        </Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
