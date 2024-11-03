import {Pressable, StyleSheet, Text, TextInput, View} from "react-native";
import {useEffect, useState} from "react";
import * as DB from "@/services/database";
import * as db from "@/services/database";
import {router, useLocalSearchParams} from "expo-router";
import {Picker} from '@react-native-picker/picker';

export default function EditBox() {
    const {boxId} = useLocalSearchParams();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [locationId, setLocationId] = useState<number>(0);
    const [locations, setLocations] = useState<{ id: number; name: string; }[]>([]);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const result = await DB.getLocations();
                if (Array.isArray(result)) {
                    setLocations(result as { id: number; name: string; }[]);
                }
            } catch (error) {
                console.error('Error fetching locations:', error);
            }
        };
        const fetchBoxes = async () => {
            try {
                const data = await db.getBox(parseInt(boxId as string));
                if (data) {
                    setName(data.name);
                    setDescription(data.description);
                    setLocationId(data.locationId)
                }
            } catch (error) {
                console.error("Error fetching locations:", error);
            }
        };

        fetchLocations();
        fetchBoxes();
    }, []);

    // Function to handle edit box
    const handleEditBox = () => {
        if (!name || !locationId) {
            alert('Please provide a name and select a location.');
            return;
        }
        DB.updateBox(parseInt(boxId as string), name, description, locationId).then(() => {
            router.push('/');
        });
    };


    return (
        <View style={styles.container}>
            <Text style={styles.text}>Name</Text>
            <TextInput
                placeholder={name}
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
                selectedValue={locationId}
                style={styles.inputText}
                onValueChange={(itemValue) => setLocationId(itemValue)}
            >
                <Picker.Item label="Select location" value=""/>
                {locations.map((location) => (
                    <Picker.Item key={location.id} label={location.name} value={location.id.toString()}/>
                ))}
            </Picker>
            <Pressable
                style={styles.editButton}
                onPress={handleEditBox}
            >
                <Text style={styles.saveText}>Edit</Text>
            </Pressable>
        </View>
    );
}

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
    editButton: {
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
    }
});
