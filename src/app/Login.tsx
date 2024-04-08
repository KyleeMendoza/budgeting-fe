import { View, Text } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "react-native-paper";

export default function Login() {
  const { top } = useSafeAreaInsets();
  const theme = useTheme();
  return (
    <View
      style={{ paddingTop: top }}
      className="flex flex-1 border-2 border-green-600"
    >
      <Text style={{ fontFamily: "Poppins-Regular" }}>Login Page</Text>
    </View>
  );
}
