import React, {useEffect, useState} from "react";
import {ActivityIndicator, StyleSheet, Text, View} from "react-native";
import {useLocalSearchParams} from "expo-router";
import {Item} from "@/app/types/item";
import * as db from "@/services/database";
import {category} from "../types/category";
import {box} from "../types/box";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 8,
    },
    detailsText: {
        fontSize: 16,
        marginBottom: 8,
    },
});

const ItemDetail: React.FC = () => {
    const {itemId} = useLocalSearchParams();
    const [item, setItem] = useState<Item | null>(null);
    const [categoryName, setCategoryName] = useState<string | null>(null);
    const [boxName, setBoxName] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItemCategoryAndBox = async () => {
            if (itemId) {
                try {
                    // Fetch the item details
                    const fetchedItem = await db.getItem(parseInt(itemId as string, 10));
                    setItem(fetchedItem);

                    // Fetch the category name
                    if (fetchedItem?.categoryId) {
                        const categoryId = Number(fetchedItem.categoryId);
                        const fetchedCategory = (await db.getCategory(
                            categoryId
                        )) as category;
                        setCategoryName(fetchedCategory?.name || "Unknown");
                    }

                    // Fetch the box name
                    if (fetchedItem?.boxId) {
                        const boxId = Number(fetchedItem.boxId);
                        const fetchedBox = (await db.getBox(boxId)) as box;
                        setBoxName(fetchedBox?.name || "Unknown");
                    }
                } catch (error) {
                    console.error("Failed to fetch item:", error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchItemCategoryAndBox();
    }, [itemId]);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff"/>;
    }

    if (!item) {
        return (
            <View style={styles.container}>
                <Text>No item details found.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.detailsText}>Category: {categoryName}</Text>
            <Text style={styles.detailsText}>Box: {boxName}</Text>
            {item.description && (
                <Text style={styles.detailsText}>Description: {item.description}</Text>
            )}
            {item.quantity && (
                <Text style={styles.detailsText}>Quantity: {item.quantity}</Text>
            )}
            {item.photoUrl && (
                <Text style={styles.detailsText}>Photo URL: {item.photoUrl}</Text>
            )}
        </View>
    );
};

export default ItemDetail;
