import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#4A90D9" },
        headerTintColor: "#FFFFFF",
        headerTitleStyle: {
          fontSize: 24,
          fontWeight: "700",
        },
        headerBackTitleVisible: false,
        contentStyle: { backgroundColor: "#F5F5F5" },
      }}
    />
  );
}
