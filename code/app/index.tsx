import FloatingActionButton from "@/components/fab";
import { View, FlatList } from "react-native";
import BoxListItem from "@/components/BoxListItem";
import * as db from "@/services/database";
import { box } from "./types/box";

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
        flex: 1
      }}
    >
    <View>
        <FlatList
            data={boxes}
            renderItem={(b) => <BoxListItem box={b.item} />}
            // renderItem={(b) => <Text>{b.item.name}</Text>}
        />
    </View>
        <FloatingActionButton route="/boxes/add"/>
    </View>
  );
}
