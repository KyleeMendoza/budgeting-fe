import "../global.css";
import { Stack } from "expo-router/stack";
import { SessionProvider } from "./ctx";

export default function Layout() {
  return (
    <SessionProvider>
      <Stack>
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </SessionProvider>
  );
}
