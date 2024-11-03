import React, { useState, useLayoutEffect } from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, useNavigation } from 'expo-router'; // Assuming you're using Expo Router

const onboardingScreens = [
  require('../../assets/images/onboarding/screen_1.png'),
  require('../../assets/images/onboarding/screen_2.png'),
  require('../../assets/images/onboarding/screen_3.png'),
  require('../../assets/images/onboarding/screen_4.png'),
  require('../../assets/images/onboarding/screen_5.png'),
  // Add more screenshots as needed
];

const OnboardingScreen = () => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const router = useRouter();
  const navigation = useNavigation();

  // Hide the navigation bar at the top
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const handleNextScreen = async () => {
    if (currentScreen < onboardingScreens.length - 1) {
      setCurrentScreen(currentScreen + 1);
    } else {
      // Set onboarding as seen and navigate to home screen
      await AsyncStorage.setItem('hasSeenOnboarding', 'true');
      router.replace('/'); // Go home
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleNextScreen}>
      <Image source={onboardingScreens[currentScreen]} style={styles.image} resizeMode="contain" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },  
  image: {
    width: '100%',
    height: '100%',
  },
});

export default OnboardingScreen;
