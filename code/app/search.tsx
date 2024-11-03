import Searchbox from "@/components/searchbox";
import { searchItems, searchBoxes } from "@/services/database";
import { List } from "react-native-paper";
import { router } from "expo-router";
import { useState, useEffect } from "react";
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import { SearchResult } from "@/app/types/SearchResult";
import { Item } from "@/app/types/item";
import { box } from "@/app/types/box";

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  // Debounce the search function to prevent it from being called too frequently
  const debounceDelay = 300;

  useEffect(() => {
    if (query.trim()) {
      const handler = setTimeout(() => {
        handleSearch(query);
      }, debounceDelay);
      return () => clearTimeout(handler);
    } else {
      setSearchResults([]);
    }
  }, [query]);

  /**
   * Handle the search input.
   * The function will search for items and boxes that match the input.
   * @param input
   */
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

  /**
   * Handle selecting an item from the search results.
   * The function will navigate to the details screen for the selected item.
   * @param item
   */
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
    <View>
      <Searchbox
        onSearch={(text) => {
          if (text.trim()) handleSearch(text); // Only call handleSearch if text has content
        }}
        onChangeText={(text) => setQuery(text)}
      />
      <FlatList
        data={searchResults}
        keyExtractor={(item) => `${item.type}-${item.id.toString()}`} // Combine type and id to create a unique key
        renderItem={({ item }) => (
          <List.Item
            onPress={() => handleSelectItem(item)}
            title={item.name}
            description={item.description}
            left={() => (
              <Image
                source={
                  item.type === "item"
                    ? require("@/assets/images/item.png")
                    : require("@/assets/images/box.png")
                }
                style={{ width: 24, height: 24 }}
              />
            )}
          />
        )}
      />
    </View>
  );
}
