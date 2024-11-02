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
