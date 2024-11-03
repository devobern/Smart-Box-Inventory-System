import React, {useEffect, useState} from "react";
import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {CameraView, useCameraPermissions} from "expo-camera";
import {router, Stack} from "expo-router";
import * as db from "../../services/database";

export default function Index() {

    const [permission, requestPermission] = useCameraPermissions();

    const [scannedText, setScannedText] = useState("");
    const [showedText, setShowedText] = useState("");
    const [isScanned, setIsScanned] = useState(false);
    const [isValidId, setIsValid] = useState(false);

    /**
     * Ask permission for camera.
     */
    useEffect(() => {
        if (!permission) {
            requestPermission();
        }
    }, [permission]);

    /**
     * Called whenever a code is scanned.
     *
     * @param data The content of the code.
     */
        // @ts-ignore
    const handleBarcodeScanned = ({data}) => {
            if (!isScanned) {
                setScannedText(data);
                setIsScanned(true);
                const boxId = Number(data);
                if (!isNaN(boxId) && boxId >= 0) {
                    db.getBox(boxId).then(box => {
                        console.log(box);
                        if (box !== null) {
                            setIsValid(true);
                            // @ts-ignore
                            setShowedText(box['name']);
                        } else {
                            setIsValid(false);
                            setShowedText('Box not found');
                        }
                    })
                } else {
                    setIsValid(false);
                    setShowedText('Box not found');
                }
            }
        };

    /**
     * Called when the scan is successful and the user click the "Go to Box" button.
     */
    const handleSuccessfulScan = () => {
        // @ts-ignore
        router.push(`/boxes/details?id=${scannedText}`);
    }

    /**
     * Called whenever the reset scan button is clicked.
     */
    const handleResetScan = () => {
        setScannedText("");
        setShowedText("");
        setIsScanned(false);
        setIsValid(false);
    };

    return (
        <SafeAreaView style={StyleSheet.absoluteFillObject}>
            <Stack.Screen
                options={{
                    title: "Overview",
                    headerShown: false,
                }}
            />
            <CameraView
                style={StyleSheet.absoluteFillObject}
                facing={"back"}
                onBarcodeScanned={handleBarcodeScanned}
            >
                {/* Overlay */}
                <View style={styles.overlay}>
                    <View style={styles.scanBox}>
                        <View style={styles.topLeftCorner}/>
                        <View style={styles.topRightCorner}/>
                        <View style={styles.bottomLeftCorner}/>
                        <View style={styles.bottomRightCorner}/>
                    </View>
                </View>
            </CameraView>
            {scannedText ? (
                <View style={styles.resultContainer}>
                    <Text style={styles.resultText}>{showedText}</Text>
                    <TouchableOpacity style={[styles.resetButton, {display: !isValidId ? "none" : "flex"}]}
                                      onPress={handleSuccessfulScan}>
                        <Text style={styles.resetButtonText}>See box detail</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.resetButton} onPress={handleResetScan}>
                        <Text style={styles.resetButtonText}>Scan again</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <Text style={styles.instructionText}>Align the QR code in the square to scan</Text>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "center",
        alignItems: "center",
    },
    scanBox: {
        width: 250,
        height: 250,
        borderColor: "rgba(255, 255, 255, 0.5)",
    },
    topLeftCorner: {
        position: "absolute",
        top: 0,
        left: 0,
        width: 20,
        height: 20,
        borderTopWidth: 4,
        borderLeftWidth: 4,
        borderColor: "white",
    },
    topRightCorner: {
        position: "absolute",
        top: 0,
        right: 0,
        width: 20,
        height: 20,
        borderTopWidth: 4,
        borderRightWidth: 4,
        borderColor: "white",
    },
    bottomLeftCorner: {
        position: "absolute",
        bottom: 0,
        left: 0,
        width: 20,
        height: 20,
        borderBottomWidth: 4,
        borderLeftWidth: 4,
        borderColor: "white",
    },
    bottomRightCorner: {
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 20,
        height: 20,
        borderBottomWidth: 4,
        borderRightWidth: 4,
        borderColor: "white",
    },
    resultContainer: {
        position: "absolute",
        bottom: 50,
        width: "100%",
        alignItems: "center",
    },
    resultText: {
        fontSize: 40,
        color: "white",
        marginBottom: 10,
    },
    resetButton: {
        padding: 10,
        margin: 10,
        width: 150,
        backgroundColor: "#2196F3",
        borderRadius: 5,
        alignItems: "center",
    },
    resetButtonText: {
        color: "white",
        fontSize: 16,
    },
    instructionText: {
        position: "absolute",
        bottom: 20,
        width: "100%",
        textAlign: "center",
        color: "white",
        fontSize: 18,
    },
});
