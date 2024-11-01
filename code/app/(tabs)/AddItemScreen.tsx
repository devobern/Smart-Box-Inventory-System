import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { useItemContext } from '../ItemContext'; // Adjust the path to your ItemContext
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Item } from '../types/item';

type RootStackParamList = {
    index: undefined;
    AddItemScreen: undefined; // Include all screen names in your navigation stack
};

function createItem(
    name: string,
    category: string,
    boxId: string,
    description?: string,
    location?: string,
    quantity?: number,
    photoUrl?: string,
): Item {
    return {
        name,
        category,
        boxId,
        description,
        location,
        quantity: quantity ? parseInt(String(quantity), 10) : undefined,
        photoUrl,
        dateAdded: new Date(),  // Automatically set to the current date
        tags: [],
        lastUpdated: new Date(), // Automatically set to the current date when creating new item
    };
}

export default function AddItemScreen() {
    const [itemName, setItemName] = useState('');
    const [itemCategory, setItemCategory] = useState('');
    const [itemBoxId, setItemBoxId] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [itemLocation, setItemLocation] = useState('');
    const [itemQuantity, setItemQuantity] = useState('');
    const [itemPhotoUrl, setItemPhotoUrl] = useState('');
    const { addItem } = useItemContext();
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const handleAddItem = () => {
        if (itemName && itemCategory && itemBoxId) {
            const newItem = createItem(
                itemName,
                itemCategory,
                itemBoxId,
                itemDescription,
                itemLocation,
                itemQuantity ? parseInt(itemQuantity, 10) : undefined,
                itemPhotoUrl,
            );
            addItem(newItem);
            setItemName('');
            setItemCategory('');
            setItemBoxId('');
            setItemDescription('');
            setItemLocation('');
            setItemQuantity('');
            setItemPhotoUrl('');
            navigation.navigate('index');
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
            <TextInput
                style={styles.input}
                value={itemCategory}
                onChangeText={setItemCategory}
                placeholder="Enter item category"
            />
            <TextInput
                style={styles.input}
                value={itemBoxId}
                onChangeText={setItemBoxId}
                placeholder="Enter box ID"
            />
            <TextInput
                style={styles.input}
                value={itemDescription}
                onChangeText={setItemDescription}
                placeholder="Enter item description"
            />
            <TextInput
                style={styles.input}
                value={itemLocation}
                onChangeText={setItemLocation}
                placeholder="Enter item location"
            />
            <TextInput
                style={styles.input}
                value={itemQuantity}
                onChangeText={setItemQuantity}
                placeholder="Enter item quantity"
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                value={itemPhotoUrl}
                onChangeText={setItemPhotoUrl}
                placeholder="Enter photo URL"
            />
            <Button title="Add Item" onPress={handleAddItem} />
        </View>
    );
}

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
