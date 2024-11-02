import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useItemContext } from '../ItemContext';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
    index: undefined;
    AddItemScreen: undefined;
};

export default function AddItemScreen() {
    const [itemName, setItemName] = useState('');
    const [itemCategory, setItemCategory] = useState('');
    const [itemBoxId, setItemBoxId] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [itemQuantity, setItemQuantity] = useState('1'); // Set default quantity to "1"
    const [itemPhotoUrl, setItemPhotoUrl] = useState('');
    const { addItem } = useItemContext();
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const handleAddItem = () => {
        if (itemName && itemCategory && itemBoxId) {
            const newItem = {
                name: itemName,
                category: itemCategory,
                boxId: itemBoxId,
                description: itemDescription || undefined,
                quantity: itemQuantity ? parseInt(itemQuantity, 10) : undefined,
                photoUrl: itemPhotoUrl || undefined,
                dateAdded: new Date(),
                tags: [],
                lastUpdated: new Date(),
            };
            addItem(newItem);

            // Clear form inputs after adding item, with quantity resetting to "1"
            setItemName('');
            setItemCategory('');
            setItemBoxId('');
            setItemDescription('');
            setItemQuantity('1'); // Reset to default quantity
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
            <Picker
                selectedValue={itemCategory}
                style={styles.input}
                onValueChange={(itemValue) => setItemCategory(itemValue)}
            >
                <Picker.Item label="Select category" value="" />
                <Picker.Item label="Clothing" value="Clothing" />
                <Picker.Item label="Electronics" value="Electronics" />
                <Picker.Item label="Furniture" value="Furniture" />
            </Picker>
            <Picker
                selectedValue={itemBoxId}
                style={styles.input}
                onValueChange={(itemValue) => setItemBoxId(itemValue)}
            >
                <Picker.Item label="Select box ID" value="" />
                <Picker.Item label="Box 1" value="Box 1" />
                <Picker.Item label="Box 2" value="Box 2" />
            </Picker>
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
