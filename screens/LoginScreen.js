import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

const LoginScreen = ({ navigation }) => {
  return (
    // <ImageBackground source={require('./assets/background.png')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.header}>Login</Text>
        <Text style={styles.subHeader}>Sign in to continue.</Text>
        
        <TextInput placeholder="Email" placeholderTextColor="#aaa" style={styles.input} />
        <TextInput placeholder="Password" placeholderTextColor="#aaa" secureTextEntry style={styles.input} />
        
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.footerText}>Forgot Password?</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.footerText}>Signup!</Text>
        </TouchableOpacity>
      </View>
    // </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#3c5470',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 5,
  },
  subHeader: {
    fontSize: 16,
    color: '#77c7f7',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#5d759f',
    color: '#fff',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    marginVertical: 8,
  },
  button: {
    backgroundColor: '#42b8d3',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  footerText: {
    color: '#77c7f7',
    textAlign: 'center',
    marginTop: 15,
  },
});

export default LoginScreen;
