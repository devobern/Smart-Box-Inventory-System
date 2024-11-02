import React from "react";
import { View, Text } from "react-native";

const ItemDetail: React.FC<{ route: any }> = ({ route }) => {
  const { item } = route.params;

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
