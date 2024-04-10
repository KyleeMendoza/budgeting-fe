import { View, Text } from "react-native";
import React from "react";
import { useSession } from "../../ctx";

export default function profile() {
  const { signOut } = useSession();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        onPress={() => {
          signOut();
        }}
      >
        Sign Out
      </Text>
    </View>
  );
}
