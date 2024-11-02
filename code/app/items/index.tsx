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
      <Link to="/items/add">
        Add a new item
      </Link>
    </View>
  );
}
