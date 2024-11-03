import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router'; // Assuming you're using Expo Router

const onboardingScreens = [
  require('../../assets/images/onboarding/screen_0.png'),
  require('../../assets/images/onboarding/screen_1.png'),
  //require('../assets/screenshot2.png'),
  //require('../assets/screenshot3.png'),
  // Add more screenshots as needed
];

const OnboardingScreen = () => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const router = useRouter();

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
    width: '90%',
    height: '80%',
  },
});

export default OnboardingScreen;
