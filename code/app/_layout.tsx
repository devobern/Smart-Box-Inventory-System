import { Stack } from "expo-router";
import { ItemProvider } from "./ItemContext"; // Adjust path as necessary

export default function RootLayout() {
    return (
        <ItemProvider>
            <Stack>
                <Stack.Screen name="index" />
                <Stack.Screen name="(tabs)/AddItemScreen" />
            </Stack>
        </ItemProvider>
    );
}
