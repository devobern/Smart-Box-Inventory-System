import FloatingActionButton from "@/components/fab";
import { useState, useCallback } from "react";
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import * as db from "@/services/database";
import { useFocusEffect } from "@react-navigation/native";
import {Ionicons} from "@expo/vector-icons";
import {router} from "expo-router";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
    },
    container_r: {
        position: "absolute",
        bottom: 30,
        right: 30,
        alignItems: "center",
    },
    title: {
        fontSize: 18,
        marginBottom: 8,
    },
    listItem: {
        padding: 16,
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
        width: "100%",
    },
    itemName: {
        fontWeight: "bold",
        fontSize: 16,
    },
    mainButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#2196F3",
        alignItems: "center",
        justifyContent: "center",
        elevation: 5,
    },
});

export default function Index() {
    const [items, setItems] = useState<any[]>([]);

    useFocusEffect(
        useCallback(() => {
            const fetchItems = async () => {
                try {
                    const dbItems = await db.getItems();
                    if (dbItems !== null) {
                        setItems(dbItems);
                    }
                } catch (error) {
                    console.error("Error fetching items: ", error);
                }
            };

            fetchItems();
        }, [])
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>List of Items:</Text>
            <FlatList
                data={items}
                keyExtractor={(item) => item?.id?.toString()}
                renderItem={({ item }) => (
                    <View style={styles.listItem}>
                        <Text style={styles.itemName}>Name: {item?.name}</Text>
                        <Text>Quantity: {item?.quantity}</Text>
                        {item?.description && (
                            <Text>Description: {item.description}</Text>
                        )}
                    </View>
                )}
            />
            <View style={styles.container_r}>
                <TouchableOpacity style={styles.mainButton} onPress={() => router.push(`/items/add`)}>
                    <Ionicons name="add" size={24} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
}
