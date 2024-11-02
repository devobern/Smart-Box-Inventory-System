import { primaryColor, onPrimaryColor } from "@/constants/Colors";
import { StyleSheet, Image, TouchableOpacity, View, ImageSourcePropType } from "react-native";
import { Href, router } from 'expo-router';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: primaryColor,
        borderRadius: 12,
        width: 52,
        height: 52,
        position: 'absolute',
        bottom: 16,
        right: 16,
    },
    button: {
        width: 52,
        height: 52,
        borderRadius: 12,
        backgroundColor: primaryColor,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

interface FABProps {
    route: Href<string>;
    icon?: ImageSourcePropType;
}

export default function FloatingActionButton({ route, icon=require("@/assets/images/plus.svg") }: FABProps) {

    const navigation = useNavigation();

    const handlePress = () => {
        router.push(route);
    }

    return (
        <View style={ styles.container }>
            <TouchableOpacity style={ styles.button } onPress={ handlePress }>
                <Image source={icon} style={{ width: 24, height: 24 }} />
            </TouchableOpacity>
        </View>
    )
}