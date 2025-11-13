import { Stack } from 'expo-router';
import { View } from 'react-native';

export default function KidLayout() {
  return (
    <View className="flex-1 bg-background-light">
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="index" />
      </Stack>
    </View>
  );
}
