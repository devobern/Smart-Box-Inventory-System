import { router, Stack } from "expo-router";
import { Image, TouchableOpacity } from "react-native";
import { PaperProvider, MD3LightTheme } from 'react-native-paper';

export default function RootLayout() {
  const theme = {
    ...MD3LightTheme,
    // Override any theme values here
    colors: {
      ...MD3LightTheme.colors,
      primary: '#6750A4',
      secondary: '#625B71',
    },
  };

  return (
    <PaperProvider theme={theme}>
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
        <Stack.Screen name="boxes/details" options={{ title: "Box details" }} />
        <Stack.Screen name="items/index" options={{ title: "Items" }} />
        <Stack.Screen name="items/add" options={{ title: "Add new item" }} />
        <Stack.Screen name="items/details" options={{ title: "Item detail" }} />
        <Stack.Screen name="location/index" options={{title: "Locations Overview"}}/>
        <Stack.Screen name="location/add" options={{title: "Add New Location"}}/>
        <Stack.Screen name="categories/index" options={{title: "Categories Overview"}}/>
        <Stack.Screen name="categories/add" options={{title: "Add New Category"}}/>
      </Stack>
    </PaperProvider>
  );
}
