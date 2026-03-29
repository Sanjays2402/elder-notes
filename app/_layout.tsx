import { Stack } from "expo-router";
import { SettingsProvider, useSettings } from "../lib/settings";

function InnerLayout() {
  const { theme } = useSettings();

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: theme.headerBg },
        headerTintColor: theme.headerText,
        headerTitleStyle: {
          fontSize: 24,
          fontWeight: "700",
        },
        headerBackTitleVisible: false,
        contentStyle: { backgroundColor: theme.bg },
      }}
    >
      <Stack.Screen name="index" options={{ title: "My Notes" }} />
      <Stack.Screen name="note" options={{ title: "Note" }} />
      <Stack.Screen name="settings" options={{ title: "Settings" }} />
    </Stack>
  );
}

export default function Layout() {
  return (
    <SettingsProvider>
      <InnerLayout />
    </SettingsProvider>
  );
}
