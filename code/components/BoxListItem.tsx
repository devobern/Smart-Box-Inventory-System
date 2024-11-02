import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View, } from "react-native";
import { box } from "@/app/types/box";

const styles = StyleSheet.create({
    box: {
        justifyContent: 'space-between',
        borderColor: '#000000',
        borderWidth: 1,
        borderRadius: 10,
        padding: 15,
        marginVertical: 4,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
    nbItems: {
        textAlign: 'right',
        fontSize: 14,
        color: 'gray',
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },
});

interface BoxListItemProps {
    box: box
}

export default function BoxListItem({box}: BoxListItemProps) {

    return (
        <View style={styles.box}>
            <TouchableOpacity onPress={() => router.push(`/boxes/details?id=${box.id}`)}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{box.name}</Text>
                </View>
                <Text style={styles.nbItems}>({box.numberOfItems})</Text>
            </TouchableOpacity>
        </View>
    )
}