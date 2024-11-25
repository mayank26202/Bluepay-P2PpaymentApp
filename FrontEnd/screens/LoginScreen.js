import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios'; 

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      
      const url = 'http://localhost:8080/login';

      const response = await axios.post(url, { username, password });

      if (response.status === 200) {
        Alert.alert('Success', 'Logged in successfully!');
        navigation.navigate('Profile'); 
      }
    } catch (error) {
      // Handle errors
      if (error.response) {
        Alert.alert('Error', error.response.data.message || 'Login failed!');
      } else {
        Alert.alert('Error', 'Unable to connect to the server.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>
      <Text style={styles.subHeader}>Sign in to continue.</Text>
      
      <TextInput
        placeholder="Username"
        placeholderTextColor="#aaa"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />
      
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.footerText}>Forgot Password?</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.footerText}>Signup!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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

