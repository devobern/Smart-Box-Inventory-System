import React, { useState, useEffect } from "react";
import FloatingActionButton from "@/components/fab";
import { View, FlatList } from "react-native";
import BoxListItem from "@/components/BoxListItem";
import * as db from "@/services/database";
import { box } from "./types/box";
import { category } from "@/app/types/category";

export default function Index() {
    const [boxes, setBoxes] = useState<box[]>([]);
    const [categories, setCategories] = useState<category[]>([]);

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

    useEffect(() => {
        // Create tables initially
        db.createTables().then(() => console.log("Created tables :)"));

        // Load boxes from the database
        db.getBoxes().then((b) => {
            if (b !== null) {
                setBoxes(b as box[]);  // Type-casting to box[]
            }
        });

        // Load categories from the database
        db.getCategories().then((b) => {
            if (b !== null) {
                const fetchedCategories = b as category[];  // Type-casting to category[]
                if (fetchedCategories.length === 0) {
                    addPresetCategories();
                } else {
                    setCategories(fetchedCategories);
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
                    setCategories(newCategories as category[]); // Type-casting to category[]
                }
            });
        });
    };

    return (
        <View
            style={{
                flex: 1,
            }}
        >
            <View>
                <FlatList
                    data={boxes}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <BoxListItem box={item} />}
                />
            </View>
            <FloatingActionButton route="/boxes/add" />
        </View>
    );
}
