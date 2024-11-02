import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen name="boxes/index" options={{ title: "Boxes" }} />
      <Stack.Screen name="boxes/add" options={{ title: "Add new box" }} />
    </Stack>
  );
}
