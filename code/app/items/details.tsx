import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import * as db from "@/services/database"; // Use the actual path to your database service

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  detailsText: {
    fontSize: 16,
    marginBottom: 8,
  },
});

const ItemDetail: React.FC = () => {
  const { itemId } = useLocalSearchParams();
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      if (itemId) {
        try {
          const fetchedItem = await db.getItem(parseInt(itemId as string, 10));
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
      <View style={styles.container}>
        <Text>No item details found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.detailsText}>Category: {item.categoryId}</Text>
      <Text style={styles.detailsText}>Box ID: {item.boxId}</Text>
      {item.description && (
        <Text style={styles.detailsText}>Description: {item.description}</Text>
      )}
      {item.quantity && (
        <Text style={styles.detailsText}>Quantity: {item.quantity}</Text>
      )}
      {item.photoUrl && (
        <Text style={styles.detailsText}>Photo URL: {item.photoUrl}</Text>
      )}
      {/* Add more item details as needed */}
    </View>
  );
};

export default ItemDetail;
