import { Pressable, StyleSheet, Text, TextInput, View, ScrollView, Alert } from "react-native";
import { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import * as db from "@/services/database";
import { router, useLocalSearchParams } from "expo-router";

export default function EditItem() {
  const { itemId } = useLocalSearchParams();
  const [itemName, setItemName] = useState("");
  const [itemCategory, setItemCategory] = useState("");
  const [itemBoxId, setItemBoxId] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemQuantity, setItemQuantity] = useState("1");
  const [itemPhotoUrl, setItemPhotoUrl] = useState("");
  const [categories, setCategories] = useState([]);
  const [boxes, setBoxes] = useState([]);

  useEffect(() => {
    // Fetch item details
    const fetchItemDetails = async () => {
      try {
        const item = await db.getItem(parseInt(itemId));
        if (item) {
          setItemName(item.name);
          setItemCategory(String(item.categoryId));
          setItemBoxId(String(item.boxId));
          setItemDescription(item.description);
          setItemQuantity(String(item.quantity));
          setItemPhotoUrl(item.img);
        }
      } catch (error) {
        console.error("Error fetching item details:", error);
      }
    };

    // Fetch categories and boxes
    const fetchCategoriesAndBoxes = async () => {
      try {
        const fetchedCategories = await db.getCategories();
        const fetchedBoxes = await db.getBoxes();
        setCategories(fetchedCategories);
        setBoxes(fetchedBoxes);
      } catch (error) {
        console.error("Error fetching categories or boxes:", error);
      }
    };

    fetchItemDetails();
    fetchCategoriesAndBoxes();
  }, []);

  // Update item in the database
  const handleEditItem = async () => {
    if (!itemName || !itemCategory || !itemBoxId) {
      Alert.alert("Error", "Please provide a name, category, and box.");
      return;
    }

    try {
      await db.updateItem(parseInt(itemId), itemName, parseInt(itemQuantity), parseInt(itemBoxId), itemPhotoUrl, itemDescription, parseInt(itemCategory));
      router.push(`/boxes/details?id=${itemBoxId}`);
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 80 }}>
      <Text style={styles.text}>Name *</Text>
      <TextInput
        style={styles.inputText}
        value={itemName}
        onChangeText={setItemName}
        placeholder="Enter item name"
      />

      <Text style={styles.text}>Category *</Text>
      <Picker
        selectedValue={itemCategory}
        style={styles.inputText}
        onValueChange={(itemValue) => setItemCategory(itemValue)}
      >
        <Picker.Item label="Select category" value="" />
        {categories.map((category) => (
          <Picker.Item key={category.id} label={category.name} value={category.id.toString()} />
        ))}
      </Picker>

      <Text style={styles.text}>Box *</Text>
      <Picker
        selectedValue={itemBoxId}
        style={styles.inputText}
        onValueChange={(itemValue) => setItemBoxId(itemValue)}
      >
        <Picker.Item label="Select box" value="" />
        {boxes.map((box) => (
          <Picker.Item key={box.id} label={box.name} value={box.id.toString()} />
        ))}
      </Picker>

      <Text style={styles.text}>Description</Text>
      <TextInput
        style={styles.inputText}
        value={itemDescription}
        onChangeText={setItemDescription}
        placeholder="Enter item description (optional)"
      />

      <Text style={styles.text}>Quantity</Text>
      <TextInput
        style={styles.inputText}
        value={itemQuantity}
        onChangeText={setItemQuantity}
        placeholder="Enter quantity (optional)"
        keyboardType="numeric"
      />

      <Text style={styles.text}>Photo URL</Text>
      <TextInput
        style={styles.inputText}
        value={itemPhotoUrl}
        onChangeText={setItemPhotoUrl}
        placeholder="Enter photo URL (optional)"
      />

      <Pressable style={styles.editButton} onPress={handleEditItem}>
        <Text style={styles.saveText}>Save Changes</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  inputText: {
    borderWidth: 1,
    marginBottom: 10,
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
  text: {
    marginBottom: 1,
    padding: 10,
  },
  editButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#2196F3",
    marginTop: 10,
  },
  saveText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
});
