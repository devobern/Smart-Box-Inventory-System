import FloatingActionButton from "@/components/fab";
import { Link } from "@react-navigation/native";
import { Text, View } from "react-native";

export default function BoxDetails() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Details of a box</Text>
      <FloatingActionButton route="/items/add" />
    </View>
  );
}
