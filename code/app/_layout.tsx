import { useRouter, useSegments, Stack } from "expo-router";
import {
  Image,
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
  BackHandler,
  Alert,
} from "react-native";
import { PaperProvider, MD3LightTheme } from "react-native-paper";
import React, { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";

export default function RootLayout() {
  const theme = {
    ...MD3LightTheme,
    colors: {
      ...MD3LightTheme.colors,
      primary: "#6750A4",
      secondary: "#625B71",
    },
  };

  const styles = StyleSheet.create({
    navbar: {
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      paddingVertical: 6,
      backgroundColor: "white",
      borderTopWidth: 1,
      borderColor: "#e0e0e0",
      elevation: 8,
    },
    navItem: {
      alignItems: "center",
      justifyContent: "center",
      padding: 6,
    },
    navText: {
      fontSize: 10,
      fontWeight: "500",
      marginTop: 2,
    },
    centralButton: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: "#007bff",
      alignItems: "center",
      justifyContent: "center",
      elevation: 5,
      marginBottom: 8,
    },
  });

  const router = useRouter();
  const segments = useSegments();
  const currentRoute = segments.join("/");

  const getNavItemStyle = (routeName) => ({
    color: currentRoute === routeName ? "#1E90FF" : "#007bff",
    fontWeight: currentRoute === routeName ? "bold" : "normal",
  });

  const hideNavBarRoutes = ["scanner", "onboarding"];

  return (
    <PaperProvider theme={theme}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={-150}
      >
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              title: "Home",
              headerLeft: () => null, // Remove default back button on home
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => router.push("/search")}
                  style={{ padding: 8 }}
                >
                  <Image
                    source={require("@/assets/images/search.png")}
                    style={{ width: 20, height: 20 }}
                  />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name="onboarding/onboarding"
            options={{ title: "Onboarding" }}
          />
          <Stack.Screen name="search" options={{ title: "Search" }} />
          <Stack.Screen name="boxes/add" options={{ title: "Add new box" }} />
          <Stack.Screen
            name="boxes/details"
            options={{ title: "Box details" }}
          />
          <Stack.Screen name="boxes/edit" options={{ title: "Edit Box" }} />
          <Stack.Screen name="items/index" options={{ title: "Items" }} />
          <Stack.Screen
            name="items/add"
            options={{
              title: "Add new item",
            }}
          />
          <Stack.Screen
            name="items/details"
            options={{ title: "Item detail" }}
          />
          <Stack.Screen
            name="location/index"
            options={{ title: "Locations Overview" }}
          />
          <Stack.Screen
            name="location/add"
            options={{ title: "Add New Location" }}
          />
          <Stack.Screen
            name="categories/index"
            options={{ title: "Categories Overview" }}
          />
          <Stack.Screen
            name="categories/add"
            options={{ title: "Add New Category" }}
          />
        </Stack>

        {!hideNavBarRoutes.includes(currentRoute) && (
          <View style={styles.navbar}>
            <TouchableOpacity
              style={styles.navItem}
              onPress={() => router.replace("/")}
            >
              <Ionicons
                name="cube-outline"
                size={22}
                color={getNavItemStyle("").color}
              />
              <Text style={[styles.navText, getNavItemStyle("")]}>Boxes</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navItem}
              onPress={() => router.replace("/location")}
            >
              <Ionicons
                name="location-outline"
                size={22}
                color={getNavItemStyle("location").color}
              />
              <Text style={[styles.navText, getNavItemStyle("location")]}>
                Locations
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.centralButton}
              onPress={() => router.replace("/search")}
            >
              <Ionicons name="search-outline" size={26} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navItem}
              onPress={() => router.replace("/categories")}
            >
              <Ionicons
                name="list-outline"
                size={22}
                color={getNavItemStyle("categories").color}
              />
              <Text style={[styles.navText, getNavItemStyle("categories")]}>
                Categories
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navItem}
              onPress={() => router.replace("/items")}
            >
              <Ionicons
                name="pricetag-outline"
                size={22}
                color={getNavItemStyle("items").color}
              />
              <Text style={[styles.navText, getNavItemStyle("items")]}>
                Items
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </KeyboardAvoidingView>
    </PaperProvider>
  );
}
