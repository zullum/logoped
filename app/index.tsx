import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to kid mode home screen
    router.replace('/(kid)');
  }, []);

  return (
    <View className="flex-1 bg-background-light items-center justify-center">
      <ActivityIndicator size="large" color="#4A90E2" />
    </View>
  );
}
