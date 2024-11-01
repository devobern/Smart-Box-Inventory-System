import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { useItemContext } from '../ItemContext'; // Adjust the path to your ItemContext
import { useNavigation, NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
    index: undefined;
    AddItemScreen: undefined; // Include all screen names in your navigation stack
};

export default function AddItemScreen() {
    const [itemName, setItemName] = useState('');
    const { addItem } = useItemContext();
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const handleAddItem = () => {
        if (itemName) {
            addItem(itemName);
            setItemName('');
            navigation.navigate('index'); // Navigate back to the home screen
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
