import React, {useState, useEffect, useCallback} from "react";
//import FloatingActionButton from "@/components/fab";
import FloatingActionButton from "@/components/AddButton";
import { router } from "expo-router";
import {
    StyleSheet,
    View,
    FlatList,
    Image,
    TouchableOpacity,
    Text, Alert
} from "react-native";
import * as db from "../services/database";
import { box } from "./types/box";
import { category } from "@/app/types/category";
import { location } from "@/app/types/location";
import {Link, useFocusEffect} from "@react-navigation/native";
import {Ionicons} from "@expo/vector-icons";
import { List } from "react-native-paper";
import {GestureHandlerRootView, Swipeable} from "react-native-gesture-handler";

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
    btn : {
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
        padding: 10
    },
});

export default function Index() {
    const [boxes, setBoxes] = useState<box[]>([]);
    const [categories, setCategories] = useState<category[]>([]);
    const [locations, setLocations] = useState<location[]>([]);
    const [isInitialLoadComplete, setIsInitialLoadComplete] = useState(false);

    const onEdit = (id: number) => {
        router.push(`/boxes/edit?boxId=${id}`);
    };

    const onDelete = (id: number) => {
        Alert.alert(
            "Confirm Delete",
            "Are you sure you want to delete this box?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => handleDelete(id),
                }
            ]
        );
    };

    const handleDelete = async (id: number) => {
        try {
            await db.deleteBox(id);

            // Aggiorna lo stato rimuovendo l'elemento
            setBoxes((prevBoxes: any) => prevBoxes.filter((box: any) => box.id !== id));
        } catch (err) {
            console.log(err);
        }
    };

    const presetCategories = [
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

    useEffect(() => {
        console.log('Here!');
        // Create tables initially
        db.createTables().then(() => {
            // Load boxes from the database
            db.getBoxes().then((b) => {
                if (b !== null) {
                    setBoxes(b as box[]);
                }
            });

            // Load categories from the database
            db.getCategories().then((b) => {
                if (b !== null) {
                    const fetchedCategories = b as category[];
                    if (fetchedCategories.length === 0) {
                        addPresetCategories();
                    } else {
                        setCategories(fetchedCategories);
                    }
                }
            });

            // Load locations from the database
            db.getLocations().then((b) => {
                if (b !== null) {
                    const fetchedLocations = b as location[];
                    if (fetchedLocations.length === 0) {
                        addPresetLocations();
                    } else {
                        setLocations(fetchedLocations);
                    }
                }
            });
        });
        setIsInitialLoadComplete(true);
    }, []);

    const fetchBoxes = async () => {
        try {
            const data = await db.getBoxes();
            if (data) {
                setBoxes(data as box[]);
            }
        } catch (error) {
            console.error("Error fetching locations:", error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            if (isInitialLoadComplete) {
                fetchBoxes();
            }
        }, [])
    );

    const addPresetCategories = () => {
        const promises = presetCategories.map((category) =>
            db.addCategory(category.name)
        );

        Promise.all(promises).then(() => {
            db.getCategories().then((newCategories) => {
                if (newCategories !== null) {
                    setCategories(newCategories as category[]);
                }
            });
        });
    };

    const addPresetLocations = () => {
        const promises = presetLocations.map((location) =>
            db.addLocation(location.name)
        );

        Promise.all(promises).then(() => {
            db.getLocations().then((newLocations) => {
                if (newLocations !== null) {
                    setLocations(newLocations as location[]);
                }
            });
        });
    };

    // Swipeable elements

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={{ flex: 1}}>
            <FlatList
                data={boxes}
                keyExtractor={(item, index) => `${item.id}`}
                renderItem={({ item }) => (
                    <Swipeable
                        renderLeftActions={() => (
                            <TouchableOpacity style={[styles.actionButton, styles.editButton]} onPress={() => onEdit(item.id)}>
                                <Text style={styles.actionText}>Edit</Text>
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
                            onPress={() => router.push(`/boxes/details?id=${item.id}`)}
                            title={item.name}
                            left={() => <Image source={require("@/assets/images/box.png")} style={{ width: 24, height: 24 }} />}
                            right={() => <Image source={require("@/assets/images/arrow_forward_ios.png")} style={{ width: 24, height: 24 }} />}
                        />
                    </View>
                    </Swipeable>
                )}
            />
            <View style={styles.container_r}>
                <FloatingActionButton/>
            </View>
            <View style={styles.container_l}>
                <TouchableOpacity style={styles.btn} onPress={() => router.push(`/scanner`)}>
                    <Ionicons name="scan-outline" size={30} color="white" />
                </TouchableOpacity>
            </View>
        </View>
        </GestureHandlerRootView>
    );
}
