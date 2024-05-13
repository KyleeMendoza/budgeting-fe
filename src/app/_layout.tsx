import "../global.css";
import { Stack } from "expo-router/stack";
import { SessionProvider } from "./ctx";
import store from "store";
import { Provider } from "react-redux";

export default function Layout() {
  return (
    <Provider store={store}>
      <SessionProvider>
        <Stack>
          {/* TODO: Comment this out to remove auth */}
          <Stack.Screen name="Login" options={{ headerShown: false }} />
          <Stack.Screen name="register" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </SessionProvider>
    </Provider>
  );
}
