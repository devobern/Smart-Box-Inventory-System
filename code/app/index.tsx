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
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Link to="/boxes">
        List of Boxes
      </Link>
    </View>
  );
}