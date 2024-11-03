import FloatingActionButton from "@/components/fab";
import { router, useLocalSearchParams } from 'expo-router';
import {FlatList, Text, View, StyleSheet, Pressable, Modal, Image, TouchableOpacity} from "react-native";
import * as db from "@/services/database";
import { Item } from "@/app/types/item";
import QRCode from "react-native-qrcode-svg";
import React, { useEffect, useState } from "react";
import * as Print from "expo-print";
import {Ionicons, MaterialIcons} from "@expo/vector-icons";
import { List } from "react-native-paper";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        padding: 10,
        marginTop: 10,
    },
    description: {
        fontSize: 14,
        color: '#555',
        padding: 10,
    },
    listItem: {
        backgroundColor: "white",
        padding: 20,
    },
    itemName: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    linkText: {
        color: 'blue',
        fontSize: 16,
        marginTop: 16,
        textDecorationLine: 'underline',
    },
    qrButton: {
        alignSelf: 'flex-start', // Align button to the left
        flexDirection: 'row', // Display icon and text in a row
        alignItems: 'center', // Center icon and text vertically
        padding: 16,
        backgroundColor: '#007bff',
    },
    qrButtonText: {
        color: 'white',
        fontSize: 16,
        marginLeft: 8, // Space between icon and text
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    printButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: 'black',
        borderRadius: 5,
    },
    printButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    backButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: 'grey',
        borderRadius: 5,
    },
    backButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    mainButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#2196F3",
        alignItems: "center",
        justifyContent: "center",
        elevation: 5,
    },
    container_r: {
        position: "absolute",
        bottom: 30,
        right: 30,
        alignItems: "center",
    },
    container_l: {
        position: "absolute",
        bottom: 30,
        left: 30,
        alignItems: "center",
    },
});

export default function BoxDetails() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [modalVisible, setModalVisible] = useState(false);
    const [items, setItems] = useState<Item[]>([]);
    const [boxName, setBoxName] = useState<string>("Untitled");
    const [boxDescription, setBoxDescription] = useState<string>("Untitled");
    const [boxLocation, setBoxLocation] = useState<string>("Untitled");
    let qrCodeRef: any = null;

    useEffect(() => {
        const fetchData = async () => {
            const db_items = await db.getBoxItems(Number(id));
            if (db_items) {
                setItems(db_items as Item[]);
            }

            const box = await db.getBox(Number(id));
            if (box) {
                setBoxName(box.name);
                setBoxDescription(box.description);
                const location = await db.getLocation(box.locationId);
                if (location){
                    setBoxLocation(location.name);
                }

            }
        };

        fetchData();
    }, [id]);

    const handlePrintQRCode = () => {
        if (qrCodeRef) {
            qrCodeRef.toDataURL((dataURL: string) => {
                Print.printAsync({
                    html: `<img src="data:image/png;base64,${dataURL}" style="width: 100%; height: auto;" />`,
                });
            });
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Box Description:</Text>
            <Text style={styles.description}>{boxDescription}</Text>
            <Text style={styles.title}>Box Location:</Text>
            <Text style={styles.description}>{boxLocation}</Text>
            <Text style={styles.title}>Your Items in box {boxName}:</Text>

            <FlatList
                data={items}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <List.Item style={styles.listItem}
                        onPress={() => router.push(`/items/details?itemId=${item.id}`)}
                        title={item.name}
                        description={item.description}
                        left={() => <Image source={require("@/assets/images/item.png")} style={{ width: 24, height: 24 }} />}
                        right={() => <Image source={require("@/assets/images/arrow_forward_ios.png")} style={{ width: 24, height: 24 }} />}
                    />
                )}
            />
            <View style={styles.container_l}>
                <Pressable style={styles.qrButton} onPress={() => setModalVisible(true)}>
                    <MaterialIcons name="qr-code" size={24} color="white" />
                    <Text style={styles.qrButtonText}>View QR Code</Text>
                </Pressable>
            </View>
            <View style={styles.container_r}>
                <TouchableOpacity style={styles.mainButton} onPress={() => router.push(`/boxes/add`)}>
                    <Ionicons name="add" size={24} color="white" />
                </TouchableOpacity>
            </View>

            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.title}>QR Code for Box ID: {id}</Text>
                        <QRCode
                            value={id}
                            size={200}
                            getRef={(c) => (qrCodeRef = c)}
                        />
                        <Pressable style={styles.printButton} onPress={handlePrintQRCode}>
                            <Text style={styles.printButtonText}>Print QR Code</Text>
                        </Pressable>
                        <Pressable style={styles.backButton} onPress={() => setModalVisible(false)}>
                            <Text style={styles.backButtonText}>Back</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
