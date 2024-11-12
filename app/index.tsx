import { Link } from "expo-router";
import { StatusBar, Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
      }}
    >
      <StatusBar hidden />

      <Link href={'/Timer'}>
        <Text>Animated Timer</Text>
      </Link>

    </View>
  );
}
