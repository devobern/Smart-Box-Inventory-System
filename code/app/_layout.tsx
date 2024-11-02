import {Stack} from "expo-router";

export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{title: "Home"}}/>
            <Stack.Screen name="boxes/add" options={{title: "Add new box"}}/>
            <Stack.Screen name="items/index" options={{title: "Items"}}/>
            <Stack.Screen name="items/add" options={{title: "Add new item"}}/>
            <Stack.Screen name="itemDetail" options={{title: "Item detail"}}/>
            <Stack.Screen name="location/index" options={{title: "Locations Overview"}}/>
            <Stack.Screen name="location/add" options={{title: "Add New Location"}}/>
            <Stack.Screen name="categories/index" options={{title: "Categories Overview"}}/>
            <Stack.Screen name="categories/add" options={{title: "Add New Category"}}/>
        </Stack>
    );
}
