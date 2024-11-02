import React, { useCallback, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import FloatingActionButton from "@/components/fab";
import { useFocusEffect } from "@react-navigation/native";
import * as db from "@/services/database"; // Import database functions

const LocationsOverview = () => {
    const [locations, setLocations] = useState<Array<{ id: number; name: string }>>([]);

    const fetchLocations = async () => {
        try {
            const data = await db.getLocations();
            if (data) {
                setLocations(data as Array<{ id: number; name: string }>);
            }
        } catch (error) {
            console.error("Error fetching locations:", error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchLocations();
        }, [])
    );

    const renderLocationItem = ({ item }: { item: { id: number; name: string } }) => (
        <View style={styles.locationItem}>
            <Text style={styles.locationName}>{item.name}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Locations Overview</Text>
            <FlatList
                data={locations}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderLocationItem}
            />
            <FloatingActionButton
                route="/location/add"
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
    locationItem: {
        padding: 16,
        backgroundColor: "#f9f9f9",
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    locationName: {
        fontSize: 18,
    },
});

export default LocationsOverview;
