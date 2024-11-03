import { useState, useEffect } from "react";
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity } from "react-native";
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import * as db from "@/services/database"; // Import database functions
import {router, useLocalSearchParams} from 'expo-router';
import { box } from "../types/box";

type RootStackParamList = {
    index: undefined;
    AddItemScreen: undefined;
};

// Define types for Category and Box
type Category = {
    id: number;
    name: string;
};

type Box = {
    id: number;
    name: string;
};

export default function Screen() {
    const { boxId } = useLocalSearchParams<{ boxId: string }>(); // Get boxId from the route parameters

    const [itemName, setItemName] = useState('');
    const [itemCategory, setItemCategory] = useState<string>('1');
    const [itemBoxId, setItemBoxId] = useState<string>(boxId ? boxId : ''); // Set initial box ID if it exists
    const [itemDescription, setItemDescription] = useState('');
    const [itemQuantity, setItemQuantity] = useState('1'); // Default quantity
    const [itemPhotoUrl, setItemPhotoUrl] = useState('');
    const [categories, setCategories] = useState<Category[]>([]); // State to store categories
    const [boxes, setBoxes] = useState<Box[]>([]); // State to store boxes

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    // Fetch categories and boxes from the database when the component mounts
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const result = await db.getCategories();
                if (Array.isArray(result)) {
                    setCategories(result as Category[]);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        const fetchBoxes = async () => {
            try {
                const result = await db.getBoxes();
                if (Array.isArray(result)) {
                    setBoxes(result as Box[]);
                    let defaultBoxId = Math.min(...result.map((box) => Number((box as box).id)))
                    if (itemBoxId == '') {
                        setItemBoxId(String(defaultBoxId));
                    }
                }
            } catch (error) {
                console.error('Error fetching boxes:', error);
            }
        };

        fetchCategories();
        fetchBoxes();
    }, []);

    const handleAddItem = async () => {
        if (itemName && itemCategory && itemBoxId) {
            const newItem = {
                name: itemName,
                categoryId: parseInt(itemCategory, 10), // Assuming itemCategory is a valid category ID
                boxId: parseInt(itemBoxId, 10), // Assuming itemBoxId is a valid box ID
                description: itemDescription || undefined,
                quantity: itemQuantity ? parseInt(itemQuantity, 10) : 1, // Provide default value of 1 if undefined
                img: itemPhotoUrl || undefined,
            };

            try {
                const result = await db.addItem(
                    newItem.name,
                    newItem.quantity ?? 1, // Default to 1 if quantity is undefined
                    newItem.boxId,
                    newItem.img,
                    newItem.description,
                    newItem.categoryId ?? 0 // Default to 0 if categoryId is undefined
                );

                if (result) {
                    // Item added successfully, clear the form
                    setItemName('');
                    setItemCategory('');
                    setItemBoxId(boxId ? boxId : ''); // Reset box ID to initial value if it was passed
                    setItemDescription('');
                    setItemQuantity('1'); // Reset to default quantity
                    setItemPhotoUrl('');
                    router.push(`/boxes/details?id=${newItem.boxId}`)
                } else {
                    console.error('Failed to add item');
                }
            } catch (error) {
                console.error('Error adding item:', error);
            }
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
                autoFocus
                style={styles.inputText}
                value={itemName}
                onChangeText={setItemName}
                placeholder="Enter item name"
            />
            <Text style={styles.text}>Category *</Text>
            <Picker
                selectedValue={itemCategory}
                style={styles.inputText}
                onValueChange={(itemValue) => setItemCategory(itemValue)}
            >
                <Picker.Item label="Select category" value="" />
                {categories.map((category) => (
                    <Picker.Item key={category.id} label={category.name} value={category.id.toString()} />
                ))}
            </Picker>
            <Text style={styles.text}>Box *</Text>
            {boxId ? (
                <Text style={styles.text}>Box ID: {boxId}</Text>
            ) : (
                <Picker
                    selectedValue={itemBoxId}
                    style={styles.inputText}
                    onValueChange={(itemValue) => setItemBoxId(itemValue)}
                >
                    <Picker.Item label="Select box" value="" />
                    {boxes.map((box) => (
                        <Picker.Item key={box.id} label={box.name} value={box.id.toString()} />
                    ))}
                </Picker>
            )}
            <Text style={styles.text}>Description</Text>
            <TextInput
                style={styles.inputText}
                value={itemDescription}
                onChangeText={setItemDescription}
                placeholder="Enter item description (optional)"
            />
            <Text style={styles.text}>Quantity (optional)</Text>
            <TextInput
                style={styles.inputText}
                value={itemQuantity}
                onChangeText={setItemQuantity}
                placeholder="Enter item quantity (optional)"
                keyboardType="numeric"
            />
            <TouchableOpacity style={styles.saveButton} onPress={handleAddItem}>
                <Text style={styles.saveText}>Add Item</Text>
            </TouchableOpacity>
        </View>
    );
}
