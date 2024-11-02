import { Stack } from "expo-router";
import { ItemProvider } from "./ItemContext";

export default function RootLayout() {
    return (
        <ItemProvider>
            <Stack>
                <Stack.Screen name="index" options={{ title: "Home" }} />
                <Stack.Screen name="(tabs)/AddItemScreen" options={{ title: "Add Item" }} />
                <Stack.Screen name="boxes/index" options={{ title: "Boxes" }} />
                <Stack.Screen name="boxes/add" options={{ title: "Add new box" }} />
                <Stack.Screen name="items/index" options={{ title: "Items" }} />
                <Stack.Screen name="items/add" options={{ title: "Add new item" }} />
            </Stack>
        </ItemProvider>
    );
}
