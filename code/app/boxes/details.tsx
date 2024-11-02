import FloatingActionButton from "@/components/fab";
import { Link } from "@react-navigation/native";
import { FlatList, Text, View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 18,
        marginBottom: 8,
    },
    listItem: {
        padding: 16,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        width: '100%',
    },
    itemName: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    linkText: {
        color: 'blue',
        fontSize: 16,
        marginTop: 16,
        textDecorationLine: 'underline',
    },
});

const items = [{
    id: '1',
    name: 'Item 1',
    category: 'Category 1',
    boxId: '1',
    description: 'Description 1',
    quantity: 10,
    photoUrl: 'https://example.com/item1.jpg',
}];

export default function BoxDetails() {
  
  return (
        <View style={styles.container}>
            <Text style={styles.title}>Your Items:</Text>
            <FlatList
                data={items}
                keyExtractor={(item) => item.boxId}
                renderItem={({ item }) => (
                    <View style={styles.listItem}>
                        <Text style={styles.itemName}>Name: {item.name}</Text>
                        <Text>Category: {item.category}</Text>
                        <Text>Box ID: {item.boxId}</Text>
                        {item.description && <Text>Description: {item.description}</Text>}
                        {item.quantity && <Text>Quantity: {item.quantity}</Text>}
                        {item.photoUrl && <Text>Photo URL: {item.photoUrl}</Text>}
                    </View>
                )}
            />
            <FloatingActionButton route="/items/add"/>
        </View>
    );
}
