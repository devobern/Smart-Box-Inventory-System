import React, { useCallback, useEffect, useState } from "react";
import FloatingActionButton from "@/components/AddButton";
import { router } from "expo-router";
import {
    Alert,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import * as db from "../services/database";
import { box } from "./types/box";
import { category } from "@/app/types/category";
import { location } from "@/app/types/location";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { List } from "react-native-paper";
import {
    GestureHandlerRootView,
    Swipeable,
} from "react-native-gesture-handler";

const styles = StyleSheet.create({
    item: {
        justifyContent: "space-between",
        borderColor: "#000000",
        borderWidth: 1,
        borderRadius: 10,
        padding: 15,
        marginVertical: 4,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
    nbItems: {
        textAlign: "right",
        fontSize: 14,
        color: "gray",
    },
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
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
    listItemContainer: {
        backgroundColor: "white",
        padding: 10,
    },
});

export default function Index() {
    const [boxes, setBoxes] = useState<box[]>([]);
    const [categories, setCategories] = useState<category[]>([]);
    const [locations, setLocations] = useState<location[]>([]);

    const onEdit = (id: number) => {
        router.push(`/boxes/edit?boxId=${id}`);
    };

    const onDelete = (id: number) => {
        Alert.alert("Confirm Delete", "Are you sure you want to delete this box?", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Delete",
                style: "destructive",
                onPress: () => handleDelete(id),
            },
        ]);
    };

    const handleDelete = async (id: number) => {
        try {
            await db.deleteBox(id);
            setBoxes((prevBoxes: any) => prevBoxes.filter((box: any) => box.id !== id));
        } catch (err) {
            console.log(err);
        }
    };

    const presetCategories = [
        { name: "Miscellaneous" },
        { name: "Electronics" },
        { name: "Home Appliances" },
        { name: "Books" },
        { name: "Clothing" },
        { name: "Sports Equipment" },
        { name: "Beauty & Personal Care" },
        { name: "Toys & Games" },
        { name: "Furniture" },
        { name: "Groceries" },
        { name: "Automotive Parts" },
    ];

    const presetLocations = [
        { name: "General" },
        { name: "Living room" },
        { name: "Bath" },
        { name: "Kitchen" },
        { name: "Bedroom" },
        { name: "Basement" },
    ];

    const initializeData = async () => {
        await db.createTables();
        await fetchBoxes();
        await fetchCategories();
        await fetchLocations();
    };

    const fetchBoxes = async () => {
        try {
            const data = await db.getBoxes();
            if (data) {
                setBoxes(data as box[]);
            }
        } catch (error) {
            console.error("Error fetching boxes:", error);
        }
    };

    const fetchCategories = async () => {
        await fetchDataWithPresets(
            db.getCategories,
            setCategories,
            presetCategories,
            db.addCategory
        );
    };

    const fetchLocations = async () => {
        await fetchDataWithPresets(
            db.getLocations,
            setLocations,
            presetLocations,
            db.addLocation
        );
    };

    const fetchDataWithPresets = async (
        getDataFunc: Function,
        setDataFunc: Function,
        presetData: Array<any>,
        addDataFunc: Function
    ) => {
        try {
            const data = await getDataFunc();
            if (data) {
                if (data.length === 0 && presetData) {
                    await addPresetData(presetData, addDataFunc);
                    const newData = await getDataFunc();
                    setDataFunc(newData);
                } else {
                    setDataFunc(data);
                }
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const addPresetData = async (
        presetData: Array<any>,
        addDataFunc: Function
    ) => {
        const promises = presetData.map((item) => addDataFunc(item.name));
        await Promise.all(promises);
    };

    useEffect(() => {
        initializeData();
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchBoxes();
        }, [])
    );

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <FlatList
                    data={boxes}
                    keyExtractor={(item, index) => `${item.id}`}
                    renderItem={({ item }) => (
                        <Swipeable
                            renderLeftActions={() => (
                                <TouchableOpacity
                                    style={[styles.actionButton, styles.editButton]}
                                    onPress={() => onEdit(item.id)}
                                >
                                    <Text style={styles.actionText}>Edit</Text>
                                </TouchableOpacity>
                            )}
                            renderRightActions={() => (
                                <TouchableOpacity
                                    style={[styles.actionButton, styles.deleteButton]}
                                    onPress={() => onDelete(item.id)}
                                >
                                    <Text style={styles.actionText}>Delete</Text>
                                </TouchableOpacity>
                            )}
                            overshootLeft={false}
                            overshootRight={false}
                        >
                            <View style={styles.listItemContainer}>
                                <List.Item
                                    onPress={() => router.push(`/boxes/details?id=${item.id}`)}
                                    title={item.name}
                                    left={() => (
                                        <Image
                                            source={require("@/assets/images/box.png")}
                                            style={{ width: 24, height: 24 }}
                                        />
                                    )}
                                    right={() => (
                                        <Image
                                            source={require("@/assets/images/arrow_forward_ios.png")}
                                            style={{ width: 24, height: 24 }}
                                        />
                                    )}
                                />
                            </View>
                        </Swipeable>
                    )}
                />
                <View style={styles.container_r}>
                    <FloatingActionButton />
                </View>
                <View style={styles.container_l}>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() => router.push(`/scanner`)}
                    >
                        <Ionicons name="scan-outline" size={30} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
        </GestureHandlerRootView>
    );
}
