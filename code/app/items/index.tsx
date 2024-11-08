import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as db from "@/services/database";
import { useFocusEffect } from "@react-navigation/native";
import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const Index = () => {
  const [items, setItems] = useState<any[]>([]);

  const fetchItems = async () => {
    try {
      const dbItems = await db.getItems();
      if (dbItems) {
        setItems(dbItems);
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchItems();
    }, [])
  );

  const onEdit = (id: number) => {
    router.push(`/items/edit?itemId=${id}`);
  };

  const onDelete = (id: number) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this item?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => handleDelete(id),
        },
      ]
    );
  };

  const handleDelete = async (id: number) => {
    try {
      await db.deleteItem(id); // Assicurati che la funzione deleteItem esista
      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch (err) {
      console.log("Error deleting item:", err);
    }
  };

  const renderItem = ({
    item,
  }: {
    item: { id: number; name: string; quantity: number; description?: string };
  }) => (
    <Swipeable
      renderLeftActions={() => (
        <TouchableOpacity
          style={[styles.actionButton, styles.editButton]}
          onPress={() => onEdit(item.id)}
        >
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>
      )}
      renderRightActions={() => (
        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => onDelete(item.id)}
        >
          <Text style={styles.actionText}>Delete</Text>
        </TouchableOpacity>
      )}
      overshootLeft={false}
      overshootRight={false}
    >
      <TouchableOpacity
        style={styles.listItemContainer}
        onPress={() => router.push(`/items/details?itemId=${item.id}`)} // Navigate to item details view
      >
        <Text style={styles.itemName}>Name: {item.name}</Text>
        <Text>Quantity: {item.quantity}</Text>
        {item.description && <Text>Description: {item.description}</Text>}
      </TouchableOpacity>
    </Swipeable>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>List of Items:</Text>
        <FlatList
          data={items}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
        <View style={styles.container_r}>
          <TouchableOpacity
            style={styles.mainButton}
            onPress={() => router.push(`/items/add`)}
          >
            <Ionicons name="add" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 18,
    padding: 10,
    marginTop: 10,
  },
  listItemContainer: {
    backgroundColor: "white",
    padding: 20,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  itemName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  mainButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#2196F3",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
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
  container_r: {
    position: "absolute",
    bottom: 30,
    right: 30,
    alignItems: "center",
  },
});

export default Index;
