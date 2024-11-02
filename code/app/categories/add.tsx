import {Button, StyleSheet, TextInput, Text, View} from "react-native";
import {useState} from "react";
import * as db from "@/services/database";
import {NavigationProp, useNavigation} from "@react-navigation/native";


type RootStackParamList = {
    "category/index": undefined; // Matching the registered route in RootLayout
    "category/add": undefined;
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
                    navigation.navigate("category/index");
                } else {
                    console.error('Failed to add category');
                }
            } catch (error) {
                console.error('Error adding category:', error);
            }
        }
    };

    return (
        <View>
            <Text style={styles.header}>Add new Category</Text>
            <TextInput
                placeholder="Enter category name"
                value={name}
                onChangeText={setName}
                style={styles.input}
            />
            <Button title="Add Category" onPress={handleAddCategory} />
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

export default AddCategoryScreen;