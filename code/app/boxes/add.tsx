import { Button, StyleSheet, TextInput, Text, View, Pressable, Modal } from "react-native";
import {useState, useEffect} from "react";
import {router} from "expo-router";
import QRCode from "react-native-qrcode-svg";
import * as DB from "@/services/database";
import { Picker } from '@react-native-picker/picker';

// Define types for Location
type Location = {
    id: number;
    name: string;
};
import * as Print from "expo-print";

export default function AddBox() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [locations, setLocations] = useState<Location[]>([]);
    const [creationDate, setcDate] = useState(new Date());
    const [updateDate, setuDate] = useState(new Date());
    const [modalVisible, setModalVisible] = useState(false);
    const [boxId, setBoxId] = useState<string | null>(null);
    let qrCodeRef: any = null; // Declare qrCodeRef as a variable

    useEffect(() => {
        // Fetch locations from the database when the component mounts
        const fetchLocations = async () => {
            try {
                const result = await DB.getLocations();
                if (Array.isArray(result)) {
                    setLocations(result as Location[]);
                }
            } catch (error) {
                console.error('Error fetching locations:', error);
            }
        };

        fetchLocations();
    }, []);
    // Function to handle saving and showing the modal
    const handleSaveBox = () => {
        alert('Start Saving');
        DB.addBox(name, 0, undefined).then((id) => {
            alert('Saved with id ' + id);
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

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Name</Text>
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
            <Text style={styles.text}>Location</Text>
            <Picker
                selectedValue={location}
                style={styles.inputText}
                onValueChange={(itemValue) => setLocation(itemValue)}
            >
                <Picker.Item label="Select location" value="" />
                {locations.map((loc) => (
                    <Picker.Item key={loc.id} label={loc.name} value={loc.id.toString()} />
                ))}
            </Picker>
            <Pressable style={styles.saveButton} onPress={async () => {
                if (name && location) {
                    alert('Start Saving');
                    try {
                        const id = await DB.addBox(name, parseInt(location, 10), undefined);
                        alert('Saved with id ' + id);
                        router.push('/');
                    } catch (error) {
                        console.error('Error saving box:', error);
                        alert('Failed to save box');
                    }
                } else {
                    alert('Please fill in all fields');
                }
            }}>
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
        backgroundColor: 'black',
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
