import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable'; // Install using 'npm install react-native-animatable'

const LandingPage = ({ navigation }) => {
  useEffect(() => {
    // Automatically navigate to the Signup page after 5 seconds
    const timer = setTimeout(() => {
      navigation.navigate('Signup'); // Replace 'Signup' with your next page route
    }, 10000);

    return () => clearTimeout(timer); // Clear timeout on component unmount
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Animated Logo */}
      <Animatable.Image
        animation="bounceIn"
        duration={2000}
        source={require('../assets/logo-removebg-preview.png')} // Replace with your logo
        style={styles.logo}
      />

      {/* Animated Welcome Text */}
      <Animatable.Text animation="fadeIn" duration={2000} delay={1000} style={styles.welcomeText}>
        Welcome
      </Animatable.Text>

      {/* Get Started Button */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3c5470',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 150,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 30,
    fontFamily: 'cursive',
  },
  button: {
    backgroundColor: '#00bcd4', // Button color
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25, // Rounded corners
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default LandingPage;
