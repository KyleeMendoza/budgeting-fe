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
      secondary: "#001229",
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

// function Content() {
//   return (
//     <View className="flex-1">
//       <View className="py-12 md:py-24 lg:py-32 xl:py-48">
//         <View className="px-4 md:px-6">
//           <View className="flex flex-col items-center gap-4 text-center">
//             <Text
//               role="heading"
//               className="text-3xl text-center native:text-5xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl"
//             >
//               Welcome to Project ACME
//             </Text>
//             <Text className="mx-auto max-w-[700px] text-lg text-center text-gray-500 md:text-xl dark:text-gray-400">
//               Discover and collaborate on amce. Explore our services now.
//             </Text>

//             <View className="gap-4">
//               <Link
//                 suppressHighlighting
//                 className="flex h-9 items-center justify-center overflow-hidden rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 web:shadow ios:shadow transition-colors hover:bg-gray-900/90 active:bg-gray-400/90 web:focus-visible:outline-none web:focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
//                 href="/"
//               >
//                 Explore
//               </Link>
//             </View>
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// }

// function Header() {
//   const { top } = useSafeAreaInsets();
//   return (
//     <View style={{ paddingTop: top }}>
//       <View className="px-4 lg:px-6 h-14 flex items-center flex-row justify-between ">
//         <Link className="font-bold flex-1 items-center justify-center" href="/">
//           ACME
//         </Link>
//         <View className="flex flex-row gap-4 sm:gap-6">
//           <Link
//             className="text-md font-medium hover:underline web:underline-offset-4"
//             href="/"
//           >
//             About
//           </Link>
//           <Link
//             className="text-md font-medium hover:underline web:underline-offset-4"
//             href="/"
//           >
//             Product
//           </Link>
//           <Link
//             className="text-md font-medium hover:underline web:underline-offset-4"
//             href="/"
//           >
//             Pricing
//           </Link>
//         </View>
//       </View>
//     </View>
//   );
// }

// function Footer() {
//   const { bottom } = useSafeAreaInsets();
//   return (
//     <View
//       className="flex shrink-0 bg-gray-100 native:hidden"
//       style={{ paddingBottom: bottom }}
//     >
//       <View className="py-6 flex-1 items-start px-4 md:px-6 ">
//         <Text className={"text-center text-gray-700"}>
//           © {new Date().getFullYear()} Me
//         </Text>
//       </View>
//     </View>
//   );
// }
