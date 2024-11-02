import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router"; // Use useLocalSearchParams instead
import { getItem } from "../services/database"; // Import the function to fetch an item from the database

const ItemDetail: React.FC = () => {
  const { itemId } = useLocalSearchParams(); // Retrieve the itemId parameter
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      if (itemId) {
        try {
          const fetchedItem = await getItem(parseInt(itemId as string, 10));
          setItem(fetchedItem);
        } catch (error) {
          console.error("Failed to fetch item:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchItem();
  }, [itemId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!item) {
    return (
      <View style={{ padding: 16 }}>
        <Text>No item details found.</Text>
      </View>
    );
  }

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>{item.name}</Text>
      <Text>Category: {item.category}</Text>
      <Text>Box ID: {item.boxId}</Text>
      {item.description && <Text>Description: {item.description}</Text>}
      {/* Display other item details as needed */}
    </View>
  );
};

export default ItemDetail;
