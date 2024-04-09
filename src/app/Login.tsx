import { View, Text } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "react-native-paper";
import { router } from "expo-router";

// State Context
import { useSession } from "./ctx";

export default function login() {
  const { top } = useSafeAreaInsets();
  const theme = useTheme();
  const { signIn } = useSession();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text
        onPress={() => {
          signIn();
          router.replace("/home");
        }}
      >
        Log In
      </Text>
    </View>
  );
}
