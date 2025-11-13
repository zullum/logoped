import { Stack } from 'expo-router';

export default function KidLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: {
          backgroundColor: '#F7F9FC', // background-light
        },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="activities/picture-cards/index" />
      <Stack.Screen name="activities/sound-matching/index" />
      <Stack.Screen name="activities/bubble-pop/index" />
      <Stack.Screen name="rewards/index" />
    </Stack>
  );
}
