import FloatingActionButton from "@/components/fab";
import { View, FlatList } from "react-native";
import BoxListItem from "@/components/BoxListItem";
import * as db from "@/services/database";
import { box } from "./types/box";
import {category} from "@/app/types/category";

db.createTables().then(r => "created tables :)");

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

    const addPresetCategories = async () => {
        for (let category of presetCategories) {
            const id = db.addCategory(category.name);
        };
    }
    addPresetCategories();

  return (
    <View
      style={{
        flex: 1
      }}
    >
    <View>
        <FlatList
            data={boxes}
            renderItem={(b) => <BoxListItem box={b.item} />}
        />
    </View>
        <FloatingActionButton route="/boxes/add"/>
    </View>
  );
}
