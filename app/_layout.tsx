import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
const queryClient = new QueryClient()

export default function RootLayout() {

  return (
    // <SafeAreaView style={{ flex: 1 }} >

    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>


        <Stack screenOptions={{ headerTitle: 'Animations' }} >
          <Stack.Screen name="index" />
          <Stack.Screen options={{ headerTitle: 'Animated Timer', headerShown: false }} name="Timer" />
          <Stack.Screen options={{ headerShown: false }} name="AnimatedBGCarousel" />
          <Stack.Screen options={{ headerShown: false }} name="AnimatedSlotBooking" />
          <Stack.Screen options={{ headerShown: false }} name="EcommerceHomePage" />
          <Stack.Screen options={{ headerShown: false }} name="(mealsApp)" />
        </Stack>

      </GestureHandlerRootView>

    </QueryClientProvider>
    // </SafeAreaView >
  )
}
