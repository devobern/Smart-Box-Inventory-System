import { Button, StyleSheet, TextInput, Text, View, Pressable, Modal } from "react-native";
import { useState, useEffect } from "react";
import QRCode from "react-native-qrcode-svg";
import * as DB from "@/services/database";
import { router } from "expo-router";
import * as Print from "expo-print";
import { Picker } from '@react-native-picker/picker';
import { Item } from "../types/item";
import { box } from "../types/box";

export default function AddBox() {

    const [name, setName] = useState('New Box');
    const [description, setDescription] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [boxId, setBoxId] = useState<string | null>(null);
    const [locationId, setLocationId] = useState<string>('1');
    const [locations, setLocations] = useState<{ id: number; name: string; }[]>([]);
    
    let qrCodeRef: any = null; // Declare qrCodeRef as a variable
    DB.getBoxes().then((boxes) => {
        if (boxes !== null) {
            let ids = boxes.map((box) => Number((box as box).id))
            if (name == 'New Box') {
                if (ids.length <= 0) {
                    // Edge case: First ever registered box
                    setName(`Box 1`)
                }
                else {
                    setName(`Box ${Math.max(...ids) + 1}`)
                }
            }
        }
    });

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const result = await DB.getLocations();
                if (Array.isArray(result)) {
                    setLocations(result as { id: number; name: string; }[]);
                }
            } catch (error) {
                console.error('Error fetching locations:', error);
            }
        };

        fetchLocations();
    }, []);

    // Function to handle saving and showing the modal
    const handleSaveBox = () => {
        if (!name || !locationId) {
            alert('Please provide a name and select a location.');
            return;
        }
        DB.addBox(name, description, parseInt(locationId)).then((id) => {
            setBoxId(String(id)); // Set the ID for the QR code and show the modal
            setModalVisible(true);
        });
    };

    // Function to print the QR code
    const handlePrintQRCode = () => {
        if (qrCodeRef) {
            qrCodeRef.toDataURL((dataURL: string) => {
                Print.printAsync({
                    html: `<img src="data:image/png;base64,${dataURL}" style="width: 100%; height: auto;" />`,
                });
            });
        }
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 20,
        },
        inputText: {
            borderWidth: 1,
            marginBottom: 10,
            margin: 10,
            padding: 10,
            borderRadius: 10,
        },
        text: {
            marginBottom: 1,
            padding: 10,
        },
        saveButton: {
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 12,
            paddingHorizontal: 32,
            borderRadius: 4,
            elevation: 3,
            backgroundColor: '#2196F3',
            marginTop: 10,
        },
        saveText: {
            fontSize: 16,
            fontWeight: 'bold',
            color: 'white',
        },
        modalContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        modalContent: {
            width: 300,
            padding: 20,
            backgroundColor: 'white',
            borderRadius: 10,
            alignItems: 'center',
        },
        modalText: {
            fontSize: 18,
            marginBottom: 20,
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


    return (
        <View style={styles.container}>
            <Text style={styles.text}>Name *</Text>
            <TextInput
                placeholder="Name"
                value={name}
                onChangeText={setName}
                style={styles.inputText}
            />
            <Text style={styles.text}>Description</Text>
            <TextInput
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
                style={styles.inputText}
            />
            <Text style={styles.text}>Location *</Text>
            <Picker
                selectedValue={locationId}
                style={styles.inputText}
                onValueChange={(itemValue) => setLocationId(itemValue)}
            >
                <Picker.Item label="Select location" value="" />
                {locations.map((location) => (
                    <Picker.Item key={location.id} label={location.name} value={location.id.toString()} />
                ))}
            </Picker>
            <Pressable
                style={styles.saveButton}
                onPress={handleSaveBox} // Save the box and open the modal
            >
                <Text style={styles.saveText}>Save</Text>
            </Pressable>

            {/* Modal for QR Code display */}
            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>QR Code for Box ID: {boxId}</Text>
                        {boxId && (
                            <QRCode
                                value={boxId}
                                size={200}
                                getRef={(c) => (qrCodeRef = c)} // Assign the reference using a function
                            />
                        )}
                        <Pressable style={styles.printButton} onPress={handlePrintQRCode}>
                            <Text style={styles.printButtonText}>Print QR Code</Text>
                        </Pressable>
                        <Pressable style={styles.backButton} onPress={() => {
                            setModalVisible(false);
                            router.push('/'); // Navigate back to home
                        }}>
                            <Text style={styles.backButtonText}>Back to Home</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
}