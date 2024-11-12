import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerTitle: 'Animations' }} >
      <Stack.Screen name="index" />
      <Stack.Screen options={{ headerTitle: 'Animated Timer', headerShown: false }} name="Timer" />
    </Stack>
  )
}
