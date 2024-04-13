import "../../../global.css";
import { Stack } from "expo-router/stack";

export default function Layout() {
  // headerShown: false
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerTitle: "Create" }} />
    </Stack>
  );
}
