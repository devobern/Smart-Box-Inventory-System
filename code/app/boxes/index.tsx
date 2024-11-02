import { Link } from "@react-navigation/native";
import { Text, View } from "react-native";
import FloatingActionButton from "@/components/fab";

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
      <FloatingActionButton route="/boxes/add" />
      <Link to="/items">
        Box details
      </Link>
    </View>
  );
}
