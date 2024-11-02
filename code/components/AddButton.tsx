import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {router} from "expo-router";

export default function FloatingActionButton() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [animation] = useState(new Animated.Value(0));

    const toggleMenu = () => {
        Animated.spring(animation, {
            toValue: isExpanded ? 0 : 1,
            useNativeDriver: true,
        }).start();
        setIsExpanded(!isExpanded);
    };

    const btn1Position = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -70],
    });

    const btn2Position = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -140],
    });

    const btn3Position = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -210],
    });

    const btn4Position = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -280],
    });

    return (
        <View style={styles.container}>
            {isExpanded && (
                <Animated.View style={[styles.secondaryButton, { transform: [{ translateY: btn1Position }] }]}>
                    <TouchableOpacity style={styles.button} onPress={() => router.push(`/boxes/add`)}>
                        <Ionicons name="cube-outline" size={24} color="white" />
                    </TouchableOpacity>
                </Animated.View>
            )}
            {isExpanded && (
                <Animated.View style={[styles.secondaryButton, { transform: [{ translateY: btn2Position }] }]}>
                    <TouchableOpacity style={styles.button} onPress={() => router.push(`/location/add`)}>
                        <Ionicons name="location-outline" size={24} color="white" />
                    </TouchableOpacity>
                </Animated.View>
            )}
            {isExpanded && (
                <Animated.View style={[styles.secondaryButton, { transform: [{ translateY: btn3Position }] }]}>
                    <TouchableOpacity style={styles.button} onPress={() => router.push(`/categories/add`)}>
                        <Ionicons name="list-outline" size={24} color="white" />
                    </TouchableOpacity>
                </Animated.View>
            )}
            {isExpanded && (
                <Animated.View style={[styles.secondaryButton, { transform: [{ translateY: btn4Position }] }]}>
                    <TouchableOpacity style={styles.button} onPress={() => router.push(`/items/add`)}>
                        <Ionicons name="pricetag-outline" size={24} color="white" />
                    </TouchableOpacity>
                </Animated.View>
            )}
            <TouchableOpacity style={styles.mainButton} onPress={toggleMenu}>
                <Ionicons name={isExpanded ? "close" : "add"} size={30} color="white" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 30,
        right: 30,
        alignItems: "center",
    },
    mainButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#2196F3",
        alignItems: "center",
        justifyContent: "center",
        elevation: 5,
    },
    secondaryButton: {
        position: "absolute",
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "#FF5252",
        alignItems: "center",
        justifyContent: "center",
    },
    button: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
});
