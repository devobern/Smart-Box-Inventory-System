import { Stack } from "expo-router";
import { ItemProvider } from "./ItemContext"; // Adjust path as necessary

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen name="(tabs)/AddItemScreen" />
      <Stack.Screen name="boxes/index" options={{ title: "Boxes" }} />
      <Stack.Screen name="boxes/add" options={{ title: "Add new box" }} />
      <Stack.Screen name="items/index" options={{ title: "Items" }} />
      <Stack.Screen name="items/add" options={{ title: "Add new item" }} />
    </Stack>
  );
}
