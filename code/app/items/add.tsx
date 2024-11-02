import { Link } from "@react-navigation/native";
import { Text, View } from "react-native";

export default function Screen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Add a new item</Text>
      <Link to="/items">
        Back to list
      </Link>
    </View>
  );
}
