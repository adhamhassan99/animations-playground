import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
const queryClient = new QueryClient()

export default function RootLayout() {

  return (
    // <SafeAreaView style={{ flex: 1 }} >

    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerTitle: 'Animations' }} >
        <Stack.Screen name="index" />
        <Stack.Screen options={{ headerTitle: 'Animated Timer', headerShown: false }} name="Timer" />
        <Stack.Screen options={{ headerShown: false }} name="AnimatedBGCarousel" />
      </Stack>
    </QueryClientProvider>
    // </SafeAreaView >
  )
}
