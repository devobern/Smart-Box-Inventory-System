import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import { searchItems, searchBoxes } from "../services/database";
import { router, useRouter } from "expo-router";
import { SearchResult } from "@/app/types/SearchResult";
import { Item } from "@/app/types/item";
import { box } from "@/app/types/box";

const SearchHeader: React.FC = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
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
    try {
      const [items, boxes] = await Promise.all([
        searchItems(input) as Promise<Item[] | null>, // Cast the result as Item[] | null
        searchBoxes(input) as Promise<box[] | null>, // Cast the result as box[] | null
      ]);
      const itemsWithType = (items || []).map((item) => ({
        ...item,
        type: "item" as const,
      }));
      const boxesWithType = (boxes || []).map((box) => ({
        ...box,
        type: "box" as const,
      }));
      setSearchResults([...itemsWithType, ...boxesWithType]);
    } catch (error) {
      console.error("Error searching items and boxes:", error);
      setSearchResults([]);
    }
  };

  const handleSelectItem = (item: SearchResult) => {
    if (item.type === "item") {
      router.push({
        pathname: "/items/details",
        params: { itemId: item.id },
      });
    } else {
      router.push({
        pathname: "/boxes/details",
        params: { id: item.id },
      });
    }
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
        onChangeText={setQuery}
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
          keyExtractor={(item) => `${item.type}-${item.id.toString()}`} // Combine type and id to create a unique key
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleSelectItem(item)}
              style={{
                padding: 10,
                borderBottomWidth: 1,
                borderBottomColor: "#ddd",
              }}
            >
              <Text>
                {item.name} ({item.type === "item" ? "Item" : "Box"})
              </Text>
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
