import FloatingActionButton from "@/components/fab";
import { Link } from "@react-navigation/native";
import { router } from "expo-router";
import { useState } from "react";
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
import {category} from "@/app/types/category";

// Create tables if they don't exist
db.createTables();

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

   let boxes = [] as box[];
    db.getBoxes().then((b) => {
        if (b !== null) {
            b.forEach((uBox) => {
                let box = uBox as box;
                boxes.push(box);
            });
        }
    });

    const presetCategories = [
        { name: 'Electronics' },
        { name: 'Home Appliances' },
        { name: 'Books' },
        { name: 'Clothing' },
        { name: 'Sports Equipment' },
        { name: 'Beauty & Personal Care' },
        { name: 'Toys & Games' },
        { name: 'Furniture' },
        { name: 'Groceries' },
        { name: 'Automotive Parts' },
    ];

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

    const addPresetCategories = () => {
        for (let category of presetCategories) {
            const id = db.addCategory(category.name);
        };
    }

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {/* Replace top bar with SearchHeader */}
      <SearchHeader />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 20,
        }}
      >
        <FlatList
            data={boxes}
            renderItem={(b) => <BoxListItem box={b.item} />}
        />
      </View>
      <FloatingActionButton route="/boxes/add" />
    </View>
  );
}
