import React, { useCallback } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useItemContext } from './ItemContext'; // Adjust the path accordingly
import { Link } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';

export default function Index() {
    const { items } = useItemContext();

    useFocusEffect(
        useCallback(() => {
            // Any actions to refresh items, if necessary
        }, [items])
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your Items:</Text>
            <FlatList
                data={items}
                keyExtractor={(item) => item.boxId} // Assuming boxId is unique for each item
                renderItem={({ item }) => (
                    <View style={styles.listItem}>
                        <Text style={styles.itemName}>Name: {item.name}</Text>
                        <Text>Category: {item.category}</Text>
                        <Text>Box ID: {item.boxId}</Text>
                        {item.description && <Text>Description: {item.description}</Text>}
                        {item.location && <Text>Location: {item.location}</Text>}
                        {item.quantity && <Text>Quantity: {item.quantity}</Text>}
                        {item.photoUrl && <Text>Photo URL: {item.photoUrl}</Text>}
                    </View>
                )}
            />
            <Link href="/(tabs)/AddItemScreen">
                <Text style={styles.linkText}>Add New Item</Text>
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
});
