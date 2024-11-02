import Searchbox from "@/components/searchbox";
import { Stack } from "expo-router";
import { useState } from "react";
import { Dimensions, Image, TouchableOpacity, View } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');


export default function RootLayout() {
  
  const [isSearchActive, setIsSearchActive] = useState(false);

  const renderHeader = () => {
      if (isSearchActive) {
        return (
          <View style={{ 
            flexDirection: 'row', 
            alignItems: 'center',
            width: SCREEN_WIDTH - 32,
          }}>
            <TouchableOpacity 
              onPress={() => setIsSearchActive(false)}
              style={{ padding: 8, marginRight: 8 }}
            >
              <Image source={require("@/assets/images/arrow_back.png")} style={{ width: 24, height: 24 }} />
            </TouchableOpacity>
            <Searchbox 
              onSearch={() => {alert("Search")}} 
              onChangeText={() => {}}
            />
          </View>
        );
      }
      return (
          <TouchableOpacity 
            onPress={() => setIsSearchActive(true)}
            style={{ padding: 8}}
          >
            <Image source={require("@/assets/images/search.png")} style={{ width: 24, height: 24 }} />
          </TouchableOpacity>
      );
    };

  return (
    <Stack>
      <Stack.Screen name="index" options={{
        title: "Home",
        headerRight: renderHeader,
      }} />
      <Stack.Screen name="boxes/add" options={{ title: "Add new box" }} />
      <Stack.Screen name="items/index" options={{ title: "Items" }} />
      <Stack.Screen name="items/add" options={{ title: "Add new item" }} />
      <Stack.Screen name="itemDetail" options={{ title: "Item detail" }} />
    </Stack>
  );
}
