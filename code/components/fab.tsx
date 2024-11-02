import { primaryColor, onPrimaryColor } from "@/constants/Colors";
import { StyleSheet, Image, TouchableOpacity, View, ImageSourcePropType, PixelRatio } from "react-native";
import { Href, router } from 'expo-router';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: primaryColor,
        borderRadius: PixelRatio.roundToNearestPixel(16),
        position: 'absolute',
        bottom: PixelRatio.roundToNearestPixel(16),
        right: PixelRatio.roundToNearestPixel(16),
    },
    button: {
        width: PixelRatio.roundToNearestPixel(56),
        height: PixelRatio.roundToNearestPixel(56),
        borderRadius: PixelRatio.roundToNearestPixel(16),
        backgroundColor: primaryColor,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

interface FABProps {
    route: Href<string>;
    icon?: ImageSourcePropType;
}

export default function FloatingActionButton({ route, icon=require("@/assets/images/plus.png") }: FABProps) {

    const navigation = useNavigation();

    const handlePress = () => {
        router.push(route);
    }

    return (
        <View style={ styles.container }>
            <TouchableOpacity style={ styles.button } onPress={ handlePress }>
                <Image source={icon} style={{ width: PixelRatio.roundToNearestPixel(24), height: PixelRatio.roundToNearestPixel(24) }} />
            </TouchableOpacity>
        </View>
    )
}