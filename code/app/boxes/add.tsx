import {Button, StyleSheet, TextInput, Text, View, Pressable} from "react-native";
import {useState} from "react";
import {router} from "expo-router";



export default function AddBox() {
    //Replace with type object Box.ts
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [creationDate, setcDate] = useState(new Date())
    const [updateDate, setuDate] = useState(new Date())

    // TO DO: Add function for save on db
    // db.addBox().then(router.push('/boxes'));

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
            <Pressable style={styles.saveButton} onPress={()=>{
                // TO DO: Save new box in the DB
                router.push('/')
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
