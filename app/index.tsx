import { Link } from "expo-router";
import { StatusBar, Text, View } from "react-native";
import '../global.css'

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: 'center',
        gap: '20',
      }}
    >
      <StatusBar hidden />

      <Link href={'/Timer'}>
        <Text>Animated Timer</Text>
      </Link>
      <Link href={'/AnimatedBGCarousel'}>
        <Text>Animated Bg Carousel</Text>
      </Link>

      <Link href={'/EcommerceHomePage'}>
        <Text>Ecommerce Page</Text>
      </Link>

      <Link href={'/(mealsApp)/onboarding'}>
        <Text>Meals App</Text>
      </Link>
    </View>
  );
}
