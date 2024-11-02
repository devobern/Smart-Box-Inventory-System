// components/SearchHeader.tsx
import React, { useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types"; // Import types
import { searchItems } from "../scripts/database";

/* Define the navigation prop type */
type SearchHeaderNavigationProp = StackNavigationProp<
  RootStackParamList,
  "index"
>;

/*
  query: The search input from the user
  searchResults: The list of search results
  navigation: This useNavigation hook, typed with SearchHeaderNavigationProp, gives us access to the navigation object for programmatically navigating between screens.
*/
const SearchHeader: React.FC = () => {
  /*
  query: The search input from the user
  searchResults: The list of search results
  navigation: This useNavigation hook, typed with SearchHeaderNavigationProp, gives us access to the navigation object for programmatically navigating between screens.
  */
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const navigation = useNavigation<SearchHeaderNavigationProp>();

  /*
    handleSearch: This function is called when the user types in the search input. It updates the query state and calls the searchItems function to get the search results.
  */
  const handleSearch = (input: string) => {
    setQuery(input);
    if (input) {
      searchItems(input, (items) => setSearchResults(items));
    } else {
      setSearchResults([]);
    }
  };

  /*
    handleSelectItem: This function is called when the user selects an item from the search results. It navigates to the itemDetail screen with the selected item as a parameter.
  */
  const handleSelectItem = (item: any) => {
    // Navigating to the itemDetail screen with the item as a parameter
    navigation.navigate("itemDetail", { item });
    setSearchResults([]);
    setQuery("");
  };

  return (
    <View
      style={{
        paddingHorizontal: 16,
        paddingTop: 16,
        backgroundColor: "white",
      }}
    >
      <TextInput
        placeholder="Search items..."
        value={query}
        onChangeText={handleSearch}
        style={{
          height: 40,
          borderColor: "#ccc",
          borderWidth: 1,
          paddingLeft: 8,
          borderRadius: 5,
          marginBottom: 5,
        }}
      />
      {searchResults.length > 0 && (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleSelectItem(item)}
              style={{
                padding: 10,
                borderBottomWidth: 1,
                borderBottomColor: "#ddd",
              }}
            >
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )}
          style={{
            maxHeight: 150,
            backgroundColor: "white",
            borderColor: "#ddd",
            borderWidth: 1,
            borderRadius: 5,
            overflow: "hidden",
          }}
        />
      )}
    </View>
  );
};

export default SearchHeader;
