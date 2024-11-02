import FloatingActionButton from "@/components/fab";
import { Link } from "@react-navigation/native";
import { router } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity, StyleSheet, View, FlatList } from "react-native";
import BoxListItem from "@/components/BoxListItem";
import * as db from "@/services/database";
import { box } from "./types/box";

db.openDatabase();
db.createTables();

export default async function Index() {

    let boxes = await db.getBoxes() as box[]

  return (
    <View
      style={{
        flex: 1
      }}
    >
    <View>
        <FlatList
            data={boxes}
            // renderItem={(b) => <BoxListItem box={b.item} />}
            renderItem={(b) => <Text>{b.item.name}</Text>}
        />
    </View>
        <FloatingActionButton route="/boxes/add"/>
    </View>
  );
}
