import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useItemContext } from '@/app/ItemContext';
import { Link } from '@react-navigation/native';

export default function Index() {
    return (
        <ItemScreen />
    );
}

function ItemScreen() {
    const { items } = useItemContext();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your Items:</Text>
            <FlatList
                data={items}
                keyExtractor={(item) => item.boxId}
                renderItem={({ item }) => (
                    <View style={styles.listItem}>
                        <Text style={styles.itemName}>Name: {item.name}</Text>
                        <Text>Category: {item.category}</Text>
                        <Text>Box ID: {item.boxId}</Text>
                        {item.description && <Text>Description: {item.description}</Text>}
                        {item.quantity && <Text>Quantity: {item.quantity}</Text>}
                        {item.photoUrl && <Text>Photo URL: {item.photoUrl}</Text>}
                    </View>
                )}
            />
            <Link to="/boxes">
                <Text style={styles.linkText}>List of Boxes</Text>
            </Link>
            <Link to="/(tabs)/AddItemScreen">
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
