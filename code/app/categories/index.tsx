import * as db from "@/services/database";
import {FlatList, View, Text, StyleSheet} from "react-native";
import {useCallback, useState} from "react";
import {useFocusEffect} from "expo-router";
import FloatingActionButton from "@/components/fab";

const CategoriesOverview = () => {
    const [categories, setCategories] = useState<Array<{ id: number; name: string }>>([]);

    const fetchCategories = async () => {
        try {
            const data = await db.getCategories();
            if (data) {
                setCategories(data as Array<{ id: number; name: string }>);
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchCategories();
        }, [])
    );

    const renderCategoryItem = ({ item }: { item: { id: number; name: string } }) => (
        <View style={styles.categoryItem}>
            <Text style={styles.categoryName}>{item.name}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Locations Overview</Text>
            <FlatList
                data={categories}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderCategoryItem}
            />
            <FloatingActionButton
                route="/category/add"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#fff",
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
    },
    categoryItem: {
        padding: 16,
        backgroundColor: "#f9f9f9",
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    categoryName: {
        fontSize: 18,
    },
});

export default CategoriesOverview;