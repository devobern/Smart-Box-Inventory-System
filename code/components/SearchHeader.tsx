import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
//import { useNavigation } from "@react-navigation/native";
import { searchItems } from "../services/database";
import { router, useRouter } from "expo-router";

const SearchHeader: React.FC = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();

  // Debounce the search function to prevent it from being called too frequently
  const debounceDelay = 300;

  useEffect(() => {
    const handler = setTimeout(() => {
      if (query) {
        handleSearch(query);
      } else {
        setSearchResults([]);
      }
    }, debounceDelay);

    return () => clearTimeout(handler); // Clear timeout on cleanup
  }, [query]);

  const handleSearch = async (input: string) => {
    setQuery(input);
    if (input) {
      try {
        const items = await searchItems(input); // Await the result of searchItems
        setSearchResults(items || []); // Update searchResults with items or an empty array if null
      } catch (error) {
        console.error("Error searching items:", error);
        setSearchResults([]); // Clear results on error
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleSelectItem = (item: any) => {
    // Navigate to the itemDetail screen and pass only the itemId
    router.push({
      pathname: "/itemDetail",
      params: { itemId: item.id },
    });
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
        onFocus={() => setIsFocused(true)} // Set focus state to true
        onBlur={() => setIsFocused(false)} // Set focus state to false
        style={{
          height: 40,
          borderColor: "#ccc",
          borderWidth: 1,
          paddingLeft: 8,
          borderRadius: 5,
          marginBottom: 5,
        }}
      />
      {isFocused && searchResults.length === 0 && query !== "" && (
        <Text style={{ padding: 10, color: "#999" }}>No items found</Text>
      )}
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
