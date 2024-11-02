import { Link } from "@react-navigation/native";
import { Text, View } from "react-native";
import SearchHeader from "../components/SearchHeader";
import * as db from "../services/database";

// Create tables if they don't exist
db.createTables();

export default function Index() {
  return (
    <View style={{ flex: 1 }}>
      {/* Replace top bar with SearchHeader */}
      <SearchHeader />
      {/* Main content */}
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 20,
        }}
      >
        <Text>Edit app/index.tsx to edit this screen.</Text>
        <Link to="/boxes">List of Boxes</Link>
      </View>
    </View>
  );
}
