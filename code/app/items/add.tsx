import { useState, useEffect } from "react";
import { Text, View, StyleSheet, TextInput, Button } from "react-native";
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import * as db from "@/services/database"; // Import database functions
import {router, useLocalSearchParams} from 'expo-router';

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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
    },
    label: {
        fontSize: 18,
        marginBottom: 8,
    },
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 16,
        padding: 8,
        borderRadius: 4,
    },
});

export default function Screen() {
    const { boxId } = useLocalSearchParams<{ boxId: string }>(); // Get boxId from the route parameters

    const [itemName, setItemName] = useState('');
    const [itemCategory, setItemCategory] = useState<string>('');
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
                    router.push(`/boxes/details?id=${boxId}`)
                } else {
                    console.error('Failed to add item');
                }
            } catch (error) {
                console.error('Error adding item:', error);
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Add New Item</Text>
            <TextInput
                style={styles.input}
                value={itemName}
                onChangeText={setItemName}
                placeholder="Enter item name"
            />
            <Picker
                selectedValue={itemCategory}
                style={styles.input}
                onValueChange={(itemValue) => setItemCategory(itemValue)}
            >
                <Picker.Item label="Select category" value="" />
                {categories.map((category) => (
                    <Picker.Item key={category.id} label={category.name} value={category.id.toString()} />
                ))}
            </Picker>
            {boxId ? (
                <Text style={styles.label}>Box ID: {boxId}</Text>
            ) : (
                <Picker
                    selectedValue={itemBoxId}
                    style={styles.input}
                    onValueChange={(itemValue) => setItemBoxId(itemValue)}
                >
                    <Picker.Item label="Select box" value="" />
                    {boxes.map((box) => (
                        <Picker.Item key={box.id} label={box.name} value={box.id.toString()} />
                    ))}
                </Picker>
            )}
            <TextInput
                style={styles.input}
                value={itemDescription}
                onChangeText={setItemDescription}
                placeholder="Enter item description (optional)"
            />
            <TextInput
                style={styles.input}
                value={itemQuantity}
                onChangeText={setItemQuantity}
                placeholder="Enter item quantity (optional)"
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                value={itemPhotoUrl}
                onChangeText={setItemPhotoUrl}
                placeholder="Enter photo URL (optional)"
            />
            <Button title="Add Item" onPress={handleAddItem} />
        </View>
    );
}
