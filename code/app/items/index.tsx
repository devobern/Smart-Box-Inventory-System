import FloatingActionButton from "@/components/fab";
import { useEffect, useState } from "react";
import { FlatList, Text, View, StyleSheet } from "react-native";
import * as db from "@/services/database";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
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
});

export default function Index() {
    const [items, setItems] = useState<any[]>([]);

    useEffect(() => {
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
    }, []);

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
                        {item?.description && <Text>Description: {item.description}</Text>}
                    </View>
                )}
            />
            <FloatingActionButton route="/items/add" />
        </View>
    );
}
