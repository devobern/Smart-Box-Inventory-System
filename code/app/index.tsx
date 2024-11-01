import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useItemContext } from './ItemContext'; // Adjust the path accordingly
import { Link } from 'expo-router';

export default function Index() {
    const { items } = useItemContext();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your Items:</Text>
            <FlatList
                data={items}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.listItem}>
                        <Text>{item}</Text>
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
        padding: 8,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        width: '100%',
        textAlign: 'center',
    },
    linkText: {
        color: 'blue',
        fontSize: 16,
        marginTop: 16,
        textDecorationLine: 'underline',
    },
});
