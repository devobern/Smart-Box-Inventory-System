import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useNavigation, NavigationProp } from '@react-navigation/native';
import * as db from "@/services/database";

type RootStackParamList = {
    "location/index": undefined; // Matching the registered route in RootLayout
    "location/add": undefined;
};

const AddLocationScreen = () => {
    const [locationName, setLocationName] = useState("");
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const handleAddLocation = async () => {
        if (locationName.trim()) {
            try {
                const result = await db.addLocation(locationName);
                if (result) {
                    // Location added successfully, navigate back to overview
                    setLocationName("");
                    navigation.navigate("location/index");
                } else {
                    console.error("Failed to add location");
                }
            } catch (error) {
                console.error("Error adding location:", error);
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Add New Location</Text>
            <TextInput
                style={styles.input}
                value={locationName}
                onChangeText={setLocationName}
                placeholder="Enter location name"
            />
            <Button title="Add Location" onPress={handleAddLocation} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: "center",
        backgroundColor: "#fff",
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
    },
    input: {
        borderColor: "#ccc",
        borderWidth: 1,
        marginBottom: 16,
        padding: 8,
        borderRadius: 4,
    },
});

export default AddLocationScreen;
