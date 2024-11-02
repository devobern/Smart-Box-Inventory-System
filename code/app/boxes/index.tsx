import {FlatList, Text, View, StyleSheet, TouchableOpacity} from "react-native";
import FloatingActionButton from "@/components/fab";
import {useState} from "react";
import {router} from "expo-router";

export default function ListBoxes() {
    //Need to take form db
    const [items, setItems] = useState([
        { id: '1', title: 'Box 1', nb_items: 0 },
        { id: '2', title: 'Box 2', nb_items: 5 },
        { id: '3', title: 'Box 3', nb_items: 10 },
    ]);

    const renderItem = ({ item }: any) => (
        <View style={styles.item}>
            <TouchableOpacity onPress={() => router.push(`/item/${item.id}`)}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{item.title}</Text>
                </View>
                <Text style={styles.nbItems}>({item.nb_items})</Text>
            </TouchableOpacity>
        </View>
    );

  return (
    <View
      style={{
        flex: 1
      }}
    >
    <View>
        <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
        />
    </View>
        <FloatingActionButton route="/boxes/add"/>
    </View>
  );
}

const styles = StyleSheet.create({
    item: {
        justifyContent: 'space-between',
        borderColor: '#000000',
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
        textAlign: 'right',
        fontSize: 14,
        color: 'gray',
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },
});