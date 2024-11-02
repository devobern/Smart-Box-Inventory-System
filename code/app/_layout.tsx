import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen name="boxes/add" options={{ title: "Add new box" }} />
      <Stack.Screen name="items/index" options={{ title: "Items" }} />
      <Stack.Screen name="items/add" options={{ title: "Add new item" }} />
      <Stack.Screen name="itemDetail" options={{ title: "Item detail" }} />
    </Stack>
  );
}
