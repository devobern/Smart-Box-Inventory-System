import React, { useCallback, useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, Image } from "react-native";
import FloatingActionButton from "@/components/AddButton";
import { useFocusEffect, router } from "@react-navigation/native";
import * as db from "@/services/database";
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { List } from "react-native-paper";

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

    useEffect(() => {
        db.createTables().then(() => {
            db.getLocations().then((data) => {
                if (data) setLocations(data as Array<{ id: number; name: string }>);
            });
        });
    }, []);

    const onEdit = (id: number) => {
        router.push(`/locations/edit?locationId=${id}`);
    };

    const onDelete = (id: number) => {
        Alert.alert(
            "Confirm Delete",
            "Are you sure you want to delete this location?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Delete", style: "destructive", onPress: () => handleDelete(id) }
            ]
        );
    };

    const handleDelete = async (id: number) => {
        try {
            await db.deleteLocation(id);
            setLocations((prevLocations) => prevLocations.filter((location) => location.id !== id));
        } catch (err) {
            console.log("Error deleting location:", err);
        }
    };

    const renderLocationItem = ({ item }: { item: { id: number; name: string } }) => (
        <Swipeable
            renderLeftActions={() => (
                <TouchableOpacity style={[styles.actionButton, styles.deleteButton]} onPress={() => onDelete(item.id)}>
                    <Text style={styles.actionText}>Delete</Text>
                </TouchableOpacity>
            )}
            renderRightActions={() => (
                <TouchableOpacity style={[styles.actionButton, styles.deleteButton]} onPress={() => onDelete(item.id)}>
                    <Text style={styles.actionText}>Delete</Text>
                </TouchableOpacity>
            )}
            overshootLeft={false}
            overshootRight={false}
        >
            <View style={styles.listItemContainer}>
                <List.Item
                    title={item.name}
                    left={() => <Image source={require("@/assets/images/location.png")} style={{ width: 24, height: 24 }} />}/>
            </View>
        </Swipeable>
    );

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <FlatList
                    data={locations}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderLocationItem}
                />
                <View style={styles.container_r}>
                    <FloatingActionButton route="/location/add" />
                </View>
                <View style={styles.container_l}>
                    <TouchableOpacity style={styles.btn} onPress={() => router.push(`/scanner`)}>
                        <Ionicons name="scan-outline" size={30} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    listItemContainer: {
        backgroundColor: "white",
        padding: 10,
    },
    actionButton: {
        justifyContent: "center",
        alignItems: "center",
        width: 80,
        height: "100%",
    },
    editButton: {
        backgroundColor: "#4CAF50",
    },
    deleteButton: {
        backgroundColor: "#F44336",
    },
    actionText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    container_r: {
        position: "absolute",
        bottom: 30,
        right: 30,
        alignItems: "center",
    },
    container_l: {
        position: "absolute",
        bottom: 30,
        left: 30,
        alignItems: "center",
    },
    btn: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#2196F3",
        alignItems: "center",
        justifyContent: "center",
        elevation: 5,
    },
});

export default LocationsOverview;
