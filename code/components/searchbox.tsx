import { useState } from "react";
import { Image, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E7E0EC',
        borderRadius: 28,
        height: 48,
        paddingHorizontal: 16,
        marginHorizontal: 16,
        marginVertical: 4,
        width: '100%',
        right: 16,
    },
    containerFocused: {
        backgroundColor: '#F7F2FA',  // MD3 lighter surface variant when focused
        borderWidth: 1,
        borderColor: '#6750A4',     // MD3 primary color
    },
    searchIcon: {
        height: 24,
        width: 24,
        marginRight: 12,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#1C1B1F',          // MD3 on-surface
        paddingVertical: 8,
        width: '100%',
    },
    clearButton: {
        height: 24,
        width: 24,
        marginLeft: 8,
    }
})

interface SearchboxProps {
    onSearch: (text: string) => void;
    onChangeText: (text: string) => void;
}

export default function Searchbox({onSearch, onChangeText}: SearchboxProps) {
    
    const [isFocused, setIsFocused] = useState(false);
    const [query, setQuery] = useState('');

    return (
        <SafeAreaView style={{ width: '100%', paddingLeft: 16, paddingRight: 16}}>
            <View style={[
                styles.container, 
                isFocused && styles.containerFocused
            ]}>
                <Image source={require("@/assets/images/search.png")} style={styles.searchIcon} />
                <TextInput
                    style={styles.input}
                    placeholder="Search ..."
                    placeholderTextColor="#49454F"
                    value={query}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onChangeText={(text) => {
                        setQuery(text);
                        onChangeText(text);
                    }}
                    onSubmitEditing={() => onSearch(query)}
                    returnKeyType="search"
                />
                {query ? 
                <TouchableOpacity 
                    onPress={() => {
                        setQuery('');
                        onChangeText('');
                    }}
                    style={styles.clearButton}
                    >
                    <Image source={require("@/assets/images/close.png")} style={styles.clearButton} />
                </TouchableOpacity>
                : null }
            </View>
        </SafeAreaView>
    )
}
