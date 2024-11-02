import FloatingActionButton from "@/components/fab";
import { Link } from "@react-navigation/native";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>List of indexes</Text>
      <FloatingActionButton route="/items/add" />
    </View>
  );
}
