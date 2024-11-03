import {Button, StyleSheet, TextInput, Text, View, TouchableOpacity} from "react-native";
import {useState} from "react";
import * as db from "@/services/database";
import {NavigationProp, useNavigation} from "@react-navigation/native";


type RootStackParamList = {
    "categories/index": undefined;
    "categories/add": undefined;
};

const AddCategoryScreen = () => {
    const [name, setName] = useState('');
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const handleAddCategory = async () => {
        if (name.trim()) {
            try {
                const result = await db.addCategory(name);

                if (result) {
                    setName('');
                    navigation.navigate("categories/index");
                } else {
                    console.error('Failed to add category');
                }
            } catch (error) {
                console.error('Error adding category:', error);
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
                placeholder="Enter category name"
                value={name}
                onChangeText={setName}
                style={styles.inputText}
            />
            <TouchableOpacity style={styles.saveButton} onPress={handleAddCategory}>
                <Text style={styles.saveText}>Add Category</Text>
            </TouchableOpacity>
        </View>
    );
};

export default AddCategoryScreen;