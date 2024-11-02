import React, { useState, useEffect } from "react";
import FloatingActionButton from "@/components/fab";
import { router } from "expo-router";
import {
    Text,
    TouchableOpacity,
    StyleSheet,
    View,
    FlatList,
} from "react-native";
import SearchHeader from "../components/SearchHeader";
import BoxListItem from "@/components/BoxListItem";
import * as db from "../services/database";
import { box } from "./types/box";
import { category } from "@/app/types/category";
import { location } from "@/app/types/location";
import {Link} from "@react-navigation/native";

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
});

export default function Index() {
    const [boxes, setBoxes] = useState<box[]>([]);
    const [categories, setCategories] = useState<category[]>([]);
    const [locations, setLocations] = useState<location[]>([]);

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
        { name: "Living room" },
        { name: "Bath" },
        { name: "Kitchen" },
        { name: "Bedroom" },
        { name: "Basement" },
    ];

    useEffect(() => {
        // Create tables initially
        db.createTables().then(() => console.log("Created tables :)"));

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
    }, []);

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

    const renderItem = ({ item }: any) => (
        <View style={styles.item}>
            <TouchableOpacity onPress={() => router.push(`/boxes/details?id=${item.id}`)}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{item.title}</Text>
                </View>
                <Text style={styles.nbItems}>({item.nb_items})</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={{ flex: 1 }}>
            <SearchHeader />
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingTop: 20 }}>
                <FlatList
                    data={boxes}
                    keyExtractor={(item, index) => `${item.id}`}
                    renderItem={({ item }) => <BoxListItem box={item} />}
                />
            </View>
            <FloatingActionButton route="/boxes/add" />
            <Link to="/scanner">
                Go To Scanner
            </Link>
        </View>
    );
}