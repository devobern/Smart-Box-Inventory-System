import Searchbox from "@/components/searchbox";
import { searchItems } from "@/services/database";
import { List } from 'react-native-paper';
import { router } from "expo-router";
import { useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

export default function SearchScreen() {

    const [searchResults, setSearchResults] = useState<any[]>([]);

    const handleSearch = async (query: string) => {
        if (query) {
            const items = await searchItems(query);
            setSearchResults(items || []);
        }
        else {
            setSearchResults([]);
        }
    }

    return (
        <View>
            <Searchbox 
                onSearch={handleSearch}
                onChangeText={handleSearch}
            />
            <FlatList
                data={searchResults}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <List.Item
                        onPress={() => router.push(`/itemDetail?id=${item.id}`)}
                        title={item.name}
                        description={item.description}
                        left={() => <Image source={require("@/assets/images/item.png")} style={{ width: 24, height: 24 }} />}
                        right={() => <Image source={require("@/assets/images/arrow_forward_ios.png")} style={{ width: 24, height: 24 }} />}
                    />
                )}
            />
        </View>
    )
}