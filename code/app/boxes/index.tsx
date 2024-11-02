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
      <Text>List of boxes</Text>
      <Link to="/boxes/add">
        Add a new box
      </Link>
    </View>
  );
}
