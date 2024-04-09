import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { useSession } from "../../ctx";

export default function home() {
  const { signOut } = useSession();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text
        onPress={() => {
          // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
          signOut();
        }}
      >
        Sign Out
      </Text>
    </View>
  );
}
