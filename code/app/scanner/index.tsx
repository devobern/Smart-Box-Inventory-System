import {View} from "react-native";
import {CameraView} from "expo-camera";

export default function Index() {
    return (
        <View>
            <CameraView
                facing={"back"}
                onBarcodeScanned={({data}) => {
                    console.log("Data", data);
                }}
            />
        </View>
    )
}