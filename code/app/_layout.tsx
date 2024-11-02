import { router, Stack } from "expo-router";
import { Image, TouchableOpacity } from "react-native";


export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{
        title: "Home",
        headerRight: () => (
          <TouchableOpacity 
            onPress={() => router.push("/search")}
            style={{ padding: 8}}
          >
            <Image source={require("@/assets/images/search.png")} style={{ width: 24, height: 24 }} />
          </TouchableOpacity>
        )
      }} />
      <Stack.Screen name="search" options={{ title: "Search" }} />
      <Stack.Screen name="boxes/add" options={{ title: "Add new box" }} />
      <Stack.Screen name="items/index" options={{ title: "Items" }} />
      <Stack.Screen name="items/add" options={{ title: "Add new item" }} />
      <Stack.Screen name="itemDetail" options={{ title: "Item detail" }} />
    </Stack>
  );
}
