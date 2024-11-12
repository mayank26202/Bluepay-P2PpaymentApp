import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

const SignupScreen = ({ navigation }) => {
  return (
//    <ImageBackground source={require('./assets/background.png')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.header}>Create new Account</Text>
        <Text style={styles.subHeader} onPress={() => navigation.navigate('Login')}>Already Registered? Log in here.</Text>
        
        <TextInput placeholder="Name" placeholderTextColor="#aaa" style={styles.input} />
        <TextInput placeholder="Email" placeholderTextColor="#aaa" style={styles.input} />
        <TextInput placeholder="Password" placeholderTextColor="#aaa" secureTextEntry style={styles.input} />
        
        <TouchableOpacity style={styles.button} >
          <Text style={styles.buttonText}>Sign up</Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
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
});

export default SignupScreen;
