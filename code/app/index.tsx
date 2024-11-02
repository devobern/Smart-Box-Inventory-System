import React, {useMemo} from 'react';
import { Link } from "@react-navigation/native";
import {
    Pressable,
    StatusBar,
    StyleSheet,
    Text,
} from 'react-native';
import { View } from "react-native";
import {useCameraPermissions} from "expo-camera";

export default function Index() {

    const [permission, requestPermission] = useCameraPermissions();
    const isPermissionGranted = Boolean(permission?.granted);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            paddingTop: StatusBar.currentHeight,
            backgroundColor: '#ecf0f1',
            padding: 8,
        },
        item: {
            margin: 24,
            fontSize: 18,
            fontWeight: 'bold',
            textAlign: 'center',
        },
    });

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
        <Pressable onPress={requestPermission}>
            <Text style={styles.item}>Request permissions</Text>
        </Pressable>
        <Link to={"/scanner"}>
            <Pressable disabled={isPermissionGranted}>
                <Text>Scan code</Text>
            </Pressable>
        </Link>
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Link to="/boxes">
        List of Boxes
      </Link>
    </View>
  );
}
