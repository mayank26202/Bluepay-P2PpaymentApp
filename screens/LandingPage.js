import React, { useEffect } from 'react';
import { View, ImageBackground, StyleSheet, Text, Dimensions } from 'react-native';

export default function LandingPage({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Signup'); // Automatically navigates to Signup after 5 seconds
    }, 10000);

    return () => clearTimeout(timer); // Clear timer if component unmounts
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/logo.png')} // Replace with your actual image path
        style={styles.background}
      >
       
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    // width: 350,
    // height: 660,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
});
