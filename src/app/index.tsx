import React from "react";
import { Text, View, Pressable } from "react-native";
import { Link, Redirect } from "expo-router";
import { useFonts } from "expo-font";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  configureFonts,
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";

export default function Page() {
  const [loaded] = useFonts({
    "Poppins-Bold": require("../assets/Poppins/Poppins-Bold.ttf"),
    "Poppins-Italic": require("../assets/Poppins/Poppins-Italic.ttf"),
    "Poppins-BoldItalic": require("../assets/Poppins/Poppins-BoldItalic.ttf"),
    "Poppins-Regular": require("../assets/Poppins/Poppins-Regular.ttf"),
  });

  const baseFont = {
    fontFamily: "Poppins-Regular",
  } as const;

  const baseVariants = configureFonts({ config: baseFont });

  const customVariants = {
    displayMedium: {
      ...baseVariants.displayMedium,
      fontFamily: "Poppins-Bold",
    },
    bold: {
      ...baseVariants.bodyMedium,
      fontFamily: "Poppins-Bold",
    },
    italic: {
      ...baseVariants.bodyMedium,
      fontFamily: "Poppins-Italic",
    },
    boldItalic: {
      ...baseVariants.bodyMedium,
      fontFamily: "Poppins-BoldItalic",
    },
  } as const;

  const fonts = configureFonts({
    config: {
      ...baseVariants,
      ...customVariants,
    },
  });

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: "#5AB334",
      secondary: "#81cc2a",
    },
  };

  if (!loaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <PaperProvider theme={{ ...theme, fonts }}>
      <Redirect href={"/home"} />
    </PaperProvider>
  );
}
