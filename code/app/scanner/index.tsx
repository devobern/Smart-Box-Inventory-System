import { StyleSheet, SafeAreaView, View} from "react-native";
import {CameraView} from "expo-camera";
import { Stack } from "expo-router";

export default function Index() {
    return (
        <SafeAreaView style={StyleSheet.absoluteFillObject}>
            <Stack.Screen
                options={{
                    title: 'Overview',
                    headerShown: false,
                }}
            />
            <CameraView
                style={StyleSheet.absoluteFillObject}
                facing={"back"}
                onBarcodeScanned={({data}) => {
                    console.log("Data", data);
                }}
            />
        </SafeAreaView>
    )
}