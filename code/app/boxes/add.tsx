import {StyleSheet, TextInput, Text, View, Pressable} from "react-native";
import {useState, useEffect} from "react";
import {router} from "expo-router";
import * as DB from "@/services/database";
import { Picker } from '@react-native-picker/picker';

// Define types for Location
type Location = {
    id: number;
    name: string;
};

export default function AddBox() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [locations, setLocations] = useState<Location[]>([]);

    useEffect(() => {
        // Fetch locations from the database when the component mounts
        const fetchLocations = async () => {
            try {
                const result = await DB.getLocations();
                if (Array.isArray(result)) {
                    setLocations(result as Location[]);
                }
            } catch (error) {
                console.error('Error fetching locations:', error);
            }
        };

        fetchLocations();
    }, []);

    return (
        <View>
            <Text style={styles.text}>Name</Text>
            <TextInput
                placeholder="Name"
                value={name}
                onChangeText={setName}
                style={styles.inputText}
            />
            <Text style={styles.text}>Description</Text>
            <TextInput
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
                style={styles.inputText}
            />
            <Text style={styles.text}>Location</Text>
            <Picker
                selectedValue={location}
                style={styles.inputText}
                onValueChange={(itemValue) => setLocation(itemValue)}
            >
                <Picker.Item label="Select location" value="" />
                {locations.map((loc) => (
                    <Picker.Item key={loc.id} label={loc.name} value={loc.id.toString()} />
                ))}
            </Picker>
            <Pressable style={styles.saveButton} onPress={async () => {
                if (name && location) {
                    alert('Start Saving');
                    try {
                        const id = await DB.addBox(name, parseInt(location, 10), undefined);
                        alert('Saved with id ' + id);
                        router.push('/');
                    } catch (error) {
                        console.error('Error saving box:', error);
                        alert('Failed to save box');
                    }
                } else {
                    alert('Please fill in all fields');
                }
            }}>
                <Text style={styles.saveText}>Save</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    inputText: {
        borderWidth: 1,
        marginBottom: 10,
        margin: 10,
        padding: 10,
        borderRadius: 10
    },
    text: {
        marginBottom: 1,
        padding: 10
    },
    saveButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'black',
    },
    saveText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
});
