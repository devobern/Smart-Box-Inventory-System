import { Link } from "@react-navigation/native";
import { Text, View } from "react-native";

export default function AddBox() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Add a new box</Text>
      <Link to="/boxes">
        Back to list
      </Link>
    </View>
  );
}
