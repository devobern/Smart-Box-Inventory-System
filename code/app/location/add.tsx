import React, { useState } from "react";
import {View, Text, TextInput, Button, StyleSheet, TouchableOpacity} from "react-native";
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

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 20,
        },
        inputText: {
            borderWidth: 1,
            marginBottom: 10,
            margin: 10,
            padding: 10,
            borderRadius: 10,
        },
        text: {
            marginBottom: 1,
            padding: 10,
        },
        saveButton: {
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 12,
            paddingHorizontal: 32,
            borderRadius: 4,
            elevation: 3,
            backgroundColor: '#2196F3',
            marginTop: 10,
        },
        saveText: {
            fontSize: 16,
            fontWeight: 'bold',
            color: 'white',
        },
        modalContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        modalContent: {
            width: 300,
            padding: 20,
            backgroundColor: 'white',
            borderRadius: 10,
            alignItems: 'center',
        },
        modalText: {
            fontSize: 18,
            marginBottom: 20,
        },
        printButton: {
            marginTop: 20,
            padding: 10,
            backgroundColor: 'black',
            borderRadius: 5,
        },
        printButtonText: {
            color: 'white',
            fontWeight: 'bold',
        },
        backButton: {
            marginTop: 10,
            padding: 10,
            backgroundColor: 'grey',
            borderRadius: 5,
        },
        backButtonText: {
            color: 'white',
            fontWeight: 'bold',
        },
    });


    return (
        <View style={styles.container}>
            <Text style={styles.text}>Name</Text>
            <TextInput
                style={styles.inputText}
                value={locationName}
                onChangeText={setLocationName}
                placeholder="Enter location name"
            />
            <TouchableOpacity style={styles.saveButton} onPress={handleAddLocation}>
                <Text style={styles.saveText}>Add Location</Text>
            </TouchableOpacity>
        </View>
    );
};

export default AddLocationScreen;
