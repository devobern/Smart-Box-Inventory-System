import FloatingActionButton from "@/components/fab";
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import { FlatList, Text, View, StyleSheet, Pressable, Modal, Image } from "react-native";
import * as db from "@/services/database";
import { Item } from "@/app/types/item";
import QRCode from "react-native-qrcode-svg";
import { useState } from "react";
import * as Print from "expo-print";
import { MaterialIcons } from "@expo/vector-icons"; // Import icon library
import { box } from "../types/box";
import { List } from "react-native-paper";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 18,
        marginBottom: 8,
    },
    listItem: {
        padding: 16,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        width: '100%',
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
        padding: 10,
        backgroundColor: '#007bff',
        borderRadius: 5,
        marginBottom: 16,
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
});

export default function BoxDetails() {

    const { id } = useLocalSearchParams<{ id: string }>();
    const [modalVisible, setModalVisible] = useState(false);
    let qrCodeRef: any = null; // Reference for QR Code

    let items = [] as Item[];
    db.getBoxItems(Number(id)).then((db_items) => {
        if (db_items !== null) {
            db_items.forEach((u_item) => {
                let item = u_item as Item;
                items.push(item);
            });
        }
    });

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
            <Text style={styles.title}>Your Items in box {id}:</Text>
            <FlatList
                data={items}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <List.Item
                        onPress={() => router.push(`/itemDetail?id=${item.id}`)}
                        title={item.name}
                        description={item.description}
                        left={() => <Image source={require("@/assets/images/item.png")} style={{ width: 24, height: 24 }} />}
                        right={() => <Image source={require("@/assets/images/arrow_forward_ios.png")} style={{ width: 24, height: 24 }} />}
                    />
                )}
            />
            <Pressable style={styles.qrButton} onPress={() => setModalVisible(true)}>
                <MaterialIcons name="qr-code" size={24} color="white" />
                <Text style={styles.qrButtonText}>View QR Code</Text>
            </Pressable>
            <FloatingActionButton route={`/items/add?boxId=${id}`} />

            {/* Modal for QR Code display */}
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
                            getRef={(c) => (qrCodeRef = c)} // Assign QR code reference
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
